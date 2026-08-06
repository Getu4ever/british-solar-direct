'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getQuoteProject } from '../../../../actions';
import { COMPANY } from '../../../../lib/company';
import {
  formatGbpFromPence,
  milestoneSchedulePence,
  type PipelineStatus,
} from '../../../../lib/project-finance';

type ProjectData = {
  id: string;
  customerName: string;
  contactEmail: string;
  contactPhone: string | null;
  deliveryPostcode: string | null;
  productInterest: string | null;
  quantity: string | null;
  status: PipelineStatus;
  agreedTotalPricePence: number | null;
  paymentTermsNotes: string | null;
  invoiceSystemScope: string | null;
  invoiceStage1DepositPence: number | null;
  invoiceStage2HardwarePence: number | null;
  invoiceStage3BalancePence: number | null;
  date: string;
};

export default function ProformaPrintPage() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const result = await getQuoteProject(id);
      if (!result.success || !result.data) {
        setError(result.error ?? 'Unable to load pro-forma data');
        return;
      }
      setProject(result.data as ProjectData);
    }
    if (id) void load();
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const timer = window.setTimeout(() => {
      window.print();
    }, 400);
    return () => window.clearTimeout(timer);
  }, [project]);

  if (error) {
    return (
      <div className="min-h-screen bg-white p-10 font-sans text-slate-900">
        <p className="text-sm text-rose-600">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white p-10 font-sans text-slate-900">
        <p className="text-sm text-slate-500">Preparing pro-forma...</p>
      </div>
    );
  }

  const agreed = project.agreedTotalPricePence ?? 0;
  const schedule = milestoneSchedulePence(agreed, {
    invoiceStage1DepositPence: project.invoiceStage1DepositPence,
    invoiceStage2HardwarePence: project.invoiceStage2HardwarePence,
    invoiceStage3BalancePence: project.invoiceStage3BalancePence,
  });
  const invoiceRef = `PF-${project.id.slice(0, 8).toUpperCase()}`;
  const systemScope =
    project.invoiceSystemScope?.trim() ||
    [project.productInterest, project.quantity].filter(Boolean).join(' · ') ||
    'Turnkey residential solar installation';

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto mb-4 flex max-w-3xl justify-end gap-2 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950"
        >
          Print / Save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Pro-forma invoice
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              {COMPANY.name}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {COMPANY.address}
              <br />
              {COMPANY.phoneDisplay} · {COMPANY.email}
              <br />
              {COMPANY.website}
            </p>
          </div>
          <div className="text-sm text-slate-600 md:text-right">
            <p>
              <span className="font-semibold text-slate-900">Reference:</span> {invoiceRef}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Date:</span>{' '}
              {new Date().toLocaleDateString('en-GB')}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Lead submitted:</span> {project.date}
            </p>
          </div>
        </header>

        <section className="grid gap-6 border-b border-slate-200 py-6 md:grid-cols-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Bill to</h2>
            <p className="mt-2 text-sm font-semibold text-slate-900">{project.customerName}</p>
            <p className="mt-1 text-sm text-slate-600">{project.contactEmail}</p>
            <p className="text-sm text-slate-600">{project.contactPhone ?? '—'}</p>
            <p className="mt-2 text-sm text-slate-600">
              Installation address / postcode:
              <br />
              <span className="font-medium text-slate-900">
                {project.deliveryPostcode ?? 'To be confirmed'}
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Project summary
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Package:{' '}
              <span className="font-medium text-slate-900">
                {project.productInterest ?? 'Turnkey residential solar'}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              System configuration:
              <br />
              <span className="font-medium text-slate-900">{systemScope}</span>
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Agreed turnkey total (0% VAT eligible installation):
            </p>
            <p className="text-2xl font-extrabold text-slate-950">
              {formatGbpFromPence(agreed)}
            </p>
          </div>
        </section>

        <section className="py-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Milestone Payment Terms (0% VAT)
          </h2>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500">
                <th className="py-2 pr-3 font-semibold">Stage</th>
                <th className="py-2 pr-3 font-semibold">Description</th>
                <th className="py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-3 font-semibold">Stage 1</td>
                <td className="py-3 pr-3">Booking deposit</td>
                <td className="py-3 text-right font-semibold">
                  {formatGbpFromPence(schedule.depositPence)}
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-3 font-semibold">Stage 2</td>
                <td className="py-3 pr-3">Hardware delivery allocation</td>
                <td className="py-3 text-right font-semibold">
                  {formatGbpFromPence(schedule.hardwarePence)}
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-3 font-semibold">Stage 3</td>
                <td className="py-3 pr-3">Final handover balance</td>
                <td className="py-3 text-right font-semibold">
                  {formatGbpFromPence(schedule.handoverPence)}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-bold" colSpan={2}>
                  Total
                </td>
                <td className="py-3 text-right text-base font-extrabold">
                  {formatGbpFromPence(
                    schedule.depositPence + schedule.hardwarePence + schedule.handoverPence
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 print:bg-white">
          <h2 className="font-bold text-slate-900">Bank transfer terms</h2>
          <p className="mt-2">
            Please pay by BACS using the milestone amounts above. Quote reference{' '}
            <span className="font-semibold">{invoiceRef}</span> on your payment.
          </p>
          {project.paymentTermsNotes ? (
            <p className="mt-3 whitespace-pre-wrap">{project.paymentTermsNotes}</p>
          ) : (
            <p className="mt-3 text-slate-500">
              Bank account details will be confirmed by {COMPANY.director} with this pro-forma.
            </p>
          )}
          <p className="mt-3 text-xs text-slate-500">
            This is a pro-forma invoice for a residential turnkey solar installation. Final
            certification and handover follow MCS and DNO completion.
          </p>
        </section>
      </article>
    </div>
  );
}
