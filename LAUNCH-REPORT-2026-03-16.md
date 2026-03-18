# Post-Launch Checklist Audit — The Kohler Group

> **58-item deployment checklist.**
> Audit re-run: 2026-03-16 (second pass) by Claude Code on bethel.
> Site: https://thekohlergroup.net
> Previous audit: 2026-03-16 (initial). Changes since last run are marked **[NEW]** or **[CHANGED]**.

---

## Critical Discovery — Domain Mismatch Root Cause

**The `main` branch `astro.config.mjs` hardcodes `site: 'https://thekohlergroup.com'`.**
This is why sitemap, canonical URLs, and robots.txt all reference `.com` in production —
the `PUBLIC_SITE_URL` env var in `netlify.toml` is never used.
The fix exists in the `dev` branch (`site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321'`)
but has **not been merged to `main`**. Kevin must approve the merge to resolve items 1, 4, 6, 8.

---

## SEO — Critical (Pre-Launch)

- [ ] **1.** Set `PUBLIC_SITE_URL` env var on Netlify to `https://thekohlergroup.net` — **FAIL [CHANGED]** — `netlify.toml` sets it correctly, but `main` branch `astro.config.mjs` hardcodes `site: 'https://thekohlergroup.com'` and ignores the env var entirely. Fix is in `dev` but unmerged.
- [x] **2.** Add `og:image` and `twitter:image` meta tags — **PASS [CHANGED — FIXED]** — Default OG image changed from `/og-default.png` (404) to `https://cdn.sanity.io/images/2bom5gqg/production/69ff224b35aa2d4c0e57339b5449330d55bf8095-468x311.jpg` in main branch Layout.astro. Real image, loads correctly. Improvement is in the `main` branch and live in production.
- [x] **3.** Add JSON-LD structured data (ProfessionalService) — **PASS** — Full `ProfessionalService` schema in Layout.astro with address, phone, hours, geo coordinates, and areaServed (Huntersville, Charlotte, Cornelius, Davidson, Lake Norman). Unchanged.
- [ ] **4.** Per-page canonical URLs — **FAIL [CHANGED]** — Production canonical URLs use `.com` (e.g., `<link rel="canonical" href="https://thekohlergroup.com/">`). Root cause: hardcoded `site` in main branch `astro.config.mjs`. Was incorrectly marked PASS in the first audit. Verified via `curl`.
- [ ] **5.** Add `<meta name="author">` with Barbara Kohler — **FAIL** — Not present in Layout.astro in either branch.
- [ ] **6.** Verify `sitemap-index.xml` at production URL — **FAIL** — Confirmed via `curl`: all 19 sitemap URLs use `thekohlergroup.com`. Root cause: hardcoded `site` in main branch `astro.config.mjs`. Additionally, `our-therapists/X9ORxzRbtqr9lSJFeK2GVy/` (junk Sanity document ID) appears in sitemap but returns a 301 redirect. `nondiscrimination-notice/` is now confirmed as a real, linked page (linked from footer). Still a critical SEO issue — search engines see the wrong domain.
- [ ] **7.** Submit sitemap to Google Search Console — **NOT VERIFIED** — Manual step. **Do not submit until item #6 is fixed** (wrong domain in all sitemap URLs).
- [ ] **8.** Verify `robots.txt` contains full sitemap URL — **FAIL [CHANGED]** — Production `robots.txt` contains `Sitemap: https://thekohlergroup.com/sitemap-index.xml` (wrong domain). Was rated PARTIAL PASS in first audit. Confirmed FAIL via `curl`. Note: Cloudflare is injecting AI bot rules into robots.txt automatically.

## SEO — Enhancements

- [ ] **9.** Add `og:image:width`, `og:image:height`, `og:image:alt` — **PARTIAL PASS [CHANGED — IMPROVED]** — `og:image:width` (468) and `og:image:height` (311) are now present in main branch Layout.astro and confirmed in production HTML. `og:image:alt` is still missing. Dimensions reflect actual image size — not the ideal 1200×630 but correct for the current image.
- [ ] **10.** Add `<link rel="apple-touch-icon">` — **FAIL** — Not present in Layout.astro (either branch). No apple-touch-icon file in `public/`.
- [ ] **11.** Add `<meta name="theme-color" content="#173862">` — **FAIL** — Not present in Layout.astro (either branch).
- [x] **12.** Add `hreflang` if multilingual planned — **N/A** — English-only site. No action needed.
- [x] **13.** All external links have `rel="noopener noreferrer"` — **PASS** — All `target="_blank"` links across source files have `rel="noopener noreferrer"`. Confirmed in source.
- [ ] **14.** Add `manifest.json` for PWA basics — **FAIL** — Not present. *(Optional — low priority.)*

