'use client';

import React, { useState } from 'react';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import { submitContactEnquiry } from '../actions';
import { COMPANY } from '../lib/company';

export default function ContactPage() {
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
    const result = await submitContactEnquiry(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmissionStatus({
        success: true,
        msg: 'Thank you. Your enquiry has been submitted successfully.',
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
            <img src="/images/contact-hero.webp" alt="Contact Team Background" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">Contact</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Speak with {COMPANY.director}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                For product advice, quote discussions, delivery planning, or installation enquiries —
                contact Juma directly or send a message below.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">Send an enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Name</label>
                  <input name="name" required type="text" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Company name</label>
                  <input name="companyName" type="text" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="Company name" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Email</label>
                  <input name="email" required type="email" className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="name@company.co.uk" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-900">Message</label>
                  <textarea name="message" required rows={6} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-amber-500" placeholder="How can we help?" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-amber-500 py-3.5 text-base font-bold text-slate-950 transition hover:bg-amber-600 disabled:bg-slate-300">
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
              {submissionStatus.msg && (
                <div className={`mt-6 rounded-lg border p-4 text-sm font-medium ${submissionStatus.success ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                  {submissionStatus.msg}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-slate-900 border-b pb-4">Contact Details</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Company Name</p>
                    <p className="font-semibold text-slate-900">British Solar Direct</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Contact</p>
                    <p className="font-semibold text-slate-900">{COMPANY.director}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Role</p>
                    <p className="text-sm text-slate-700">{COMPANY.directorTitle}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Response time</p>
                    <p className="text-sm text-slate-700">Typically {COMPANY.responseTime}</p>
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
      </div>
      <Footer />
    </div>
  );
}
