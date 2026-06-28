import React, { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  currentTime: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentTime }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Bar Indicator */}
      <div className="bg-[#0B132B]/80 backdrop-blur-md border-b border-slate-900 px-6 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="font-bold tracking-widest text-cyan-400">CYBERSHIELD AI OPERATIONAL SYSTEMS</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>UTC FEED: <span className="text-slate-200">{currentTime}</span></span>
          <span className="text-emerald-400 animate-pulse">● SYSTEMS SYNCED</span>
        </div>
      </div>
      
      {/* Dynamic View Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
};
