import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <main className="flex-1">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Terms
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Terms of use
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              These terms provide general guidance on the use of the British Solar Direct website
              and the information presented across the platform.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 text-sm leading-7 text-slate-600">
              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Website content</h2>
                <p>
                  Information on this website is provided for general commercial and informational
                  purposes. Product details, availability, lead times, and pricing may change and
                  should be confirmed through direct enquiry or quotation.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Product information</h2>
                <p>
                  Product descriptions, specifications, and indicative commercial details are
                  presented to support trade review and procurement discussion. Final order terms
                  should always be confirmed before purchase.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Quotes and enquiries</h2>
                <p>
                  Submission of a quote request, trade application, or contact enquiry does not
                  create a binding agreement. Commercial supply remains subject to review,
                  confirmation, and agreed order terms.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Availability and changes</h2>
                <p>
                  British Solar Direct may update, amend, or remove product listings, technical
                  information, route structure, or website content without prior notice as the
                  platform develops.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Contact</h2>
                <p>
                  For commercial clarification on product supply, pricing, or order handling, use
                  the contact page or request a project quote through the website.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
