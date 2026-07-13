import React, { useState } from 'react';
import { Search, Bell, Settings2, UserCircle, HelpCircle } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import AiSettingsModal from '../ai/AiSettingsModal';

export default function Topbar() {
  const { state, dispatch } = useDemo();
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <>
      <div className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
        
        <div className="flex items-center gap-4 text-sm font-medium text-textSecondary">
          <span className="bg-surfaceMuted px-3 py-1 rounded-md border border-border">13 July 2026</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search MSME..." 
              className="pl-9 pr-4 py-1.5 bg-surfaceMuted border border-border rounded-lg text-sm focus:outline-none focus:border-idbiTeal w-64"
            />
          </div>

          <button className="relative text-textSecondary hover:text-idbiTeal transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-idbiOrange rounded-full"></span>
          </button>

          <button 
            onClick={() => setShowAiModal(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              state.groqMode === 'Live Groq' 
                ? 'bg-successLight border-success text-success' 
                : 'bg-informationLight border-information text-information'
            }`}
          >
            <Settings2 size={16} />
            {state.groqMode}
          </button>

          <div className="h-6 w-px bg-border mx-1"></div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-textPrimary">Neha Kulkarni</div>
              <div className="text-xs text-textMuted">Senior Credit Monitoring Officer</div>
            </div>
            <UserCircle size={32} className="text-idbiTeal" />
          </div>

          <button 
            onClick={() => dispatch({ type: 'SET_TOUR_STATE', payload: { run: true, stepIndex: 0 } })}
            className="text-textSecondary hover:text-idbiTeal transition-colors p-1"
            title="Restart Tour"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      <AiSettingsModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
    </>
  );
}
