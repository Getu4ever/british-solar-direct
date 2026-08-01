import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import { BadgeCheck, Cable, ClipboardCheck, ShieldCheck } from 'lucide-react';

const installationSteps = [
  {
    title: 'Site Survey & DNO Approval',
    description:
      "We assess your property's orientation and secure official approvals from the local Distribution Network Operator (DNO) to safely link your panels to the National Grid.",
  },
  {
    title: 'Precision Scaffolding & Safety',
    description:
      'Our professional local teams deploy safe structural scaffolding matching your specific roof pitch and building layout.',
  },
  {
    title: 'Certified Electrical Hookup',
    description:
      'Juma Mohammedi coordinates fully Part P qualified electrical engineering teams to hook up your LONGi EcoLife panels, hybrid inverters, and battery banks safely.',
  },
  {
    title: 'MCS Handover Certificate',
    description:
      'We issue your final MCS compliance certificate, fully registering your system so you can instantly cash in on Smart Export Guarantee (SEG) payments for excess grid energy.',
  },
];

export default function InstallationPage() {
  const stepIcons = [ClipboardCheck, ShieldCheck, Cable, BadgeCheck];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/installation-hero.jpg"
              alt="Professional residential solar installation scene"
              className="h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/35 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Installation
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Professional Solar Installations in Nottingham
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                From initial structural roof surveys through to final MCS certification, our team
                handles your transition to solar energy entirely end-to-end. Zero stress. Zero
                hassle.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="pointer-events-none absolute inset-x-0 top-10 h-40 bg-gradient-to-b from-amber-50/70 to-transparent" />
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              The 4-Step Handover Process
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              A premium turnkey workflow built to keep your home installation compliant, safe, and
              fully managed from planning to final certification.
            </p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-2">
            {installationSteps.map((step, index) => {
              const StepIcon = stepIcons[index];

              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-amber-400 shadow-sm">
                    <StepIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">{step.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{step.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-slate-800 bg-slate-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold tracking-tight">Ready to start your installation?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Secure a detailed fixed quote covering survey, design, hardware, and full installation
              delivery managed by Juma Mohammedi and his local engineering team.
            </p>

            <Link
              href="/project-quote"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-amber-500 px-8 py-4 text-base font-bold text-slate-950 transition hover:bg-amber-600"
            >
              Request Your Free Fixed Quote
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
