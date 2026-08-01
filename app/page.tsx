'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitQuoteRequest } from './actions';
import Footer from '../components/Footer';
import HeroSlideIn from '../components/HeroSlideIn';
import HowOrderingWorks from '../components/HowOrderingWorks';
import { products } from './lib/products';
import { COMPANY } from './lib/company';
import { Home, Wrench, Building2 } from 'lucide-react';

const guideSystemPriceBySlug: Record<string, string> = {
  'cottage-setup-4kw': 'Complete Package Guide Price: From £5,500 (0% VAT)',
  'family-homestead-8kw': 'Complete Package Guide Price: From £9,750 (0% VAT)',
  'estate-powerhouse-12kw': 'Complete Package Guide Price: Custom Quote Required',
};

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
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="font-medium">
            Nottingham&apos;s Turnkey Residential Solar Partner — Managed by Juma Mohammedi
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
            <span className="flex items-center gap-1">✨ 20+ Years Excellence</span>
            <span className="flex items-center gap-1">📋 Free Home Quotes</span>
            <span className="flex items-center gap-1">🛡️ MCS-Compliant</span>
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
                Nottingham&apos;s trusted residential supply &amp; install partner
              </span>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                Turnkey home solar installations, managed from first quote to final sign-off
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-200">
                British Solar Direct helps Nottingham homeowners secure premium Tier-1 systems with
                one accountable team. Led by {COMPANY.director}, a respected local director with over
                20 years of proven building excellence, we handle supply, installation, electrical
                compliance, and project completion for you.
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
                  View System Options
                </Link>
              </div>
            </HeroSlideIn>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm md:grid-cols-4">
            <div>
              <p className="font-semibold text-slate-900">Turnkey residential service</p>
              <p className="mt-1 text-slate-500">
                From design-ready quote to commissioning, one local team manages everything.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Director-led quality</p>
              <p className="mt-1 text-slate-500">
                {COMPANY.director} is trusted across Nottingham for 20+ years of premium build work.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Supply &amp; install in one plan</p>
              <p className="mt-1 text-slate-500">
                Tier-1 panel supply, roof installation, and electrical handover without multiple
                contractors.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Local response times</p>
              <p className="mt-1 text-slate-500">
                Free quote, clear timescales, and responsive support from a Nottingham-based team.
              </p>
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
                    <span className="font-semibold text-slate-900">Guide System Price:</span>{' '}
                    {guideSystemPriceBySlug[product.slug] ?? 'Complete Package Guide Price: Custom Quote Required'}
                  </p>
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
                <Building2 className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Trust, compliance, and fully protected project delivery
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Our turnkey model is built for Nottingham homeowners who want complete peace of
                mind, verified compliance, and director-led accountability from start to finish.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Home className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">MCS Certified Work</h3>
                <p className="text-sm leading-6 text-slate-600">
                  All physical installations are signed off by fully vetted, MCS-registered
                  engineers, enabling your Smart Export Guarantee (SEG) payments.
                </p>
              </div>

              <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">Part P &amp; DNO Approved</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Full electrical self-certification and official Distribution Network Operator grid
                  notifications handled entirely by our team.
                </p>
              </div>

              <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">£5M Public Liability</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Comprehensive insurance coverage on every project, backed by over 20 years of
                  premier local construction experience.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                  <input type="radio" name="needsInstallation" value="yes" defaultChecked className="accent-amber-500" />
                  Need installation
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="needsInstallation" value="no" className="accent-amber-500" />
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
