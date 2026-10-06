import { useLeadForm } from "../context/LeadFormContext";
import { smoothScrollTo } from "../lib/smoothScroll";
import { Button } from "../components/Button";

export function Hero() {
  const { requestEnquiry } = useLeadForm();
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-dark text-white"
    >
      {/* Decorative abstract globe / geometric motif (low opacity, ignored by assistive tech). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="320" cy="90" r="150" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="320" cy="90" r="100" stroke="currentColor" strokeWidth="1" />
          <circle cx="320" cy="90" r="50" stroke="currentColor" strokeWidth="1" />
          <line x1="180" y1="0" x2="470" y2="190" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="300" x2="320" y2="430" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-24 sm:px-8 sm:py-32">
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-6xl">
          People. Performance. Transformation.
        </h1>
        <p className="max-w-2xl text-lg text-white/85">
          Integrated HR, Talent and Management solutions that help organizations build the right workforce,
          develop their people, and drive sustainable transformation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="gold" onClick={() => requestEnquiry()}>Request a Consultation</Button>
          <Button variant="ghost" onClick={() => smoothScrollTo("services")}>Explore Services</Button>
        </div>
        <p className="mt-4 text-sm text-white/70">
          27+ years of combined expertise &bull; Serving Pharma, Manufacturing, Engineering &amp; Corporate sectors &bull; Since 2017
        </p>
      </div>
    </section>
  );
}
