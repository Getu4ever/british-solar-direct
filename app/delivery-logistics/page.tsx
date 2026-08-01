import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
import { HardHat, HousePlus, Truck } from 'lucide-react';
import {
  COMPANY,
  DELIVERY_AREAS,
  DELIVERY_EXCLUSIONS,
  PAYMENT_NOTE,
} from '../lib/company';

export default function DeliveryLogisticsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/delivery-hero.webp"
              alt="Solar panel delivery and logistics"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Delivery & Logistics
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Delivery and installation coordinated by a trusted local builder
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                {COMPANY.director} personally manages site delivery, access planning, and professional
                installation across Nottingham and surrounding areas — so you deal with one reliable
                contact from quote to completion.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Installation Workflow
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              End-to-end delivery and on-site execution
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <HardHat className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Structural Site Prep</h2>
              <p className="text-sm leading-6 text-slate-600">
                We arrange local safety scaffolding tailored to your home layout. Deliveries of
                racking and hardware are safely timed to drop exactly when our team arrives.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <HousePlus className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Professional Handover</h2>
              <p className="text-sm leading-6 text-slate-600">
                Juma Mohammedi&apos;s electrical and roofing network manages the entire physical
                mounting, wiring, and panel alignment process on your roof.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-amber-400">
                  <Truck className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Nottingham &amp; Midlands Coverage</h2>
              <p className="text-sm leading-6 text-slate-600">
                We coordinate direct-to-site transit of your premium LONGi EcoLife panels and
                battery racks across Nottinghamshire, ensuring all parts land cleanly and securely.
              </p>
            </div>
          </div>
        </section>

        <HowOrderingWorks showCta={false} />

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                  UK delivery areas
                </h2>
                <ul className="space-y-2 text-sm leading-6 text-slate-600">
                  {DELIVERY_AREAS.map((area) => (
                    <li key={area} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  Other UK mainland locations may be available — include your postcode in your quote
                  request and we will confirm.
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                  Areas &amp; exclusions
                </h2>
                <ul className="space-y-2 text-sm leading-6 text-slate-600">
                  {DELIVERY_EXCLUSIONS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                Delivery FAQ
              </h2>
              <div className="space-y-5 text-sm leading-6 text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Can you deliver to my home?</p>
                  <p className="mt-1">
                    Yes. Confirm your postcode and basic driveway or frontage access details in
                    your quote form, and we will schedule suitable delivery van access directly to
                    your home site.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">How long does a standard installation take?</p>
                  <p className="mt-1">
                    Most typical residential arrays take 1 to 2 days to fully mount, wire, and
                    connect to your home grid once scaffolding is live.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Can Juma install the panels?</p>
                  <p className="mt-1">
                    Yes. Juma has over 20 years of building experience in Nottingham. Select
                    installation on your quote request and we will include fitting options.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Are grid approvals handled?</p>
                  <p className="mt-1">
                    Yes. We manage your full DNO grid notification paperwork and arrange final MCS
                    certification handover end-to-end.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">How do I pay?</p>
                  <p className="mt-1">{PAYMENT_NOTE}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Ready to order?</h2>
              <p className="mb-6 text-sm leading-6 text-slate-300">
                Include your postcode, quantity, and whether you need installation. We respond{' '}
                {COMPANY.responseTime}.
              </p>

              <ul className="mb-6 space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  Site access and delivery timing confirmed in advance.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  Installation options included in your quote by default.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  DNO paperwork and final MCS handover fully managed.
                </li>
              </ul>

              <p className="mb-6 text-sm text-slate-400">
                Prefer to speak directly? Call{' '}
                <a href={`tel:${COMPANY.phone}`} className="font-semibold text-amber-400 hover:text-amber-300">
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
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
