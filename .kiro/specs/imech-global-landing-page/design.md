# Design Document

## Overview

iMECH Global's landing page is a single-page application (SPA) built with React + Vite + TypeScript, styled with Tailwind CSS (driven by centralized CSS-variable design tokens), animated with Framer Motion, iconed with lucide-react, and validated with React Hook Form + Zod. The page is a fully static artifact: `vite build` emits HTML/CSS/JS to `dist/`, which any static host serves with no backend at runtime.

The page is composed of twelve stacked regions rendered inside a single `<main>` document flow (with the announcement bar, header, and footer living outside `<main>` as their own landmarks). The primary conversion goal is the lead capture form; every call-to-action on the page smooth-scrolls to the Contact section, and service cards additionally pre-fill the form's "Service of Interest" field.

Version 1 has no server. The lead form submits to a stubbed async handler (`lib/submitLead.ts`) that simulates a network round-trip and carries `// TODO` markers for the real email/CRM endpoint and reCAPTCHA integration.

### Key design goals

- **Single source of truth for brand tokens.** All brand colors live once in `src/styles/tokens.css` as CSS variables; Tailwind maps named utilities to those variables via `theme.extend`. No hex value is hardcoded anywhere else.
- **Content centralization.** Services, values, stats, and industries are data arrays in `src/data/`, so copy changes never require touching JSX.
- **Accessibility first.** Semantic landmarks, a single `h1`, logical heading order, keyboard operability, visible focus rings, AA contrast, and `prefers-reduced-motion` support — targeting a Lighthouse accessibility score of 100.
- **Graceful degradation.** Missing scroll targets, failed font loads, missing image assets, and reduced-motion all have defined fallback behavior.

### Technology summary

| Concern | Choice | Rationale |
|---|---|---|
| Build / dev | Vite + TypeScript | Fast static build, first-class React + TS support, emits static assets |
| UI library | React 18 | Component model matches the section/component split |
| Styling | Tailwind CSS + CSS variables | Utility styling with a single token source consumed via `theme.extend` |
| Animation | Framer Motion | Declarative scroll-reveal, count-up, drawer transitions; reduced-motion aware |
| Icons | lucide-react | Consistent stroke icons; gold-stroke service icons |
| Forms | React Hook Form + Zod | Performant uncontrolled inputs + schema-based validation and type inference |

## Architecture

### Application shape

```
index.html  ──loads──>  src/main.tsx  ──renders──>  <App/>
                                                       │
                                                       ├─ <AnnouncementBar/>        (banner-adjacent, dismissible)
                                                       ├─ <Header/>                 (role="banner" + <nav>)
                                                       ├─ <main>
                                                       │    ├─ <Hero/>              id="hero"
                                                       │    ├─ <About/>             id="about"
                                                       │    ├─ <Services/>          id="services"
                                                       │    ├─ <Approach/>          id="why-us"
                                                       │    ├─ <Industries/>        id="industries"
                                                       │    ├─ <Values/>            id="values"
                                                       │    ├─ <MissionVision/>     id="mission-vision"
                                                       │    ├─ <CtaBand/>           id="cta"
                                                       │    └─ <Contact/>           id="contact"
                                                       ├─ <Footer/>                 (role="contentinfo")
                                                       └─ <FloatingCTA/>            (fixed, appears after hero)
```

`App` also provides a React context (`LeadFormContext`, see Service-Card Enquire Flow) that lets any CTA request a scroll-to-contact and optionally pre-fill the service field.

### Folder structure

```
project-root/
├─ index.html                 # head: title, meta, OG tags, favicon, JSON-LD
├─ public/
│  ├─ imech-global-logo.png        # REQUIRED placeholder asset (Header logo)
│  ├─ imech-global-logo-white.png  # REQUIRED placeholder asset (Footer reversed logo)
│  ├─ favicon.ico / favicon.svg    # derived from logo
│  └─ og-image.png                 # >= 1200x630 Open Graph image
├─ src/
│  ├─ main.tsx                 # React entry, imports styles/tokens.css + index.css
│  ├─ App.tsx                  # composes sections, provides LeadFormContext
│  ├─ components/              # reusable UI + chrome
│  │  ├─ Button.tsx
│  │  ├─ Section.tsx
│  │  ├─ ServiceCard.tsx
│  │  ├─ StatCounter.tsx
│  │  ├─ ValueCard.tsx
│  │  ├─ ScrollReveal.tsx
│  │  ├─ AnnouncementBar.tsx
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ FloatingCTA.tsx
│  ├─ sections/               # page content regions (1:1 with requirement sections)
│  │  ├─ Hero.tsx
│  │  ├─ About.tsx
│  │  ├─ Services.tsx
│  │  ├─ Approach.tsx
│  │  ├─ Industries.tsx
│  │  ├─ Values.tsx
│  │  ├─ MissionVision.tsx
│  │  ├─ CtaBand.tsx
│  │  └─ Contact.tsx          # renders LeadForm + office info
│  ├─ components/LeadForm.tsx  # the lead capture form (co-located with Contact)
│  ├─ lib/
│  │  ├─ submitLead.ts        # stubbed async submit (// TODO endpoint)
│  │  ├─ leadSchema.ts        # Zod schema + inferred types + SERVICE_OPTIONS
│  │  ├─ smoothScroll.ts      # header-offset scroll + missing-target handling
│  │  ├─ useScrollReveal.ts   # intersection-based reveal hook
│  │  └─ useReducedMotion.ts  # wraps prefers-reduced-motion
│  ├─ data/
│  │  ├─ services.ts          # 6 service lines
│  │  ├─ values.ts            # 5 values
│  │  ├─ stats.ts             # 4 stat counters
│  │  └─ industries.ts        # 13 industry chips
│  ├─ context/
│  │  └─ LeadFormContext.tsx  # shared enquire/scroll state
│  └─ styles/
│     ├─ tokens.css           # SINGLE SOURCE OF TRUTH for brand tokens
│     └─ index.css            # Tailwind directives + base/font-face
├─ tailwind.config.ts         # theme.extend maps utilities -> CSS variables
├─ postcss.config.js
├─ vite.config.ts
└─ README.md
```

