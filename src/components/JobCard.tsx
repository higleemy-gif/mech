import { MapPin, Briefcase, Clock, Banknote, ArrowRight } from "lucide-react";
import type { Job } from "../data/jobs";

const TYPE_STYLES: Record<Job["type"], string> = {
  "Full-time": "bg-green-100 text-green-800",
  Contract: "bg-amber-100 text-amber-800",
  "Part-time": "bg-sky-100 text-sky-800",
};

export function JobCard({ job }: { job: Job }) {
  const applyHref =
    "mailto:info@imechglobal.com" +
    "?subject=" +
    encodeURIComponent("Application: " + job.title + " (" + job.id + ")") +
    "&body=" +
    encodeURIComponent(
      "Hi iMECH Global team,\n\nI'd like to apply for the " +
        job.title +
        " role in " +
        job.location +
        ".\n\n(Please attach your resume.)\n\nThank you.",
    );

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-bg p-5 shadow-sm transition hover:border-gold/60 hover:shadow-md sm:p-6">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-navy">{job.title}</h3>
        <span
          className={
            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold " + TYPE_STYLES[job.type]
          }
        >
          {job.type}
        </span>
      </div>

      <p className="mb-4 text-sm font-medium text-slate">{job.company}</p>

      <dl className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
          <dt className="sr-only">Location</dt>
          <dd>{job.location}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4 text-gold" aria-hidden="true" />
          <dt className="sr-only">Experience</dt>
          <dd>{job.experience}</dd>
        </div>
        {job.salary ? (
          <div className="flex items-center gap-1.5">
            <Banknote className="h-4 w-4 text-gold" aria-hidden="true" />
            <dt className="sr-only">Salary</dt>
            <dd>{job.salary}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate">{job.summary}</p>

      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs text-slate/70">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {job.posted}
        </span>
        <a
          href={applyHref}
          className="inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-dark"
        >
          View &amp; Apply
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
