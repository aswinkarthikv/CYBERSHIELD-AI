import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Sparkles, Search, FileText, Settings, 
  Menu, X, Bell, Clock, Zap, RefreshCw 
} from 'lucide-react';

// Import Redesigned Views
import { DashboardView } from './components/views/DashboardView';
import { CopilotView } from './components/views/CopilotView';
import { AnalyzerView } from './components/views/AnalyzerView';
import { ReportsView } from './components/views/ReportsView';
import { HistoryView } from './components/views/HistoryView';
import { SettingsView } from './components/views/SettingsView';

// Components
import { CyberBadge } from './components/CyberBadge';
import { CyberTerminal } from './components/CyberTerminal';
import { ScanLineOverlay } from './components/ScanLineOverlay';
import { ExtensionSimulator } from './components/ExtensionSimulator';

type ViewType = 'dashboard' | 'copilot' | 'analyzer' | 'reports' | 'history' | 'settings';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedScannerType, setSelectedScannerType] = useState<string | undefined>(undefined);
  const [selectedScannerUrl, setSelectedScannerUrl] = useState<string | undefined>(undefined);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Quick Posture Sweep States
  const [isGlobalScanning, setIsGlobalScanning] = useState(false);
  const [globalScanLogs, setGlobalScanLogs] = useState<string[]>([]);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Tick local clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation Links definition - EXACT items required by user
  const navigationItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: Home },
    { id: 'copilot' as ViewType, label: 'AI Security Copilot', icon: Sparkles },
    { id: 'analyzer' as ViewType, label: 'Threat Scanner', icon: Search },
    { id: 'reports' as ViewType, label: 'Reports', icon: FileText },
    { id: 'history' as ViewType, label: 'History', icon: Clock },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  const triggerGlobalScan = () => {
    setIsGlobalScanning(true);
    setGlobalScanLogs([
      '>> INITIATING RAPID DIGITAL HEALTH SWEEP ...',
      'Verifying browser certificate directories ... SECURE',
      'Checking local download histories ... SECURE',
      'Scanning QR redirection logs ... SECURE',
      'Evaluating background process safety ... SECURE',
      'SUCCESS: SWEEP COMPLETE. NO THREAT EXPOSURES DETECTED.'
    ]);
  };

  const handleGlobalScanComplete = () => {
    setTimeout(() => {
      setIsGlobalScanning(false);
      setUnreadCount(prev => prev + 1);
    }, 1200);
  };

  const notifications = [
    { id: 1, title: 'Inbound Phishing Email Blocked', desc: 'A counterfeit invoice email was quarantined.', time: '12 mins ago', urgent: true },
    { id: 2, title: 'Weekly Health Report Compiled', desc: 'Your security overview is ready to download.', time: '1 hour ago', urgent: false },
  ];

  const handleNavigateWithScanner = (view: ViewType, scannerType?: string, scannerUrl?: string) => {
    setSelectedScannerType(scannerType);
    setSelectedScannerUrl(scannerUrl);
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex overflow-hidden">
      
      {/* Background visual asset: glowing clean gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-cyber-bg to-cyber-bg pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none animate-grid-glow" />

      {/* 1. SIDEBAR NAVIGATION - DESKTOP */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0f172a]/80 border-r border-slate-700/40 shrink-0 z-30 relative backdrop-blur-xl">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60 space-x-2.5">
          <div className="p-1.5 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-bold">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wider text-white uppercase font-sans">CyberShield AI</h1>
            <p className="text-[10px] font-mono text-cyan-400 tracking-wider font-semibold">Detect. Explain. Protect.</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedScannerType(undefined);
                  setSelectedScannerUrl(undefined);
                  setActiveView(item.id);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl border text-xs font-semibold tracking-wider transition duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-500/10 border-blue-500/20 text-[#3b82f6]'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20 hover:border-slate-700/30'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-[#3b82f6]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-slate-800/60 text-center font-mono">
          <span className="text-[8px] text-slate-600 uppercase tracking-widest block">Enterprise Shield Ready</span>
          <span className="text-[9px] text-cyan-400/80 mt-1 block font-bold">RELEASE 2.4.0</span>
          <span className="text-[8px] text-slate-500 mt-2 block uppercase tracking-wider">Made By Aswin Karthik Vijayakumar</span>
        </div>
      </aside>

      {/* 2. SIDEBAR NAVIGATION - MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Slide-out Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-[#0f172a] border-r border-slate-700/40 z-50 flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700/40">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-extrabold tracking-wider uppercase text-white font-sans">CyberShield AI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Menu Links */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedScannerType(undefined);
                        setSelectedScannerUrl(undefined);
                        setActiveView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl border text-xs font-semibold tracking-wider transition duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-blue-500/10 border-blue-500/20 text-[#3b82f6]'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-700/40 text-center font-mono">
                <span className="text-[8px] text-slate-600 uppercase tracking-widest block">Enterprise Shield Ready</span>
                <span className="text-[8px] text-slate-500 mt-2 block uppercase tracking-wider">Made By Aswin Karthik Vijayakumar</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. MAIN COCKPIT VIEWPORT CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        
        {/* TOP CONTROL HEADER */}
        <header className="h-16 shrink-0 bg-[#0f172a]/80 border-b border-slate-700/40 px-4 lg:px-6 flex items-center justify-between relative z-20 backdrop-blur-md">
          {/* Mobile hamburger menu and brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition rounded-md border border-slate-700/40 bg-slate-900/45 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="lg:hidden flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-extrabold uppercase text-white font-sans">CyberShield AI</span>
            </div>

            {/* Desktop clock info */}
            <div className="hidden md:flex items-center space-x-3 text-xs font-sans">
              <div className="flex items-center text-slate-400 text-[11px] font-mono">
                <Clock className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Sweep, Notifications & Profile */}
          <div className="flex items-center space-x-4">
            
            {/* Live sweep */}
            <button
              onClick={triggerGlobalScan}
              disabled={isGlobalScanning}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-blue-500/30 bg-blue-950/20 text-[#3b82f6] font-sans text-[11px] font-bold uppercase hover:bg-blue-900/30 transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isGlobalScanning ? 'Sweeping...' : 'Live Posture Sweep'}</span>
            </button>

            {/* Notifications Menu */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotificationMenu(!showNotificationMenu);
                  setUnreadCount(0);
                }} 
                className="p-2 text-slate-400 hover:text-white transition rounded-xl border border-slate-700/40 bg-[#0f172a]/85 relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
              </button>

              <AnimatePresence>
                {showNotificationMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowNotificationMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-[#0f172a] border border-slate-700/40 rounded-2xl p-4 z-20 shadow-2xl space-y-2.5 font-sans"
                    >
                      <div className="flex items-center justify-between border-b border-slate-750 pb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Activity Feed</span>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Live Monitor</span>
                      </div>
                      
                      <div className="space-y-2">
                        {notifications.map((n) => (
                          <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/40 text-xs hover:bg-slate-900 transition">
                            <div className="flex items-center justify-between">
                              <span className={`font-bold font-mono text-[9px] uppercase ${n.urgent ? 'text-red-400' : 'text-cyan-400'}`}>
                                {n.urgent ? '⚠ ALERT' : '✓ SYSTEM'}
                              </span>
                              <span className="text-[9px] text-slate-500 font-mono">{n.time}</span>
                            </div>
                            <p className="text-white font-sans mt-0.5 font-bold text-[11px] leading-tight">{n.title}</p>
                            <p className="text-slate-400 text-[10px] mt-0.5 leading-snug">{n.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 border-l border-slate-700/40 pl-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 flex items-center justify-center font-bold text-white text-xs font-mono">
                AK
              </div>
              <div className="hidden xl:block text-left">
                <span className="text-[10px] font-bold text-slate-300 block uppercase tracking-wider leading-none">Aswin Karthik</span>
                <span className="text-[9px] text-slate-500 block leading-tight mt-0.5 font-mono">aswinkarthik@pwc.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* PRIMARY WINDOW WRAPPER & ROUTER CONTROLS */}
        <main className="flex-1 p-4 lg:p-6 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {/* Navigation Router Conditions */}
              {activeView === 'dashboard' && (
                <DashboardView 
                  onNavigate={(view, type) => handleNavigateWithScanner(view, type)} 
                />
              )}
              {activeView === 'copilot' && <CopilotView />}
              {activeView === 'analyzer' && (
                <AnalyzerView 
                  initialType={selectedScannerType as any} 
                  initialUrl={selectedScannerUrl} 
                />
              )}
              {activeView === 'reports' && <ReportsView />}
              {activeView === 'history' && (
                <HistoryView 
                  onInspect={(type, target) => handleNavigateWithScanner('analyzer', type as any, target)} 
                />
              )}
              {activeView === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>

          {/* CHROME BROWSER EXTENSION SIMULATOR FLOATING ACTION BUTTON & WINDOW */}
          <ExtensionSimulator 
            onAnalyzeUrl={(url) => handleNavigateWithScanner('analyzer', 'website', url)} 
            onNavigateToDashboard={() => setActiveView('dashboard')} 
          />

          {/* GLOBAL MONITOR SWEEP MODAL */}
          <AnimatePresence>
            {isGlobalScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="w-full max-w-lg bg-[#0f172a] border border-slate-700/40 rounded-2xl overflow-hidden relative shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                >
                  <ScanLineOverlay />
                  
                  <div className="p-5 space-y-4">
                    <div className="flex items-center space-x-3 text-cyan-400">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <h4 className="text-sm font-bold uppercase tracking-wider font-mono">Executing Security Sweep</h4>
                    </div>
                    
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Scanning digital endpoints and browser verification tokens securely in real time.
                    </p>

                    <CyberTerminal
                      logs={globalScanLogs}
                      onComplete={handleGlobalScanComplete}
                      speed={100}
                      title="CYBERSHIELD-AI // SCANNER"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
