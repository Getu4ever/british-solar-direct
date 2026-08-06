'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { getQuoteProject, updateQuoteProject } from '../../../actions';
import {
  PIPELINE_STATUSES,
  PIPELINE_STATUS_LABELS,
  computeProjectLedger,
  formatGbpFromPence,
  poundsToPence,
  showsProcurementTracker,
  type PipelineStatus,
} from '../../../lib/project-finance';

type ProjectData = {
  id: string;
  customerName: string;
  contactEmail: string;
  contactPhone: string | null;
  deliveryPostcode: string | null;
  productInterest: string | null;
  quantity: string | null;
  projectNotes: string | null;
  propertyImages: string | null;
  status: PipelineStatus;
  agreedTotalPricePence: number | null;
  paymentTermsNotes: string | null;
  panelsOrdered: boolean;
  batteryInverterSecured: boolean;
  scaffoldingBooked: boolean;
  dnoFiled: boolean;
  panelCostPence: number | null;
  batteryInverterCostPence: number | null;
  scaffoldingCostPence: number | null;
  contractorLaborCostPence: number | null;
  rackingCablesCostPence: number | null;
  otherProjectDirectCostPence: number | null;
  invoiceSystemScope: string | null;
  invoiceStage1DepositPence: number | null;
  invoiceStage2HardwarePence: number | null;
  invoiceStage3BalancePence: number | null;
  date: string;
};

function penceInputValue(pence: number | null | undefined): string {
  if (pence === null || pence === undefined) return '';
  return (pence / 100).toFixed(2);
}

function parsePoundsInput(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return null;
  return poundsToPence(parsed);
}

