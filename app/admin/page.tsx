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
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-slate-900 p-4 font-sans text-slate-100 md:p-8">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              British Solar Direct
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Project lifecycle &amp; financial cockpit — respond within 24 business hours
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start text-sm text-slate-400 transition hover:text-white"
          >
            Sign out
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Gross revenue collected
            </p>
            <p className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              {formatGbpFromPence(data.metrics.grossRevenuePence)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Across {data.metrics.completedCount} completed &amp; paid project
              {data.metrics.completedCount === 1 ? '' : 's'}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl sm:p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Capital reinvested
            </p>
            <p className="mt-2 text-xl font-extrabold text-sky-300 sm:text-2xl">
              {formatGbpFromPence(data.metrics.capitalReinvestedPence)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Hardware / field expenses on completed jobs
            </p>
          </div>
          <div className="rounded-xl border border-amber-700/40 bg-slate-950 p-4 shadow-xl sm:col-span-2 sm:p-5 md:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80">
              50/50 equity drawdown pool
            </p>
            <p className="mt-2 text-xl font-extrabold text-amber-400 sm:text-2xl">
              {formatGbpFromPence(data.metrics.equityDrawdownPoolPence)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Net distributable {formatGbpFromPence(data.metrics.distributableProfitPence)} ·
              half available per partner
            </p>
          </div>
        </div>

        <div className="mb-6 flex min-w-0 flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
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
          <div className="mb-6 break-words rounded-lg border border-sky-700 bg-sky-950/40 p-3 text-sm text-sky-200">
            {status}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-slate-400">Loading leads...</p>
        ) : error ? (
          <div className="rounded-xl border border-rose-800 bg-rose-950 p-6 text-center text-sm text-rose-300 sm:p-8">
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
    <div className="min-w-0 w-full">
      {/* Mobile / tablet cards — avoids 8-column horizontal overflow on iPhone */}
      <div className="space-y-3 lg:hidden">
        {leads.map((lead) => {
          const isEditing = editingId === lead.id;
          const images = parsePropertyImages(lead.propertyImages);
          const notesDisplay = cleanProjectNotes(lead.notes);
          const statusLabel =
            PIPELINE_STATUS_LABELS[normalizePipelineStatus(lead.status ?? 'new_lead')];

          return (
            <article
              key={lead.id ?? lead.email ?? Math.random()}
              className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {isEditing ? (
                    <input
                      value={draft.customerName}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, customerName: e.target.value }))
                      }
                      className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    />
                  ) : (
                    <h3 className="truncate text-base font-semibold text-white">
                      {lead.customer ?? '—'}
                    </h3>
                  )}
                  <p className="mt-1 truncate text-xs text-slate-500">{lead.date ?? '—'}</p>
                </div>
                <span className="shrink-0 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                  {statusLabel}
                </span>
              </div>

              {isEditing ? (
                <div className="mt-3 space-y-2">
                  <input
                    value={draft.contactEmail}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, contactEmail: e.target.value }))
                    }
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    placeholder="Email"
                  />
                  <input
                    value={draft.deliveryPostcode}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, deliveryPostcode: e.target.value }))
                    }
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    placeholder="Address / postcode"
                  />
                  <input
                    value={draft.productInterest}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, productInterest: e.target.value }))
                    }
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    placeholder="Installation package"
                  />
                  <input
                    value={draft.quantity}
                    onChange={(e) => setDraft((prev) => ({ ...prev, quantity: e.target.value }))}
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    placeholder="Package scope"
                  />
                  <textarea
                    value={draft.projectNotes}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, projectNotes: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    placeholder="Internal notes"
                  />
                </div>
              ) : (
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Contact
                    </dt>
                    <dd className="break-all text-slate-300">{lead.email ?? '—'}</dd>
                    <dd className="break-words text-slate-500">{lead.phone ?? '—'}</dd>
                    <dd className="break-words text-xs text-slate-500">{lead.postcode ?? '—'}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Package setup
                    </dt>
                    <dd className="break-words text-slate-200">{lead.productInterest ?? '—'}</dd>
                    <dd className="break-words text-xs text-slate-500">{lead.quantity ?? '—'}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Notes
                    </dt>
                    <dd className="line-clamp-4 break-words text-slate-300">
                      {notesDisplay || '—'}
                    </dd>
                    {images.length > 0 && (
                      <span className="mt-1.5 inline-flex items-center rounded-md border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                        📸 Image Attached
                      </span>
                    )}
                  </div>
                </dl>
              )}

              {images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {images.slice(0, 3).map((image, index) => (
                    <a
                      key={`${image.filename}-${index}`}
                      href={image.dataUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block shrink-0"
                    >
                      <img
                        src={image.dataUrl}
                        alt="Property"
                        className="h-14 w-14 rounded-md border border-slate-700 object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}

              {lead.id && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => void onSaveEdit()}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={onCancelEdit}
                        className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/admin/quotes/${lead.id}`}
                        className="rounded-lg bg-sky-700 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Open project
                      </Link>
                      <button
                        onClick={() => onStartEdit(lead)}
                        className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void onDelete(lead.id as string)}
                        className="rounded-lg bg-rose-700 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl lg:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="w-[18%] p-4">Customer</th>
              <th className="w-[12%] p-4">Status</th>
              <th className="w-[18%] p-4">Contact</th>
              <th className="w-[16%] p-4">Package Setup</th>
              <th className="w-[16%] p-4">Notes</th>
              <th className="w-[8%] p-4">Images</th>
              <th className="w-[10%] p-4">Submitted</th>
              <th className="w-[12%] p-4">Actions</th>
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
                  <td className="p-4 text-slate-200">
                    {isEditing ? (
                      <input
                        value={draft.customerName}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, customerName: e.target.value }))
                        }
                        className="w-full max-w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                      />
                    ) : (
                      <span className="block truncate font-medium" title={lead.customer ?? undefined}>
                        {lead.customer ?? '—'}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-300">
                    <span className="inline-flex max-w-full truncate rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-400">
                      {
                        PIPELINE_STATUS_LABELS[
                          normalizePipelineStatus(lead.status ?? 'new_lead')
                        ]
                      }
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    {isEditing ? (
                      <div className="space-y-1.5">
                        <input
                          value={draft.contactEmail}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, contactEmail: e.target.value }))
                          }
                          className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                          placeholder="Email"
                        />
                        <input
                          value={draft.deliveryPostcode}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, deliveryPostcode: e.target.value }))
                          }
                          className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm uppercase"
                          placeholder="Postcode"
                        />
                      </div>
                    ) : (
                      <div className="min-w-0 space-y-0.5">
                        <p className="truncate" title={lead.email ?? undefined}>
                          {lead.email ?? '—'}
                        </p>
                        <p className="truncate text-xs text-slate-500">{lead.phone ?? '—'}</p>
                        <p className="truncate text-xs uppercase text-slate-500">
                          {lead.postcode ?? '—'}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-slate-300">
                    {isEditing ? (
                      <div className="space-y-1.5">
                        <input
                          value={draft.productInterest}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, productInterest: e.target.value }))
                          }
                          className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                          placeholder="Installation package"
                        />
                        <input
                          value={draft.quantity}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, quantity: e.target.value }))
                          }
                          className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
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
                          className="truncate text-xs text-slate-500"
                          title={lead.quantity ?? undefined}
                        >
                          {lead.quantity ?? '—'}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-slate-300">
                    {isEditing ? (
                      <textarea
                        value={draft.projectNotes}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, projectNotes: e.target.value }))
                        }
                        rows={3}
                        className="w-full max-w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
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
                  <td className="p-4 text-slate-300">
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
                              className="h-12 w-12 rounded-md border border-slate-700 object-cover"
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
                  <td className="p-4 text-slate-400">
                    <span className="block truncate text-xs" title={lead.date ?? undefined}>
                      {lead.date ?? '—'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    {lead.id ? (
                      <div className="flex flex-col gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => void onSaveEdit()}
                              className="rounded bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={onCancelEdit}
                              className="rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-white hover:bg-slate-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/admin/quotes/${lead.id}`}
                              className="rounded bg-sky-700 px-2 py-1 text-center text-xs font-semibold text-white hover:bg-sky-600"
                            >
                              Open
                            </Link>
                            <button
                              onClick={() => onStartEdit(lead)}
                              className="rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white hover:bg-amber-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => void onDelete(lead.id as string)}
                              className="rounded bg-rose-700 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600"
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
    <div className="min-w-0 w-full">
      <div className="space-y-3 lg:hidden">
        {leads.map((lead) => {
          const isEditing = editingId === lead.id;
          return (
            <article
              key={lead.id ?? lead.email ?? Math.random()}
              className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-xl"
            >
              <div className="min-w-0">
                {isEditing ? (
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                  />
                ) : (
                  <h3 className="truncate text-base font-semibold text-white">
                    {lead.name ?? '—'}
                  </h3>
                )}
                <p className="mt-1 truncate text-xs text-slate-500">{lead.date ?? '—'}</p>
              </div>

              {isEditing ? (
                <div className="mt-3 space-y-2">
                  <input
                    value={draft.email}
                    onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                    placeholder="Email"
                  />
                  <textarea
                    value={draft.message}
                    onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm"
                  />
                </div>
              ) : (
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Property
                    </dt>
                    <dd className="break-words text-slate-300">{lead.property ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </dt>
                    <dd className="break-words text-slate-300">{lead.email ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Message
                    </dt>
                    <dd className="line-clamp-5 break-words text-slate-300">
                      {lead.message ?? '—'}
                    </dd>
                  </div>
                </dl>
              )}

              {lead.id && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => void onSaveEdit()}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={onCancelEdit}
                        className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onStartEdit(lead)}
                        className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void onDelete(lead.id as string)}
                        className="rounded-lg bg-rose-700 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="hidden min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl lg:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="w-[16%] p-4">Name</th>
              <th className="w-[14%] p-4">Property</th>
              <th className="w-[18%] p-4">Email</th>
              <th className="w-[28%] p-4">Message</th>
              <th className="w-[12%] p-4">Submitted</th>
              <th className="w-[12%] p-4">Actions</th>
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
                  <td className="p-4 text-slate-300">
                    {isEditing ? (
                      <input
                        value={draft.name}
                        onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                      />
                    ) : (
                      <span className="block truncate font-medium" title={lead.name ?? undefined}>
                        {lead.name ?? '—'}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-300">
                    <span className="block truncate" title={lead.property ?? undefined}>
                      {lead.property ?? '—'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    {isEditing ? (
                      <input
                        value={draft.email}
                        onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                      />
                    ) : (
                      <span className="block truncate" title={lead.email ?? undefined}>
                        {lead.email ?? '—'}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-300">
                    {isEditing ? (
                      <textarea
                        value={draft.message}
                        onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className="w-full rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                      />
                    ) : (
                      <p className="line-clamp-3 break-words" title={lead.message ?? undefined}>
                        {lead.message ?? '—'}
                      </p>
                    )}
                  </td>
                  <td className="p-4 text-slate-400">
                    <span className="block truncate text-xs" title={lead.date ?? undefined}>
                      {lead.date ?? '—'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    {lead.id ? (
                      <div className="flex flex-col gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => void onSaveEdit()}
                              className="rounded bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={onCancelEdit}
                              className="rounded bg-slate-700 px-2 py-1 text-xs font-semibold text-white hover:bg-slate-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => onStartEdit(lead)}
                              className="rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white hover:bg-amber-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => void onDelete(lead.id as string)}
                              className="rounded bg-rose-700 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600"
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
    </div>
  );
}
