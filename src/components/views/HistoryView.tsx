import React, { useState, useEffect } from 'react';
import { 
  Clock, Search, Filter, ShieldAlert, CheckCircle2, 
  AlertTriangle, Trash2, ArrowUpRight, HelpCircle, FileText
} from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';
import { HistoryService } from '../../services/HistoryService';
import { ScanHistory } from '../../types';

export const HistoryView: React.FC<{ onInspect: (type: string, target: string) => void }> = ({ onInspect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [historyItems, setHistoryItems] = useState<ScanHistory[]>([]);

  useEffect(() => {
    // Dynamically load scans from real storage manager
    setHistoryItems(HistoryService.getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = HistoryService.deleteScan(id);
    setHistoryItems(updated);
  };

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.target.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.threatName && item.threatName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    
    const matchesRisk = riskFilter === 'All' || 
                        (riskFilter === 'Clean' && item.status === 'clean') ||
                        (riskFilter === 'Suspicious' && item.status === 'suspicious') ||
                        (riskFilter === 'Malicious' && item.status === 'malicious');

    return matchesSearch && matchesType && matchesRisk;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-cyan-400" />
            Threat Scan History
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit logs of previous threat detections, website scans, and artifact verifications.
          </p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Search scans by target, ID, or threat description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#030712]/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans"
          />
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-[#030712]/50 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
          >
            <option value="All">All Scan Methods</option>
            <option value="URL">Website URL</option>
            <option value="Email">Email Headers</option>
            <option value="QR Code">QR Code</option>
            <option value="File">File Archive</option>
            <option value="Screenshot">Screenshot</option>
          </select>
        </div>

        <div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full bg-[#030712]/50 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 font-sans cursor-pointer"
          >
            <option value="All">All Threat Levels</option>
            <option value="Clean">Safe (Low Risk)</option>
            <option value="Suspicious">Caution (Medium Risk)</option>
            <option value="Malicious">High Danger / Malicious</option>
          </select>
        </div>
      </div>

      {/* Main Table / Grid */}
      <CyberCard variant="cyan">
        <div className="overflow-x-auto">
          {filteredItems.length > 0 ? (
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800/85 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-5">ID / Date</th>
                  <th className="py-4 px-5">Target Artifact</th>
                  <th className="py-4 px-5">Method</th>
                  <th className="py-4 px-5 text-center">Trust Score</th>
                  <th className="py-4 px-5">Threat Assessment</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs">
                {filteredItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-slate-900/40 transition group cursor-pointer"
                    onClick={() => onInspect(item.type.toLowerCase() === 'qr code' ? 'qr' : item.type.toLowerCase(), item.target)}
                  >
                    <td className="py-4 px-5 space-y-1">
                      <span className="font-mono text-cyan-400 font-bold block">{item.id}</span>
                      <span className="text-[10px] text-slate-500 block">{item.date}</span>
                    </td>
                    <td className="py-4 px-5 max-w-xs md:max-w-md">
                      <div className="truncate font-mono text-slate-200 font-medium" title={item.target}>
                        {item.target}
                      </div>
                      {item.status !== 'clean' && (
                        <span className="text-[10px] text-red-400 mt-0.5 block font-sans">
                          🚨 Detected: {item.threatName}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-slate-400 font-semibold">{item.type}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`font-mono font-bold text-sm ${
                        item.riskScore >= 80 ? 'text-emerald-400' :
                        item.riskScore >= 50 ? 'text-amber-400' :
                        'text-red-400'
                      }`}>
                        {item.riskScore}/100
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <CyberBadge 
                        label={item.status === 'clean' ? 'Safe' : item.status === 'suspicious' ? 'Caution' : 'High Danger'} 
                        variant={item.status === 'clean' ? 'clean' : item.status === 'suspicious' ? 'high' : 'critical'} 
                      />
                    </td>
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onInspect(item.type.toLowerCase() === 'qr code' ? 'qr' : item.type.toLowerCase(), item.target)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                          title="Re-run Scanner"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-500/20 transition cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-300">No History Records Found</h4>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or executing a new threat analysis sweep.</p>
              </div>
            </div>
          )}
        </div>
      </CyberCard>
    </div>
  );
};
