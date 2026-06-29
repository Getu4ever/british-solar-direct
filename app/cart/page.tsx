'use client';

import Link from 'next/link';
import { useCart } from '../../components/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <h1 className="text-3xl font-extrabold text-slate-950 mb-8">Your Basket</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 mb-4">Your basket is currently empty.</p>
          <Link href="/products" className="text-amber-600 font-bold hover:underline">
            Browse Solar Catalog
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="space-y-4">
            {cart.map((item) => (
              <div 
                key={item.slug} 
                className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image || '/images/placeholder.webp'} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-multiply" 
                  />
                </div>

                <div className="flex-grow">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="font-bold text-slate-900">
                    £{(item.price * item.quantity / 100).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.slug)}
                    className="text-red-500 text-xs font-medium hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200 text-right">
            <p className="text-sm text-slate-500 mb-1">Total (excl. VAT)</p>
            <p className="text-3xl font-extrabold text-slate-950">£{totalPrice.toFixed(2)}</p>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-amber-500 text-slate-950 font-bold py-4 rounded-xl mt-8 hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/20"
          >
            Proceed to Secure Checkout
          </Link>
        </div>
      )}
    </div>
  );
}