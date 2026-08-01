'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
        <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-14 h-14 text-emerald-600" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">Thank You</h1>
        <p className="text-emerald-700 text-lg font-medium mb-6">
          Your installation enquiry has been received.
        </p>

        <p className="text-slate-600 mb-10">
          Our team will review your requirements and follow up with a fixed quote and pro-forma
          invoice after technical assessment.
        </p>

        <Link
          href="/project-quote"
          className="group flex items-center justify-center gap-3 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
        >
          Submit Another Quote Request
          <ArrowRight className="group-hover:translate-x-1 transition" />
        </Link>

        <Link
          href="/products"
          className="mt-4 inline-block text-sm font-medium text-slate-500 transition hover:text-amber-600"
        >
          Return to Product Catalogue
        </Link>
      </div>
    </div>
  );
}
