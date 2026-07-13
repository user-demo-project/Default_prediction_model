import React from 'react';
import { modelMetrics } from '../data/modelMetrics';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function ModelMonitoringPage() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">Model Monitoring</h1>
          <p className="text-textSecondary">Technical performance metrics for the predictive default ensemble.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 border-l-4 border-l-idbiTeal">
          <div className="text-xs text-textSecondary uppercase font-semibold">ROC AUC</div>
          <div className="text-2xl font-bold">{modelMetrics.rocAuc}</div>
        </div>
        <div className="card p-4 border-l-4 border-l-idbiTeal">
          <div className="text-xs text-textSecondary uppercase font-semibold">PR AUC</div>
          <div className="text-2xl font-bold">{modelMetrics.prAuc}</div>
        </div>
        <div className="card p-4 border-l-4 border-l-idbiTeal">
          <div className="text-xs text-textSecondary uppercase font-semibold">Default Recall</div>
          <div className="text-2xl font-bold">{modelMetrics.defaultRecall}</div>
        </div>
        <div className="card p-4 border-l-4 border-l-success">
          <div className="text-xs text-textSecondary uppercase font-semibold">Calibration Status</div>
          <div className="text-xl font-bold text-success flex items-center gap-1 mt-1">
            <CheckCircle2 size={18} /> {modelMetrics.calibrationStatus}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-bold mb-4 border-b border-border pb-2">Model Information</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex justify-between"><span className="text-textSecondary">Champion Model</span> <span className="font-medium">{modelMetrics.championModel}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">Challenger Model</span> <span className="font-medium">{modelMetrics.challengerModel}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">Version</span> <span className="font-medium">{modelMetrics.modelVersion}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">Last Validation</span> <span className="font-medium">{modelMetrics.lastValidationDate}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">Data Window</span> <span className="font-medium">{modelMetrics.dataWindow}</span></li>
          </ul>
        </div>
        
        <div className="card">
          <h3 className="font-bold mb-4 border-b border-border pb-2">Governance & Drift</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex justify-between"><span className="text-textSecondary">Population Stability Index</span> <span className="font-medium">{modelMetrics.populationStabilityIndex}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">Data Drift Status</span> <span className="font-medium text-success flex items-center gap-1"><CheckCircle2 size={14}/> {modelMetrics.driftStatus}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">Human Override Rate</span> <span className="font-medium">{modelMetrics.humanOverrideRate}</span></li>
            <li className="flex justify-between"><span className="text-textSecondary">False Positive Review</span> <span className="font-medium text-amber flex items-center gap-1"><AlertCircle size={14}/> {modelMetrics.falsePositiveReview}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
