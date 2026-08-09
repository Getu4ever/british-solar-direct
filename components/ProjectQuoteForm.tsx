'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import UkAddressLookup from './UkAddressLookup';
import { submitQuoteRequest } from '../app/actions';
import { products } from '../app/lib/products';
import { COMPANY } from '../app/lib/company';
import { trackGenerateLead } from '../app/lib/gtag';

type StoredEstimate = {
  product?: string;
  tier?: string;
  profile?: string;
  monthlyBill?: string;
};

export default function ProjectQuoteForm() {
  const searchParams = useSearchParams();
  const [storedEstimate, setStoredEstimate] = useState<StoredEstimate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success?: boolean;
    msg?: string;
  }>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('bsdQuoteEstimate');
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredEstimate;
      sessionStorage.removeItem('bsdQuoteEstimate');
      setStoredEstimate(parsed);
    } catch {
      // Ignore invalid stored estimates.
    }
  }, []);

  const preselectedProduct = searchParams.get('product') || storedEstimate?.product || '';
  const preselectedTier = searchParams.get('tier') || storedEstimate?.tier || '';
  const preselectedProfile = searchParams.get('profile') || storedEstimate?.profile || '';
  const preselectedMonthlyBill =
    searchParams.get('monthlyBill') || storedEstimate?.monthlyBill || '';

  const preselectedPackage = products.find((p) => p.slug === preselectedProduct);
  const defaultQuantity = preselectedPackage ? '1 full turnkey installation package' : '';
  const defaultProjectNotes = [
    preselectedProfile ? `Property profile: ${preselectedProfile}` : '',
    preselectedMonthlyBill ? `Current monthly electricity bill: £${preselectedMonthlyBill}` : '',
    preselectedTier ? `Estimator tier: ${preselectedTier}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({});

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const result = await submitQuoteRequest(formData);

    setIsSubmitting(false);

    if (result.success) {
      trackGenerateLead('project_quote');
      setSubmissionStatus({
        success: true,
        msg: `Thank you. ${COMPANY.director} will review your request and contact you ${COMPANY.responseTime}.`,
      });
      formElement.reset();
    } else {
      setSubmissionStatus({
        success: false,
        msg: result.error ?? 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
            Trust &amp; Compliance
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-slate-900">MCS Certified Work</p>
              <p className="text-sm leading-6 text-slate-600">
                All physical installations are signed off by fully vetted, MCS-registered engineers,
                enabling your Smart Export Guarantee (SEG) payments.
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-slate-900">Part P &amp; DNO Approved</p>
              <p className="text-sm leading-6 text-slate-600">
                Full electrical self-certification and official Distribution Network Operator grid
                notifications handled entirely by our team.
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-slate-900">£5M Public Liability</p>
              <p className="text-sm leading-6 text-slate-600">
                Comprehensive insurance coverage on every project, backed by over 20 years of premier
                local construction experience.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">Quote request form</h2>
        <p className="mb-6 text-sm text-slate-500">
          Fields marked with * are required. Your quote includes the full turnkey scope, including
          scaffolding, labor, DNO paperwork, and certification handover.
        </p>

        {preselectedPackage && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Estimator or package preselected</p>
            <p className="mt-2">
              We will build your quote around{' '}
              <span className="font-semibold">{preselectedPackage.name}</span>
              {preselectedProfile ? ` for a ${preselectedProfile.toLowerCase()}` : ''}
              {preselectedMonthlyBill
                ? ` with a current monthly bill of £${preselectedMonthlyBill}`
                : ''}
              .
            </p>
          </div>
        )}

        <form
          key={`${preselectedProduct}-${preselectedTier}-${preselectedMonthlyBill}`}
          onSubmit={handleFormSubmit}
          className="space-y-5"
        >
          <input type="hidden" name="type" value="quote_request" />
          <input
            type="hidden"
            name="quantity"
            value={defaultQuantity || '1 full turnkey installation package'}
          />

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900">Your name *</label>
            <input
              name="customerName"
              required
              type="text"
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
              placeholder="e.g. John Smith"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">
                Contact email *
              </label>
              <input
                name="contactEmail"
                required
                type="email"
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                placeholder="you@email.co.uk"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">
                Phone number *
              </label>
              <input
                name="contactPhone"
                required
                type="tel"
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                placeholder="07xxx xxxxxx"
              />
            </div>
          </div>

          <UkAddressLookup
            name="deliveryPostcode"
            label="Installation location"
            required
            variant="light"
          />

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900">
              Installation package
            </label>
            <select
              name="productInterest"
              defaultValue={products.find((p) => p.slug === preselectedProduct)?.name ?? ''}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
            >
              <option value="">Not sure yet — advise me</option>
              {products.map((product) => (
                <option key={product.slug} value={product.name}>
                  {product.name} ({product.brand})
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Do you need professional installation?
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="needsInstallation"
                  value="yes"
                  defaultChecked
                  className="accent-amber-500"
                />
                Yes — arrange installation with Juma
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="needsInstallation" value="no" className="accent-amber-500" />
                No — supply and delivery only
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-900">Project notes</label>
            <textarea
              name="projectNotes"
              rows={5}
              defaultValue={defaultProjectNotes}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
              placeholder="Roof type, timeline, access notes, or any other requirements."
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Upload property images (optional)
            </label>
            <input
              name="propertyImages"
              type="file"
              accept="image/*"
              multiple
              className="block w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
            />
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Add up to 4 images (max 2MB each), such as roof angles, meter location, consumer unit,
              or access route.
            </p>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-300"
          >
            {isSubmitting ? 'Submitting quote request...' : 'Request Your Fixed Quote'}
          </button>
        </form>

        {submissionStatus.msg && (
          <div
            className={`mt-6 rounded-lg border p-4 text-sm font-medium ${
              submissionStatus.success
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-rose-200 bg-rose-50 text-rose-700'
            }`}
          >
            {submissionStatus.msg}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">What happens next</h2>
          <div className="space-y-3 text-sm leading-6 text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">1. Review:</span> We assess your home
              profile, roof layout, access notes, and installation scope.
            </p>
            <p>
              <span className="font-semibold text-slate-900">2. Pro-forma:</span> You receive guide
              pricing, system scope, and next-step confirmation by email.
            </p>
            <p>
              <span className="font-semibold text-slate-900">3. Installation Plan:</span> Juma
              coordinates delivery timing, scaffolding, and installation scheduling.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Prefer to speak directly?</h2>
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <p>
              Call {COMPANY.director} on{' '}
              <a
                href={`tel:${COMPANY.phone}`}
                className="font-semibold text-amber-400 hover:text-amber-300"
              >
                {COMPANY.phoneDisplay}
              </a>
            </p>
            <p>Or compare the three installation packages first:</p>
            <Link
              href="/products"
              className="inline-block font-semibold text-amber-400 hover:text-amber-300"
            >
              View installation packages →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
