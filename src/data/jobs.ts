export type JobType = "Full-time" | "Contract" | "Part-time";

export interface Job {
  id: string;
  title: string;
  category: string;
  company: string;
  location: string;
  type: JobType;
  experience: string;
  salary?: string;
  posted: string;
  summary: string;
}

export const JOB_CATEGORIES = [
  "Human Resources",
  "Pharma & Life Sciences",
  "Manufacturing & Operations",
  "Engineering",
  "Sales & Marketing",
  "Finance & Accounting",
  "Supply Chain",
] as const;

// NOTE: Sample listings for layout/design only. Replace with live data from the
// backend/ATS once the jobs API is connected.
export const JOBS: Job[] = [
  {
    id: "hr-bp-hyd-001",
    title: "HR Business Partner",
    category: "Human Resources",
    company: "iMECH Global (Pharma Client)",
    location: "Hyderabad",
    type: "Full-time",
    experience: "6-9 years",
    salary: "₹18-24 LPA",
    posted: "2 days ago",
    summary:
      "Partner with business leaders on workforce planning, talent management and employee engagement for a fast-growing pharmaceutical manufacturing unit.",
  },
  {
    id: "ta-lead-blr-002",
    title: "Talent Acquisition Lead",
    category: "Human Resources",
    company: "iMECH Global (Engineering Client)",
    location: "Bengaluru",
    type: "Full-time",
    experience: "5-8 years",
    salary: "₹15-20 LPA",
    posted: "4 days ago",
    summary:
      "Own end-to-end recruitment for technical and leadership roles, build sourcing strategies and manage a team of recruiters across multiple sites.",
  },
  {
    id: "qa-mgr-ahm-003",
    title: "Quality Assurance Manager",
    category: "Pharma & Life Sciences",
    company: "iMECH Global (Pharma Client)",
    location: "Ahmedabad",
    type: "Full-time",
    experience: "8-12 years",
    salary: "₹22-30 LPA",
    posted: "1 week ago",
    summary:
      "Lead QA operations for a USFDA-approved formulations plant, ensuring GMP compliance, audit readiness and continuous quality improvement.",
  },
  {
    id: "prod-eng-pun-004",
    title: "Production Engineer",
    category: "Manufacturing & Operations",
    company: "iMECH Global (Manufacturing Client)",
    location: "Pune",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹8-12 LPA",
    posted: "3 days ago",
    summary:
      "Drive shop-floor productivity, lean initiatives and process optimization on a high-volume automotive component line.",
  },
  {
    id: "mech-design-che-005",
    title: "Mechanical Design Engineer",
    category: "Engineering",
    company: "iMECH Global (Engineering Client)",
    location: "Chennai",
    type: "Full-time",
    experience: "4-7 years",
    salary: "₹10-16 LPA",
    posted: "5 days ago",
    summary:
      "Design and validate mechanical assemblies using CAD/CAE tools, collaborating with manufacturing and quality teams from concept to production.",
  },
  {
    id: "payroll-spec-hyd-006",
    title: "Payroll & Compliance Specialist",
    category: "Human Resources",
    company: "iMECH Global",
    location: "Hyderabad",
    type: "Full-time",
    experience: "4-6 years",
    salary: "₹7-11 LPA",
    posted: "6 days ago",
    summary:
      "Manage multi-state payroll, statutory compliance under India's Labour Codes, PF/ESI/PT filings and HR governance for outsourced clients.",
  },
  {
    id: "regaffairs-ahm-007",
    title: "Regulatory Affairs Associate",
    category: "Pharma & Life Sciences",
    company: "iMECH Global (Pharma Client)",
    location: "Ahmedabad",
    type: "Contract",
    experience: "2-4 years",
    salary: "₹6-9 LPA",
    posted: "1 week ago",
    summary:
      "Prepare and review regulatory dossiers for regulated and semi-regulated markets, coordinating submissions and responding to agency queries.",
  },
  {
    id: "area-sales-mum-008",
    title: "Area Sales Manager",
    category: "Sales & Marketing",
    company: "iMECH Global (FMCG Client)",
    location: "Mumbai",
    type: "Full-time",
    experience: "5-9 years",
    salary: "₹12-18 LPA",
    posted: "2 days ago",
    summary:
      "Grow primary and secondary sales across the region, lead a field team, and build strong distributor and retailer relationships.",
  },
  {
    id: "fin-analyst-blr-009",
    title: "Finance Analyst (FP&A)",
    category: "Finance & Accounting",
    company: "iMECH Global (Corporate Client)",
    location: "Bengaluru",
    type: "Full-time",
    experience: "3-6 years",
    salary: "₹10-15 LPA",
    posted: "4 days ago",
    summary:
      "Support budgeting, forecasting and management reporting, delivering insights that drive cost efficiency and business decisions.",
  },
  {
    id: "scm-exec-pun-010",
    title: "Supply Chain Executive",
    category: "Supply Chain",
    company: "iMECH Global (Manufacturing Client)",
    location: "Pune",
    type: "Full-time",
    experience: "2-5 years",
    salary: "₹6-10 LPA",
    posted: "1 week ago",
    summary:
      "Coordinate procurement, inventory and logistics to ensure on-time material availability and optimal working-capital levels.",
  },
  {
    id: "ld-consultant-rem-011",
    title: "Learning & Development Consultant",
    category: "Human Resources",
    company: "iMECH Global",
    location: "Remote",
    type: "Part-time",
    experience: "6-10 years",
    salary: "Negotiable",
    posted: "3 days ago",
    summary:
      "Design and facilitate leadership and capability-building programs for client organizations across sectors, including assessment and TNA.",
  },
  {
    id: "maint-eng-che-012",
    title: "Maintenance Engineer",
    category: "Engineering",
    company: "iMECH Global (Manufacturing Client)",
    location: "Chennai",
    type: "Full-time",
    experience: "3-6 years",
    salary: "₹7-11 LPA",
    posted: "5 days ago",
    summary:
      "Ensure uptime of plant equipment through preventive and predictive maintenance, root-cause analysis and reliability improvement.",
  },
];
