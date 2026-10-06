import { ShieldCheck, Handshake, Award, Zap, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ValueItem {
  label: string;
  icon: LucideIcon;
}

export const VALUES: ValueItem[] = [
  { label: "Integrity", icon: ShieldCheck },
  { label: "Client Partnership", icon: Handshake },
  { label: "Excellence", icon: Award },
  { label: "Agility", icon: Zap },
  { label: "Impact", icon: Target },
];
