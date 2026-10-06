import { Section } from "../components/Section";

export function MissionVision() {
  return (
    <Section id="mission-vision" background="navy">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-white/5 p-8">
          <h2 className="mb-3 text-2xl font-semibold text-gold">Our Mission</h2>
          <p className="leading-relaxed text-white/85">
            To help organizations build the right workforce, develop their people, and drive sustainable
            transformation through practical, business-focused HR and management solutions.
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/5 p-8">
          <h2 className="mb-3 text-2xl font-semibold text-gold">Our Vision</h2>
          <p className="leading-relaxed text-white/85">
            To be the trusted partner of choice for people, performance and transformation across the
            industries we serve.
          </p>
        </div>
      </div>
    </Section>
  );
}
