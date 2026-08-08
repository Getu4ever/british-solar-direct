import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const steps = [
  {
    title: 'Request a quote',
    description:
      'Tell us your preferred installation package, delivery postcode, and whether you need professional installation.',
  },
  {
    title: 'Receive your pro-forma',
    description:
      'We confirm stock, guide pricing, delivery timing, and installation options within 24 business hours.',
  },
  {
    title: 'Confirm & pay',
    description:
      'Approve your quote and pay by BACS using the pro-forma invoice we send over to confirm.',
  },
  {
    title: 'Delivery & install',
    description:
      'Juma Mohammedi coordinates UK delivery. Professional installation available across Nottingham and surrounding areas.',
  },
];

type HowOrderingWorksProps = {
  variant?: 'light' | 'dark';
  showCta?: boolean;
};

export default function HowOrderingWorks({
  variant = 'light',
  showCta = true,
}: HowOrderingWorksProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={
        isDark
          ? 'border-y border-slate-800 bg-slate-950 py-16 text-white'
          : 'border-y border-slate-200 bg-white py-16'
      }
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`mb-2 text-sm font-semibold uppercase tracking-[0.2em] ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`}
            >
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Simple ordering from quote to delivery</h2>
            <p className={`mt-3 max-w-2xl text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Most customers start with a free quote. We confirm pricing, lead time, and installation
              before you commit.
            </p>
          </div>
          {showCta && (
            <Link
              href="/project-quote"
              className="inline-flex rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
            >
              Request your free quote
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-5">
          {steps.map((step, index) => {
            const stepNumber = String(index + 1).padStart(2, '0');

            return (
              <div key={step.title} className="relative">
                <article className="relative overflow-hidden rounded-2xl border border-l-4 border-slate-800 border-l-amber-500 bg-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40">
                  <span
                    className="absolute top-3 right-4 select-none text-5xl font-black tracking-tighter text-amber-500/10"
                    aria-hidden="true"
                  >
                    {stepNumber}
                  </span>

                  <p className="text-xs font-bold tracking-wider text-amber-400 uppercase">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 mb-2 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">{step.description}</p>
                </article>

                {index < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 md:flex"
                    aria-hidden="true"
                  >
                    <ChevronRight className="h-5 w-5 text-slate-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
