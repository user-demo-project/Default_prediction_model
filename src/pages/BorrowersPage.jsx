import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { borrowers } from '../data/portfolioData';
import { ArrowRight, Search, Filter } from 'lucide-react';

export default function BorrowersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBorrowers = borrowers.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold mb-1">Borrower Cases</h1>
          <p className="text-textSecondary">Complete list of MSME accounts under predictive monitoring.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-idbiTeal"
            />
          </div>
          <button className="btn-secondary px-3"><Filter size={16}/> Filters</button>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surfaceMuted text-textSecondary">
              <tr>
                <th className="py-3 px-4 font-semibold">Borrower</th>
                <th className="py-3 px-4 font-semibold">Sector</th>
                <th className="py-3 px-4 font-semibold">Exposure</th>
                <th className="py-3 px-4 font-semibold">Risk Grade</th>
                <th className="py-3 px-4 font-semibold">12M PD</th>
                <th className="py-3 px-4 font-semibold">Account Status</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBorrowers.map(b => (
                <tr key={b.id} className="hover:bg-surfaceMuted transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-textPrimary">{b.name}</div>
                    <div className="text-xs text-textMuted">{b.id}</div>
                  </td>
                  <td className="py-3 px-4 text-textSecondary">{b.sector}</td>
                  <td className="py-3 px-4 font-medium">₹{b.exposureCr} Cr</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${
                      b.riskGrade === 'R5' ? 'badge-danger' : 
                      b.riskGrade === 'R4' ? 'badge-warning' : 
                      b.riskGrade === 'R3' ? 'badge-warning' : 
                      b.riskGrade === 'R2' ? 'bg-surfaceMuted text-textSecondary border border-border' : 
                      'badge-success'
                    }`}>
                      {b.riskGrade}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold tabular-nums">{b.pd12m}%</td>
                  <td className="py-3 px-4 text-textSecondary">{b.accountStatus}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => navigate(`/borrower/${b.id}`)}
                      className="text-idbiTeal font-medium hover:underline flex items-center gap-1"
                    >
                      View <ArrowRight size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBorrowers.length === 0 && (
            <div className="p-8 text-center text-textMuted">No borrowers found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
