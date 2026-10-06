# Implementation Plan: iMECH Global Landing Page

## Overview

Convert the approved design into a sequence of small, independently-verifiable coding tasks for a code-generation agent. Each task builds on the previous one and ends by wiring new code into the running page so there is no orphaned code. The stack is React + Vite + TypeScript, Tailwind CSS (driven by centralized CSS-variable tokens), Framer Motion, lucide-react, and React Hook Form + Zod. Tests use Vitest + React Testing Library + fast-check + jest-axe.

Global styling constraint (applies to every styling task below): **no hex color value may appear outside `src/styles/tokens.css`.** Components must consume brand colors only through the Tailwind token utilities (`bg-navy`, `text-gold`, `font-heading`, etc.). This rule implements Requirements 1.9 and 2.9.

Tasks marked with `*` are optional (tests) and can be skipped for a faster MVP, but are recommended. Tasks tagged **[PLACEHOLDER ASSET]** require binary assets (logo, favicon, OG image) that the user must supply; the agent creates clearly-labeled placeholder files and `// TODO` markers in their place.

## Tasks

- [ ] 1. Scaffold Vite + TypeScript + Tailwind project
  - Initialize a Vite React + TypeScript project at the workspace root; add dependencies: `react`, `react-dom`, `framer-motion`, `lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`.
  - Add dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `fast-check`, `jest-axe`.
  - Create `tailwind.config.ts`, `postcss.config.js`, `vite.config.ts` (with Vitest `test` config using the jsdom environment and a setup file), and `tsconfig.json`.
  - Create `index.html` as the Vite entry with `<div id="root">` and `<script type="module" src="/src/main.tsx">`, and `src/main.tsx` rendering `<App/>` (temporary placeholder App is fine at this step).
  - Acceptance: `npm install` succeeds; `npm run dev` serves a blank page; `npm run build` exits zero and emits static assets to `dist/`; `npm run test` runs (zero tests) without config errors.
  - Files: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vitest.setup.ts`.
  - _Design: Overview, Architecture (Static build), Technology summary, Testing Strategy (Tooling)_
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [ ] 2. Define brand design tokens and Tailwind wiring
  - [ ] 2.1 Create `src/styles/tokens.css` as the single source of truth for brand tokens
    - Declare CSS variables for `--navy #003264`, `--navy-dark #001E46`, `--gold #C89646`, `--gold-light #DCB464`, `--slate #46505A`, `--bg #FFFFFF`, `--bg-soft #F5F7FA`, plus `--font-heading` ("Poppins","Sora",sans-serif) and `--font-body` ("Inter",sans-serif).
    - Ensure every token has a built-in fallback so an undefined reference resolves to slate `#46505A` (colors) or `sans-serif` (fonts).
    - Constraint: this is the ONLY file in the project allowed to contain hex values.
    - Create `src/styles/index.css` with Tailwind directives (`@tailwind base/components/utilities`), the global `:focus-visible` ring (≥3:1 contrast), and `@font-face`/font setup; import both stylesheets from `src/main.tsx` (tokens first).
    - Acceptance: variables are defined once; `index.css` references no raw hex; focus ring visible on tab.
    - Files: `src/styles/tokens.css`, `src/styles/index.css`, `src/main.tsx` (imports).
    - _Design: Design Tokens and Theming (tokens.css)_
    - _Requirements: 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11_
  - [ ] 2.2 Wire `tailwind.config.ts` theme.extend to the CSS variables
    - Map `colors` (navy, navy-dark, gold, gold-light, slate, bg, bg-soft) and `fontFamily` (heading, body) to `var(--token)` references; set `content` globs for `index.html` and `src/**/*.{ts,tsx}`.
    - Constraint: config references only `var(--...)`, never hex.
    - Acceptance: utilities `bg-navy`, `text-gold`, `font-heading` render the token colors/fonts in the dev server.
    - Files: `tailwind.config.ts`.
    - _Design: Design Tokens and Theming (Tailwind consumption)_
    - _Requirements: 1.9, 2.9, 2.12_
  - [ ]* 2.3 Write unit test for theme-token fallback behavior
    - Assert an undefined/missing token reference resolves to slate (`#46505A`) for colors and `sans-serif` for fonts.
    - Files: `src/styles/tokens.test.ts`.
    - _Design: Error Handling (Undefined theme token referenced), Testing Strategy (Unit tests)_
    - _Requirements: 2.10, 2.11_

