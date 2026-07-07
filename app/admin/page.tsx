'use client';

import React, { useEffect, useState } from 'react';
import { getWholesaleLeads, adminLogout } from '../actions';
import { useRouter } from 'next/navigation';

interface Lead {
  id: string;
  company: string;
  email: string;
  productInterest?: string | null;
  quantity?: string | null;
  date: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadDashboardData() {
      const response = await getWholesaleLeads();
      if (response.success) {
        setLeads(response.data);
      } else {
        setError(response.error ?? 'Unable to load leads');
      }
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  async function handleLogout() {
    await adminLogout();
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">British Solar Direct</h1>
            <p className="text-slate-400 text-sm mt-1">Wholesale Lead Management Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-bold text-sm shadow">
              Active Enquiries: {leads.length}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white transition"
            >
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading leads...</p>
        ) : error ? (
          <div className="bg-rose-950 border border-rose-800 rounded-xl p-8 text-center text-rose-300 text-sm">
            {error}
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
            No wholesale leads have been captured yet.
          </div>
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-4 font-mono text-amber-400 text-xs">{lead.id.slice(0, 8)}</td>
                    <td className="p-4 font-semibold text-white">{lead.company}</td>
                    <td className="p-4 font-mono text-slate-300">{lead.email}</td>
                    <td className="p-4 text-slate-400">{lead.productInterest ?? '—'}</td>
                    <td className="p-4 text-slate-400">{lead.quantity ?? '—'}</td>
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
