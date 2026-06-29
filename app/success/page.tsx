'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(!!sessionId);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/get-session?id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  // IMPORTANT: if no sessionId, still show success UI
  if (!loading && !sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">

          <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Thank You!
          </h1>

          <p className="text-emerald-600 text-lg font-medium mb-8">
            Payment completed successfully
          </p>

          <Link
            href="/products"
            className="group flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
          >
            Continue Shopping
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>

          <p className="text-xs text-slate-500 mt-8">
            A confirmation email has been sent to you.
          </p>

        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">Verifying your payment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">

        <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-14 h-14 text-emerald-600" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Thank You!
        </h1>

        <p className="text-emerald-600 text-lg font-medium mb-8">
          Your payment was successful
        </p>

        {order && (
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 text-left">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
              Order Reference
            </p>
            <p className="font-mono text-sm text-slate-700 break-all">
              {order.id}
            </p>
          </div>
        )}

        <Link
          href="/products"
          className="group flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
        >
          Continue Shopping
          <ArrowRight className="group-hover:translate-x-1 transition" />
        </Link>

        <p className="text-xs text-slate-500 mt-8">
          A confirmation email has been sent to you.
        </p>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <SuccessInner />
    </Suspense>
  );
}