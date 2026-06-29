'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import Image from "next/image";

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-3 shrink-0">
  <Image
    src="/BSD-logo.png"
    alt="British Solar Direct logo"
    width={40}
    height={40}
    className="object-contain"
  />

  <span className="text-xl font-bold tracking-tight text-slate-900">
    BRITISH SOLAR <span className="text-amber-500">DIRECT</span>
  </span>
</Link>
       

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/products" className="transition hover:text-amber-500">
            Products
          </Link>
          <Link href="/brands" className="transition hover:text-amber-500">
            Brands
          </Link>
          <Link href="/delivery-logistics" className="transition hover:text-amber-500">
            Delivery
          </Link>
          <Link href="/trade-account" className="transition hover:text-amber-500">
            Trade Account
          </Link>
          <Link href="/contact" className="transition hover:text-amber-500">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/project-quote"
            className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-600"
          >
            Request Quote
          </Link>

          {/* Cart Icon - Now a button triggering the checkout drawer */}
          <button
            onClick={onOpenCart}
            className="relative p-2 hover:bg-slate-100 rounded-full transition"
            aria-label="View Cart"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}