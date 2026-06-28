import React, { useState } from 'react';
import { 
  Puzzle, X, ShieldAlert, ShieldCheck, Globe, 
  ExternalLink, ArrowRight, Zap, AlertTriangle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExtensionSimulatorProps {
  onAnalyzeUrl: (url: string) => void;
  onNavigateToDashboard: () => void;
}

export const ExtensionSimulator: React.FC<ExtensionSimulatorProps> = ({ 
  onAnalyzeUrl, 
  onNavigateToDashboard 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number>(0);

  const presets = [
    {
      hostname: 'verify-pwc-secure-portal.co-login-net.xyz',
      url: 'https://verify-pwc-secure-portal.co-login-net.xyz/update',
      trustScore: 12,
      status: 'malicious',
      message: 'Suspicious brand keywords and punycode spoof detected.'
    },
    {
      hostname: 'pwc-secure-support.com',
      url: 'https://pwc-secure-support.com/auth/login',
      trustScore: 42,
      status: 'suspicious',
      message: 'Unverified young domain targeting corporate branding.'
    },
    {
      hostname: 'google.com',
      url: 'https://google.com',
      trustScore: 100,
      status: 'clean',
      message: 'Legitimate established globally reputable domain.'
    }
  ];

  const currentPreset = presets[selectedPreset];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-full shadow-[0_8px_30px_rgba(30,58,138,0.45)] hover:shadow-[0_8px_40px_rgba(6,182,212,0.4)] border border-cyan-400/20 transition cursor-pointer font-semibold text-xs"
      >
        <Puzzle className="w-4.5 h-4.5 animate-pulse text-cyan-200" />
        <span>Try Chrome Extension Popup</span>
        <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-80 bg-[#0B1220] border-2 border-slate-750 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Mock Chrome Header Bar */}
            <div className="bg-[#131B2E] border-b border-slate-850 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-[10px]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                <span className="pl-1.5 text-slate-400">Chrome Extension Simulator</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Active Website selector (so users can test different outcomes!) */}
            <div className="bg-slate-950/80 border-b border-slate-850 px-4 py-2 flex items-center justify-between gap-1.5">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Active Tab URL:</span>
              <div className="flex gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPreset(idx)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer border transition ${
                      selectedPreset === idx 
                        ? 'bg-blue-500/10 border-blue-500/40 text-[#3b82f6]' 
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* CyberShield Extension UI Popup */}
            <div className="p-4 space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-[#3B82F6] text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white tracking-wide leading-none uppercase">CyberShield AI</h4>
                    <span className="text-[8px] text-cyan-400 font-mono tracking-widest font-bold">Active Protection</span>
                  </div>
                </div>

                <span className="text-[10px] text-emerald-400 font-mono flex items-center bg-emerald-950/30 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Current Domain Details */}
              <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-3 space-y-2">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Current Site Detected</span>
                
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-mono text-white truncate max-w-[180px] font-semibold" title={currentPreset.url}>
                    {currentPreset.hostname}
                  </span>
                </div>

                <div className="pt-1.5 border-t border-slate-800/40 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Extension Trust Score</span>
                  <span className={`text-base font-black font-mono ${
                    currentPreset.trustScore >= 80 ? 'text-emerald-400' :
                    currentPreset.trustScore >= 50 ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {currentPreset.trustScore}<span className="text-[10px] text-slate-500">/100</span>
                  </span>
                </div>
              </div>

              {/* Threat Alert Status banner */}
              {currentPreset.status === 'malicious' && (
                <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-xl flex items-start space-x-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-red-400 block uppercase font-mono tracking-wider">High Risk Alert</span>
                    <p className="text-[11px] text-red-200 leading-tight font-sans">{currentPreset.message}</p>
                  </div>
                </div>
              )}

              {currentPreset.status === 'suspicious' && (
                <div className="bg-amber-950/20 border border-amber-900/40 p-3 rounded-xl flex items-start space-x-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-400 block uppercase font-mono tracking-wider">Caution advised</span>
                    <p className="text-[11px] text-amber-200 leading-tight font-sans">{currentPreset.message}</p>
                  </div>
                </div>
              )}

              {currentPreset.status === 'clean' && (
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-xl flex items-start space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase font-mono tracking-wider">Verified Secure</span>
                    <p className="text-[11px] text-emerald-200 leading-tight font-sans">{currentPreset.message}</p>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onAnalyzeUrl(currentPreset.url);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer shadow-lg"
                >
                  <span>Analyze with CyberShield AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    onNavigateToDashboard();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold text-xs border border-slate-800 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Web Dashboard</span>
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-[#131B2E] border-t border-slate-850 px-4 py-2 text-center text-[9px] font-mono text-slate-500">
              CyberShield AI Protection Engine v1.1.2
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
