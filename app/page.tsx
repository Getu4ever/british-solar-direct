'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitQuoteRequest } from './actions';
import Calculator from '../components/Calculator';
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
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
      <div>
        <section className="relative -mt-8 overflow-hidden rounded-b-[2rem] bg-slate-950 py-20 text-white shadow-xl">
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

          <div className="relative mx-auto w-full max-w-7xl px-8">
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
                  Request Fixed Quote
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
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 text-sm sm:px-6 md:grid-cols-4">
            <div>
              <p className="font-semibold text-slate-900">Turnkey residential service</p>
              <p className="mt-1 text-slate-500">
                From design-ready quote to commissioning, one local team manages everything.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">0% VAT eligible packages</p>
              <p className="mt-1 text-slate-500">
                Our guide prices are structured around full turnkey installations qualifying for green-energy VAT relief.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">MCS and DNO handled</p>
              <p className="mt-1 text-slate-500">
                We manage the paperwork, electrical coordination, and certification handover without extra admin for you.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">24 business hour response</p>
              <p className="mt-1 text-slate-500">
                Clear timescales, fixed quote guidance, and responsive support from a Nottingham-based team.
              </p>
            </div>
          </div>
        </section>

        <HowOrderingWorks />

        <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                Three Flagship Installation Packages
              </h2>
              <p className="max-w-2xl text-slate-500">
                A focused selection of complete solar setups using premium all-black LONGi EcoLife
                technology, tailored directly to standard UK home footprints.
              </p>
            </div>

            <Link
              href="/products"
              className="text-sm font-semibold text-amber-600 transition hover:text-amber-700"
            >
              Compare all package options
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-amber-500 hover:shadow-lg"
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
                      index === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {index === 1 ? 'Most Popular' : 'Turnkey Package'}
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-6 text-slate-500">{product.description}</p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Guide System Price:</span>{' '}
                    {guideSystemPriceBySlug[product.slug] ??
                      'Complete Package Guide Price: Custom Quote Required'}
                  </p>
                </div>

                <div className="mt-5 text-sm font-semibold text-amber-600">
                  View package details →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-6">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Estimate Your System Size
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Select your property profile below to see a custom turnkey configuration framework
                using our premium LONGi EcoLife technology.
              </p>
            </div>

            <Calculator />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Local Proof
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Why Nottingham homeowners trust our installation process
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Homeowners want clear scope, clean workmanship, and one accountable team. That is exactly how our fixed-quote installation model is structured.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  “The quoting process felt far more structured than the usual solar sales approach. Everything from scaffolding to final sign-off was explained clearly before work started.”
                </p>
                <p className="mt-5 text-sm font-semibold text-slate-900">Nottingham homeowner brief</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-600">Fixed-scope installation</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  “We wanted one team to manage the roof works, electrical handover, and the paperwork. British Solar Direct made it feel like a complete home upgrade rather than a fragmented contractor process.”
                </p>
                <p className="mt-5 text-sm font-semibold text-slate-900">East Midlands homeowner brief</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-600">Turnkey delivery</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  “The package format made the decision simple. We knew exactly what was included, what our output would be, and what the next steps looked like before committing.”
                </p>
                <p className="mt-5 text-sm font-semibold text-slate-900">Family home package brief</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-600">Clear guide pricing</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm">
                <Building2 className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Fully Compliant &amp; Certified
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
                <h3 className="mb-3 text-xl font-bold text-slate-900">Part P Approved</h3>
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

        <section className="border-t border-slate-800 bg-slate-950 px-5 py-16 text-white sm:px-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="mb-2 text-center text-2xl font-bold">Request Your Fixed Quote</h2>
            <p className="mb-6 text-center text-sm text-slate-400">
              {COMPANY.director} will confirm pricing, system scope, installation timing, and next steps —{' '}
              {COMPANY.responseTime}.
            </p>

            <form onSubmit={handleFormSubmit} className="mx-auto max-w-xl space-y-4">
              <input type="hidden" name="quantity" value="Full home installation system" />
              <input type="hidden" name="needsInstallation" value="yes" />

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name *
                </label>
                <input
                  name="customerName"
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Your full name"
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
                    Phone *
                  </label>
                  <input
                    name="contactPhone"
                    required
                    type="tel"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    placeholder="07xxx xxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Address / Postcode *
                </label>
                <input
                  name="deliveryPostcode"
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  placeholder="House number, street, town, postcode"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Project Notes
                </label>
                <textarea
                  name="projectNotes"
                  rows={5}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  placeholder="Tell us about your roof layout, current electricity use, access constraints, or any installation goals."
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-700"
              >
                {isSubmitting ? 'Submitting...' : 'Request Your Fixed Quote'}
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
