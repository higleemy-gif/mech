import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Workforce Solutions",
  "People Development",
  "Organization Transformation",
  "Surveys & Research",
  "HR Outsourcing",
  "HR Compliance",
] as const;

export const serviceEnum = z.enum(SERVICE_OPTIONS);
export type ServiceEnum = z.infer<typeof serviceEnum>;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .min(1, "Please enter your email")
    .max(254, "Email must be 254 characters or fewer")
    .refine((v) => /^[^\s@]+@[^\s@]+$/.test(v), "Please enter a valid email address"),
  phone: z
    .string()
    .refine((v) => /^\d{7,15}$/.test(v.replace(/\D/g, "")), "Enter a valid phone number (7 to 15 digits)"),
  company: z
    .string()
    .trim()
    .min(1, "Please enter your company name")
    .max(100, "Company must be 100 characters or fewer"),
  service: serviceEnum,
  message: z.string().max(1000, "Message must be 1000 characters or fewer").optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
