'use client';

import { ShoppingBasket } from 'lucide-react';
import { useCart } from './CartContext';

export default function StickyBasket({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart();

  return (
    <footer>
      <button
        onClick={onOpenCart}
        className="fixed bottom-8 right-8 z-[9999] group"
        aria-label="View Cart"
      >
        <div
          id="sticky-basket"
          className="relative bg-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-slate-100 cursor-pointer"
        >
          <ShoppingBasket className="w-10 h-10 text-amber-600 stroke-[1.8]" />
          
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full border-[3px] border-white shadow-sm">
              {totalItems}
            </div>
          )}
        </div>
      </button>
    </footer>
  );
}