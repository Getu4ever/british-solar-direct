'use client';

import { usePathname } from 'next/navigation';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}

      <main className="min-w-0 flex-grow overflow-x-hidden">
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}
