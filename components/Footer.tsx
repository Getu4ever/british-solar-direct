import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-sm text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-10 lg:grid-cols-4 lg:px-16">
        {/* Column 1 */}
<div>
  <Link href="/" className="mb-4 flex items-center gap-3">
    <Image
      src="/BSD-logo.png"
      alt="British Solar Direct Logo"
      width={40}
      height={40}
      className="object-contain"
    />
    <span className="text-xl font-bold tracking-tight text-white">
      BRITISH SOLAR <span className="text-amber-500">DIRECT</span>
    </span>
  </Link>

  <p className="max-w-sm text-sm leading-6 text-slate-400">
    Trade solar panel supply for UK installers, EPCs, wholesalers, and project buyers.
  </p>
</div>

        {/* Column 2 */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
            Navigation
          </p>
          <div className="space-y-2">
            <Link href="/products" className="block transition hover:text-white">Products</Link>
            <Link href="/brands" className="block transition hover:text-white">Brands</Link>
            <Link href="/delivery-logistics" className="block transition hover:text-white">Delivery & Logistics</Link>
            <Link href="/project-quote" className="block transition hover:text-white">Project Quote</Link>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
            Company
          </p>
          <div className="space-y-2">
            <Link href="/trade-account" className="block transition hover:text-white">Trade Account</Link>
            <Link href="/contact" className="block transition hover:text-white">Contact</Link>
            <Link href="/about" className="block transition hover:text-white">About</Link>
            <Link href="/certifications-datasheets" className="block transition hover:text-white">Certifications & Datasheets</Link>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
            Contact
          </p>
          <div className="space-y-4 text-slate-400">
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">Address</p>
              <p className="leading-5">Southwell Lane, Kirkby-in-Ashfield, Nottingham NG17 8EY</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">Phone</p>
              <a href="tel:07544414241" className="hover:text-amber-500 transition">07544414241</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-6 py-6 text-xs text-slate-500 md:grid-cols-3 md:px-10 lg:px-16">
          <p className="text-center md:text-left">
            Website by{' '}
            <a
              href="https://www.karoldigital.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-400 transition hover:text-amber-500"
            >
              Karol Digital
            </a>
          </p>
          <p className="text-center">
            © {new Date().getFullYear()} British Solar Direct. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
            <Link href="/delivery-logistics" className="transition hover:text-white">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}