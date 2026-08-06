import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClientWrapper from "./RootClientWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://britishsolardirect.co.uk'
  ),
  title: {
    default: "British Solar Direct | LONGi EcoLife Solar for Nottingham Homes",
    template: "%s | British Solar Direct",
  },
  description:
    "Turnkey LONGi EcoLife solar for Nottingham homeowners. Fixed packages, local delivery, and installation by Juma Mohammedi.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full max-w-full overflow-x-clip antialiased scroll-smooth`}
    >
      <body className="relative flex min-h-screen max-w-full flex-col overflow-x-clip overscroll-x-none bg-slate-50 text-slate-900 antialiased">
  <RootClientWrapper>
    {children}
  </RootClientWrapper>
</body>
    </html>
  );
}