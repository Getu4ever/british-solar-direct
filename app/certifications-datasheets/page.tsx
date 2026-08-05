import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import { productDatasheets, complianceNotes } from '../lib/datasheets';
import { COMPANY } from '../lib/company';
import { LONGI_ECOLIFE_MODULE } from '../lib/products';

export default function CertificationsDatasheetsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/certifications-hero.webp"
              alt="Solar panel technical documentation background"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Certifications & Datasheets
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Technical documents for our LONGi EcoLife modules
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                Review product specifications, warranty summaries, and compliance documentation for
                the LONGi EcoLife modules used in British Solar Direct packages. Full PDF packs are
                issued with your quote.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Module Nameplate
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {LONGI_ECOLIFE_MODULE.brand} {LONGI_ECOLIFE_MODULE.model}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Electrical and compliance values from the manufacturer nameplate for the 480W
              all-black module specified across our residential packages.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
                Electrical specifications
              </h3>
              <div className="space-y-3 text-sm">
                {LONGI_ECOLIFE_MODULE.electricalSpecs.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 border-b border-slate-100 pb-2"
                  >
                    <span className="text-slate-500">{row.label}</span>
                    <span className="shrink-0 font-semibold text-slate-800">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
                Testing & compliance
              </h3>
              <div className="space-y-3 text-sm">
                {LONGI_ECOLIFE_MODULE.complianceSpecs.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 border-b border-slate-100 pb-2"
                  >
                    <span className="text-slate-500">{row.label}</span>
                    <span className="shrink-0 text-right font-semibold text-slate-800">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Technology:</span>{' '}
                  {LONGI_ECOLIFE_MODULE.technology}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Module efficiency:</span>{' '}
                  {LONGI_ECOLIFE_MODULE.efficiency}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Dimensions:</span>{' '}
                  {LONGI_ECOLIFE_MODULE.dimensions}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Unit weight:</span>{' '}
                  {LONGI_ECOLIFE_MODULE.weight}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Per-package documentation
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Request a quote to receive the complete datasheet pack for your chosen installation
              package.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productDatasheets.map((entry) => (
              <div
                key={entry.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    {entry.brand}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">{entry.name}</h3>
                  {entry.power && <p className="mt-1 text-sm text-slate-500">{entry.power}</p>}
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    Module: {LONGI_ECOLIFE_MODULE.model}
                  </p>
                </div>

                <ul className="mb-6 flex-1 space-y-3">
                  {entry.documents.map((doc) => (
                    <li key={doc.label} className="text-sm leading-5 text-slate-600">
                      <span className="font-semibold text-slate-900">{doc.label}:</span>{' '}
                      {doc.description}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/project-quote?product=${entry.slug}`}
                  className="text-sm font-semibold text-amber-600 transition hover:text-amber-700"
                >
                  Request docs with a quote →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {complianceNotes.map((note) => (
                <div key={note.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="mb-3 text-lg font-bold text-slate-900">{note.title}</h2>
                  <p className="text-sm leading-6 text-slate-600">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Need help choosing a package?</h2>
            <p className="mb-6 text-sm leading-6 text-slate-300">
              {COMPANY.director} can advise on the best system size for your roof type, budget, and
              installation requirements. Request a quote or call{' '}
              <a href={`tel:${COMPANY.phone}`} className="font-semibold text-amber-400">
                {COMPANY.phoneDisplay}
              </a>
              .
            </p>
            <Link
              href="/project-quote"
              className="inline-flex rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
            >
              Request a free quote
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
