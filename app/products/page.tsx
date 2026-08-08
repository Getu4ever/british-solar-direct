import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import GuidePriceLabel from '../../components/GuidePriceLabel';
import { products } from '../lib/products';

const guideSystemPriceBySlug: Record<string, string> = {
  'cottage-setup-4kw': 'From £5,500 (0% VAT)',
  'family-homestead-8kw': 'From £9,750 (0% VAT)',
  'estate-powerhouse-12kw': 'Custom Quote Required',
};

const packageHighlightsBySlug: Record<string, [string, string, string]> = {
  'cottage-setup-4kw': [
    '9x Premium LONGi 480W Panels',
    '5kWh Intelligent Battery Stack',
    'Scaffolding & DNO Included',
  ],
  'family-homestead-8kw': [
    '18x Premium LONGi 480W Panels',
    '10kWh Storage Battery Stack',
    'Full MCS Grid Certification',
  ],
  'estate-powerhouse-12kw': [
    '26+ Premium LONGi 480W Panels',
    '15kWh Custom Scalable Stack',
    'EV Smart Charging Optimized',
  ],
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
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

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                  Three Flagship Installation Packages
                </h2>
                <p className="max-w-2xl text-slate-500">
                  A focused selection of complete solar setups using premium all-black LONGi EcoLife
                  technology, tailored directly to standard UK home footprints.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => {
                const highlights = packageHighlightsBySlug[product.slug] ?? [
                  product.type,
                  product.efficiency,
                  product.availability ?? 'Turnkey Installation',
                ];

                return (
                  <article
                    key={product.slug}
                    className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <div>
                      <img
                        src={product.image}
                        alt={`${product.name} installation`}
                        className="mb-5 h-56 w-full rounded-xl object-cover brightness-[0.95]"
                      />

                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="mb-1 text-sm font-medium text-amber-600">{product.brand}</p>
                          <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            index === 1
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {index === 1 ? 'Most Popular' : 'Turnkey Package'}
                        </span>
                      </div>

                      <ul className="mb-4 space-y-2">
                        {highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start text-sm text-slate-600">
                            <span className="mr-2 text-amber-500" aria-hidden="true">
                              ✓
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-4 border-t border-slate-100 pt-4">
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">Guide System Price:</span>{' '}
                        {guideSystemPriceBySlug[product.slug] ?? 'Custom Quote Required'}
                      </p>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-block text-sm font-semibold text-amber-600 transition hover:text-amber-700"
                      >
                        View package details →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <GuidePriceLabel className="mt-8 text-center" />
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
                  <Link
                    href="/project-quote?product=cottage-setup-4kw"
                    className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
                  >
                    Request Quote
                  </Link>
                </div>
                <div className="px-6 py-4 lg:border-r">
                  <Link
                    href="/project-quote?product=family-homestead-8kw"
                    className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
                  >
                    Request Quote
                  </Link>
                </div>
                <div className="px-6 py-4">
                  <Link
                    href="/project-quote?product=estate-powerhouse-12kw"
                    className="inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
