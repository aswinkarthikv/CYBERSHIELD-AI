import React, { useState, useEffect, useRef } from 'react';

interface CyberTerminalProps {
  logs: string[];
  title?: string;
  onComplete?: () => void;
  speed?: number; // millisecond intervals between lines
  className?: string;
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({
  logs,
  title = 'SHIELD SECUR-OPS SHELL v4.11',
  onComplete,
  speed = 180,
  className = '',
}) => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedLogs([]);
    setCurrentIndex(0);
  }, [logs]);

  useEffect(() => {
    if (logs.length === 0) return;

    if (currentIndex < logs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, logs[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, logs, speed, onComplete]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  return (
    <div className={`flex flex-col rounded-lg bg-black border border-slate-800 text-green-400 font-mono text-xs overflow-hidden shadow-inner ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 font-semibold tracking-wider">{title}</span>
        </div>
        <div className="text-[9px] text-cyan-500/70 uppercase">
          SECURE CONNECTION: [AES-256]
        </div>
      </div>

      {/* Terminal Display */}
      <div
        ref={containerRef}
        className="flex-1 p-3 overflow-y-auto space-y-1 bg-black/95 relative min-h-[160px] max-h-[300px]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
        
        {displayedLogs.map((log, index) => {
          const isError = log.includes('ERROR') || log.includes('FAILED') || log.includes('CRITICAL') || log.includes('THREAT DETECTED');
          const isSuccess = log.includes('SUCCESS') || log.includes('CLEAN') || log.includes('MITIGATED') || log.includes('RESOLVED');
          const isWarning = log.includes('WARNING') || log.includes('SUSPICIOUS');
          const isSystem = log.startsWith('>>') || log.startsWith('---');

          let textColor = 'text-green-400';
          if (isError) textColor = 'text-red-400 font-bold';
          else if (isSuccess) textColor = 'text-emerald-400 font-bold';
          else if (isWarning) textColor = 'text-amber-400';
          else if (isSystem) textColor = 'text-cyan-400 font-semibold';

          return (
            <div key={index} className={`leading-relaxed break-all ${textColor}`}>
              <span className="text-slate-600 mr-1.5 font-sans">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </div>
          );
        })}

        {currentIndex < logs.length ? (
          <div className="flex items-center text-cyan-400">
            <span className="w-2 h-4 bg-cyan-400 animate-pulse mr-2" />
            <span className="text-[10px] animate-pulse">EXECUTING SUB-ROUTINE ANALYTICS...</span>
          </div>
        ) : (
          <div className="flex items-center text-emerald-400 font-bold mt-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-2 animate-ping" />
            <span>&gt;&gt; OPERATIONS COMPLETE. DISCONNECTED.</span>
          </div>
        )}
      </div>
    </div>
  );
};
