'use client';

import Link from 'next/link';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productBySlug, formatPrice } from '../../lib/products';
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
          <div className="bg-slate-100 rounded-xl p-6 flex items-center justify-center h-96">
            <img
              id="product-fly-image"
              src={product.image}
              alt={product.name}
              className="h-full object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">{product.name}</h1>
              <p className="text-amber-600 font-bold text-2xl mb-2">{formatPrice(product.priceInPence)}</p>
              <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                0% VAT Incentive Applies — Valid when bundled as a full turnkey
                supply-and-installation package.
              </div>
              <GuidePriceLabel className="mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Power:</span>
                <span className="font-semibold text-slate-800">{product.power}</span>
              </div>
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
      </div>
    </div>
  );
}
