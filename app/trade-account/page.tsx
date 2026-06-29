'use client'

import React, { useState } from 'react';
import Footer from '../../components/Footer';

export default function TradeAccountPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <main className="flex-1">
      <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/trade-account-hero.webp"
      alt="Trade Account Background"
      className="h-full w-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/30" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
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
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Company name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="e.g. Your Company Ltd"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Contact name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Business email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="name@company.co.uk"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="+44..."
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Business type
                  </label>
                  <select className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500">
                    <option>Installer</option>
                    <option>EPC / Project Buyer</option>
                    <option>Wholesaler / Reseller</option>
                    <option>Developer</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Notes
                  </label>
                  <textarea
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Tell us about your business, expected order volumes, or product interests."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600"
                >
                  Submit Application
                </button>
              </form>

              {submitted && (
                <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Thank you. Your trade account application has been submitted for review.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">
                  Why open a trade account?
                </h2>
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
      </main>

      <Footer />
    </div>
  );
}
