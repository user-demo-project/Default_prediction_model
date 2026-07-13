# NIRNAY 365: Agentic MSME Default Prevention Suite

This is the frontend-only React application for the **IDBI Innovate 2026 Hackathon - Track 4 (MSME Default Prevention)**. 

The application demonstrates how an agentic workflow can autonomously monitor MSME accounts, detect emerging stress, reconstruct the stress pathway, investigate counterparty contagion, and recommend preventive interventions.

## Features
- **Predictive Risk Funnel**: Proactive liquidity monitoring.
- **Stress Movie**: Chronological reconstruction of the stress pathway.
- **Agentic Investigation Room**: Simulated execution of 14 specialised AI agents.
- **Counterparty Graph**: Interactive React Flow graph showing dependency contagion.
- **Intervention Lab**: Counterfactual testing of preventive actions.
- **Ask NIRNAY**: Optional Groq-powered chat assistant.
- **Route-Aware Tour**: An automated judge walkthrough using `react-joyride`.

## Setup Instructions

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Configuration (Bring Your Own Key)

To use the live AI features (Ask NIRNAY), click the "Demo AI" button in the top navigation bar. Enter a valid Groq API key and select the model (e.g., `llama-3.3-70b-versatile`). The key is stored securely in `sessionStorage` and is deleted when the tab is closed.

If no key is provided, the application will gracefully fall back to deterministic offline responses.

## Build for Production

```bash
npm run build
```
The output will be generated in the `dist/` directory, ready to be deployed as a static site (e.g., Vercel, Netlify, or GitHub Pages).

## Synthetic Data Notice
This is a demonstration environment. All MSME portfolios, borrowers, financials, GST feeds, and counterparty data are completely synthetic. No real IDBI Bank or customer data is used.
