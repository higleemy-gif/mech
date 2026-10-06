import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceEnum } from "../lib/leadSchema";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  service: ServiceEnum;
  onEnquire: (service: ServiceEnum) => void;
}

export function ServiceCard({ icon: Icon, title, description, service, onEnquire }: ServiceCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-xl border border-gray-200 bg-bg p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-xl">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-bg-soft transition-colors duration-300 group-hover:bg-navy">
        <Icon className="h-7 w-7 text-gold" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-navy">{title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate">{description}</p>
      <button
        type="button"
        onClick={() => onEnquire(service)}
        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-gold"
        aria-label={"Enquire about " + title}
      >
        Enquire
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
