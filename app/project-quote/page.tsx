'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
import { submitQuoteRequest } from '../actions';
import { products } from '../lib/products';
import { COMPANY } from '../lib/company';

export default function ProjectQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
          Loading quote form...
        </div>
      }
    >
      <ProjectQuoteInner />
    </Suspense>
  );
}

function ProjectQuoteInner() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get('product') ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success?: boolean;
    msg?: string;
  }>({});

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({});

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const result = await submitQuoteRequest(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmissionStatus({
        success: true,
        msg: `Thank you. ${COMPANY.director} will review your request and email your quote ${COMPANY.responseTime}.`,
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
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/project-hero.webp"
              alt="Solar panel project quote background"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Free Quote
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Request pricing for your solar panel order
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                Tell us what you need and {COMPANY.director} will confirm stock, guide pricing,
                delivery timing, and installation options — typically {COMPANY.responseTime}.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
                Quote request form
              </h2>
              <p className="mb-6 text-sm text-slate-500">
                Fields marked with * are required. Most homeowners receive a response the same day.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Your name or company *
                  </label>
                  <input
                    name="companyName"
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. Ahmed Khan / ABC Electrical Ltd"
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
                      Phone number
                    </label>
                    <input
                      name="contactPhone"
                      type="tel"
                      className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                      placeholder="07xxx xxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Delivery postcode *
                  </label>
                  <input
                    name="deliveryPostcode"
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm uppercase text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. NG17 8EY"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Product interest
                  </label>
                  <select
                    name="productInterest"
                    defaultValue={
                      products.find((p) => p.slug === preselectedProduct)?.name ?? ''
                    }
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

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Estimated quantity *
                  </label>
                  <input
                    name="quantity"
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. 12 panels / 1 pallet / full roof"
                  />
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-900">
                    Do you need professional installation?
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="radio" name="needsInstallation" value="yes" className="accent-amber-500" />
                      Yes — arrange installation with Juma
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="radio" name="needsInstallation" value="no" defaultChecked className="accent-amber-500" />
                      No — supply and delivery only
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Project notes
                  </label>
                  <textarea
                    name="projectNotes"
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Roof type, timeline, access notes, or any other requirements."
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-300"
                >
                  {isSubmitting ? 'Submitting quote request...' : 'Request Free Quote'}
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
                    <span className="font-semibold text-slate-900">1. Review:</span> We check stock,
                    delivery postcode, and installation requirements.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">2. Pro-forma:</span> You receive
                    confirmed pricing and payment details by email.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">3. Delivery:</span> Juma coordinates
                    pallet delivery and installation scheduling.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Prefer to speak directly?</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>
                    Call {COMPANY.director} on{' '}
                    <a href={`tel:${COMPANY.phone}`} className="font-semibold text-amber-400 hover:text-amber-300">
                      {COMPANY.phoneDisplay}
                    </a>
                  </p>
                  <p>Or browse the catalogue first:</p>
                  <Link href="/products" className="inline-block font-semibold text-amber-400 hover:text-amber-300">
                    View 6 core Tier-1 modules →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowOrderingWorks showCta={false} />
      </div>

      <Footer />
    </div>
  );
}
