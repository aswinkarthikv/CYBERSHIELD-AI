export interface EvidenceObject {
  urlOrTarget: string;
  hostname?: string;
  httpsEnabled: boolean;
  sslValid: boolean | null;
  redirectCount: number;
  loginFormDetected: boolean;
  externalScriptCount: number;
  domainReachability: 'Active' | 'Inactive' | 'Unknown';
  dnsStatus: 'Configured' | 'Missing' | 'Unknown';
  suspiciousKeywordsFound: string[];
  pageTitle: string;
  metaDescription: string;
  contentLength: number;
  riskIndicators: string[];
  confidence: 'High' | 'Medium' | 'Low';
}

export const EvidenceService = {
  getMockEvidence: (type: 'URL' | 'Email' | 'QR Code' | 'File' | 'Screenshot', target: string): EvidenceObject => {
    // Return realistic evidence based on target keyword or pre-loaded samples
    const lowerTarget = target.toLowerCase();

    if (type === 'URL' || lowerTarget.startsWith('http')) {
      if (lowerTarget.includes('verify-pwc-secure-portal')) {
        return {
          urlOrTarget: target,
          hostname: 'verify-pwc-secure-portal.co-login-net.xyz',
          httpsEnabled: false,
          sslValid: false,
          redirectCount: 2,
          loginFormDetected: true,
          externalScriptCount: 14,
          domainReachability: 'Active',
          dnsStatus: 'Configured',
          suspiciousKeywordsFound: ['pwc', 'secure', 'portal', 'login', 'verify'],
          pageTitle: 'Official PwC Security Login Update Required',
          metaDescription: 'Please authenticate with your employee credentials to verify your security clearance.',
          contentLength: 4096,
          riskIndicators: [
            'Non-HTTPS credential collection portal',
            'Punycode-spoofed hostname matching high-profile brand',
            'Recent domain creation registry log',
            'External script resources from unvetted domains'
          ],
          confidence: 'High'
        };
      }

      if (lowerTarget.includes('google.com') || lowerTarget.includes('github.com')) {
        return {
          urlOrTarget: target,
          hostname: lowerTarget.includes('google.com') ? 'google.com' : 'github.com',
          httpsEnabled: true,
          sslValid: true,
          redirectCount: 0,
          loginFormDetected: false,
          externalScriptCount: 3,
          domainReachability: 'Active',
          dnsStatus: 'Configured',
          suspiciousKeywordsFound: [],
          pageTitle: lowerTarget.includes('google.com') ? 'Google' : 'GitHub: Let\'s build from here',
          metaDescription: 'Global established service platform.',
          contentLength: 102450,
          riskIndicators: [],
          confidence: 'High'
        };
      }

      // Generic suspicious url fallback
      return {
        urlOrTarget: target,
        hostname: new URL(target.startsWith('http') ? target : `https://${target}`).hostname || 'unknown-host.net',
        httpsEnabled: false,
        sslValid: null,
        redirectCount: 1,
        loginFormDetected: true,
        externalScriptCount: 8,
        domainReachability: 'Active',
        dnsStatus: 'Configured',
        suspiciousKeywordsFound: ['login', 'account', 'verify'],
        pageTitle: 'User Security Lockout Alert',
        metaDescription: 'Verify your login details to release the temporary system hold.',
        contentLength: 2150,
        riskIndicators: [
  'Domain reputation not verified.',
  'WHOIS information not available.',
  'SSL validation pending.',
  'External reputation services not queried.'
],
        confidence: 'Medium'
      };
    }

    if (type === 'Email') {
      return {
        urlOrTarget: target,
        hostname: 'pwc-secure-support.com',
        httpsEnabled: false,
        sslValid: false,
        redirectCount: 0,
        loginFormDetected: true,
        externalScriptCount: 3,
        domainReachability: 'Active',
        dnsStatus: 'Configured',
        suspiciousKeywordsFound: ['pwc', 'secure', 'support', 'alert'],
        pageTitle: 'Unverified Email Body',
        metaDescription: 'From: account-alert@pwc-secure-support.com',
        contentLength: 1240,
        riskIndicators: [
          'Counterfeit corporate domain suffix',
          'Implicit threat pressure tactics (2-hour limit)',
          'Direct embedded link to non-HTTPS external domain'
        ],
        confidence: 'High'
      };
    }

    if (type === 'File') {
      return {
        urlOrTarget: target,
        hostname: 'Local Upload',
        httpsEnabled: false,
        sslValid: null,
        redirectCount: 0,
        loginFormDetected: false,
        externalScriptCount: 0,
        domainReachability: 'Inactive',
        dnsStatus: 'Unknown',
        suspiciousKeywordsFound: ['.exe'],
        pageTitle: target,
        metaDescription: 'Binary machine program disguised as spreadsheet',
        contentLength: 819200,
        riskIndicators: [
          'Double extension scheme (.pdf.exe) aiming to hide program nature',
          'Absence of developer cryptographic signature credentials',
          'Triggers heuristic threat matches on 4 sandbox databases'
        ],
        confidence: 'High'
      };
    }

    if (type === 'QR Code') {
      return {
        urlOrTarget: target,
        hostname: 'mysterious-discount-deals.icu',
        httpsEnabled: true,
        sslValid: true,
        redirectCount: 1,
        loginFormDetected: true,
        externalScriptCount: 22,
        domainReachability: 'Active',
        dnsStatus: 'Configured',
        suspiciousKeywordsFound: ['discount', 'deal', 'gift'],
        pageTitle: 'Get 90% Promo Codes - Verify Identity',
        metaDescription: 'Complete social verification to redeem gifts.',
        contentLength: 5120,
        riskIndicators: [
          'Direct redirect to a cheap top-level domain (.icu)',
          'Excessive external script analytics trackers loading',
          'Attempts to query location permissions immediately'
        ],
        confidence: 'Medium'
      };
    }

    // Default or Screenshot fallback
    return {
      urlOrTarget: target,
      hostname: 'Local Image Scan',
      httpsEnabled: true,
      sslValid: true,
      redirectCount: 0,
      loginFormDetected: true,
      externalScriptCount: 0,
      domainReachability: 'Active',
      dnsStatus: 'Configured',
      suspiciousKeywordsFound: ['error', 'virus', 'call', 'support'],
      pageTitle: 'Rendered Frame Capture',
      metaDescription: 'Visual scan of active dialog window overlay.',
      contentLength: 154000,
      riskIndicators: [
        'Detected technical support scam alert template text elements',
        'Urgent prompt requesting user to call an unverified toll-free telephone hotline',
        'Faked web-browser window decorations intended to block screen exit paths'
      ],
      confidence: 'Medium'
    };
  }
};
