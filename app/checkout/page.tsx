'use client';

import { useCart } from '../../components/CartContext';
import { useState } from 'react';
import { ShieldCheck, Truck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        alert('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Secure Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              {cart.map((item) => (
                <div key={item.slug} className="flex items-center gap-4 py-4 border-b last:border-0">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold">£{(item.price * item.quantity / 100).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1"><Truck size={16} /> UK Mainland Delivery</span>
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> Tier-1 Warranty</span>
            </div>
          </div>

          {/* Payment Sidebar */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 h-fit shadow-xl">
            <h2 className="text-lg font-bold mb-6">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>£{totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-slate-400"><span>VAT (20%)</span><span>£{(totalPrice * 0.2).toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-700">
                <span>Total</span><span>£{(totalPrice * 1.2).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-950 font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              {loading ? 'Processing...' : 'Pay Securely'}
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-4">Powered by Stripe • Secure 256-bit SSL</p>
          </div>
        </div>
      </div>
    </div>
  );
}