import React from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioMetrics, borrowers } from '../data/portfolioData';
import { Users, TrendingDown, AlertTriangle, AlertOctagon, Wallet, Clock, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PortfolioPage() {
  const navigate = useNavigate();

  const riskData = [
    { name: 'R1 Stable', value: portfolioMetrics.stableBorrowers, color: '#2E7D32' },
    { name: 'R2 Watch', value: portfolioMetrics.watchBorrowers, color: '#81908C' },
    { name: 'R3 Emerging Stress', value: portfolioMetrics.emergingStressBorrowers, color: '#F37021' },
    { name: 'R4 High and Deteriorating', value: portfolioMetrics.highRiskBorrowers, color: '#D98B00' },
    { name: 'R5 Critical', value: portfolioMetrics.criticalBorrowers, color: '#C93B37' }
  ];

  return (
    <div className="flex flex-col gap-6 mt-6" data-tour="portfolio-overview">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold mb-1">Portfolio Command Centre</h1>
          <p className="text-textSecondary">Overview of MSME portfolio health and emerging stress signals.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card p-4 flex flex-col gap-2 border-t-4 border-t-idbiTeal">
          <div className="text-textSecondary text-xs font-semibold flex items-center gap-1"><Users size={14}/> MSME Monitored</div>
          <div className="text-2xl font-bold tabular-nums">{portfolioMetrics.totalBorrowers.toLocaleString('en-IN')}</div>
        </div>
        <div className="card p-4 flex flex-col gap-2 border-t-4 border-t-idbiTeal">
          <div className="text-textSecondary text-xs font-semibold flex items-center gap-1"><Wallet size={14}/> Total Exposure</div>
          <div className="text-2xl font-bold tabular-nums">₹{portfolioMetrics.totalExposureCr} Cr</div>
        </div>
        <div className="card p-4 flex flex-col gap-2 border-t-4 border-t-idbiOrange">
          <div className="text-textSecondary text-xs font-semibold flex items-center gap-1"><AlertTriangle size={14}/> Emerging Stress</div>
          <div className="text-2xl font-bold tabular-nums text-idbiOrange">{portfolioMetrics.emergingStressBorrowers}</div>
        </div>
        <div className="card p-4 flex flex-col gap-2 border-t-4 border-t-danger">
          <div className="text-textSecondary text-xs font-semibold flex items-center gap-1"><AlertOctagon size={14}/> High Risk</div>
          <div className="text-2xl font-bold tabular-nums text-danger">{portfolioMetrics.highRiskBorrowers}</div>
        </div>
        <div className="card p-4 flex flex-col gap-2 border-t-4 border-t-danger">
          <div className="text-textSecondary text-xs font-semibold flex items-center gap-1"><TrendingDown size={14}/> Exposure at Risk</div>
          <div className="text-2xl font-bold tabular-nums text-danger">₹{portfolioMetrics.exposureAtRiskCr} Cr</div>
        </div>
        <div className="card p-4 flex flex-col gap-2 border-t-4 border-t-information">
          <div className="text-textSecondary text-xs font-semibold flex items-center gap-1"><Clock size={14}/> Avg Warning Lead</div>
          <div className="text-2xl font-bold tabular-nums text-information">{portfolioMetrics.averageWarningLeadMonths} mo</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Funnel */}
        <div className="card flex flex-col gap-4" data-tour="risk-funnel">
          <h2 className="text-lg font-bold">Predictive Risk Funnel</h2>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <div className="bg-idbiTealLight text-idbiTealDeep p-3 rounded-lg text-sm font-medium flex justify-between items-center w-full">
              <span>MSME accounts monitored</span> <span className="font-bold">{portfolioMetrics.totalBorrowers.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-surfaceMuted border border-border p-3 rounded-lg text-sm font-medium flex justify-between items-center w-[90%] mx-auto">
              <span>Behavioural deviations</span> <span className="font-bold">186</span>
            </div>
            <div className="bg-amberLight border border-amber/20 text-amber p-3 rounded-lg text-sm font-medium flex justify-between items-center w-[80%] mx-auto">
              <span>Agentic investigations opened</span> <span className="font-bold">54</span>
            </div>
            <div className="bg-dangerLight border border-danger/20 text-danger p-3 rounded-lg text-sm font-medium flex justify-between items-center w-[70%] mx-auto">
              <span>High-risk borrowers</span> <span className="font-bold">17</span>
            </div>
            <div className="bg-idbiOrangeLight border border-idbiOrange/20 text-idbiOrange p-3 rounded-lg text-sm font-medium flex justify-between items-center w-[60%] mx-auto">
              <span>Immediate interventions</span> <span className="font-bold">8</span>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="card flex flex-col gap-4">
          <h2 className="text-lg font-bold">Risk Grade Distribution</h2>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, 'Borrowers']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">{portfolioMetrics.totalBorrowers}</span>
              <span className="text-xs text-textSecondary">Total</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs justify-center">
            {riskData.map(d => (
              <div key={d.name} className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>{d.name}</div>
            ))}
          </div>
        </div>

        {/* Portfolio Insights */}
        <div className="card flex flex-col gap-4 bg-surfaceMuted">
          <h2 className="text-lg font-bold">AI Portfolio Insights</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-white p-3 border border-border rounded-lg text-sm leading-relaxed shadow-sm border-l-4 border-l-idbiTeal">
              <strong>71%</strong> of the high-risk exposure is concentrated in three sectors.
            </div>
            <div className="bg-white p-3 border border-border rounded-lg text-sm leading-relaxed shadow-sm border-l-4 border-l-idbiOrange">
              <strong>Buyer-payment deterioration</strong> is the most common emerging stress pathway this month.
            </div>
            <div className="bg-white p-3 border border-border rounded-lg text-sm leading-relaxed shadow-sm border-l-4 border-l-danger">
              <strong>Six borrowers</strong> are currently regular on repayments but predicted to enter material stress within nine months.
            </div>
          </div>
        </div>

      </div>

      {/* High-priority table */}
      <div className="card flex flex-col gap-4 p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-bold">High-Priority Intervention Cases</h2>
          <button className="text-sm font-semibold text-idbiTeal hover:underline" onClick={() => navigate('/borrowers')}>View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surfaceMuted text-textSecondary">
              <tr>
                <th className="py-3 px-4 font-semibold">Borrower</th>
                <th className="py-3 px-4 font-semibold">Sector</th>
                <th className="py-3 px-4 font-semibold">Exposure</th>
                <th className="py-3 px-4 font-semibold">Risk Grade</th>
                <th className="py-3 px-4 font-semibold">12M PD</th>
                <th className="py-3 px-4 font-semibold">Expected Stress</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {borrowers.filter(b => b.riskGrade === 'R4' || b.riskGrade === 'R5').map(b => (
                <tr key={b.id} className={b.id === 'MSME-1042' ? 'bg-amberLight/30 hover:bg-amberLight/50' : 'hover:bg-surfaceMuted'} data-tour={b.id === 'MSME-1042' ? 'shakti-row' : ''}>
                  <td className="py-3 px-4 font-medium text-textPrimary">{b.name}</td>
                  <td className="py-3 px-4 text-textSecondary">{b.sector}</td>
                  <td className="py-3 px-4 font-medium">₹{b.exposureCr} Cr</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${b.riskGrade === 'R5' ? 'badge-danger' : 'badge-warning'}`}>
                      {b.riskGrade} — {b.riskLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold tabular-nums text-danger">{b.pd12m}%</td>
                  <td className="py-3 px-4 text-textSecondary">{b.expectedStress}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate(`/borrower/${b.id}`)}
                      className="text-idbiTeal font-medium hover:underline flex items-center gap-1"
                    >
                      Investigate <ArrowRight size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
