import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Shuffle, BarChart3, ShieldCheck, Map, Info, Zap } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Portfolio', path: '/portfolio', icon: <LayoutDashboard size={18} /> },
    { name: 'Borrower Cases', path: '/borrowers', icon: <Users size={18} /> },
    { name: 'Investigation', path: '/investigation/MSME-1042', icon: <Activity size={18} /> },
    { name: 'Intervention Lab', path: '/interventions/MSME-1042', icon: <Shuffle size={18} /> },
    { name: 'Model Monitoring', path: '/model-monitoring', icon: <BarChart3 size={18} /> },
    { name: 'Audit Trail', path: '/audit', icon: <ShieldCheck size={18} /> },
    { name: 'Product Tour', path: '#', icon: <Map size={18} />, isAction: true },
    { name: 'About Solution', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <div className="w-64 bg-idbiTealDeep text-white h-screen flex flex-col flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <Zap className="text-idbiOrange" size={24} />
          NIRNAY 365
        </div>
        <div className="text-xs text-idbiTealLight mt-1 opacity-70">Agentic Default Prevention</div>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="flex flex-col gap-1 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.isAction ? (
                <button 
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-idbiTeal transition-colors text-idbiTealLight"
                  onClick={() => {/* Trigger Tour */}}
                >
                  {item.icon}
                  {item.name}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-idbiTeal text-white' : 'hover:bg-idbiTealDark text-idbiTealLight'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 m-4 bg-idbiTealDark rounded-lg border border-idbiTeal opacity-90">
        <div className="text-xs font-semibold text-idbiOrangeLight mb-1">IDBI Innovate 2026</div>
        <div className="text-[11px] text-idbiTealLight leading-relaxed">
          Synthetic demonstration environment. No real banking data.
        </div>
      </div>
    </div>
  );
}
