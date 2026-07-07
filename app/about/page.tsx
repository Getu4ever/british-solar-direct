import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
import { COMPANY, DIRECTOR_BIO } from '../lib/company';

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
                Tier-1 solar supply, backed by a trusted Nottingham builder
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                We supply premium solar modules to homeowners and trade buyers across Nottingham
                and the East Midlands — with delivery and installation coordinated by{' '}
                {COMPANY.director}, a builder trusted by local families for over two decades.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
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
                  Juma handles delivery logistics and on-site installation where required, so
                  customers deal with one trusted local contact from quote through to completion.
                  His reputation in the Nottingham building community is built on quality workmanship,
                  clear communication, and reliable project delivery.
                </p>
                <p>
                  British Solar Direct brings that same standard to solar panel supply — a focused
                  catalogue of six core Tier-1 modules, transparent quoting, and professional order
                  coordination for both residential and commercial buyers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Who we serve</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <p>Homeowners across Nottingham and the East Midlands.</p>
                  <p>Installers, electrical contractors, and trade resellers.</p>
                  <p>Commercial project buyers and repeat wholesale customers.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">How we work together</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Online:</span> Product catalogue,
                    quoting, and order coordination through this website.
                  </p>
                  <p>
                    <span className="font-semibold text-white">On the ground:</span> Juma manages
                    delivery, site access, and installation scheduling.
                  </p>
                  <p>
                    <span className="font-semibold text-white">Your quote:</span> Confirmed pricing,
                    stock, and lead times — typically {COMPANY.responseTime}.
                  </p>
                </div>
              </div>

              <Link
                href="/project-quote"
                className="flex items-center justify-center rounded-xl bg-amber-500 py-4 text-base font-bold text-slate-950 transition hover:bg-amber-600"
              >
                Request a free quote
              </Link>
            </div>
          </div>
        </section>

        <HowOrderingWorks />
      </div>

      <Footer />
    </div>
  );
}
