import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { borrowers } from '../../data/portfolioData';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // If we are at root, no breadcrumbs needed
  if (pathnames.length === 0) return null;

  const buildBreadcrumbLabel = (value, index) => {
    if (value === 'portfolio') return 'Portfolio';
    if (value === 'borrowers') return 'Borrower Cases';
    if (value === 'borrower') return 'Digital Twin';
    if (value === 'investigation') return 'Agentic Investigation';
    if (value === 'interventions') return 'Intervention Lab';
    if (value === 'model-monitoring') return 'Model Monitoring';
    if (value === 'audit') return 'Audit Trail';
    if (value === 'about') return 'About Solution';
    
    // Check if it's an MSME ID
    if (value.startsWith('MSME-')) {
      const b = borrowers.find(b => b.id === value);
      return b ? b.name : value;
    }

    return value;
  };

  return (
    <nav className="flex items-center text-sm font-medium text-textMuted py-4 px-6 bg-pageBackground">
      <Link to="/portfolio" className="hover:text-idbiTeal transition-colors flex items-center">
        <Home size={14} className="mr-1" />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = buildBreadcrumbLabel(value, index);

        // Don't show redundant MSME id part if the previous was already borrower, investigate etc.
        // Actually it's good to show the name.
        
        return (
          <React.Fragment key={to}>
            <ChevronRight size={14} className="mx-2 opacity-50" />
            {last ? (
              <span className="text-textPrimary font-semibold">{label}</span>
            ) : (
              <Link to={to} className="hover:text-idbiTeal transition-colors">{label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