- [ ] 3. Build data arrays and shared utilities
  - [ ] 3.1 Create centralized content data arrays
    - `src/data/services.ts` (6 `ServiceItem`s with full titles, ≤120-char descriptions, lucide icons, and `service` enum mapping), `src/data/stats.ts` (4 `StatItem`s), `src/data/values.ts` (5 `ValueItem`s), `src/data/industries.ts` (exactly 13 names + `INDUSTRIES_MARQUEE` flag with a `// TODO` to replace chips with real logos).
    - Acceptance: datasets match the design exactly (6 / 4 / 5 / 13 entries); descriptions ≤120 chars.
    - Files: `src/data/services.ts`, `src/data/stats.ts`, `src/data/values.ts`, `src/data/industries.ts`.
    - _Design: Data Models_
    - _Requirements: 6.3, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 10.2, 10.5, 11.1_
  - [ ] 3.2 Create the Zod lead schema and service options
    - `src/lib/leadSchema.ts` exporting `SERVICE_OPTIONS` (6 values), `serviceEnum`, `ServiceEnum`, `leadSchema` (name 1–100, email 1–254 matching local@domain, phone 7–15 digits, company 1–100, service enum, message 0–1000, honeypot `website` max 0), and `LeadFormValues`.
    - Acceptance: schema compiles; boundary values parse as designed.
    - Files: `src/lib/leadSchema.ts`.
    - _Design: Lead Form Design (Zod schema)_
    - _Requirements: 14.3, 14.4, 14.6_
  - [ ] 3.3 Create smooth-scroll utility
    - `src/lib/smoothScroll.ts` exporting `smoothScrollTo(targetId, headerOffset=72): ScrollResult`; returns `{ ok:false }` without moving when the target is missing, offsets by header height, honors reduced motion (jump instantly).
    - Files: `src/lib/smoothScroll.ts`.
    - _Design: Smooth-Scroll Utility_
    - _Requirements: 4.6, 4.7, 5.11_
  - [ ] 3.4 Create motion preference and scroll-reveal hooks
    - `src/lib/useReducedMotion.ts` wrapping `prefers-reduced-motion`; `src/lib/useScrollReveal.ts` (IntersectionObserver-based reveal, once per load at ≥10% visible).
    - Files: `src/lib/useReducedMotion.ts`, `src/lib/useScrollReveal.ts`.
    - _Design: Animation Strategy_
    - _Requirements: 17.1, 17.2, 17.3_
  - [ ]* 3.5 Write property test for smooth-scroll target resolution
    - **Property 1: Smooth-scroll resolves exactly to existing targets**
    - **Validates: Requirements 4.6, 4.7, 5.11, 7.14, 13.4, 13.5, 15.5, 15.6, 16.3, 16.4**
    - fast-check, ≥100 runs, present vs absent ids against a DOM fixture.
    - Files: `src/lib/smoothScroll.test.ts`.
  - [ ]* 3.6 Write property tests for the content datasets
    - **Property 4: Service descriptions stay within the length bound** — Validates: Requirements 7.8
    - **Property 6: Industries dataset contains exactly the specified 13 names** — Validates: Requirements 10.2
    - **Property 7: Values dataset contains exactly the five specified labels** — Validates: Requirements 11.1
    - Files: `src/data/datasets.test.ts`.
  - [ ]* 3.7 Write property tests for the Zod lead schema
    - **Property 8: Valid lead data is accepted** — Validates: Requirements 14.3, 14.4, 14.6
    - **Property 9: Lead data violating a constraint is rejected on the offending field** — Validates: Requirements 14.6, 14.7
    - fast-check, ≥100 runs, boundary lengths and single-violation generators.
    - Files: `src/lib/leadSchema.test.ts`.