## UX/UI — Accessibility (WCAG 2.1 AA)

- [ ] **15.** Skip-to-content link — **FAIL** — No skip link found in Nav.astro or Layout.astro in either branch. Keyboard users cannot bypass navigation.
- [ ] **16.** Visible `:focus-visible` outline styles — **FAIL** — No `:focus-visible` rules in `global.css` (102 lines). Browser defaults may apply inconsistently.
- [x] **17.** Color contrast ratios — **PASS** — Brand `#173862` on white = ~9.5:1 (exceeds AA 4.5:1). White on `#173862` = ~9.5:1. Manual verification recommended for overlay text on hero images with `bg-brand/40`.
- [x] **18.** `aria-label` on image-only links and icon buttons — **PASS** — 16 `aria-label`/`aria-hidden` attributes across source files. Nav toggle: `aria-label="Toggle navigation"`, `aria-expanded`, `aria-controls`. Logo links have `aria-label="The Kohler Group PLLC"`. Social icons (Instagram, Facebook) have aria-labels. SVG icons use `aria-hidden="true"`.
- [ ] **19.** Decorative images use `role="presentation"` or empty `alt` — **NEEDS BROWSER TEST** — CSS background images don't need alt text. Logo `<img>` tags have proper alt text. Sanity-loaded images need manual check.
- [ ] **20.** `prefers-reduced-motion` support — **FAIL** — No `prefers-reduced-motion` media query in `global.css`. `scroll-behavior: smooth` (line 37) is always active and should be gated.
- [x] **21.** Heading hierarchy correct — **PASS** — Homepage: 1× `<h1>`, multiple `<h2>` in correct order. Other pages follow proper hierarchy per source inspection.
- [ ] **22.** Full keyboard navigation test — **NEEDS BROWSER TEST** — Cannot verify tab order, focus trapping in mobile menu, or dropdown keyboard interaction from terminal.

## UX/UI — Performance

- [ ] **23.** Responsive `srcset` for hero/large images — **FAIL** — Heroes use CSS `background-image` via Sanity CDN with fixed `width(1920)`. No responsive breakpoints or srcset. *(Mitigated somewhat by Sanity CDN auto-optimization.)*
- [x] **24.** `width` and `height` on all `<img>` tags — **PASS** — Logo `<img>` tags in Nav.astro and Footer.astro have `width` and `height` attributes. Prevents CLS.
- [ ] **25.** `loading="lazy"` on below-fold images — **PARTIAL PASS** — Found 3 instances (`loading="lazy"`) in `testimonials.astro` and `our-therapists.astro`. Still missing on therapist detail pages, education pages, and other below-fold `<img>` elements.
- [ ] **26.** `fetchpriority="high"` on LCP image — **FAIL** — Not present on any element in either branch.
- [ ] **27.** Preload hero background image — **FAIL** — No `<link rel="preload" as="image">` in `<head>`. Hero background images load only after CSS is parsed, delaying LCP.
- [x] **28.** Font `display: optional` or `swap` — **PASS** — Google Fonts loaded with `display=swap` in Layout.astro.
- [x] **29.** Netlify asset optimization — **PASS** — `netlify.toml` enables CSS bundling/minification, JS bundling/minification, HTML pretty URLs, and image compression.
- [x] **30.** Cache headers for CDN images — **PASS** — Sanity CDN and Cloudflare handle caching automatically.

## UX/UI — Responsive & Visual Polish

- [ ] **31.** Test at 320px, 375px, 414px, 768px, 1024px, 1440px — **NEEDS BROWSER TEST** — Tailwind responsive classes present throughout (`sm:`, `md:`, `lg:`).
- [ ] **32.** No horizontal scroll at any viewport — **NEEDS BROWSER TEST** — `max-width: 100%` set on images in global.css. Cannot verify from terminal.
- [ ] **33.** Hero background positioning across devices — **NEEDS BROWSER TEST** — Uses `bg-cover bg-center` (home) and `bg-cover bg-left-top` (about). Cannot verify visual result.
- [ ] **34.** Link colors readable on all backgrounds — **NEEDS BROWSER TEST** — White on brand navy passes contrast. Text on hero overlays with `bg-brand/40` needs manual check.
- [ ] **35.** Smooth hover transitions on all interactive elements — **NEEDS BROWSER TEST** — `transition` class present on buttons and links.
- [ ] **36.** Minimum 44×44px tap targets on mobile — **NEEDS BROWSER TEST** — Nav links use `py-2` padding. CTA buttons use `px-8 py-3`. May be tight on smaller targets.

