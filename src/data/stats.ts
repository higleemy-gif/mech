export interface StatItem {
  id: string;
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const STATS: StatItem[] = [
  { id: "est", target: 2017, label: "Established", prefix: "Est. " },
  { id: "experience", target: 27, label: "Yrs Expertise", suffix: "+" },
  { id: "lines", target: 9, label: "Service Lines" },
  { id: "industries", target: 20, label: "Industries Served", suffix: "+" },
];
