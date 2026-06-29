import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <main className="flex-1">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              About
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Trade-focused solar panel supply for commercial buyers
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              British Solar Direct is built to support installers, project buyers, and wholesale
              customers with professional product access, clear quoting, and dependable commercial
              order coordination.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
                Our approach
              </h2>

              <div className="space-y-5 text-sm leading-7 text-slate-600">
                <p>
                  British Solar Direct is designed as a professional B2B supply platform for solar
                  installers, EPCs, developers, wholesalers, and project buyers seeking reliable
                  access to photovoltaic modules.
                </p>

                <p>
                  Our focus is on making commercial procurement clearer and more efficient, with a
                  straightforward catalogue, project quote support, and structured delivery
                  planning around order requirements.
                </p>

                <p>
                  We aim to present solar module sourcing in a way that reflects the standards
                  expected by serious trade customers: clear product information, practical quoting,
                  and commercially focused communication.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Who we serve</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <p>Solar installers and electrical contractors.</p>
                  <p>Commercial project procurement teams.</p>
                  <p>Wholesalers, resellers, and repeat trade buyers.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">What matters to us</h2>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>Professional communication.</p>
                  <p>Clear commercial process.</p>
                  <p>Reliable product and order guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
