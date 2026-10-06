import { Users, GraduationCap, RefreshCw, BarChart3, Briefcase, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceEnum } from "../lib/leadSchema";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  service: ServiceEnum;
}

export const SERVICES: ServiceItem[] = [
  { id: "workforce", title: "Workforce Solutions", description: "Payroll Management, Manpower & Staffing, Executive Search & Head-Hunting", icon: Users, service: "Workforce Solutions" },
  { id: "people-dev", title: "People Development", description: "Training & Development, Leadership Development", icon: GraduationCap, service: "People Development" },
  { id: "org-transform", title: "Organization Transformation", description: "Management Consulting, OD & Change Management", icon: RefreshCw, service: "Organization Transformation" },
  { id: "surveys", title: "Surveys & Organizational Research", description: "Engagement, 360\u00B0, Climate, Pulse, TNA, Market surveys", icon: BarChart3, service: "Surveys & Research" },
  { id: "hr-outsourcing", title: "HR Outsourcing", description: "End-to-end employee lifecycle management", icon: Briefcase, service: "HR Outsourcing" },
  { id: "hr-compliance", title: "HR Compliance Audit & Management", description: "Statutory & labour-law compliance, HR governance", icon: ShieldCheck, service: "HR Compliance" },
];