### Component vs. Section split

The project separates **reusable UI/chrome** (`components/`) from **page content regions** (`sections/`):

- **`components/`** holds pieces reused across the page or that are structural chrome rather than page content: `Button`, `Section`, `ServiceCard`, `StatCounter`, `ValueCard`, `ScrollReveal`, plus the fixed/global chrome `AnnouncementBar`, `Header`, `Footer`, and `FloatingCTA`. `LeadForm` also lives here because it is a self-contained reusable form consumed by the Contact section.
- **`sections/`** holds the nine in-`<main>` content regions: `Hero`, `About`, `Services`, `Approach`, `Industries`, `Values`, `MissionVision`, `CtaBand`, `Contact`. Each composes `components/` primitives and reads from `data/`.

Rationale: `AnnouncementBar`, `Header`, `Footer`, and `FloatingCTA` are not part of the `<main>` document flow — they are chrome/landmarks positioned fixed or outside the content stack — so they belong with reusable components rather than the content-section set. The twelve requirement "sections" still map 1:1 to twelve components; they are just physically organized by role.

| Requirement region | Component | Folder |
|---|---|---|
| Announcement_Bar | `AnnouncementBar` | `components/` |
| Header / Nav_Drawer | `Header` | `components/` |
| Hero_Section | `Hero` | `sections/` |
| About_Section | `About` | `sections/` |
| Services_Section | `Services` | `sections/` |
| Approach_Section | `Approach` | `sections/` |
| Industries_Section | `Industries` | `sections/` |
| Values_Section | `Values` | `sections/` |
| Mission_Vision_Section | `MissionVision` | `sections/` |
| CTA_Band | `CtaBand` | `sections/` |
| Contact_Section | `Contact` (+ `LeadForm`) | `sections/` (+ `components/`) |
| Footer | `Footer` | `components/` |
| Floating_CTA | `FloatingCTA` | `components/` |

### Static build and `index.html` head

`index.html` is the Vite entry and carries all static head metadata:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO: title 30–60 chars, includes "iMECH Global" -->
    <title>iMECH Global | HR, Talent & Management Consulting</title>
    <meta name="description"
      content="iMECH Global delivers integrated HR, talent and management
      consulting that builds future-ready, high-performing organizations." />

    <!-- Open Graph -->
    <meta property="og:title" content="iMECH Global | HR, Talent & Management Consulting" />
    <meta property="og:description" content="Integrated HR, talent and management solutions for future-ready organizations." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.png" /> <!-- >= 1200x630 -->

    <!-- Favicon derived from logo -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="any" />

    <!-- Fonts: Poppins/Sora (headings), Inter (body) with swap -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />

    <!-- schema.org ProfessionalService JSON-LD (see SEO section) -->
    <script type="application/ld+json">{ /* ... */ }</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/main.tsx` imports `styles/tokens.css` first (so variables exist before Tailwind utilities resolve), then `styles/index.css`.

## Design Tokens and Theming

### `src/styles/tokens.css` (single source of truth)

```css
:root {
  /* Brand colors — the ONLY place hex values are declared */
  --navy:       #003264;
  --navy-dark:  #001E46;
  --gold:       #C89646;
  --gold-light: #DCB464;
  --slate:      #46505A;
  --bg:         #FFFFFF;
  --bg-soft:    #F5F7FA;

  /* Typography */
  --font-heading: "Poppins", "Sora", sans-serif;
  --font-body:    "Inter", sans-serif;
}
```

### Tailwind consumption (`tailwind.config.ts`)

Tailwind never sees a hex value; it references the CSS variables:

```ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:        "var(--navy)",
        "navy-dark": "var(--navy-dark)",
        gold:        "var(--gold)",
        "gold-light":"var(--gold-light)",
        slate:       "var(--slate)",
        bg:          "var(--bg)",
        "bg-soft":   "var(--bg-soft)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body:    "var(--font-body)",
      },
    },
  },
  plugins: [],
};
```

**Token rules (Req 1.9, 2.x):**
- Only `tokens.css` declares brand hex values. Components use utilities like `bg-navy`, `text-gold`, `font-heading`.
- Fallback behavior (Req 2.10): the CSS-variable values declared in `tokens.css` include a built-in fallback so that any utility referencing a token still resolves — color variables fall back to `--slate` (`#46505A`) and font variables to `sans-serif`. This is implemented by giving every consuming utility a `var(--token, <fallback>)` form in the one place the mapping is defined, or by ensuring `tokens.css` always defines every referenced variable.
- Font-load failure (Req 2.11): `--font-heading`/`--font-body` end in the `sans-serif` generic family, and fonts load with `display=swap`, so text renders in the fallback if a web font fails.
- Alternating backgrounds (Req 2.12): `Section` accepts a `background` prop (`white` | `soft` | `navy`) and the page alternates `white`/`soft` between consecutive light sections.

