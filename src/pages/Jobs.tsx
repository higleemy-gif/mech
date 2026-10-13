import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { JobCard } from "../components/JobCard";
import { JOBS, JOB_CATEGORIES } from "../data/jobs";
import type { JobType } from "../data/jobs";

const JOB_TYPES: JobType[] = ["Full-time", "Contract", "Part-time"];
const LOCATIONS = Array.from(new Set(JOBS.map((j) => j.location))).sort();

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition " +
        (active
          ? "border-navy bg-navy text-white"
          : "border-gray-300 bg-bg text-navy hover:border-navy")
      }
    >
      {children}
    </button>
  );
}

export function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");

  useEffect(() => {
    const prev = document.title;
    document.title = "Careers | iMECH Global";
    return () => {
      document.title = prev;
    };
  }, []);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return JOBS.filter((job) => {
      if (category !== "all" && job.category !== category) return false;
      if (type !== "all" && job.type !== type) return false;
      if (location !== "all" && job.location !== location) return false;
      if (kw) {
        const haystack = (
          job.title +
          " " +
          job.company +
          " " +
          job.category +
          " " +
          job.summary +
          " " +
          job.location
        ).toLowerCase();
        if (!haystack.includes(kw)) return false;
      }
      return true;
    });
  }, [keyword, category, type, location]);

  const hasFilters =
    keyword.trim() !== "" || category !== "all" || type !== "all" || location !== "all";

  const clearAll = () => {
    setKeyword("");
    setCategory("all");
    setType("all");
    setLocation("all");
  };

  return (
    <>
      {/* Search hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="320" cy="90" r="150" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="320" cy="90" r="100" stroke="currentColor" strokeWidth="1" />
            <circle cx="80" cy="320" r="90" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Find your next opportunity
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Explore open roles across pharma, manufacturing, engineering and corporate functions.
            iMECH Global connects skilled professionals with the right organizations.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col gap-3 rounded-xl bg-bg p-3 shadow-lg sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 rounded-md border border-gray-200 px-3">
              <Search className="h-5 w-5 shrink-0 text-slate" aria-hidden="true" />
              <input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keyword or company"
                aria-label="Search jobs by keyword"
                className="w-full bg-transparent py-3 text-navy outline-none placeholder:text-slate/60"
              />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Filter by location"
              className="rounded-md border border-gray-200 bg-bg px-3 py-3 text-navy outline-none sm:w-48"
            >
              <option value="all">All locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-semibold text-navy transition hover:bg-gold-light"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Results + filters */}
      <section className="bg-bg-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[250px_1fr]">
          {/* Filter sidebar */}
          <aside aria-label="Job filters" className="h-max rounded-xl border border-gray-200 bg-bg p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold text-navy">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters
              </span>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate hover:text-navy"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear all
                </button>
              ) : null}
            </div>

            <fieldset className="mb-5">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate">
                Job function
              </legend>
              <div className="flex flex-wrap gap-2">
                <Chip active={category === "all"} onClick={() => setCategory("all")}>
                  All
                </Chip>
                {JOB_CATEGORIES.map((cat) => (
                  <Chip key={cat} active={category === cat} onClick={() => setCategory(cat)}>
                    {cat}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate">
                Job type
              </legend>
              <div className="flex flex-wrap gap-2">
                <Chip active={type === "all"} onClick={() => setType("all")}>
                  All
                </Chip>
                {JOB_TYPES.map((t) => (
                  <Chip key={t} active={type === t} onClick={() => setType(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </fieldset>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">
                {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
              </h2>
            </div>

            {filtered.length > 0 ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-bg p-10 text-center">
                <p className="font-semibold text-navy">No roles match your filters</p>
                <p className="mt-1 text-sm text-slate">
                  Try adjusting or clearing your filters to see more opportunities.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-dark"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
