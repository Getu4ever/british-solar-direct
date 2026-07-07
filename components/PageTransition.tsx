"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
