import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
import { COMPANY, DIRECTOR_BIO } from '../lib/company';

const homeownerProfiles = [
  '1-2 bedroom homes seeking a compact solar and battery upgrade',
  '3-4 bedroom family homes targeting stronger daytime bill reduction',
  'Large detached homes needing higher output and battery resilience',
  'Homeowners who want one accountable team for quote, install, and compliance',
];

const servicePillars = [
  'Fixed-scope turnkey package guidance built around LONGi EcoLife technology',
  'Professional scaffolding, installation labor, DNO paperwork, and MCS handover managed for you',
  'Cleaner quoting with battery-backed system tiers matched to real UK home footprints',
  'Director-led coordination from initial enquiry through to final installation planning',
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/certifications-hero.webp"
              alt="British Solar Direct team and solar installation"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                About British Solar Direct
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                A Nottingham turnkey solar partner built for homeowners
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                British Solar Direct is focused on premium residential solar installation packages
                for Nottingham and the East Midlands. We build every quote around clear system
                scope, LONGi EcoLife technology, and trusted local project coordination from{' '}
                {COMPANY.director}.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src="/images/about-director-site.jpg"
                  alt="Director-led solar installation coordination on a residential site"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-600">
                  Meet {COMPANY.director}
                </p>
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                  {COMPANY.directorTitle}
                </h2>

                <div className="space-y-5 text-sm leading-7 text-slate-600">
                  <p>{DIRECTOR_BIO}</p>
                  <p>
                    Juma coordinates the physical installation path, site preparation, and on-the-ground
                    project execution, so homeowners deal with one trusted local contact from quote
                    through to completion. His reputation in the Nottingham building community is built
                    on quality workmanship, clear communication, and reliable delivery.
                  </p>
                  <p>
                    British Solar Direct brings that same standard to residential solar: three flagship
                    LONGi EcoLife system packages, transparent guide pricing, and a turnkey workflow
                    that already includes scaffolding, labor, DNO handling, and certification handover.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Who we serve</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  {homeownerProfiles.map((customer) => (
                    <p key={customer}>{customer}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">How we work together</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Online:</span> Package comparison,
                    estimator guidance, and fixed-quote enquiries through this website.
                  </p>
                  <p>
                    <span className="font-semibold text-white">On the ground:</span> Juma manages
                    delivery timing, site access, and installation scheduling.
                  </p>
                  <p>
                    <span className="font-semibold text-white">Your quote:</span> Confirmed system
                    scope, guide pricing, and next steps — typically {COMPANY.responseTime}.
                  </p>
                </div>
              </div>

              <Link
                href="/project-quote"
                className="flex items-center justify-center rounded-xl bg-amber-500 py-4 text-base font-bold text-slate-950 transition hover:bg-amber-600"
              >
                Request a fixed quote
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">What we do</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {servicePillars.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-500">
              Our model is intentionally narrow: clear residential system packages, local installation
              coordination, and one accountable route from survey-stage enquiry to installation handover.
            </p>
          </div>
        </section>

        <HowOrderingWorks />
      </div>

      <Footer />
    </div>
  );
}
