import React, { useState } from 'react';
import { stressTimeline } from '../../data/stressTimeline';
import { evidenceRecords } from '../../data/evidenceData';
import { Clock, AlertTriangle, AlertOctagon, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StressMovie() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getEvidence = (id) => evidenceRecords.find(e => e.id === id);

  return (
    <div className="card flex flex-col gap-6 relative">
      <h2 className="text-lg font-bold m-0">Stress Pathway Sequence</h2>
      <p className="text-sm text-textSecondary mt-[-16px]">NIRNAY reconstructs the sequence of events leading toward potential default.</p>

      <div className="relative py-4 overflow-x-auto">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 rounded z-0 min-w-[800px]"></div>
        <div className="flex justify-between items-center relative z-10 min-w-[800px] px-8">
          
          {stressTimeline.map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer w-32" onClick={() => setSelectedEvent(item)}>
              <div className="text-xs font-semibold text-textMuted mb-3">{item.date}</div>
              
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-125 shadow-md ${
                item.severity === 'red' ? 'bg-danger text-white' : 
                item.severity === 'amber' ? 'bg-amber text-white' : 'bg-idbiTeal text-white'
              }`}>
                {item.severity === 'red' ? <AlertOctagon size={12}/> : item.severity === 'amber' ? <AlertTriangle size={12}/> : <Clock size={12}/>}
              </div>
              
              <div className="mt-3 text-[11px] font-medium text-center text-textPrimary leading-tight px-1 group-hover:text-idbiTeal">
                {item.title}
              </div>
            </div>
          ))}

        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-surfaceMuted border border-border rounded-xl p-5 mt-4 relative shadow-sm"
          >
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-textMuted hover:text-textPrimary p-1">
              <X size={18} />
            </button>
            
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: selectedEvent.severity === 'red' ? 'var(--danger-light)' : 'var(--amber-light)', color: selectedEvent.severity === 'red' ? 'var(--danger)' : 'var(--amber)' }}>
                {selectedEvent.severity === 'red' ? <AlertOctagon size={24}/> : <AlertTriangle size={24}/>}
              </div>
              
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">{selectedEvent.date} • {selectedEvent.type}</div>
                  <h3 className="text-lg font-bold text-textPrimary">{selectedEvent.title}</h3>
                  <p className="text-sm text-textSecondary mt-1">{selectedEvent.description}</p>
                </div>

                {getEvidence(selectedEvent.evidenceId) && (
                  <div className="bg-white border border-border rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
                    <div>
                      <div className="text-textMuted text-xs mb-1">Agent Detector</div>
                      <div className="font-semibold text-idbiTealDark">{getEvidence(selectedEvent.evidenceId).agent}</div>
                    </div>
                    <div>
                      <div className="text-textMuted text-xs mb-1">Shift</div>
                      <div className="font-semibold"><span className="text-danger">{getEvidence(selectedEvent.evidenceId).currentValue}</span> <span className="text-textMuted text-xs font-normal ml-1">(was {getEvidence(selectedEvent.evidenceId).previousValue})</span></div>
                    </div>
                    <div>
                      <div className="text-textMuted text-xs mb-1">Risk Contribution</div>
                      <div className="font-semibold text-danger">{getEvidence(selectedEvent.evidenceId).riskContribution}</div>
                    </div>
                    <div>
                      <div className="text-textMuted text-xs mb-1">Confidence / Status</div>
                      <div className="font-semibold flex items-center gap-1">
                        {getEvidence(selectedEvent.evidenceId).confidence}%
                        {getEvidence(selectedEvent.evidenceId).verified && <CheckCircle2 size={14} className="text-success ml-1" title="Verified Evidence" />}
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-4 mt-2 pt-3 border-t border-border">
                      <div className="text-textMuted text-xs mb-1">Data Source (Evidence {selectedEvent.evidenceId})</div>
                      <div className="font-medium">{getEvidence(selectedEvent.evidenceId).source}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
