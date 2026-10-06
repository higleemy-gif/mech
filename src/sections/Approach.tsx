import { Section } from "../components/Section";

interface Row {
  title: string;
  body: string;
}

const ROWS: Row[] = [
  {
    title: "The right alignment of People, Processes, Leadership & Culture",
    body: "We help organizations get the fundamentals right - aligning people, processes, leadership and culture so the whole system performs, not just its parts.",
  },
  {
    title: "Customized, outcome-oriented solutions",
    body: "Every engagement is tailored to your context. We focus on measurable outcomes rather than off-the-shelf frameworks, so the solution fits your business and delivers results.",
  },
  {
    title: "Deep industry, legal & academic expertise",
    body: "Our consultants combine industry depth with academic and legal credentials - including ISB, XLRI and Aon Hewitt backgrounds and labour-law experts - on every mandate.",
  },
];

export function Approach() {
  return (
    <Section id="why-us" background="white" heading="Why iMECH">
      <div className="space-y-12">
        {ROWS.map((row, i) => (
          <div key={row.title} className="grid items-center gap-8 md:grid-cols-2">
            {/* TODO: Replace this placeholder with a real image asset for this approach row. */}
            <div
              className={
                "flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-bg-soft text-sm font-medium text-slate " +
                (i % 2 === 1 ? "md:order-2" : "")
              }
            >
              Image placeholder
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-semibold text-navy">{row.title}</h3>
              <p className="leading-relaxed text-slate">{row.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
