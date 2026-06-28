import React from 'react';
import { SeverityLevel } from '../types';

interface CyberBadgeProps {
  label: string;
  variant?: SeverityLevel | 'clean' | 'suspicious' | 'malicious' | 'mitigated' | 'active' | 'investigating' | 'resolved' | 'info' | 'cyan';
  animateGlow?: boolean;
}

export const CyberBadge: React.FC<CyberBadgeProps> = ({
  label,
  variant = 'info',
  animateGlow = false,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'critical':
      case 'malicious':
        return {
          bg: 'bg-red-950/45 border-red-500/30 text-red-400',
          dot: 'bg-red-500 shadow-[0_0_8px_#ef4444]',
        };
      case 'high':
      case 'suspicious':
        return {
          bg: 'bg-amber-950/45 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
        };
      case 'medium':
      case 'investigating':
        return {
          bg: 'bg-yellow-950/45 border-yellow-500/30 text-yellow-400',
          dot: 'bg-yellow-400 shadow-[0_0_8px_#eab308]',
        };
      case 'low':
      case 'info':
        return {
          bg: 'bg-blue-950/45 border-blue-500/30 text-blue-400',
          dot: 'bg-blue-400 shadow-[0_0_8px_#60a5fa]',
        };
      case 'clean':
      case 'resolved':
      case 'mitigated':
        return {
          bg: 'bg-emerald-950/45 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
        };
      case 'cyan':
      case 'active':
        return {
          bg: 'bg-cyan-950/45 border-cyan-500/30 text-cyan-400',
          dot: 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]',
        };
      default:
        return {
          bg: 'bg-slate-900 border-slate-700 text-slate-300',
          dot: 'bg-slate-400',
        };
    }
  };

  const colors = getColors();

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono tracking-wider select-none ${colors.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${animateGlow ? 'animate-ping duration-1000' : ''}`} />
      <span className="uppercase text-[10px] font-semibold">{label}</span>
    </span>
  );
};