- [ ] 4. Build reusable UI primitives
  - [ ] 4.1 Implement `Button` component
    - Variants `gold` (gold bg, navy text), `navy`, `ghost`; renders `<a>` when `href` set else `<button>`; ≥44×44 px tap target; visible focus ring; Enter/Space operable; supports `aria-label`/`aria-busy`.
    - Constraint: colors via token utilities only (no hex).
    - Files: `src/components/Button.tsx`.
    - _Design: Components and Interfaces (Button)_
    - _Requirements: 18.5, 19.5, 19.7_
  - [ ] 4.2 Implement `Section` wrapper
    - Props `id`, `background` (white/soft/navy), `heading`, `headingLevel` (2|3), `reveal`; applies `scroll-margin-top` equal to header height; renders landmark-friendly structure; alternates white/soft backgrounds via prop.
    - Constraint: background colors via token utilities only.
    - Files: `src/components/Section.tsx`.
    - _Design: Components and Interfaces (Section), Responsive Strategy_
    - _Requirements: 2.12, 4.6, 19.2_
  - [ ] 4.3 Implement `ScrollReveal` component
    - Fade-in/slide-up via Framer `whileInView` (`once:true`, `amount:0.1`, 0.2–0.6 s); under reduced motion renders final state with no animation.
    - Files: `src/components/ScrollReveal.tsx`.
    - _Design: Animation Strategy_
    - _Requirements: 17.1, 17.2, 17.3_
  - [ ] 4.4 Implement `StatCounter` component
    - Counts 0→target within ≤2 s when ≥50% visible; animates once; shows final value immediately under reduced motion; supports prefix/suffix/label.
    - Files: `src/components/StatCounter.tsx`.
    - _Design: Components and Interfaces (StatCounter)_
    - _Requirements: 6.4, 6.5, 6.6, 6.7_
  - [ ] 4.5 Implement `ServiceCard` and `ValueCard` components
    - `ServiceCard`: gold-stroke icon, title, ≤120-char description, hover lift + navy→gold accent within 300 ms, "Enquire" link calling `onEnquire(service)`. `ValueCard`: label + icon.
    - Constraint: colors via token utilities only.
    - Files: `src/components/ServiceCard.tsx`, `src/components/ValueCard.tsx`.
    - _Design: Components and Interfaces (ServiceCard, ValueCard)_
    - _Requirements: 7.8, 7.9, 7.10, 7.11, 11.1_
  - [ ]* 4.6 Write component tests for primitives
    - Button renders `<a>` vs `<button>`, is keyboard operable, has ≥44px target; StatCounter reduced-motion final value; ServiceCard hover/enquire callback.
    - **Property 2: StatCounter settles on its exact target value** — Validates: Requirements 6.4, 6.5, 6.7
    - **Property 3: StatCounter does not replay once completed** — Validates: Requirements 6.6
    - Files: `src/components/Button.test.tsx`, `src/components/StatCounter.test.tsx`, `src/components/ServiceCard.test.tsx`.

