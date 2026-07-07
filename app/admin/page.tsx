'use client';

import React, { useEffect, useState } from 'react';
import { getAdminDashboard, adminLogout } from '../actions';
import { useRouter } from 'next/navigation';

type Tab = 'quotes' | 'contacts' | 'trade';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('quotes');
  const [data, setData] = useState<{
    quotes: Array<Record<string, string | null | undefined>>;
    contacts: Array<Record<string, string | null | undefined>>;
    tradeApps: Array<Record<string, string | null | undefined>>;
  }>({ quotes: [], contacts: [], tradeApps: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadDashboardData() {
      const response = await getAdminDashboard();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error ?? 'Unable to load dashboard');
      }
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  async function handleLogout() {
    await adminLogout();
    router.push('/admin/login');
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'quotes', label: 'Quote requests', count: data.quotes.length },
    { id: 'contacts', label: 'Contact enquiries', count: data.contacts.length },
    { id: 'trade', label: 'Trade applications', count: data.tradeApps.length },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">British Solar Direct</h1>
            <p className="text-slate-400 text-sm mt-1">Lead management — respond within 4 business hours</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition self-start"
          >
            Sign out
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                tab === item.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading leads...</p>
        ) : error ? (
          <div className="bg-rose-950 border border-rose-800 rounded-xl p-8 text-center text-rose-300 text-sm">
            {error}
          </div>
        ) : tab === 'quotes' ? (
          <LeadTable
            empty="No quote requests yet."
            headers={['Name / company', 'Email', 'Postcode', 'Quantity', 'Product', 'Submitted']}
            rows={data.quotes.map((lead) => [
              lead.company,
              lead.email,
              lead.postcode,
              lead.quantity,
              lead.productInterest,
              lead.date,
            ])}
          />
        ) : tab === 'contacts' ? (
          <LeadTable
            empty="No contact enquiries yet."
            headers={['Name', 'Email', 'Message', 'Submitted']}
            rows={data.contacts.map((item) => [
              item.name,
              item.email,
              item.message?.slice(0, 80),
              item.date,
            ])}
          />
        ) : (
          <LeadTable
            empty="No trade applications yet."
            headers={['Company', 'Contact', 'Email', 'Type', 'Submitted']}
            rows={data.tradeApps.map((item) => [
              item.company,
              item.contact,
              item.email,
              item.businessType,
              item.date,
            ])}
          />
        )}
      </div>
    </div>
  );
}

function LeadTable({
  headers,
  rows,
  empty,
}: {
  headers: string[];
  rows: (string | null | undefined)[][];
  empty: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
        {empty}
      </div>
    );
  }

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-slate-900/50 transition">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 text-slate-300">
                  {cell ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
