import React from 'react';
import { ShieldCheck, ArrowRight, Globe, Mail, FileText, QrCode, Image as ImageIcon, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';

interface DashboardViewProps {
  onNavigate: (view: 'dashboard' | 'copilot' | 'analyzer' | 'reports' | 'settings', scannerType?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const securityScore = 94;

  const quickActions = [
    {
      id: 'website',
      title: 'Scan Website',
      description: 'Check any URL for suspicious links, scams, or malicious redirects.',
      icon: Globe,
      color: 'cyan',
    },
    {
      id: 'email',
      title: 'Analyze Email',
      description: 'Paste email headers or content to detect phishing and sender spoofing.',
      icon: Mail,
      color: 'blue',
    },
    {
      id: 'file',
      title: 'Scan File',
      description: 'Analyze documents or executables for hidden viruses and trojans safely.',
      icon: FileText,
      color: 'purple',
    },
    {
      id: 'qr',
      title: 'Scan QR Code',
      description: 'Decode QR links to reveal the actual target destination before visiting.',
      icon: QrCode,
      color: 'cyan',
    },
    {
      id: 'screenshot',
      title: 'Analyze Screenshot',
      description: 'Upload a screenshot of any message or alert for immediate AI threat advice.',
      icon: ImageIcon,
      color: 'blue',
    },
  ];

  const recentActivity = [
    {
      target: 'Google.com',
      status: 'safe',
      time: '2 hours ago',
      type: 'Website Scan',
    },
    {
      target: 'Invoice_68912.pdf',
      status: 'suspicious',
      time: 'Yesterday',
      type: 'File Analysis',
    },
    {
      target: 'Promotion-Discount QR Code',
      status: 'malicious',
      time: '5 minutes ago',
      type: 'QR Code Scan',
    },
    {
      target: 'DHL Delivery Notification Email',
      status: 'suspicious',
      time: '3 hours ago',
      type: 'Phishing Check',
    },
    {
      target: 'Github login confirmation link',
      status: 'safe',
      time: '1 day ago',
      type: 'Website Scan',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
            Welcome back.
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-sans">
            Your personal digital environment is currently shielded and monitored.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <CyberBadge label="System Protected" variant="clean" animateGlow={true} />
        </div>
      </div>

      {/* Main Apple Health / Microsoft Defender style Score Ring & Status Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Apple Health style Premium Score & Stats Card */}
        <div className="lg:col-span-5">
          <CyberCard variant="cyan" className="h-full">
            <div className="p-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  Digital Health Status
                </h3>
                <h2 className="text-lg font-bold text-white mt-1">Overall Security Score</h2>
              </div>

              {/* High Contrast Score Arc */}
              <div className="flex items-center space-x-6">
                <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" className="stroke-slate-800/80" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="56" 
                      cy="56" 
                      r="48" 
                      strokeWidth="8" 
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      strokeDashoffset={`${2 * Math.PI * 48 * (1 - securityScore / 100)}`}
                      className="stroke-cyan-400 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white font-sans tracking-tight">94%</span>
                    <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider">Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-300 font-sans">No Critical Breaches Detected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-xs text-slate-300 font-sans">AI Protection Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="text-xs text-slate-300 font-sans">Email Filtering Secured</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/60 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400">Scan Frequency: Daily Heuristic</span>
                <button 
                  onClick={() => onNavigate('settings')} 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
                >
                  Configure settings
                </button>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Clean, Simple Counters Grid (Microsoft Defender Vibe) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <CyberCard variant="purple">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <ShieldCheck className="w-6 h-6 text-purple-400" />
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mt-4 tracking-wider">Recent Scans</h4>
                <p className="text-3xl font-extrabold text-white mt-1 font-sans">24</p>
              </div>
              <p className="text-xs text-slate-400">Total websites, files, emails, and QR codes analyzed this week.</p>
            </div>
          </CyberCard>

          <CyberCard variant="red">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <ShieldAlert className="w-6 h-6 text-red-400" />
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mt-4 tracking-wider">Threats Blocked</h4>
                <p className="text-3xl font-extrabold text-red-400 mt-1 font-sans">2</p>
              </div>
              <p className="text-xs text-slate-400">High-risk attachments and credential phish links isolated.</p>
            </div>
          </CyberCard>

          <CyberCard variant="blue">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mt-4 tracking-wider">Safe Elements</h4>
                <p className="text-3xl font-extrabold text-white mt-1 font-sans">22</p>
              </div>
              <p className="text-xs text-slate-400">Verified links, benign PDFs, and legitimate QR targets.</p>
            </div>
          </CyberCard>
        </div>

      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white font-sans">
            Quick Cybersecurity Tools
          </h3>
          <span className="text-xs text-slate-400 font-sans">Choose what you want to verify next</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate('analyzer', action.id)}
                className="text-left group cursor-pointer h-full"
              >
                <CyberCard variant={action.color as any} className="p-5 h-full flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <div className="space-y-3">
                    <div className={`p-2.5 rounded-lg w-fit ${
                      action.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                      action.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans group-hover:text-cyan-400 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-snug font-sans">
                      {action.description}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 mt-4 transition-colors">
                    <span>Open Scanner</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CyberCard>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white font-sans">
          Recent Security Activity
        </h3>

        <div className="bg-[#0f172a]/40 border border-slate-700/35 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="divide-y divide-slate-800/50">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#0f172a]/20 transition"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'safe' ? 'bg-emerald-500/10 text-emerald-400' :
                    activity.status === 'suspicious' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {activity.status === 'safe' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-sans">{activity.target}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{activity.type}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-xs text-slate-500 font-mono">{activity.time}</span>
                  <CyberBadge 
                    label={activity.status === 'safe' ? 'Safe Scan' : activity.status === 'suspicious' ? 'Medium Risk' : 'High Risk'} 
                    variant={activity.status === 'safe' ? 'clean' : activity.status === 'suspicious' ? 'high' : 'critical'} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
