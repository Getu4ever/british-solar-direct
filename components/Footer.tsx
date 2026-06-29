import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-sm text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-10 lg:grid-cols-3 lg:px-16">
        <div>
          <p className="mb-3 text-base font-semibold text-white">British Solar Direct</p>
          <p className="max-w-sm leading-6 text-slate-400">
            Trade solar panel supply for UK installers, EPCs, wholesalers, and project buyers.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
            Navigation
          </p>
          <div className="space-y-2">
            <Link href="/products" className="block transition hover:text-white">
              Products
            </Link>
            <Link href="/brands" className="block transition hover:text-white">
              Brands
            </Link>
            <Link href="/delivery-logistics" className="block transition hover:text-white">
              Delivery & Logistics
            </Link>
            <Link href="/project-quote" className="block transition hover:text-white">
              Project Quote
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-200">
            Company
          </p>
          <div className="space-y-2">
            <Link href="/trade-account" className="block transition hover:text-white">
              Trade Account
            </Link>
            <Link href="/contact" className="block transition hover:text-white">
              Contact
            </Link>
            <Link href="/about" className="block transition hover:text-white">
              About
            </Link>
            <Link href="/certifications-datasheets" className="block transition hover:text-white">
              Certifications & Datasheets
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <p>© {new Date().getFullYear()} British Solar Direct. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/delivery-logistics" className="transition hover:text-white">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
