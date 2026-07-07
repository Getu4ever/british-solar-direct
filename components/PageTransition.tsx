"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="opacity-100 translate-y-0 transition-all duration-300"
    >
      {children}
    </div>
  );
}