export default function QuoteProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [agreedTotalInput, setAgreedTotalInput] = useState('');
  const [paymentTermsNotes, setPaymentTermsNotes] = useState('');
  const [invoiceSystemScope, setInvoiceSystemScope] = useState('');
  const [stage1DepositInput, setStage1DepositInput] = useState('');
  const [stage2HardwareInput, setStage2HardwareInput] = useState('');
  const [stage3BalanceInput, setStage3BalanceInput] = useState('');
  const [panelCostInput, setPanelCostInput] = useState('');
  const [batteryCostInput, setBatteryCostInput] = useState('');
  const [scaffoldingCostInput, setScaffoldingCostInput] = useState('');
  const [laborCostInput, setLaborCostInput] = useState('');
  const [rackingCablesCostInput, setRackingCablesCostInput] = useState('');
  const [otherProjectDirectCostInput, setOtherProjectDirectCostInput] = useState('');

  function hydrateForm(data: ProjectData) {
    setAgreedTotalInput(penceInputValue(data.agreedTotalPricePence));
    setPaymentTermsNotes(data.paymentTermsNotes ?? '');
    setInvoiceSystemScope(data.invoiceSystemScope ?? '');
    setStage1DepositInput(penceInputValue(data.invoiceStage1DepositPence));
    setStage2HardwareInput(penceInputValue(data.invoiceStage2HardwarePence));
    setStage3BalanceInput(penceInputValue(data.invoiceStage3BalancePence));
    setPanelCostInput(penceInputValue(data.panelCostPence));
    setBatteryCostInput(penceInputValue(data.batteryInverterCostPence));
    setScaffoldingCostInput(penceInputValue(data.scaffoldingCostPence));
    setLaborCostInput(penceInputValue(data.contractorLaborCostPence));
    setRackingCablesCostInput(penceInputValue(data.rackingCablesCostPence));
    setOtherProjectDirectCostInput(penceInputValue(data.otherProjectDirectCostPence));
  }

  async function loadProject() {
    const result = await getQuoteProject(id);
    if (!result.success || !result.data) {
      setError(result.error ?? 'Unable to load project');
      setLoading(false);
      return;
    }

    const data = result.data as ProjectData;
    setProject(data);
    hydrateForm(data);
    setError(null);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      void loadProject();
    }
  }, [id]);

  const liveLedger = useMemo(
    () =>
      computeProjectLedger({
        agreedTotalPricePence: parsePoundsInput(agreedTotalInput),
        panelCostPence: parsePoundsInput(panelCostInput),
        batteryInverterCostPence: parsePoundsInput(batteryCostInput),
        scaffoldingCostPence: parsePoundsInput(scaffoldingCostInput),
        contractorLaborCostPence: parsePoundsInput(laborCostInput),
        rackingCablesCostPence: parsePoundsInput(rackingCablesCostInput),
        otherProjectDirectCostPence: parsePoundsInput(otherProjectDirectCostInput),
      }),
    [
      agreedTotalInput,
      panelCostInput,
      batteryCostInput,
      scaffoldingCostInput,
      laborCostInput,
      rackingCablesCostInput,
      otherProjectDirectCostInput,
    ]
  );

  async function applyPatch(
    patch: Parameters<typeof updateQuoteProject>[1],
    successMessage: string
  ) {
    setSaving(true);
    setStatusMessage(null);
    const result = await updateQuoteProject(id, patch);
    setSaving(false);

    if (!result.success || !result.data) {
      setError(result.error ?? 'Update failed');
      return;
    }

    const data = result.data as ProjectData;
    setProject(data);
    hydrateForm(data);
    setError(null);
    setStatusMessage(successMessage);
  }

  async function saveCommercialFields() {
    await applyPatch(
      {
        agreedTotalPricePence: parsePoundsInput(agreedTotalInput),
        paymentTermsNotes: paymentTermsNotes.trim() || null,
        invoiceSystemScope: invoiceSystemScope.trim() || null,
        invoiceStage1DepositPence: parsePoundsInput(stage1DepositInput),
        invoiceStage2HardwarePence: parsePoundsInput(stage2HardwareInput),
        invoiceStage3BalancePence: parsePoundsInput(stage3BalanceInput),
        panelCostPence: parsePoundsInput(panelCostInput),
        batteryInverterCostPence: parsePoundsInput(batteryCostInput),
        scaffoldingCostPence: parsePoundsInput(scaffoldingCostInput),
        contractorLaborCostPence: parsePoundsInput(laborCostInput),
        rackingCablesCostPence: parsePoundsInput(rackingCablesCostInput),
        otherProjectDirectCostPence: parsePoundsInput(otherProjectDirectCostInput),
      },
      'Commercial and cost fields saved.'
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 font-sans text-slate-100">
        <p className="text-sm text-slate-400">Loading project cockpit...</p>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 font-sans text-slate-100">
        <div className="mx-auto max-w-3xl rounded-xl border border-rose-800 bg-rose-950/40 p-8 text-center">
          <p className="text-sm text-rose-200">{error}</p>
          <button
            onClick={() => router.push('/admin')}
            className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const showProcurement = showsProcurementTracker(project.status);

  return (
    <div className="min-h-screen bg-slate-900 p-6 font-sans text-slate-100 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/admin" className="text-sm text-slate-400 transition hover:text-amber-400">
              ← Back to dashboard
            </Link>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
              {project.customerName}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Project file · submitted {project.date}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pipeline stage
            </label>
            <select
              value={project.status}
              disabled={saving}
              onChange={(e) =>
                void applyPatch(
                  { status: e.target.value },
                  'Pipeline stage updated.'
                )
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-white outline-none focus:border-amber-500"
            >
              {PIPELINE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {PIPELINE_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-lg border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-200">
            {statusMessage}
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-rose-800 bg-rose-950/40 p-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <section className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950 p-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Homeowner
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium text-slate-200">{project.contactEmail}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Phone</dt>
                <dd className="font-medium text-slate-200">{project.contactPhone ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Installation postcode / address</dt>
                <dd className="font-medium text-slate-200">{project.deliveryPostcode ?? '—'}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Package
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Installation package</dt>
                <dd className="font-medium text-slate-200">{project.productInterest ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Scope</dt>
                <dd className="font-medium text-slate-200">{project.quantity ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Notes</dt>
                <dd className="whitespace-pre-wrap font-medium text-slate-200">
                  {project.projectNotes ?? '—'}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Pro-forma &amp; payment terms</h2>
              <p className="mt-1 text-sm text-slate-400">
                Set the agreed turnkey price, system scope, and milestone schedule, then generate a
                printable PDF.
              </p>
            </div>
            <Link
              href={`/admin/quotes/${project.id}/proforma`}
              target="_blank"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-400"
            >
              Generate Pro-Forma PDF
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Agreed total price (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={agreedTotalInput}
                onChange={(e) => setAgreedTotalInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
                placeholder="e.g. 9750.00"
              />
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="mb-1 block font-semibold text-slate-300">
                System configuration details
              </span>
              <input
                type="text"
                value={invoiceSystemScope}
                onChange={(e) => setInvoiceSystemScope(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
                placeholder="e.g. 18x LONGi EcoLife 480W Panels + 10kWh Battery + SolaX Hybrid Inverter"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Stage 1: Booking Deposit (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={stage1DepositInput}
                onChange={(e) => setStage1DepositInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
                placeholder="e.g. 975.00"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Stage 2: Hardware Delivery Allocation (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={stage2HardwareInput}
                onChange={(e) => setStage2HardwareInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
                placeholder="e.g. 5850.00"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Stage 3: Final Handover Balance (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={stage3BalanceInput}
                onChange={(e) => setStage3BalanceInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
                placeholder="e.g. 2925.00"
              />
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="mb-1 block font-semibold text-slate-300">
                Payment terms notes
              </span>
              <textarea
                rows={3}
                value={paymentTermsNotes}
                onChange={(e) => setPaymentTermsNotes(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
                placeholder="BACS account name, sort code, account number, and any payment instructions"
              />
            </label>
          </div>
        </section>

        {showProcurement && (
          <section className="rounded-xl border border-amber-700/40 bg-slate-950 p-6">
            <h2 className="text-lg font-bold text-white">
              Procurement &amp; Field Logistics Tracker
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Visible once deposit is cleared. Keep Juma synchronised with field dependencies.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {(
                [
                  ['panelsOrdered', 'LONGi EcoLife 480W Panels Ordered (ITS Technologies)'],
                  ['batteryInverterSecured', 'Hybrid Inverter & Home Battery Stock Secured'],
                  ['scaffoldingBooked', 'Local Structural Scaffolding Booked & Timed'],
                  ['dnoFiled', 'DNO Grid Notification Documents Filed Securely'],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200 transition hover:border-amber-600/50"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(project[key])}
                    disabled={saving}
                    onChange={(e) =>
                      void applyPatch({ [key]: e.target.checked }, 'Procurement checklist updated.')
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-bold text-white">Live financial ledger</h2>
          <p className="mt-1 text-sm text-slate-400">
            Internal cost inputs (pence stored server-side). Net metrics update as you type.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">Panel cost (£)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={panelCostInput}
                onChange={(e) => setPanelCostInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Battery &amp; inverter cost (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={batteryCostInput}
                onChange={(e) => setBatteryCostInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">Scaffolding cost (£)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={scaffoldingCostInput}
                onChange={(e) => setScaffoldingCostInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Contractor labour cost (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={laborCostInput}
                onChange={(e) => setLaborCostInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Racking, cables, &amp; isolators cost (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={rackingCablesCostInput}
                onChange={(e) => setRackingCablesCostInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-slate-300">
                Other project direct costs (£)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={otherProjectDirectCostInput}
                onChange={(e) => setOtherProjectDirectCostInput(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </label>
          </div>

          <div className="mt-6 grid gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total project expenses
              </p>
              <p className="mt-1 text-xl font-bold text-white">
                {formatGbpFromPence(liveLedger.totalExpensesPence)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Net project profit
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  liveLedger.netProfitPence >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatGbpFromPence(liveLedger.netProfitPence)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                50/50 equity share
              </p>
              <p className="mt-1 text-xl font-bold text-amber-400">
                {formatGbpFromPence(liveLedger.equitySharePence)}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() => void saveCommercialFields()}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save commercial & cost fields'}
          </button>
        </section>
      </div>
    </div>
  );
}
