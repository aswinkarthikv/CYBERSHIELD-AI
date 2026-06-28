import { ScanHistory } from '../types';

const STORAGE_KEY = 'cybershield_scan_history';

const defaultHistory: ScanHistory[] = [
  {
    id: 'SCAN-904',
    date: '2026-06-26 21:12',
    target: 'https://verify-pwc-secure-portal.co-login-net.xyz/update',
    type: 'URL',
    riskScore: 12,
    status: 'malicious',
    threatName: 'Brand Spoof Phishing (PwC Mock Target)',
    confidence: 94
  },
  {
    id: 'SCAN-903',
    date: '2026-06-26 18:45',
    target: 'salary_spreadsheet_Q2.pdf.exe',
    type: 'File',
    riskScore: 35,
    status: 'malicious',
    threatName: 'Double-Extension Trojan',
    confidence: 88
  },
  {
    id: 'SCAN-902',
    date: '2026-06-25 10:30',
    target: 'mysterious_discount_coupon.png',
    type: 'QR Code',
    riskScore: 58,
    status: 'suspicious',
    threatName: 'Cheap TLD Redirect (.icu)',
    confidence: 76
  },
  {
    id: 'SCAN-901',
    date: '2026-06-24 14:22',
    target: 'From: account-alert@pwc-secure-support.com',
    type: 'Email',
    riskScore: 42,
    status: 'suspicious',
    threatName: 'Counterfeit Corporate Sender',
    confidence: 90
  },
  {
    id: 'SCAN-900',
    date: '2026-06-24 09:15',
    target: 'https://google.com',
    type: 'URL',
    riskScore: 100,
    status: 'clean',
    confidence: 99
  },
  {
    id: 'SCAN-899',
    date: '2026-06-23 16:40',
    target: 'system_error_popup_alert.png',
    type: 'Screenshot',
    riskScore: 90,
    status: 'clean',
    confidence: 92
  }
];

export const HistoryService = {
  getHistory: (): ScanHistory[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read scan history from storage:', e);
    }
    // Return defaults and write to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHistory));
    return defaultHistory;
  },

  addScan: (target: string, type: 'URL' | 'Email' | 'QR Code' | 'File' | 'Screenshot', riskScore: number, status: 'clean' | 'suspicious' | 'malicious', threatName?: string) => {
    const history = HistoryService.getHistory();
    const newRecord: ScanHistory = {
      id: `SCAN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      target,
      type,
      riskScore,
      status,
      threatName: status !== 'clean' ? threatName || `${type} Anomaly Detected` : undefined,
      confidence: Math.floor(75 + Math.random() * 25)
    };
    
    const updated = [newRecord, ...history];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store scan history update:', e);
    }
    return updated;
  },

  deleteScan: (id: string): ScanHistory[] => {
    const history = HistoryService.getHistory();
    const updated = history.filter(item => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store scan history deletion:', e);
    }
    return updated;
  },

  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear scan history:', e);
    }
  }
};
