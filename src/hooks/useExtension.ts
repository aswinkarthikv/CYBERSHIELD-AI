import { useState, useEffect } from 'react';
import { ExtensionService, ExtensionState } from '../services/ExtensionService';

export const useExtension = () => {
  const [state, setState] = useState<ExtensionState>({
    isInstalled: false,
    activeHostname: '',
    activeUrl: '',
    hasActiveProtection: false
  });

  useEffect(() => {
    // Get simulated extension state
    setState(ExtensionService.getSimulatedState());

    // Listen for extension events
    const handleMessage = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Received extension message in react hooks:', customEvent.detail);
    };

    window.addEventListener('cybershield_extension_message', handleMessage);
    return () => {
      window.removeEventListener('cybershield_extension_message', handleMessage);
    };
  }, []);

  return state;
};
