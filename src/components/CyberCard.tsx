import React from 'react';

interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'purple' | 'red' | 'default';
  glow?: boolean;
  className?: string;
  headerRail?: string;
  footerRail?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({
  children,
  variant = 'default',
  glow = false,
  className = '',
  headerRail,
  footerRail,
  ...props
}) => {
  const getBorderColor = () => {
    switch (variant) {
      case 'cyan': return 'border-cyan-500/30 hover:border-cyan-400/60';
      case 'blue': return 'border-blue-500/30 hover:border-blue-400/60';
      case 'purple': return 'border-purple-500/30 hover:border-purple-400/60';
      case 'red': return 'border-red-500/30 hover:border-red-400/60';
      default: return 'border-slate-700/40 hover:border-slate-600/50';
    }
  };

  const getGlowColor = () => {
    if (!glow) return '';
    switch (variant) {
      case 'cyan': return 'shadow-[0_0_15px_rgba(6,182,212,0.15)]';
      case 'blue': return 'shadow-[0_0_15px_rgba(59,130,246,0.15)]';
      case 'purple': return 'shadow-[0_0_15px_rgba(139,92,246,0.15)]';
      case 'red': return 'shadow-[0_0_15px_rgba(239,68,68,0.15)]';
      default: return 'shadow-[0_0_15px_rgba(255,255,255,0.02)]';
    }
  };

  return (
    <div
      className={`relative rounded-2xl border bg-[#0f172a]/60 backdrop-blur-md transition-all duration-300 overflow-hidden ${getBorderColor()} ${getGlowColor()} ${className}`}
      {...props}
    >
      {/* Visual cyber design accent - header tech rail */}
      {headerRail && (
        <div className="absolute top-0 left-0 right-0 h-1.5 flex items-center justify-between px-3 bg-slate-900/80 border-b border-slate-800/50">
          <span className="text-[7px] font-mono tracking-widest text-slate-500 uppercase">{headerRail}</span>
          <div className="flex space-x-1">
            <div className={`w-1 h-1 rounded-full ${variant === 'red' ? 'bg-red-500' : 'bg-cyan-500'}`} />
            <div className="w-1 h-1 rounded-full bg-slate-700" />
          </div>
        </div>
      )}

      {/* Grid Pattern Background overlay for futuristic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

      {/* Card Content Area */}
      <div className={`${headerRail ? 'pt-5' : ''} ${footerRail ? 'pb-5' : ''} h-full`}>
        {children}
      </div>

      {/* Visual cyber design accent - footer tech rail */}
      {footerRail && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/60 border-t border-slate-800/30 flex items-center justify-end px-3">
          <span className="text-[6px] font-mono text-slate-600 tracking-wider uppercase">{footerRail}</span>
        </div>
      )}
    </div>
  );
};