- [ ] 5. Create LeadFormContext and App composition shell
  - [ ] 5.1 Implement `LeadFormContext`
    - `src/context/LeadFormContext.tsx` exposing `prefillService`, `requestEnquiry(service?)` (sets prefill + `smoothScrollTo("contact")`), and `consumePrefill()`; surfaces a missing-target indication when `#contact` is absent.
    - Files: `src/context/LeadFormContext.tsx`.
    - _Design: Service-Card Enquire Flow (Context shape)_
    - _Requirements: 7.13, 7.14_
  - [ ] 5.2 Build `App.tsx` composition shell with landmarks
    - Compose `<AnnouncementBar/>`, `<Header/>`, `<main>` with the nine section placeholders (ids hero/about/services/why-us/industries/values/mission-vision/cta/contact), `<Footer/>`, `<FloatingCTA/>`; wrap in `LeadFormContext` provider.
    - Ensure exactly one `<main>`, distinct banner/navigation/contentinfo landmarks.
    - Acceptance: page renders section placeholders; dev server shows the full scroll skeleton.
    - Files: `src/App.tsx`.
    - _Design: Architecture (Application shape), Accessibility_
    - _Requirements: 19.1_

- [ ] 6. Implement global chrome components
  - [ ] 6.1 Implement `AnnouncementBar`
    - Navy bar with required text and ≥4.5:1 contrast; dismiss control labeled "Dismiss announcement"; dismiss removes within 300 ms and moves focus to next focusable element; Enter/Space activate; dismissal persists for the session via `sessionStorage` key `imech.announcement.dismissed`.
    - Constraint: colors via token utilities only.
    - Files: `src/components/AnnouncementBar.tsx`; wire into `App.tsx`.
    - _Design: Components and Interfaces (AnnouncementBar)_
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  - [ ] 6.2 Implement `Header` and `Nav_Drawer` **[PLACEHOLDER ASSET: imech-global-logo.png]**
    - Left logo (referenced from `public/imech-global-logo.png`, created as a labeled placeholder derived from `logo/MECH Global Consulting Logo.png`, with a `// TODO` to replace); nav links About, Services, Industries, Why Us, Contact in order; gold "Request a Consultation" button; fixed to top offset 0; drop shadow when scrollY>10; nav clicks smooth-scroll with header offset; below 768px hamburger replaces inline links; drawer opens with all five links, closes on link/Escape/outside click; full keyboard operability + focus trap only while drawer open.
    - Constraint: colors via token utilities only.
    - Files: `src/components/Header.tsx`, `public/imech-global-logo.png` (placeholder); wire into `App.tsx`.
    - _Design: Components and Interfaces (Header), Required assets_
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.8, 4.9, 4.10, 4.11, 4.12, 9.1, 9.2, 9.3, 19.4_
  - [ ] 6.3 Implement `FloatingCTA`
    - Hidden while any part of Hero is in view; appears fixed bottom-right within 300 ms once Hero's bottom passes above viewport top (shared IntersectionObserver on `#hero`); activates scroll-to-contact ≤1 s or shows unavailable indication; keyboard operable with focus ring.
    - Files: `src/components/FloatingCTA.tsx`; wire into `App.tsx`.
    - _Design: Components and Interfaces (FloatingCTA)_
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_
  - [ ]* 6.4 Write tests for chrome behavior
    - AnnouncementBar dismissal persists across remount within a session; Header drawer Escape/outside-click close + no permanent focus trap.
    - **Property 12: FloatingCTA visibility mirrors Hero visibility** — Validates: Requirements 16.1, 16.2
    - Files: `src/components/AnnouncementBar.test.tsx`, `src/components/Header.test.tsx`, `src/components/FloatingCTA.test.tsx`.

