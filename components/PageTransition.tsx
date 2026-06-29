"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsAnimating(false);
    }, 300); // Match your animation duration

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={isAnimating ? "opacity-0 translate-y-4 transition-all duration-300" : "opacity-100 translate-y-0 transition-all duration-500"}>
      {displayChildren}
    </div>
  );
}