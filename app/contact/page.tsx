'use client'

import React, { useState } from 'react';
import Footer from '../../components/Footer';

export default function ContactPage() {
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
      src="/images/contact-hero.webp"
      alt="Contact Team Background"
      className="h-full w-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/30" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
      Contact
    </p>
    <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
      Speak with the British Solar Direct team
    </h1>
    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
      Contact us for product enquiries, trade support, quote discussions, and delivery
      planning for your solar panel order.
    </p>
  </div>
</section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                Send an enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Company name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Email
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
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
                    placeholder="Tell us about your enquiry, product interest, quantity, or delivery requirements."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600"
                >
                  Send Enquiry
                </button>
              </form>

              {submitted && (
                <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Thank you. Your enquiry has been submitted successfully.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Contact focus</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <p>Product availability and module selection.</p>
                  <p>Trade pricing and project quote discussions.</p>
                  <p>Delivery planning and order coordination.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Commercial enquiries</h2>
                <p className="text-sm leading-6 text-slate-300">
                  For faster quote handling, include the module type, estimated quantity, and
                  delivery location in your message.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