- [ ] 7. Checkpoint — chrome and primitives
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement top-of-page content sections
  - [ ] 8.1 Implement `Hero` section
    - Full-width navy-gradient section; decorative motif at opacity 0.05–0.15 marked decorative (`aria-hidden`/empty alt); single page `h1` "People. Performance. Transformation."; subheading; gold "Request a Consultation" (scrolls to Contact) and ghost "Explore Services" (scrolls to Services) buttons via `requestEnquiry()`/`smoothScrollTo`; trust row text; missing-target handling.
    - Constraint: colors via token utilities only.
    - Files: `src/sections/Hero.tsx`; wire into `App.tsx`.
    - _Design: Architecture, Components and Interfaces (Button)_
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11_
  - [ ] 8.2 Implement `About` section with animated stats
    - "Who We Are" heading; introductory copy per design; four `StatCounter`s from `data/stats.ts` reading "Est. 2017", "27+ Yrs Expertise", "9 Service Lines", "20+ Industries Served".
    - Files: `src/sections/About.tsx`; wire into `App.tsx`.
    - _Design: Data Models (Stats)_
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ] 8.3 Implement `Services` section
    - Render exactly six `ServiceCard`s from `data/services.ts`; each Enquire link calls `requestEnquiry(service)` to scroll to Contact and set `Service_Of_Interest`; surface "contact form could not be reached" indication if Contact/form unavailable.
    - Files: `src/sections/Services.tsx`; wire into `App.tsx`.
    - _Design: Service-Card Enquire Flow_
    - _Requirements: 7.1, 7.12, 7.13, 7.14_

- [ ] 9. Implement middle content sections
  - [ ] 9.1 Implement `Approach` section **[PLACEHOLDER ASSET: section images]**
    - Heading containing "Why iMECH" or "Our Approach"; 2–3 alternating image/text rows (image side flips each row); copy on People/Processes/Leadership/Culture alignment, customized outcome-oriented solutions, and ISB/XLRI/Aon Hewitt + labour-law expertise; placeholder images with visible "placeholder" text and `// TODO` markers.
    - Files: `src/sections/Approach.tsx`; placeholder image(s) in `public/`; wire into `App.tsx`.
    - _Design: Components vs Section split, Error Handling (Image asset missing)_
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 9.1, 9.2_
  - [ ] 9.2 Implement `Industries` section
    - "Trusted across industries" heading; exactly 13 text chips from `data/industries.ts`; marquee mode = single continuously scrolling row, grid mode = all chips visible without horizontal scroll; `// TODO` already present in data to replace with real logos.
    - Files: `src/sections/Industries.tsx`; wire into `App.tsx`.
    - _Design: Data Models (Industries)_
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  - [ ] 9.3 Implement `Values` section
    - Five `ValueCard`s (Integrity, Client Partnership, Excellence, Agility, Impact); single horizontal row ≥768px, stacked below 768px.
    - Files: `src/sections/Values.tsx`; wire into `App.tsx`.
    - _Design: Data Models (Values), Responsive Strategy_
    - _Requirements: 11.1, 11.2, 11.3_
  - [ ] 9.4 Implement `MissionVision` section
    - Navy band with gold accents; mission + vision cards side-by-side two equal columns ≥768px, stacked below.
    - Constraint: colors via token utilities only.
    - Files: `src/sections/MissionVision.tsx`; wire into `App.tsx`.
    - _Design: Responsive Strategy_
    - _Requirements: 12.1, 12.2, 12.3_
  - [ ] 9.5 Implement `CtaBand` section
    - Full-width navy band; text "Let's build high-performing organizations together."; gold "Request a Consultation" button scrolling to Contact ≤1 s via `requestEnquiry()`; missing-target handling.
    - Constraint: colors via token utilities only.
    - Files: `src/sections/CtaBand.tsx`; wire into `App.tsx`.
    - _Design: Smooth-Scroll Utility_
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 10. Implement Contact section and Lead Form
  - [ ] 10.1 Implement `submitLead` stub
    - `src/lib/submitLead.ts` async stub simulating a round-trip with a `// TODO` to connect the real email/CRM endpoint; returns `{ ok: true }`.
    - Files: `src/lib/submitLead.ts`.
    - _Design: Lead Form Design (Submit handler)_
    - _Requirements: 14.8, 14.15_
  - [ ] 10.2 Implement `LeadForm` component
    - React Hook Form + `zodResolver(leadSchema)`; fields Name, Email, Phone, Company, Service_Of_Interest (6 options), optional Message; gold submit button; per-field inline errors retaining values and blocking submission; honeypot `website` field visually hidden and out of tab order; on submit skip handler silently if honeypot filled; pending state disables button + spinner; `Promise.race` 30 s timeout → retry error; success → confirmation + reset + re-enable; reject → retry error + retain values; consumes `prefillService` from context then calls `consumePrefill()`; include `// TODO` for reCAPTCHA integration.
    - Constraint: colors via token utilities only.
    - Files: `src/components/LeadForm.tsx`.
    - _Design: Lead Form Design (wiring, honeypot, submit flow)_
    - _Requirements: 14.5, 14.6, 14.7, 14.8, 14.9, 14.10, 14.11, 14.12, 14.13, 14.14, 14.15_
  - [ ] 10.3 Implement `Contact` section with office info
    - Two columns ≥768px (form + info), stacked below; corporate + regional office addresses and phones, email, web, Managing Director; phones as `tel:` links, email as `mailto:`; mounts `LeadForm`.
    - Files: `src/sections/Contact.tsx`; wire into `App.tsx`.
    - _Design: Lead Form Design (Office contact information), Responsive Strategy_
    - _Requirements: 14.1, 14.2, 14.16, 14.17, 14.18, 14.19_
  - [ ]* 10.4 Write unit test for `submitLead` stub
    - Resolves to `{ ok: true }`; confirm `// TODO` endpoint marker present.
    - Files: `src/lib/submitLead.test.ts`.
    - _Requirements: 14.8, 14.15_
  - [ ]* 10.5 Write property/behavior tests for the Lead Form
    - **Property 10: Valid submissions invoke the submit handler once** — Validates: Requirements 14.8
    - **Property 11: Filled honeypot blocks submission silently** — Validates: Requirements 14.13, 14.14
    - **Property 5: Enquire sets the matching Service of Interest** — Validates: Requirements 7.12, 7.13
    - Plus example tests for submit state machine (success/reset, reject/retain, 30 s timeout/retry).
    - Files: `src/components/LeadForm.test.tsx`.
    - _Requirements: 14.10, 14.11, 14.12_

