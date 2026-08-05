import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
import GuidePriceLabel from '../../components/GuidePriceLabel';
import { BatteryCharging, Building2, Home, House, ShieldCheck, SunMedium, Zap } from 'lucide-react';
import { products } from '../lib/products';
import { PRODUCT_RANGE } from '../lib/company';

const guideSystemPriceBySlug: Record<string, string> = {
  'cottage-setup-4kw': 'From £5,500 (0% VAT)',
  'family-homestead-8kw': 'From £9,750 (0% VAT)',
  'estate-powerhouse-12kw': 'Custom Quote Required',
};

const rangeIcons = [Home, House, Building2];
const rangeAccents = [
  'from-amber-50 to-white text-amber-600',
  'from-emerald-50 to-white text-emerald-600',
  'from-sky-50 to-white text-sky-600',
];

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/products-hero.webp"
              alt="Premium residential solar installation packages"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                Products
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Premium Tier-1 Solar Packages for Homeowners
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                Explore our three flagship LONGi EcoLife installation packages for UK homeowners.
                Every guide price includes full scaffolding, professional labor, DNO approval, and
                final MCS certification handover.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-sm">
                  <SunMedium className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Category</p>
                <p className="mt-2 text-base font-medium text-slate-700">Solar Panels</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Premium LONGi homeowner systems designed for efficient UK rooftop performance.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-sm">
                  <Home className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Supply Model</p>
                <p className="mt-2 text-base font-medium text-slate-700">Complete Turnkey Packages</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Built around Cottage, Family Homestead, and Estate Powerhouse system sizes.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-sm">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-slate-900">Order Support</p>
                <p className="mt-2 text-base font-medium text-slate-700">Managed Installation Handover</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Scaffolding, labor, DNO grid notifications, and MCS handover certificates included.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">Three flagship residential packages</h2>
            <p className="mb-8 max-w-2xl text-sm text-slate-500">
                  Turnkey homeowner installation packages built around our flagship LONGi EcoLife
              LR7-54HVB-480M 480W panel. Every guide price includes scaffolding, installation labor, and final compliance certification.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_RANGE.map((item, index) => {
                const RangeIcon = rangeIcons[index] ?? Home;
                const accentClass = rangeAccents[index] ?? 'from-slate-50 to-white text-slate-700';

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-sm">
                      <RangeIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <span
                        className={`rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          item.badge === 'on-request'
                            ? 'from-amber-100 to-amber-50 text-amber-700'
                            : item.badge === 'most-popular'
                              ? 'from-emerald-100 to-emerald-50 text-emerald-700'
                              : 'from-sky-100 to-sky-50 text-sky-700'
                        }`}
                      >
                        {item.badge === 'in-catalogue'
                          ? 'SMALL HOME PACKAGE'
                          : item.badge === 'most-popular'
                            ? 'MOST POPULAR'
                            : 'LARGE HOME PACKAGE'}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className={`mt-5 rounded-2xl bg-gradient-to-r p-[1px] ${accentClass}`}>
                      <div className="rounded-[15px] bg-white/90 px-4 py-3 text-xs font-medium text-slate-600">
                        Full scaffolding, premium LONGi hardware, installation labor, and certification handover included.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Compare Packages
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Choose the right LONGi setup for your home
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                All three packages already include scaffolding, premium installation labor, DNO
                paperwork, and final MCS certification sign-off within the quoted system scope.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
              <div className="grid border-b border-slate-200 bg-slate-900 text-white lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="border-b border-slate-800 px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 lg:border-b-0 lg:border-r">
                  Package Comparison
                </div>
                <div className="border-b border-slate-800 px-6 py-5 lg:border-b-0 lg:border-r">
                  <p className="text-lg font-bold">Cottage Setup</p>
                  <p className="mt-1 text-sm text-slate-300">Small home / compact roof</p>
                </div>
                <div className="border-b border-slate-800 px-6 py-5 lg:border-b-0 lg:border-r">
                  <p className="text-lg font-bold text-amber-300">Family Homestead</p>
                  <p className="mt-1 text-sm text-slate-300">Standard family home</p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-lg font-bold">Estate Powerhouse</p>
                  <p className="mt-1 text-sm text-slate-300">Large home / high usage</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 lg:border-b-0 lg:border-r">
                  Panel Layout
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  9 x LONGi LR7-54HVB-480M all-black panels
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  18 x LONGi LR7-54HVB-480M all-black panels
                </div>
                <div className="px-6 py-4 text-sm text-slate-600">
                  26 x LONGi LR7-54HVB-480M all-black panels
                </div>
              </div>

              <div className="grid border-t border-slate-100 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 lg:border-b-0 lg:border-r">
                  Output
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  4.32kW Array
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  8.64kW Array
                </div>
                <div className="px-6 py-4 text-sm text-slate-600">
                  12.48kW Array
                </div>
              </div>

              <div className="grid border-t border-slate-100 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 lg:border-b-0 lg:border-r">
                  Battery Storage
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  5kWh Hybrid Battery
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  10kWh Storage Stack
                </div>
                <div className="px-6 py-4 text-sm text-slate-600">
                  15kWh Multi-Stack Array
                </div>
              </div>

              <div className="grid border-t border-slate-100 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 lg:border-b-0 lg:border-r">
                  Included in Guide Price
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  Scaffolding, labor, DNO, MCS
                </div>
                <div className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600 lg:border-b-0 lg:border-r">
                  Scaffolding, labor, DNO, MCS
                </div>
                <div className="px-6 py-4 text-sm text-slate-600">
                  Scaffolding, labor, DNO, MCS
                </div>
              </div>

              <div className="grid border-t border-slate-100 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-900 lg:border-r">
                  Turnkey Guide Price
                </div>
                <div className="px-6 py-4 text-sm font-semibold text-slate-900 lg:border-r">
                  {guideSystemPriceBySlug['cottage-setup-4kw']}
                </div>
                <div className="px-6 py-4 text-sm font-semibold text-slate-900 lg:border-r">
                  {guideSystemPriceBySlug['family-homestead-8kw']}
                </div>
                <div className="px-6 py-4 text-sm font-semibold text-slate-900">
                  {guideSystemPriceBySlug['estate-powerhouse-12kw']}
                </div>
              </div>

              <div className="grid border-t border-slate-100 bg-slate-50 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
                <div className="px-6 py-4 text-sm font-semibold text-slate-900 lg:border-r">
                  Next Step
                </div>
                <div className="px-6 py-4 lg:border-r">
                  <Link href="/project-quote?product=cottage-setup-4kw" className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600">
                    Request Quote
                  </Link>
                </div>
                <div className="px-6 py-4 lg:border-r">
                  <Link href="/project-quote?product=family-homestead-8kw" className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600">
                    Request Quote
                  </Link>
                </div>
                <div className="px-6 py-4">
                  <Link href="/project-quote?product=estate-powerhouse-12kw" className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600">
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 pt-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Package breakdowns
            </h2>
            <span className="text-sm text-slate-500">{products.length} residential packages</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => {
              const ProductIcon = rangeIcons[index] ?? SunMedium;

              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 shadow-sm">
                      <ProductIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {product.power}
                    </span>
                  </div>

                  <div className="mb-5 flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mb-3">
                    <p className="mb-1 text-sm font-medium text-amber-600">{product.brand}</p>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                      <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                      {product.efficiency}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                      <BatteryCharging className="h-3.5 w-3.5" aria-hidden="true" />
                      {product.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {product.productWarranty}
                    </span>
                  </div>

                  <p className="mb-4 flex-1 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-900">Turnkey Guide Price:</span>{' '}
                      {guideSystemPriceBySlug[product.slug] ?? 'Custom Quote Required'}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Ideal Home:</span>{' '}
                      {product.category}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">What&apos;s Included:</span>{' '}
                      Full scaffolding, installation labor, DNO approvals, and MCS certification.
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Installation Window:</span>{' '}
                      {product.leadTime}
                    </p>
                  </div>

                  <div className="mt-5 text-sm font-semibold text-amber-600">
                    View package details →
                  </div>
                </Link>
              );
            })}
          </div>

          <GuidePriceLabel className="mt-8 text-center" />
        </section>

        <HowOrderingWorks variant="dark" />
      </div>

      <Footer />
    </div>
  );
}
