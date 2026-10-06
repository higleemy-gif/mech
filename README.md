# iMECH Global - Marketing Landing Page

A modern, responsive, single-page marketing website for iMECH Global (HR, Talent & Management Consulting). Built as a fully static site with React + Vite + TypeScript, Tailwind CSS, Framer Motion, lucide-react, and React Hook Form + Zod.

Tagline: People. Performance. Transformation.

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS (driven by centralized CSS-variable brand tokens)
- Framer Motion (scroll reveal, count-up, drawer)
- lucide-react (icons)
- React Hook Form + Zod (lead form validation)

## Prerequisites

- Node.js 18 or newer and npm

## Run (development)

```
npm install
npm run dev
```

Vite serves the site at http://localhost:5173 by default. The terminal prints the exact local URL.

## Build (production)

```
npm run build
```

Emits optimized static assets to the dist/ directory.

## Preview the production build

```
npm run preview
```

## Type-check

```
npm run typecheck
```

## Deploy (any static host)

The site is fully static, so deploy the contents of dist/ anywhere:

- Netlify: build command `npm run build`, publish directory `dist`.
- Vercel: framework preset Vite, output directory `dist`.
- GitHub Pages / S3 + CloudFront / any static server: upload the dist/ folder.

No backend is required for v1.

## Brand tokens (single source of truth)

All brand colors are defined once in `src/styles/tokens.css` as CSS variables and consumed through Tailwind utilities such as `bg-navy`, `text-gold`, and `font-heading`. Do not hardcode hex values anywhere else - edit tokens.css to change the palette.

Palette: navy #003264, navy-dark #001E46, gold #C89646, gold-light #DCB464, slate #46505A, bg #FFFFFF, bg-soft #F5F7FA.

## Project structure

- index.html - head metadata, Open Graph tags, favicon, ProfessionalService JSON-LD
- public/ - static image assets (logos, OG image, favicon)
- src/components/ - reusable UI and chrome (Button, Section, ServiceCard, StatCounter, ValueCard, ScrollReveal, AnnouncementBar, Header, Footer, FloatingCTA, LeadForm)
- src/sections/ - the page content regions (Hero, About, Services, Approach, Industries, Values, MissionVision, CtaBand, Contact)
- src/lib/ - leadSchema (Zod), submitLead (stub), smoothScroll, motion hooks
- src/data/ - services, stats, values, industries content arrays
- src/context/ - LeadFormContext (enquire pre-fill + scroll)
- src/styles/ - tokens.css (brand tokens) and index.css (Tailwind + base)

## Placeholder checklist (replace before launch)

- [ ] public/imech-global-logo.png - header logo. Currently a copy of the source logo; replace with the final web-optimized header logo.
- [ ] public/imech-global-logo-white.png - reversed/white logo for the navy footer. Currently a copy of the source logo; supply a true white/reversed version.
- [ ] public/og-image.png - social share image, at least 1200x630 px. Currently a copy of the source logo; replace with a designed OG image.
- [ ] public/favicon.svg - favicon. Placeholder derived from brand colors; replace with a logo-based icon (add favicon.ico if you need legacy support).
- [ ] Approach section images - src/sections/Approach.tsx renders labeled "Image placeholder" blocks; replace with real photography/illustration.
- [ ] Industry logos - src/data/industries.ts holds text chips; replace with real client logos.
- [ ] Lead submission endpoint - src/lib/submitLead.ts has a // TODO to connect the real email/CRM endpoint.
- [ ] reCAPTCHA - src/components/LeadForm.tsx has a // TODO marking where reCAPTCHA token generation/verification should be wired in.

## Accessibility & SEO notes

- Semantic landmarks (banner, nav, main, contentinfo), a single h1, logical heading order, keyboard navigation, and visible focus states.
- Animations respect prefers-reduced-motion.
- SEO metadata, Open Graph tags, favicon, and schema.org ProfessionalService JSON-LD (including both office addresses) live in index.html.
- Automated checks (Lighthouse/axe) do not replace manual testing. Full WCAG conformance also requires manual testing with assistive technologies and expert review.