- [ ] 11. Implement Footer **[PLACEHOLDER ASSET: imech-global-logo-white.png]**
  - Navy background; reversed white logo (`public/imech-global-logo-white.png` placeholder with `// TODO`) with clear space ≥½ logo height via padding; tagline "People. Performance. Transformation."; quick links Services/About/Contact that smooth-scroll ≤1 s or show unavailable indication; keyboard operable with focus ring; both office addresses + email; copyright "© 2025 iMECH Global. All rights reserved."; exclude GST/PAN/tax numbers.
  - Constraint: colors via token utilities only.
  - Files: `src/components/Footer.tsx`, `public/imech-global-logo-white.png` (placeholder); wire into `App.tsx`.
  - _Design: Components and Interfaces (Footer), Required assets_
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 15.10_

- [ ] 12. Checkpoint — full page assembled
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Accessibility, SEO, and metadata
  - [ ] 13.1 Accessibility pass across the composed page
    - Verify exactly one `h1` and descending heading order; alt text on informative images and empty alt/`aria-hidden` on decorative; keyboard operability + logical focus order with no traps; focus ring ≥3:1 contrast; AA contrast on text and UI boundaries; navy-on-gold CTAs with gold text restricted to large/decorative use; reduced-motion honored.
    - Files: adjustments across `src/components/*` and `src/sections/*` as needed.
    - _Design: Accessibility and SEO (Accessibility)_
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7_
  - [ ] 13.2 SEO head, Open Graph, favicon, and JSON-LD **[PLACEHOLDER ASSET: og-image.png, favicon]**
    - In `index.html`: `<title>` 30–60 chars including "iMECH Global"; meta description 50–160 chars; OG title/description/type/image (image ≥1200×630); favicon derived from logo; embed schema.org `ProfessionalService` JSON-LD with both office addresses. Create labeled placeholder `public/og-image.png` and `public/favicon.svg`/`favicon.ico` with `// TODO` markers.
    - Files: `index.html`, `public/og-image.png` (placeholder), `public/favicon.svg`, `public/favicon.ico` (placeholder).
    - _Design: Accessibility and SEO (SEO and metadata)_
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 9.1, 9.2_
  - [ ]* 13.3 Write SEO and accessibility assertion tests
    - Title length ∈ [30,60] and includes "iMECH Global"; meta description ∈ [50,160]; `jest-axe` reports no violations on the composed page; landmark and heading-order assertions.
    - Files: `src/App.a11y.test.tsx`, `src/seo.test.ts`.
    - _Requirements: 19.1, 19.2, 20.1, 20.2_

