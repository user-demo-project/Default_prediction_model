import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { borrowers } from '../data/portfolioData';
import { interventionScenarios } from '../data/interventions';
import { Network, CheckCircle2, GitMerge, FileCheck } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export default function InterventionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useDemo();
  const borrower = borrowers.find(b => b.id === id) || borrowers[0];

  const [selectedScenarioId, setSelectedScenarioId] = useState('sc-2');
  const [isApproving, setIsApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_BORROWER', payload: borrower.id });
  }, [borrower.id, dispatch]);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setApproved(true);
      
      const scenario = interventionScenarios.find(s => s.id === selectedScenarioId);
      dispatch({
        type: 'ADD_AUDIT_LOG',
        payload: {
          time: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          actor: 'Neha Kulkarni',
          action: `Approved ${scenario.name} for ${borrower.name}`,
          evidence: []
        }
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-start" data-tour="intervention-lab">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">Intervention Lab</h1>
          </div>
          <p className="text-textSecondary">
            Simulate and compare preventive actions to cure stress before default for <strong>{borrower.name}</strong>.
          </p>
        </div>
      </div>

      {approved && (
        <div className="bg-successLight border border-success text-success p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CheckCircle2 size={32} />
            <div>
              <h2 className="font-bold text-lg">Intervention Approved</h2>
              <p className="text-sm">Action routed to Relationship Manager (Ananya Rao) for execution.</p>
            </div>
          </div>
          <button onClick={() => navigate('/portfolio')} className="btn-secondary !border-success text-success">
            Return to Portfolio
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
        {/* Scenarios List */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-surfaceMuted flex items-center gap-2">
            <GitMerge size={18} className="text-idbiTeal" />
            <h3 className="font-bold">Simulated Scenarios</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-pageBackground">
            {interventionScenarios.map(scenario => (
              <div 
                key={scenario.id}
                onClick={() => !approved && setSelectedScenarioId(scenario.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedScenarioId === scenario.id 
                    ? 'border-idbiTeal bg-idbiTealLight shadow-sm' 
                    : 'border-border bg-surface hover:border-idbiTeal/50'
                } ${approved && 'opacity-50 pointer-events-none'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-textPrimary">{scenario.name}</h4>
                  <span className={`badge badge-${scenario.color}`}>{scenario.recommendation}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {scenario.details.slice(0, 2).map((detail, i) => (
                    <div key={i}>
                      <span className="text-textMuted text-xs block mb-0.5">{detail.label}</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Scenario Detail */}
        <div className="card p-0 overflow-hidden flex flex-col" data-tour="human-decision">
          {selectedScenarioId ? (
            <>
              <div className="p-4 border-b border-border bg-surfaceMuted flex items-center gap-2">
                <Network size={18} className="text-idbiOrange" />
                <h3 className="font-bold">Counterfactual Impact</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                
                {(() => {
                  const s = interventionScenarios.find(x => x.id === selectedScenarioId);
                  return (
                    <>
                      <div>
                        <h2 className="text-xl font-bold mb-4">{s.name}</h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {s.details.map((detail, i) => (
                            <div key={i} className="bg-surfaceMuted p-4 rounded-lg border border-border">
                              <div className="text-xs text-textSecondary uppercase font-semibold mb-1">{detail.label}</div>
                              <div className={`text-lg font-bold ${
                                detail.label === '12M PD' && parseInt(detail.value) < 50 ? 'text-success' :
                                detail.label === '12M PD' ? 'text-danger' : 'text-textPrimary'
                              }`}>
                                {detail.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-idbiTealLight/30 border border-idbiTeal/20 p-5 rounded-xl">
                        <h4 className="font-bold text-idbiTealDeep mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                          <FileCheck size={16} /> Human Decision Gate
                        </h4>
                        <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                          AI recommends this intervention, but authorisation requires a certified credit officer. 
                          Approving will lock the decision and send instructions to the Relationship Manager.
                        </p>
                        <button 
                          onClick={handleApprove}
                          disabled={isApproving || approved || s.color === 'danger'}
                          className="btn-primary w-full shadow-md"
                        >
                          {isApproving ? 'Processing...' : approved ? 'Approved' : `Approve ${s.name}`}
                        </button>
                      </div>
                    </>
                  );
                })()}

              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-textMuted">
              Select a scenario to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
