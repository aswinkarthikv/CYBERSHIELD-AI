import { EvidenceObject } from './EvidenceService';

export const TrustScoreService = {
  calculateScore: (evidence: EvidenceObject): number => {
    const target = evidence.urlOrTarget.toLowerCase();
    
    // Whitelisted secure targets
    if (target.includes('google.com') || target.includes('github.com')) {
      return 100;
    }

    let score = 100;

    // Deduct for HTTPS missing
    if (!evidence.httpsEnabled) {
      score -= 20;
    }

    // Deduct for SSL invalid/unverified
    if (evidence.sslValid === false) {
      score -= 15;
    }

    // Deduct for suspicious redirect hoops
    if (evidence.redirectCount > 0) {
      score -= (evidence.redirectCount * 8);
    }

    // Deduct for credential capture logins on unknown portals
    if (evidence.loginFormDetected) {
      score -= 20;
    }

    // Deduct for suspicious keywords
    if (evidence.suspiciousKeywordsFound.length > 0) {
      score -= Math.min(evidence.suspiciousKeywordsFound.length * 8, 25);
    }

    // Deduct based on risk indicators list
    if (evidence.riskIndicators.length > 0) {
      score -= Math.min(evidence.riskIndicators.length * 12, 35);
    }

    // Deduct if external script count is very high on a login page
    if (evidence.externalScriptCount > 15) {
      score -= 10;
    }

    // Bound the score between 4 and 100
    return Math.max(4, Math.min(100, score));
  }
};
