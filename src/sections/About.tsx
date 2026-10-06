import { Section } from "../components/Section";
import { StatCounter } from "../components/StatCounter";
import { STATS } from "../data/stats";

export function About() {
  return (
    <Section id="about" background="white" heading="Who We Are">
      <div className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-slate">
        <p>
          Founded in 2017, iMECH Global is a professional services organization supporting the Pharma, Biopharma,
          Clinical Research, Manufacturing, Engineering, and Corporate sectors. We deliver practical,
          business-focused people solutions that align talent strategy with organizational performance.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <StatCounter
            key={stat.id}
            target={stat.target}
            label={stat.label}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </Section>
  );
}
