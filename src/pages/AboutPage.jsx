import React from 'react';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 mt-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold mb-1">About NIRNAY 365</h1>
        <p className="text-textSecondary">Agentic MSME Default Prevention Suite for IDBI Innovate 2026.</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold mb-4 text-idbiTealDeep">Track 4 Submission Details</h2>
        <div className="prose prose-sm max-w-none text-textPrimary">
          <p className="leading-relaxed">
            NIRNAY 365 is a frontend-only technical demonstration built for the IDBI Innovate 2026 Hackathon (Track 4: MSME Default Prevention). 
            It illustrates how an agentic workflow can autonomously monitor MSME accounts, detect emerging stress up to 12 months before a missed EMI, investigate the causes, and recommend preventive interventions.
          </p>
          
          <h3 className="font-bold mt-6 mb-2">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1 mb-6 text-textSecondary">
            <li><strong>Predictive Risk Funnel:</strong> Move from reactionary SMA-reporting to proactive liquidity monitoring.</li>
            <li><strong>Stress Movie:</strong> An interactive, chronological reconstruction of the stress pathway.</li>
            <li><strong>Agentic Investigation Room:</strong> Simulated execution of 14 specialised AI agents debating the borrower's risk.</li>
            <li><strong>Intervention Lab:</strong> Counterfactual testing of preventive actions before human approval.</li>
            <li><strong>Ask NIRNAY:</strong> Optional Groq-powered chat assistant.</li>
          </ul>

          <h3 className="font-bold mt-6 mb-2">Technology Stack</h3>
          <ul className="list-disc pl-5 space-y-1 text-textSecondary">
            <li>React 18 & Vite</li>
            <li>Tailwind CSS (IDBI custom theme)</li>
            <li>Framer Motion (Animations)</li>
            <li>React Flow (Counterparty graphs)</li>
            <li>Recharts (Analytics)</li>
            <li>Groq SDK (LLM Integration)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