## Components and Interfaces

All components are TypeScript function components. Props are documented below as interfaces.

### Button

Reusable call-to-action and link button. Renders an `<a>` when `href` is provided, otherwise a `<button>`.

```ts
type ButtonVariant = "gold" | "navy" | "ghost";

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;              // when set, renders <a href>
  type?: "button" | "submit"; // for <button> only
  disabled?: boolean;
  "aria-label"?: string;
  "aria-busy"?: boolean;      // used by LeadForm pending state
}
```

| Variant | Appearance | Contrast rule |
|---|---|---|
| `gold` | gold background, **navy text** | Req 19.7: navy-on-gold meets AA |
| `navy` | navy background, white text | AA |
| `ghost` | transparent, outline, used for "Explore Services" | AA border/text |

Behavior: minimum tap target 44×44 px (Req 18.5); visible focus ring with ≥3:1 contrast (Req 19.5); operable via Enter/Space (native for `<button>`/`<a>`).

### Section

Generic wrapper giving each content region its landmark id, background, optional heading, and scroll-reveal.

```ts
interface SectionProps {
  id: string;                        // anchor target (e.g. "services")
  background?: "white" | "soft" | "navy";  // default "white"
  heading?: string;                  // rendered as h2
  headingLevel?: 2 | 3;              // default 2, preserves heading order
  reveal?: boolean;                  // wrap children in ScrollReveal (default true)
  children: React.ReactNode;
  className?: string;
}
```

Applies `scroll-margin-top` equal to header height so anchored scrolling clears the fixed header (Req 4.6).

### ServiceCard

```ts
import type { ServiceEnum } from "../lib/leadSchema";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;          // gold-stroke icon
  title: string;
  description: string;       // <= 120 chars (Req 7.8)
  service: ServiceEnum;      // enum value used to pre-fill LeadForm
  onEnquire: (service: ServiceEnum) => void;
}
```

Behavior: hover lifts the card (`translateY`) and applies a navy→gold accent within 300 ms (Req 7.9–7.10); exposes an "Enquire" link that calls `onEnquire(service)` (Req 7.11–7.13).

### StatCounter

```ts
interface StatCounterProps {
  target: number;        // numeric target (e.g. 27)
  label: string;         // e.g. "Yrs Expertise"
  prefix?: string;       // e.g. "Est. " (for "Est. 2017")
  suffix?: string;       // e.g. "+"
  durationMs?: number;   // default 2000, animation duration (Req 6.4)
}
```

Behavior: when ≥50% visible, counts from 0 to `target` within ≤2 s (Req 6.4); animates once (Req 6.6); under reduced motion shows final value immediately (Req 6.7). For `Est. 2017` the value is a plain year (prefix "Est. "), still shown at final value.

### ValueCard

```ts
interface ValueCardProps {
  label: string;        // Integrity | Client Partnership | Excellence | Agility | Impact
  icon: LucideIcon;
}
```

### ScrollReveal

Reusable fade-in / slide-up wrapper (Req 17).

```ts
interface ScrollRevealProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // default "div"
  delayMs?: number;
}
```

Behavior: reveals when ≥10% in view, 200–600 ms, once per load (Req 17.1); under reduced motion renders final state with no animation (Req 17.2–17.3).

### AnnouncementBar

```ts
interface AnnouncementBarProps {
  message?: string; // defaults to the required announcement text
}
```

Behavior: shows at top unless dismissed this session (Req 3.1, 3.6); navy background with ≥4.5:1 text (Req 3.2); dismiss control labeled "Dismiss announcement" (Req 3.3); dismiss removes within 300 ms and moves focus to next focusable element (Req 3.4); Enter/Space activate dismiss (Req 3.5). Dismissal state persists for the session via `sessionStorage` key `imech.announcement.dismissed`.

### Header

```ts
interface NavLink { label: string; targetId: string; }

interface HeaderProps {
  navLinks?: NavLink[]; // defaults to About, Services, Industries, Why Us, Contact
}
```

Behavior: left logo (Req 4.1); nav links in exact order (Req 4.2); gold "Request a Consultation" button (Req 4.3); fixed to top offset 0 (Req 4.4); drop shadow when scrollY > 10 px (Req 4.5); nav click smooth-scrolls with header offset (Req 4.6–4.7); below 768 px shows hamburger and hides inline links (Req 4.8); hamburger opens `Nav_Drawer` with all five links (Req 4.9); drawer link closes drawer ≤500 ms then scrolls ≤1000 ms (Req 4.10); Escape or outside click closes drawer ≤500 ms (Req 4.11); full keyboard operability with visible focus (Req 4.12). The drawer is implemented inside `Header` and traps focus while open without trapping it permanently (Req 19.4).

### Footer

```ts
interface FooterProps {}
```

Behavior: navy background (Req 15.1); reversed white logo with clear space ≥½ logo height (Req 15.2) via padding; tagline (Req 15.3); quick links Services/About/Contact (Req 15.4) that smooth-scroll ≤1 s (Req 15.5) or show an unavailable indication (Req 15.6); keyboard operable with focus ring (Req 15.7); both office addresses + email (Req 15.8); copyright (Req 15.9); excludes GST/PAN/tax numbers (Req 15.10).

