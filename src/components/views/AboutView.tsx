import React from 'react';
import { Award, Code, Cpu, Server, ShieldCheck, Zap, Activity } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <CyberCard variant="cyan" glow={true} headerRail="CYBERSHIELD SCHEMATICS">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold uppercase tracking-wider font-sans text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-cyan-400" />
              Project Blueprint & Architectural Summary
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl font-sans">
              CyberShield AI was built as a premier hackathon project for the PwC Cybersecurity Hackathon, demonstrating enterprise-grade UI design and functional safety frameworks.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono text-slate-500">HACKATHON CLASS:</span>
            <CyberBadge label="PwC COMPLIANT" variant="cyan" />
          </div>
        </div>
      </CyberCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Architecture Schematic */}
        <CyberCard headerRail="PLATFORM TECHNICAL SPECIFICATION">
          <div className="p-5 space-y-4 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Unified Tech Stack</h4>
            
            <div className="space-y-3 font-sans">
              <div className="flex items-start space-x-3 p-2.5 rounded bg-slate-900/40 border border-slate-900">
                <Code className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white font-mono uppercase text-[11px]">Frontend Interface</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. Zero layout noise, fully responsive.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-2.5 rounded bg-slate-900/40 border border-slate-900">
                <Server className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white font-mono uppercase text-[11px]">Server Layer (Future Ready)</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">Python + FastAPI + Uvicorn proxying. Designed with clear separation of concerns in service layers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-2.5 rounded bg-slate-900/40 border border-slate-900">
                <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white font-mono uppercase text-[11px]">AI Cognitive Core (Future Ready)</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">Google Gemini 1.5/2.0 API. Orchestrated using server-side SDK calls with encrypted secrets.</p>
                </div>
              </div>
            </div>

            <div className="p-3 border border-dashed border-slate-800 rounded bg-slate-950/20 italic text-slate-400 text-justify">
              "The design philosophy is centered on clean craftsmanship: avoiding default UI patterns, prioritizing font selections, utilizing high-contrast accents, and providing visual feedback through terminal indicators."
            </div>
          </div>
        </CyberCard>

        {/* Hackathon Goals and Inspiration */}
        <CyberCard variant="purple" headerRail="PwC HACKATHON FOCUS MATRIX">
          <div className="p-5 space-y-4 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans text-purple-300">Hackathon Vision</h4>
            
            <p className="text-slate-300 leading-relaxed font-sans text-justify">
              Typical hackathon submissions create plain chatbot integrations or simplistic forms. CyberShield AI aims to change this by presenting judges with a polished, SaaS-quality dashboard.
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Evaluation Benchmarks:</span>
              
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="p-2 border border-slate-800 rounded bg-slate-900/20">
                  <span className="text-purple-400 font-bold block">✓ DESIGN</span>
                  High contrast dark canvas. No clutter.
                </div>
                <div className="p-2 border border-slate-800 rounded bg-slate-900/20">
                  <span className="text-cyan-400 font-bold block">✓ UTILITY</span>
                  Real interactive drill playbooks.
                </div>
                <div className="p-2 border border-slate-800 rounded bg-slate-900/20">
                  <span className="text-blue-400 font-bold block">✓ STABILITY</span>
                  Strict TypeScript types. No crashes.
                </div>
                <div className="p-2 border border-slate-800 rounded bg-slate-900/20">
                  <span className="text-emerald-400 font-bold block">✓ EXTENSIBILITY</span>
                  Separate logic and view templates.
                </div>
              </div>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
