import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import fetch from "node-fetch";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Evidence-Based Site Analysis
  app.post("/api/analyze", async (req: express.Request, res: express.Response) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // 1. Collect Factual Security Signals
    const signals = await collectLiveSignals(url);
    if (!signals) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // 2. Compute Trust Score via Deterministic Rules Engine
    const ruleResults = calculateDeterministicTrustScore(signals);

    // 3. AI Explanation / fallback
    let analysisResult: any = null;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const prompt = `You are a cybersecurity analyst.
You must never invent facts.
Only analyze the evidence provided.
If data is unavailable, state Unknown.
Do not assume malware, phishing, or domain reputation.

Here is the factual evidence collected for the URL "${url}":
- Hostname: ${signals.hostname}
- Protocol: ${signals.httpsEnabled ? 'HTTPS (Secure)' : 'HTTP (Insecure)'}
- SSL Certificate Valid: ${signals.sslValid === null ? 'Unknown' : signals.sslValid ? 'Yes' : 'No'}
- HTTP Status Code: ${signals.statusCode || 'Unknown'}
- Server Reachable: ${signals.reachable ? 'Yes' : 'No'}
- DNS Records: ${JSON.stringify(signals.dnsRecords)}
- Domain Age: ${signals.domainAgeYears === null ? 'Unknown' : `${signals.domainAgeYears} years`}
- Homograph Attack: ${signals.homographAttack ? 'Yes' : 'No'}
- Suspicious Keywords in Domain: ${signals.suspiciousKeywordsFound.join(', ') || 'None'}
- Page Title: "${signals.pageTitle || 'Unknown'}"
- Meta Description: "${signals.metaDescription || 'Unknown'}"
- Login Form Detected: ${signals.loginFormDetected ? 'Yes' : 'No'}
- External Script Count: ${signals.externalScriptCount}
- Google Safe Browsing Flag: ${signals.safeBrowsing}
- VirusTotal Detections: ${signals.virusTotalDetections === null ? 'Unknown' : `${signals.virusTotalDetections} engines detected malicious`}

Deterministic Trust Score: ${ruleResults.trustScore}
Deterministic Risk Level: ${ruleResults.riskLevel}

Analyze this evidence and output the required JSON schema.
If VirusTotal and Google Safe Browsing report no malicious findings and the SSL certificate is valid, you should classify the website as Safe (Low Risk) unless other evidence strongly indicates malicious behavior.
Include the provided deterministic trustScore (${ruleResults.trustScore}) in your output JSON as-is. Do not calculate or change it.
Ensure all outputs are factually accurate, objective, and proportional. Do not dramatize.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                trustScore: { type: Type.INTEGER },
                riskLevel: { type: Type.STRING },
                confidence: { type: Type.STRING },
                summary: { type: Type.STRING },
                positiveIndicators: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                concerns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                recommendations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["trustScore", "riskLevel", "confidence", "summary", "positiveIndicators", "concerns", "recommendations"]
            }
          }
        });

        if (response.text) {
          analysisResult = JSON.parse(response.text.trim());
        }
      } catch (err) {
        console.error("Gemini API error, falling back to deterministic explanation generator:", err);
      }
    }

    if (!analysisResult) {
      analysisResult = generateBackupAnalysis(url, signals, ruleResults);
    }

    res.json({
      url,
      signals,
      analysis: analysisResult
    });
  });

  // Vite middleware setup for Development & Production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Factual Signal Collector Function
async function collectLiveSignals(targetUrl: string) {
  let hostname = '';
  let httpsEnabled = false;
  let sslValid: boolean | null = null;
  let reachable = false;
  let statusCode: number | null = null;
  let pageTitle = '';
  let metaDescription = '';
  let loginFormDetected = false;
  let externalScriptCount = 0;
  let redirectChain: string[] = [];

  let fullUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(fullUrl)) {
    fullUrl = 'https://' + fullUrl;
  }

  try {
    const parsed = new URL(fullUrl);
    hostname = parsed.hostname;
    httpsEnabled = parsed.protocol === 'https:';
  } catch (e) {
    return null;
  }

  const domainLength = hostname.length;

  // Homograph/Punycode detection
  const homographAttack = /^[a-zA-Z0-9.-]+$/.test(hostname) === false || hostname.includes('xn--');

  // Suspicious keywords checklist
  const suspiciousKeywords = ['secure', 'bank', 'login', 'update', 'verify', 'signin', 'credential', 'support', 'auth', 'portal', 'account'];
  const suspiciousKeywordsFound = suspiciousKeywords.filter(kw => hostname.toLowerCase().includes(kw));

  // Recognized reputable brands
  const reputableDomains = [
    'google.com', 'apple.com', 'microsoft.com', 'pwc.com', 'github.com', 
    'stripe.com', 'paypal.com', 'amazon.com', 'wikipedia.org', 'netflix.com', 
    'linkedin.com', 'twitter.com', 'instagram.com', 'facebook.com', 
    'google-analytics.com', 'cloudflare.com', 'adobe.com', 'dropbox.com'
  ];
  const isReputable = reputableDomains.some(rep => hostname.toLowerCase() === rep || hostname.toLowerCase().endsWith('.' + rep));

  // Resolve DNS A records
  let dnsRecords: any[] = [];
  try {
    dnsRecords = await dns.promises.resolve4(hostname);
    console.log("DNS Records:", dnsRecords);
  } catch (err) {
    dnsRecords = [];
  }
// TODO: Replace with a real WHOIS lookup in the backend.
// For now, never guess the age of a domain.
let domainAgeYears: number | null = null;

  // Fetch website content if DNS resolves
  if (dnsRecords.length > 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      reachable = true;
      statusCode = response.status;
      sslValid = httpsEnabled;

      const text = await response.text();

      // HTML page title extraction
      const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
      if (titleMatch) pageTitle = titleMatch[1].trim();

      // Meta description extraction
      const descMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) || 
                        text.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
      if (descMatch) metaDescription = descMatch[1].trim();

      // Login element detection
      const lowerText = text.toLowerCase();
      loginFormDetected = lowerText.includes('<input type="password"') || 
                          lowerText.includes('type="password"') ||
                          lowerText.includes('name="password"') ||
                          (lowerText.includes('type="email"') && lowerText.includes('action="post"'));

      // Count external script tags
      const scriptRegex = /<script[^>]*src=["']([^"']+)["']/gi;
      let match;
      while ((match = scriptRegex.exec(text)) !== null) {
        const src = match[1];
        if (src && !src.startsWith('/') && !src.includes(hostname)) {
          externalScriptCount++;
        }
      }
    } catch (err: any) {
      if (err.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || 
          err.code === 'ERR_TLS_CERT_ALTNAME_INVALID' || 
          err.message?.includes('certificate') || 
          err.message?.includes('SSL') || 
          err.message?.includes('TLS')) {
        sslValid = false;
        reachable = true;
      } else {
        sslValid = httpsEnabled ? null : null;
        reachable = false;
      }
    }
  }


// TODO: Replace with real Google Safe Browsing and VirusTotal APIs.
let safeBrowsing = "Unknown";
let virusTotal = "Unknown";
let virusTotalDetections: number | null = null;

  return {
    hostname,
    httpsEnabled,
    sslValid,
    reachable,
    statusCode,
    pageTitle: pageTitle || 'Unknown',
    metaDescription: metaDescription || 'Unknown',
    loginFormDetected,
    externalScriptCount,
    suspiciousKeywordsFound,
    domainLength,
    homographAttack,
    safeBrowsing,
    virusTotal,
    virusTotalDetections,
    domainAgeYears,
    dnsRecords,
    isReputable,
    redirectChain
  };
}

// Compute trust score purely through deterministic rules
function calculateDeterministicTrustScore(signals: any) {
  let score = 100;
  const concerns: string[] = [];
  const positiveIndicators: string[] = [];

  if (signals.httpsEnabled) {
    positiveIndicators.push("HTTPS connection protocol is enabled.");
    if (signals.sslValid === true) {
      positiveIndicators.push("SSL/TLS certificate is active and verified.");
    } else if (signals.sslValid === false) {
      score -= 30;
      concerns.push("SSL/TLS certificate is invalid or self-signed.");
    } else {
      score -= 10;
      concerns.push("SSL/TLS certificate status is unverified (Unreachable).");
    }
  } else {
    score -= 25;
    concerns.push("Unencrypted HTTP protocol is used (HTTPS is disabled).");
  }

  if (signals.reachable) {
    positiveIndicators.push(`Server is online and returned HTTP Status Code ${signals.statusCode}.`);
    if (signals.statusCode && signals.statusCode >= 400) {
      score -= 15;
      concerns.push(`Server responded with an error status code (${signals.statusCode}).`);
    }
  } else {
    concerns.push("The target could not be reached from the current scanning environment. This is not treated as evidence of malicious activity.");
}

  if (signals.dnsRecords && signals.dnsRecords.length > 0) {
    positiveIndicators.push(`Valid DNS resolution found (${signals.dnsRecords.length} IP record).`);
  } else {
    score -= 25;
    concerns.push("No active DNS A records could be resolved.");
  }

  if (signals.domainAgeYears !== null) {
    if (signals.domainAgeYears >= 3) {
      positiveIndicators.push(`Domain has established history (${signals.domainAgeYears} years old).`);
    } else if (signals.domainAgeYears < 0.5) {
      score -= 20;
      concerns.push("Extremely young domain (registered less than 6 months ago).");
    }
  }

  if (signals.homographAttack) {
    score -= 40;
    concerns.push("Internationalized Domain Name (IDN) homograph spoofing detected.");
  }

  if (signals.suspiciousKeywordsFound && signals.suspiciousKeywordsFound.length > 0) {
    if (!signals.isReputable) {
      score -= 20 * Math.min(signals.suspiciousKeywordsFound.length, 2);
      concerns.push(`Contains high-risk keywords targeting brand logins: ${signals.suspiciousKeywordsFound.join(', ')}.`);
    }
  }

  if (signals.domainLength > 28 && !signals.isReputable) {
    score -= 10;
    concerns.push("Unusually long domain name, commonly used to hide subdomains.");
  }

  if (signals.safeBrowsing === 'Malicious') {
    score -= 50;
    concerns.push("Flagged as malicious by Google Safe Browsing database.");
  } else if (signals.safeBrowsing === 'Clean') {
    positiveIndicators.push("Google Safe Browsing reports zero active security alerts.");
  }

  if (signals.virusTotal === 'Malicious' || (signals.virusTotalDetections && signals.virusTotalDetections > 0)) {
    score -= 50;
    concerns.push(`Flagged by VirusTotal security engines (${signals.virusTotalDetections} detections).`);
  } else if (signals.virusTotal === 'Clean') {
    positiveIndicators.push("VirusTotal scanner reports zero malicious engine listings.");
  }

  if (signals.loginFormDetected) {
    if (!signals.httpsEnabled || signals.sslValid !== true || !signals.isReputable) {
      score -= 20;
      concerns.push("Credential entry field detected on an insecure or independent domain.");
    } else {
      positiveIndicators.push("Credential input fields are secured by active HTTPS.");
    }
  }

  if (signals.externalScriptCount > 15 && !signals.isReputable) {
    score -= 10;
    concerns.push(`Large quantity of external script sources loaded (${signals.externalScriptCount}).`);
  }

  score = Math.max(0, Math.min(100, score));

  let riskLevel = "Caution";
  if (score >= 80) {
    riskLevel = "Low Risk";
  } else if (score < 50) {
    riskLevel = "High Danger";
  }

  return {
    trustScore: score,
    riskLevel,
    concerns,
    positiveIndicators
  };
}

// Factual Backup Explanation Builder (for offline or local processing fallback)
function generateBackupAnalysis(url: string, signals: any, ruleResults: any) {
  let riskLevel = ruleResults.riskLevel;
  if (signals.sslValid === true && signals.safeBrowsing === 'Clean' && signals.virusTotal === 'Clean') {
    if (ruleResults.trustScore >= 70) {
      riskLevel = "Low Risk";
    }
  }

  const confidence = signals.reachable ? "High" : "Medium";
  
  let summary = `This website was analyzed on an evidence-first basis. `;
  if (signals.reachable) {
    summary += `The server is active and reachable, returning HTTP Status Code ${signals.statusCode}. `;
  } else {
    summary += `The host was found to be unreachable or offline. `;
  }

  if (signals.httpsEnabled) {
    if (signals.sslValid === true) {
      summary += `The protocol uses active HTTPS encryption with a valid and trusted SSL/TLS certificate. `;
    } else {
      summary += `The connection is encrypted, but the SSL/TLS certificate is unverified or invalid. `;
    }
  } else {
    summary += `The page utilizes plain unencrypted HTTP. `;
  }

  if (signals.isReputable) {
    summary += `The domain (${signals.hostname}) is recognized as a highly established and reputable global service. `;
  }

  const recommendations = [
    signals.httpsEnabled && signals.sslValid === true 
      ? "Confirm path authenticity before entering any personal credentials."
      : "Do NOT input personal passwords or credit card numbers on this unencrypted connection.",
    signals.isReputable 
      ? "This is a reputable brand portal. Ensure the path is exactly what you expected."
      : "Verify this website corresponds to a legitimate and known provider.",
    "Ensure automatic browser security protections are active."
  ];

  return {
    trustScore: ruleResults.trustScore,
    riskLevel,
    confidence,
    summary,
    positiveIndicators: ruleResults.positiveIndicators,
    concerns: ruleResults.concerns,
    recommendations
  };
}

startServer();
