import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, SERVICE_OPTIONS } from "../lib/leadSchema";
import type { LeadFormValues } from "../lib/leadSchema";
import { submitLead } from "../lib/submitLead";
import { useLeadForm } from "../context/LeadFormContext";
import { Button } from "./Button";

type SubmitState =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const TIMEOUT_MS = 30000;

function timeout(ms: number): Promise<never> {
  return new Promise((_resolve, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

const inputClass =
  "w-full rounded-md border border-gray-300 bg-bg px-4 py-3 text-slate focus:border-navy focus:outline-none";
const errorClass = "mt-1 text-sm text-red-600";
const labelClass = "mb-1 block text-sm font-medium text-navy";

export function LeadForm() {
  const { prefillService, consumePrefill } = useLeadForm();
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "" as LeadFormValues["service"],
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    if (prefillService) {
      setValue("service", prefillService, { shouldValidate: false });
      consumePrefill();
    }
  }, [prefillService, setValue, consumePrefill]);

  const onSubmit = async (values: LeadFormValues) => {
    // Honeypot: if filled, silently reject without calling submitLead.
    if (values.website && values.website.length > 0) {
      return;
    }
    // TODO: Generate and verify a reCAPTCHA token here before calling submitLead().
    setState({ kind: "pending" });
    try {
      await Promise.race([submitLead(values), timeout(TIMEOUT_MS)]);
      setState({ kind: "success" });
      reset();
    } catch {
      setState({ kind: "error", message: "Something went wrong sending your enquiry. Please try again." });
    }
  };

  const pending = state.kind === "pending";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-label="Consultation enquiry form">
      {/* Honeypot field - visually hidden and removed from tab order. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className={labelClass}>Name <span className="text-red-600">*</span></label>
          <input id="lead-name" type="text" className={inputClass} aria-invalid={errors.name ? "true" : "false"} {...register("name")} />
          {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="lead-company" className={labelClass}>Company Name <span className="text-red-600">*</span></label>
          <input id="lead-company" type="text" className={inputClass} aria-invalid={errors.company ? "true" : "false"} {...register("company")} />
          {errors.company ? <p className={errorClass}>{errors.company.message}</p> : null}
        </div>
        <div>
          <label htmlFor="lead-email" className={labelClass}>Email <span className="text-red-600">*</span></label>
          <input id="lead-email" type="email" className={inputClass} aria-invalid={errors.email ? "true" : "false"} {...register("email")} />
          {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
        </div>
        <div>
          <label htmlFor="lead-phone" className={labelClass}>Phone <span className="text-red-600">*</span></label>
          <input id="lead-phone" type="tel" className={inputClass} aria-invalid={errors.phone ? "true" : "false"} {...register("phone")} />
          {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="lead-service" className={labelClass}>Service of Interest <span className="text-red-600">*</span></label>
        <select id="lead-service" className={inputClass} aria-invalid={errors.service ? "true" : "false"} {...register("service")}>
          <option value="" disabled>Select a service</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.service ? <p className={errorClass}>Please select a service of interest</p> : null}
      </div>

      <div>
        <label htmlFor="lead-message" className={labelClass}>Message</label>
        <textarea id="lead-message" rows={4} className={inputClass} aria-invalid={errors.message ? "true" : "false"} {...register("message")} />
        {errors.message ? <p className={errorClass}>{errors.message.message}</p> : null}
      </div>

      <Button variant="gold" type="submit" disabled={pending} aria-busy={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Request a Consultation"}
      </Button>

      {state.kind === "success" ? (
        <p role="status" className="rounded-md bg-green-50 p-3 text-sm font-medium text-green-800">
          Thank you. Your enquiry has been received and we will be in touch shortly.
        </p>
      ) : null}
      {state.kind === "error" ? (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}
