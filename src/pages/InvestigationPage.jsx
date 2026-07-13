import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { borrowers } from '../data/portfolioData';
import { agentWorkflowSteps } from '../data/agentRunData';
import { ArrowRight, Bot, CheckCircle2, Circle, Loader2, Play, FileText, Check } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export default function InvestigationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useDemo();
  const borrower = borrowers.find(b => b.id === id) || borrowers[0];
  
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_BORROWER', payload: borrower.id });
  }, [borrower.id, dispatch]);

  const startInvestigation = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);
    setCompleted(false);
  };

  useEffect(() => {
    if (!isRunning || completed) return;

    if (currentStepIndex < agentWorkflowSteps.length) {
      const step = agentWorkflowSteps[currentStepIndex];
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, step.duration);
      return () => clearTimeout(timer);
    } else {
      setCompleted(true);
      setIsRunning(false);
    }
  }, [currentStepIndex, isRunning, completed]);

  const resetInvestigation = () => {
    setCurrentStepIndex(-1);
    setIsRunning(false);
    setCompleted(false);
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-start" data-tour="investigation-room">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">Agentic Investigation Room</h1>
          </div>
          <p className="text-textSecondary">
            Watch the multi-agent system independently investigate <strong>{borrower.name}</strong>.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/interventions/${borrower.id}`)}
            className="btn-primary"
            disabled={!completed}
          >
            Go to Intervention Lab <ArrowRight size={16}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px]">
        
        {/* Agent Workflow Execution */}
        <div className="col-span-1 md:col-span-2 card flex flex-col p-0 overflow-hidden relative">
          <div className="p-4 border-b border-border bg-surfaceMuted flex justify-between items-center z-10 sticky top-0">
            <h3 className="font-bold flex items-center gap-2"><Bot size={18} className="text-idbiTeal"/> Multi-Agent Workflow Execution</h3>
            {!isRunning && !completed && (
              <button onClick={startInvestigation} className="btn-primary py-1.5 px-3 text-sm">
                <Play size={14}/> Run Investigation
              </button>
            )}
            {completed && (
              <button onClick={resetInvestigation} className="btn-secondary py-1.5 px-3 text-sm">
                Reset
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 bg-pageBackground">
            {currentStepIndex === -1 && !completed && (
              <div className="h-full flex flex-col items-center justify-center text-textMuted text-center">
                <Bot size={48} className="mb-4 opacity-20" />
                <p>Ready to initiate investigation.</p>
                <p className="text-xs mt-2">14 specialised agents will analyse the case, extract evidence, and debate the risk.</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {agentWorkflowSteps.map((step, index) => {
                const status = 
                  index < currentStepIndex ? 'completed' :
                  index === currentStepIndex ? 'running' : 'waiting';
                
                // Only render if it's currently running, completed, or the next one up
                if (index > currentStepIndex && index !== 0) return null;

                return (
                  <div 
                    key={step.id} 
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                      status === 'completed' ? 'bg-surface border-border shadow-sm' :
                      status === 'running' ? 'bg-idbiTealLight border-idbiTeal shadow-md ring-1 ring-idbiTeal' :
                      'opacity-0 translate-y-4 hidden'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {status === 'completed' && <CheckCircle2 size={20} className="text-success" />}
                      {status === 'running' && <Loader2 size={20} className="text-idbiTeal animate-spin" />}
                      {status === 'waiting' && <Circle size={20} className="text-border" />}
                    </div>
                    <div>
                      <div className={`font-semibold text-sm ${status === 'running' ? 'text-idbiTealDeep' : 'text-textPrimary'}`}>
                        {step.name}
                      </div>
                      <div className={`text-sm mt-1 leading-relaxed ${status === 'running' ? 'text-idbiTealDark' : 'text-textSecondary'}`}>
                        {status === 'waiting' ? 'Waiting in queue...' : step.message}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Scroll bottom anchor can be added if needed, but smooth animation covers it mostly */}
          </div>
        </div>

        {/* AI Risk Committee Conclusions */}
        <div className="col-span-1 card flex flex-col p-0 overflow-hidden bg-idbiTealDeep text-white border-none" data-tour="risk-committee">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2"><FileText size={18} className="text-idbiOrange"/> AI Risk Committee Summary</h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {!completed ? (
              <div className="h-full flex flex-col items-center justify-center text-idbiTealLight/50 text-center text-sm px-4">
                <FileText size={48} className="mb-4 opacity-20" />
                The executive summary will be generated once all agents conclude their debate and reach consensus.
              </div>
            ) : (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                <div>
                  <div className="text-xs font-semibold text-idbiTealLight opacity-70 uppercase tracking-wider mb-2">Final Consensus</div>
                  <div className="text-xl font-bold leading-tight">Material emerging stress detected.</div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div>
                  <div className="text-xs font-semibold text-idbiTealLight opacity-70 uppercase tracking-wider mb-2">Primary Drivers</div>
                  <ul className="flex flex-col gap-3 text-sm leading-relaxed">
                    <li className="flex gap-2 items-start"><Check size={16} className="text-idbiOrange shrink-0 mt-0.5"/> Severe delay in primary buyer payments (61% revenue concentration).</li>
                    <li className="flex gap-2 items-start"><Check size={16} className="text-idbiOrange shrink-0 mt-0.5"/> Receivable cycle stretched outside historical norm, breaking 90 days.</li>
                    <li className="flex gap-2 items-start"><Check size={16} className="text-idbiOrange shrink-0 mt-0.5"/> Resulting liquidity compression pushing working-capital utilisation above 94%.</li>
                  </ul>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div>
                  <div className="text-xs font-semibold text-idbiTealLight opacity-70 uppercase tracking-wider mb-2">Mitigants</div>
                  <p className="text-sm leading-relaxed text-idbiTealLight">
                    The borrower has maintained continuous production (verified by stable electricity consumption) and has not missed any EMI payments. The stress is purely a liquidity mismatch rather than insolvency.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-lg mt-2">
                  <div className="text-xs font-semibold text-idbiOrangeLight uppercase tracking-wider mb-1">Recommended Action</div>
                  <p className="text-sm font-medium">Proceed to Intervention Lab to evaluate verified receivable financing to bridge the liquidity gap.</p>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
