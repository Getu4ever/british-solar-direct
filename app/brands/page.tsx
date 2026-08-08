import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';

const longiPillars = [
  {
    name: 'Tier-1 Global Leadership',
    slug: 'tier-1-global-leadership',
    description:
      'LONGi Solar operates at genuine global scale, supplying premium residential and utility markets worldwide. That Tier-1 footprint gives Nottingham homeowners confidence that their system is backed by a deeply established manufacturer with the strength to support long-term product commitments.',
    featuredProduct: 'Top 3 Global Producer',
    href: '/project-quote?product=cottage-setup-4kw',
    iconWrap:
      'flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-black text-amber-400',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
        <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3.5 9.5h17M3.5 14.5h17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'HPBC 2.0 Cell Architecture',
    slug: 'hpbc-2-0-cell-architecture',
    description:
      'LONGi EcoLife modules use breakthrough HPBC 2.0 back-contact cell design, removing visible front busbars and creating a cleaner all-black surface. That higher-efficiency architecture is engineered to capture more usable energy under the variable and cloudy conditions typical across UK rooftops.',
    featuredProduct: 'Premium 23.5% Module Efficiency',
    href: '/project-quote?product=family-homestead-8kw',
    iconWrap:
      'flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    name: '25-to-30 Year Performance Protection',
    slug: 'industry-leading-warranties',
    description:
      'Every LONGi EcoLife installation is supported by premium long-duration protection, combining a 25-year product warranty with a 30-year linear output performance guarantee. That means your system is engineered not just for day-one output, but for dependable generation across decades of ownership.',
    featuredProduct: '25-Yr Product / 30-Yr Output Warranty',
    href: '/project-quote?product=estate-powerhouse-12kw',
    iconWrap:
      'flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-extrabold text-emerald-400',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 3.5 19 6.5v5.2c0 4.4-2.9 7.5-7 8.8-4.1-1.3-7-4.4-7-8.8V6.5L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9 12.2 11.1 14.3 15.2 10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
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
                We exclusively specify and install premium LONGi EcoLife modules on Nottingham
                homes, designing each system layout around your roof. By building our turnkey
                workflow around one world-class manufacturer, we deliver consistent quality,
                stronger manufacturer backing, and guide pricing that already includes scaffolding,
                labor, and final compliance handover.
              </p>
            </HeroSlideIn>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Why We Install LONGi
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Three reasons LONGi EcoLife sits at the center of our homeowner offering
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {longiPillars.map((brand) => (
              <article
                key={brand.slug}
                className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl transition-all duration-300 hover:border-amber-500/30"
              >
                <div>
                  <div className={brand.iconWrap}>{brand.icon}</div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{brand.name}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">{brand.description}</p>
                </div>

                <div className="mt-6">
                  <div className="mb-5 rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-300">
                    <p>
                      <span className="font-semibold text-white">Featured product:</span>{' '}
                      {brand.featuredProduct}
                    </p>
                  </div>

                  <Link
                    href={brand.href}
                    className="text-sm font-semibold text-amber-400 transition hover:text-amber-300"
                  >
                    Apply this to my quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
