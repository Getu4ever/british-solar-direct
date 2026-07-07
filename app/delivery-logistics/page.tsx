import Footer from '../../components/Footer';
import HeroSlideIn from '../../components/HeroSlideIn';

export default function DeliveryLogisticsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <div className="flex-1">
      <section className="relative border-b border-slate-200 bg-slate-950 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/delivery-hero.webp"
      alt="Logistics and Delivery Background"
      className="h-full w-full object-cover opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/32 to-slate-950/15" />
  </div>

  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
    <HeroSlideIn>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
        Delivery & Logistics
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        Commercial solar panel delivery for UK and project-based orders
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
        We support trade buyers with clear delivery planning, pallet-based order handling,
        and coordinated logistics for larger commercial requirements.
      </p>
    </HeroSlideIn>
  </div>
</section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">UK delivery</h2>
              <p className="text-sm leading-6 text-slate-600">
                Pallet-based delivery support for installers, trade buyers, and commercial projects
                across the UK, with lead times confirmed at quote stage.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Bulk order handling</h2>
              <p className="text-sm leading-6 text-slate-600">
                We support larger order volumes with planning around pallet quantities, site
                access, unloading requirements, and phased delivery where needed.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Project coordination</h2>
              <p className="text-sm leading-6 text-slate-600">
                For commercial and wholesale procurement, we provide delivery guidance aligned to
                order volume, product line, and project timing.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <h2 className="mb-10 text-3xl font-bold tracking-tight text-slate-900">
              Delivery process
            </h2>

            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-500">
                  Step 1
                </p>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Quote review</h3>
                <p className="text-sm leading-6 text-slate-600">
                  We confirm product selection, quantity, destination, and delivery requirements.
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-500">
                  Step 2
                </p>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Order planning</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Pallet counts, site access, and any commercial handling notes are reviewed before
                  dispatch.
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-500">
                  Step 3
                </p>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Dispatch coordination</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Delivery timing is scheduled according to stock position, route planning, and
                  order profile.
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-500">
                  Step 4
                </p>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Delivery completion</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Goods arrive in line with the agreed commercial schedule and handling plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                Delivery considerations
              </h2>
              <div className="space-y-4 text-sm leading-6 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Site access:</span> Please confirm
                  whether the delivery address can accommodate pallet unloading and commercial
                  vehicle access.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Order size:</span> Larger orders
                  may require phased deliveries depending on site readiness and storage capacity.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Product availability:</span> Lead
                  times vary by product line and order profile, and are confirmed during quoting.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Commercial coordination:</span>{' '}
                  Project buyers should include timelines, access notes, and any handling
                  requirements in the quote request.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Need delivery guidance?</h2>
              <p className="text-sm leading-6 text-slate-300">
                Include your location, quantity, and preferred delivery window in your quote
                request so we can prepare the right commercial plan.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
