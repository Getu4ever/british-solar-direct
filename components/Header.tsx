'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import Image from "next/image";
import { 
  ShoppingBagIcon, 
  TagIcon, 
  TruckIcon, 
  BriefcaseIcon, 
  EnvelopeIcon, 
  Bars3Icon, 
  XMarkIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Products', href: '/products', icon: ShoppingBagIcon },
    { name: 'Brands', href: '/brands', icon: TagIcon },
    { name: 'Delivery', href: '/delivery-logistics', icon: TruckIcon },
    { name: 'Trade Account', href: '/trade-account', icon: BriefcaseIcon },
    { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo and Phone Group */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/BSD-logo.png" alt="BSD Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              BRITISH SOLAR <span className="text-amber-500">DIRECT</span>
            </span>
          </Link>
          <a href="tel:07544414241" className="hidden md:flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition ml-[52px] -mt-1">
            <PhoneIcon className="w-3 h-3" /> 07544414241
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-2 hover:text-amber-500 transition">
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/project-quote" className="hidden md:flex rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-600">
            Request Free Quote
          </Link>
          
          <button onClick={onOpenCart} className="relative p-2 hover:bg-slate-100 rounded-full transition">
            🛒 {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{totalItems}</span>}
          </button>
          
          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Sleek Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <a href="tel:07544414241" className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 text-amber-600 font-bold mb-2">
            <PhoneIcon className="w-6 h-6" /> 07544414241
          </a>
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition">
              <item.icon className="w-6 h-6 text-amber-500" />
              {item.name}
            </Link>
          ))}
          <Link href="/project-quote" onClick={() => setIsMenuOpen(false)} className="mt-4 flex items-center justify-center rounded-xl bg-amber-500 py-4 text-slate-950 font-bold text-lg">
            Request Free Quote
          </Link>
        </div>
      )}
    </header>
  );
}