'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

const STORAGE_KEY = 'bsd-join-us-dismissed';
const SHOW_DELAY_MS = 4500;

export default function JoinUsPopup() {
  const titleId = useId();
  const descriptionId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem(STORAGE_KEY) === '1') return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // Ignore private-mode / storage failures.
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Ignore private-mode / storage failures.
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Dismiss popup"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-full max-w-lg animate-fade-in-up rounded-2xl bg-white px-6 py-8 text-center shadow-2xl shadow-slate-900/20 sm:px-10 sm:py-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="mb-6 flex items-center justify-center gap-5 sm:gap-6">
          <div className="flex flex-col items-center leading-none" aria-label="LONGi Solar">
            <span className="text-[1.65rem] font-extrabold tracking-tight text-[#E40010] sm:text-3xl">
              LONGi
              <span className="ml-0.5 inline-block h-1.5 w-1.5 -translate-y-3 rounded-[1px] bg-[#E40010] sm:-translate-y-3.5" />
            </span>
            <span className="mt-0.5 text-[0.7rem] font-semibold tracking-[0.28em] text-slate-900 uppercase">
              Solar
            </span>
          </div>

          <span className="h-10 w-px bg-slate-300" aria-hidden="true" />

          <Image
            src="/BSD-logo.png"
            alt="British Solar Direct"
            width={132}
            height={44}
            className="h-10 w-auto object-contain sm:h-11"
            priority
          />
        </div>

        <h2
          id={titleId}
          className="mx-auto max-w-[22rem] text-xl leading-snug font-extrabold tracking-tight text-slate-950 sm:text-2xl"
        >
          Power the Limitless: LONGi EcoLife for Nottingham Homes
        </h2>

        <p
          id={descriptionId}
          className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-slate-800 sm:text-base"
        >
          As a LONGi EcoLife partner, British Solar Direct helps homeowners push beyond rising energy
          bills. Discover our fixed packages, local installation, and MCS-certified handover —
          typically completed within two weeks.
        </p>

        <Link
          href="/project-quote"
          onClick={dismiss}
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#E40010] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#c9000e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E40010]"
        >
          Join us
        </Link>
      </div>
    </div>
  );
}
