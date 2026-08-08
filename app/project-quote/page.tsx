import { Suspense } from 'react';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import ProjectQuoteForm from '../../components/ProjectQuoteForm';
import { COMPANY } from '../lib/company';

function QuoteFormFallback() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
          <div className="h-4 w-40 rounded bg-slate-800" />
        </div>
        <div className="space-y-4">
          <div className="h-11 rounded-lg bg-slate-800" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-11 rounded-lg bg-slate-800" />
            <div className="h-11 rounded-lg bg-slate-800" />
          </div>
          <div className="h-11 rounded-lg bg-slate-800" />
          <div className="h-28 rounded-lg bg-slate-800" />
          <div className="h-12 rounded-lg bg-amber-500/30" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectQuotePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/project-hero.webp"
              alt="Solar panel project quote background"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Free Quote
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Request your fixed solar installation quote
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                Tell us about your home, roof layout, and preferred LONGi package. {COMPANY.director}
                will confirm guide pricing, installation scope, and next steps — typically{' '}
                {COMPANY.responseTime}.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <Suspense fallback={<QuoteFormFallback />}>
            <div className="mx-auto max-w-7xl">
              <ProjectQuoteForm />
            </div>
          </Suspense>
        </section>
      </div>

      <Footer />
    </div>
  );
}
