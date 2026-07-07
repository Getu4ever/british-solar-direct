import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <div className="flex-1">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Privacy
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Privacy policy
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              This page explains, in general terms, how British Solar Direct may collect and use
              information submitted through the website.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 text-sm leading-7 text-slate-600">
              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Information you provide</h2>
                <p>
                  We may collect information you submit through forms on this website, such as your
                  name, company details, email address, order interest, and message content.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">How information is used</h2>
                <p>
                  Information submitted through the website may be used to respond to enquiries,
                  prepare quotes, discuss products, support delivery planning, and improve the
                  commercial buying experience.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Data handling</h2>
                <p>
                  Information is handled for operational, communication, and customer support
                  purposes in connection with trade enquiries and commercial requests.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Third-party services</h2>
                <p>
                  The website may rely on external service providers or technical platforms to
                  support hosting, communications, analytics, payments, or form handling as the
                  platform develops.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Contact</h2>
                <p>
                  If you have questions about privacy or data handling, please contact British Solar
                  Direct through the contact page.
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
