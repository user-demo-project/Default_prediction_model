/**
 * CustomTour — NIRNAY 365
 * 100% custom, zero library dependencies.
 * Works across page navigation cleanly.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { X, ArrowRight, ArrowLeft, SkipForward } from 'lucide-react';

const STEPS = [
  { target: null,                         placement: 'center', title: '👋 Welcome to NIRNAY 365',       content: "Let's explore how IDBI predicts and prevents MSME defaults using agentic AI. Click Next to begin.",                                         route: '/portfolio' },
  { target: '[data-tour="portfolio-overview"]', placement: 'bottom', title: '📊 Portfolio Command Centre',    content: 'Monitor the entire MSME portfolio. "Emerging Stress" accounts are paying on time but showing underlying deterioration.',                route: '/portfolio' },
  { target: '[data-tour="risk-funnel"]',        placement: 'right',  title: '🔺 Predictive Risk Funnel',     content: 'NIRNAY monitors thousands, identifies deviations, runs autonomous investigations, and escalates only high-risk cases.',             route: '/portfolio' },
  { target: '[data-tour="shakti-row"]',         placement: 'top',    title: '🚨 High-Priority Case',         content: 'Shakti Auto Components — 12-month PD is 68%, up from 29%. Click Investigate to open its Digital Twin.',                          route: '/portfolio' },
  { target: '[data-tour="borrower-summary"]',   placement: 'bottom', title: '🏭 Borrower Digital Twin',      content: 'Transactions, GST, operational signals, and documents form a complete borrower picture.',                                          route: '/borrower/MSME-1042' },
  { target: '[data-tour="receivable-driver"]',  placement: 'bottom', title: '💧 The Liquidity Squeeze',      content: 'Receivable days nearly doubled, pushing working capital to 94%. Electricity usage is stable — still operating.',                   route: '/borrower/MSME-1042' },
  { target: '[data-tour="stress-movie"]',       placement: 'top',    title: '🎬 The Stress Movie',           content: 'A chronological timeline showing how stress developed — a predictable sequence, not a sudden shock.',                              route: '/borrower/MSME-1042' },
  { target: '[data-tour="evidence-graph"]',     placement: 'top',    title: '🕸️ Counterparty Contagion',    content: '61% of revenue relies on one buyer severely delaying payments. This is the root cause.',                                           route: '/borrower/MSME-1042' },
  { target: '[data-tour="ask-nirnay"]',         placement: 'left',   title: '🤖 Ask NIRNAY',                content: 'Chat directly with the AI about this borrower by opening the Ask NIRNAY drawer.',                                                   route: '/borrower/MSME-1042' },
  { target: null,                               placement: 'center', title: '🔍 Agentic Investigation',      content: "How did NIRNAY find all this? Let's go to the Investigation Room.",                                                                route: '/investigation/MSME-1042' },
  { target: '[data-tour="investigation-room"]', placement: 'bottom', title: '⚙️ Multi-Agent Workflow',       content: '14 specialised agents autonomously investigate, debate, and compile the evidence.',                                                 route: '/investigation/MSME-1042' },
  { target: '[data-tour="risk-committee"]',     placement: 'left',   title: '🏛️ AI Risk Committee',         content: 'Agents form a consensus and draft a summary for the human credit officer.',                                                         route: '/investigation/MSME-1042' },
  { target: '[data-tour="intervention-lab"]',   placement: 'bottom', title: '🧪 Intervention Lab',           content: 'NIRNAY simulates counterfactual scenarios — compare doing nothing vs. providing receivable financing.',                            route: '/interventions/MSME-1042' },
  { target: '[data-tour="human-decision"]',     placement: 'left',   title: '✅ Human in the Loop',          content: 'The credit officer approves the AI recommendation. The decision is logged to the Audit Trail. Tour complete!',                     route: '/interventions/MSME-1042' },
];

function getTooltipPosition(targetEl, placement, tooltipEl) {
  if (!targetEl) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  const rect = targetEl.getBoundingClientRect();
  const tw = tooltipEl?.offsetWidth || 340;
  const th = tooltipEl?.offsetHeight || 180;
  const gap = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top, left;

  switch (placement) {
    case 'bottom': top = rect.bottom + gap; left = rect.left + rect.width / 2 - tw / 2; break;
    case 'top':    top = rect.top - th - gap; left = rect.left + rect.width / 2 - tw / 2; break;
    case 'left':   top = rect.top + rect.height / 2 - th / 2; left = rect.left - tw - gap; break;
    case 'right':  top = rect.top + rect.height / 2 - th / 2; left = rect.right + gap; break;
    default:       return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }

  // Clamp within viewport
  top  = Math.max(8, Math.min(top,  vh - th - 8));
  left = Math.max(8, Math.min(left, vw - tw - 8));

  return { top: `${top}px`, left: `${left}px` };
}

export default function CustomTour() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();

  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({});
  const tooltipRef = useRef(null);
  const pendingStep = useRef(null);

  const step = STEPS[stepIndex];
  const isRunning = state.tourRunning;

  // --- After navigation, resume pending step ---
  useEffect(() => {
    if (pendingStep.current !== null) {
      const idx = pendingStep.current;
      pendingStep.current = null;
      // Wait for the new page's DOM to settle
      setTimeout(() => setStepIndex(idx), 500);
    }

    // Also handle sessionStorage start flag (set by LandingPage)
    const flag = sessionStorage.getItem('nirnay-start-tour');
    if (flag === 'true') {
      sessionStorage.removeItem('nirnay-start-tour');
      setTimeout(() => {
        dispatch({ type: 'SET_TOUR_STATE', payload: { run: true, stepIndex: 0 } });
        setStepIndex(0);
      }, 400);
    }
  }, [location.pathname]);

  // --- Position tooltip relative to target element ---
  useEffect(() => {
    if (!isRunning || !step) return;

    const update = () => {
      const el = step.target ? document.querySelector(step.target) : null;
      setTargetRect(el ? el.getBoundingClientRect() : null);
      setTooltipPos(getTooltipPosition(el, step.placement, tooltipRef.current));
    };

    update();
    const interval = setInterval(update, 200); // keep in sync with scrolling/resizing
    return () => clearInterval(interval);
  }, [isRunning, stepIndex, step]);

  // --- Sync stepIndex from global state ---
  useEffect(() => {
    if (isRunning) setStepIndex(state.tourStepIndex ?? 0);
  }, [state.tourRunning]);

  const goTo = (idx) => {
    if (idx < 0 || idx >= STEPS.length) return endTour();
    const next = STEPS[idx];
    const nextRoute = next.route?.split('?')[0];

    dispatch({ type: 'SET_TOUR_STATE', payload: { run: true, stepIndex: idx } });

    if (nextRoute && nextRoute !== location.pathname) {
      pendingStep.current = idx;
      navigate(nextRoute);
    } else {
      setStepIndex(idx);
    }
  };

  const endTour = () => {
    dispatch({ type: 'SET_TOUR_STATE', payload: { run: false, stepIndex: 0 } });
    localStorage.setItem('nirnay-tour-completed', 'true');
  };

  if (!isRunning || !step) return null;

  const isCenter = !step.target || step.placement === 'center';
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  return (
    <>
      {/* Dark overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(0,0,0,0.55)',
          pointerEvents: isCenter ? 'auto' : 'none',
        }}
        onClick={isCenter ? undefined : undefined}
      />

      {/* Spotlight cutout for target element */}
      {targetRect && !isCenter && (
        <div style={{
          position: 'fixed',
          top: targetRect.top - 6,
          left: targetRect.left - 6,
          width: targetRect.width + 12,
          height: targetRect.height + 12,
          zIndex: 9999,
          borderRadius: 8,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
          pointerEvents: 'none',
          border: '2px solid #00836C',
        }} />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          zIndex: 10000,
          width: 340,
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          padding: '24px',
          fontFamily: 'inherit',
          ...tooltipPos,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#162522', lineHeight: 1.4, flex: 1 }}>
            {step.title}
          </div>
          <button
            onClick={endTour}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#5B6B67', marginLeft: 8, flexShrink: 0 }}
            title="Close tour"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <p style={{ fontSize: 13.5, color: '#3D5450', lineHeight: 1.6, margin: '0 0 20px 0' }}>
          {step.content}
        </p>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 16 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: i === stepIndex ? 18 : 6, height: 6,
              borderRadius: 3,
              background: i === stepIndex ? '#00836C' : i < stepIndex ? '#81908C' : '#E0E8E6',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={endTour}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#5B6B67', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <SkipForward size={13} /> Skip Tour
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            {!isFirst && (
              <button
                onClick={() => goTo(stepIndex - 1)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 8, border: '1px solid #d0dbd9',
                  background: '#fff', color: '#162522', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              onClick={() => isLast ? endTour() : goTo(stepIndex + 1)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 8, border: 'none',
                background: '#00836C', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700,
              }}
            >
              {isLast ? 'Finish ✓' : <>Next <ArrowRight size={14} /></>}
            </button>
          </div>
        </div>

        {/* Step counter */}
        <div style={{ textAlign: 'center', fontSize: 11, color: '#81908C', marginTop: 12 }}>
          Step {stepIndex + 1} of {STEPS.length}
        </div>
      </div>
    </>
  );
}
