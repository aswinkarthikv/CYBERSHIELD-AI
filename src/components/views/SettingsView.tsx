import React, { useState } from 'react';
import { Settings, Eye, EyeOff, ShieldCheck, Info, Bell, Key, Sparkles } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';
import { useTheme } from '../../context/ThemeContext';

export const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState('gsk_AIs819Dkas01KlqM29DslkO1823Hkas');
  const [showApiKey, setShowApiKey] = useState(false);
  const { theme: currentTheme, setTheme: setCurrentTheme } = useTheme();

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Settings Title */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
          <Settings className="w-5 h-5 mr-2 text-cyan-400" />
          Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure preferences, notifications, API credentials, and review product statements.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Theme Preferences */}
        <CyberCard variant="cyan">
          <div className="p-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Appearance & Theme</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white font-sans">Active Visual Theme</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Toggle between Dark Mode and Light Mode interface.</p>
              </div>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setCurrentTheme('dark')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentTheme === 'dark' 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Dark Mode
                </button>
                <button
                  onClick={() => setCurrentTheme('light')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentTheme === 'light' 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Light Mode
                </button>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* 2. Notifications Toggle */}
        <CyberCard variant="purple">
          <div className="p-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <Bell className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Security Notifications</h3>
            </div>

            <div className="space-y-3.5 divide-y divide-slate-800/40">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Inbound Phishing Email Alerts</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Receive immediate notifications when a high-risk scam targeting your contacts is reported.</p>
                </div>
                <button
                  onClick={() => setNotifEmail(!notifEmail)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${notifEmail ? 'bg-blue-600' : 'bg-slate-900 border border-slate-800'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifEmail ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Browser Redirection Warnings</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Enable instant push warnings on web redirects flagged by scanner.</p>
                </div>
                <button
                  onClick={() => setNotifPush(!notifPush)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${notifPush ? 'bg-blue-600' : 'bg-slate-900 border border-slate-800'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifPush ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">Weekly Security Report Summary</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Receive a compiled PDF statement in your email box at the end of every week.</p>
                </div>
                <button
                  onClick={() => setNotifWeekly(!notifWeekly)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${notifWeekly ? 'bg-blue-600' : 'bg-slate-900 border border-slate-800'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifWeekly ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* 3. API Key Credentials */}
        <CyberCard variant="cyan">
          <div className="p-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <Key className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Gemini API Connection</h3>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white font-sans">Google AI Studio / Gemini Key</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Connect your actual live Gemini API credentials to enable dynamic custom analysis responses for unique, highly advanced threat scans.
              </p>
              
              <div className="flex items-center space-x-2 pt-1.5">
                <div className="relative flex-1">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-2 text-xs font-mono bg-[#030712] border border-slate-700/40 rounded-xl text-white focus:outline-none"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white transition cursor-pointer">
                  Save
                </button>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* 4. About & Privacy Policy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <CyberCard variant="purple">
            <div className="p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">About CyberShield AI</h4>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
                <p><strong>App Version:</strong> 2.4.0 (Enterprise)</p>
                <p><strong>Build Signature:</strong> PwC-SaaS-Release-June-2026</p>
                <p>This software is built to empower individuals and small teams to immediately isolate and understand web, file, and credential scams using clean visual AI explanation models.</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="cyan">
            <div className="p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">Your Privacy Policy</h4>
              </div>
              <div className="text-[11px] text-slate-300 space-y-1.5 leading-relaxed font-sans">
                <div className="flex items-start space-x-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>No Logs Kept:</strong> Past text queries and screenshots are processed in transient memory and not saved.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Secure Encryption:</strong> Download checks calculate local cryptographic hashes to prevent actual file transmittals.</span>
                </div>
              </div>
            </div>
          </CyberCard>

        </div>

      </div>
    </div>
  );
};
