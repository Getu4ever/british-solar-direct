import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClientWrapper from "./RootClientWrapper";
import { COMPANY, DELIVERY_AREAS } from "./lib/company";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || COMPANY.website;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "British Solar Direct | LONGi EcoLife Solar for Nottingham Homes",
    template: "%s | British Solar Direct",
  },
  description: COMPANY.metaDescription,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "British Solar Direct | LONGi EcoLife Solar for Nottingham Homes",
    description: COMPANY.metaDescription,
    url: siteUrl,
    siteName: COMPANY.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/home-local-install.jpg",
        width: 1200,
        height: 630,
        alt: "British Solar Direct residential solar installation",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: COMPANY.name,
  description: COMPANY.description,
  url: COMPANY.website,
  email: COMPANY.email,
  telephone: COMPANY.phoneDisplay,
  image: [
    `${siteUrl}/BSD-logo.png`,
    `${siteUrl}/images/home-local-install.jpg`,
    `${siteUrl}/images/family-homestead-package.jpg`,
    `${siteUrl}/images/installation-roof-work.jpg`,
    `${siteUrl}/images/installation-handover.jpg`,
  ],
  logo: `${siteUrl}/BSD-logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.streetAddress,
    addressLocality: COMPANY.addressLocality,
    addressRegion: COMPANY.addressRegion,
    postalCode: COMPANY.postalCode,
    addressCountry: COMPANY.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.0970636,
    longitude: -1.2588496,
  },
  areaServed: DELIVERY_AREAS.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY.phoneDisplay,
    email: COMPANY.email,
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
  },
  founder: {
    "@type": "Person",
    name: COMPANY.director,
    jobTitle: COMPANY.directorTitle,
  },
  priceRange: "£££",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full max-w-full antialiased`}
    >
      <body className="relative min-h-screen w-full max-w-full overscroll-x-none touch-pan-y bg-slate-50 text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <RootClientWrapper>{children}</RootClientWrapper>
      </body>
    </html>
  );
}
