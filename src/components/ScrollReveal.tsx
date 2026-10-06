import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export function ScrollReveal({ children, delayMs = 0, className = "" }: ScrollRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delayMs / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