### FloatingCTA

```ts
interface FloatingCTAProps {}
```

Behavior: hidden while any part of Hero is in view; appears fixed bottom-right within 300 ms once Hero's bottom passes above the viewport top (Req 16.1–16.2); activates scroll-to-contact ≤1 s (Req 16.3) or shows unavailable indication (Req 16.4); keyboard operable with focus ring (Req 16.5). Visibility derives from the same IntersectionObserver watching `#hero`.

### LeadForm

See the dedicated **Lead Form Design** section below for schema, states, and props.

```ts
interface LeadFormProps {
  // Reads prefill (service) and the scroll trigger from LeadFormContext;
  // no props required, but accepts an id for the form region.
  id?: string;
}
```

## Lead Form Design

### Zod schema (`src/lib/leadSchema.ts`)

```ts
import { z } from "zod";

// The 6 service lines offered in the dropdown (Req 14.4)
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
  name: z.string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be 100 characters or fewer"),            // Req 14.3

  email: z.string()
    .min(1, "Please enter your email")
    .max(254, "Email must be 254 characters or fewer")            // Req 14.3
    .refine(
      (v) => /^[^\s@]+@[^\s@]+$/.test(v),                          // local@domain (Req 14.6)
      "Please enter a valid email address"
    ),

  phone: z.string()
    .regex(/^\d{7,15}$/, "Enter a valid phone number (7–15 digits)"), // Req 14.3

  company: z.string()
    .trim()
    .min(1, "Please enter your company name")
    .max(100, "Company must be 100 characters or fewer"),         // Req 14.3

  service: serviceEnum,                                           // Req 14.3, 14.4

  message: z.string()
    .max(1000, "Message must be 1000 characters or fewer")        // Req 14.3
    .optional()
    .or(z.literal("")),

  // Honeypot — must be empty for a human (Req 14.13–14.14)
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
```

Notes:
- Phone normalization: the UI may format digits, but validation runs against stripped digits (`replace(/\D/g, "")`) so the `\d{7,15}` rule maps to the "7 to 15 digits" requirement.
- The email `refine` intentionally checks the structural shape "local part, @, domain" (Req 14.6) rather than a full RFC validator.

### Form wiring (React Hook Form)

```ts
const form = useForm<LeadFormValues>({
  resolver: zodResolver(leadSchema),
  mode: "onSubmit",
  defaultValues: { name: "", email: "", phone: "", company: "",
                   service: undefined as unknown as ServiceEnum,
                   message: "", website: "" },
});
```

### Honeypot field (`website`)

Rendered visually hidden and removed from tab order:

```tsx
<div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
  <label>Website<input tabIndex={-1} autoComplete="off" {...form.register("website")} /></label>
</div>
```

On submit, if `website` is non-empty the handler returns immediately **without** calling `submitLead` and **without** showing an error (Req 14.14).

### Submit handler (`src/lib/submitLead.ts`)

```ts
import type { LeadFormValues } from "./leadSchema";

export interface SubmitResult { ok: true }

// Stubbed async submit for v1 — no backend.
export async function submitLead(data: LeadFormValues): Promise<SubmitResult> {
  // TODO: Connect to real email/CRM endpoint here (e.g. POST to /api/lead,
  // SES, HubSpot, or a form service). Replace the simulated delay below.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}
```

The `LeadForm` component carries, near the submit wiring, a comment:
`// TODO: integrate reCAPTCHA token generation/verification before calling submitLead`.

### Submit flow and states

```
onSubmit(values)
  │
  ├─ if values.website !== ""  ──> return silently (bot) ...................... Req 14.14
  │
  ├─ RHF+Zod validation
  │     └─ invalid ──> render per-field errors, retain values, block submit ... Req 14.6–14.7
  │
  └─ valid ──> state = "pending"  (disable button, show spinner) ............. Req 14.9
        │
        ├─ Promise.race([ submitLead(values), timeout(30s) ])
        │
        ├─ resolves ok   ──> state = "success"; show confirmation; reset();
        │                     re-enable button ............................... Req 14.11
        ├─ rejects       ──> state = "error"; show retry message;
        │                     retain values; re-enable button ................ Req 14.12
        └─ timeout 30s   ──> state = "error"; show retry message;
                              re-enable button ............................... Req 14.10
```

State is a small discriminated union held in component state:

```ts
type SubmitState =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success" }
  | { kind: "error"; message: string };
```

The 30-second guard is implemented with `Promise.race` against a timeout promise so a never-settling stub still re-enables the UI (Req 14.10).

### Office contact information (Contact section)

The Contact section renders the form beside an info panel (two columns ≥768 px, stacked below — Req 14.1–14.2) containing:
- Corporate office: B-102, Bobbili Empire, Jayabheri Park Road, Kompally, Hyderabad – 500 100; phone +91 98856 46115 (Req 14.16).
- Regional office: B-603, Sun Sky Park, Vakil Bridge, SP Ring Road, Ahmedabad, Gujarat 380058; phone +91 97017 66019 (Req 14.17).
- Email info@imechglobal.com, web www.imechglobal.com, Managing Director Smt. Usha Shree (Req 14.18).
- Phones as `tel:` links, email as `mailto:` link (Req 14.19).

## Service-Card Enquire Flow

