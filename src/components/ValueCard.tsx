import type { LucideIcon } from "lucide-react";

interface ValueCardProps {
  label: string;
  icon: LucideIcon;
}

export function ValueCard({ label, icon: Icon }: ValueCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-bg p-6 text-center shadow-sm">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-bg-soft">
        <Icon className="h-6 w-6 text-gold" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="font-heading text-base font-semibold text-navy">{label}</span>
    </div>
  );
}
