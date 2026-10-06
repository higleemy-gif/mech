import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { useLeadForm } from "../context/LeadFormContext";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { requestEnquiry } = useLeadForm();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(!entry.isIntersecting));
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => requestEnquiry()}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-semibold text-navy shadow-lg transition-transform hover:scale-105"
      aria-label="Request a Consultation"
    >
      <CalendarCheck className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Request a Consultation</span>
    </button>
  );
}
