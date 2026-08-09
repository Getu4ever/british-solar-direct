import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { COMPANY, DIRECTOR_BIO } from '../lib/company';
import NottsLocalLeadForm from './NottsLocalLeadForm';

export const metadata: Metadata = {
  title: 'Turnkey Solar for Nottingham Homes',
  description:
    'Local LONGi EcoLife solar packages for Nottingham homeowners. Cottage Setup from £5,500 and Family Homestead from £9,750 with 0% statutory VAT relief. Call 0115 990 4024.',
  openGraph: {
    title: 'Turnkey Solar for Nottingham Homes | British Solar Direct',
    description:
      'Director-led turnkey solar for Nottingham. Fixed packages with local install and 0% VAT relief where eligible.',
    images: [
      {
        url: '/images/home-local-install.jpg',
        width: 1200,
        height: 630,
        alt: 'British Solar Direct solar installation on a Nottingham home',
      },
    ],
  },
};

const packages = [
  {
    name: 'The Cottage Setup',
    price: '£5,500',
    size: '4.3kW · 9 panels · 5kWh battery',
    blurb: 'Compact turnkey system for smaller Nottingham homes and tighter roof layouts.',
    image: '/images/cottage-setup-package.jpg',
    href: '/project-quote?product=cottage-setup-4kw',
  },
  {
    name: 'The Family Homestead',
    price: '£9,750',
    size: '8.6kW · 18 panels · 10kWh battery',
    blurb: 'Our most popular package for 3–4 bedroom homes targeting strong daytime bill cuts.',
    image: '/images/family-homestead-package.jpg',
    href: '/project-quote?product=family-homestead-8kw',
    featured: true,
  },
] as const;

export default function NottsLocalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <div className="flex-1">
        {/* Hero — one composition, brand-first, full-bleed */}
        <section className="relative min-h-[88vh] overflow-hidden border-b border-zinc-800">
          <Image
            src="/images/home-local-install.jpg"
            alt="Turnkey solar installation on a Nottingham residential roof"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/75 via-zinc-950/55 to-zinc-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:justify-center lg:pb-24 lg:pt-32">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">
              British Solar Direct · Nottingham
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turnkey Solar for Nottingham Homes
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
              Fixed LONGi EcoLife packages, local delivery, and professional installation —
              typically completed within 2 weeks.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#quote"
                className="inline-flex rounded-lg bg-emerald-500 px-7 py-3.5 text-base font-bold text-zinc-950 transition hover:bg-emerald-400"
              >
                Request a callback
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex rounded-lg border border-zinc-600 px-7 py-3.5 text-base font-semibold text-white transition hover:border-emerald-500 hover:text-emerald-300"
              >
                Call {COMPANY.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Trust — Director */}
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/about-director-site.jpg"
                alt={`${COMPANY.director} coordinating a residential solar installation`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={82}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Local trust
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {COMPANY.director}
              </h2>
              <p className="mt-2 text-base font-medium text-zinc-400">{COMPANY.directorTitle}</p>
              <p className="mt-6 text-base leading-8 text-zinc-300">{DIRECTOR_BIO}</p>
              <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  20+ years of Nottingham building excellence
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Director-led survey, scaffolding, and install coordination
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Around 90% of residential customers are local homeowners
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="border-b border-zinc-800 bg-zinc-900/40">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Fixed packages
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Clear guide pricing with 0% statutory VAT relief
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-400">
                Eligible residential installations qualify for 0% VAT relief. Final quote confirms
                exact scope, stock, and delivery for your Nottingham postcode.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`overflow-hidden border ${
                    'featured' in pkg && pkg.featured
                      ? 'border-emerald-500/50 bg-zinc-950'
                      : 'border-zinc-800 bg-zinc-950/70'
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.name} package visualisation`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    {'featured' in pkg && pkg.featured ? (
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Most popular in Nottingham
                      </p>
                    ) : null}
                    <h3 className="text-2xl font-bold tracking-tight text-white">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{pkg.size}</p>
                    <p className="mt-4 text-3xl font-extrabold text-emerald-400">
                      {pkg.price}
                      <span className="ml-2 text-sm font-semibold text-zinc-400">
                        guide · 0% VAT
                      </span>
                    </p>
                    <p className="mt-4 text-sm leading-6 text-zinc-400">{pkg.blurb}</p>
                    <Link
                      href={pkg.href}
                      className="mt-6 inline-flex text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                    >
                      Prefer full quote details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="quote" className="bg-zinc-950">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:py-20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Local callback
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Tell us where you are — we’ll call you back
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-zinc-400">
                Three fields only. No long forms. Share your name, postcode, and phone, and{' '}
                {COMPANY.director}’s team will follow up with a fixed package quote.
              </p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <NottsLocalLeadForm />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
