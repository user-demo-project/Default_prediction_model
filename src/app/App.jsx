import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';

// Pages
import LandingPage from '../pages/LandingPage';
import PortfolioPage from '../pages/PortfolioPage';
import BorrowersPage from '../pages/BorrowersPage';
import BorrowerPage from '../pages/BorrowerPage';
import InvestigationPage from '../pages/InvestigationPage';
import InterventionPage from '../pages/InterventionPage';
import ModelMonitoringPage from '../pages/ModelMonitoringPage';
import AuditPage from '../pages/AuditPage';
import AboutPage from '../pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppShell />}>
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/borrowers" element={<BorrowersPage />} />
        <Route path="/borrower/:id" element={<BorrowerPage />} />
        <Route path="/investigation/:id" element={<InvestigationPage />} />
        <Route path="/interventions/:id" element={<InterventionPage />} />
        <Route path="/model-monitoring" element={<ModelMonitoringPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
