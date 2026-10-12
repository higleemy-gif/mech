import { Section } from "../components/Section";

interface Row {
  title: string;
  body: string;
  image: string;
  alt: string;
}

const ROWS: Row[] = [
  {
    title: "The right alignment of People, Processes, Leadership & Culture",
    body: "We help organizations get the fundamentals right - aligning people, processes, leadership and culture so the whole system performs, not just its parts.",
    image: "/approach/alignment.jpg",
    alt: "Puzzle linking People, Processes, Leadership and Culture around organizational success",
  },
  {
    title: "Customized, outcome-oriented solutions",
    body: "Every engagement is tailored to your context. We focus on measurable outcomes rather than off-the-shelf frameworks, so the solution fits your business and delivers results.",
    image: "/approach/solutions.jpg",
    alt: "iMECH Global collage of teams collaborating, celebrating and recognizing people across organizations",
  },
  {
    title: "Deep industry, legal & academic expertise",
    body: "Our consultants combine industry depth with academic and legal credentials - including ISB, XLRI and Aon Hewitt backgrounds and labour-law experts - on every mandate.",
    image: "/approach/expertise.jpg",
    alt: "Scales of justice, law books, pharma manufacturing and graduation cap representing legal, industry and academic expertise",
  },
];

export function Approach() {
  return (
    <Section id="why-us" background="white" heading="Why iMECH">
      <div className="space-y-12">
        {ROWS.map((row, i) => (
          <div key={row.title} className="grid items-center gap-8 md:grid-cols-2">
            <div
              className={
                "overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 " +
                (i % 2 === 1 ? "md:order-2" : "")
              }
            >
              <img
                src={row.image}
                alt={row.alt}
                loading="lazy"
                className="aspect-video h-full w-full object-cover"
              />
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
