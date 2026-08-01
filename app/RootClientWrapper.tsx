'use client';

import PageTransition from "../components/PageTransition";
import Header from "../components/Header";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="flex-grow">
        <PageTransition>
          {children}
        </PageTransition>
      </main>

    </>
  );
}