**Chosen mechanism: React Context (`LeadFormContext`).**

### Why context (vs. query param / zustand)

- A **query param** (`?service=...`) would require reading/writing the URL and re-parsing on mount; it also pollutes the URL for a transient intent and complicates a pure static page. Rejected.
- **zustand** is a capable global store but is an extra dependency for a single, tiny piece of shared intent. Overkill here. Rejected.
- **React Context** is built-in, keeps the pre-fill in memory (fitting a transient enquire action), and cleanly connects three unrelated subtrees (service cards, header/CTA buttons, and the form). Chosen.

### Context shape

```ts
interface LeadFormContextValue {
  prefillService: ServiceEnum | null;
  requestEnquiry: (service?: ServiceEnum) => void; // sets prefill + scrolls to #contact
  consumePrefill: () => void;                      // clears prefill after form applies it
}
```

### Pre-fill delivery

1. A `ServiceCard`'s "Enquire" link calls `onEnquire(service)`, wired to `requestEnquiry(service)`.
2. `requestEnquiry` sets `prefillService` and calls `smoothScrollTo("contact")`.
3. `LeadForm` subscribes to `prefillService`; a `useEffect` runs `form.setValue("service", prefillService)` when it changes, then calls `consumePrefill()`.
4. Non-service CTAs (Hero, CTA band, Floating, Header button) call `requestEnquiry()` with no argument — they scroll without changing the service field.
5. If the Contact section / form is not mounted, `smoothScrollTo` reports a missing target and the caller surfaces a brief "contact form could not be reached" indication while preserving scroll position (Req 7.14, 13.5, 16.4).

## Smooth-Scroll Utility (`src/lib/smoothScroll.ts`)

Centralizes anchored scrolling with fixed-header offset and graceful missing-target handling (Req 4.6–4.7, 5.8–5.9, 5.11, 7.12, 13.4–13.5, 15.5–15.6, 16.3–16.4).

```ts
export interface ScrollResult { ok: boolean } // ok=false => target missing

export function smoothScrollTo(targetId: string, headerOffset = 72): ScrollResult {
  const el = document.getElementById(targetId);
  if (!el) return { ok: false };                 // missing target: caller keeps position
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  return { ok: true };
}
```

- Returns `{ ok: false }` when the element does not exist; callers must NOT alter scroll position and may show an "unavailable" indication.
- Offsets by header height so the target's top is not obscured (Req 4.6).
- Honors reduced motion by jumping instantly.

## Animation Strategy (Framer Motion)

