'use client'

import React, { useState } from 'react';
import Footer from '../../components/Footer';
import { submitQuoteRequest } from '../actions';

export default function ProjectQuotePage() {
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
        msg: 'Thank you. Our sales team will review your request and email your quote shortly.',
      });
      formElement.reset();
    } else {
      setSubmissionStatus({
        success: false,
        msg: 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <div className="flex-1">
      <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/project-hero.webp"
      alt="Solar Panel Background"
      className="h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/40" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
    Project Quote
    </p>
    <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
    Request pricing for your solar panel order
    </h1>
    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
    Send your company and order details to receive trade pricing, lead times, and a
    pro-forma invoice for your project or wholesale requirement.
    </p>
  </div>
</section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                Quote request form
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Company name
                  </label>
                  <input
                    name="companyName"
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. Karol Digital Ltd"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Contact email
                  </label>
                  <input
                    name="contactEmail"
                    required
                    type="email"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="info@company.co.uk"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Product interest
                  </label>
                  <input
                    name="productInterest"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. Vertex S+ 450W"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Estimated quantity
                  </label>
                  <input
                    name="quantity"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. 2 pallets / 72 panels"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Project notes
                  </label>
                  <textarea
                    name="projectNotes"
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Share delivery location, timeline, product preference, or any commercial requirements."
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-300"
                >
                  {isSubmitting ? 'Submitting quote request...' : 'Request Quote'}
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
                <h2 className="mb-4 text-xl font-bold text-slate-900">What to include</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Product line:</span> Tell us
                    which module you need, or the wattage and specification you are targeting.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Order volume:</span> Share your
                    pallet count, panel count, or estimated project requirement.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Delivery location:</span> Let us
                    know where the goods need to be delivered so we can prepare accurate logistics.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Timeline:</span> Include any
                    required delivery window or project deadline.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Commercial support</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>Trade pricing for installers, resellers, and project buyers.</p>
                  <p>Lead time guidance for stocked and forward-order product lines.</p>
                  <p>Pro-forma invoice support for commercial procurement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
