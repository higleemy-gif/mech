import { Section } from "../components/Section";
import { INDUSTRIES } from "../data/industries";

export function Industries() {
  return (
    <Section id="industries" background="soft" heading="Trusted across industries">
      {/* TODO: Replace these placeholder text chips with real client logos. */}
      <div className="flex flex-wrap justify-center gap-3">
        {INDUSTRIES.map((name) => (
          <span
            key={name}
            className="rounded-full border border-gray-200 bg-bg px-4 py-2 text-sm font-medium text-navy shadow-sm"
          >
            {name}
          </span>
        ))}
      </div>
    </Section>
  );
}
