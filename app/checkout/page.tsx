'use client';

import { useCart } from '../../components/CartContext';
import { useState } from 'react';
import { ShieldCheck, Truck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, totalVat, totalIncVat } = useCart();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0 || !confirmed) return;

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cart.map(({ slug, quantity }) => ({ slug, quantity })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? 'No checkout URL received');
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
                  <div className="font-bold">£{((item.price * item.quantity) / 100).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1"><Truck size={16} /> UK Mainland Delivery</span>
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> Tier-1 Warranty</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 h-fit shadow-xl">
            <h2 className="text-lg font-bold mb-6">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal (ex. VAT)</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>VAT (20%)</span>
                <span>£{totalVat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-700">
                <span>Total (inc. VAT)</span>
                <span>£{totalIncVat.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4 p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 flex items-start gap-3">
              <input
                type="checkbox"
                id="checkout-confirm"
                className="mt-0.5 accent-amber-500 cursor-pointer"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <label htmlFor="checkout-confirm" className="cursor-pointer leading-tight">
                I confirm my delivery address is within the <strong>UK Mainland</strong> and agree to the supply terms.
              </label>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0 || !confirmed}
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