- **Scroll reveal:** a single `ScrollReveal` wrapper (and shared `variants`) drives fade-in/slide-up for sections, used via `whileInView` with `viewport={{ once: true, amount: 0.1 }}` (Req 17.1). Duration 0.2–0.6 s.
- **Reduced motion:** `useReducedMotion` (wrapping Framer's hook + `prefers-reduced-motion`) short-circuits all variants to the final state and disables count-up and decorative motion (Req 6.7, 17.2–17.3).
- **Count-up:** `StatCounter` uses `useInView` + an animated value; completes ≤2 s, once (Req 6.4–6.6).
- **Service card hover / header shadow / drawer:** CSS transitions and Framer transitions all ≤300–500 ms per their requirements.
- **No-animation fallback:** because reveal uses `whileInView` with final-state fallback, content is always readable even if animations do not run (Req 17.3).

## Data Models

Content is centralized in `src/data/` so copy edits never touch JSX. Types are shared across components.

### Services (`src/data/services.ts`) — Req 7

```ts
import { Users, GraduationCap, RefreshCw, BarChart3, Briefcase, ShieldCheck } from "lucide-react";
import type { ServiceEnum } from "../lib/leadSchema";
import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;      // <= 120 chars
  icon: LucideIcon;
  service: ServiceEnum;     // maps card -> dropdown value
}

export const SERVICES: ServiceItem[] = [
  { id: "workforce",      title: "Workforce Solutions",
    description: "Payroll Management, Manpower & Staffing, Executive Search & Head-Hunting",
    icon: Users,          service: "Workforce Solutions" },
  { id: "people-dev",     title: "People Development",
    description: "Training & Development, Leadership Development",
    icon: GraduationCap,  service: "People Development" },
  { id: "org-transform",  title: "Organization Transformation",
    description: "Management Consulting, OD & Change Management",
    icon: RefreshCw,      service: "Organization Transformation" },
  { id: "surveys",        title: "Surveys & Organizational Research",
    description: "Engagement, 360°, Climate, Pulse, TNA, Market surveys",
    icon: BarChart3,      service: "Surveys & Research" },
  { id: "hr-outsourcing", title: "HR Outsourcing",
    description: "End-to-end employee lifecycle management",
    icon: Briefcase,      service: "HR Outsourcing" },
  { id: "hr-compliance",  title: "HR Compliance Audit & Management",
    description: "Statutory & labour-law compliance, HR governance",
    icon: ShieldCheck,    service: "HR Compliance" },
];
```

Note: card titles are the full service names (Req 7.2–7.7); the `service` field maps to the dropdown option (Req 14.4), e.g. the "Surveys & Organizational Research" card maps to dropdown value "Surveys & Research".

### Stats (`src/data/stats.ts`) — Req 6.3

```ts
export interface StatItem {
  id: string; target: number; label: string; prefix?: string; suffix?: string;
}

export const STATS: StatItem[] = [
  { id: "est",        target: 2017, label: "Est. 2017",         prefix: "Est. " },
  { id: "experience", target: 27,   label: "Yrs Expertise",     suffix: "+" },
  { id: "lines",      target: 9,    label: "Service Lines" },
  { id: "industries", target: 20,   label: "Industries Served", suffix: "+" },
];
```

Display labels combine value + label to read "Est. 2017", "27+ Yrs Expertise", "9 Service Lines", "20+ Industries Served".

### Values (`src/data/values.ts`) — Req 11.1

```ts
import { ShieldCheck, Handshake, Award, Zap, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ValueItem { label: string; icon: LucideIcon; }

export const VALUES: ValueItem[] = [
  { label: "Integrity",         icon: ShieldCheck },
  { label: "Client Partnership",icon: Handshake },
  { label: "Excellence",        icon: Award },
  { label: "Agility",           icon: Zap },
  { label: "Impact",            icon: Target },
];
```

### Industries (`src/data/industries.ts`) — Req 10.2

```ts
// TODO: Replace these placeholder text chips with real client logos.
export const INDUSTRIES: string[] = [
  "MRF Ltd.", "Sun Pharma", "Aurobindo Pharma", "Ranbaxy", "Shilpa Medicare",
  "Karvy Group", "Orient Cement", "JK Paper Mills", "UB Group", "ITC Agri",
  "Kaveri Seeds", "ALPLA India", "Aizant Drug Research",
]; // exactly 13 (Req 10.2)

export const INDUSTRIES_MARQUEE = true; // marquee vs grid (Req 10.3–10.4)
```

### Required assets

| Asset | Path | Used by | Status |
|---|---|---|---|
| Header logo | `/public/imech-global-logo.png` | `Header` | **REQUIRED placeholder** — derive from source logo |
| Footer reversed logo | `/public/imech-global-logo-white.png` | `Footer` | **REQUIRED placeholder** — white/reversed version |
| Open Graph image | `/public/og-image.png` | `index.html` | REQUIRED, ≥1200×630 |
| Favicon | `/public/favicon.svg` + `.ico` | `index.html` | Derived from logo |

The existing source logo lives at `logo/MECH Global Consulting Logo.png` (Req 9.3). The two `public/` logo files must be derived from it and placed in `public/`; both are marked as required placeholder assets per Req 9.1–9.2 and carry `// TODO` markers where referenced.

## Accessibility and SEO

### Accessibility (Req 18, 19)

- **Landmarks:** `Header` renders `<header role="banner">` containing `<nav>`; page content is in exactly one `<main>`; `Footer` renders `<footer role="contentinfo">`. Every content block sits within a landmark (Req 19.1).
- **Headings:** exactly one `h1` (Hero headline); section headings are `h2`, nested headings `h3`, no skipped levels (Req 19.2).
- **Images:** informative images get descriptive `alt`; decorative motif and purely decorative images get empty `alt`/`aria-hidden` (Req 5.10, 19.3).
- **Keyboard:** all controls reachable/activatable via Tab/Shift+Tab/Enter/Space, logical order, no focus traps (drawer traps only while open) (Req 19.4).
- **Focus visibility:** global focus-visible ring with ≥3:1 contrast (Req 19.5).
- **Contrast:** AA across text and UI boundaries; CTA buttons are navy-on-gold; gold text restricted to large/decorative use (Req 19.6–19.7).
- **Reduced motion:** honored throughout (Req 17.2).
- **Tap targets:** ≥44×44 px on touch (Req 18.5).

### SEO and metadata (Req 20)

- `<title>` 30–60 chars including "iMECH Global".
- `<meta name="description">` 50–160 chars.
- Open Graph: `og:title`, `og:description`, `og:type`, `og:image` (≥1200×630).
- Favicon derived from logo.
- **schema.org `ProfessionalService` JSON-LD** in `index.html` head, including both offices:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "iMECH Global",
  "description": "Integrated HR, Talent & Management consulting.",
  "url": "https://www.imechglobal.com",
  "email": "info@imechglobal.com",
  "image": "https://www.imechglobal.com/og-image.png",
  "slogan": "People. Performance. Transformation.",
  "address": [
    {
      "@type": "PostalAddress",
      "name": "Corporate Office",
      "streetAddress": "B-102, Bobbili Empire, Jayabheri Park Road, Kompally",
      "addressLocality": "Hyderabad",
      "postalCode": "500 100",
      "addressCountry": "IN",
      "telephone": "+91 98856 46115"
    },
    {
      "@type": "PostalAddress",
      "name": "Regional Office",
      "streetAddress": "B-603, Sun Sky Park, Vakil Bridge, SP Ring Road",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380058",
      "addressCountry": "IN",
      "telephone": "+91 97017 66019"
    }
  ]
}
```

## Responsive Strategy

Mobile-first Tailwind with the standard breakpoints; the design treats two hard thresholds from the requirements:

| Breakpoint | Width | Layout behavior |
|---|---|---|
| base (mobile) | 320–767 px | single column; hamburger nav; stacked values, mission/vision, contact; no horizontal overflow at 375 px (Req 18.2, 11.3, 12.3, 14.2) |
| `md` (tablet) | ≥768 px | inline nav; values in one row; mission/vision two columns; contact two columns; body text ≥16 px (Req 4.8, 11.2, 12.2, 14.1, 18.3) |
| `lg`/`xl` (desktop) | ≥1280 px | full desktop layout, all sections/columns visible, no overflow (Req 18.4) |

All interactive controls maintain ≥44×44 px tap targets on touch; content and functionality are preserved from 320–1920 px (Req 18.1).

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Most of this feature is UI rendering, layout, animation, and static content, which are covered by component/snapshot/accessibility tests rather than property-based tests (see Testing Strategy). The properties below capture the pure-logic surface that genuinely varies with input: the Lead Form validation schema, the honeypot/submit guards, the smooth-scroll target resolution, the StatCounter terminal value, the FloatingCTA visibility relationship, the Enquire→service mapping, and the centralized content-dataset invariants.

### Property 1: Smooth-scroll resolves exactly to existing targets

*For any* target id, `smoothScrollTo(id)` returns `ok === true` and performs a scroll if and only if an element with that id exists in the document; when no such element exists it returns `ok === false` and leaves the scroll position unchanged.

**Validates: Requirements 4.6, 4.7, 5.11, 7.14, 13.4, 13.5, 15.5, 15.6, 16.3, 16.4**

### Property 2: StatCounter settles on its exact target value

*For any* non-negative integer target value, after the count-up completes (or immediately when Reduced_Motion is set), the StatCounter's displayed numeric value equals exactly that target value together with its configured prefix/suffix and label.

**Validates: Requirements 6.4, 6.5, 6.7**

### Property 3: StatCounter does not replay once completed

*For any* target value, triggering the StatCounter's reveal more than once results in the final target value being displayed on every subsequent trigger, with the count-up animation path invoked at most once.

**Validates: Requirements 6.6**

### Property 4: Service descriptions stay within the length bound

*For all* items in the services dataset, the description is at most 120 characters long.

**Validates: Requirements 7.8**

### Property 5: Enquire sets the matching Service of Interest

*For any* service card, activating its Enquire action sets the Lead_Form's `service` value to exactly that card's mapped service enum value and triggers a scroll to the Contact section.

**Validates: Requirements 7.12, 7.13**

### Property 6: Industries dataset contains exactly the specified 13 names

*For all* renderings of the Industries section, the industries dataset has exactly 13 entries and its set of names equals exactly the specified set (MRF Ltd., Sun Pharma, Aurobindo Pharma, Ranbaxy, Shilpa Medicare, Karvy Group, Orient Cement, JK Paper Mills, UB Group, ITC Agri, Kaveri Seeds, ALPLA India, Aizant Drug Research).

**Validates: Requirements 10.2**

### Property 7: Values dataset contains exactly the five specified labels

*For all* renderings of the Values section, the values dataset has exactly 5 entries whose labels equal exactly Integrity, Client Partnership, Excellence, Agility, and Impact.

**Validates: Requirements 11.1**

### Property 8: Valid lead data is accepted

*For any* lead record whose name is 1–100 characters, email is 1–254 characters and matches the shape local-part `@` domain-part, phone is 7–15 digits, company is 1–100 characters, service is one of the six allowed options, message is 0–1000 characters, and honeypot is empty, `leadSchema.safeParse` succeeds.

**Validates: Requirements 14.3, 14.4, 14.6**

### Property 9: Lead data violating a constraint is rejected on the offending field

*For any* lead record that violates exactly one field constraint (empty required field, over-length value, out-of-range phone digit count, or malformed email), `leadSchema.safeParse` fails and the resulting error references that specific field, and submission is blocked while entered values are retained.

**Validates: Requirements 14.6, 14.7**

### Property 10: Valid submissions invoke the submit handler once

*For any* lead record that passes validation and has an empty honeypot field, submitting the form invokes `submitLead` exactly once with the parsed form values.

**Validates: Requirements 14.8**

### Property 11: Filled honeypot blocks submission silently

*For any* non-empty honeypot value, submitting the form rejects the submission without invoking `submitLead` and without displaying an error to the Visitor.

**Validates: Requirements 14.13, 14.14**

### Property 12: FloatingCTA visibility mirrors Hero visibility

*For any* Hero-in-view state, the FloatingCTA is visible if and only if no part of the Hero_Section is within the viewport.

**Validates: Requirements 16.1, 16.2**

## Error Handling

| Scenario | Handling | Requirement |
|---|---|---|
| Nav/CTA target section missing | `smoothScrollTo` returns `{ ok: false }`; caller keeps scroll position; CTAs show a brief "contact form could not be reached / section unavailable" indication | 4.7, 5.11, 7.14, 13.5, 15.6, 16.4 |
| Form validation failure | Per-field inline error messages adjacent to each affected field; submission blocked; entered values retained | 14.6, 14.7 |
| Honeypot filled | Submission rejected silently; no handler call; no error shown | 14.14 |
| Submit handler rejects | Error message inviting retry; button re-enabled; values retained | 14.12 |
| Submit handler never settles | 30 s `Promise.race` timeout → error message + retry; button re-enabled | 14.10 |
| Web font fails to load | `font-swap` + `sans-serif` generic fallback renders text | 2.11 |
| Undefined theme token referenced | Resolves to slate `#46505A` (color) or `sans-serif` (font) fallback | 2.10 |
| Image asset missing | Placeholder image with visible "placeholder" text; `// TODO` marker in source | 8.7, 9.1, 9.2 |
| Animations do not execute | Content rendered in final visible/readable state (reveal fallback) | 17.3 |
| Reduced motion preference | All scroll-reveal, count-up, and decorative motion suppressed; final states shown | 6.7, 17.2 |

