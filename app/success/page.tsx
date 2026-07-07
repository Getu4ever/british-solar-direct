'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, XCircle } from 'lucide-react';
import Link from 'next/link';

type OrderSummary = {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email: string | null;
};

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(!!sessionId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/get-session?id=${sessionId}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? 'Unable to verify payment');
        }
        setOrder(data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8">
            <XCircle className="w-14 h-14 text-slate-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">No payment found</h1>
          <p className="text-slate-500 mb-8">
            This page is shown after a completed checkout. If you have just paid, please use the
            link from your confirmation email.
          </p>
          <Link
            href="/products"
            className="group flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg transition-all"
          >
            Browse Products
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
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

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-8">
            <XCircle className="w-14 h-14 text-rose-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Payment not verified</h1>
          <p className="text-slate-500 mb-8">{error ?? 'We could not confirm your payment.'}</p>
          <Link
            href="/cart"
            className="group flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg transition-all"
          >
            Return to Basket
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
        <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-14 h-14 text-emerald-600" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">Thank You!</h1>
        <p className="text-emerald-600 text-lg font-medium mb-8">Your payment was successful</p>

        <div className="bg-slate-50 rounded-2xl p-6 mb-10 text-left space-y-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Order Reference</p>
            <p className="font-mono text-sm text-slate-700 break-all">{order.id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Amount Paid</p>
            <p className="font-bold text-slate-900">
              £{(order.amount_total / 100).toFixed(2)}
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="group flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
        >
          Continue Shopping
          <ArrowRight className="group-hover:translate-x-1 transition" />
        </Link>

        <p className="text-xs text-slate-500 mt-8">
          A confirmation email has been sent{order.customer_email ? ` to ${order.customer_email}` : ''}.
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
