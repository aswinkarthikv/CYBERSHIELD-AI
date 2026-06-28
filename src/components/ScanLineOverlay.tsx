import React from 'react';

export const ScanLineOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 rounded-xl">
      {/* Scan Line Laser */}
      <div className="absolute left-0 right-0 h-[2px] bg-cyan-400 opacity-60 shadow-[0_0_10px_#06b6d4,0_0_20px_#06b6d4] animate-scan-down" />
      
      {/* Matrix digital terminal vibe */}
      <div className="absolute inset-0 bg-cyan-950/5 mix-blend-color-dodge animate-pulse duration-1000" />
    </div>
  );
};
