'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { 
  HomeIcon,
  ShoppingBagIcon, 
  WrenchScrewdriverIcon,
  TagIcon, 
  TruckIcon, 
  EnvelopeIcon, 
  Bars3Icon, 
  XMarkIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Our Packages', href: '/products', icon: ShoppingBagIcon },
    { name: 'Installation', href: '/installation', icon: WrenchScrewdriverIcon },
    { name: 'LONGi Tech', href: '/brands', icon: TagIcon },
    { name: 'Delivery', href: '/delivery-logistics', icon: TruckIcon },
    { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo and Phone Group */}
        <div className="flex flex-col">
          <a href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/BSD-logo.png" alt="BSD Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              BRITISH SOLAR <span className="text-amber-500">DIRECT</span>
            </span>
          </a>
          <a href="tel:+441159904024" className="hidden md:flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition ml-[52px] -mt-1">
            <PhoneIcon className="w-3 h-3" /> 0115 990 4024
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          {menuItems.map((item) => (
            item.href === '/' ? (
              <a key={item.name} href={item.href} className="flex items-center gap-2 hover:text-amber-500 transition">
                <item.icon className="w-4 h-4" />
                {item.name}
              </a>
            ) : (
              <Link key={item.name} href={item.href} className="flex items-center gap-2 hover:text-amber-500 transition">
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/project-quote" className="hidden md:flex rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-600">
            Book a free quote
          </Link>

          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Sleek Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <a href="tel:+441159904024" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 text-amber-600 font-bold mb-2">
            <PhoneIcon className="w-6 h-6" /> 0115 990 4024
          </a>
          {menuItems.map((item) => (
            item.href === '/' ? (
              <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition">
                <item.icon className="w-6 h-6 text-amber-500" />
                {item.name}
              </a>
            ) : (
              <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition">
                <item.icon className="w-6 h-6 text-amber-500" />
                {item.name}
              </Link>
            )
          ))}
          <Link href="/project-quote" onClick={() => setIsMenuOpen(false)} className="mt-4 flex items-center justify-center rounded-xl bg-amber-500 py-4 text-slate-950 font-bold text-lg">
            Book a free quote
          </Link>
        </div>
      )}
    </header>
  );
}