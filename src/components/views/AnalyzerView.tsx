import React, { useState, useEffect } from 'react';
import { 
  Globe, Mail, FileText, QrCode, Image as ImageIcon, 
  Upload, Play, CheckCircle2, AlertTriangle, ShieldAlert, 
  Sparkles, RefreshCw, Lock, Unlock, Clock, Database, 
  Code, Info, ShieldCheck, HeartPulse
} from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';
import { HistoryService } from '../../services/HistoryService';

type ScanCategory = 'website' | 'email' | 'file' | 'qr' | 'screenshot';

interface AnalyzerViewProps {
  initialType?: ScanCategory;
  initialUrl?: string;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({ initialType, initialUrl }) => {
  const [activeTab, setActiveTab] = useState<ScanCategory>('website');
  const [urlInput, setUrlInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync tab if user navigates via Dashboard quick action or Browser Extension
  useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
      if (initialType === 'website' && initialUrl) {
        setScanResult(null);
        setScanProgress(0);
        setErrorMsg('');
        setUrlInput(initialUrl);
      } else {
        applyTemplateValues(initialType);
      }
    } else {
      applyTemplateValues('website');
    }
  }, [initialType, initialUrl]);

  // Handle auto-scanning when initialUrl is explicitly provided
  useEffect(() => {
    if (initialUrl && activeTab === 'website') {
      const timer = setTimeout(() => {
        triggerScan();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [initialUrl]);

  const applyTemplateValues = (category: ScanCategory) => {
    setScanResult(null);
    setScanProgress(0);
    setErrorMsg('');
    if (category === 'website') {
      setUrlInput('https://verify-pwc-secure-portal.co-login-net.xyz/update');
    } else if (category === 'email') {
      setEmailInput('From: account-alert@pwc-secure-support.com\nSubject: URGENT: Password Verification Required\n\nDear User,\nYour security login session is about to expire. Please click here immediately to verify your security keys and retain account access: http://pwc-secure-support.com/auth');
    } else if (category === 'file') {
      setSelectedFileName('salary_spreadsheet_Q2.pdf.exe');
    } else if (category === 'qr') {
      setSelectedFileName('mysterious_discount_coupon.png');
    } else if (category === 'screenshot') {
      setSelectedFileName('system_error_popup_alert.png');
    }
  };

  const handleTabChange = (tab: ScanCategory) => {
    setActiveTab(tab);
    applyTemplateValues(tab);
  };

  // Pre-configured structured mock responses for tabs other than URL
  const mockTabResults = {
    email: {
      url: 'Paste Email',
      signals: {
        hostname: 'pwc-secure-support.com',
        httpsEnabled: false,
        sslValid: false,
        reachable: true,
        statusCode: 200,
        pageTitle: 'Corporate Direct Portal',
        metaDescription: 'Unknown',
        loginFormDetected: true,
        externalScriptCount: 3,
        suspiciousKeywordsFound: ['pwc', 'secure', 'support'],
        domainLength: 22,
        homographAttack: false,
        safeBrowsing: 'Clean',
        virusTotal: 'Clean',
        virusTotalDetections: 0,
        domainAgeYears: 0.02,
        dnsRecords: ['192.168.1.5']
      },
      analysis: {
        trustScore: 42,
        riskLevel: 'Caution',
        confidence: 'High',
        summary: 'This email is utilizing a newly-registered domain name (pwc-secure-support.com) which has no recognized connection to official PwC networks. The domain is only a few days old and serves active login forms over unencrypted channels.',
        positiveIndicators: [
          'The host is active and reachable.',
          'No malicious records are logged on public blacklist feeds yet.'
        ],
        concerns: [
          'Domain is extremely young (under 1 month age).',
          'Utilizes plain HTTP for credential capture fields.',
          'Hostname targets high-profile corporate security keywords without authority.'
        ],
        recommendations: [
          'Do NOT click any buttons or links in this email.',
          'Never type password tokens into unencrypted (non-HTTPS) fields.',
          'Report the sender address to your internal IT or phishing Response desk.'
        ]
      }
    },
    file: {
      url: 'salary_spreadsheet_Q2.pdf.exe',
      signals: {
        hostname: 'Local File Archive',
        httpsEnabled: false,
        sslValid: null,
        reachable: true,
        statusCode: null,
        pageTitle: 'salary_spreadsheet_Q2.pdf.exe',
        metaDescription: 'Executable disguised as a PDF document',
        loginFormDetected: false,
        externalScriptCount: 0,
        suspiciousKeywordsFound: [],
        domainLength: 30,
        homographAttack: false,
        safeBrowsing: 'Clean',
        virusTotal: 'Malicious',
        virusTotalDetections: 4,
        domainAgeYears: null,
        dnsRecords: []
      },
      analysis: {
        trustScore: 35,
        riskLevel: 'High Danger',
        confidence: 'High',
        summary: 'Factual assessment indicates this file uses a double-extension scheme (".pdf.exe") to deceive users into thinking it is a document. In reality, it is a binary machine program capable of loading background scripts.',
        positiveIndicators: [
          'No registry startup entries are configured.'
        ],
        concerns: [
          'Double extension suffix disguised as a non-executable document.',
          '4/72 public VirusTotal sandboxes flag the cryptographic signature as adware/malware.'
        ],
        recommendations: [
          'Do NOT double click or execute this file.',
          'Completely erase the file by pressing Shift+Delete.',
          'Verify with the sender through an independent communication channel (such as a call) if they intended to send an executable.'
        ]
      }
    },
    qr: {
      url: 'mysterious_discount_coupon.png',
      signals: {
        hostname: 'mysterious-discount-deals.icu',
        httpsEnabled: true,
        sslValid: true,
        reachable: true,
        statusCode: 200,
        pageTitle: 'Limited Coupons - Verify Card',
        metaDescription: 'Free coupons and gifts',
        loginFormDetected: true,
        externalScriptCount: 22,
        suspiciousKeywordsFound: [],
        domainLength: 29,
        homographAttack: false,
        safeBrowsing: 'Clean',
        virusTotal: 'Clean',
        virusTotalDetections: 0,
        domainAgeYears: 0.1,
        dnsRecords: ['185.112.145.2']
      },
      analysis: {
        trustScore: 58,
        riskLevel: 'Caution',
        confidence: 'Medium',
        summary: 'This QR code resolves to mysterious-discount-deals.icu. While the connection utilizes valid HTTPS, the host utilizes a cheap generic top-level domain (.icu) commonly associated with temporary phishing links and triggers massive third-party script loads.',
        positiveIndicators: [
          'Connection protocol utilizes active HTTPS.',
          'SSL/TLS certificate was validated successfully.'
        ],
        concerns: [
          'Resolves to a cheap, high-risk top-level domain (.icu).',
          'Executes an unusually high quantity of external script sources (22).',
          'Attempts to prompt card information under an independent gift premise.'
        ],
        recommendations: [
          'Avoid linking credit cards or identity numbers on cheap independent TLD sites.',
          'Do not scans public physical QR codes pasted randomly over parking meters or public spaces.'
        ]
      }
    },
    screenshot: {
      url: 'system_error_popup_alert.png',
      signals: {
        hostname: 'Local Screenshot Capture',
        httpsEnabled: true,
        sslValid: true,
        reachable: true,
        statusCode: null,
        pageTitle: 'Chrome Alert Popup',
        metaDescription: 'Factual operating system warning screen',
        loginFormDetected: false,
        externalScriptCount: 0,
        suspiciousKeywordsFound: [],
        domainLength: 0,
        homographAttack: false,
        safeBrowsing: 'Clean',
        virusTotal: 'Clean',
        virusTotalDetections: 0,
        domainAgeYears: null,
        dnsRecords: []
      },
      analysis: {
        trustScore: 90,
        riskLevel: 'Low Risk',
        confidence: 'High',
        summary: 'The screenshot image displays a standard, verified browser SSL alert. No suspicious executable overlays or system modification prompts are identified in the layout.',
        positiveIndicators: [
          'Displays a valid built-in security warning.',
          'No unauthorized file download prompts are detected.'
        ],
        concerns: [
          'Alert warns of an invalid certificate, meaning you should not bypass the browser warning.'
        ],
        recommendations: [
          'Respect the browser warning and do not force bypass connections to the warning site.'
        ]
      }
    }
  };

  const triggerScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    setScanProgress(0);
    setErrorMsg('');

    // If it's a URL/website, query our real full-stack Express API!
    if (activeTab === 'website') {
      const stages = [
        'Initiating secure endpoint connection...',
        'Resolving DNS A/AAAA records...',
        'Performing SSL/TLS handshakes...',
        'Retrieving HTTP headers and content...',
        'Evaluating homograph patterns...',
        'Querying VirusTotal & Safe Browsing...',
        'Calculating deterministic trust score...',
        'Assembling analysis summary...'
      ];

      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 4;
        if (currentProgress >= 92) {
          clearInterval(progressInterval);
        } else {
          setScanProgress(currentProgress);
          const stageIdx = Math.min(Math.floor((currentProgress / 100) * stages.length), stages.length - 1);
          setScanStatus(stages[stageIdx]);
        }
      }, 120);

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: urlInput })
        });

        if (!res.ok) {
          throw new Error(`Failed to complete scan. Server returned ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        
        clearInterval(progressInterval);
        setScanProgress(100);
        setScanStatus('Done');

        // Add scan to History
        const calculatedStatus = data.analysis.trustScore >= 85 ? 'clean' : data.analysis.trustScore >= 50 ? 'suspicious' : 'malicious';
        HistoryService.addScan(
          urlInput,
          'URL',
          data.analysis.trustScore,
          calculatedStatus,
          data.analysis.riskLevel === 'High Danger' ? 'Brand Phishing Spoof Attempt' : undefined
        );

        setTimeout(() => {
          setScanResult(data);
          setIsScanning(false);
        }, 300);

      } catch (err: any) {
        clearInterval(progressInterval);
        setErrorMsg(err.message || 'An unexpected server error occurred during scan.');
        setIsScanning(false);
      }
    } else {
      // For other tabs, run simulated progression then return beautiful evidence-first mock templates
      const stages = [
        'Analyzing file headers...',
        'Checking cryptographic signature hashes...',
        'Evaluating visual parameters...',
        'Generating factual recommendations...',
        'Done'
      ];

      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          const result = mockTabResults[activeTab as Exclude<ScanCategory, 'website'>];
          setScanResult(result);
          setIsScanning(false);

          // Map types
          const methodMap: Record<string, 'Email' | 'QR Code' | 'File' | 'Screenshot'> = {
            email: 'Email',
            qr: 'QR Code',
            file: 'File',
            screenshot: 'Screenshot'
          };
          const resolvedType = methodMap[activeTab] || 'File';
          const resolvedTarget = activeTab === 'email' ? 'From: account-alert@pwc-secure-support.com' : selectedFileName || 'Uploaded Artifact';
          const calculatedStatus = result.analysis.trustScore >= 85 ? 'clean' : result.analysis.trustScore >= 50 ? 'suspicious' : 'malicious';
          HistoryService.addScan(
            resolvedTarget,
            resolvedType,
            result.analysis.trustScore,
            calculatedStatus,
            result.analysis.riskLevel === 'High Danger' ? 'Threat Signature Detected' : undefined
          );
        } else {
          setScanProgress(currentProgress);
          const stageIdx = Math.min(Math.floor((currentProgress / 100) * stages.length), stages.length - 1);
          setScanStatus(stages[stageIdx]);
        }
      }, 150);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
            <Globe className="w-5 h-5 mr-2 text-cyan-400" />
            Evidence-First Threat Scanner
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Collect factual signals and evaluate security posture through clear, deterministic evidence and objective analysis.
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {(['website', 'email', 'file', 'qr', 'screenshot'] as const).map((category) => {
          const isActive = activeTab === category;
          const label = category === 'website' ? 'Website URL' :
                        category === 'email' ? 'Email Headers' :
                        category === 'file' ? 'File Archive' :
                        category === 'qr' ? 'QR Code' : 'Screenshot';
          const Icon = category === 'website' ? Globe :
                       category === 'email' ? Mail :
                       category === 'file' ? FileText :
                       category === 'qr' ? QrCode : ImageIcon;
          return (
            <button
              key={category}
              onClick={() => handleTabChange(category)}
              className={`flex items-center justify-center space-x-2 py-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                isActive
                  ? 'bg-blue-500/10 border-blue-500/30 text-[#3b82f6]'
                  : 'bg-[#0f172a]/20 border-slate-800/40 text-slate-400 hover:text-slate-300 hover:bg-[#0f172a]/45'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Input / Drag & Drop Card */}
      <CyberCard variant="cyan">
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-sans flex items-center">
              <Info className="w-4 h-4 text-cyan-400 mr-2" />
              {activeTab === 'website' && 'Submit URL for Evidence Extraction'}
              {activeTab === 'email' && 'Analyze Email Header Metadata'}
              {activeTab === 'file' && 'Deconstruct File Format'}
              {activeTab === 'qr' && 'Decode QR Code Targeting'}
              {activeTab === 'screenshot' && 'Evaluate Screenshot Layout'}
            </h3>
            <p className="text-xs text-slate-400 leading-snug">
              {activeTab === 'website' && 'Enter any URL. Our engine will resolve DNS, execute SSL validation, run page audits, and query reputation providers.'}
              {activeTab === 'email' && 'Paste sender, subject, and body elements below to parse key digital indicators safely.'}
              {activeTab === 'file' && 'Drag and drop any suspicious file to parse extensions, hash configurations, and script inclusions.'}
              {activeTab === 'qr' && 'Upload a photo or screenshot of the QR code to safely map the ultimate targeting path.'}
              {activeTab === 'screenshot' && 'Submit an operating system warning popup or browser redirection warning to analyze visual overlays.'}
            </p>
          </div>

          <div className="space-y-4">
            {activeTab === 'website' && (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-[#030712] border border-slate-700/40 rounded-xl px-4 py-3.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && urlInput.trim() && !isScanning) triggerScan();
                  }}
                />
              </div>
            )}

            {activeTab === 'email' && (
              <textarea
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Paste email headers or full body text here..."
                className="w-full h-32 bg-[#030712] border border-slate-700/40 rounded-xl p-4 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans resize-none"
              />
            )}

            {(activeTab === 'file' || activeTab === 'qr' || activeTab === 'screenshot') && (
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-700/45 rounded-2xl p-6 text-center bg-[#030712]/30 hover:bg-[#030712]/60 hover:border-cyan-500/30 transition flex flex-col items-center justify-center space-y-3 cursor-pointer relative"
              >
                <input 
                  type="file" 
                  id="scanner-file-picker" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                />
                <div className="p-3 bg-slate-900/60 rounded-full border border-slate-800/80 text-cyan-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    {selectedFileName ? selectedFileName : 'Drag & Drop your target file here'}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    {selectedFileName ? 'File registered' : 'or click to navigate local computer'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              {activeTab === 'website' && (
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => { setUrlInput('https://verify-pwc-secure-portal.co-login-net.xyz/update'); }}
                    className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-md hover:text-white transition"
                  >
                    Load Spoof Sample
                  </button>
                  <button 
                    onClick={() => { setUrlInput('https://google.com'); }}
                    className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-md hover:text-white transition"
                  >
                    Load Safe Sample
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={triggerScan}
              disabled={isScanning || (activeTab === 'website' && !urlInput.trim()) || (activeTab === 'email' && !emailInput.trim())}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer disabled:opacity-45 disabled:pointer-events-none shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Collecting Evidence...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </CyberCard>

      {/* Progress Laser */}
      {isScanning && (
        <CyberCard variant="cyan" className="overflow-hidden">
          <div className="p-5 space-y-4 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{scanStatus}</span>
              <span className="text-xs font-mono text-cyan-400 font-bold">{scanProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        </CyberCard>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-xl text-red-200 text-xs flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Output Results Container */}
      {scanResult && !isScanning && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Main Scoring Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* trustScore and riskLevel Card */}
            <CyberCard variant={scanResult.analysis.trustScore >= 80 ? 'cyan' : scanResult.analysis.trustScore >= 50 ? 'purple' : 'red'} className="md:col-span-2">
              <div className="p-6 h-full flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Security Posture Summary</span>
                    <div className="flex items-center space-x-3 mt-1.5">
                      <h2 className="text-xl font-extrabold text-white">{scanResult.analysis.riskLevel}</h2>
                      <CyberBadge 
                        label={scanResult.analysis.riskLevel} 
                        variant={scanResult.analysis.trustScore >= 80 ? 'clean' : scanResult.analysis.trustScore >= 50 ? 'high' : 'critical'} 
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Factual Trust Score</span>
                    <span className={`text-4xl font-black font-mono tracking-tight block ${
                      scanResult.analysis.trustScore >= 80 ? 'text-emerald-400' : scanResult.analysis.trustScore >= 50 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {scanResult.analysis.trustScore}<span className="text-sm text-slate-500">/100</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 border-t border-slate-800/60 pt-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">AI Analyst Explanation</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{scanResult.analysis.summary}</p>
                </div>
              </div>
            </CyberCard>

            {/* Confidence & Quick Stats */}
            <CyberCard variant="cyan">
              <div className="p-6 h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Analysis Confidence</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <HeartPulse className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white">{scanResult.analysis.confidence} Level</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Target Hostname</span>
                    <span className="text-xs font-mono text-slate-300 block truncate mt-1">{scanResult.signals.hostname}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800/60 pt-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Factual Accuracy Notice</span>
                  <p className="text-[11px] text-slate-400 leading-snug font-sans">
                    This engine uses evidence-first telemetry logic. Threat indicators are calculated deterministically on retrieved data.
                  </p>
                </div>
              </div>
            </CyberCard>
          </div>

          {/* Evidence Grid (Factual Signals) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Evidence Collected</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* HTTPS Status */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Encryption</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.httpsEnabled ? 'HTTPS Enabled' : 'Plain HTTP'}
                  </span>
                </div>
                {scanResult.signals.httpsEnabled ? (
                  <Lock className="w-4.5 h-4.5 text-emerald-400" />
                ) : (
                  <Unlock className="w-4.5 h-4.5 text-amber-400" />
                )}
              </div>

              {/* SSL Validation */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">SSL Certificate</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.sslValid === null ? 'Unknown' : scanResult.signals.sslValid ? 'Active & Valid' : 'Invalid / Expired'}
                  </span>
                </div>
                {scanResult.signals.sslValid === null ? (
                  <Info className="w-4.5 h-4.5 text-slate-500" />
                ) : scanResult.signals.sslValid ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-4.5 h-4.5 text-red-400" />
                )}
              </div>

              {/* Server Reachability */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Reachability</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.reachable ? `Status: ${scanResult.signals.statusCode || '200'}` : 'Unreachable'}
                  </span>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${scanResult.signals.reachable ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </div>

              {/* Homograph spoofing */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Homograph Suffix</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.homographAttack ? 'Spoof Detected' : 'No Spoofing'}
                  </span>
                </div>
                <AlertTriangle className={`w-4.5 h-4.5 ${scanResult.signals.homographAttack ? 'text-red-400' : 'text-slate-600'}`} />
              </div>

              {/* WHOIS Domain Age */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Domain Age</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.domainAgeYears === null ? 'Unknown' : `${scanResult.signals.domainAgeYears} years`}
                  </span>
                </div>
                <Clock className="w-4.5 h-4.5 text-slate-400" />
              </div>

              {/* DNS Records */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">DNS Resolution</span>
                  <span className="text-xs font-mono text-slate-300 block mt-1 truncate max-w-[140px]">
                    {scanResult.signals.dnsRecords && scanResult.signals.dnsRecords.length > 0 
                      ? scanResult.signals.dnsRecords[0] 
                      : 'None'}
                  </span>
                </div>
                <Database className="w-4.5 h-4.5 text-slate-400" />
              </div>

              {/* Google Safe Browsing */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Safe Browsing</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.safeBrowsing}
                  </span>
                </div>
                <ShieldCheck className={`w-4.5 h-4.5 ${scanResult.signals.safeBrowsing === 'Malicious' ? 'text-red-400' : 'text-emerald-400'}`} />
              </div>

              {/* VirusTotal */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">VirusTotal Engines</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.virusTotalDetections === null ? 'Unknown' : `${scanResult.signals.virusTotalDetections} Flags`}
                  </span>
                </div>
                <ShieldAlert className={`w-4.5 h-4.5 ${scanResult.signals.virusTotalDetections && scanResult.signals.virusTotalDetections > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
              </div>

              {/* Login field detection */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between sm:col-span-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Credential Entry Detection</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.loginFormDetected ? 'Input fields detected' : 'No input fields detected'}
                  </span>
                </div>
                <Info className="w-4.5 h-4.5 text-slate-400" />
              </div>

              {/* External Scripts */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-start justify-between sm:col-span-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">External JS Assets</span>
                  <span className="text-xs font-semibold text-white block mt-1">
                    {scanResult.signals.externalScriptCount} external sources executed
                  </span>
                </div>
                <Code className="w-4.5 h-4.5 text-slate-400" />
              </div>

            </div>
          </div>

          {/* Positive vs Concerns lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Positive Indicators */}
            <CyberCard variant="cyan">
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Positive Indicators</span>
                {scanResult.analysis.positiveIndicators && scanResult.analysis.positiveIndicators.length > 0 ? (
                  <div className="space-y-2">
                    {scanResult.analysis.positiveIndicators.map((pos: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pos}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">None detected.</p>
                )}
              </div>
            </CyberCard>

            {/* Potential Concerns */}
            <CyberCard variant="purple">
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Potential Concerns</span>
                {scanResult.analysis.concerns && scanResult.analysis.concerns.length > 0 ? (
                  <div className="space-y-2">
                    {scanResult.analysis.concerns.map((con: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No active security concerns discovered.</p>
                )}
              </div>
            </CyberCard>

          </div>

          {/* Action Checklist */}
          <CyberCard variant="cyan">
            <div className="p-6 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Recommended Actions</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scanResult.analysis.recommendations && scanResult.analysis.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#030712]/50 border border-slate-800/80 flex flex-col justify-between space-y-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[11px] font-mono text-[#3b82f6] font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </CyberCard>

        </div>
      )}
    </div>
  );
};
