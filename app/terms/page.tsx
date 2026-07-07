import Footer from '../../components/Footer';
import { COMPANY, PAYMENT_NOTE } from '../lib/company';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Terms
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Terms of supply</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              General terms for using the British Solar Direct website and purchasing solar modules
              for residential or commercial use.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-8 text-sm leading-7 text-slate-600">
              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Residential &amp; trade supply</h2>
                <p>
                  British Solar Direct supplies Tier-1 solar modules to homeowners, installers, and
                  commercial buyers. Product listings show guide prices (ex. VAT). Final pricing,
                  stock availability, and delivery terms are confirmed in your written quote or
                  pro-forma invoice.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Quotes &amp; pro-forma invoices</h2>
                <p>
                  Submitting a quote request does not create a binding contract. A supply agreement
                  is formed only when you approve a pro-forma invoice or complete a confirmed online
                  checkout. {PAYMENT_NOTE}
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Delivery &amp; installation</h2>
                <p>
                  Delivery is coordinated by {COMPANY.director} across Nottingham and agreed UK
                  areas. Installation, where requested, is arranged separately and confirmed in your
                  quote. Site access, unloading, and any special handling requirements must be
                  disclosed at quote stage.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Returns &amp; bulk orders</h2>
                <p>
                  Solar modules are bulky commercial goods. Returns are handled on a case-by-case
                  basis for defective or incorrectly supplied product only. Bulk and pallet orders
                  are non-returnable once dispatched unless agreed in writing beforehand. Report any
                  transit damage within 24 hours of delivery with photographic evidence.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Product information</h2>
                <p>
                  Specifications, lead times, and guide prices on this website are indicative and may
                  change without notice. Always confirm final details before payment. Manufacturer
                  warranties apply as stated in the product documentation issued with your order.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">Contact</h2>
                <p>
                  For clarification on pricing, delivery, or order handling, contact {COMPANY.director}{' '}
                  via the contact page or request a project quote through the website.
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
