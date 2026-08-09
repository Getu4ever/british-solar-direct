'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitQuoteRequest } from './actions';
import Calculator from '../components/Calculator';
import Footer from '../components/Footer';
import HeroSlideIn from '../components/HeroSlideIn';
import HowOrderingWorks from '../components/HowOrderingWorks';
import LongiEcoLifeAds from '../components/LongiEcoLifeAds';
import UkAddressLookup from '../components/UkAddressLookup';
import { products } from './lib/products';
import { COMPANY } from './lib/company';
import { trackGenerateLead } from './lib/gtag';

const guideSystemPriceBySlug: Record<string, string> = {
  'cottage-setup-4kw': 'Complete Package Guide Price: From £5,500 (0% VAT)',
  'family-homestead-8kw': 'Complete Package Guide Price: From £9,750 (0% VAT)',
  'estate-powerhouse-12kw': 'Complete Package Guide Price: Custom Quote Required',
};

const packageHighlightsBySlug: Record<string, [string, string, string]> = {
  'cottage-setup-4kw': [
    '9x Premium LONGi 480W Panels',
    '5kWh Intelligent Battery Stack',
    'Scaffolding & DNO Included',
  ],
  'family-homestead-8kw': [
    '18x Premium LONGi 480W Panels',
    '10kWh Storage Battery Stack',
    'Full MCS Grid Certification',
  ],
  'estate-powerhouse-12kw': [
    '26+ Premium LONGi 480W Panels',
    '15kWh Custom Scalable Stack',
    'EV Smart Charging Optimized',
  ],
};

const marqueeBadgeShell =
  'flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-800/40 px-5 py-2.5 text-xs font-bold tracking-wider text-slate-100 uppercase shadow-sm';

