import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { searchSite } from '../lib/site-search';

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search British Solar Direct packages, installation, and delivery pages.',
  alternates: {
    canonical: '/search',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const results = query ? searchSite(query) : [];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Search</h1>
        <p className="mt-2 text-sm text-slate-600">
          Find packages, installation details, and delivery information.
        </p>

        <form action="/search" method="get" className="mt-8 flex gap-3" role="search">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="e.g. Family Homestead, MCS, delivery"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
          >
            Search
          </button>
        </form>

        <div className="mt-10">
          {!query && (
            <p className="text-sm text-slate-500">Enter a term to search packages and pages.</p>
          )}

          {query && results.length === 0 && (
            <p className="text-sm text-slate-500">
              No results for &ldquo;{query}&rdquo;. Try a package name, postcode area, or topic like
              installation.
            </p>
          )}

          {results.length > 0 && (
            <ul className="space-y-4">
              {results.map((result) => (
                <li key={result.href}>
                  <Link
                    href={result.href}
                    className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-500/40"
                  >
                    <p className="text-base font-bold text-slate-900">{result.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{result.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
