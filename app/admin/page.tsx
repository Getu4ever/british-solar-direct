'use client'

import React, { useEffect, useState } from 'react';
import { getWholesaleLeads } from '../actions';

interface Lead {
  id: string;
  company: string;
  email: string;
  date: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Automatically fetch incoming leads as soon as the admin logs on
  useEffect(() => {
    async function loadDashboardData() {
      const response = await getWholesaleLeads();
      if (response.success) {
        setLeads(response.data);
      }
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Title Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">British Solar Direct</h1>
            <p className="text-slate-400 text-sm mt-1">Wholesale Import Lead Management Portal</p>
          </div>
          <div className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-bold text-sm shadow">
            Active Enquiries: {leads.length}
          </div>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading logistics pipeline metrics...</p>
        ) : leads.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
            No wholesale leads have been captured in memory yet.
          </div>
        ) : (
          /* Leads Visual Tracking Table */
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Contact Email</th>
                  <th className="p-4">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-mono text-amber-400 font-medium">#{lead.id}</td>
                    <td className="p-4 font-semibold text-white">{lead.company}</td>
                    <td className="p-4 font-mono text-slate-300">{lead.email}</td>
                    <td className="p-4 text-slate-400">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
