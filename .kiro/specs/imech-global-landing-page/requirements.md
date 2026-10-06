# Requirements Document

## Introduction

This document defines the requirements for a modern, responsive, single-page marketing website (landing page) for **iMECH Global**, an HR, Talent & Management Consulting firm based in India. The landing page is the primary digital presence for the firm and its primary conversion goal is to capture qualified consultation leads through a contact form.

The site is built as a fully static, deployable single-page application (React + Vite + TypeScript, Tailwind CSS, Framer Motion, lucide-react, React Hook Form + Zod). Version 1 (v1) has no backend; the lead form submits to a placeholder async handler. The visual tone is corporate trust and premium/executive, with a navy-dominant palette and sparing gold accents.

The scope of this document is the behavior, structure, content, accessibility, SEO, performance, and conversion features of the landing page. Backend integration (email/CRM, reCAPTCHA server verification) is explicitly out of scope for v1 and is represented by documented placeholders.

## Glossary

- **Landing_Page**: The complete single-page marketing website for iMECH Global, composed of all sections defined in this document.
- **Announcement_Bar**: The thin, dismissible navy bar displayed at the top of the viewport above the header.
- **Header**: The sticky top navigation region containing the logo, navigation links, and primary call-to-action button.
- **Nav_Drawer**: The mobile navigation panel revealed by the hamburger control on small viewports.
- **Hero_Section**: The full-width introductory section containing the primary headline, subheading, call-to-action buttons, and trust row.
- **About_Section**: The "Who We Are" section containing introductory copy and the animated statistics row.
- **Stat_Counter**: An individual animated count-up statistic displayed in the About_Section.
- **Services_Section**: The section presenting the six service offerings as cards.
- **Service_Card**: An individual card within the Services_Section representing one service line.
- **Approach_Section**: The "Why iMECH / Our Approach" section with alternating image-and-text rows.
- **Industries_Section**: The trust section displaying client/industry chips.
- **Values_Section**: The section presenting the five company values.
- **Mission_Vision_Section**: The navy band presenting the mission and vision cards.
- **CTA_Band**: The full-width navy call-to-action band near the bottom of the page.
- **Contact_Section**: The section containing the lead capture form and office contact information.
- **Lead_Form**: The form within the Contact_Section used to capture consultation enquiries.
- **Form_Validator**: The client-side validation component (React Hook Form + Zod) that validates Lead_Form input.
- **Submit_Handler**: The placeholder asynchronous function that processes a validated Lead_Form submission in v1.
- **Honeypot_Field**: A hidden form field used to detect and reject automated bot submissions.
- **Footer**: The navy footer region at the bottom of the page.
- **Floating_CTA**: The "Request a Consultation" button fixed to the bottom-right of the viewport on scroll.
- **Theme_Tokens**: The centralized set of brand design tokens (colors, typography) defined once as CSS variables and consumed by Tailwind.
- **Visitor**: A person viewing the Landing_Page in a web browser.
- **Service_Of_Interest**: The dropdown field in the Lead_Form identifying which service the Visitor is enquiring about.
- **Reduced_Motion**: The user agent preference `prefers-reduced-motion: reduce`.
- **AA_Contrast**: A color contrast ratio meeting WCAG 2.1 Level AA (at least 4.5:1 for normal text, 3:1 for large text and non-text UI components).

## Requirements

### Requirement 1: Project Setup and Technology Stack

**User Story:** As a developer, I want the project scaffolded with the agreed technology stack and a clean structure, so that the site is maintainable and deployable to a static host.

#### Acceptance Criteria

1. THE Landing_Page SHALL be implemented as a React application built with Vite and TypeScript.
2. THE Landing_Page SHALL use Tailwind CSS for styling.
3. THE Landing_Page SHALL use Framer Motion for animations.
4. THE Landing_Page SHALL use lucide-react for icons.
5. THE Lead_Form SHALL use React Hook Form for form state management and Zod for schema validation.
6. WHEN the production build command is executed, THE Landing_Page SHALL complete the build with a success (zero error) exit status and emit a set of static assets (HTML, CSS, and JavaScript) to a build output directory.
7. THE Landing_Page static assets SHALL be servable by a static file host and SHALL render the page without requiring any running backend or server-side process at runtime.
8. THE Landing_Page SHALL organize code into reusable components that include at minimum each of the following: Section, ServiceCard, Button, and Stat.
9. THE Theme_Tokens SHALL be defined in exactly one centralized theme file, with no theme token values duplicated or redefined in other source files.

