'use client';

import React, { useState } from 'react';
import { adminLogin } from '../../actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') ?? '/admin';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await adminLogin(password);
    setLoading(false);

    if (result.success) {
      router.push(redirectTo);
    } else {
      setError(result.error ?? 'Login failed');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-xl font-bold text-white mb-1">Admin Login</h1>
        <p className="text-slate-400 text-sm mb-6">British Solar Direct portal</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 py-3 text-sm font-bold text-slate-950 hover:bg-amber-600 disabled:bg-slate-700 transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-rose-400 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginForm />
    </Suspense>
  );
}
