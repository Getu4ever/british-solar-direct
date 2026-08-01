import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';
import { Globe2, ShieldCheck, SunMedium } from 'lucide-react';

const longiPillars = [
  {
    name: 'Tier-1 Global Leadership',
    slug: 'tier-1-global-leadership',
    description:
      'LONGi Solar operates at genuine global scale, supplying premium residential and utility markets worldwide. That Tier-1 footprint gives Nottingham homeowners confidence that their system is backed by a deeply established manufacturer with the strength to support long-term product commitments.',
    featuredProduct: 'Top 3 Global Producer',
    href: '/project-quote?product=cottage-setup-4kw',
    icon: Globe2,
  },
  {
    name: 'HPBC 2.0 Cell Architecture',
    slug: 'hpbc-2-0-cell-architecture',
    description:
      'LONGi EcoLife modules use breakthrough HPBC 2.0 back-contact cell design, removing visible front busbars and creating a cleaner all-black surface. That higher-efficiency architecture is engineered to capture more usable energy under the variable and cloudy conditions typical across UK rooftops.',
    featuredProduct: 'Premium 23.5% Module Efficiency',
    href: '/project-quote?product=family-homestead-8kw',
    icon: SunMedium,
  },
  {
    name: '25-to-30 Year Performance Protection',
    slug: 'industry-leading-warranties',
    description:
      'Every LONGi EcoLife installation is supported by premium long-duration protection, combining a 25-year product warranty with a 30-year linear output performance guarantee. That means your system is engineered not just for day-one output, but for dependable generation across decades of ownership.',
    featuredProduct: '25-Yr Product / 30-Yr Output Warranty',
    href: '/project-quote?product=estate-powerhouse-12kw',
    icon: ShieldCheck,
  },
];

export default function BrandsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/brands-hero.webp"
              alt="LONGi EcoLife solar technology"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
            <HeroSlideIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                LONGi Solar
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Our Premium Technology Partner: LONGi Solar
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                We exclusively design and install premium LONGi EcoLife residential systems for
                Nottingham homeowners. By focusing our turnkey workflow around one world-class
                technology partner, we deliver cleaner design consistency, stronger manufacturer
                confidence, and guide pricing that already includes scaffolding, labor, and final
                compliance handover.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="pointer-events-none absolute inset-x-0 top-10 h-40 bg-gradient-to-b from-amber-50/70 to-transparent" />
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Why We Install LONGi
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Three reasons LONGi EcoLife sits at the center of our homeowner offering
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {longiPillars.map((brand) => {
              const BrandIcon = brand.icon;

              return (
                <div
                  key={brand.slug}
                  className="relative flex flex-col rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-amber-400 shadow-sm">
                    <BrandIcon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-lg font-bold text-amber-600">
                    {brand.name.slice(0, 2).toUpperCase()}
                  </div>

                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">
                    {brand.name}
                  </h2>

                  <p className="mb-6 flex-1 text-sm leading-6 text-slate-600">
                    {brand.description}
                  </p>

                  <div className="mb-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Featured product:</span>{' '}
                      {brand.featuredProduct}
                    </p>
                  </div>

                  <Link
                    href={brand.href}
                    className="text-sm font-semibold text-amber-600 transition hover:text-amber-700"
                  >
                    Apply this to my quote
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
