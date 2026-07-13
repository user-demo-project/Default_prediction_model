import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { borrowers } from '../data/portfolioData';
import { AlertOctagon, TrendingDown, Clock, Building, ShieldAlert, Navigation } from 'lucide-react';
import StressMovie from '../components/borrower/StressMovie';
import CounterpartyGraph from '../components/graph/CounterpartyGraph';
import AskNirnayDrawer from '../components/ai/AskNirnayDrawer';
import { useDemo } from '../context/DemoContext';

export default function BorrowerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useDemo();
  const borrower = borrowers.find(b => b.id === id) || borrowers[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Update global context so chat knows which borrower we are looking at
  React.useEffect(() => {
    dispatch({ type: 'SET_SELECTED_BORROWER', payload: borrower.id });
  }, [borrower.id, dispatch]);

  const tabs = [
    { id: 'overview', label: 'Overview & Stress Movie' },
    { id: 'financial', label: 'Financial Signals' },
    { id: 'operational', label: 'Operational Signals' },
    { id: 'counterparties', label: 'Counterparties' },
    { id: 'documents', label: 'Documents' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'audit', label: 'Audit History' }
  ];

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-start" data-tour="borrower-summary">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{borrower.name}</h1>
            <span className={`badge ${borrower.riskGrade === 'R5' ? 'badge-danger' : borrower.riskGrade === 'R4' ? 'badge-warning' : 'badge-info'}`}>
              {borrower.riskGrade} — {borrower.riskLabel}
            </span>
          </div>
          <p className="text-textSecondary flex items-center gap-2">
            <Building size={16} /> {borrower.sector} • {borrower.location}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="btn-secondary text-idbiTeal border-idbiTeal hover:bg-idbiTealLight"
            data-tour="ask-nirnay"
          >
            Ask NIRNAY
          </button>
          <button 
            onClick={() => navigate(`/investigation/${borrower.id}`)}
            className="btn-primary"
          >
            View Agentic Investigation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 flex flex-col gap-1 border-l-4 border-l-danger">
          <div className="text-xs text-textSecondary uppercase font-semibold">12-Month PD</div>
          <div className="text-2xl font-bold text-danger">{borrower.pd12m}% <span className="text-sm font-normal text-textMuted ml-1">(was {borrower.previousPd12m}%)</span></div>
        </div>
        <div className="card p-4 flex flex-col gap-1 border-l-4 border-l-amber">
          <div className="text-xs text-textSecondary uppercase font-semibold">Expected Stress</div>
          <div className="text-xl font-bold text-amber">{borrower.expectedStress}</div>
        </div>
        <div className="card p-4 flex flex-col gap-1 border-l-4 border-l-success">
          <div className="text-xs text-textSecondary uppercase font-semibold">Account Status</div>
          <div className="text-xl font-bold text-success">{borrower.accountStatus} <span className="text-sm font-normal text-textMuted ml-1">• {borrower.repaymentStatus}</span></div>
        </div>
        <div className="card p-4 flex flex-col gap-1 border-l-4 border-l-idbiTeal">
          <div className="text-xs text-textSecondary uppercase font-semibold">Exposure</div>
          <div className="text-xl font-bold">₹{borrower.exposureCr} Cr <span className="text-sm font-normal text-textMuted ml-1">({borrower.loanType})</span></div>
        </div>
      </div>

      <div className="bg-idbiOrangeLight border border-idbiOrange/20 p-4 rounded-lg flex gap-3 text-idbiOrangeDark items-start">
        <ShieldAlert size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed font-medium">
          The borrower remains operationally active and continues to service its loan. However, liquidity resilience is deteriorating because customer collections are slowing significantly.
        </p>
      </div>

      <div className="flex gap-4 mb-2 overflow-x-auto border-b border-border pb-px">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-idbiTeal text-idbiTeal' 
                : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" data-tour="receivable-driver">
            <div className="card p-4 text-center">
              <div className="text-xs text-textSecondary mb-2 font-semibold">Receivable Days</div>
              <div className="text-xl font-bold text-danger">48 → 91</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-xs text-textSecondary mb-2 font-semibold">WC Utilisation</div>
              <div className="text-xl font-bold text-danger">68% → 94%</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-xs text-textSecondary mb-2 font-semibold">GST Sales</div>
              <div className="text-xl font-bold text-amber">−17%</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-xs text-textSecondary mb-2 font-semibold">Supplier Delay</div>
              <div className="text-xl font-bold text-amber">+24 days</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-xs text-textSecondary mb-2 font-semibold">Electricity</div>
              <div className="text-xl font-bold text-success">Stable</div>
            </div>
          </div>
          
          <div data-tour="stress-movie">
            <StressMovie />
          </div>
        </div>
      )}

      {activeTab === 'counterparties' && (
        <div className="card h-[600px] flex flex-col p-0 overflow-hidden" data-tour="evidence-graph">
          <div className="p-4 border-b border-border bg-surfaceMuted flex justify-between items-center">
            <h3 className="font-bold">Counterparty Evidence Graph</h3>
            <div className="text-xs text-textSecondary flex items-center gap-2">
              <Navigation size={14} /> Zoom and pan to explore dependencies
            </div>
          </div>
          <div className="flex-1 bg-pageBackground">
            <CounterpartyGraph />
          </div>
        </div>
      )}

      {activeTab !== 'overview' && activeTab !== 'counterparties' && (
        <div className="card p-12 text-center text-textSecondary">
          {tabs.find(t => t.id === activeTab).label} detailed view is simulated for this demonstration. Explore Overview and Counterparties for interactive elements.
        </div>
      )}

      <AskNirnayDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} borrowerId={borrower.id} />
    </div>
  );
}
