'use client';

import React, { useState } from 'react';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import { submitTradeApplication } from '../actions';

export default function TradeAccountPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success?: boolean;
    msg?: string;
  }>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({});

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const result = await submitTradeApplication(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmissionStatus({
        success: true,
        msg: 'Thank you. Your trade account application has been submitted for review.',
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
        <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/trade-account-hero.webp"
              alt="Trade Account Background"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Trade Account
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Apply for a British Solar Direct trade account
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                Open a trade account for streamlined quoting, commercial support, and easier access
                to product and order discussions for your business.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                Trade account application
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Company name</label>
                  <input name="companyName" required type="text" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500" placeholder="e.g. Your Company Ltd" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Contact name</label>
                  <input name="contactName" required type="text" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500" placeholder="Full name" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Business email</label>
                  <input name="email" required type="email" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500" placeholder="name@company.co.uk" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Phone number</label>
                  <input name="phone" type="tel" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500" placeholder="+44..." />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Business type</label>
                  <select name="businessType" required className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500">
                    <option value="Installer">Installer</option>
                    <option value="EPC / Project Buyer">EPC / Project Buyer</option>
                    <option value="Wholesaler / Reseller">Wholesaler / Reseller</option>
                    <option value="Developer">Developer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Notes</label>
                  <textarea name="notes" rows={5} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500" placeholder="Tell us about your business, expected order volumes, or product interests." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-300">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>

              {submissionStatus.msg && (
                <div className={`mt-6 rounded-lg border p-4 text-sm font-medium ${submissionStatus.success ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                  {submissionStatus.msg}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Why open a trade account?</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <p>Dedicated support for trade and commercial enquiries.</p>
                  <p>Simpler quote requests for repeat purchasing requirements.</p>
                  <p>Faster commercial discussions around product availability and project needs.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Who this is for</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>Solar installers and electrical contractors.</p>
                  <p>Commercial buyers and EPC procurement teams.</p>
                  <p>Wholesalers, resellers, and repeat trade customers.</p>
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
