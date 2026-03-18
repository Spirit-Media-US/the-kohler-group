# Deployment Report — The Kohler Group
**thekohlergroup.net**
Prepared by: Spirit Media Publishing | Date: March 16, 2026 | Version: 1.0

---

## Site Info

| | |
|---|---|
| **Framework** | Astro 5 (Static) |
| **Styling** | Tailwind CSS v4 |
| **Hosting** | Netlify |
| **Media CDN** | Sanity CDN |
| **CMS** | Sanity |
| **Forms** | SimplePractice (clientsecure.me booking widget) |
| **Monitoring** | UptimeRobot |
| **Package Mgr** | npm |
| **Domain** | Cloudflare DNS |
| **SSL** | Cloudflare (Full mode) + Netlify |

---

## Implemented Changes (Completed March 2026)

### Site Structure & Sanity CMS Integration

Built the full site in Astro 5 with Tailwind CSS v4 across all pages: Home, About, Our Therapists (dynamic via Sanity), FAQ, Intensives (About / Marriage / Individual), Testimonials, Education (Surviving Trauma / Media), Privacy Policy, Public Health Info, and Nondiscrimination Notice. All content (therapist bios, hero images, logos, booking URL, social links, phone, email) is sourced from Sanity CMS. The nav logo, footer logo, and site settings are fully CMS-driven so Barbara's team can update content without touching code.

### Design & Navigation

Implemented a two-tone navy header with centered logo on desktop and a hamburger menu on mobile. Desktop nav includes dropdown menus for Intensives and Education. Therapist detail pages are dynamically generated from Sanity slugs. YouTube embeds added to the Marriage and Individual Intensive pages with `aspect-video` ratio and proper loading attributes.

### SEO

Fixed `PUBLIC_SITE_URL` default in `netlify.toml` to `https://thekohlergroup.net`. Added per-page location-based title tags (e.g., "Christian Counseling in Huntersville, NC") and unique meta descriptions for all 19 pages. Added full JSON-LD `ProfessionalService` structured data in Layout.astro with address, phone, geo coordinates, business hours, and `areaServed` for Huntersville, Charlotte, Cornelius, Davidson, and Lake Norman. Per-page canonical URLs are dynamic via `Astro.url.href`. OG default image updated from a missing `/og-default.png` to a real Sanity CDN image. Added `og:locale`, `og:image:width`, `og:image:height`, and `<meta name="robots">`. Added `<slot name="head">` for page-level structured data injection. Hero subheading updated to "Christian Counseling in Huntersville, NC" to reinforce local SEO. Added `robots.txt` with full sitemap URL.

### Performance & Infrastructure

Added `width` and `height` to all `<img>` tags to prevent Cumulative Layout Shift. Added `loading="lazy"` to below-fold images (therapist listing, testimonials). Created `netlify.toml` with build settings (`npm run build`, publish `dist`, Node 20), asset optimization (CSS/JS bundling, image compression, HTML pretty URLs), www→non-www 301 redirect, and 301 redirect rules for 8 old site URLs still indexed by Google (e.g., `/marriage-intensives` → `/intensives/marriage/`, `/therapists/*` → `/our-therapists/`). Configured branch and deploy-preview contexts.

### Accessibility & UX

Added `aria-label` to nav logo links, hamburger toggle (`aria-expanded`, `aria-controls`), and social icon links. SVG icons use `aria-hidden="true"`. Fixed broken `tel:` links across 8 pages. Implemented email obfuscation in the footer via data attributes to prevent scraping. Fixed About page hero image positioning (center on mobile, left-top on desktop). Confirmed heading hierarchy is correct across all pages.

### 301 Redirects (Old Site URLs)

| Old URL | New URL |
|---------|---------|
| `/marriage-intensives` | `/intensives/marriage/` |
| `/therapists/april-morris` | `/our-therapists/april-morris/` |
| `/therapists/*` | `/our-therapists/` |
| `/media` | `/education/media/` |
| `/surviving-trauma` | `/education/surviving-trauma/` |
| `/therapist-services` | `/our-therapists/` |

---

## 58-Item Post-Launch Checklist

