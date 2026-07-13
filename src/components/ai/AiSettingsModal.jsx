import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { X, Key, Zap, CheckCircle2 } from 'lucide-react';
import Groq from 'groq-sdk';

export default function AiSettingsModal({ isOpen, onClose }) {
  const { state, dispatch } = useDemo();
  
  const [mode, setMode] = useState(state.groqMode);
  const [apiKey, setApiKey] = useState(sessionStorage.getItem('nirnay_groq_key') || '');
  const [model, setModel] = useState(state.groqModel);
  const [isValidating, setIsValidating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'demo') {
      dispatch({ type: 'SET_GROQ_MODE', payload: 'demo' });
      sessionStorage.removeItem('nirnay_groq_key');
      dispatch({ type: 'SET_GROQ_KEY_PRESENT', payload: false });
      onClose();
      return;
    }

    if (!apiKey) {
      setErrorMsg('API key is required for Live mode');
      return;
    }

    setIsValidating(true);
    try {
      const client = new Groq({ apiKey, dangerouslyAllowBrowser: true });
      await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say OK' }],
        model: model,
        max_tokens: 5
      });
      
      sessionStorage.setItem('nirnay_groq_key', apiKey);
      dispatch({ type: 'SET_GROQ_MODE', payload: 'Live Groq' });
      dispatch({ type: 'SET_GROQ_KEY_PRESENT', payload: true });
      dispatch({ type: 'SET_GROQ_MODEL', payload: model });
      setSuccessMsg('Live Groq key validated and saved to session.');
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.status === 401 ? 'Invalid API Key' : 'Validation failed. Check model or network.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setApiKey('');
    setMode('demo');
    sessionStorage.removeItem('nirnay_groq_key');
    dispatch({ type: 'SET_GROQ_MODE', payload: 'demo' });
    dispatch({ type: 'SET_GROQ_KEY_PRESENT', payload: false });
    setErrorMsg('');
    setSuccessMsg('Key cleared.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="m-0 text-xl font-bold flex items-center gap-2">
            <Zap className="text-idbiOrange" size={24} /> AI Connection Settings
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-surfaceMuted rounded"><X size={20} /></button>
        </div>

        <div className="bg-amberLight text-amber border border-amber/20 p-3 rounded-lg text-[13px] leading-relaxed">
          <strong>Security Warning:</strong> Your Groq key is used only for this browser session and is cleared when this tab is closed. Because this is a browser-only demonstration, do not use a production or high-privilege API key.
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm">Intelligence Mode</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" checked={mode === 'demo'} onChange={() => setMode('demo')} className="accent-idbiTeal" /> Demo AI (Offline)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" checked={mode === 'Live Groq'} onChange={() => setMode('Live Groq')} className="accent-idbiTeal" /> Live Groq
            </label>
          </div>
        </div>

        {mode === 'Live Groq' && (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Groq API Key</label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-3 text-textMuted" />
                <input 
                  type="password" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:border-idbiTeal focus:ring-1 focus:ring-idbiTeal"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Model Selection</label>
              <select 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-surface focus:outline-none focus:border-idbiTeal focus:ring-1 focus:ring-idbiTeal"
              >
                <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended)</option>
                <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
              </select>
            </div>
          </>
        )}

        {errorMsg && <div className="text-danger text-sm font-medium">{errorMsg}</div>}
        {successMsg && <div className="text-success text-sm font-medium flex items-center gap-2"><CheckCircle2 size={16}/> {successMsg}</div>}

        <div className="flex justify-end gap-3 mt-2">
          {mode === 'Live Groq' && apiKey && (
            <button onClick={handleClear} className="btn-secondary !text-danger !border-danger hover:!bg-dangerLight">Clear Key</button>
          )}
          <button onClick={handleSave} disabled={isValidating} className="btn-primary">
            {isValidating ? 'Validating...' : 'Test & Save Connection'}
          </button>
        </div>
      </div>
    </div>
  );
}