## Infrastructure — Netlify

- [x] **37.** Create `netlify.toml` with build settings — **PASS** — Build command (`npm run build`), publish dir (`dist`), Node 20, all processing options configured.
- [ ] **38.** Set environment variables on Netlify dashboard — **NOT VERIFIED** — Cannot verify from terminal. **Action needed:** Check if `PUBLIC_SITE_URL` is set in the Netlify dashboard environment variables — if it's set to `https://thekohlergroup.com` there, it would override `netlify.toml`. This may be contributing to item #1.
- [x] **39.** Configure custom domain + SSL — **PASS** — Site is live at `thekohlergroup.net`. HTTPS active. `.com` redirects to `.net`.
- [x] **40.** Enable Netlify asset optimization — **PASS** — All processing blocks enabled in netlify.toml.
- [ ] **41.** Security headers configured in `netlify.toml` — **FAIL** — No `[[headers]]` block in netlify.toml (either branch). Confirmed zero security headers in production response via `curl -sI`.
- [x] **42.** www to non-www 301 redirect — **PASS** — `[[redirects]]` in netlify.toml: `www.thekohlergroup.net/*` → `thekohlergroup.net/:splat` (301).
- [x] **43.** Deploy previews for PRs — **PASS** — `[context.deploy-preview]` and `[context.branch-deploy]` configured in netlify.toml.

## Infrastructure — Security Headers

- [ ] **44.** `X-Frame-Options: DENY` — **FAIL** — No security headers in netlify.toml. Not present in production response.
- [ ] **45.** `X-Content-Type-Options: nosniff` — **FAIL** — Not present.
- [ ] **46.** `Referrer-Policy: strict-origin-when-cross-origin` — **FAIL** — Not present.
- [ ] **47.** `Content-Security-Policy` — **FAIL** — Not present. Would need to allow `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.sanity.io`, `barbara-kohler.clientsecure.me`.
- [ ] **48.** `Permissions-Policy` — **FAIL** — Not present.

## Analytics & Monitoring