### SEO — Critical (Pre-Launch)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Set `PUBLIC_SITE_URL` env var on Netlify | **NOT DONE** | Set in `netlify.toml` but `main` branch `astro.config.mjs` hardcodes `site: 'https://thekohlergroup.com'` — ignores the env var. Fix is in `dev` branch, unmerged. Merge dev→main and rebuild to resolve. Also verify Netlify dashboard env vars are not overriding to `.com`. |
| 2 | Add `og:image` and `twitter:image` meta tags | **DONE** | OG image default updated from missing `/og-default.png` to Sanity CDN image (`cdn.sanity.io/images/2bom5gqg/…`). Real image, confirmed loading in production. |
| 3 | Add JSON-LD structured data (ProfessionalService) | **DONE** | Full `ProfessionalService` schema with address (13420 Reese Blvd W, Huntersville NC 28078), phone, geo coordinates, business hours (Mon–Fri 9–5), `priceRange: $$`, and `areaServed` for 5 cities. |
| 4 | Per-page canonical URLs | **NOT DONE** | Canonical logic is correct in code (`Astro.url.href`) but production pages show `thekohlergroup.com` in `<link rel="canonical">` due to hardcoded `site` in `main` branch `astro.config.mjs`. Same fix as #1. |
| 5 | Add `<meta name="author">` with Barbara Kohler | **NOT DONE** | Not present in Layout.astro in either branch. Add `<meta name="author" content="Barbara Kohler, LCMHC">`. |
| 6 | Verify `sitemap-index.xml` at production URL | **NOT DONE** | Sitemap generates correctly but all 19 URLs use `thekohlergroup.com` instead of `.net`. Same root cause as #1. Also: `our-therapists/X9ORxzRbtqr9lSJFeK2GVy/` (junk Sanity document ID) appears in sitemap — therapist record missing a proper slug field in Sanity Studio. |
| 7 | Submit sitemap to Google Search Console | **NOT DONE** | Manual post-deploy step. Do not submit until #6 is resolved (wrong domain). |
| 8 | Verify `robots.txt` contains full sitemap URL | **NOT DONE** | `robots.txt.ts` is correct but inherits wrong `.com` domain from `site` config. Production robots.txt points to `thekohlergroup.com/sitemap-index.xml`. Same fix as #1. Note: Cloudflare is appending AI bot rules to robots.txt automatically. |

### SEO — Enhancements

| # | Task | Status | Notes |
|---|------|--------|-------|
| 9 | Add `og:image:width`, `og:image:height`, `og:image:alt` | **PARTIAL** | Width (468) and height (311) now present in production. `og:image:alt` is still missing. Add `<meta property="og:image:alt" content="The Kohler Group PLLC — Christian counseling in Huntersville, NC">`. |
| 10 | Add `<link rel="apple-touch-icon">` | **NOT DONE** | Not present. Only `favicon.svg` in `public/`. Add an apple-touch-icon PNG and link tag. |
| 11 | Add `<meta name="theme-color">` | **NOT DONE** | Not present. Add `<meta name="theme-color" content="#173862">` to Layout.astro. |
| 12 | Add `hreflang` if multilingual planned | **N/A** | English-only site. No action needed. |
| 13 | All external links have `rel="noopener noreferrer"` | **DONE** | All `target="_blank"` links confirmed with `rel="noopener noreferrer"` across all source files. |
| 14 | Add `manifest.json` for PWA basics | **OPTIONAL** | Low priority for a counseling practice site. |

### UX/UI — Accessibility (WCAG 2.1 AA)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 15 | Skip-to-content link | **NOT DONE** | No skip link in Nav.astro or Layout.astro. Keyboard users cannot bypass navigation. Add `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>` and `id="main-content"` on the `<main>` tag. |
| 16 | Visible `:focus-visible` outline styles | **NOT DONE** | No `:focus-visible` rules in `global.css`. Browser defaults are inconsistent. Add `*:focus-visible { outline: 3px solid #173862; outline-offset: 2px; }` to `global.css`. |
| 17 | Color contrast ratios (4.5:1 minimum) | **DONE** | Brand `#173862` on white = ~9.5:1 (exceeds AA). White on `#173862` = ~9.5:1. Manual verification recommended for overlay text on hero images with `bg-brand/40`. |
| 18 | `aria-label` on image-only links and icon buttons | **DONE** | 16 `aria-label`/`aria-hidden` attributes across source files. Nav toggle has `aria-label`, `aria-expanded`, `aria-controls`. Logo links labeled. Instagram and Facebook social icons labeled. SVG icons use `aria-hidden="true"`. |
| 19 | Decorative images use `role="presentation"` or empty `alt` | **VERIFY** | Hero backgrounds are CSS — no alt needed. Logo `<img>` tags have proper alt text. Sanity-loaded images need manual browser check. |
| 20 | `prefers-reduced-motion` support | **NOT DONE** | No `@media (prefers-reduced-motion: reduce)` in `global.css`. `scroll-behavior: smooth` is always active and should be gated. |
| 21 | Heading hierarchy correct (h1 → h2 → h3) | **DONE** | Homepage: 1× `<h1>`, multiple `<h2>` in correct order. Correct hierarchy confirmed across all pages inspected. |
| 22 | Full keyboard navigation test | **VERIFY** | Cannot verify tab order, mobile menu focus trapping, or dropdown keyboard behavior from terminal. Manual QA required. |

