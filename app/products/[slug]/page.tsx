'use client';

import Link from 'next/link';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productBySlug, LONGI_ECOLIFE_MODULE } from '../../lib/products';
import GuidePriceLabel from '../../../components/GuidePriceLabel';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const product = productBySlug[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold mb-2">Model Specifications Not Found</h2>
        <button
          onClick={() => router.push('/products')}
          className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm hover:bg-amber-600 transition"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const showModuleNameplate = Boolean(product.moduleModel);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push('/products')}
          className="text-sm font-medium text-slate-500 hover:text-amber-500 transition flex items-center gap-1 mb-8"
        >
          ← Back to Catalog
        </button>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="h-96 overflow-hidden rounded-xl bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover brightness-[0.95]"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">{product.name}</h1>
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-sm">
                0% VAT applies on this system when bundled as a full turnkey installation package.
              </div>
              <GuidePriceLabel className="mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Power:</span>
                <span className="font-semibold text-slate-800">{product.power}</span>
              </div>
              {product.moduleModel && (
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">Module Model:</span>
                  <span className="font-semibold text-slate-800 font-mono text-xs">
                    {product.moduleModel}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Module Technology:</span>
                <span className="font-semibold text-slate-800 text-right">{product.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Module Efficiency:</span>
                <span className="font-semibold text-slate-800">{product.efficiency}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Product Warranty:</span>
                <span className="font-semibold text-slate-800">{product.productWarranty ?? '—'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Linear Performance Warranty:</span>
                <span className="font-semibold text-slate-800">{product.linearPerformanceWarranty ?? '—'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Dimensions:</span>
                <span className="font-semibold text-slate-800 font-mono text-xs">{product.dimensions}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Unit Weight:</span>
                <span className="font-semibold text-slate-800">{product.weight}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Residential layout benefits
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  Premium sleek all-black aesthetics support cleaner roof integration and stronger
                  kerb appeal on modern residential properties.
                </li>
                <li>
                  Higher-efficiency cell architecture helps maximize usable generation from limited
                  home roof area.
                </li>
                <li>
                  Long-term product and performance warranties are designed for predictable household
                  energy planning and installation confidence.
                </li>
                <li>
                  Optimized dimensions and weight support practical handling, mounting, and array
                  planning for typical domestic roof structures.
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href={'/project-quote?product=' + slug}
                className="block w-full rounded-xl bg-amber-500 py-4 text-center text-base font-extrabold tracking-wide text-slate-950 shadow-sm transition hover:bg-amber-600"
              >
                Request Free Installation Quote
              </Link>
            </div>
          </div>
        </div>

        {showModuleNameplate && (
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                Module Nameplate
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                {LONGI_ECOLIFE_MODULE.brand} {LONGI_ECOLIFE_MODULE.model} electrical data
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                STC electrical and compliance values from the manufacturer nameplate for the panel
                used in this package.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Electrical specifications
                </h3>
                <div className="space-y-3 text-sm">
                  {LONGI_ECOLIFE_MODULE.electricalSpecs.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-4 border-b border-slate-100 pb-2"
                    >
                      <span className="text-slate-500">{row.label}</span>
                      <span className="shrink-0 font-semibold text-slate-800">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Testing & compliance
                </h3>
                <div className="space-y-3 text-sm">
                  {LONGI_ECOLIFE_MODULE.complianceSpecs.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between gap-4 border-b border-slate-100 pb-2"
                    >
                      <span className="text-slate-500">{row.label}</span>
                      <span className="shrink-0 text-right font-semibold text-slate-800">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-5 text-slate-500">
                  Values measured at Standard Test Conditions (STC). Full PDF datasheets are issued
                  with your fixed quote.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
