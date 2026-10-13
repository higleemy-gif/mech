import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { goToSection } from "../lib/sectionNav";
import { useLeadForm } from "../context/LeadFormContext";
import { Button } from "./Button";

interface NavLink {
  label: string;
  targetId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", targetId: "about" },
  { label: "Services", targetId: "services" },
  { label: "Industries", targetId: "industries" },
  { label: "Why Us", targetId: "why-us" },
  { label: "Contact", targetId: "contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { requestEnquiry } = useLeadForm();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const go = (targetId: string) => {
    setDrawerOpen(false);
    goToSection(navigate, targetId);
  };

  const goToJobs = () => {
    setDrawerOpen(false);
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <header
      id="site-header"
      role="banner"
      className={"sticky top-0 z-50 bg-bg transition-shadow " + (scrolled ? "shadow-md" : "")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); go("hero"); }}
          className="flex items-center"
          aria-label="iMECH Global home"
        >
          {/* TODO: Replace /imech-global-logo.png with the final header logo asset. */}
          <img src="/imech-global-logo.png" alt="iMECH Global" className="h-10 w-auto md:h-16" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.targetId}
              type="button"
              onClick={() => go(link.targetId)}
              className="text-sm font-medium text-navy transition-colors hover:text-gold"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={goToJobs}
            className="text-sm font-medium text-navy transition-colors hover:text-gold"
          >
            Careers
          </button>
          <Button variant="gold" onClick={() => requestEnquiry()}>
            Request a Consultation
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy md:hidden"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute right-0 top-0 flex h-full w-72 max-w-[80%] flex-col gap-2 bg-bg p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-lg font-semibold text-navy">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.targetId}
                type="button"
                onClick={() => go(link.targetId)}
                className="rounded px-2 py-3 text-left text-base font-medium text-navy hover:bg-bg-soft"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={goToJobs}
              className="rounded px-2 py-3 text-left text-base font-medium text-navy hover:bg-bg-soft"
            >
              Careers
            </button>
            <Button variant="gold" className="mt-4" onClick={() => { setDrawerOpen(false); requestEnquiry(); }}>
              Request a Consultation
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
