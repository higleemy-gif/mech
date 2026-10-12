import { Section } from "../components/Section";
import { LogoMarquee } from "../components/LogoMarquee";
import { CLIENTS } from "../data/industries";

export function Industries() {
  return (
    <Section id="industries" background="soft" heading="Companies where we place talent">
      <p className="mx-auto mb-10 max-w-2xl text-center text-slate">
        Trusted by leading organizations across pharma, FMCG, manufacturing, and finance to find
        the people who move their business forward.
      </p>
      <LogoMarquee items={CLIENTS} />
    </Section>
  );
}
