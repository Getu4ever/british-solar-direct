'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || 'G-PMRGTM81C5';

/** GA4 browser tag — skipped on /admin so dashboard traffic does not inflate public stats. */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  if (!MEASUREMENT_ID || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
