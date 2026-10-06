import { Section } from "../components/Section";
import { LeadForm } from "../components/LeadForm";
import { useLeadForm } from "../context/LeadFormContext";
import { Phone, Mail, Globe, MapPin, User } from "lucide-react";

export function Contact() {
  const { notice } = useLeadForm();
  return (
    <Section id="contact" background="soft" heading="Request a Consultation">
      {notice ? (
        <p role="alert" className="mx-auto mb-6 max-w-3xl rounded-md bg-red-50 p-3 text-center text-sm font-medium text-red-700">
          {notice}
        </p>
      ) : null}
      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-xl bg-bg p-6 shadow-sm sm:p-8">
          <LeadForm />
        </div>
        <div className="space-y-6 text-slate">
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-navy">
              <MapPin className="h-5 w-5 text-gold" aria-hidden="true" /> Corporate Office
            </h3>
            <p className="leading-relaxed">B-102, Bobbili Empire, Jayabheri Park Road, Kompally, Hyderabad &ndash; 500 100</p>
            <p className="mt-1">
              <a className="inline-flex items-center gap-2 font-medium text-navy hover:text-gold" href="tel:+919885646115">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" /> +91 98856 46115
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-navy">
              <MapPin className="h-5 w-5 text-gold" aria-hidden="true" /> Regional Office (Gujarat)
            </h3>
            <p className="leading-relaxed">B-603, Sun Sky Park, Vakil Bridge, SP Ring Road, Ahmedabad, Gujarat 380058</p>
            <p className="mt-1">
              <a className="inline-flex items-center gap-2 font-medium text-navy hover:text-gold" href="tel:+919701766019">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" /> +91 97017 66019
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <a className="inline-flex items-center gap-2 font-medium text-navy hover:text-gold" href="mailto:info@imechglobal.com">
                <Mail className="h-4 w-4 text-gold" aria-hidden="true" /> info@imechglobal.com
              </a>
            </p>
            <p className="flex items-center gap-2"><Globe className="h-4 w-4 text-gold" aria-hidden="true" /> www.imechglobal.com</p>
            <p className="flex items-center gap-2"><User className="h-4 w-4 text-gold" aria-hidden="true" /> Managing Director: Smt. Usha Shree</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