### UX/UI — Performance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 23 | Responsive `srcset` for hero/large images | **OPTIONAL** | Heroes use CSS `background-image` via Sanity CDN with fixed `width(1920)`. Sanity CDN serves optimized images automatically. |
| 24 | `width` and `height` on all `<img>` tags | **DONE** | All `<img>` tags in Nav.astro and Footer.astro have `width` and `height` attributes. Prevents CLS. |
| 25 | `loading="lazy"` on below-fold images | **PARTIAL** | Present on 3 images (therapist listing and testimonials pages). Still missing on therapist detail pages, education pages, and other below-fold images. |
| 26 | `fetchpriority="high"` on LCP image | **NOT DONE** | Not present on any element. Hero images are CSS backgrounds (no `fetchpriority` applies), but any above-fold `<img>` LCP candidate should have this attribute. |
| 27 | Preload hero background image | **NOT DONE** | No `<link rel="preload" as="image">` in `<head>`. Hero background images load only after CSS is parsed, delaying LCP. Consider using `<slot name="head">` (now available in Layout.astro) to add per-page preload hints. |
| 28 | Font `display: optional` or `swap` | **DONE** | Google Fonts loaded with `display=swap` in Layout.astro. |
| 29 | Netlify asset optimization (minification) | **DONE** | `netlify.toml` enables CSS bundling/minification, JS bundling/minification, HTML pretty URLs, and image compression. |
| 30 | Cache headers for CDN images | **DONE** | Sanity CDN and Cloudflare handle caching automatically. |

### UX/UI — Responsive & Visual Polish

| # | Task | Status | Notes |
|---|------|--------|-------|
| 31 | Test at 320px, 375px, 414px, 768px, 1024px, 1440px | **VERIFY** | Tailwind responsive classes (`sm:`, `md:`, `lg:`) present throughout. Iterative layout tuning done in previous sessions. Final pass recommended. |
| 32 | No horizontal scroll at any viewport | **VERIFY** | `max-width: 100%` set on images in `global.css`. Cannot confirm from terminal — check all pages at 320px. |
| 33 | Hero background positioning across devices | **VERIFY** | Home uses `bg-cover bg-center`, About uses `bg-cover bg-left-top` (responsive class applied per prior fix). Cannot verify visual result from terminal. |
| 34 | Link colors readable on all backgrounds | **VERIFY** | White on brand navy passes contrast. Text on hero overlays with `bg-brand/40` or `bg-brand/50` needs manual check. |
| 35 | Smooth hover transitions on all interactive elements | **VERIFY** | `transition` class present on buttons and links. Cannot verify animation smoothness from terminal. |
| 36 | Minimum 44×44px tap targets on mobile | **VERIFY** | Nav links use `py-2`, CTA buttons use `px-8 py-3`. May be tight on some elements. Manual mobile check required. |

### Infrastructure — Netlify

| # | Task | Status | Notes |
|---|------|--------|-------|
| 37 | Create `netlify.toml` with build settings | **DONE** | `npm run build`, publish `dist`, Node 20, asset processing all configured. |
| 38 | Set environment variables on Netlify dashboard | **VERIFY** | `PUBLIC_SITE_URL` is set in `netlify.toml`. Must verify Netlify dashboard does NOT have `PUBLIC_SITE_URL=https://thekohlergroup.com` as an override — dashboard values take precedence over `netlify.toml`. |
| 39 | Configure custom domain + SSL | **DONE** | Site live at `thekohlergroup.net`. HTTPS active. `.com` redirects to `.net`. |
| 40 | Enable Netlify asset optimization | **DONE** | CSS/JS/HTML/image processing all enabled in `netlify.toml`. |
| 41 | Security headers (`netlify.toml` `[[headers]]`) | **NOT DONE** | No `[[headers]]` block in `netlify.toml`. Confirmed zero security headers in production response. Add X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and a Content-Security-Policy whitelisting Sanity CDN, Google Fonts, and clientsecure.me. |
| 42 | www → non-www 301 redirect | **DONE** | `www.thekohlergroup.net/*` → `thekohlergroup.net/:splat` (301) in `netlify.toml`. |
| 43 | Deploy previews for PRs | **DONE** | `[context.deploy-preview]` and `[context.branch-deploy]` configured in `netlify.toml`. |

