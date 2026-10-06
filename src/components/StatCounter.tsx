import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

interface StatCounterProps {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export function StatCounter({ target, label, prefix = "", suffix = "", durationMs = 2000 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(target);
      return;
    }
    if (inView && !started.current) {
      started.current = true;
      const controls = animate(0, target, {
        duration: durationMs / 1000,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }
  }, [inView, reduced, target, durationMs]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-4xl font-bold text-navy sm:text-5xl">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wide text-slate">{label}</div>
    </div>
  );
}
