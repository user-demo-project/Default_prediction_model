import React, { useState, useEffect, useRef } from 'react';
import { useDemo } from '../../context/DemoContext';
import { getDemoAnswer } from '../../data/mockAiResponses';
import { X, Send, Bot, User, Zap, ShieldAlert, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Groq from 'groq-sdk';

export default function AskNirnayDrawer({ isOpen, onClose, borrowerId }) {
  const { state, dispatch } = useDemo();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Why did the risk increase so rapidly?",
    "Is this behaviour just seasonal?",
    "Show me the evidence for buyer concentration.",
    "What changed in the last 90 days?",
    "Why is receivable financing preferred here?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatMessages, isTyping, isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { role: 'user', content: text };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMsg });
    setInput('');
    setIsTyping(true);

    try {
      if (state.groqMode === 'Live Groq' && state.groqKeyPresent) {
        // Build context for LLM based on our data
        const systemPrompt = `You are NIRNAY, an AI default-prevention assistant for IDBI Bank. You are currently helping a credit officer analyze the MSME borrower ${borrowerId} (Shakti Auto Components). 
        The borrower's 12-month PD is 68%. They have an R4 Risk Grade. The primary issue is a liquidity mismatch caused by a delayed payment from their main buyer (Apex Mobility Systems). 
        Working capital utilization is at 94%. Receivable days are 91. 
        Keep your answers concise, professional, and directly related to the credit risk context. Do not use markdown headers larger than h3. Use bolding to highlight key points. Use bullet points where appropriate.`;

        const groq = new Groq({ apiKey: sessionStorage.getItem('nirnay_groq_key'), dangerouslyAllowBrowser: true });
        
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            ...state.chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text }
          ],
          model: state.groqModel,
          temperature: 0.2,
          max_tokens: 400,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "No response generated.";
        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { role: 'assistant', content: reply } });

      } else {
        // Demo Mode Fallback
        // Simulate thinking delay
        await new Promise(r => setTimeout(r, 1200));
        const reply = getDemoAnswer(text);
        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { role: 'assistant', content: reply } });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { role: 'assistant', content: "An error occurred connecting to the AI model. Please verify your connection or API key." } });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-screen w-[450px] bg-surface shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-border ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-border bg-surfaceMuted flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-idbiTeal flex items-center justify-center text-white shadow-sm">
              <Zap size={16} />
            </div>
            <div>
              <h3 className="font-bold text-textPrimary leading-tight">Ask NIRNAY</h3>
              <div className="text-xs flex items-center gap-1 font-medium mt-0.5">
                {state.groqMode === 'Live Groq' ? (
                  <><span className="w-1.5 h-1.5 bg-success rounded-full"></span> <span className="text-success">Live Groq Connected</span></>
                ) : (
                  <><span className="w-1.5 h-1.5 bg-amber rounded-full"></span> <span className="text-amber">Demo AI Mode (Offline)</span></>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-textMuted hover:text-textPrimary hover:bg-border rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-pageBackground">
          {state.chatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-textSecondary gap-4">
              <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center text-idbiTeal shadow-sm">
                <Bot size={32} />
              </div>
              <div>
                <h4 className="font-bold text-textPrimary text-lg mb-2">How can I help you analyse this case?</h4>
                <p className="text-sm">I can answer questions about the agent findings, stress pathway, counterparty risk, or recommended interventions.</p>
              </div>
            </div>
          ) : (
            state.chatMessages.map((msg, i) => (
              <div key={i} className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-surface border border-border text-textPrimary' : 'bg-idbiTeal text-white'}`}>
                  {msg.role === 'user' ? <User size={16}/> : <Zap size={16}/>}
                </div>
                <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-surface border border-border text-textPrimary rounded-tr-sm' : 'bg-white border border-border text-textPrimary rounded-tl-sm'}`}>
                  <ReactMarkdown 
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-idbiTealDeep" {...props} />
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex gap-3 max-w-[90%] self-start">
               <div className="w-8 h-8 rounded-full bg-idbiTeal text-white flex items-center justify-center shrink-0 mt-1">
                  <Zap size={16}/>
               </div>
               <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-border flex items-center justify-center shadow-sm">
                 <Loader2 size={16} className="animate-spin text-idbiTeal" />
               </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-surface shrink-0 flex flex-col gap-3">
          
          {/* Suggested Prompts */}
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {suggestedQuestions.map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="whitespace-nowrap px-3 py-1.5 bg-pageBackground border border-border rounded-full text-xs font-medium text-textSecondary hover:text-idbiTeal hover:border-idbiTeal transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="relative flex items-center"
          >
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about evidence, risk or interventions..."
              disabled={isTyping}
              className="w-full pl-4 pr-12 py-3 bg-surfaceMuted border border-border rounded-xl text-sm focus:outline-none focus:border-idbiTeal focus:bg-white transition-colors shadow-sm disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-idbiTeal text-white rounded-lg disabled:bg-border disabled:text-textMuted hover:bg-idbiTealDark transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
          
          {state.groqMode === 'demo' && (
            <div className="text-[10px] text-center text-textMuted flex items-center justify-center gap-1">
              <ShieldAlert size={10} /> Currently using deterministic offline responses. Connect Groq key for live AI.
            </div>
          )}
        </div>

      </div>
    </>
  );
}
