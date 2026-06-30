'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { submitQuoteRequest } from './actions';
import Footer from '../components/Footer';
import Calculator from '../components/Calculator';
import { Wrench, Building2, Ship, Sparkles } from "lucide-react";

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
        msg: 'Thank you. Our sales team will email your quote and pro-forma invoice shortly.',
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
      <div className="border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>British Solar Direct - Tier-1 solar supply for trade and wholesale buyers</div>
          <div className="flex gap-4 text-slate-400">
            <span>UK delivery</span>
            <span>Bulk orders</span>
            <span>Container sourcing</span>
          </div>
        </div>
      </div>


      <main>
      <section className="relative -mx-6 -mt-8 overflow-hidden rounded-b-[2rem] bg-slate-950 text-white shadow-xl lg:-mx-8 py-20">       <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
  >
    <source src="/solar-panel-installation-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/55 to-slate-950/35" />

  <div className="relative mx-auto w-full max-w-7xl px-10 md:px-12 lg:px-16">
    <div className="max-w-3xl">
      <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
        UK trade supply and international fulfillment
      </span>

      <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
        Trade solar panels for installers, EPCs, and wholesale buyers
      </h1>

      <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-200">
        Stock-ready and forward-order solar modules from Tier-1 manufacturers, with UK
        delivery, project pricing, and container-based international supply.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/products"
          className="rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-600"
        >
          Browse Inventory
        </Link>
        <Link
          href="/project-quote"
          className="rounded-lg border border-slate-500 bg-slate-900/50 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-slate-800/80"
        >
          Request Trade Quote
        </Link>
      </div>
    </div>
  </div>
</section>


        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm md:grid-cols-4">
            <div>
              <p className="font-semibold text-slate-900">UK Stock Options</p>
              <p className="mt-1 text-slate-500">Fast dispatch on selected inventory lines.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Tier-1 Brands</p>
              <p className="mt-1 text-slate-500">Panels sourced from established global manufacturers.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Project Supply</p>
              <p className="mt-1 text-slate-500">Bulk pricing support for commercial and installer demand.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Export Fulfillment</p>
              <p className="mt-1 text-slate-500">Container coordination for larger international orders.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-20">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                Featured solar modules
              </h2>
              <p className="max-w-2xl text-slate-500">
                Browse core inventory lines for residential, commercial, and project-based supply.
              </p>
            </div>

            <Link
              href="/products"
              className="text-sm font-semibold text-amber-600 transition hover:text-amber-700"
            >
              View all products
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/vertex-s-450w"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-amber-500 hover:shadow-md"
            >
              <div className="mb-5 flex h-64 items-center justify-center rounded-xl bg-slate-100 p-4">
                <img
                  src="/images/vertex.webp"
                  alt="Vertex S+ 450W solar panel"
                  className="h-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500">
                  Vertex S+ 450W
                </h3>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  In stock
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-500">
                N-type monocrystalline dual-glass module suited to efficient use of limited roof
                space.
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Power:</span> 450W</p>
                <p><span className="font-semibold text-slate-900">Type:</span> N-type monocrystalline</p>
                <p><span className="font-semibold text-slate-900">Use case:</span> Residential and light commercial</p>
              </div>
            </Link>

            <Link
              href="/products/himo-6-580w"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-amber-500 hover:shadow-md"
            >
              <div className="mb-5 flex h-64 items-center justify-center rounded-xl bg-slate-100 p-4">
                <img
                  src="/images/himo.webp"
                  alt="Hi-MO 6 Commercial 580W solar panel"
                  className="h-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500">
                  Hi-MO 6 Commercial 580W
                </h3>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Forward order
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-500">
                High-capacity module designed for larger warehouse roofs, commercial installs, and
                project demand.
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Power:</span> 580W</p>
                <p><span className="font-semibold text-slate-900">Type:</span> High-output commercial module</p>
                <p><span className="font-semibold text-slate-900">Use case:</span> Commercial and utility-scale supply</p>
              </div>
            </Link>

            <Link
              href="/products/ultra-black-430w"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-amber-500 hover:shadow-md"
            >
              <div className="mb-5 flex h-64 items-center justify-center rounded-xl bg-slate-100 p-4">
                <img
                  src="/images/ultrablack.webp"
                  alt="Ultra Black 430W solar panel"
                  className="h-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500">
                  Ultra Black 430W
                </h3>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  In stock
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-500">
                Full-black module for premium residential projects where appearance matters as much
                as output.
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Power:</span> 430W</p>
                <p><span className="font-semibold text-slate-900">Type:</span> Full-black module</p>
                <p><span className="font-semibold text-slate-900">Use case:</span> Premium residential installations</p>
              </div>
            </Link>
          </div>
        </section>


<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-4">
    <div className="mb-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        Built for every type of solar buyer
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Flexible supply support for installers, procurement teams, and international wholesale orders.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-3">
      <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
          <Wrench className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">For installers</h3>
        <p className="text-sm leading-6 text-slate-600">
          Source stock-ready panels for residential and commercial jobs with simplified quote
          support and dependable UK delivery.
        </p>
      </div>

      <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
          <Building2 className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">For project buyers</h3>
        <p className="text-sm leading-6 text-slate-600">
          Secure volume pricing, scheduled supply planning, and procurement support for larger
          commercial requirements.
        </p>
      </div>

      <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
          <Ship className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">For export orders</h3>
        <p className="text-sm leading-6 text-slate-600">
          Coordinate bulk purchasing and container-based international fulfillment for
          distributor and wholesale demand.
        </p>
      </div>
    </div>
  </div>
</section>


        <Calculator />

        <section className="border-t border-slate-800 bg-slate-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="mb-2 text-center text-2xl font-bold">Request a project quote</h2>
            <p className="mb-6 text-center text-sm text-slate-400">
              Send your company details and our sales team will prepare pricing and a pro-forma
              invoice for your order.
            </p>

            <form onSubmit={handleFormSubmit} className="mx-auto max-w-xl space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Company Name
                </label>
                <input
                  name="companyName"
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Karol Digital"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Contact Email
                </label>
                <input
                  name="contactEmail"
                  required
                  type="email"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  placeholder="info@company.co.uk"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-700"
              >
                {isSubmitting ? 'Submitting quote request...' : 'Submit Request'}
              </button>
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
      </main>

      <Footer />
    </div>
  );
}
