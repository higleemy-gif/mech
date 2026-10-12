import { Section } from "../components/Section";

interface Point {
  label: string;
  text: string;
}

interface Row {
  title: string;
  body?: string;
  points?: Point[];
  image: string;
  alt: string;
}

const ROWS: Row[] = [
  {
    title: "iMECH Global — People. Performance. Transformation.",
    points: [
      { label: "People", text: "Recruitment, RPO, HR outsourcing and talent management." },
      {
        label: "Performance",
        text: "HR systems, performance management, leadership development and employee productivity.",
      },
      {
        label: "Transformation",
        text: "Organisational development, culture change and HR strategy.",
      },
    ],
    image: "/approach/alignment.jpg",
    alt: "Puzzle linking People, Processes, Leadership and Culture around organizational success",
  },
  {
    title: "Customized, outcome-oriented solutions",
    body: "Every organization is unique. We design practical, customized HR solutions aligned with the business goals, workforce needs, and organizational challenges—with a clear focus on measurable outcomes and sustainable growth.",
    image: "/approach/solutions.jpg",
    alt: "iMECH Global collage of teams collaborating, celebrating and recognizing people across organizations",
  },
  {
    title: "Deep industry, legal & academic expertise",
    body: "We combine deep industry experience, academic expertise, and up-to-date knowledge of India's latest Labor Codes, employment laws, and statutory compliance requirements. We help organizations navigate regulatory changes, strengthen HR governance, and implement compliant people practices across the entire employee lifecycle—from hire to retire.",
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
                className="aspect-[3/2] h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-semibold text-navy">{row.title}</h3>
              {row.body ? <p className="leading-relaxed text-slate">{row.body}</p> : null}
              {row.points ? (
                <ul className="space-y-2 text-slate">
                  {row.points.map((p) => (
                    <li key={p.label} className="leading-relaxed">
                      <span className="font-semibold text-navy">{p.label}:</span> {p.text}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
