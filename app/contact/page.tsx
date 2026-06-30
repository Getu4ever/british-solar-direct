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
          <div className="absolute inset-0">
            <img src="/images/contact-hero.webp" alt="Contact Team Background" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/30" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">Contact</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Speak with the British Solar Direct team</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              Contact us for product enquiries, trade support, quote discussions, and delivery planning.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Enquiry Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">Send an enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Name</label>
                  <input required type="text" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Company name</label>
                  <input type="text" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="Company name" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Email</label>
                  <input required type="email" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="name@company.co.uk" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Message</label>
                  <textarea required rows={6} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="How can we help?" />
                </div>
                <button type="submit" className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600">Send Enquiry</button>
              </form>
              {submitted && <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">Thank you. Your enquiry has been submitted successfully.</div>}
            </div>

            {/* Contact Details Card */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-slate-900 border-b pb-4">Contact Details</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Company Name</p>
                    <p className="font-semibold text-slate-900">British Solar Direct</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Company Director</p>
                    <p className="font-semibold text-slate-900">Juma Mohammedi</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Address</p>
                    <p className="text-sm text-slate-700">Southwell Lane, Kirkby-in-Ashfield, Nottingham NG17 8EY</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Email</p>
                    <a href="mailto:juma@britishsolardirect.co.uk" className="text-sm text-amber-600 hover:text-amber-700 font-semibold">juma@britishsolardirect.co.uk</a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Phone</p>
                    <a href="tel:07544414241" className="text-sm text-amber-600 hover:text-amber-700 font-semibold">07544414241</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2398.988166986566!2d-1.2588496!3d53.0970636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879a9b400000001%3A0x0!2sSouthwell+Lane%2C+Kirkby-in-Ashfield%2C+Nottingham!5e0!3m2!1sen!2suk!4v1719750000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}