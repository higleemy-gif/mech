import { Section } from "../components/Section";
import { ValueCard } from "../components/ValueCard";
import { VALUES } from "../data/values";

export function Values() {
  return (
    <Section id="values" background="white" heading="Our Values">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
        {VALUES.map((v) => (
          <ValueCard key={v.label} label={v.label} icon={v.icon} />
        ))}
      </div>
    </Section>
  );
}
