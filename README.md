# Haseeb Ur Rehman — Professional Portfolio

An editorial, executive-level engineering portfolio and living resume for a Technical Lead, Solution Architect and Senior Full-Stack Engineer with 19+ years of experience.

## Public site structure
- `/` — signature profile, engineering perspective, selected work, capability areas and career overview
- `/products/` — catalogue and individual overview pages for 10 independent software products
- `/projects/` — 63 individually numbered project/property entries across independent products, Royal Cyber, 7cTech and IT Consultants; Royal Cyber's 15 corporate websites are listed as 15 separate entries, alongside 3 internal projects and 12 client projects
- `/case-studies/` — explanatory architecture flows, engineering context, project scope and delivery boundaries
- `/resume/` — master web resume based on the latest ATS resume and presales experience; browser Print / Save as PDF
- `/404.html` — branded not-found page

## Design and implementation
- Static HTML, CSS and vanilla JavaScript; no framework build step or database required
- Responsive editorial design system using restrained typography, graphite/olive surfaces and warm brass accents
- Inline SVG and CSS architecture diagrams are explicitly labelled as explanatory diagrams, not application screenshots
- Semantic page structure, responsive layout, social preview metadata, Person JSON-LD, SVG favicon and Apache `.htaccess` defaults
- Designed for direct static hosting; Vercel is not required

## Accuracy and confidentiality
- The master resume uses the latest ATS resume as the base and incorporates the presales responsibilities.
- Client delivery, independent products, in-progress builds, private work and paid mockups are distinguished.
- MedGulf is described as a paid client-specific CRM mockup, not a production rollout.
- PulseDrift is described as an independent engineering project; production uptime or customer outcomes are not claimed.
- Teknowland is described as backend development and support, not as a claim that the complete platform was built from scratch.
- Private client work has no invented public demo. No private source code, credentials or client data are published.
- Authentic product screenshots must be captured from accessible running applications or supplied original evidence. Architecture diagrams must not be presented as screenshots.
- Historical performance and efficiency figures are labelled as reported project outcomes, not current independent measurements.

## Hosting
This is a static site intended for Hostinger Business shared hosting. Vercel is not required.
1. Download the repository ZIP from GitHub.
2. Extract the contents and upload the repository contents to the target website document root (usually `public_html`).
3. Keep `index.html` at the root and preserve the `assets/`, `products/`, `projects/`, `case-studies/` and `resume/` folders.
4. Enable SSL and verify the HTTPS domain.
5. Test desktop and mobile layouts, internal links, external project links and Print / Save PDF.

## Updating
Keep this repository as the source of truth. Update HTML/CSS/JS and resume content here, then upload the same branch to Hostinger. The public portfolio URL can remain permanent while content is updated.

## Security baseline
- Apache directory indexing is disabled and a custom 404 handler is configured.
- The .htaccess baseline sets nosniff, a strict-origin referrer policy, same-origin framing protection, a restrictive Permissions Policy and a Content Security Policy.
- The Content Security Policy allows only same-origin scripts, the Google Fonts stylesheet/font hosts used by the site, and HTTPS/data image sources required by the portfolio.
- Dotfiles and common environment, log, database and backup artifact extensions are denied when Apache authorization directives are available.
- These controls depend on the corresponding Apache modules and Hostinger's AllowOverride configuration. Verify the actual response headers and denied-file behavior after upload.
- HSTS is intentionally not enabled in source until the final domain's HTTPS certificate and redirect behavior have been verified on the live host.
- This is a static-site security baseline, not a substitute for Hostinger account security, DNS/registrar protection, malware scanning, backups or live vulnerability testing.
