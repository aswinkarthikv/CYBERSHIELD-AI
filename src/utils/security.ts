/**
 * CyberShield AI Security & Formatting Utilities
 */

export const securityUtils = {
  /**
   * Sanitizes text inputs to prevent simple cross-site scripting (XSS) injection attempts
   */
  sanitizeInput: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  },

  /**
   * Evaluates hostname indicators and returns a formatted display string
   */
  getDomainNameOnly: (url: string): string => {
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsedUrl.hostname;
    } catch {
      return url;
    }
  },

  /**
   * Extracts risk categorization badge labels based on trust ranges
   */
  getRiskLabel: (score: number): 'Safe' | 'Caution' | 'Malicious' => {
    if (score >= 85) return 'Safe';
    if (score >= 50) return 'Caution';
    return 'Malicious';
  }
};
