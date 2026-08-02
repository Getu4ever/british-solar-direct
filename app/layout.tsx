import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClientWrapper from "./RootClientWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "British Solar Direct",
    template: "%s | British Solar Direct",
  },
  description:
    "Turnkey LONGi EcoLife solar installations for Nottingham homeowners. Fixed packages, local delivery, and professional installation coordinated by Juma Mohammedi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 overflow-x-hidden">
  <RootClientWrapper>
    {children}
  </RootClientWrapper>
</body>
    </html>
  );
}