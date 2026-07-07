import Link from 'next/link';

const steps = [
  {
    title: 'Request a quote',
    description:
      'Tell us the panel type, quantity, delivery postcode, and whether you need installation.',
  },
  {
    title: 'Receive your pro-forma',
    description:
      'We confirm stock, guide pricing, delivery timing, and installation options within 4 business hours.',
  },
  {
    title: 'Confirm & pay',
    description:
      'Approve your quote and pay by BACS (pro-forma) or secure card checkout for confirmed orders.',
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
      <div className="mx-auto max-w-7xl px-4">
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
              Request a free quote
            </Link>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`rounded-2xl border p-6 ${
                isDark
                  ? 'border-slate-800 bg-slate-900/50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <p
                className={`mb-2 text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-amber-400' : 'text-amber-600'
                }`}
              >
                Step {index + 1}
              </p>
              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className={`text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
