import Link from 'next/link';
import Footer from '../../components/Footer';

const products = [
  {
    slug: 'vertex-s-450w',
    name: 'Vertex S+ 450W',
    brand: 'Trina Solar',
    category: 'Residential / Light Commercial',
    power: '450W',
    availability: 'In UK stock',
    leadTime: '2-3 working days',
    description: 'N-type monocrystalline dual-glass module designed for efficient output in residential and light commercial installations.',
    image: '/images/vertex.webp',
  },
  {
    slug: 'himo-6-580w',
    name: 'Hi-MO 6 Commercial 580W',
    brand: 'LONGi',
    category: 'Commercial / Industrial',
    power: '580W',
    availability: 'Forward order',
    leadTime: 'Project and container supply',
    description: 'High-output commercial module suited to warehouse roofs, larger commercial sites, and bulk procurement.',
    image: '/images/himo.webp',
  },
  {
    slug: 'ultra-black-430w',
    name: 'Ultra Black 430W',
    brand: 'JA Solar',
    category: 'Premium Residential',
    power: '430W',
    availability: 'In UK stock',
    leadTime: '2-3 working days',
    description: 'Full-black module intended for premium residential projects where visual finish matters alongside performance.',
    image: '/images/ultrablack.webp',
  },
  {
    slug: 'tiger-neo-475w',
    name: 'Tiger Neo 475W',
    brand: 'Jinko Solar',
    category: 'Residential / Commercial',
    power: '475W',
    availability: 'In UK stock',
    leadTime: 'Immediate dispatch',
    description: 'TOPCon N-type technology delivering excellent efficiency and low degradation for versatile installations.',
    image: '/images/tiger-neo.webp',
  },
  {
    slug: 'deepblue-650w',
    name: 'DeepBlue 4.0 650W',
    brand: 'JA Solar',
    category: 'Commercial / Utility',
    power: '650W',
    availability: 'Forward order',
    leadTime: 'Container & project supply',
    description: 'High-power TOPCon module with outstanding efficiency for large-scale commercial and ground-mount projects.',
    image: '/images/deepblue.webp',
  },
  {
    slug: 'q-tron-440w',
    name: 'Q.TRON BLK 440W',
    brand: 'Qcells',
    category: 'Premium Residential',
    power: '440W',
    availability: 'In UK stock',
    leadTime: '2-4 working days',
    description: 'All-black aesthetic panel with advanced cell technology for high performance and elegant roof integration.',
    image: '/images/qtron.webp',
  },
];

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <main className="flex-1">
      <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/products-hero.webp"
      alt="Solar Panel Background"
      className="h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/40" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
      Products
    </p>
    <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
      Solar panels for trade, wholesale, and project supply
    </h1>
    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
      Browse current module lines available for UK dispatch and larger commercial procurement.
    </p>
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
                <p className="mt-1 text-sm text-slate-500">
                  UK stock lines and project-based forward orders
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">Order Support</p>
                <p className="mt-1 text-sm text-slate-500">
                  Trade pricing, project quotes, and delivery coordination
                </p>
              </div>
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
        </section>
      </main>

      <Footer />
    </div>
  );
}