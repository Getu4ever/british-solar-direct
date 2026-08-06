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

      <main className="min-w-0 max-w-full flex-grow overflow-x-clip">
        {/* Skip transform-based page transitions on admin — they expand iOS scroll width */}
        {isAdmin ? children : <PageTransition>{children}</PageTransition>}
      </main>
    </>
  );
}
