'use client';

import { useState } from 'react';
import { submitNottsLocalLead } from '../actions';
import { COMPANY } from '../lib/company';
import { trackGenerateLead } from '../lib/gtag';

export default function NottsLocalLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; msg?: string }>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({});

    const formElement = event.currentTarget;
    const result = await submitNottsLocalLead(new FormData(formElement));
    setIsSubmitting(false);

    if (result.success) {
      trackGenerateLead('notts_local');
      setStatus({
        success: true,
        msg: `Thanks — we’ll call you ${COMPANY.responseTime} with a fixed Nottingham package quote.`,
      });
      formElement.reset();
    } else {
      setStatus({
        success: false,
        msg: result.error ?? 'Something went wrong. Please try again or call us.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="notts-name" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Name
        </label>
        <input
          id="notts-name"
          name="name"
          required
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label htmlFor="notts-postcode" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Postcode
        </label>
        <input
          id="notts-postcode"
          name="postcode"
          required
          type="text"
          autoComplete="postal-code"
          placeholder="e.g. NG1 5AA"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm uppercase text-white outline-none transition placeholder:normal-case placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label htmlFor="notts-phone" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Phone number
        </label>
        <input
          id="notts-phone"
          name="phone"
          required
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="07xxx or 0115…"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-emerald-500 py-3.5 text-base font-bold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-300"
      >
        {isSubmitting ? 'Sending…' : 'Get my fixed Nottingham quote'}
      </button>

      <p className="text-center text-xs leading-5 text-zinc-500">
        Prefer to speak now?{' '}
        <a href={`tel:${COMPANY.phone}`} className="font-semibold text-emerald-400 hover:text-emerald-300">
          {COMPANY.phoneDisplay}
        </a>
      </p>

      {status.msg ? (
        <div
          className={`rounded-lg border p-4 text-sm font-medium ${
            status.success
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
          }`}
        >
          {status.msg}
        </div>
      ) : null}
    </form>
  );
}
