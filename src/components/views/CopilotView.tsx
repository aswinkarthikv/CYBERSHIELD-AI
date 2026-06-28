import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, User, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CyberCard } from '../CyberCard';
import { CyberBadge } from '../CyberBadge';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  analysis?: {
    threatType: string;
    riskScore: number;
    explanation: string;
    immediateActions: string[];
    preventionTips: string[];
  };
}

export const CopilotView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am your CyberShield AI Assistant. Describe any suspicious email, link, unexpected device behavior, or online security issue you are facing. I will explain the risk simply and tell you exactly what to do next.",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const examplePrompts = [
    "I clicked a suspicious link.",
    "Is this email safe?",
    "I downloaded this file.",
    "My Instagram account was hacked.",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Generate smart response based on text keywords
  const generateSmartAnalysis = (inputText: string) => {
    const text = inputText.toLowerCase();
    
    if (text.includes('link') || text.includes('url') || text.includes('click') || text.includes('website')) {
      return {
        threatType: 'Suspicious Web Link / Phishing',
        riskScore: 85,
        explanation: 'This link likely attempts to clone a legitimate login screen (such as your bank, social media, or work portal) to harvest your passwords and secure codes.',
        immediateActions: [
          'Do not enter any username, password, or security codes on that page.',
          'Close the browser tab immediately.',
          'If you already input any password, go immediately to the official app or website and change it.',
        ],
        preventionTips: [
          'Always inspect the domain name in the address bar carefully (look for slight spelling errors).',
          'Avoid clicking login links from unverified text messages or emails.',
          'Use a robust password manager, which will refuse to auto-fill your login info on fraudulent websites.',
        ],
      };
    } else if (text.includes('email') || text.includes('mail') || text.includes('invoice') || text.includes('sender')) {
      return {
        threatType: 'Inbound Phishing / Email Fraud',
        riskScore: 70,
        explanation: 'The email is engineered to look like an urgent warning, delivery notice, or invoice. It aims to persuade you to download a harmful file or click a malicious credential link.',
        immediateActions: [
          'Do not reply to the sender and do not download any attachment.',
          'Double-check the sender address closely—often the display name says "DHL" but the actual email is a generic personal address.',
          'Report the email as spam or phishing inside your mailbox app.',
        ],
        preventionTips: [
          'Be extremely cautious of any email requesting urgent action or threatening account suspension.',
          'Call the sender or company via their public official phone number to verify if they actually sent the message.',
          'Keep your email client up to date with automated security filters active.',
        ],
      };
    } else if (text.includes('instagram') || text.includes('facebook') || text.includes('hacked') || text.includes('account') || text.includes('compromised')) {
      return {
        threatType: 'Social Media Account Hijack',
        riskScore: 90,
        explanation: 'An attacker has successfully gained access to your profile and changed your linked recovery email and password to lock you out.',
        immediateActions: [
          'Initiate the official account recovery procedure via the Instagram/Facebook app immediately.',
          'Request a login link or security code to be sent to your original email or phone number.',
          'Warn your friends, followers, and contacts on other platforms to ignore any direct messages sent from your compromised profile.',
        ],
        preventionTips: [
          'Never reuse passwords across different accounts. Use a unique strong password for social media.',
          'Enable authenticator-app based Two-Factor Authentication (2FA) immediately upon recovering.',
          'Do not click on links sent in direct messages, even if they appear to come from trusted friends.',
        ],
      };
    } else if (text.includes('file') || text.includes('download') || text.includes('pdf') || text.includes('exe') || text.includes('attachment')) {
      return {
        threatType: 'Unverified File / Malware Risk',
        riskScore: 65,
        explanation: 'Files downloaded from unexpected sources can carry hidden macros or malicious scripts that execute background backdoors.',
        immediateActions: [
          'Do not open, click, or double-click the file under any circumstances.',
          'Move the file straight to your Recycle Bin/Trash, and empty it permanently.',
          'Run a complete scan using your local built-in protection (like Windows Defender or macOS XProtect).',
        ],
        preventionTips: [
          'Never open attachments ending in double extensions (e.g., document.pdf.exe).',
          'Only download software directly from the official developer or verified app store.',
          'Keep automatic operating system safety patches turned on.',
        ],
      };
    } else {
      return {
        threatType: 'General Cybersecurity Advisory',
        riskScore: 40,
        explanation: 'We scanned your description. While no explicit malware signature was detected, the scenario warrants cautious security habits to protect your data.',
        immediateActions: [
          'Do not disclose private personal info, credit cards, or security codes.',
          'Update your account security passwords if you feel any service has been exposed.',
          'When in doubt, block the sender or close the suspicious page.',
        ],
        preventionTips: [
          'Set up automatic backups for your important personal files.',
          'Utilize passkeys or hardware keys for critical personal and banking emails.',
          'Stay informed of common scam models by reading verified digital safety updates.',
        ],
      };
    }
  };

  const handleSubmit = (textToSend: string) => {
    if (!textToSend.trim() || isGenerating) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsGenerating(true);

    // Simulate human-like response delay
    setTimeout(() => {
      const smartAnalysis = generateSmartAnalysis(textToSend);
      
      const assistantMsg: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: `Here is my assessment of the situation:`,
        timestamp: new Date(),
        analysis: smartAnalysis,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto animate-fade-in space-y-4">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-cyan-400 animate-pulse" />
            AI Cybersecurity Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Describe your problem in plain English. No jargon. Real solutions.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
          <span>COGNITIVE LAYER:</span>
          <CyberBadge label="PwC COMPLIANT" variant="cyan" />
        </div>
      </div>

      {/* Main Chat Stage */}
      <div className="flex-1 bg-[#0f172a]/30 border border-slate-700/35 rounded-2xl p-4 overflow-y-auto flex flex-col space-y-4 min-h-0 backdrop-blur-md">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start space-x-3 max-w-[85%]">
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className="space-y-3">
                  {/* Message Bubble text */}
                  <div className={`p-4 rounded-2xl text-sm ${
                    isUser 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-900/60 border border-slate-800/80 text-slate-100 rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed font-sans">{msg.text}</p>
                  </div>

                  {/* Elegant AI Analysis Card Attachment */}
                  {msg.analysis && (
                    <div className="w-full max-w-xl animate-fade-in">
                      <CyberCard 
                        variant={msg.analysis.riskScore > 75 ? 'red' : msg.analysis.riskScore > 50 ? 'purple' : 'cyan'}
                        className="overflow-hidden"
                      >
                        <div className="p-5 space-y-4">
                          {/* Card Header with severity colors */}
                          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Threat Type</span>
                              <h4 className="text-sm font-bold text-white mt-0.5">{msg.analysis.threatType}</h4>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <span className="text-[10px] font-mono text-slate-400 block uppercase">Risk Rating</span>
                                <span className={`text-sm font-extrabold font-mono ${
                                  msg.analysis.riskScore > 75 ? 'text-red-400' : msg.analysis.riskScore > 50 ? 'text-amber-400' : 'text-cyan-400'
                                }`}>
                                  {msg.analysis.riskScore}%
                                </span>
                              </div>
                              <CyberBadge 
                                label={msg.analysis.riskScore > 75 ? 'Dangerous' : msg.analysis.riskScore > 50 ? 'Caution' : 'Low Risk'} 
                                variant={msg.analysis.riskScore > 75 ? 'critical' : msg.analysis.riskScore > 50 ? 'high' : 'clean'} 
                              />
                            </div>
                          </div>

                          {/* Explanation */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block">What does this mean?</span>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">{msg.analysis.explanation}</p>
                          </div>

                          {/* Immediate Action Steps */}
                          <div className="space-y-2 pt-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block">What you should do next</span>
                            <div className="space-y-2">
                              {msg.analysis.immediateActions.map((action, index) => (
                                <div key={index} className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-950/40 border border-slate-900/60">
                                  <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-[10px] font-mono text-blue-400 shrink-0 font-bold">
                                    {index + 1}
                                  </span>
                                  <p className="text-xs text-slate-200 font-sans leading-relaxed pt-0.5">{action}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Prevention Tips */}
                          <div className="space-y-2 pt-1 border-t border-slate-850">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block">How to avoid this in future</span>
                            <ul className="space-y-1.5 pl-1">
                              {msg.analysis.preventionTips.map((tip, index) => (
                                <li key={index} className="text-xs text-slate-400 flex items-start space-x-2 font-sans leading-relaxed">
                                  <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </CyberCard>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 font-bold text-white text-xs font-mono">
                    You
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-slate-400 text-xs font-sans">
                AI is assessing the security factors and typing response...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips (when chat is empty or just starting) */}
      {messages.length === 1 && (
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Or click a sample question to start:</span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {examplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSubmit(p)}
                className="text-left p-3 rounded-xl bg-[#0f172a]/20 hover:bg-[#0f172a]/50 border border-slate-700/20 text-xs text-slate-300 hover:text-white transition duration-200 cursor-pointer flex justify-between items-center group"
              >
                <span>{p}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(query);
        }}
        className="flex items-center space-x-2 relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isGenerating}
          placeholder="Describe your cybersecurity problem..."
          className="flex-1 bg-[#0f172a]/40 border border-slate-700/35 rounded-2xl px-5 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition shadow-inner font-sans"
        />
        <button
          type="submit"
          disabled={isGenerating || !query.trim()}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 transition cursor-pointer disabled:opacity-45 disabled:pointer-events-none"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
