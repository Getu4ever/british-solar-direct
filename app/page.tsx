'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitQuoteRequest } from './actions';
import Footer from '../components/Footer';
import Calculator from '../components/Calculator';
import HeroSlideIn from '../components/HeroSlideIn';
import HowOrderingWorks from '../components/HowOrderingWorks';
import { products } from './lib/products';
import { COMPANY } from './lib/company';
import { Home, Wrench, Building2 } from 'lucide-react';

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ success?: boolean; msg?: string }>({});

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
        msg: `Thank you. ${COMPANY.director} will email your quote and pro-forma ${COMPANY.responseTime}.`,
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
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            Tier-1 solar panels for Nottingham homeowners &amp; trade buyers — delivery &amp; install
            by {COMPANY.director}
          </div>
          <div className="flex gap-4 text-slate-400">
            <span>6 core modules</span>
            <span>Free quotes</span>
            <span>Local installation</span>
          </div>
        </div>
      </div>

      <div>
        <section className="relative -mx-6 -mt-8 overflow-hidden rounded-b-[2rem] bg-slate-950 py-20 text-white shadow-xl lg:-mx-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover brightness-[0.78]"
          >
            <source src="/solar-panel-installation-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/22 to-slate-950/8" />

          <div className="relative mx-auto w-full max-w-7xl px-10 md:px-12 lg:px-16">
            <HeroSlideIn className="max-w-3xl">
              <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                Nottingham&apos;s trusted solar supply partner
              </span>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                Tier-1 solar panels with local delivery &amp; installation
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-200">
                British Solar Direct supplies six core Tier-1 modules to homeowners and trade buyers
                across Nottingham. {COMPANY.director} — a highly sought-after builder with 20+ years
                of experience — coordinates delivery and professional installation for you.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/project-quote"
                  className="rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-600"
                >
                  Request Free Quote
                </Link>
                <Link
                  href="/products"
                  className="rounded-lg border border-slate-500 bg-slate-900/50 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-slate-800/80"
                >
                  Browse 6 Core Modules
                </Link>
              </div>
            </HeroSlideIn>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm md:grid-cols-4">
            <div>
              <p className="font-semibold text-slate-900">Trusted local builder</p>
              <p className="mt-1 text-slate-500">
                {COMPANY.director} — 20+ years in Nottingham construction.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Tier-1 modules</p>
              <p className="mt-1 text-slate-500">Six core lines from Trina, LONGi, JA, Jinko &amp; Qcells.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Delivery &amp; install</p>
              <p className="mt-1 text-slate-500">One contact from quote through to panels on your roof.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Fast quotes</p>
              <p className="mt-1 text-slate-500">Pro-forma pricing confirmed {COMPANY.responseTime}.</p>
            </div>
          </div>
        </section>

        <HowOrderingWorks />

        <section className="mx-auto w-full max-w-7xl px-4 py-20">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                Six core Tier-1 modules
              </h2>
              <p className="max-w-2xl text-slate-500">
                A focused catalogue of premium panels for residential rooftops, premium all-black
                installs, and commercial projects.
              </p>
            </div>

            <Link
              href="/products"
              className="text-sm font-semibold text-amber-600 transition hover:text-amber-700"
            >
              View full catalogue
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-amber-500 hover:shadow-md"
              >
                <div className="mb-5 flex h-64 items-center justify-center rounded-xl bg-slate-100 p-4">
                  <img
                    src={product.image}
                    alt={`${product.name} solar panel`}
                    className="h-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 text-sm font-medium text-amber-600">{product.brand}</p>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500">
                      {product.name}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.availability?.includes('stock')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {product.availability?.includes('stock') ? 'In stock' : 'Forward order'}
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm text-slate-500">{product.description}</p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Power:</span> {product.power}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Category:</span> {product.category}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Lead time:</span> {product.leadTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm">
                <Home className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Built for homeowners and trade buyers
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Around 90% of our customers are local homeowners. We also supply installers and
                commercial project buyers across Nottingham and the East Midlands.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Home className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">For homeowners</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Premium Tier-1 panels with delivery and optional installation by a builder trusted
                  by Nottingham families for over 20 years.
                </p>
              </div>

              <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">For installers</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Stock-ready pallet supply with trade pricing, pro-forma invoicing, and dependable
                  UK delivery coordination.
                </p>
              </div>

              <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">For project buyers</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Volume pricing and forward-order supply for commercial rooftops and larger
                  procurement requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Calculator />

        <section className="border-t border-slate-800 bg-slate-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="mb-2 text-center text-2xl font-bold">Request a free quote</h2>
            <p className="mb-6 text-center text-sm text-slate-400">
              {COMPANY.director} will confirm pricing, stock, delivery, and installation options —{' '}
              {COMPANY.responseTime}.
            </p>

            <form onSubmit={handleFormSubmit} className="mx-auto max-w-xl space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your name or company *
                </label>
                <input
                  name="companyName"
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Your name"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email *
                  </label>
                  <input
                    name="contactEmail"
                    required
                    type="email"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    placeholder="you@email.co.uk"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </label>
                  <input
                    name="contactPhone"
                    type="tel"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    placeholder="07xxx xxxxxx"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Delivery postcode *
                  </label>
                  <input
                    name="deliveryPostcode"
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm uppercase text-white focus:border-amber-500 focus:outline-none"
                    placeholder="NG17 8EY"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Estimated quantity *
                  </label>
                  <input
                    name="quantity"
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. 12 panels"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="needsInstallation" value="yes" className="accent-amber-500" />
                  Need installation
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="needsInstallation" value="no" defaultChecked className="accent-amber-500" />
                  Supply only
                </label>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-700"
              >
                {isSubmitting ? 'Submitting...' : 'Request Free Quote'}
              </button>

              <p className="text-center text-xs text-slate-500">
                Or use the{' '}
                <Link href="/project-quote" className="text-amber-400 hover:text-amber-300">
                  full quote form
                </Link>{' '}
                for product selection and project notes.
              </p>
            </form>

            {submissionStatus.msg && (
              <div
                className={`mt-6 rounded-lg border p-4 text-center text-sm font-medium ${
                  submissionStatus.success
                    ? 'border-emerald-800 bg-emerald-950 text-emerald-300'
                    : 'border-rose-800 bg-rose-950 text-rose-300'
                }`}
              >
                {submissionStatus.msg}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
