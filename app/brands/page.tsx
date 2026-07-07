import Link from 'next/link';
import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';

const brands = [
  {
    name: 'Trina Solar',
    slug: 'trina-solar',
    description:
      'Global manufacturer known for high-efficiency photovoltaic modules used across residential, commercial, and utility-scale projects.',
    featuredProduct: 'Vertex S+ 450W',
    href: '/products/vertex-s-450w',
  },
  {
    name: 'LONGi',
    slug: 'longi',
    description:
      'Established solar brand focused on high-performance monocrystalline technology for commercial and large-scale deployment.',
    featuredProduct: 'Hi-MO 6 Commercial 580W',
    href: '/products/himo-6-580w',
  },
  {
    name: 'JA Solar',
    slug: 'ja-solar',
    description:
      'Well-known manufacturer supplying reliable, high-output modules for installers, trade buyers, and project procurement.',
    featuredProduct: 'Ultra Black 430W',
    href: '/products/ultra-black-430w',
  },
];

export default function BrandsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      

      <div className="flex-1">
      <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/brands-hero.webp" 
      alt="Solar Panel Background"
      className="h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/40" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
    <HeroSlideIn>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
        Brands
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        Tier-1 solar manufacturers for trade supply
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
        Browse the manufacturers behind our current product catalogue and view representative
        module lines available for trade, wholesale, and project procurement.
      </p>
    </HeroSlideIn>
  </div>
</section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div
                key={brand.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
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
                  View product details
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
