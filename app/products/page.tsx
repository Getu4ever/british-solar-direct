import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import HowOrderingWorks from '../../components/HowOrderingWorks';
import GuidePriceLabel from '../../components/GuidePriceLabel';
import { products, formatPrice } from '../lib/products';
import { PRODUCT_RANGE } from '../lib/company';

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/products-hero.webp"
              alt="Solar panel inventory and trade supply background"
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
                These six core modules are engineered for residential roof optimization and long-term
                household performance. Pricing shown reflects estimated full-system supply and
                professional installation bundles, including scaffolding, DNO approval, and MCS
                certification sign-off.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Category</p>
                <p className="mt-1 text-sm text-slate-500">Solar Panels</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Supply Model</p>
                <p className="mt-1 text-sm text-slate-500">Complete Turnkey Packages</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Order Support</p>
                <p className="mt-1 text-sm text-slate-500">
                  Full project management, DNO grid notifications, and MCS handover certificates
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">Product range</h2>
            <p className="mb-8 max-w-2xl text-sm text-slate-500">
              Turnkey homeowner installation packages built around our flagship LONGi EcoLife
              480W panel. Complete system delivery, installation, and handover managed by Juma.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {PRODUCT_RANGE.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.badge === 'on-request'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.badge === 'in-catalogue'
                        ? 'IN CATALOGUE'
                        : item.badge === 'most-popular'
                          ? 'MOST POPULAR'
                          : 'ON REQUEST'}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Solar panel catalogue
            </h2>
            <span className="text-sm text-slate-500">{products.length} products</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-amber-500 hover:shadow-md"
              >
                <div className="mb-5 flex h-64 items-center justify-center rounded-xl bg-slate-100 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 text-sm font-medium text-amber-600">{product.brand}</p>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500">
                      {product.name}
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {product.power}
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Estimated System Cost:</span>{' '}
                    Personalized full-installation pricing is generated via our custom quote engine
                    form.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Category:</span>{' '}
                    {product.category}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Availability:</span>{' '}
                    {product.availability}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Lead time:</span>{' '}
                    {product.leadTime}
                  </p>
                </div>

                <div className="mt-5 text-sm font-semibold text-amber-600">
                  View product details →
                </div>
              </Link>
            ))}
          </div>

          <GuidePriceLabel className="mt-8 text-center" />
        </section>

        <HowOrderingWorks variant="dark" />
      </div>

      <Footer />
    </div>
  );
}
