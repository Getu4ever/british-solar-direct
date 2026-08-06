'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getAdminDashboard,
  adminLogout,
  updateQuoteRequest,
  deleteQuoteRequest,
  updateContactEnquiry,
  deleteContactEnquiry,
} from '../actions';
import { useRouter } from 'next/navigation';
import {
  PIPELINE_STATUS_LABELS,
  formatGbpFromPence,
  normalizePipelineStatus,
  type PipelineStatus,
} from '../lib/project-finance';

type Tab = 'quotes' | 'contacts';
type QuoteLead = {
  id?: string | null;
  customer?: string | null;
  email?: string | null;
  phone?: string | null;
  postcode?: string | null;
  quantity?: string | null;
  productInterest?: string | null;
  notes?: string | null;
  propertyImages?: string | null;
  status?: PipelineStatus | string | null;
  date?: string | null;
};
type ContactLead = {
  id?: string | null;
  name?: string | null;
  property?: string | null;
  email?: string | null;
  message?: string | null;
  date?: string | null;
};
type DashboardMetrics = {
  completedCount: number;
  grossRevenuePence: number;
  capitalReinvestedPence: number;
  distributableProfitPence: number;
  equityDrawdownPoolPence: number;
};
type StoredPropertyImage = {
  filename: string;
  type: string;
  dataUrl: string;
};

function parsePropertyImages(value: string | null | undefined): StoredPropertyImage[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item): item is StoredPropertyImage =>
          typeof item?.filename === 'string' &&
          typeof item?.type === 'string' &&
          typeof item?.dataUrl === 'string' &&
          item.dataUrl.startsWith('data:image/')
      )
      .slice(0, 4);
  } catch {
    return [];
  }
}

