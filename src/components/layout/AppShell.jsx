import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Breadcrumbs from './Breadcrumbs';
import GuidedTour from '../tour/GuidedTour';

export default function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-pageBackground">
      <GuidedTour />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        {/* Persistent Demo Banner */}
        <div className="bg-idbiTealLight text-idbiTealDeep text-xs font-semibold py-1.5 px-6 border-b border-border flex items-center justify-center shrink-0 shadow-sm z-10 sticky top-0">
          Synthetic Demo Environment — No real customer or banking data
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col relative">
          <Breadcrumbs />
          <main className="flex-1 px-6 pb-12 w-full max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
