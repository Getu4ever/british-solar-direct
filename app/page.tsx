import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { buildFaqPageJsonLd } from './lib/faqs';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd()) }}
      />
      <HomePageClient />
    </>
  );
}
