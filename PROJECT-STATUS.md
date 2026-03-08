# The Kohler Group — Project Status & Knowledge Base
> Last updated: 2026-03-08
> **Claude: Read this file before making any statements about project state or touching any code.**

---

## Stack
- **Framework:** Astro v5 + Tailwind CSS
- **CMS:** Sanity (projectId: `2bom5gqg`, dataset: `production`)
- **Hosting:** Netlify
- **DNS:** Cloudflare
- **Domain:** thekohlergroup.com
- **Repo:** `Spirit-Media-US/the-kohler-group` (GitHub org)

---

## Pages
| Page | Sanity | Notes |
|---|---|---|
| index.astro | partial | Check fetch status |
| about.astro | unknown | Check |
| our-therapists.astro | unknown | Therapist profiles should be Sanity documents |
| intensives/ | unknown | Check |
| education/ | unknown | Check |
| testimonials.astro | unknown | Should pull from Sanity |
| faq.astro | unknown | Should pull from Sanity |
| privacy-policy.astro | no | Static |
| public-health-info.astro | no | Static |
| 404.astro | no | Static |

---

## Known Issues / Remaining Tasks
- 12 images still in public/ — audit which are referenced and migrate to Sanity CDN
- No PROJECT-STATUS.md existed before 2026-03-08 — full audit needed
- Confirm Sanity webhook → Netlify rebuild is configured

---

## Key Rules
- All images: Sanity CDN, not public/
- Contact forms: GHL embed codes, not Netlify native forms
- One session = one push = one Netlify build credit
