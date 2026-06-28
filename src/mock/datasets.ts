/**
 * CyberShield AI — Realistic Security Hackathon Datasets
 */

export interface SafeWebsiteMock {
  url: string;
  domain: string;
  title: string;
  score: number;
}

export interface SuspiciousWebsiteMock {
  url: string;
  domain: string;
  reason: string;
  score: number;
}

export const mockSafeWebsites: SafeWebsiteMock[] = [
  { url: 'https://google.com', domain: 'google.com', title: 'Google Search Platform', score: 100 },
  { url: 'https://github.com', domain: 'github.com', title: 'GitHub Developer Repository', score: 98 },
  { url: 'https://pwc.com', domain: 'pwc.com', title: 'PricewaterhouseCoopers Global', score: 100 },
  { url: 'https://microsoft.com', domain: 'microsoft.com', title: 'Microsoft Corporation', score: 99 }
];

export const mockSuspiciousWebsites: SuspiciousWebsiteMock[] = [
  { 
    url: 'https://verify-pwc-secure-portal.co-login-net.xyz/update', 
    domain: 'verify-pwc-secure-portal.co-login-net.xyz', 
    reason: 'Punycode lookalike domain attempting to gather employee SSO tokens.',
    score: 12 
  },
  { 
    url: 'https://secure-banking-verification-system.icu/auth', 
    domain: 'secure-banking-verification-system.icu', 
    reason: 'Unregistered domain utilizing generic trust-inducing words on a cheap TLD suffix (.icu).',
    score: 38 
  },
  { 
    url: 'https://pwc-secure-support.com/login', 
    domain: 'pwc-secure-support.com', 
    reason: 'Lookalike corporate security support landing domain serving credential grabbers.',
    score: 42 
  }
];

export const mockPhishingEmails = [
  {
    sender: 'account-alert@pwc-secure-support.com',
    subject: 'URGENT: Password Verification Required',
    body: 'Dear User, Your security login session is about to expire. Please click here immediately to verify your security keys and retain account access: http://pwc-secure-support.com/auth',
    flaggedIndicators: ['Faked domain address suffix', 'Coercive language triggers', 'Embedded non-HTTPS hyperlinks']
  }
];

export const mockQRDeceptiveCodes = [
  {
    targetUrl: 'https://mysterious-discount-deals.icu/verify',
    title: 'Free 90% Holiday Promo Code Scan',
    riskScore: 58,
    indicators: ['Direct transfer to cheap TLD .icu', 'Overwhelming analytics trackings']
  }
];

export const mockMaliciousFiles = [
  {
    filename: 'salary_spreadsheet_Q2.pdf.exe',
    extensionType: 'Double Extension masquerading as document',
    detectionCount: '4 / 72 (VirusTotal)',
    threatType: 'Double-Extension Trojan Signature'
  }
];