### Requirement 2: Brand Design Tokens

**User Story:** As a brand owner, I want the firm's colors and typography centralized as design tokens, so that the visual identity is consistent and easy to update.

#### Acceptance Criteria

1. THE Theme_Tokens SHALL define a primary navy color with hex value #003264.
2. THE Theme_Tokens SHALL define a dark navy color with hex value #001E46.
3. THE Theme_Tokens SHALL define a gold accent color with hex value #C89646.
4. THE Theme_Tokens SHALL define a light gold color with hex value #DCB464.
5. THE Theme_Tokens SHALL define a slate body-text color with hex value #46505A.
6. THE Theme_Tokens SHALL define a background color with hex value #FFFFFF.
7. THE Theme_Tokens SHALL define a soft background color with hex value #F5F7FA.
8. THE Theme_Tokens SHALL define a heading typeface resolving to either Poppins or Sora as the first-choice font, followed by a sans-serif generic fallback, and a body typeface resolving to Inter followed by a sans-serif generic fallback.
9. THE Theme_Tokens SHALL expose every color token (criteria 1 through 7) and every typeface token (criterion 8) as named CSS variables that are referenced by Tailwind utility classes.
10. IF a CSS variable is referenced by a Tailwind utility class but is not defined in THE Theme_Tokens, THEN THE Theme_Tokens SHALL resolve that reference to the body-text color #46505A for color tokens or the sans-serif generic fallback for typeface tokens.
11. IF a heading or body web font fails to load, THEN THE Landing_Page SHALL render the affected text using the defined sans-serif generic fallback.
12. WHERE a section alternates background color, THE Landing_Page SHALL apply the soft background color (#F5F7FA) to alternate with the white background (#FFFFFF).

### Requirement 3: Announcement Bar

**User Story:** As a Visitor, I want a brief announcement at the top of the page that I can dismiss, so that I see the firm's positioning without permanent clutter.

#### Acceptance Criteria

1. WHEN the page loads and the Visitor has not previously dismissed the Announcement_Bar within the current browser session, THE Announcement_Bar SHALL display the text "iMECH Global — Integrated HR, Talent & Management Solutions for a Future-Ready Organization." positioned at the top of the viewport above all other page content.
2. THE Announcement_Bar SHALL render with a navy background and text color meeting a contrast ratio of at least 4.5:1 against that background.
3. THE Announcement_Bar SHALL display a dismiss control that exposes a text alternative accessible label of "Dismiss announcement" to assistive technologies.
4. WHEN the Visitor activates the dismiss control, THE Announcement_Bar SHALL be removed from view within 300 milliseconds and SHALL move keyboard focus to the next focusable element following the Announcement_Bar in document order.
5. WHILE the dismiss control has keyboard focus, WHEN the Visitor presses the Enter key or the Space key, THE Announcement_Bar SHALL perform the same dismiss action as a pointer activation.
6. WHEN the Visitor dismisses the Announcement_Bar, THE Announcement_Bar SHALL remain hidden for the remainder of the current browser session and SHALL NOT reappear on subsequent page loads within that session.

### Requirement 4: Sticky Header and Navigation

**User Story:** As a Visitor, I want a persistent header with clear navigation and a prominent consultation button, so that I can move around the page and request a consultation at any time.

#### Acceptance Criteria

1. THE Header SHALL display the iMECH Global logo aligned to the left edge of the header content area.
2. THE Header SHALL display navigation links labeled exactly About, Services, Industries, Why Us, and Contact, in that left-to-right order.
3. THE Header SHALL display a gold-colored "Request a Consultation" button with that exact label.
4. WHILE the Visitor scrolls the page vertically, THE Header SHALL remain fixed to the top of the viewport such that its top edge stays at vertical offset 0.
5. WHEN the Visitor scrolls the page vertically so that the vertical scroll offset exceeds 10 pixels, THE Header SHALL display a drop shadow, and WHEN the vertical scroll offset returns to 10 pixels or less, THE Header SHALL remove the drop shadow.
6. WHEN the Visitor activates a navigation link, THE Landing_Page SHALL smooth-scroll to the corresponding section within 1000 milliseconds, positioning the target section's top below the fixed Header so that no section content is obscured by the Header.
7. IF the Visitor activates a navigation link whose target section does not exist, THEN THE Landing_Page SHALL remain at the current scroll position and SHALL NOT alter the viewport.
8. WHILE the viewport width is below 768 pixels, THE Header SHALL display a hamburger control and SHALL hide the inline navigation links.
9. WHEN the Visitor activates the hamburger control, THE Nav_Drawer SHALL open and display all five navigation links.
10. WHEN the Visitor activates a link within the Nav_Drawer, THE Nav_Drawer SHALL close within 500 milliseconds and THE Landing_Page SHALL smooth-scroll to the corresponding section within 1000 milliseconds.
11. WHEN the Nav_Drawer is open and the Visitor presses the Escape key or activates an area outside the Nav_Drawer, THE Nav_Drawer SHALL close within 500 milliseconds.
12. THE Header navigation links, hamburger control, and "Request a Consultation" button SHALL be reachable and operable using the keyboard in left-to-right then top-to-bottom order, and the currently focused control SHALL display a visible focus indicator.

### Requirement 5: Hero Section

**User Story:** As a Visitor, I want an immediate, confident introduction to iMECH Global, so that I understand what the firm does and can act on it.

#### Acceptance Criteria

1. THE Hero_Section SHALL render as a section spanning 100% of the viewport width with a navy gradient background.
2. THE Hero_Section SHALL display a decorative abstract geometric or globe motif at an opacity between 0.05 and 0.15 inclusive.
3. THE Hero_Section SHALL display the headline "People. Performance. Transformation." as the single page-level h1.
4. THE Hero_Section SHALL display the subheading "Integrated HR, Talent and Management solutions that help organizations build the right workforce, develop their people, and drive sustainable transformation."
5. THE Hero_Section SHALL display a primary gold "Request a Consultation" button.
6. THE Hero_Section SHALL display a secondary outline "Explore Services" button.
7. THE Hero_Section SHALL display a trust row containing the text "27+ years of combined expertise", "Serving Pharma, Manufacturing, Engineering & Corporate sectors", and "Since 2017".
8. WHEN the Visitor activates the "Request a Consultation" button by pointer click or by keyboard (Enter or Space), THE Landing_Page SHALL smooth-scroll to the Contact_Section such that the top of the Contact_Section is aligned within the viewport within 1000 milliseconds.
9. WHEN the Visitor activates the "Explore Services" button by pointer click or by keyboard (Enter or Space), THE Landing_Page SHALL smooth-scroll to the Services_Section such that the top of the Services_Section is aligned within the viewport within 1000 milliseconds.
10. THE decorative motif in the Hero_Section SHALL be marked as decorative so that assistive technology ignores it.
11. IF the target section for an activated Hero_Section button is not present on the Landing_Page, THEN THE Landing_Page SHALL remain at the current scroll position and SHALL take no scroll action.

### Requirement 6: About Section with Animated Statistics

**User Story:** As a Visitor, I want to understand who iMECH Global is and see proof points, so that I trust the firm's experience.

#### Acceptance Criteria

1. THE About_Section SHALL display a "Who We Are" heading.
2. THE About_Section SHALL display introductory copy stating the firm was founded in 2017 and is a professional services organization supporting Pharma, Biopharma, Clinical Research, Manufacturing, Engineering, and Corporate sectors with practical, business-focused people solutions.
3. THE About_Section SHALL display four Stat_Counter items with the labels and values "Est. 2017", "27+ Yrs Expertise", "9 Service Lines", and "20+ Industries Served".
4. WHEN at least 50% of a Stat_Counter's area becomes visible within the viewport, THE Stat_Counter SHALL animate its numeric value counting up from zero to the target value, completing the animation within 2 seconds.
5. WHEN a Stat_Counter's count-up animation completes, THE Stat_Counter SHALL display the exact target value and label specified in criterion 3.
6. IF a Stat_Counter has already completed its count-up animation and re-enters the viewport, THEN THE Stat_Counter SHALL display its final value without replaying the animation.
7. WHILE Reduced_Motion is set, THE Stat_Counter SHALL display its final target value immediately without the count-up animation.

### Requirement 7: Services Section

**User Story:** As a Visitor, I want to see the firm's service lines clearly, so that I can identify what is relevant to my organization and enquire about it.

#### Acceptance Criteria

1. THE Services_Section SHALL display exactly six Service_Card items.
2. THE Services_Section SHALL display a Service_Card titled "Workforce Solutions" with the description "Payroll Management, Manpower & Staffing, Executive Search & Head-Hunting".
3. THE Services_Section SHALL display a Service_Card titled "People Development" with the description "Training & Development, Leadership Development".
4. THE Services_Section SHALL display a Service_Card titled "Organization Transformation" with the description "Management Consulting, OD & Change Management".
5. THE Services_Section SHALL display a Service_Card titled "Surveys & Organizational Research" with the description "Engagement, 360°, Climate, Pulse, TNA, Market surveys".
6. THE Services_Section SHALL display a Service_Card titled "HR Outsourcing" with the description "End-to-end employee lifecycle management".
7. THE Services_Section SHALL display a Service_Card titled "HR Compliance Audit & Management" with the description "Statutory & labour-law compliance, HR governance".
8. THE Service_Card SHALL display a gold-stroke icon, a title, and a one-line description of maximum 120 characters.
9. WHEN the Visitor hovers over a Service_Card using a pointer device, THE Service_Card SHALL translate upward relative to its resting position and apply a navy-to-gold accent, completing the transition within 300 milliseconds.
10. WHEN the Visitor moves the pointer away from a hovered Service_Card, THE Service_Card SHALL return to its resting position and remove the navy-to-gold accent within 300 milliseconds.
11. THE Service_Card SHALL display an "Enquire" link.
12. WHEN the Visitor activates a Service_Card "Enquire" link by pointer click or keyboard, THE Landing_Page SHALL smooth-scroll to the Contact_Section, completing the scroll within 1000 milliseconds.
13. WHEN the Visitor activates a Service_Card "Enquire" link, THE Lead_Form SHALL set Service_Of_Interest to the value corresponding to the activated Service_Card.
14. IF the Contact_Section or Lead_Form is unavailable when the Visitor activates a Service_Card "Enquire" link, THEN THE Landing_Page SHALL display a message indicating the contact form could not be reached and SHALL preserve the current scroll position.

### Requirement 8: Approach Section

**User Story:** As a Visitor, I want to understand why iMECH Global is different, so that I am persuaded of the firm's value.

#### Acceptance Criteria

1. THE Approach_Section SHALL display a visible heading containing the text "Why iMECH" or the text "Our Approach".
2. THE Approach_Section SHALL display between two and three rows, where each row contains exactly one image element and one text block.
3. WHEN the Approach_Section displays more than one row, THE Approach_Section SHALL position the image on the opposite side (left versus right) from the image in the immediately preceding row.
4. THE Approach_Section SHALL present text content describing the alignment of People, Processes, Leadership, and Culture.
5. THE Approach_Section SHALL present text content describing customized, outcome-oriented solutions.
6. THE Approach_Section SHALL present text content describing deep industry, legal, and academic expertise, referencing ISB, XLRI, and Aon Hewitt backgrounds and labour-law expertise.
7. WHERE a real image asset is not yet available, THE Approach_Section SHALL display a placeholder image that includes visible text identifying it as a placeholder.

### Requirement 9: Image and Content Placeholders

**User Story:** As a developer, I want unfinished assets, content, and integrations clearly marked, so that I know exactly what to replace before launch.

#### Acceptance Criteria

1. WHERE a real image asset is not yet available, THE Landing_Page SHALL display a placeholder image that includes visible text identifying it as a placeholder.
2. WHERE real content, an asset, or an integration endpoint is required but not yet supplied, THE Landing_Page source SHALL include a `// TODO` comment identifying what must be replaced.
3. THE Landing_Page SHALL use the existing logo asset located at `logo/MECH Global Consulting Logo.png`.

### Requirement 10: Industries Trust Section

**User Story:** As a Visitor, I want to see which organizations the firm has worked with, so that I trust its credibility.

#### Acceptance Criteria

1. WHEN the Industries_Section is rendered, THE Industries_Section SHALL display a visible heading with the text "Trusted across industries".
2. WHEN the Industries_Section is rendered, THE Industries_Section SHALL display exactly 13 text chips, one per name, for the following names: MRF Ltd., Sun Pharma, Aurobindo Pharma, Ranbaxy, Shilpa Medicare, Karvy Group, Orient Cement, JK Paper Mills, UB Group, ITC Agri, Kaveri Seeds, ALPLA India, and Aizant Drug Research.
3. WHERE the marquee presentation mode is enabled, THE Industries_Section SHALL present all 13 chips in a single continuously scrolling horizontal row.
4. WHERE the marquee presentation mode is disabled, THE Industries_Section SHALL present all 13 chips in a grid in which every chip is visible without horizontal scrolling.
5. THE Industries_Section source SHALL include a `// TODO` comment stating that the placeholder text chips are to be replaced with real logos.

### Requirement 11: Values Section

**User Story:** As a Visitor, I want to understand the firm's values, so that I can judge cultural fit.

#### Acceptance Criteria

1. THE Values_Section SHALL display exactly five value items with the labels Integrity, Client Partnership, Excellence, Agility, and Impact.
2. WHILE the viewport width is at or above 768 pixels, THE Values_Section SHALL display the five value items in a single horizontal row.
3. WHILE the viewport width is below 768 pixels, THE Values_Section SHALL stack the five value items vertically.

### Requirement 12: Mission and Vision Section

**User Story:** As a Visitor, I want to read the firm's mission and vision, so that I understand its purpose and direction.

#### Acceptance Criteria

1. THE Mission_Vision_Section SHALL render on a navy band with gold accents.
2. WHILE the viewport width is at or above 768 pixels, THE Mission_Vision_Section SHALL display the mission card and the vision card side by side as two equal-width columns in a single row.
3. WHILE the viewport width is below 768 pixels, THE Mission_Vision_Section SHALL stack the mission card above the vision card in a single column.

### Requirement 13: CTA Band

**User Story:** As a Visitor, I want a clear prompt to engage near the end of the page, so that I am encouraged to request a consultation.

#### Acceptance Criteria

1. THE CTA_Band SHALL render as a section spanning 100% of the viewport width with a navy background.
2. THE CTA_Band SHALL display the text "Let's build high-performing organizations together."
3. THE CTA_Band SHALL display a gold "Request a Consultation" button.
4. WHEN the Visitor activates the CTA_Band button, THE Landing_Page SHALL smooth-scroll so that the top of the Contact_Section is visible within the viewport within 1000 milliseconds.
5. IF the Contact_Section is not present on the page when the CTA_Band button is activated, THEN THE Landing_Page SHALL remain at the current scroll position and SHALL take no scroll action.

### Requirement 14: Contact Section and Lead Form

**User Story:** As a Visitor, I want to submit my details and enquiry, so that iMECH Global can contact me about a consultation.

#### Acceptance Criteria

1. WHILE the viewport width is at or above the 768-pixel tablet breakpoint, THE Contact_Section SHALL display the Lead_Form and the office contact information side by side in two columns.
2. WHILE the viewport width is below the 768-pixel tablet breakpoint, THE Contact_Section SHALL stack the Lead_Form above the office contact information in a single column.
3. THE Lead_Form SHALL display a required Name field accepting 1 to 100 characters, a required Email field accepting 1 to 254 characters, a required Phone field accepting 7 to 15 digits, a required Company Name field accepting 1 to 100 characters, a required Service_Of_Interest dropdown, and an optional Message field accepting 0 to 1000 characters.
4. THE Service_Of_Interest dropdown SHALL offer exactly the options Workforce Solutions, People Development, Organization Transformation, Surveys & Research, HR Outsourcing, and HR Compliance.
5. THE Lead_Form SHALL display a gold submit button.
6. WHEN the Visitor submits the Lead_Form, THE Form_Validator SHALL validate that each required field is populated within its specified character or digit bounds and that the Email field contains a string with a local part, an "@" symbol, and a domain part.
7. IF a required field is empty, exceeds its specified bounds, or the Email field does not match the valid email format when the Visitor submits the Lead_Form, THEN THE Form_Validator SHALL display an error message adjacent to each affected field indicating the specific validation failure and SHALL prevent submission while retaining the entered values.
8. WHEN the Lead_Form passes validation, THE Submit_Handler SHALL be invoked asynchronously with the form values.
9. WHILE the Submit_Handler is processing, THE Lead_Form SHALL disable the submit button and display a visible pending indicator on the submit button.
10. IF the Submit_Handler does not resolve or reject within 30 seconds, THEN THE Lead_Form SHALL re-enable the submit button and display an error message inviting the Visitor to retry.
11. WHEN the Submit_Handler resolves successfully, THE Lead_Form SHALL display a success confirmation message, clear all entered field values, and re-enable the submit button.
12. IF the Submit_Handler rejects, THEN THE Lead_Form SHALL display an error message inviting the Visitor to retry and SHALL re-enable the submit button while retaining the entered values.
13. THE Lead_Form SHALL include a Honeypot_Field that is visually hidden from Visitors and excluded from keyboard focus order.
14. IF the Honeypot_Field contains any value when the Lead_Form is submitted, THEN THE Lead_Form SHALL reject the submission without invoking the Submit_Handler and without displaying an error to the Visitor.
15. THE Submit_Handler source SHALL include a `// TODO` comment indicating where to connect the email or CRM endpoint, and the Lead_Form source SHALL include a comment indicating where to integrate reCAPTCHA.
16. THE Contact_Section SHALL display the corporate office address "B-102, Bobbili Empire, Jayabheri Park Road, Kompally, Hyderabad – 500 100" with phone +91 98856 46115.
17. THE Contact_Section SHALL display the regional office address "B-603, Sun Sky Park, Vakil Bridge, SP Ring Road, Ahmedabad, Gujarat 380058" with phone +91 97017 66019.
18. THE Contact_Section SHALL display the email info@imechglobal.com, the web address www.imechglobal.com, and the Managing Director "Smt. Usha Shree".
19. THE Contact_Section SHALL render each phone number as a click-to-call `tel:` link and the email address as a click-to-mail `mailto:` link.

### Requirement 15: Footer

**User Story:** As a Visitor, I want a footer with the firm's key links and office details, so that I can find information and contacts at the end of the page.

#### Acceptance Criteria

1. THE Footer SHALL render with a navy background.
2. THE Footer SHALL display the reversed white version of the iMECH Global logo with surrounding clear space of at least one-half the logo's height on every side.
3. THE Footer SHALL display the tagline "People. Performance. Transformation."
4. THE Footer SHALL display quick links labeled "Services", "About", and "Contact".
5. WHEN the Visitor activates a Footer quick link, THE Footer SHALL smooth-scroll the page to the corresponding section and complete the scroll within 1 second.
6. IF a Footer quick link's target section is not present on the page, THEN THE Footer SHALL keep the current scroll position unchanged and present a visible indication that the section is unavailable.
7. THE Footer quick links SHALL be operable by keyboard with a visible focus indicator.
8. THE Footer SHALL display both the corporate and regional office postal addresses and the contact email address.
9. THE Footer SHALL display the copyright text "© 2025 iMECH Global. All rights reserved."
10. THE Footer SHALL exclude GST, PAN, and any tax registration numbers.

### Requirement 16: Floating Consultation Button

**User Story:** As a Visitor, I want a persistent consultation button as I scroll, so that I can request a consultation without returning to the header.

#### Acceptance Criteria

1. WHEN the Visitor scrolls the page vertically so that the bottom edge of the Hero_Section passes above the top of the viewport, THE Floating_CTA SHALL appear fixed to the bottom-right corner of the viewport within 300 milliseconds.
2. WHILE any part of the Hero_Section remains within the viewport, THE Floating_CTA SHALL be hidden.
3. WHEN the Visitor activates the Floating_CTA, THE Landing_Page SHALL smooth-scroll to the Contact_Section and complete the scroll within 1 second.
4. IF the Contact_Section is not present on the page when the Floating_CTA is activated, THEN THE Landing_Page SHALL keep the current scroll position unchanged and present a visible indication that the section is unavailable.
5. THE Floating_CTA SHALL be operable by keyboard with a visible focus indicator.

### Requirement 17: Animations and Motion Preferences

**User Story:** As a Visitor, I want subtle, professional animations that respect my motion preferences, so that the experience feels premium without causing discomfort.

#### Acceptance Criteria

1. WHEN a section scrolls into view such that at least 10 percent of its area is within the viewport, THE Landing_Page SHALL reveal that section's content with a fade-in or slide-up animation lasting between 200 and 600 milliseconds, and SHALL play the animation only once per section per page load.
2. WHILE Reduced_Motion is set, THE Landing_Page SHALL render all content in its final state without scroll-reveal, count-up, or decorative motion animations.
3. IF scroll-reveal animations do not execute, THEN THE Landing_Page SHALL display all section content in its final visible and readable state.

### Requirement 18: Responsive Layout

**User Story:** As a Visitor on any device, I want the page to adapt to my screen, so that it is readable and usable everywhere.

#### Acceptance Criteria

1. THE Landing_Page SHALL render all content and interactive controls without loss of functionality or content across viewport widths from 320 pixels to 1920 pixels.
2. THE Landing_Page SHALL render without horizontal overflow or horizontal scrollbars at a viewport width of 375 pixels.
3. WHEN rendered at a viewport width of 768 pixels, THE Landing_Page SHALL present a multi-column or adapted layout with no horizontal overflow and body text rendered at a minimum of 16 pixels.
4. WHEN rendered at a viewport width of 1280 pixels, THE Landing_Page SHALL present the full desktop layout with all navigation, sections, and columns visible without horizontal overflow.
5. WHERE the device uses touch input, THE Landing_Page SHALL render all interactive controls with a minimum tap target size of 44 by 44 pixels.

### Requirement 19: Accessibility

**User Story:** As a Visitor using assistive technology or a keyboard, I want the page to be accessible, so that I can perceive and operate all content.

#### Acceptance Criteria

1. THE Landing_Page SHALL use semantic HTML landmark elements, providing exactly one main landmark and distinct banner, navigation, and contentinfo landmarks, such that every block of content is contained within a landmark region.
2. THE Landing_Page SHALL contain exactly one h1 element and SHALL order all remaining heading elements in descending sequence without skipping levels (no h3 appears unless a preceding h2 exists).
3. THE Landing_Page SHALL provide alt text for every informative image that conveys the image's purpose or content in text form, and SHALL assign empty alt text to every decorative image so assistive technology ignores it.
4. THE Landing_Page SHALL make every interactive control operable by keyboard alone (reachable and activatable via Tab, Shift+Tab, Enter, and Space as applicable), SHALL expose interactive controls in a logical focus order matching their visual reading order, and SHALL NOT trap keyboard focus on any control.
5. WHEN an interactive control receives keyboard focus, THE Landing_Page SHALL display a visible focus indicator that has a contrast ratio of at least 3:1 against the adjacent background and against the control's unfocused state.
6. THE Landing_Page SHALL meet AA_Contrast, providing a contrast ratio of at least 4.5:1 for normal-size text, at least 3:1 for large-scale text (defined as 18pt / 24px or larger, or 14pt / 19px or larger when bold), and at least 3:1 for interactive UI component boundaries and meaningful graphical objects.
7. THE Landing_Page SHALL render call-to-action buttons with navy text on a gold background meeting the AA_Contrast ratio defined in criterion 6, and SHALL restrict gold text to large-scale or decorative use rather than normal-size body copy on a white background.

### Requirement 20: SEO and Metadata

**User Story:** As a marketer, I want the page optimized for search and social sharing, so that it is discoverable and presents well when shared.

#### Acceptance Criteria

1. THE Landing_Page SHALL set a document title between 30 and 60 characters inclusive that includes the business name "iMECH Global".
2. THE Landing_Page SHALL set a meta description between 50 and 160 characters inclusive.
3. THE Landing_Page SHALL include Open Graph meta tags for title, description, type, and image.
4. THE Open Graph image SHALL have dimensions of at least 1200 by 630 pixels.
5. THE Landing_Page SHALL include a favicon derived from the iMECH Global logo.
6. THE Landing_Page SHALL embed a schema.org ProfessionalService JSON-LD block that includes both office addresses.

### Requirement 21: Performance and Quality Targets

**User Story:** As a stakeholder, I want the page to meet measurable quality benchmarks, so that it performs well and meets professional standards.

#### Acceptance Criteria

1. WHEN audited with Lighthouse against the production build using the default mobile configuration, THE Landing_Page SHALL achieve a performance score of 90 or higher.
2. WHEN audited with Lighthouse against the production build using the default mobile configuration, THE Landing_Page SHALL achieve an accessibility score of 100.
3. WHEN audited with Lighthouse against the production build using the default mobile configuration, THE Landing_Page SHALL achieve a best practices score of 100.
4. WHEN audited with Lighthouse against the production build using the default mobile configuration, THE Landing_Page SHALL achieve an SEO score of 100.

### Requirement 22: Documentation

**User Story:** As a developer taking over the project, I want clear setup and launch documentation, so that I can run, build, deploy, and finish the site.

#### Acceptance Criteria

1. THE project SHALL include a README documenting the steps to run the development server.
2. THE README SHALL document the steps to build the production bundle.
3. THE README SHALL document the steps to deploy the built assets to a static host.
4. THE README SHALL include a checklist that enumerates each placeholder asset, content item, and integration endpoint that must be filled in before launch.
