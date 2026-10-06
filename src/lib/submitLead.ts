import type { LeadFormValues } from "./leadSchema";

export interface SubmitResult {
  ok: true;
}

// Stubbed async submit for v1 - there is no backend in this release.
export async function submitLead(data: LeadFormValues): Promise<SubmitResult> {
  // TODO: Connect to the real email/CRM endpoint here (e.g. POST to /api/lead,
  // Amazon SES, HubSpot, Salesforce, or a form service such as Formspree).
  // Replace the simulated delay below with the real network call.
  void data;
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}
