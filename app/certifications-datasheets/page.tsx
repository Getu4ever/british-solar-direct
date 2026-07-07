import Footer from '../../components/Footer';

const resources = [
  {
    title: 'Product Datasheets',
    description:
      'Technical product specifications covering module dimensions, power class, efficiency, and core electrical characteristics.',
  },
  {
    title: 'Warranty Documents',
    description:
      'Manufacturer warranty information for product coverage and long-term performance expectations.',
  },
  {
    title: 'Compliance Information',
    description:
      'Supporting documentation relevant to commercial product review, installation planning, and procurement checks.',
  },
  {
    title: 'Technical Support Files',
    description:
      'Structured technical reference material to support module comparison and project-level decision making.',
  },
];

export default function CertificationsDatasheetsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <div className="flex-1">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Certifications & Datasheets
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Technical documents for product review and procurement
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Access structured product documentation to support specification review, commercial
              comparison, and project planning across the British Solar Direct catalogue.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
                  {resource.title}
                </h2>
                <p className="text-sm leading-6 text-slate-600">{resource.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
                  What buyers typically review
                </h2>
                <div className="space-y-4 text-sm leading-7 text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Electrical performance:</span>{' '}
                    Buyers often compare wattage class, module efficiency, and broader fit for
                    project requirements.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Physical specifications:</span>{' '}
                    Dimensions, unit weight, and packaging format help determine transport and
                    installation planning.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Commercial review:</span>{' '}
                    Datasheets and supporting documentation are often reviewed alongside quoting and
                    delivery discussions.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Document access</h2>
                <p className="text-sm leading-6 text-slate-300">
                  As the catalogue expands, this area can be connected to downloadable files for
                  each module line, manufacturer, and product page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
