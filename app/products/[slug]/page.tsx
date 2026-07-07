'use client';

import { useCart } from '../../../components/CartContext';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { productBySlug, formatPrice } from '../../lib/products';
import GuidePriceLabel from '../../../components/GuidePriceLabel';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [animatingImage, setAnimatingImage] = useState<string | null>(null);
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
              <p className="text-amber-600 font-bold text-2xl mb-1">
                {formatPrice(product.priceInPence)}{' '}
                <span className="text-xs font-normal text-slate-500">/ unit</span>
              </p>
              <GuidePriceLabel className="mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Module Technology:</span>
                <span className="font-semibold text-slate-800 text-right">{product.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Module Efficiency:</span>
                <span className="font-semibold text-slate-800">{product.efficiency}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Dimensions:</span>
                <span className="font-semibold text-slate-800 font-mono text-xs">{product.dimensions}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Unit Weight:</span>
                <span className="font-semibold text-slate-800">{product.weight}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">Pallet Packaging:</span>
                <span className="font-semibold text-slate-800">{product.palletQty}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500 font-medium">40ft HQ Container Capacity:</span>
                <span className="font-semibold text-slate-800">{product.containerQty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Minimum Order Quantity:</span>
                <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs">{product.moq}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  setAnimatingImage(product.image);
                  addToCart({
                    slug,
                    name: product.name,
                    price: product.priceInPence,
                    image: product.image,
                  });
                  setTimeout(() => setAnimatingImage(null), 800);
                }}
                className="w-full rounded-xl bg-amber-500 py-3.5 text-base font-bold tracking-wide text-slate-950 shadow-sm transition hover:bg-amber-600"
              >
                Add to Basket
              </button>

              <button
                onClick={() => router.push(`/project-quote?product=${slug}`)}
                className="w-full rounded-xl bg-slate-900 py-3.5 text-base font-bold tracking-wide text-white shadow-sm transition hover:bg-slate-800"
              >
                Request Free Quote
              </button>

              <AnimatePresence>
                {animatingImage && (
                  <motion.img
                    src={animatingImage}
                    initial={{ position: 'fixed', top: '40%', left: '40%', width: 200, opacity: 1 }}
                    animate={{
                      top: 'calc(100vh - 80px)',
                      left: 'calc(100vw - 80px)',
                      width: 40,
                      opacity: 0,
                      scale: 0.2,
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed z-[99999] pointer-events-none mix-blend-multiply"
                    alt=""
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
