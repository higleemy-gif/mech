import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

type SectionBackground = "white" | "soft" | "navy";

interface SectionProps {
  id: string;
  background?: SectionBackground;
  heading?: string;
  headingLevel?: 2 | 3;
  reveal?: boolean;
  children: ReactNode;
  className?: string;
}

const BG: Record<SectionBackground, string> = {
  white: "bg-bg text-slate",
  soft: "bg-bg-soft text-slate",
  navy: "bg-navy text-white",
};

export function Section({
  id,
  background = "white",
  heading,
  headingLevel = 2,
  reveal = true,
  children,
  className = "",
}: SectionProps) {
  const HeadingTag = ("h" + headingLevel) as "h2" | "h3";
  const content = (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      {heading ? (
        <div className="mb-10 text-center">
          <HeadingTag className="relative inline-block text-3xl font-bold sm:text-4xl">
            {heading}
            <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded bg-gold" />
          </HeadingTag>
        </div>
      ) : null}
      {children}
    </div>
  );
  return (
    <section id={id} className={"scroll-mt-24 py-16 sm:py-20 " + BG[background] + " " + className}>
      {reveal ? <ScrollReveal>{content}</ScrollReveal> : content}
    </section>
  );
}
