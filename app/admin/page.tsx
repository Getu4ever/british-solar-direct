'use client';

import React, { useEffect, useState } from 'react';
import {
  getAdminDashboard,
  adminLogout,
  updateQuoteRequest,
  deleteQuoteRequest,
  updateContactEnquiry,
  deleteContactEnquiry,
} from '../actions';
import { useRouter } from 'next/navigation';

type Tab = 'quotes' | 'contacts';
type QuoteLead = {
  id?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  postcode?: string | null;
  quantity?: string | null;
  productInterest?: string | null;
  notes?: string | null;
  propertyImages?: string | null;
  date?: string | null;
};
type ContactLead = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  message?: string | null;
  date?: string | null;
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

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('quotes');
  const [data, setData] = useState<{
    quotes: QuoteLead[];
    contacts: ContactLead[];
  }>({ quotes: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [quoteDraft, setQuoteDraft] = useState<{
    companyName: string;
    contactEmail: string;
    deliveryPostcode: string;
    quantity: string;
    productInterest: string;
    projectNotes: string;
  }>({
    companyName: '',
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
      setData(response.data);
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
      companyName: lead.company ?? '',
      contactEmail: lead.email ?? '',
      deliveryPostcode: lead.postcode ?? '',
      quantity: lead.quantity ?? '',
      productInterest: lead.productInterest ?? '',
      projectNotes: lead.notes ?? '',
    });
  }

  async function saveQuoteEdit() {
    if (!editingQuoteId) return;
    const result = await updateQuoteRequest({
      id: editingQuoteId,
      companyName: quoteDraft.companyName,
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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">British Solar Direct</h1>
            <p className="text-slate-400 text-sm mt-1">Lead management — respond within 24 business hours</p>
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
    companyName: string;
    contactEmail: string;
    deliveryPostcode: string;
    quantity: string;
    productInterest: string;
    projectNotes: string;
  };
  setDraft: React.Dispatch<React.SetStateAction<{
    companyName: string;
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
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4">Name / company</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Postcode</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Product</th>
            <th className="p-4">Notes</th>
            <th className="p-4">Images</th>
            <th className="p-4">Submitted</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {leads.map((lead) => {
            const isEditing = editingId === lead.id;
            const images = parsePropertyImages(lead.propertyImages);
            return (
              <tr key={lead.id ?? lead.email ?? Math.random()} className="hover:bg-slate-900/50 transition align-top">
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.companyName}
                      onChange={(e) => setDraft((prev) => ({ ...prev, companyName: e.target.value }))}
                      className="w-56 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.company ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.contactEmail}
                      onChange={(e) => setDraft((prev) => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-56 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.email ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">{lead.phone ?? '—'}</td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.deliveryPostcode}
                      onChange={(e) => setDraft((prev) => ({ ...prev, deliveryPostcode: e.target.value }))}
                      className="w-36 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm uppercase"
                    />
                  ) : (
                    lead.postcode ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.quantity}
                      onChange={(e) => setDraft((prev) => ({ ...prev, quantity: e.target.value }))}
                      className="w-44 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.quantity ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.productInterest}
                      onChange={(e) => setDraft((prev) => ({ ...prev, productInterest: e.target.value }))}
                      className="w-56 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.productInterest ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <textarea
                      value={draft.projectNotes}
                      onChange={(e) => setDraft((prev) => ({ ...prev, projectNotes: e.target.value }))}
                      rows={3}
                      className="w-64 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                      placeholder="Internal notes"
                    />
                  ) : (
                    <span className="whitespace-pre-wrap">{lead.notes ?? '—'}</span>
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {images.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {images.map((image, index) => (
                        <a
                          key={`${image.filename}-${index}`}
                          href={image.dataUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                          title={image.filename}
                        >
                          <img
                            src={image.dataUrl}
                            alt={image.filename}
                            className="h-14 w-14 rounded-md border border-slate-700 object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">{lead.date ?? '—'}</td>
                <td className="p-4 text-slate-300">
                  {lead.id ? (
                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => void onSaveEdit()}
                            className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                          >
                            Save
                          </button>
                          <button
                            onClick={onCancelEdit}
                            className="rounded bg-slate-700 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onStartEdit(lead)}
                            className="rounded bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => void onDelete(lead.id as string)}
                            className="rounded bg-rose-700 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-600"
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
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Message</th>
            <th className="p-4">Submitted</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {leads.map((lead) => {
            const isEditing = editingId === lead.id;
            return (
              <tr key={lead.id ?? lead.email ?? Math.random()} className="hover:bg-slate-900/50 transition align-top">
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.name}
                      onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-44 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.name ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <input
                      value={draft.email}
                      onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-56 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.email ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">
                  {isEditing ? (
                    <textarea
                      value={draft.message}
                      onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-80 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-sm"
                    />
                  ) : (
                    lead.message?.slice(0, 160) ?? '—'
                  )}
                </td>
                <td className="p-4 text-slate-300">{lead.date ?? '—'}</td>
                <td className="p-4 text-slate-300">
                  {lead.id ? (
                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => void onSaveEdit()}
                            className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
                          >
                            Save
                          </button>
                          <button
                            onClick={onCancelEdit}
                            className="rounded bg-slate-700 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onStartEdit(lead)}
                            className="rounded bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => void onDelete(lead.id as string)}
                            className="rounded bg-rose-700 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-600"
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
