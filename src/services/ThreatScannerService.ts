import { EvidenceService, EvidenceObject } from './EvidenceService';
import { TrustScoreService } from './TrustScoreService';
import { AIService, AIAnalysisResult } from './AIService';

export interface ScanPipelineReport {
  id: string;
  timestamp: string;
  target: string;
  type: 'URL' | 'Email' | 'QR Code' | 'File' | 'Screenshot';
  evidence: EvidenceObject;
  trustScore: number;
  aiAnalysis: AIAnalysisResult;
  status: 'clean' | 'suspicious' | 'malicious';
}

export const ThreatScannerService = {
  validateInput: (type: 'URL' | 'Email' | 'QR Code' | 'File' | 'Screenshot', value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Target value cannot be blank. Please enter an artifact for analysis.';
    }

    if (type === 'URL') {
      const lower = value.toLowerCase().trim();
      const validWebPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!validWebPattern.test(lower)) {
        return 'Invalid URL format. Please supply a correctly structured web address.';
      }
    }

    return null; // Input is valid
  },

  runScan: async (
    type: 'URL' | 'Email' | 'QR Code' | 'File' | 'Screenshot',
    target: string,
    onProgressUpdate?: (step: string, percent: number) => void
  ): Promise<ScanPipelineReport> => {
    // Pipeline Steps Simulation
    
    // Step 1: Validate
    onProgressUpdate?.('Validating inputs and scanning registry entries...', 15);
    await new Promise(resolve => setTimeout(resolve, 600));

    // Step 2: Collect Evidence
    onProgressUpdate?.('Collecting live network and structural evidence...', 40);
    const evidence = EvidenceService.getMockEvidence(type, target);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 3: Calculate Trust Score
    onProgressUpdate?.('Calculating deterministic trust telemetry score...', 65);
    const trustScore = TrustScoreService.calculateScore(evidence);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 4: AI Threat Explanation & Recommendations
    onProgressUpdate?.('Invoking CyberShield AI explanation engine...', 85);
    const aiAnalysis = await AIService.analyzeThreat(type, target, evidence, trustScore);

    // Final Report Assembly
    onProgressUpdate?.('Assembling diagnostic audit records...', 100);
    await new Promise(resolve => setTimeout(resolve, 300));

    let status: 'clean' | 'suspicious' | 'malicious' = 'clean';
    if (trustScore < 50) {
      status = 'malicious';
    } else if (trustScore < 85) {
      status = 'suspicious';
    }

    const report: ScanPipelineReport = {
      id: `SCAN-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      target,
      type,
      evidence,
      trustScore,
      aiAnalysis,
      status
    };

    return report;
  }
};
