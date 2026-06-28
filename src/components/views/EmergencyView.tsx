import React, { useState } from 'react';
import { ShieldAlert, Clock, AlertOctagon, CheckCircle2, Lock, ArrowRight, Skull, Instagram, CreditCard, Play } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';
import { emergencyScenarios } from '../../data';

export const EmergencyView: React.FC = () => {
  const [selectedId, setSelectedId] = useState('instahack');
  const [playbookState, setPlaybookState] = useState(emergencyScenarios);
  const [isSimulatingLock, setIsSimulatingLock] = useState(false);
  const [isLockComplete, setIsLockComplete] = useState(false);

  const activeScenario = playbookState.find(s => s.id === selectedId) || playbookState[0];

  const handleStepToggle = (scenarioId: string, stepId: number) => {
    setPlaybookState(prev => 
      prev.map(sc => {
        if (sc.id !== scenarioId) return sc;
        return {
          ...sc,
          steps: sc.steps.map(step => 
            step.id === stepId ? { ...step, isExecuted: !step.isExecuted } : step
          )
        };
      })
    );
  };

  const calculateProgress = () => {
    const executed = activeScenario.steps.filter(s => s.isExecuted).length;
    return Math.round((executed / activeScenario.steps.length) * 100);
  };

  const progress = calculateProgress();

  const handleSimulateLock = () => {
    setIsSimulatingLock(true);
    setTimeout(() => {
      setIsSimulatingLock(false);
      setIsLockComplete(true);
      // Automatically execute first isolation step
      setPlaybookState(prev => 
        prev.map(sc => {
          if (sc.id !== selectedId) return sc;
          return {
            ...sc,
            steps: sc.steps.map((step, idx) => 
              idx === 0 ? { ...step, isExecuted: true } : step
            )
          };
        })
      );
    }, 2000);
  };

  const getTimelineSteps = (id: string) => {
    switch (id) {
      case 'instahack':
        return [
          { time: 'T+00 Mins', action: 'Global session revocation triggered, cutting off current attacker sessions.' },
          { time: 'T+15 Mins', action: 'Scan connected OAuth API layers and audit external accounts.' },
          { time: 'T+30 Mins', action: 'Reset standard authenticator seeds and generate physical recovery codes.' },
          { time: 'T+01 Hour', action: 'Distribute a standardized notice to your contacts to ignore DMs.' }
        ];
      case 'ransomware':
        return [
          { time: 'T+00 Mins', action: 'Sever local workstation Ethernet cable and disable WLAN adapters.' },
          { time: 'T+10 Mins', action: 'Deploy live RAM dump diagnostics to salvage unencrypted key logs.' },
          { time: 'T+30 Mins', action: 'Correlate folder extensions to global database patterns.' },
          { time: 'T+02 Hours', action: 'Perform backup health check to identify the latest clean baseline.' }
        ];
      default:
        return [
          { time: 'T+00 Mins', action: 'Alert commercial bank compliance desks and execute hot freezes.' },
          { time: 'T+10 Mins', action: 'Revoke target account single sign-on parameters globally.' },
          { time: 'T+25 Mins', action: 'Update firewall domain list to blackhole spoofed addresses.' }
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <CyberCard variant="red" glow={true} headerRail="INCIDENT MANAGEMENT CRISIS CONSOLE">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold uppercase tracking-wider font-sans text-white flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
              Emergency Response Playbook Control
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl font-sans">
              Critical, step-by-step incident containment runbooks designed to mitigate active threat traversal. 
              Toggle steps below as you apply containment safeguards in real-time, monitoring execution metrics.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono text-slate-500 uppercase">INCIDENT STATUS:</span>
            <CyberBadge label="MONITORING EGRESS" variant="medium" animateGlow={true} />
          </div>
        </div>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Incident Scenarios selection */}
        <div className="lg:col-span-4 space-y-4">
          <CyberCard headerRail="INCIDENT SELECT PANEL">
            <div className="p-4 space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">Select Active Outbreak:</span>
              
              <div className="space-y-2">
                {playbookState.map((sc) => {
                  const Icon = sc.id === 'instahack' ? Instagram :
                               sc.id === 'ransomware' ? Skull : CreditCard;
                  const isSelected = selectedId === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setSelectedId(sc.id);
                        setIsLockComplete(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border flex items-center space-x-3 transition cursor-pointer ${
                        isSelected 
                          ? 'bg-red-950/25 border-red-500/40 text-red-400' 
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded ${isSelected ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-white truncate">{sc.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{sc.estimatedTimeline} containment</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Instant Red-Button containment widget */}
              <div className="pt-4 border-t border-slate-800/60 space-y-3">
                <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Master Network Sever</h5>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  Triggers local network containment adapters, severing outbound routing blocks to isolate your system.
                </p>
                <button
                  onClick={handleSimulateLock}
                  disabled={isSimulatingLock || isLockComplete}
                  className={`w-full py-2 px-4 rounded font-mono text-xs font-bold uppercase transition flex items-center justify-center space-x-2 border cursor-pointer ${
                    isLockComplete
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                      : 'bg-red-950/20 border-red-500/40 hover:bg-red-900/20 text-red-400'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSimulatingLock ? 'SEVERING ADAPTERS...' : 
                     isLockComplete ? '✓ NETWORK ISOLATED' : 'SEVER NETWORK ADAPTER'}
                  </span>
                </button>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Right column: Incident response Guided Cockpit */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Playbook Steps Checklist */}
            <div className="md:col-span-7 space-y-4">
              <CyberCard variant="red" headerRail="GUIDED ACTION STEPS CHECKLIST">
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Playbook Control</span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">{activeScenario.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Containment Progress</span>
                      <span className="text-sm font-bold text-red-400 font-mono">{progress}% Complete</span>
                    </div>
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full bg-slate-900 h-2 rounded overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-amber-500 h-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Checklist items */}
                  <div className="space-y-4 pt-2">
                    {activeScenario.steps.map((step) => (
                      <div 
                        key={step.id} 
                        className={`p-3.5 rounded-lg border transition ${
                          step.isExecuted 
                            ? 'bg-slate-900/30 border-emerald-500/30 opacity-70' 
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={step.isExecuted}
                              onChange={() => handleStepToggle(selectedId, step.id)}
                              className="w-4 h-4 rounded border-slate-800 text-red-500 bg-slate-950 focus:ring-red-500 focus:ring-offset-slate-900 mt-0.5 cursor-pointer"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[10px] font-bold text-slate-500">STEP {step.id}</span>
                                <CyberBadge label={step.priority} variant={step.priority as any} />
                              </div>
                              <p className={`text-xs font-bold mt-0.5 ${step.isExecuted ? 'line-through text-slate-500' : 'text-white'}`}>
                                {step.title}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive simulation button for the action */}
                        <div className="mt-3 pt-2.5 border-t border-slate-800/40 flex justify-end">
                          <button
                            onClick={() => handleStepToggle(selectedId, step.id)}
                            className={`text-[10px] font-mono px-3 py-1 rounded border transition cursor-pointer uppercase ${
                              step.isExecuted 
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            {step.isExecuted ? '✓ Complete' : step.actionLabel}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CyberCard>
            </div>

            {/* Recovery Timeline */}
            <div className="md:col-span-5 space-y-4">
              <CyberCard variant="cyan" headerRail="FORENSIC CONTAINMENT TIMELINE">
                <div className="p-5 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-cyan-400" />
                    Response Timeline Goals
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    SaaS incident timeline tracking guidelines for optimal digital forensic containment and minimum operational friction.
                  </p>

                  <div className="relative border-l border-slate-800 ml-2 pl-4 space-y-5 py-2">
                    {getTimelineSteps(selectedId).map((item, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-[#030712] group-hover:bg-cyan-400 transition" />
                        
                        <div className="space-y-0.5">
                          <span className="font-mono text-[9px] font-bold text-cyan-400 bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-500/20">
                            {item.time}
                          </span>
                          <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1">
                            {item.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider mb-1">Containment target</span>
                    <div className="flex items-center text-xs font-mono font-bold text-white">
                      <Clock className="w-4 h-4 text-cyan-400 mr-2" />
                      <span>{activeScenario.estimatedTimeline} Total Range</span>
                    </div>
                  </div>
                </div>
              </CyberCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