const trustMarqueeBadges = [
  {
    key: 'vat',
    label: 'Statutory VAT Relief',
    iconClass:
      'flex h-8 w-8 items-center justify-center rounded-full border border-amber-500 bg-amber-500/10 text-[10px] font-extrabold text-amber-400',
    icon: <span>0%</span>,
  },
  {
    key: 'mcs',
    label: 'Fully MCS Certified',
    iconClass:
      'flex h-8 w-8 items-center justify-center rounded-full border border-blue-500 bg-blue-500/10 text-blue-400',
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <path
          d="M3.5 8.2 6.4 11l6.1-6.4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'niceic',
    label: 'NICEIC / Part P Regulated',
    iconClass:
      'flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500 bg-yellow-500/10 text-yellow-400',
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M9.2 1.2 3.6 9.1h3.1L6.5 14.8l6.1-8.4H9.4L9.2 1.2Z" />
      </svg>
    ),
  },
  {
    key: 'recc',
    label: 'RECC Code Protected',
    iconClass:
      'flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-400',
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <rect
          x="3.2"
          y="2.2"
          width="9.6"
          height="11.6"
          rx="1.4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M5.6 5.5h4.8M5.6 8h4.8M5.6 10.5h3.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

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
      trackGenerateLead('home_quote');
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div>
        <section className="relative -mt-8 overflow-hidden bg-slate-950 py-20 text-white shadow-xl">
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
                British Solar Direct manages turnkey home solar installations from first quote to
                final sign-off for Nottingham homeowners. Led by {COMPANY.director}, a respected
                local director with over 20 years of proven building excellence, we handle supply,
                installation, electrical compliance, and project completion for you.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/project-quote"
                  className="rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-600"
                >
                  Get your fixed quote
                </Link>
                <Link
                  href="/products"
                  className="rounded-lg border border-slate-500 bg-slate-900/50 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-slate-800/80"
                >
                  Browse installation packages
                </Link>
              </div>
            </HeroSlideIn>
          </div>
        </section>

        <HowOrderingWorks />

        <LongiEcoLifeAds />

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
            {products.map((product, index) => {
              const highlights = packageHighlightsBySlug[product.slug] ?? [
                product.type,
                product.efficiency,
                product.availability ?? 'Turnkey Installation',
              ];

              return (
                <article
                  key={product.slug}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} installation`}
                    className="h-56 w-full rounded-xl object-cover brightness-[0.95]"
                  />

                  <div className="mt-4 mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-sm font-medium text-amber-600">{product.brand}</p>
                      <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        index === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {index === 1 ? 'Most Popular' : 'Turnkey Package'}
                    </span>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start text-sm text-slate-600">
                        <span className="mr-2 text-amber-500" aria-hidden="true">
                          ✓
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto space-y-4 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">Guide System Price:</span>{' '}
                      {guideSystemPriceBySlug[product.slug] ??
                        'Complete Package Guide Price: Custom Quote Required'}
                    </p>

                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-block text-sm font-semibold text-amber-600 transition hover:text-amber-700"
                    >
                      View details →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Meet the Power Players</h2>
          <p className="mt-2 mb-10 max-w-2xl text-sm text-slate-500">
            Every installation features our exclusive single-manufacturer Tier-1 hardware framework,
            engineered for extreme reliability and clean architectural aesthetics.
          </p>

          <div className="grid grid-cols-1 gap-6 md:auto-rows-[260px] md:grid-cols-3">
            <article className="relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white shadow-md transition-all duration-300 hover:border-amber-500/30 md:row-span-2 md:min-h-0">
              <div className="mb-4 flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 p-3">
                <img
                  src="/images/bento-longi-panels.jpg"
                  alt="Premium all-black LONGi EcoLife solar panels"
                  className="h-full max-h-72 w-full object-contain md:max-h-none"
                />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                  LONGi EcoLife™ 480W Arrays
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-white">
                  Breakthrough HPBC 2.0 Cell Architecture
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Our premium all-black architectural panels feature front-side busbar-free
                  technology, allowing cells to absorb maximized light voltage even under cloudy,
                  low-light Nottingham skies.
                </p>
              </div>
            </article>

            <article className="flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-5 text-white transition-all duration-300 hover:border-amber-500/30">
              <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-1">
                <img
                  src="/images/bento-hybrid-inverter.jpg"
                  alt="Smart hybrid solar inverter"
                  className="h-full w-full scale-110 object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-amber-400">THE ENGINE</p>
                <h3 className="text-base font-bold text-white">Smart Hybrid Inverter Hub</h3>
                <p className="mt-1.5 text-xs text-slate-400">
                  The absolute brain of your system. Automatically converts and distributes direct
                  current into household electricity or battery banks.
                </p>
              </div>
            </article>

            <article className="flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-5 text-white transition-all duration-300 hover:border-amber-500/30">
              <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-1">
                <img
                  src="/images/bento-battery-stack.jpg"
                  alt="Intelligent lithium home battery storage stack"
                  className="h-full w-full scale-110 object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-amber-400">THE STORAGE</p>
                <h3 className="text-base font-bold text-white">Intelligent Lithium Battery Stack</h3>
                <p className="mt-1.5 text-xs text-slate-400">
                  High-density modular storage blocks that store daytime energy, completely wiping
                  out peak-rate evening grid electricity costs.
                </p>
              </div>
            </article>

            <article className="flex min-h-[220px] flex-col justify-between gap-5 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-5 text-white transition-all duration-300 hover:border-amber-500/30 sm:flex-row sm:items-center md:col-span-2">
              <div className="flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f4d3c4] p-2 sm:h-40 sm:w-44">
                <img
                  src="/images/bento-monitoring-app.jpg"
                  alt="Solar monitoring mobile app interface"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-amber-400">THE CONTROL</p>
                <h3 className="text-lg font-bold text-white">Real-Time Mobile Performance App</h3>
                <p className="mt-1.5 max-w-md text-xs text-slate-400">
                  Track your active generation yields, home energy savings metrics, and ongoing
                  national grid payback export revenues directly from your smartphone anywhere,
                  anytime.
                </p>
              </div>
            </article>
          </div>
        </section>

        <div
          className="relative w-full select-none overflow-hidden border-y border-slate-800 bg-slate-900 py-5 text-white"
          aria-label="Trust credentials"
        >
          <div className="animate-marquee">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {trustMarqueeBadges.map((badge) => (
                  <div key={`${copy}-${badge.key}`} className={marqueeBadgeShell}>
                    <span className={badge.iconClass}>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="border-y border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                LONGi EcoLife
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                See the technology behind our packages
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                A short look at LONGi EcoLife — the next-generation modules we specify for Nottingham
                homeowners who want premium output and a clean all-black finish.
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950 shadow-lg ring-1 ring-slate-200">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/AbVRm_UD5uE"
                title="LONGi EcoLife: Solar modules of the next generation for homeowners with high demands"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
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

            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src="/images/home-local-install.jpg"
                alt="Finished residential solar installation on a British family home"
                className="h-64 w-full object-cover object-center md:h-[28rem] md:object-top"
              />
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

              <UkAddressLookup
                name="deliveryPostcode"
                label="Installation address"
                required
                variant="dark"
              />

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
                  detailed project quote form
                </Link>{' '}
                for package selection and project notes.
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
