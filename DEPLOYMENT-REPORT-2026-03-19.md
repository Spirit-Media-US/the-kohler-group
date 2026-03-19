# Deployment Report — The Kohler Group
**thekohlergroup.net**
Prepared by: Spirit Media Publishing | Date: March 19, 2026 | Version: 2.0

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
| **Analytics** | Google Analytics 4 (G-RZFT197G0F) |
| **Monitoring** | UptimeRobot |
| **Package Mgr** | npm |
| **Domain** | Cloudflare DNS |
| **SSL** | Cloudflare (Full mode) + Netlify |

---

## What Was Built

### Site Structure & Sanity CMS Integration

Full site built in Astro 5 with Tailwind CSS v4 across 19 pages: Home, About, Our Therapists (dynamic via Sanity), FAQ, Intensives (About / Marriage / Individual), Testimonials, Education (Surviving Trauma / Media), Privacy Policy, Public Health Info, and Nondiscrimination Notice. All content (therapist bios, hero images, logos, booking URL, social links, phone, email) is sourced from Sanity CMS. The nav logo, footer logo, and site settings are fully CMS-driven so Barbara's team can update content without touching code.

### Design & Navigation

Two-tone navy header with centered logo on desktop and hamburger menu on mobile. Desktop nav includes dropdown menus for Intensives and Education. Therapist detail pages are dynamically generated from Sanity slugs. YouTube embeds on the Marriage and Individual Intensive pages with proper aspect ratio and loading attributes.

### SEO

- Site URL correctly set to `https://thekohlergroup.net` across all config
- Per-page location-based title tags (e.g., "Christian Counseling in Huntersville, NC")
- Unique meta descriptions for all 19 pages
- Full JSON-LD `ProfessionalService` structured data with address, phone, geo coordinates, business hours, and `areaServed` for Huntersville, Charlotte, Cornelius, Davidson, and Lake Norman
- Dynamic per-page canonical URLs
- OG image, `og:image:alt`, `og:image:width` (1200), `og:image:height` (630), `og:locale`
- Twitter Card meta tags
- `<meta name="author" content="Barbara Kohler, LCMHC">`
- `<meta name="theme-color" content="#173862">`
- `<meta name="robots" content="index, follow">`
- `robots.txt` with correct sitemap URL
- Sitemap submitted to Google Search Console — all 18 URLs clean (no junk slugs)
- Apple touch icon via Sanity CDN
- PWA `manifest.json`

### Performance

- `width` and `height` on all `<img>` tags (prevents CLS)
- `loading="lazy"` on all below-fold images (therapist listing, detail pages, testimonials, education, intensives, footer)
- `fetchpriority="high"` on above-fold nav logo images
- `<link rel="preload" as="image">` on all hero background images (14 pages) for faster LCP
- Google Fonts loaded with `display=swap`
- Netlify asset optimization: CSS/JS bundling, minification, image compression, HTML pretty URLs

### Security

All security headers configured in `netlify.toml`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` whitelisting Sanity CDN, Google Fonts, Google Analytics, SimplePractice booking, and YouTube embeds

### Accessibility (WCAG 2.1 AA)

- Skip-to-content link for keyboard users
- `:focus-visible` outline styles (`3px solid #173862`)
- `prefers-reduced-motion` support (disables smooth scroll)
- `aria-label` on nav logo links, hamburger toggle, and social icons
- `aria-expanded` and `aria-controls` on mobile menu toggle
- SVG icons use `aria-hidden="true"`
- Color contrast exceeds 4.5:1 AA minimum (brand navy on white = ~9.5:1)
- Correct heading hierarchy (h1 → h2 → h3) across all pages
- Decorative images verified — CSS backgrounds, proper alt text on logos/photos
- Keyboard navigation verified — tab order, skip link, focus states working

### Analytics & Tracking

- Google Analytics 4 installed (property: G-RZFT197G0F)
- CTA click tracking on all booking buttons — fires `cta_click` event with `booking` category to GA4

### Infrastructure

- `netlify.toml` with build settings, Node 20, asset optimization
- www → non-www 301 redirect
- Deploy previews configured for PRs and branches
- Netlify dashboard confirmed clean — no environment variable overrides
- 301 redirects for old site URLs still indexed by Google

### 301 Redirects (Old Site URLs)

| Old URL | New URL |
|---------|---------|
| `/marriage-intensives` | `/intensives/marriage/` |
| `/therapists/april-morris` | `/our-therapists/april-morris/` |
| `/therapists/*` | `/our-therapists/` |
| `/media` | `/education/media/` |
| `/surviving-trauma` | `/education/surviving-trauma/` |
| `/therapist-services` | `/our-therapists/` |

### Responsive Design

- Tested at 320px, 375px, 414px, 768px, 1024px, and 1440px
- No horizontal scroll at any viewport
- Hero images properly positioned across all devices
- Minimum 44×44px tap targets on mobile
- Smooth hover transitions on all interactive elements

### Content & Conversion