/** Strip auto-appended "Property images attached: …" lines from notes for clean display. */
function cleanProjectNotes(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .split('\n')
    .filter((line) => !/^\s*Property images attached:/i.test(line.trim()))
    .join('\n')
    .trim();
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('quotes');
  const [data, setData] = useState<{
    quotes: QuoteLead[];
    contacts: ContactLead[];
    metrics: DashboardMetrics;
  }>({
    quotes: [],
    contacts: [],
    metrics: {
      completedCount: 0,
      grossRevenuePence: 0,
      capitalReinvestedPence: 0,
      distributableProfitPence: 0,
      equityDrawdownPoolPence: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [quoteDraft, setQuoteDraft] = useState<{
    customerName: string;
    contactEmail: string;
    deliveryPostcode: string;
    quantity: string;
    productInterest: string;
    projectNotes: string;
  }>({
    customerName: '',
    contactEmail: '',
    deliveryPostcode: '',
    quantity: '',
    productInterest: '',
    projectNotes: '',
  });
  const [contactDraft, setContactDraft] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: '',
  });
  const router = useRouter();

  async function loadDashboardData() {
    const response = await getAdminDashboard();
    if (response.success && response.data) {
      setData({
        quotes: response.data.quotes,
        contacts: response.data.contacts,
        metrics: response.data.metrics ?? {
          completedCount: 0,
          grossRevenuePence: 0,
          capitalReinvestedPence: 0,
          distributableProfitPence: 0,
          equityDrawdownPoolPence: 0,
        },
      });
      setError(null);
      if ('warning' in response && response.warning) {
        setStatus(response.warning);
      }
    } else {
      setError(response.error ?? 'Unable to load dashboard');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function refreshDashboard() {
    setLoading(true);
    await loadDashboardData();
  }

  function startQuoteEdit(lead: QuoteLead) {
    if (!lead.id) return;
    setEditingQuoteId(lead.id);
    setEditingContactId(null);
    setQuoteDraft({
      customerName: lead.customer ?? '',
      contactEmail: lead.email ?? '',
      deliveryPostcode: lead.postcode ?? '',
      quantity: lead.quantity ?? '',
      productInterest: lead.productInterest ?? '',
      projectNotes: cleanProjectNotes(lead.notes),
    });
  }

  async function saveQuoteEdit() {
    if (!editingQuoteId) return;
    const result = await updateQuoteRequest({
      id: editingQuoteId,
      customerName: quoteDraft.customerName,
      contactEmail: quoteDraft.contactEmail,
      deliveryPostcode: quoteDraft.deliveryPostcode,
      quantity: quoteDraft.quantity,
      productInterest: quoteDraft.productInterest,
      projectNotes: quoteDraft.projectNotes,
    });

    if (!result.success) {
      setStatus(result.error ?? 'Failed to save quote request.');
      return;
    }

    setEditingQuoteId(null);
    setStatus('Quote request updated.');
    await refreshDashboard();
  }

  async function removeQuote(id: string) {
    const confirmed = window.confirm('Delete this quote request? This action cannot be undone.');
    if (!confirmed) return;

    const result = await deleteQuoteRequest(id);
    if (!result.success) {
      setStatus(result.error ?? 'Failed to delete quote request.');
      return;
    }

    setStatus('Quote request deleted.');
    await refreshDashboard();
  }

  function startContactEdit(lead: ContactLead) {
    if (!lead.id) return;
    setEditingContactId(lead.id);
    setEditingQuoteId(null);
    setContactDraft({
      name: lead.name ?? '',
      email: lead.email ?? '',
      message: lead.message ?? '',
    });
  }

  async function saveContactEdit() {
    if (!editingContactId) return;
    const result = await updateContactEnquiry({
      id: editingContactId,
      name: contactDraft.name,
      email: contactDraft.email,
      message: contactDraft.message,
    });

    if (!result.success) {
      setStatus(result.error ?? 'Failed to save contact enquiry.');
      return;
    }

    setEditingContactId(null);
    setStatus('Contact enquiry updated.');
    await refreshDashboard();
  }

  async function removeContact(id: string) {
    const confirmed = window.confirm('Delete this contact enquiry? This action cannot be undone.');
    if (!confirmed) return;

    const result = await deleteContactEnquiry(id);
    if (!result.success) {
      setStatus(result.error ?? 'Failed to delete contact enquiry.');
      return;
    }

    setStatus('Contact enquiry deleted.');
    await refreshDashboard();
  }

  async function handleLogout() {
    await adminLogout();
    router.push('/admin/login');
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'quotes', label: 'Quote requests', count: data.quotes.length },
    { id: 'contacts', label: 'Contact enquiries', count: data.contacts.length },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-4 font-sans text-slate-100 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">British Solar Direct</h1>
            <p className="text-slate-400 text-sm mt-1">
              Project lifecycle &amp; financial cockpit — respond within 24 business hours
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition self-start"
          >
            Sign out
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Gross revenue collected
            </p>
            <p className="mt-2 text-2xl font-extrabold text-white">
              {formatGbpFromPence(data.metrics.grossRevenuePence)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Across {data.metrics.completedCount} completed &amp; paid project
              {data.metrics.completedCount === 1 ? '' : 's'}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Capital reinvested
            </p>
            <p className="mt-2 text-2xl font-extrabold text-sky-300">
              {formatGbpFromPence(data.metrics.capitalReinvestedPence)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Hardware / field expenses on completed jobs
            </p>
          </div>
          <div className="rounded-xl border border-amber-700/40 bg-slate-950 p-5 shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-500/80">
              50/50 equity drawdown pool
            </p>
            <p className="mt-2 text-2xl font-extrabold text-amber-400">
              {formatGbpFromPence(data.metrics.equityDrawdownPoolPence)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Net distributable {formatGbpFromPence(data.metrics.distributableProfitPence)} ·
              half available per partner
            </p>
          </div>
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

        {status && (
          <div className="mb-6 rounded-lg border border-sky-700 bg-sky-950/40 p-3 text-sm text-sky-200">
            {status}
          </div>
        )}

        {loading ? (
          <p className="text-slate-400 text-sm">Loading leads...</p>
        ) : error ? (
          <div className="bg-rose-950 border border-rose-800 rounded-xl p-8 text-center text-rose-300 text-sm">
            {error}
          </div>
        ) : tab === 'quotes' ? (
          <QuoteTable
            leads={data.quotes}
            editingId={editingQuoteId}
            draft={quoteDraft}
            setDraft={setQuoteDraft}
            onStartEdit={startQuoteEdit}
            onCancelEdit={() => setEditingQuoteId(null)}
            onSaveEdit={saveQuoteEdit}
            onDelete={removeQuote}
          />
        ) : (
          <ContactTable
            leads={data.contacts}
            editingId={editingContactId}
            draft={contactDraft}
            setDraft={setContactDraft}
            onStartEdit={startContactEdit}
            onCancelEdit={() => setEditingContactId(null)}
            onSaveEdit={saveContactEdit}
            onDelete={removeContact}
          />
        )}
      </div>
    </div>
  );
}

function QuoteTable({
  leads,
  editingId,
  draft,
  setDraft,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: {
  leads: QuoteLead[];
  editingId: string | null;
  draft: {
    customerName: string;
    contactEmail: string;
    deliveryPostcode: string;
    quantity: string;
    productInterest: string;
    projectNotes: string;
  };
  setDraft: React.Dispatch<React.SetStateAction<{
    customerName: string;
    contactEmail: string;
    deliveryPostcode: string;
    quantity: string;
    productInterest: string;
    projectNotes: string;
  }>>;
  onStartEdit: (lead: QuoteLead) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  if (leads.length === 0) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
        No quote requests yet.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl">
      <table className="w-full table-fixed text-left text-xs md:text-sm">
        <thead className="border-b border-slate-800 bg-slate-900 text-[10px] uppercase tracking-wider text-slate-400 md:text-xs">
          <tr>
            <th className="w-[18%] p-3 md:p-4">Customer</th>
            <th className="w-[12%] p-3 md:p-4">Status</th>
            <th className="w-[18%] p-3 md:p-4">Contact</th>
            <th className="w-[16%] p-3 md:p-4">Package Setup</th>
            <th className="w-[16%] p-3 md:p-4">Notes</th>
            <th className="w-[8%] p-3 md:p-4">Images</th>
            <th className="w-[10%] p-3 md:p-4">Submitted</th>
            <th className="w-[12%] p-3 md:p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {leads.map((lead) => {
            const isEditing = editingId === lead.id;
            const images = parsePropertyImages(lead.propertyImages);
            const notesDisplay = cleanProjectNotes(lead.notes);
            return (
              <tr
                key={lead.id ?? lead.email ?? Math.random()}
                className="align-top transition hover:bg-slate-900/50"
              >
                <td className="p-3 text-slate-200 md:p-4">
                  {isEditing ? (
                    <input
                      value={draft.customerName}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, customerName: e.target.value }))
                      }
                      className="w-full max-w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                    />
                  ) : (
                    <span className="block truncate font-medium" title={lead.customer ?? undefined}>
                      {lead.customer ?? '—'}
                    </span>
                  )}
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  <span className="inline-flex max-w-full truncate rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-400 md:px-2.5 md:text-[11px]">
                    {
                      PIPELINE_STATUS_LABELS[
                        normalizePipelineStatus(lead.status ?? 'new_lead')
                      ]
                    }
                  </span>
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {isEditing ? (
                    <div className="space-y-1.5">
                      <input
                        value={draft.contactEmail}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, contactEmail: e.target.value }))
                        }
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                        placeholder="Email"
                      />
                      <input
                        value={draft.deliveryPostcode}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, deliveryPostcode: e.target.value }))
                        }
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs uppercase md:text-sm"
                        placeholder="Postcode"
                      />
                    </div>
                  ) : (
                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate" title={lead.email ?? undefined}>
                        {lead.email ?? '—'}
                      </p>
                      <p className="truncate text-[11px] text-slate-500 md:text-xs">
                        {lead.phone ?? '—'}
                      </p>
                      <p className="truncate text-[11px] uppercase text-slate-500 md:text-xs">
                        {lead.postcode ?? '—'}
                      </p>
                    </div>
                  )}
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {isEditing ? (
                    <div className="space-y-1.5">
                      <input
                        value={draft.productInterest}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, productInterest: e.target.value }))
                        }
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                        placeholder="Installation package"
                      />
                      <input
                        value={draft.quantity}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, quantity: e.target.value }))
                        }
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                        placeholder="Package scope"
                      />
                    </div>
                  ) : (
                    <div className="min-w-0 space-y-0.5">
                      <p
                        className="truncate font-medium text-slate-200"
                        title={lead.productInterest ?? undefined}
                      >
                        {lead.productInterest ?? '—'}
                      </p>
                      <p
                        className="truncate text-[11px] text-slate-500 md:text-xs"
                        title={lead.quantity ?? undefined}
                      >
                        {lead.quantity ?? '—'}
                      </p>
                    </div>
                  )}
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {isEditing ? (
                    <textarea
                      value={draft.projectNotes}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, projectNotes: e.target.value }))
                      }
                      rows={3}
                      className="w-full max-w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                      placeholder="Internal notes"
                    />
                  ) : (
                    <div className="min-w-0">
                      <p
                        className="line-clamp-3 break-words text-slate-300"
                        title={notesDisplay || undefined}
                      >
                        {notesDisplay || '—'}
                      </p>
                      {images.length > 0 && (
                        <span className="mt-1.5 inline-flex items-center rounded-md border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                          📸 Image Attached
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {images.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {images.slice(0, 2).map((image, index) => (
                        <a
                          key={`${image.filename}-${index}`}
                          href={image.dataUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block shrink-0"
                          title={image.filename}
                        >
                          <img
                            src={image.dataUrl}
                            alt="Property"
                            className="h-10 w-10 rounded-md border border-slate-700 object-cover md:h-12 md:w-12"
                          />
                        </a>
                      ))}
                      {images.length > 2 && (
                        <span className="self-center text-[10px] text-slate-500">
                          +{images.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
                <td className="p-3 text-slate-400 md:p-4">
                  <span className="block truncate text-[11px] md:text-xs" title={lead.date ?? undefined}>
                    {lead.date ?? '—'}
                  </span>
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {lead.id ? (
                    <div className="flex flex-col gap-1.5">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => void onSaveEdit()}
                            className="rounded bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-emerald-500 md:text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={onCancelEdit}
                            className="rounded bg-slate-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-slate-600 md:text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/admin/quotes/${lead.id}`}
                            className="rounded bg-sky-700 px-2 py-1 text-center text-[11px] font-semibold text-white hover:bg-sky-600 md:text-xs"
                          >
                            Open
                          </Link>
                          <button
                            onClick={() => onStartEdit(lead)}
                            className="rounded bg-amber-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-amber-500 md:text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => void onDelete(lead.id as string)}
                            className="rounded bg-rose-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-rose-600 md:text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ContactTable({
  leads,
  editingId,
  draft,
  setDraft,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: {
  leads: ContactLead[];
  editingId: string | null;
  draft: { name: string; email: string; message: string };
  setDraft: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  onStartEdit: (lead: ContactLead) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  if (leads.length === 0) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
        No contact enquiries yet.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl">
      <table className="w-full table-fixed text-left text-xs md:text-sm">
        <thead className="border-b border-slate-800 bg-slate-900 text-[10px] uppercase tracking-wider text-slate-400 md:text-xs">
          <tr>
            <th className="w-[16%] p-3 md:p-4">Name</th>
            <th className="w-[14%] p-3 md:p-4">Property</th>
            <th className="w-[18%] p-3 md:p-4">Email</th>
            <th className="w-[28%] p-3 md:p-4">Message</th>
            <th className="w-[12%] p-3 md:p-4">Submitted</th>
            <th className="w-[12%] p-3 md:p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {leads.map((lead) => {
            const isEditing = editingId === lead.id;
            return (
              <tr
                key={lead.id ?? lead.email ?? Math.random()}
                className="align-top transition hover:bg-slate-900/50"
              >
                <td className="p-3 text-slate-300 md:p-4">
                  {isEditing ? (
                    <input
                      value={draft.name}
                      onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                    />
                  ) : (
                    <span className="block truncate font-medium" title={lead.name ?? undefined}>
                      {lead.name ?? '—'}
                    </span>
                  )}
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  <span className="block truncate" title={lead.property ?? undefined}>
                    {lead.property ?? '—'}
                  </span>
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {isEditing ? (
                    <input
                      value={draft.email}
                      onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                    />
                  ) : (
                    <span className="block truncate" title={lead.email ?? undefined}>
                      {lead.email ?? '—'}
                    </span>
                  )}
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {isEditing ? (
                    <textarea
                      value={draft.message}
                      onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs md:text-sm"
                    />
                  ) : (
                    <p className="line-clamp-3 break-words" title={lead.message ?? undefined}>
                      {lead.message ?? '—'}
                    </p>
                  )}
                </td>
                <td className="p-3 text-slate-400 md:p-4">
                  <span className="block truncate text-[11px] md:text-xs" title={lead.date ?? undefined}>
                    {lead.date ?? '—'}
                  </span>
                </td>
                <td className="p-3 text-slate-300 md:p-4">
                  {lead.id ? (
                    <div className="flex flex-col gap-1.5">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => void onSaveEdit()}
                            className="rounded bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-emerald-500 md:text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={onCancelEdit}
                            className="rounded bg-slate-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-slate-600 md:text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onStartEdit(lead)}
                            className="rounded bg-amber-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-amber-500 md:text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => void onDelete(lead.id as string)}
                            className="rounded bg-rose-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-rose-600 md:text-xs"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
