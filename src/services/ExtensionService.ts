export interface ExtensionState {
  isInstalled: boolean;
  activeHostname: string;
  activeUrl: string;
  hasActiveProtection: boolean;
}

export const ExtensionService = {
  getSimulatedState: (): ExtensionState => {
    return {
      isInstalled: true,
      activeHostname: 'verify-pwc-secure-portal.co-login-net.xyz',
      activeUrl: 'https://verify-pwc-secure-portal.co-login-net.xyz/update',
      hasActiveProtection: true
    };
  },

  postMessageToApp: (action: string, payload: any) => {
    console.log(`[Chrome Extension Sim] Posting Message:`, { action, payload });
    // In a real Chrome extension, this would do chrome.runtime.sendMessage
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cybershield_extension_message', {
        detail: { action, payload }
      }));
    }
  }
};
