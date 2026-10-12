import { useReducedMotion } from "../lib/useReducedMotion";
import type { Client } from "../data/industries";

interface LogoMarqueeProps {
  items: Client[];
}

function LogoImg({ item, decorative = false }: { item: Client; decorative?: boolean }) {
  return (
    <li className="flex shrink-0 items-center justify-center px-6 sm:px-9">
      <img
        src={item.logo}
        alt={decorative ? "" : item.name}
        aria-hidden={decorative || undefined}
        loading="lazy"
        draggable={false}
        className="h-10 w-auto max-w-[150px] object-contain opacity-80 transition hover:opacity-100 sm:h-14 sm:max-w-[170px]"
      />
    </li>
  );
}

export function LogoMarquee({ items }: LogoMarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
        {items.map((item) => (
          <LogoImg key={item.name} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div className="group relative overflow-hidden">
      {/* Edge fades so logos ease in/out instead of hard-clipping */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-soft to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-soft to-transparent sm:w-28" />
      <ul className="flex w-max animate-logo-scroll items-center group-hover:[animation-play-state:paused]">
        {items.map((item) => (
          <LogoImg key={"a-" + item.name} item={item} />
        ))}
        {items.map((item) => (
          <LogoImg key={"b-" + item.name} item={item} decorative />
        ))}
      </ul>
    </div>
  );
}
