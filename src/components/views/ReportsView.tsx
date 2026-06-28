import React, { useState } from 'react';
import { FileText, Download, Plus, CheckCircle2, RefreshCw, AlertTriangle, Printer } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';

interface Report {
  id: string;
  title: string;
  date: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 'REP-102',
      title: 'Weekly Personal Digital Health Checkup',
      date: '2026-06-25',
      threatType: 'Overall Status Check',
      severity: 'low',
    },
    {
      id: 'REP-101',
      title: 'Phishing Email Exposure Report',
      date: '2026-06-20',
      threatType: 'Inbound Spearphishing',
      severity: 'high',
    },
    {
      id: 'REP-100',
      title: 'Malicious Invoice Macro Audit',
      date: '2026-06-14',
      threatType: 'File Trojan Sandbox',
      severity: 'critical',
    },
    {
      id: 'REP-099',
      title: 'Instagram Takeover Analysis Report',
      date: '2026-06-08',
      threatType: 'Social Media Account Hijack',
      severity: 'medium',
    },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [newReportTitle, setNewReportTitle] = useState('My Custom Scan Audit');
  const [newReportType, setNewReportType] = useState('Website Scan');
  const [newReportSeverity, setNewReportSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('low');

  const [showForm, setShowForm] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const newReport: Report = {
        id: `REP-${Math.floor(100 + Math.random() * 900)}`,
        title: newReportTitle,
        date: new Date().toISOString().split('T')[0],
        threatType: newReportType,
        severity: newReportSeverity,
      };

      setReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
      setShowForm(false);
      // Reset form variables
      setNewReportTitle('My Custom Scan Audit');
      setNewReportType('Website Scan');
      setNewReportSeverity('low');
    }, 1500);
  };

  const triggerDownload = (report: Report) => {
    // Generate simple print/save file download simulation
    const content = `CYBERSHIELD AI SECURITY REPORT\n==============================\nID: ${report.id}\nTitle: ${report.title}\nDate: ${report.date}\nThreat Category: ${report.threatType}\nSeverity: ${report.severity.toUpperCase()}\n\nThis executive summary document certifies that CyberShield AI has completed heuristic and visual analyses on the target. Follow recommended procedures on the CyberShield AI Assistant dashboard for immediate defense steps.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.toLowerCase().replace(/\s+/g, '_')}_${report.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-cyan-400" />
            Security Reports
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Access, download, and review previous executive scans and threat analysis PDFs.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Report</span>
          </button>
        )}
      </div>

      {/* Report Generator Creator form */}
      {showForm && (
        <CyberCard variant="cyan">
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-sans">
              Report Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase block">Report Title:</label>
                <input
                  type="text"
                  value={newReportTitle}
                  onChange={(e) => setNewReportTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#030712] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase block">Threat Category:</label>
                <input
                  type="text"
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#030712] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase block">Threat Severity:</label>
                <select
                  value={newReportSeverity}
                  onChange={(e: any) => setNewReportSeverity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#030712] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Danger</option>
                  <option value="critical">Critical Emergency</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2 border-t border-slate-800/40">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating || !newReportTitle.trim()}
                className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <span>Compile PDF Statement</span>
                )}
              </button>
            </div>
          </div>
        </CyberCard>
      )}

      {/* Main Reports List */}
      <div className="bg-[#0f172a]/40 border border-slate-700/35 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800/50">
          {reports.map((report) => (
            <div 
              key={report.id} 
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#0f172a]/20 transition"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 shrink-0">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">{report.title}</h4>
                  <div className="flex items-center space-x-3 mt-1.5 flex-wrap gap-y-1.5">
                    <span className="text-[11px] text-slate-500 font-mono">{report.id}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[11px] text-slate-400 font-mono">{report.date}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[11px] text-slate-400 font-sans">{report.threatType}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-slate-800/50 pt-3 sm:pt-0">
                <CyberBadge 
                  label={report.severity === 'low' ? 'Low Risk' : report.severity === 'medium' ? 'Medium Risk' : report.severity === 'high' ? 'High Danger' : 'Critical'} 
                  variant={report.severity === 'critical' ? 'critical' : report.severity === 'high' ? 'high' : report.severity === 'medium' ? 'medium' : 'clean'} 
                />

                <button
                  onClick={() => triggerDownload(report)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-750 bg-slate-900 hover:bg-slate-850 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
