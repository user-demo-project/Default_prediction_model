import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { ArrowRight, PlayCircle, FolderOpen, Zap, ShieldAlert, Brain, Network, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { dispatch } = useDemo();

  const startTour = () => {
    dispatch({ type: 'SET_TOUR_STATE', payload: { run: true, stepIndex: 0 } });
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen bg-pageBackground flex flex-col">
      <div className="bg-idbiTealLight text-idbiTealDeep text-xs font-semibold py-1.5 px-6 border-b border-border flex items-center justify-center">
        Synthetic Demonstration Data • AI-assisted monitoring. Final credit and intervention decisions remain with authorised bank officers.
      </div>

      <header className="px-8 py-6 flex items-center justify-between bg-surface border-b border-border">
        <div className="flex items-center gap-3 text-2xl font-bold tracking-tight text-idbiTealDeep">
          <Zap className="text-idbiOrange" size={28} />
          NIRNAY 365
        </div>
        <div className="text-sm font-medium text-textSecondary">IDBI Innovate 2026</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full text-center">
        <h1 className="text-5xl font-extrabold text-textPrimary leading-tight mb-4">
          See the stress before the <br/>
          <span className="text-danger">first missed payment.</span>
        </h1>
        
        <p className="text-lg text-textSecondary max-w-3xl leading-relaxed mb-10">
          NIRNAY 365 creates a continuously evolving risk digital twin for every MSME borrower. Specialised AI agents analyse banking activity, cash flows, GST patterns, business operations, documents, counterparties and external events to identify potential stress up to 12 months before default. The platform explains the complete stress pathway and recommends preventive interventions while keeping the credit officer in control.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button onClick={startTour} className="btn-primary text-base px-6 py-3 shadow-md">
            <PlayCircle size={20} /> Start 3-Minute Guided Tour
          </button>
          <button onClick={() => navigate('/portfolio')} className="btn-secondary text-base px-6 py-3 shadow-md">
            <FolderOpen size={20} /> Explore Demo Portfolio
          </button>
          <button onClick={() => navigate('/borrower/MSME-1042')} className="btn-secondary text-base px-6 py-3 border-danger text-danger hover:bg-dangerLight shadow-md">
            <ShieldAlert size={20} /> Open High-Risk Case
          </button>
        </div>

        <div className="w-full mb-16">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-idbiTeal uppercase tracking-wider mb-8">
            <div className="h-px bg-border flex-1"></div>
            Monitor → Detect → Investigate → Explain → Simulate → Human Decision
            <div className="h-px bg-border flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="card border-t-4 border-t-idbiTeal">
              <div className="w-10 h-10 rounded-lg bg-idbiTealLight flex items-center justify-center text-idbiTeal mb-4"><BarChart2 size={20}/></div>
              <h3 className="font-bold mb-2">12-month advance warning</h3>
              <p className="text-sm text-textSecondary">Detects emerging liquidity compression long before EMI delays.</p>
            </div>
            <div className="card border-t-4 border-t-idbiOrange">
              <div className="w-10 h-10 rounded-lg bg-idbiOrangeLight flex items-center justify-center text-idbiOrange mb-4"><Brain size={20}/></div>
              <h3 className="font-bold mb-2">Multimodal borrower intelligence</h3>
              <p className="text-sm text-textSecondary">Combines transactions, GST, electricity, and documents.</p>
            </div>
            <div className="card border-t-4 border-t-idbiTeal">
              <div className="w-10 h-10 rounded-lg bg-idbiTealLight flex items-center justify-center text-idbiTeal mb-4"><Zap size={20}/></div>
              <h3 className="font-bold mb-2">Agentic risk investigation</h3>
              <p className="text-sm text-textSecondary">14 specialised agents cross-validate findings and debate risk.</p>
            </div>
            <div className="card border-t-4 border-t-information">
              <div className="w-10 h-10 rounded-lg bg-informationLight flex items-center justify-center text-information mb-4"><Network size={20}/></div>
              <h3 className="font-bold mb-2">Preventive intervention simulation</h3>
              <p className="text-sm text-textSecondary">Counterfactual models test interventions to cure the stress.</p>
            </div>
          </div>
        </div>

        <div className="w-full text-left">
          <h2 className="text-2xl font-bold mb-6 text-center">Why another default score is not enough</h2>
          <div className="card p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surfaceMuted border-b border-border text-textSecondary">
                <tr>
                  <th className="py-4 px-6 font-semibold w-1/2 border-r border-border">Traditional monitoring</th>
                  <th className="py-4 px-6 font-semibold w-1/2 text-idbiTeal">NIRNAY 365</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="py-4 px-6 border-r border-border">Detects repayment failure</td><td className="py-4 px-6 font-medium text-idbiTealDeep">Detects emerging deterioration</td></tr>
                <tr><td className="py-4 px-6 border-r border-border">Provides a score</td><td className="py-4 px-6 font-medium text-idbiTealDeep">Reconstructs the stress pathway</td></tr>
                <tr><td className="py-4 px-6 border-r border-border">Looks only at borrower data</td><td className="py-4 px-6 font-medium text-idbiTealDeep">Analyses counterparty contagion</td></tr>
                <tr><td className="py-4 px-6 border-r border-border">Sends alerts</td><td className="py-4 px-6 font-medium text-idbiTealDeep">Recommends preventive interventions</td></tr>
                <tr><td className="py-4 px-6 border-r border-border">One model for all borrowers</td><td className="py-4 px-6 font-medium text-idbiTealDeep">Segment-aware model routing</td></tr>
                <tr><td className="py-4 px-6 border-r border-border">Opaque result</td><td className="py-4 px-6 font-medium text-idbiTealDeep">Evidence-backed explanation</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
