import React from 'react';
import { useDemo } from '../context/DemoContext';
import { auditTrail as initialAuditTrail } from '../data/auditData';
import { ShieldCheck, User, Bot } from 'lucide-react';

export default function AuditPage() {
  const { state } = useDemo();
  
  // Combine static initial audit trail with any new logs added during the session
  const fullAuditTrail = [...state.auditTrail, ...initialAuditTrail].sort((a, b) => 
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">Audit Trail</h1>
          <p className="text-textSecondary">Immutable log of AI agent actions and human decisions.</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surfaceMuted text-textSecondary">
              <tr>
                <th className="py-3 px-6 font-semibold">Timestamp</th>
                <th className="py-3 px-6 font-semibold">Actor</th>
                <th className="py-3 px-6 font-semibold">Action Taken</th>
                <th className="py-3 px-6 font-semibold">Evidence Linked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fullAuditTrail.map((log, index) => {
                const isHuman = log.actor === 'Neha Kulkarni' || !log.actor.includes('Agent');
                return (
                  <tr key={index} className="hover:bg-surfaceMuted transition-colors">
                    <td className="py-4 px-6 text-textSecondary whitespace-nowrap">{log.time}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 font-medium">
                        {isHuman ? <User size={14} className="text-idbiOrange"/> : <Bot size={14} className="text-idbiTeal"/>}
                        {log.actor}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium">{log.action}</td>
                    <td className="py-4 px-6">
                      {log.evidence.length > 0 ? (
                        <div className="flex gap-1">
                          {log.evidence.map(e => (
                            <span key={e} className="badge bg-surfaceMuted border border-border text-textSecondary">{e}</span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-textMuted text-xs italic">No evidence linked</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
