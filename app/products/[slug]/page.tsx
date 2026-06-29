'use client';

import { useCart } from '../../../components/CartContext';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Extended Tier-1 B2B solar panel inventory
const productDatabase: Record<string, {
  name: string;
  price: string;
  image: string;
  type: string;
  efficiency: string;
  weight: string;
  dimensions: string;
  palletQty: string;
  containerQty: string;
  moq: string;
  description: string;
}> = {
  'vertex-s-450w': {
    name: 'Vertex S+ 450W',
    price: '£42.00',
    image: '/images/vertex.webp',
    type: 'N-type Monocrystalline Dual-Glass',
    efficiency: '22.5%',
    weight: '21.0 kg',
    dimensions: '1762 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description: 'The standard choice for premium UK installations. Features ultra-reliable dual-glass protection and excellent low-light performance.'
  },
  'himo-6-580w': {
    name: 'Hi-MO 6 Commercial 580W',
    price: '£56.50',
    image: '/images/himo.webp',
    type: 'HPBC Monocrystalline Single-Glass',
    efficiency: '22.8%',
    weight: '27.5 kg',
    dimensions: '2278 × 1134 × 35 mm',
    palletQty: '31 Panels',
    containerQty: '620 Panels (20 Pallets)',
    moq: '5 Pallets (155 units)',
    description: 'Heavy-duty industrial module engineered specifically for high-capacity warehouse roofs and utility scale commercial projects.'
  },
  'ultra-black-430w': {
    name: 'Ultra Black 430W',
    price: '£48.00',
    image: '/images/ultrablack.webp',
    type: 'All-Black N-type Monocrystalline',
    efficiency: '22.0%',
    weight: '20.8 kg',
    dimensions: '1722 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description: 'Sleek matte-black architectural appearance. Completely invisible busbars designed for high-end residential aesthetics.'
  },
  'tiger-neo-475w': {
    name: 'Tiger Neo 475W',
    price: '£44.50',
    image: '/images/tiger-neo.webp',
    type: 'N-type TOPCon Monocrystalline',
    efficiency: '22.6%',
    weight: '22.5 kg',
    dimensions: '1762 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description: 'Advanced TOPCon technology offering excellent temperature coefficient and high energy yield across various conditions.'
  },
  'deepblue-650w': {
    name: 'DeepBlue 4.0 650W',
    price: '£68.00',
    image: '/images/deepblue.webp',
    type: 'N-type TOPCon Bifacial',
    efficiency: '23.5%',
    weight: '34.5 kg',
    dimensions: '2384 × 1303 × 33 mm',
    palletQty: '31 Panels',
    containerQty: '620 Panels (20 Pallets)',
    moq: '5 Pallets (155 units)',
    description: 'High-power commercial module with outstanding efficiency. Ideal for large-scale projects and ground-mount installations.'
  },
  'q-tron-440w': {
    name: 'Q.TRON BLK 440W',
    price: '£49.50',
    image: '/images/qtron.webp',
    type: 'N-type All-Black Monocrystalline',
    efficiency: '22.3%',
    weight: '21.5 kg',
    dimensions: '1722 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description: 'Premium all-black design with excellent performance and aesthetics for high-end residential rooftops.'
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [animatingImage, setAnimatingImage] = useState<string | null>(null);
  const slug = params?.slug as string;
  const product = productDatabase[slug];

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
          {/* Image */}
          <div className="bg-slate-100 rounded-xl p-6 flex items-center justify-center h-96">
          <img
  id="product-fly-image"
  src={product.image}
  alt={product.name}
  className="h-full object-contain mix-blend-multiply"
/>

          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">{product.name}</h1>
              <p className="text-amber-600 font-bold text-2xl mb-4">
                {product.price} <span className="text-xs font-normal text-slate-500">/ unit est. B2B wholesale</span>
              </p>
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
  // Replace the current onClick logic with this block
onClick={() => {
  setAnimatingImage(product.image);
  addToCart({
    slug,
    name: product.name,
    price: Math.round(parseFloat(product.price.replace('£', '')) * 100),
    image: product.image,
  });
  setTimeout(() => setAnimatingImage(null), 800);
}}
  className="w-full rounded-xl bg-amber-500 py-3.5 text-base font-bold tracking-wide text-slate-950 shadow-sm transition hover:bg-amber-600"
>
  Add to Basket
</button>

  <button
    onClick={() => router.push('/project-quote')}
    className="w-full rounded-xl bg-slate-900 py-3.5 text-base font-bold tracking-wide text-white shadow-sm transition hover:bg-slate-800"
  >
    Request Project Quote
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
        scale: 0.2 
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed z-[99999] pointer-events-none mix-blend-multiply"
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