- [ ] 14. Responsive QA pass
  - Verify no horizontal overflow at 375px; adapted multi-column layout and ≥16px body text at 768px; full desktop layout at 1280px; content/functionality preserved 320–1920px; ≥44×44px touch targets. Fix any overflow or breakpoint issues found.
  - Files: responsive-class adjustments across `src/sections/*` and `src/components/*` as needed.
  - _Design: Responsive Strategy_
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [ ] 15. README and launch checklist
  - Write `README.md` documenting dev-server, production-build, and static-host deploy steps, plus a checklist enumerating every placeholder asset/content/integration to replace before launch (header logo, footer white logo, favicon, OG image, Approach images, industry logos, submitLead endpoint, reCAPTCHA).
  - Files: `README.md`.
  - _Design: Overview, Required assets, Error Handling_
  - _Requirements: 22.1, 22.2, 22.3, 22.4_

- [ ] 16. Final build and audit verification
  - Run `npm run build` (must exit zero, emit `dist/`); run the full test suite; run a Lighthouse mobile audit and `jest-axe`/axe checks against the production build; record scores (performance ≥90; accessibility/best-practices/SEO = 100) and fix regressions. Note that full WCAG conformance also needs manual assistive-technology testing beyond automated checks.
  - Files: none (verification); minor fixes as needed.
  - _Design: Testing Strategy (Audits, Build verification)_
  - _Requirements: 1.6, 1.7, 21.1, 21.2, 21.3, 21.4_

## Notes

- Tasks marked with `*` are optional (tests) and can be skipped for a faster MVP; core implementation tasks are never optional.
- **[PLACEHOLDER ASSET]** tasks (6.2, 9.1, 11, 13.2) create clearly-labeled placeholder files and `// TODO` markers; the user must supply the real logo, favicon, OG, and section-image assets before launch.
- Every styling task is bound by the global constraint: no hex value outside `src/styles/tokens.css`; components use token utilities only (Req 1.9, 2.9).
- Each task references the design section(s) and granular requirement IDs it implements for traceability.
- Checkpoints (tasks 7, 12) and the final audit (task 16) provide incremental validation.
- Property-based tests use fast-check at ≥100 runs; each property maps 1:1 to a design Correctness Property and the requirements it validates.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.1", "3.2", "3.3", "3.4"] },
    { "id": 3, "tasks": ["3.5", "3.6", "3.7", "4.1", "4.2", "4.3", "4.4", "4.5", "5.1"] },
    { "id": 4, "tasks": ["4.6", "5.2"] },
    { "id": 5, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 6, "tasks": ["6.4", "8.1", "8.2", "8.3"] },
    { "id": 7, "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5", "10.1"] },
    { "id": 8, "tasks": ["10.2"] },
    { "id": 9, "tasks": ["10.3", "11"] },
    { "id": 10, "tasks": ["10.4", "10.5", "13.1"] },
    { "id": 11, "tasks": ["13.2", "14"] },
    { "id": 12, "tasks": ["13.3", "15"] },
    { "id": 13, "tasks": ["16"] }
  ]
}
```
