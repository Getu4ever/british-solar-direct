import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
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
                {COMPANY.director} personally manages pallet delivery, site access, and professional
                installation across Nottingham and surrounding areas — so you deal with one reliable
                contact from quote to completion.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Homeowner delivery</h2>
              <p className="text-sm leading-6 text-slate-600">
                Pallet or panel delivery to residential addresses across Nottinghamshire and the
                East Midlands. Lead times confirmed at quote stage — typically 2–4 working days on
                stocked lines.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Professional installation</h2>
              <p className="text-sm leading-6 text-slate-600">
                Juma&apos;s building team can arrange roof mounting and system installation where
                required. Tick &ldquo;installation&rdquo; on your quote request and we will include
                options in your pro-forma.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Trade & bulk orders</h2>
              <p className="text-sm leading-6 text-slate-600">
                Installers and project buyers receive pallet-based delivery planning, phased dispatch
                where needed, and commercial handling notes confirmed before dispatch.
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
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                Delivery FAQ
              </h2>
              <div className="space-y-5 text-sm leading-6 text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Can you deliver to my home?</p>
                  <p className="mt-1">
                    Yes — most of our customers are local homeowners. Confirm your postcode in the
                    quote form and we will verify access and delivery options.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Do I need a forklift or unloading equipment?</p>
                  <p className="mt-1">
                    Pallet deliveries typically require safe ground-level access. Tell us about your
                    driveway, lane width, or any access restrictions in your project notes.
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
