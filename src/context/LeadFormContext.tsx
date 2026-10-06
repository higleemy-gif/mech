import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ServiceEnum } from "../lib/leadSchema";
import { smoothScrollTo } from "../lib/smoothScroll";

interface LeadFormContextValue {
  prefillService: ServiceEnum | null;
  notice: string | null;
  requestEnquiry: (service?: ServiceEnum) => void;
  consumePrefill: () => void;
  clearNotice: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | undefined>(undefined);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [prefillService, setPrefillService] = useState<ServiceEnum | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const requestEnquiry = useCallback((service?: ServiceEnum) => {
    if (service) {
      setPrefillService(service);
    }
    const result = smoothScrollTo("contact");
    if (!result.ok) {
      setNotice("Sorry, the contact form could not be reached. Please email info@imechglobal.com.");
    }
  }, []);

  const consumePrefill = useCallback(() => setPrefillService(null), []);
  const clearNotice = useCallback(() => setNotice(null), []);

  const value = useMemo(
    () => ({ prefillService, notice, requestEnquiry, consumePrefill, clearNotice }),
    [prefillService, notice, requestEnquiry, consumePrefill, clearNotice],
  );

  return <LeadFormContext.Provider value={value}>{children}</LeadFormContext.Provider>;
}

export function useLeadForm(): LeadFormContextValue {
  const ctx = useContext(LeadFormContext);
  if (!ctx) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return ctx;
}
