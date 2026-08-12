'use client';

import { useEffect, useState } from 'react';
import type { AnalyticsPayload } from '../app/lib/analytics-types';

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-GB').format(value);
}

export default function AnalyticsWidget() {
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/analytics', {
          method: 'GET',
          credentials: 'same-origin',
          cache: 'no-store',
        });
        const payload = (await response.json()) as AnalyticsPayload & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error || `Analytics request failed (${response.status})`);
        }

        if (!cancelled) {
          setData(payload);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load analytics.');
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mb-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl">
      <div className="flex flex-col gap-2 border-b border-slate-800 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/90">
            Google Analytics 4
          </p>
          <h2 className="mt-1 text-lg font-bold text-white">Site traffic · last 30 days</h2>
          <p className="mt-1 text-xs text-slate-500">
            British Solar Direct Website · {data?.measurementIdHint ?? 'G-PMRGTM81C5'} ·
            Property {data?.propertyId ?? '545166893'}
          </p>
          <p className="mt-0.5 text-xs text-slate-600">
            britishsolardirect.co.uk · Stream 15424109299
          </p>
        </div>
        <p className="text-xs text-slate-500">/notts-local · sessionSource</p>
      </div>

      <div className="p-4 sm:p-5">
        {loading ? (
          <p className="text-sm text-slate-400">Loading analytics…</p>
        ) : error ? (
          <div className="rounded-lg border border-rose-800 bg-rose-950/50 p-4 text-sm text-rose-300">
            <p className="font-semibold">Analytics unavailable</p>
            <p className="mt-1 text-rose-300/90">{error}</p>
            <p className="mt-3 text-xs text-rose-200/70">
              Check GA_SERVICE_ACCOUNT_JSON (or GA_CLIENT_EMAIL + GA_PRIVATE_KEY) and that the
              service account has Viewer access on property 545166893 (G-PMRGTM81C5).
            </p>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Active visitors
                </p>
                <p className="mt-2 text-2xl font-extrabold text-white">
                  {formatNumber(data.summary.activeUsers)}
                </p>
                <p className="mt-1 text-xs text-slate-500">activeUsers</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Total page views
                </p>
                <p className="mt-2 text-2xl font-extrabold text-sky-300">
                  {formatNumber(data.summary.pageViews)}
                </p>
                <p className="mt-1 text-xs text-slate-500">screenPageViews</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Total sessions
                </p>
                <p className="mt-2 text-2xl font-extrabold text-amber-400">
                  {formatNumber(data.summary.sessions)}
                </p>
                <p className="mt-1 text-xs text-slate-500">sessions</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  /notts-local traffic by source
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  e.g. nottinghampost · ageuknotts
                </span>
              </div>

              {data.nottsLocalSources.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-800 px-4 py-6 text-center text-sm text-slate-500">
                  No /notts-local sessions in the last 30 days yet.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-slate-800">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-900 text-[10px] uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-bold">Source</th>
                        <th className="px-4 py-3 font-bold">Path</th>
                        <th className="px-4 py-3 font-bold text-right">Visitors</th>
                        <th className="px-4 py-3 font-bold text-right">Sessions</th>
                        <th className="px-4 py-3 font-bold text-right">Views</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {data.nottsLocalSources.map((row) => (
                        <tr key={`${row.source}-${row.pagePath}`} className="bg-slate-950/40">
                          <td className="px-4 py-3 font-medium text-emerald-300">
                            {row.source}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-400">
                            {row.pagePath}
                          </td>
                          <td className="px-4 py-3 text-right text-white">
                            {formatNumber(row.activeUsers)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-300">
                            {formatNumber(row.sessions)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-300">
                            {formatNumber(row.pageViews)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
