# Haseeb Ur Rehman — Professional Portfolio

A premium, responsive portfolio and living resume for a Technical Lead / Full-Stack Engineer with 18+ years of software engineering experience.

## Public-facing site structure

- `/` — editorial homepage, selected work, career timeline, capabilities and keyboard-accessible portfolio search
- `/projects/` — broader project archive across Royal Cyber, 7cTech, IT Consultants and independent products
- `/case-studies/` — representative project context, scope, approach and delivery boundaries
- `/resume/` — editable HTML resume with browser Print / Save as PDF
- `/404.html` — branded not-found page

## Design & implementation

- Static HTML, CSS and vanilla JavaScript; no framework build step or database required
- Responsive dark graphite / warm brass visual system
- Search supports project names, experience, skills and capabilities; keyboard shortcuts: `/`, arrow keys, Enter and Escape
- Semantic page structure, responsive layout, social preview metadata, Person JSON-LD, SVG favicon and Apache `.htaccess` defaults
- Search is intentionally client-side; it does not transmit queries to a server

## Accuracy and confidentiality

The portfolio distinguishes client delivery, private work, independent products, mockups and in-progress repositories. MedGulf is explicitly described as a paid CRM mockup, not a production rollout. Private client work has no invented public demo. The corporate website status list is labelled as user-reported (November 2026), not independently audited. Historical performance figures are labelled as self-reported rather than current test results. Some private repository descriptions are intentionally limited until code review.

## Hosting

This is a static site intended for direct deployment to Hostinger Business shared hosting. Vercel is not required. Upload the repository contents to the target website's document root (usually `public_html`), keeping `index.html` at the root and preserving the `assets/`, `projects/`, `case-studies/` and `resume/` folders.

Before production launch:
1. Confirm the target domain / subdomain in Hostinger.
2. Connect the Hostinger Git deployment integration or upload the repository contents to the document root.
3. Enable SSL and verify the HTTPS URL.
4. Add the final canonical URL, sitemap and domain-specific SEO metadata once the production domain is confirmed.
5. Test mobile layout, search, internal links, email/LinkedIn links and the print-to-PDF resume.
6. Add only real, approved project screenshots and the final approved PDF resume; do not use invented mock screenshots.

## Updating

Keep this repository as the source of truth. Update the HTML/CSS/JS and resume content here, then deploy the same branch to Hostinger. The public portfolio URL can remain permanent while its content is updated.
