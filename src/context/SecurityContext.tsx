import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockStats } from '../data';

interface SecurityContextProps {
  score: number;
  systemStatus: string;
  updateScore: (newScore: number) => void;
  activeScansCount: number;
  incrementScans: () => void;
}

const SecurityContext = createContext<SecurityContextProps | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<number>(mockStats.securityScore);
  const [systemStatus, setSystemStatus] = useState<string>(mockStats.systemStatus);
  const [activeScansCount, setActiveScansCount] = useState<number>(142);

  const updateScore = (newScore: number) => {
    setScore(newScore);
    if (newScore >= 85) {
      setSystemStatus('SHIELD ACTIVE');
    } else if (newScore >= 50) {
      setSystemStatus('ALERT CAUTION');
    } else {
      setSystemStatus('CRITICAL THREAT');
    }
  };

  const incrementScans = () => {
    setActiveScansCount(prev => prev + 1);
  };

  return (
    <SecurityContext.Provider value={{
      score,
      systemStatus,
      updateScore,
      activeScansCount,
      incrementScans
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
