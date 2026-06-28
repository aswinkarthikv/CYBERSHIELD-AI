import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, AlertTriangle, HelpCircle, ArrowRight, Award, RotateCcw, BookOpen, ShieldAlert } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';
import { simulationScenarios } from '../../data';

export const SimulatorView: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const activeScenario = simulationScenarios.find(s => s.id === selectedScenarioId);

  const handleStartScenario = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setScore(0);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!activeScenario) return;

    const isCorrect = optionIndex === activeScenario.questions[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const nextAnswers = [...selectedAnswers, optionIndex];
    setSelectedAnswers(nextAnswers);

    if (currentQuestionIndex + 1 < activeScenario.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedScenarioId(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <CyberCard variant="purple" glow={true} headerRail="CYBER AWARENESS drill center">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold uppercase tracking-wider font-sans text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-400" />
              Cyber Awareness Simulator
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl font-sans">
              Test your security defensive instincts against realistic phishing campaigns, unapproved login vectors, and social engineering setups. 
              Review comprehensive visual artifacts and spot critical threats to claim your PwC Cybersecurity Hackathon certificate.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0 font-mono text-[11px] text-slate-500">
            <span>TRAINING MODULES:</span>
            <CyberBadge label="3 READY" variant="cyan" />
          </div>
        </div>
      </CyberCard>

      {/* Main Grid: Selection menu or Active Drill */}
      {!selectedScenarioId ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {simulationScenarios.map((sc) => (
            <CyberCard key={sc.id} variant="cyan" className="flex flex-col justify-between" headerRail={`${sc.category.toUpperCase()} DRILL`}>
              <div className="p-5 space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/25 uppercase">
                    {sc.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{sc.difficulty}</span>
                </div>

                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">{sc.title}</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {sc.description}
                </p>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-800/30">
                <button
                  onClick={() => handleStartScenario(sc.id)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded bg-cyan-950/20 border border-cyan-500/30 hover:bg-cyan-900/30 text-cyan-400 text-xs font-mono font-bold uppercase cursor-pointer transition"
                >
                  <Play className="w-4 h-4" />
                  <span>Begin Simulation</span>
                </button>
              </div>
            </CyberCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Active Drill Details */}
          {activeScenario && (
            <>
              {/* Left Column: Artifacts & Clues */}
              <div className="lg:col-span-5 space-y-4">
                <CyberCard headerRail="INVESTIGATION ARTIFACT WINDOW">
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">SECURE SANDBOX WORKSPACE</span>
                      <button
                        onClick={handleReset}
                        className="text-[10px] text-slate-500 hover:text-slate-400 font-mono flex items-center cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Abort Drill
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-sans mb-1">{activeScenario.title}</h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Analyze the suspicious artifacts captured in our security vaults below. Hover over domain prefixes and look for anomalous structures before submitting your choices.
                    </p>

                    {/* Render visual artifacts beautifully */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-widest">Digital Evidence:</span>
                      <div className="p-3 bg-black border border-slate-800 rounded-lg text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                        <div className="absolute top-1 right-3 text-[8px] text-slate-700 uppercase">Artifact Sandbox</div>
                        {activeScenario.initialArtifacts.map((art, idx) => (
                          <div key={idx} className="border-b border-slate-900/50 pb-2 mb-2 last:border-0 last:pb-0">
                            {art}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </div>

              {/* Right Column: Dynamic quiz panel or results scorecard */}
              <div className="lg:col-span-7 space-y-6">
                {!isCompleted ? (
                  <CyberCard variant="purple" headerRail={`QUESTION ${currentQuestionIndex + 1} OF ${activeScenario.questions.length}`}>
                    <div className="p-5 space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                        <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">Incident Spot Quiz</h4>
                        <span className="text-xs font-mono text-slate-500">Scoring: +1 point per correct answer</span>
                      </div>

                      <p className="text-sm font-bold text-white font-sans">
                        {activeScenario.questions[currentQuestionIndex].questionText}
                      </p>

                      <div className="space-y-3 pt-2">
                        {activeScenario.questions[currentQuestionIndex].options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionSelect(oIdx)}
                            className="w-full text-left p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 text-xs text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-950/5 transition cursor-pointer leading-relaxed"
                          >
                            <span className="font-mono text-purple-400 font-bold mr-2">[{String.fromCharCode(65 + oIdx)}]</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CyberCard>
                ) : (
                  /* Scorecard results screen */
                  <div className="space-y-6">
                    <CyberCard variant="cyan" glow={true} headerRail="SIMULATOR SCORECARD REPORT">
                      <div className="p-5 text-center space-y-4">
                        <div className="inline-flex p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-full text-cyan-400 animate-pulse">
                          <Award className="w-10 h-10" />
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white uppercase tracking-wider font-sans">Drill Complete!</h4>
                          <p className="text-xs text-slate-400 font-sans mt-0.5">Overall Learning Assessment Summary</p>
                        </div>

                        <div className="flex items-center justify-center space-x-6 py-2 bg-slate-950/40 rounded border border-slate-800 max-w-xs mx-auto">
                          <div className="text-center">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block">Correct Answers</span>
                            <span className="text-xl font-bold text-emerald-400 font-mono">{score} / {activeScenario.questions.length}</span>
                          </div>
                          <div className="w-px h-8 bg-slate-800" />
                          <div className="text-center">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block">Performance Index</span>
                            <span className="text-xl font-bold text-cyan-400 font-mono">
                              {Math.round((score / activeScenario.questions.length) * 100)}%
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-center space-x-3 pt-2">
                          <button
                            onClick={() => handleStartScenario(selectedScenarioId!)}
                            className="text-xs font-mono bg-slate-900 border border-slate-800 px-4 py-2 rounded text-slate-300 hover:text-white cursor-pointer"
                          >
                            Retry Drill
                          </button>
                          <button
                            onClick={handleReset}
                            className="text-xs font-mono bg-cyan-950/20 border border-cyan-500/40 px-4 py-2 rounded text-cyan-400 hover:text-cyan-300 cursor-pointer"
                          >
                            Back to Drills Menu
                          </button>
                        </div>
                      </div>
                    </CyberCard>

                    {/* Detailed Answer Review */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Drill Incident Explanations</h5>
                      
                      {activeScenario.questions.map((q, qIdx) => {
                        const chosenIdx = selectedAnswers[qIdx];
                        const isCorrect = chosenIdx === q.correctIndex;
                        return (
                          <CyberCard key={qIdx} variant={isCorrect ? 'default' : 'red'}>
                            <div className="p-4 space-y-3 text-xs">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-mono text-slate-500 uppercase">QUESTION {qIdx + 1}</span>
                                  <p className="font-sans font-bold text-white">{q.questionText}</p>
                                </div>
                                <div className="shrink-0">
                                  {isCorrect ? (
                                    <span className="text-emerald-400 flex items-center font-mono text-[10px] bg-emerald-950/20 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> CORRECT
                                    </span>
                                  ) : (
                                    <span className="text-red-400 flex items-center font-mono text-[10px] bg-red-950/20 border border-red-500/20 px-2 py-0.5 rounded-full">
                                      <XCircle className="w-3.5 h-3.5 mr-1" /> EXPOSURE
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-900/50">
                                <div className="bg-slate-950/45 p-2 rounded border border-slate-900">
                                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Your Choice:</span>
                                  <p className={`font-sans leading-tight ${isCorrect ? 'text-slate-300' : 'text-red-300'}`}>
                                    {q.options[chosenIdx]}
                                  </p>
                                </div>
                                <div className="bg-slate-950/45 p-2 rounded border border-slate-900">
                                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">Correct Answer:</span>
                                  <p className="font-sans text-emerald-400 leading-tight">
                                    {q.options[q.correctIndex]}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-2">
                                <span className="text-[9px] font-mono text-purple-400 uppercase block tracking-wider flex items-center">
                                  <BookOpen className="w-3.5 h-3.5 mr-1" /> Core Security Lesson:
                                </span>
                                <p className="text-slate-300 mt-1 font-sans leading-relaxed">
                                  {q.explanation}
                                </p>
                              </div>
                            </div>
                          </CyberCard>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
