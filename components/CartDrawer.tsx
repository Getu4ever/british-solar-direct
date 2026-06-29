'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useState } from 'react';
import { ShieldCheck, Truck, Lock, X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.5 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[99998]"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[99999] flex flex-col"
          >
            {/* Header */}
            <header className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Your Basket</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {cart.length === 0 ? 'Empty' : `${cart.reduce((acc, item) => acc + item.quantity, 0)} items selected`}
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
                aria-label="Close Basket"
              >
                <X size={20} />
              </button>
            </header>

            {/* Main Item List (Scrollable Area) */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-3">
                    <X size={28} />
                  </div>
                  <h3 className="font-semibold text-slate-800">Your basket is empty</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">Add standard Tier-1 solar modules from our product catalog to request supply.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.slug} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0 p-2 flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full object-contain mix-blend-multiply" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 rounded-md" />
                      )}
                    </div>
                    {/* Item Text Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-sm text-slate-900 truncate">{item.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    {/* Total Price Per Product Line */}
                    <div className="font-bold text-sm text-slate-900 flex-shrink-0">
                      £{((item.price * item.quantity) / 100).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Pricing & Checkout Action (Fixed Bottom Area) */}
            {cart.length > 0 && (
              <footer className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="space-y-2 mb-4 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (20%)</span>
                    <span className="font-medium text-slate-900">£{(totalPrice * 0.2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200 text-slate-900">
                    <span>Total (inc. VAT)</span>
                    <span className="text-amber-600">£{(totalPrice * 1.2).toFixed(2)}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-3 text-slate-500 text-[11px] mb-4 border-b border-slate-200 pb-3">
                  <span className="flex items-center gap-1"><Truck size={13} /> UK Mainland Delivery</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={13} /> Tier-1 Warranty</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:text-slate-500 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  <Lock size={16} />
                  {loading ? 'Processing...' : 'Pay Securely'}
                </button>
                <p className="text-center text-[9px] text-slate-400 mt-3">Powered by Stripe • Secure 256-bit SSL</p>
              </footer>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}