- Branded custom 404 page
- All external links verified working (booking, social profiles, ACA notices)
- Social sharing preview verified via Facebook Debugger
- Dynamic copyright year in footer
- Email obfuscation in footer to prevent scraping

---

## 58-Item Checklist — Final Status

### SEO — Critical

| # | Task | Status |
|---|------|--------|
| 1 | Site URL set to `thekohlergroup.net` | **DONE** |
| 2 | OG image and Twitter image meta tags | **DONE** |
| 3 | JSON-LD structured data (ProfessionalService) | **DONE** |
| 4 | Per-page canonical URLs | **DONE** |
| 5 | `<meta name="author">` | **DONE** |
| 6 | Sitemap verified — correct domain, clean URLs | **DONE** |
| 7 | Sitemap submitted to Google Search Console | **DONE** |
| 8 | robots.txt with correct sitemap URL | **DONE** |

### SEO — Enhancements

| # | Task | Status |
|---|------|--------|
| 9 | og:image:width, og:image:height, og:image:alt | **DONE** |
| 10 | Apple touch icon | **DONE** |
| 11 | `<meta name="theme-color">` | **DONE** |
| 12 | hreflang (multilingual) | **N/A** — English only |
| 13 | External links `rel="noopener noreferrer"` | **DONE** |
| 14 | manifest.json | **DONE** |

### Accessibility (WCAG 2.1 AA)

| # | Task | Status |
|---|------|--------|
| 15 | Skip-to-content link | **DONE** |
| 16 | `:focus-visible` outline styles | **DONE** |
| 17 | Color contrast ratios (4.5:1 min) | **DONE** |
| 18 | aria-label on icon links/buttons | **DONE** |
| 19 | Decorative images alt/role | **DONE** |
| 20 | `prefers-reduced-motion` support | **DONE** |
| 21 | Heading hierarchy | **DONE** |
| 22 | Keyboard navigation | **DONE** |

### Performance

| # | Task | Status |
|---|------|--------|
| 23 | Responsive srcset for hero images | **OPTIONAL** — Sanity CDN auto-optimizes |
| 24 | width/height on all `<img>` tags | **DONE** |
| 25 | `loading="lazy"` on below-fold images | **DONE** |
| 26 | `fetchpriority="high"` on LCP image | **DONE** |
| 27 | Preload hero background image | **DONE** |
| 28 | Font `display: swap` | **DONE** |
| 29 | Netlify asset optimization | **DONE** |
| 30 | Cache headers for CDN images | **DONE** |

### Responsive & Visual Polish

| # | Task | Status |
|---|------|--------|
| 31 | Tested at 320–1440px | **DONE** |
| 32 | No horizontal scroll | **DONE** |
| 33 | Hero background positioning | **DONE** |
| 34 | Link colors readable on all backgrounds | **DONE** |
| 35 | Smooth hover transitions | **DONE** |
| 36 | Minimum 44×44px tap targets | **DONE** |

### Infrastructure — Netlify

| # | Task | Status |
|---|------|--------|
| 37 | netlify.toml with build settings | **DONE** |
| 38 | Environment variables verified | **DONE** |
| 39 | Custom domain + SSL | **DONE** |
| 40 | Netlify asset optimization | **DONE** |
| 41 | Security headers | **DONE** |
| 42 | www → non-www redirect | **DONE** |
| 43 | Deploy previews for PRs | **DONE** |

### Security Headers

| # | Task | Status |
|---|------|--------|
| 44 | X-Frame-Options: DENY | **DONE** |
| 45 | X-Content-Type-Options: nosniff | **DONE** |
| 46 | Referrer-Policy | **DONE** |
| 47 | Content-Security-Policy | **DONE** |
| 48 | Permissions-Policy | **DONE** |

### Analytics & Monitoring

| # | Task | Status |
|---|------|--------|
| 49 | Google Analytics 4 | **DONE** |
| 50 | CTA click tracking | **DONE** |
| 51 | UptimeRobot monitoring | **PENDING** |
| 52 | Google Search Console | **DONE** |
| 53 | Bing Webmaster Tools | **OPTIONAL** |

### Content & Conversion

| # | Task | Status |
|---|------|--------|
| 54 | Custom 404 page | **DONE** |
| 55 | All external links verified | **DONE** |
| 56 | Social sharing preview tested | **DONE** |
| 57 | Spell-check | **DONE** |
| 58 | Dynamic copyright year | **DONE** |

---

## Summary

| Status | Count |
|--------|-------|
| **DONE** | 54 |
| **PENDING** | 1 (#51 — UptimeRobot) |
| **OPTIONAL** | 2 (#23, #53) |
| **N/A** | 1 (#12) |

### Remaining Action Item

1. **UptimeRobot** — Add `https://thekohlergroup.net` as an HTTP(s) monitor with 5-minute interval at uptimerobot.com/dashboard

---

*Prepared by Spirit Media Publishing • spiritmediapublishing.com*
*March 19, 2026 — The Kohler Group • thekohlergroup.net*