## Testing Strategy

The feature combines a small pure-logic core (best covered by property-based tests) with a large UI/presentation surface (best covered by component, snapshot, and accessibility tests). Both are used.

### Tooling

- **Test runner:** Vitest (Vite-native, fast, TS-first).
- **Component tests:** React Testing Library + `@testing-library/user-event` with jsdom.
- **Property-based testing:** `fast-check` (the standard PBT library for TypeScript). Properties are NOT hand-rolled.
- **Accessibility:** `jest-axe` / `axe-core` in component tests, plus manual/Lighthouse audits on the production build.
- **Audits:** Lighthouse (mobile config) against the `dist/` build for performance/accessibility/best-practices/SEO scores.

### Property-based tests (fast-check)

Each correctness property is implemented by exactly **one** property-based test running a **minimum of 100 iterations** (`fc.assert(fc.property(...), { numRuns: 100 })`). Each test is tagged with a comment referencing the design property:

```ts
// Feature: imech-global-landing-page, Property 8: Valid lead data is accepted
// For any lead record whose fields are all within bounds and whose email
// matches local@domain, leadSchema.safeParse succeeds.
```

Property-to-test mapping:

| Property | Target under test | Generators |
|---|---|---|
| 1 | `smoothScrollTo` | present vs absent target ids against a DOM fixture |
| 2 | `StatCounter` final value | non-negative integer targets, reduced-motion on/off |
| 3 | `StatCounter` no-replay | integer targets, repeated reveal triggers |
| 4 | `SERVICES` dataset | iterate dataset (deterministic invariant asserted under `fc`/direct) |
| 5 | Enquire → `service` mapping | arbitrary pick among the 6 service cards |
| 6 | `INDUSTRIES` dataset | set/length invariant |
| 7 | `VALUES` dataset | set/length invariant |
| 8 | `leadSchema` (accept) | in-bounds strings incl. boundary lengths (1/100, 254, 7/15 digits) |
| 9 | `leadSchema` (reject) | records with exactly one injected violation + field selector |
| 10 | `LeadForm` submit | valid records, mocked `submitLead` spy |
| 11 | `LeadForm` honeypot | arbitrary non-empty honeypot strings |
| 12 | `FloatingCTA` visibility | boolean hero-in-view state |

