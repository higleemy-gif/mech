import { Section } from "../components/Section";
import { ServiceCard } from "../components/ServiceCard";
import { SERVICES } from "../data/services";
import { useLeadForm } from "../context/LeadFormContext";

export function Services() {
  const { requestEnquiry } = useLeadForm();
  return (
    <Section id="services" background="soft" heading="Our Services">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <ServiceCard
            key={s.id}
            icon={s.icon}
            title={s.title}
            description={s.description}
            service={s.service}
            onEnquire={(service) => requestEnquiry(service)}
          />
        ))}
      </div>
    </Section>
  );
}