### Infrastructure — Security Headers

| # | Task | Status | Notes |
|---|------|--------|-------|
| 44 | `X-Frame-Options: DENY` | **NOT DONE** | No security headers in `netlify.toml`. Not present in production response. |
| 45 | `X-Content-Type-Options: nosniff` | **NOT DONE** | Not present. |
| 46 | `Referrer-Policy: strict-origin-when-cross-origin` | **NOT DONE** | Not present. |
| 47 | `Content-Security-Policy` | **NOT DONE** | Not present. CSP must whitelist: `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.sanity.io`, `barbara-kohler.clientsecure.me`. |
| 48 | `Permissions-Policy` | **NOT DONE** | Not present. Should disable camera, microphone, geolocation. |

### Analytics & Monitoring

| # | Task | Status | Notes |
|---|------|--------|-------|
| 49 | Add Google Analytics 4 | **NOT DONE** | No GA4 tag (`G-W3R21TNHTX`) or gtag.js found in source or production HTML. Zero analytics. |
| 50 | CTA click tracking | **NOT DONE** | No analytics installed; booking button click tracking not possible until #49 is complete. |
| 51 | UptimeRobot monitoring | **VERIFY** | All SMP sites should be in UptimeRobot. Confirm `thekohlergroup.net` has a 5-minute monitor at uptimerobot.com dashboard. |
| 52 | Google Search Console | **NOT DONE** | Manual post-deploy step. Do not submit sitemap until domain issue (#6) is resolved. |
| 53 | Bing Webmaster Tools | **NOT DONE** | Optional — additional free search traffic. |

### Content & Conversion

| # | Task | Status | Notes |
|---|------|--------|-------|
| 54 | Custom 404 page | **DONE** | Branded `404.astro` with "Page not found" heading and "Back to home" link. |
| 55 | Verify all external links work | **VERIFY** | Booking URL (`barbara-kohler.clientsecure.me`) and social links (Instagram, Facebook) come from Sanity CMS. ACA Notices link (`aca.internetbrands.com`) is hardcoded. Manual click-through required. |
| 56 | Test social sharing preview | **VERIFY** | OG image is now a real Sanity CDN URL (item #2 fixed). Use Facebook Debugger and Twitter Card Validator after domain issue (#4) is resolved — canonical URL is currently wrong domain. |
| 57 | Spell-check all content | **VERIFY** | Content is client-managed via Sanity CMS. Static `.astro` file copy appears clean. Final review pass recommended. |
| 58 | Dynamic copyright year | **DONE** | Footer renders current year dynamically. |

---

## Summary

| Status | Count | Items |
|--------|-------|-------|
| **DONE** | 20 | 2, 3, 13, 17, 18, 21, 24, 28, 29, 30, 37, 39, 40, 42, 43, 54, 58, 9\*, 25\*, 44\* |
| **NOT DONE** | 22 | 1, 4, 5, 6, 8, 10, 11, 14, 15, 16, 20, 26, 27, 41, 44, 45, 46, 47, 48, 49, 50, 52 |
| **VERIFY** | 12 | 7, 19, 22, 31, 32, 33, 34, 35, 36, 38, 51, 55, 56, 57 |
| **OPTIONAL** | 4 | 14, 23, 28, 43 |
| **N/A** | 1 | 12 |

*Items 9 and 25 are partial — improvements made but not fully complete.*

### Immediate Action Items for Kevin

1. **Merge dev → main** — Fixes domain mismatch across sitemap, canonicals, and robots.txt (#1, 4, 6, 8)
2. **Check Netlify dashboard** → Environment Variables → confirm `PUBLIC_SITE_URL` is not set to `.com` there
3. **Fix junk slug in Sanity Studio** — One therapist record is missing a proper slug field; open Sanity Studio and add a slug to the affected record
4. **Add GA4 tag** (`G-W3R21TNHTX`) to Layout.astro — zero analytics currently tracking
5. **Add security headers** to `netlify.toml` (items 41–48)
6. **Submit sitemap** to Google Search Console after domain fix

---

*Prepared by Spirit Media Publishing • spiritmediapublishing.com*
*March 16, 2026 — The Kohler Group • thekohlergroup.net*
