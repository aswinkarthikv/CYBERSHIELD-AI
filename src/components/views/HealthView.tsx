import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Shield, CheckCircle2, AlertTriangle, Play, RefreshCw, Terminal, Search, HelpCircle, ShieldCheck } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';
import { CyberTerminal } from '../CyberTerminal';
import { scanHistoryList, securityScoreHistory, mockStats } from '../../data';

export const HealthView: React.FC = () => {
  const [currentScore, setCurrentScore] = useState(mockStats.securityScore);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [showAuditResults, setShowAuditResults] = useState(false);
  const [auditHistory, setAuditHistory] = useState(scanHistoryList);

  const [activeRemediationId, setActiveRemediationId] = useState<string | null>(null);

  const triggerAuditScan = () => {
    setIsAuditing(true);
    setShowAuditResults(false);

    const logs = [
      '>> INITIALIZING GLOBAL SECURITY COMPLIANCE AUDIT ...',
      'Contacting Sentinel Defender nodes (6/6 active)',
      'Scanning local workstation Group Policies ... SECURE',
      'Analyzing Active Directory domain user privileges ...',
      'WARNING: Detected 3 legacy users with elevated Admin privileges missing MFA',
      'Probing external-facing IPv4/IPv6 edge gateways ... SECURE',
      'Verifying cloud storage bucket ACL permissions ... SECURE',
      'Checking endpoint firmware baseline signatures ...',
      'WARNING: 2 local host workstations lack active CrowdStrike kernel probes',
      'Compiling audit telemetry data into security index ...',
      '>> AUDIT SUITE COMPLETE. THREAT INTELLIGENCE FEED REFRESHED.'
    ];
    setAuditLogs(logs);
  };

  const handleAuditComplete = () => {
    setIsAuditing(false);
    setShowAuditResults(true);
    // Increase security score to showcase remediation
    setCurrentScore(91);

    // Append a new scan log item to history
    const auditRecord = {
      id: `S-${Math.floor(Math.random() * 900) + 2100}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      target: 'Full Domain Audit (Local Subnet)',
      type: 'Network' as any,
      riskScore: 24,
      status: 'suspicious' as any,
      threatName: 'Elevated Admin Access without MFA',
      confidence: 95
    };
    setAuditHistory(prev => [auditRecord, ...prev]);
  };

  const recommendations = [
    {
      id: 'REC-01',
      title: 'Enforce MFA on High-Sensitivity Domain Admins',
      vulnerability: 'Active Directory Privileged Accounts',
      impact: 'Reduces lateral credential theft risks by 99.8%',
      difficulty: 'Easy',
      status: 'active'
    },
    {
      id: 'REC-02',
      title: 'Update Local Endpoint Heuristic Engines',
      vulnerability: 'Out-of-date Defender signatures on Node EP-401',
      impact: 'Protects against zero-day DLL side-loading actions',
      difficulty: 'Medium',
      status: 'active'
    },
    {
      id: 'REC-03',
      title: 'Restrict Public ICMP Ping Requests',
      vulnerability: 'Firewall VPC Egress policies overly permissible',
      impact: 'Minimizes reconnaissance network probing visibility',
      difficulty: 'Easy',
      status: 'remediated'
    }
  ];

  const [remediationStates, setRemediationStates] = useState(recommendations);

  const handleRemediate = (id: string) => {
    setActiveRemediationId(id);
    setTimeout(() => {
      setRemediationStates(prev => 
        prev.map(rec => rec.id === id ? { ...rec, status: 'remediated' } : rec)
      );
      // Boost score
      setCurrentScore(prev => Math.min(prev + 3, 100));
      setActiveRemediationId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top section: Security Posture Ring & Audit trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <CyberCard variant="cyan" glow={true} headerRail="CYBERPOSTURE STANDARDS INDEX">
            <div className="p-5 flex flex-col items-center justify-center text-center">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">Enterprise Score Index</h4>
              
              <div className="relative flex items-center justify-center w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" className="stroke-slate-900" strokeWidth="6" fill="transparent" />
                  <circle cx="80" cy="80" r="70" strokeWidth="8" fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - currentScore / 100)}`}
                    className="stroke-cyan-400 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-white font-mono">{currentScore}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase mt-0.5">COMPLIANT</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-300 font-sans">
                  Your overall security index meets standard hackathon benchmarks. Run deep checks periodically to ensure node integrity.
                </p>
              </div>
            </div>
          </CyberCard>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <CyberCard variant="blue" headerRail="SENTINEL INTEGRATION ENGINE">
            <div className="p-5 flex flex-col h-full justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-sans">Vulnerability Audit Suite</h4>
                <p className="text-xs text-slate-300 font-sans mb-4">
                  Conduct a complete multi-node audit checking security baseline status, physical USB locks, un-authenticated open endpoints, network egress loops, and active Directory credentials.
                </p>
              </div>

              {isAuditing && (
                <div className="mb-4">
                  <CyberTerminal
                    logs={auditLogs}
                    onComplete={handleAuditComplete}
                    speed={120}
                    title="COMPLIANCE-ENGINE // NODAL-AUDIT"
                  />
                </div>
              )}

              {!isAuditing && showAuditResults && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-sans mb-4 flex items-center space-x-2 animate-fade-in">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold">Global Audit Completed:</span> Posture Index increased dynamically by discovering 3 remediable indicators. Vulnerability report compiled.
                  </div>
                </div>
              )}

              {!isAuditing && (
                <button
                  onClick={triggerAuditScan}
                  className="flex items-center justify-center space-x-2 py-3 px-6 rounded-md bg-blue-950/20 border border-blue-500/40 text-blue-400 font-mono text-xs font-bold uppercase hover:bg-blue-900/30 active:scale-98 transition cursor-pointer w-full md:w-auto self-start"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Run Live System Security Audit</span>
                </button>
              )}
            </div>
          </CyberCard>
        </div>
      </div>

      {/* Graphical Insights Suite */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score History Graph */}
        <CyberCard variant="cyan" headerRail="HISTORIC COMPLIANCE TRACKING">
          <div className="p-5">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">Security Score Trend (5-Week View)</h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={securityScoreHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.15)" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[50, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090f1e', border: '1px solid rgba(51,65,85,0.4)', borderRadius: '8px' }} 
                    itemStyle={{ color: '#ffffff', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#22d3ee" fillOpacity={1} fill="url(#scoreColor)" name="Posture Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CyberCard>

        {/* Audit Recommendations List */}
        <CyberCard variant="purple" headerRail="ACTIVE REMEDIATION TASKS">
          <div className="p-5">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">Urgent Fixes Recommended</h4>
            
            <div className="space-y-3">
              {remediationStates.map((rec) => (
                <div key={rec.id} className="p-3 bg-slate-900/30 border border-slate-800/40 rounded flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-purple-400 font-bold">{rec.id}</span>
                      <p className="font-sans font-bold text-white leading-tight">{rec.title}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">Exposure: {rec.vulnerability}</p>
                    <p className="text-[10px] text-slate-500 font-sans italic">Impact: {rec.impact}</p>
                  </div>
                  
                  <div className="shrink-0">
                    {rec.status === 'remediated' ? (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center bg-emerald-950/20 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        ✓ FIX APPLIED
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRemediate(rec.id)}
                        disabled={activeRemediationId === rec.id}
                        className="text-[10px] font-mono bg-purple-950/20 hover:bg-purple-900/30 text-purple-400 hover:text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded cursor-pointer transition disabled:opacity-50"
                      >
                        {activeRemediationId === rec.id ? 'Fixing...' : 'Remediate'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CyberCard>
      </div>

      {/* Historical Previous Scans Log */}
      <CyberCard headerRail="HISTORIC THREAT LOGS">
        <div className="p-5">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">Security Scans Log</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase">
                  <th className="pb-2">Scan ID</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Vector Type</th>
                  <th className="pb-2">Target Node/Payload</th>
                  <th className="pb-2 text-center">Risk Index</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditHistory.map((scan) => (
                  <tr key={scan.id} className="border-b border-slate-900 hover:bg-slate-950/40 transition">
                    <td className="py-2.5 font-bold text-white">{scan.id}</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">{scan.date}</td>
                    <td className="py-2.5">
                      <CyberBadge label={scan.type} variant="cyan" />
                    </td>
                    <td className="py-2.5 text-slate-300 max-w-[200px] truncate">{scan.target}</td>
                    <td className="py-2.5 text-center font-bold">
                      <span className={scan.riskScore >= 75 ? 'text-red-400' : scan.riskScore >= 40 ? 'text-amber-400' : 'text-emerald-400'}>
                        {scan.riskScore}%
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <CyberBadge label={scan.status} variant={scan.status as any} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CyberCard>
    </div>
  );
};
