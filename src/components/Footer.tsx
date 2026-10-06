import { smoothScrollTo } from "../lib/smoothScroll";

const QUICK_LINKS = [
  { label: "Services", targetId: "services" },
  { label: "About", targetId: "about" },
  { label: "Contact", targetId: "contact" },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          {/* TODO: Replace /imech-global-logo-white.png with the final reversed (white) logo asset. */}
          <img src="/imech-global-logo-white.png" alt="iMECH Global" className="mb-4 h-12 w-auto" />
          <p className="font-heading text-lg font-semibold text-white">People. Performance. Transformation.</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">Quick Links</h2>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.targetId}>
                <button
                  type="button"
                  onClick={() => smoothScrollTo(link.targetId)}
                  className="text-sm text-white/80 hover:text-gold"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">Offices</h2>
          <address className="space-y-3 text-sm not-italic text-white/80">
            <p>B-102, Bobbili Empire, Jayabheri Park Road, Kompally, Hyderabad &ndash; 500 100</p>
            <p>B-603, Sun Sky Park, Vakil Bridge, SP Ring Road, Ahmedabad, Gujarat 380058</p>
            <p><a href="mailto:info@imechglobal.com" className="hover:text-gold">info@imechglobal.com</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-white/60 sm:px-8">
          &copy; 2025 iMECH Global. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
