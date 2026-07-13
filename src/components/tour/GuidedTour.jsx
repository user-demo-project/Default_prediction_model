import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Joyride, STATUS } from 'react-joyride';
import { useDemo } from '../../context/DemoContext';

export default function GuidedTour() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState(0); // Used to force re-render when route changes during tour

  const steps = [
    {
      target: 'body',
      placement: 'center',
      title: 'Welcome to NIRNAY 365',
      content: 'Let\'s explore how IDBI predicts and prevents MSME defaults using agentic AI. Click Next to begin.',
      disableBeacon: true,
      route: '/portfolio'
    },
    {
      target: '[data-tour="portfolio-overview"]',
      placement: 'bottom',
      title: 'Portfolio Command Centre',
      content: 'Here, credit officers monitor the entire MSME portfolio. Notice the "Emerging Stress" metric — these are accounts currently paying on time but showing underlying deterioration.',
      route: '/portfolio'
    },
    {
      target: '[data-tour="risk-funnel"]',
      placement: 'right',
      title: 'Predictive Risk Funnel',
      content: 'NIRNAY acts like a funnel: monitoring thousands, identifying behavioural deviations, running autonomous investigations, and escalating only the high-risk cases for human intervention.',
      route: '/portfolio'
    },
    {
      target: '[data-tour="shakti-row"]',
      placement: 'top',
      title: 'High-Priority Case',
      content: 'Look at Shakti Auto Components. The 12-month PD is 68%, up from 29%. Let\'s click "Investigate" to open its Digital Twin.',
      route: '/portfolio',
      spotlightPadding: 5
    },
    {
      target: '[data-tour="borrower-summary"]',
      placement: 'bottom',
      title: 'Borrower Digital Twin',
      content: 'We are now inside the digital twin. It aggregates transactions, GST, operational signals, and documents to form a complete view of the borrower.',
      route: '/borrower/MSME-1042'
    },
    {
      target: '[data-tour="receivable-driver"]',
      placement: 'bottom',
      title: 'The Liquidity Squeeze',
      content: 'Notice the primary drivers: Receivable days nearly doubled, pushing working capital utilisation to 94%. Yet, electricity usage remains stable—they are still operating.',
      route: '/borrower/MSME-1042'
    },
    {
      target: '[data-tour="stress-movie"]',
      placement: 'top',
      title: 'The Stress Movie',
      content: 'This chronological timeline reconstructs exactly how the stress developed, proving this isn\'t a sudden shock but a predictable sequence. Click any event to see the AI agent\'s evidence.',
      route: '/borrower/MSME-1042'
    },
    {
      target: '[data-tour="evidence-graph"]',
      placement: 'top',
      title: 'Counterparty Contagion',
      content: '(Switch to Counterparties tab) The AI discovered that 61% of revenue relies on one buyer who is severely delaying payments. This is the root cause.',
      route: '/borrower/MSME-1042' // In a real app we'd simulate the tab click, but we can just highlight the container
    },
    {
      target: '[data-tour="ask-nirnay"]',
      placement: 'left',
      title: 'Ask NIRNAY',
      content: 'If you want to dig deeper, you can chat directly with the AI about this borrower by opening the Ask NIRNAY drawer.',
      route: '/borrower/MSME-1042'
    },
    {
      target: 'body', // We'll trigger a nav immediately
      placement: 'center',
      title: 'Agentic Investigation',
      content: 'How did NIRNAY find all this out? Let\'s go to the Investigation Room.',
      route: '/investigation/MSME-1042'
    },
    {
      target: '[data-tour="investigation-room"]',
      placement: 'bottom',
      title: 'Multi-Agent Workflow',
      content: 'When an anomaly is detected, 14 specialised agents (Data Scout, Counterparty Contagion, Evidence Auditor) autonomously investigate, debate, and compile the evidence.',
      route: '/investigation/MSME-1042'
    },
    {
      target: '[data-tour="risk-committee"]',
      placement: 'left',
      title: 'AI Risk Committee',
      content: 'The agents form a consensus and draft a summary for the human credit officer. The recommendation is to proceed to the Intervention Lab.',
      route: '/investigation/MSME-1042'
    },
    {
      target: '[data-tour="intervention-lab"]',
      placement: 'bottom',
      title: 'Intervention Lab',
      content: 'Instead of just sending an alert, NIRNAY simulates counterfactual scenarios. Here, we can compare the impact of doing nothing vs. providing receivable financing.',
      route: '/interventions/MSME-1042'
    },
    {
      target: '[data-tour="human-decision"]',
      placement: 'left',
      title: 'Human in the Loop',
      content: 'The AI recommends Scenario 2. The credit officer reviews the impact and approves it. The decision is logged to the Audit Trail and sent to the Relationship Manager. The tour is now complete!',
      route: '/interventions/MSME-1042'
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status, type, index, action } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      dispatch({ type: 'SET_TOUR_STATE', payload: { run: false, stepIndex: 0 } });
      localStorage.setItem('nirnay-tour-completed', 'true');
      return;
    }

    if (type === 'step:after') {
      const nextIndex = index + (action === 'prev' ? -1 : 1);
      const nextStep = steps[nextIndex];
      
      if (nextStep) {
        if (nextStep.route && location.pathname !== nextStep.route.split('?')[0]) {
          dispatch({ type: 'SET_TOUR_STATE', payload: { run: false, stepIndex: nextIndex } });
          navigate(nextStep.route);
          setTimeout(() => {
            dispatch({ type: 'SET_TOUR_STATE', payload: { run: true, stepIndex: nextIndex } });
          }, 400);
        } else {
          dispatch({ type: 'SET_TOUR_STATE', payload: { run: true, stepIndex: nextIndex } });
        }
      }
    }
  };

  if (!state.tourRunning) return null;

  return (
    <Joyride
      key={key}
      steps={steps}
      stepIndex={state.tourStepIndex}
      run={state.tourRunning}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: '#00836C',
          textColor: '#162522',
          backgroundColor: '#FFFFFF',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: '12px',
          padding: '24px'
        },
        buttonNext: {
          borderRadius: '8px',
          fontWeight: 600,
          padding: '10px 16px'
        },
        buttonBack: {
          marginRight: '10px'
        },
        buttonSkip: {
          color: '#5B6B67'
        }
      }}
      locale={{
        last: 'Finish Tour',
        skip: 'Skip Tour'
      }}
    />
  );
}