Generators deliberately cover edge cases called out in the requirements: boundary lengths (0, 1, 100, 254), phone digit boundaries (6/7/15/16), whitespace-only names, and non-ASCII/encoded characters.

### Unit / example tests

- Theme fallback: undefined token resolves to slate / sans-serif (Req 2.10).
- Announcement dismissal persists across remount within a session (Req 3.6).
- Submit state machine: three example tests driving `submitLead` to resolve (success + reset), reject (error + retain), and hang past 30 s (timeout + retry) (Req 14.10–14.12).
- SEO head: title length ∈ [30, 60] and includes "iMECH Global"; meta description ∈ [50, 160] (Req 20.1–20.2).

### Component / render tests (React Testing Library)

- Landmarks: exactly one `main`, distinct `banner`/`navigation`/`contentinfo` (Req 19.1).
- Headings: exactly one `h1`, descending order without skips (Req 19.2).
- Presence/labels: nav links in order, "Request a Consultation" buttons, dismiss control label "Dismiss announcement", `tel:`/`mailto:` links, six service cards, five values (Req 3.3, 4.2, 7.1, 11.1, 14.19).
- Keyboard: Tab order, Enter/Space activation, drawer Escape/outside-click close, no focus trap (Req 4.11, 4.12, 19.4).
- Reduced-motion rendering shows final state (Req 17.2–17.3).

### Accessibility and audit checks

- `jest-axe` assertion of no violations on the composed page in component tests.
- Lighthouse mobile audit on the production build targeting performance ≥90 and accessibility/best-practices/SEO = 100 (Req 21.1–21.4). Full WCAG conformance also requires manual testing with assistive technologies and expert review beyond automated checks.

### Build verification

- `vite build` must exit zero and emit static assets to `dist/` (Req 1.6–1.7); a CI step runs the build before audits.

## Design Decisions and Rationale

- **Context over query-param/zustand for enquire pre-fill:** built-in, in-memory, transient intent, connects three disjoint subtrees without URL pollution or an extra dependency.
- **Single CSS-variable token file consumed by Tailwind `theme.extend`:** satisfies Req 1.9/2.9 (one source of truth) and keeps components hex-free; token edits propagate everywhere.
- **Centralized `data/` arrays:** copy/content lives in one place, enabling the dataset-invariant properties (4, 6, 7) and making content edits safe.
- **`Promise.race` timeout for submit:** guarantees the UI recovers even if the stubbed (or future real) handler never settles (Req 14.10).
- **Component vs. section split by role:** fixed/global chrome (`AnnouncementBar`, `Header`, `Footer`, `FloatingCTA`) in `components/`, in-`<main>` content regions in `sections/`, while preserving a 1:1 mapping to the twelve requirement regions.
- **fast-check for the pure-logic core only:** PBT is applied where behavior varies with input (validation, scroll resolution, mappings, invariants); UI/visual/animation criteria use component, snapshot, and axe tests instead, per the PBT applicability guidance.
