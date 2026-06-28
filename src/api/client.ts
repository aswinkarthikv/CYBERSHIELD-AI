/**
 * CyberShield AI — Client API Gateway Wrapper
 */

export const apiClient = {
  /**
   * Invokes our real full-stack Express security scanning endpoint (/api/analyze)
   */
  scanUrl: async (url: string) => {
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!res.ok) {
        throw new Error(`Server API returned status ${res.status}`);
      }

      return await res.json();
    } catch (e: any) {
      console.error('[API Gateway Error]:', e);
      throw e;
    }
  },

  /**
   * Simulates retrieval of global threat bulletins or feeds
   */
  getThreatFeed: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 'FEED-01', text: 'Phishing campaign targeting financial organizations using dynamic QR redirects.', time: '12m ago' },
      { id: 'FEED-02', text: 'Obfuscated Powershell macro payloads found in fake HR salary letters.', time: '1h ago' }
    ];
  }
};
