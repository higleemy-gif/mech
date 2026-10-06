import { useLeadForm } from "../context/LeadFormContext";
import { Button } from "../components/Button";

export function CtaBand() {
  const { requestEnquiry } = useLeadForm();
  return (
    <section id="cta" className="w-full bg-navy-dark">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-16 text-center sm:px-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Let's build high-performing organizations together.
        </h2>
        <Button variant="gold" onClick={() => requestEnquiry()}>Request a Consultation</Button>
      </div>
    </section>
  );
}