- [ ] **49.** Add Google Analytics 4 — **FAIL** — No GA4 tag (`G-W3R21TNHTX`) or gtag.js found in source code or production HTML. Zero analytics. Confirmed via `curl` and grep.
- [ ] **50.** CTA click tracking — **FAIL** — No analytics installed; click tracking not possible.
- [ ] **51.** UptimeRobot monitoring — **NOT VERIFIED** — Manual check needed at uptimerobot.com dashboard.
- [ ] **52.** Google Search Console — **NOT VERIFIED** — Manual post-deploy step. **Do not submit sitemap until domain issue is fixed (item #6).**
- [ ] **53.** Bing Webmaster Tools — **NOT VERIFIED** — *(Optional.)*

## Content & Conversion

- [x] **54.** Custom 404 page — **PASS** — Branded `404.astro` with "Page not found" and "Back to home" link.
- [ ] **55.** Verify all external links work — **NEEDS BROWSER TEST** — Booking URL (`barbara-kohler.clientsecure.me`) comes from Sanity CMS. Social links (Instagram, Facebook) present in nav footer. Manual click-through needed.
- [ ] **56.** Test social sharing preview — **NEEDS BROWSER TEST** — OG image now resolves (item #2 fixed). Use Facebook Debugger and Twitter Card Validator. Note: canonical URL is wrong domain — may affect share URL attribution.
- [ ] **57.** Spell-check all content — **NEEDS MANUAL REVIEW** — Content is client-managed via Sanity CMS. Static `.astro` file content appears clean.
- [x] **58.** Dynamic copyright year — **PASS** — Footer renders current year dynamically in both branches (Astro frontmatter in dev, JS-based in main).

---

## Summary

| Result | Count | Items |
|--------|-------|-------|
| **PASS** | 18 | 2, 3, 12, 13, 17, 18, 21, 24, 28, 29, 30, 37, 39, 40, 42, 43, 54, 58 |
| **PARTIAL PASS** | 2 | 9, 25 |
| **FAIL** | 22 | 1, 4, 5, 6, 8, 10, 11, 14, 15, 16, 20, 23, 26, 27, 41, 44, 45, 46, 47, 48, 49, 50 |
| **NEEDS BROWSER TEST** | 10 | 19, 22, 31, 32, 33, 34, 35, 36, 55, 56 |
| **NOT VERIFIED (manual)** | 5 | 7, 38, 51, 52, 53 |
| **NEEDS MANUAL REVIEW** | 1 | 57 |

### Changes Since First Audit (2026-03-16 initial)

| Item | First Audit | This Audit | Notes |
|------|-------------|------------|-------|
| **#1** PUBLIC_SITE_URL | PASS | **FAIL** | Main branch `astro.config.mjs` hardcodes `.com` — env var ignored |
| **#2** OG image | FAIL | **PASS** | Default now Sanity CDN URL (real image), not `/og-default.png` (404) |
| **#4** Canonical URLs | PASS | **FAIL** | Production shows `thekohlergroup.com` — wrong domain. Same root cause as #1 |
| **#8** robots.txt | PARTIAL | **FAIL** | Confirmed `.com` in sitemap URL. Cloudflare injecting AI bot rules. |
| **#9** OG dimensions | FAIL | **PARTIAL** | Width + height now present; alt still missing |

---

## Priority Fixes

### Critical — Fix First (SEO-breaking, unmerged dev branch)
1. **#1, 4, 6, 8 — Domain mismatch** — Merge `dev` to `main`. The dev branch `astro.config.mjs` correctly uses `process.env.PUBLIC_SITE_URL`. After merge, trigger a Netlify rebuild. This single action fixes canonical URLs, sitemap, and robots.txt domain issues. **Kevin approval required.**
2. **#38 — Check Netlify dashboard** — Verify `PUBLIC_SITE_URL` is NOT set to `.com` in Netlify dashboard → Site Settings → Environment Variables. Dashboard values override `netlify.toml`. If `.com` is set there, update it to `https://thekohlergroup.net`.
3. **#6 — Junk slug in sitemap** — `our-therapists/X9ORxzRbtqr9lSJFeK2GVy/` (raw Sanity document ID) appears in sitemap. In Sanity Studio, find the therapist record missing a proper slug field and add one, or add a filter to the GROQ query in `[slug].astro` to exclude records without a valid slug.

### High Priority (launch quality)
4. **#41–48 — Security headers** — Add a `[[headers]]` block to `netlify.toml` (in the `dev` branch, then merge) with at minimum:
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - A basic CSP allowing Sanity CDN, Google Fonts, and the booking widget
5. **#15 — Skip-to-content link** — Add `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>` at the top of Nav.astro or Layout.astro body. Add `id="main-content"` to the `<main>` tag in Layout.astro.
6. **#49 — GA4 tag** — Add Google Analytics tag `G-W3R21TNHTX` to Layout.astro `<head>`. Get the gtag.js snippet from Kevin or Google Analytics dashboard.

### Medium Priority
7. **#5 — Author meta** — Add `<meta name="author" content="Barbara Kohler, LCMHC">` to Layout.astro.
8. **#9 — OG image alt** — Add `<meta property="og:image:alt" content="The Kohler Group PLLC — Christian counseling in Huntersville, NC">` to Layout.astro.
9. **#10–11 — apple-touch-icon, theme-color** — Add `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` and `<meta name="theme-color" content="#173862">` to Layout.astro.
10. **#16 — Focus-visible styles** — Add `:focus-visible { outline: 3px solid #173862; outline-offset: 2px; }` to `global.css`.
11. **#20 — Reduced motion** — Add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { transition-duration: 0.01ms !important; } }` to `global.css`.
12. **#25–27 — Image performance** — Add `loading="lazy"` to remaining below-fold images, `fetchpriority="high"` to any above-fold `<img>` LCP candidate, consider `<link rel="preload" as="image">` for hero if performance score warrants it.

### Low Priority (post-launch)
13. **#7, #52, #53** — Submit sitemap to search engines after domain fix (item #1).
14. **#14** — Add `manifest.json` for basic PWA support (optional).
15. **#50** — Set up CTA click tracking after GA4 is live.
16. **#51** — Confirm thekohlergroup.net is monitored in UptimeRobot (5-min interval).

---

*Report generated by Claude Code on bethel — 2026-03-16 (second pass).*
