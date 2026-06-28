export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ThreatActivity {
  id: string;
  timestamp: string;
  source: string;
  category: string;
  severity: SeverityLevel;
  status: 'mitigated' | 'active' | 'investigating' | 'resolved';
  description: string;
}

export interface SecurityMetric {
  label: string;
  value: number;
  change: string;
  type: 'increase' | 'decrease' | 'neutral';
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  initialArtifacts: string[];
  questions: {
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface EmergencyScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTimeline: string;
  steps: {
    id: number;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    actionLabel: string;
    isExecuted: boolean;
  }[];
}

export interface ScanHistory {
  id: string;
  date: string;
  target: string;
  type: 'URL' | 'Email' | 'QR Code' | 'File' | 'Screenshot' | 'Network' | 'Active Directory';
  riskScore: number;
  status: 'clean' | 'suspicious' | 'malicious';
  threatName?: string;
  confidence: number;
}
