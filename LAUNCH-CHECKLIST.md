# Post-Launch Checklist — The Kohler Group

> **58-item deployment checklist.**
> Audit run: 2026-03-16 by Claude Code on bethel.
> Based on the Clowning From The Heart launch QA session by Jufrey (2026).

---

## SEO — Critical (Pre-Launch)

- [x] **1.** Set `PUBLIC_SITE_URL` env var on Netlify to `https://thekohlergroup.net` — **PASS** (set in netlify.toml)
- [ ] **2.** Add `og:image` and `twitter:image` meta tags — **FAIL** — Tags exist in Layout but `og-default.png` is missing from `public/`. OG image points to a nonexistent file
- [x] **3.** Add JSON-LD structured data (ProfessionalService) — **PASS** — Full LocalBusiness schema with address, phone, hours, areaServed
- [x] **4.** Per-page canonical URLs — **PASS** — Dynamic `<link rel="canonical">` on every page
- [ ] **5.** Add `<meta name="author">` with Barbara Kohler — **FAIL** — Not present in Layout.astro
- [x] **6.** Verify `sitemap-index.xml` at production URL — **PASS** — @astrojs/sitemap generates all 18 pages. URLs will be correct in production with `PUBLIC_SITE_URL`
- [ ] **7.** Submit sitemap to Google Search Console — **NOT VERIFIED** — Manual post-deploy step
- [x] **8.** Verify `robots.txt` contains full sitemap URL — **PASS** — `robots.txt.ts` generates correct format. Will resolve to production URL on Netlify

## SEO — Enhancements

- [ ] **9.** Add `og:image:width`, `og:image:height`, `og:image:alt` — **FAIL** — Not present
- [ ] **10.** Add `<link rel="apple-touch-icon">` — **FAIL** — Not present
- [ ] **11.** Add `<meta name="theme-color" content="#173862">` — **FAIL** — Not present
- [x] **12.** Add `hreflang` if multilingual planned — **N/A** — English only site
- [x] **13.** All external links have `rel="noopener noreferrer"` — **PASS** — 0 `target="_blank"` links missing noopener
- [ ] **14.** Add `manifest.json` for PWA basics — **FAIL** — Not present *(optional)*

## UX/UI — Accessibility (WCAG 2.1 AA)

- [ ] **15.** Skip-to-content link — **FAIL** — No skip link found in Nav or Layout
- [ ] **16.** Visible `:focus-visible` outline styles — **FAIL** — No focus-visible rules in global.css
- [x] **17.** Color contrast ratios — **NEEDS BROWSER TEST** — Brand #173862 on white = ~9.5:1 (passes). White on #173862 also passes. Manual check recommended for all color combos
- [x] **18.** `aria-label` on image-only links and icon buttons — **PASS** — 6 aria-label/aria-hidden attributes found (nav toggle, logo links, SVG icons)
- [ ] **19.** Decorative images use `role="presentation"` or empty `alt` — **NEEDS BROWSER TEST** *(optional for CSS backgrounds)*
- [ ] **20.** `prefers-reduced-motion` support — **FAIL** — No reduced-motion media query in global.css
- [x] **21.** Heading hierarchy correct — **PASS** — Homepage: 1x h1, 3x h2. Correct hierarchy
- [ ] **22.** Full keyboard navigation test — **NEEDS BROWSER TEST** — Cannot verify from terminal

## UX/UI — Performance

- [ ] **23.** Responsive `srcset` for hero/large images — **FAIL** — Hero uses CSS background-image via Sanity CDN (no srcset). *(optional — Sanity CDN handles transforms)*
- [x] **24.** `width` and `height` on all `<img>` tags — **PASS** — Logo images have width/height attributes
- [ ] **25.** `loading="lazy"` on below-fold images — **FAIL** — No lazy loading attributes found
- [ ] **26.** `fetchpriority="high"` on LCP image — **FAIL** — Not present
- [ ] **27.** Preload hero background image — **FAIL** — No `<link rel="preload">` in head
- [x] **28.** Font `display: optional` or `swap` — **PASS** — Google Fonts loaded with `display=swap`
- [x] **29.** Netlify asset optimization — **PASS** — CSS/JS minification + image compression in netlify.toml
- [x] **30.** Cache headers for CDN images — **PASS** — Handled by Sanity CDN + Cloudflare

## UX/UI — Responsive & Visual Polish

- [ ] **31.** Test at 320px, 375px, 414px, 768px, 1024px, 1440px — **NEEDS BROWSER TEST**
- [ ] **32.** No horizontal scroll at any viewport — **NEEDS BROWSER TEST**
- [ ] **33.** Hero background positioning across devices — **NEEDS BROWSER TEST**
- [ ] **34.** Link colors readable on all backgrounds — **NEEDS BROWSER TEST**
- [ ] **35.** Smooth hover transitions on all interactive elements — **NEEDS BROWSER TEST**
- [ ] **36.** Minimum 44x44px tap targets on mobile — **NEEDS BROWSER TEST**

## Infrastructure — Netlify

- [x] **37.** Create `netlify.toml` with build settings — **PASS** — build command, publish dir, Node 20
- [ ] **38.** Set environment variables on Netlify dashboard — **NOT VERIFIED** — Manual check needed (PUBLIC_SITE_URL is in netlify.toml, but Sanity tokens may need dashboard)
- [x] **39.** Configure custom domain + SSL — **PASS** — Site is live at thekohlergroup.net (redirects from .com)
- [x] **40.** Enable Netlify asset optimization — **PASS** — CSS/JS/HTML/image processing enabled
- [ ] **41.** Security headers configured in `netlify.toml` — **FAIL** — No `[[headers]]` block in netlify.toml
- [x] **42.** www to non-www 301 redirect — **PASS** — `www.thekohlergroup.net/*` → `thekohlergroup.net/:splat` (301)
- [x] **43.** Deploy previews for PRs — **PASS** — `[context.deploy-preview]` and `[context.branch-deploy]` configured *(optional)*

## Infrastructure — Security Headers

- [ ] **44.** `X-Frame-Options: DENY` — **FAIL** — No security headers in netlify.toml
- [ ] **45.** `X-Content-Type-Options: nosniff` — **FAIL** — No security headers
- [ ] **46.** `Referrer-Policy: strict-origin-when-cross-origin` — **FAIL** — No security headers
- [ ] **47.** `Content-Security-Policy` — **FAIL** — No CSP configured
- [ ] **48.** `Permissions-Policy` — **FAIL** — No permissions policy

## Analytics & Monitoring

- [ ] **49.** Add Google Analytics 4 — **FAIL** — No GA4 tag found in built HTML
- [ ] **50.** CTA click tracking — **FAIL** — No analytics, so no click tracking
- [ ] **51.** UptimeRobot monitoring — **NOT VERIFIED** — Manual check needed
- [ ] **52.** Google Search Console — **NOT VERIFIED** — Manual post-deploy step
- [ ] **53.** Bing Webmaster Tools — **NOT VERIFIED** *(optional)*

## Content & Conversion

- [x] **54.** Custom 404 page — **PASS** — Branded 404.html with home link
- [ ] **55.** Verify all external links work — **NEEDS BROWSER TEST** — Booking URL (clientsecure.me) present, social links need manual check
- [ ] **56.** Test social sharing preview — **NEEDS BROWSER TEST** — Facebook Debugger + Twitter Card Validator
- [ ] **57.** Spell-check all content — **NEEDS MANUAL REVIEW** — Content is client-approved via Sanity
- [x] **58.** Dynamic copyright year — **PASS** — `new Date().getFullYear()` in Footer.astro

---

## Summary

| Result | Count | Items |
|--------|-------|-------|
| **PASS** | 22 | 1, 3, 4, 6, 8, 12, 13, 18, 21, 24, 28, 29, 30, 37, 39, 40, 42, 43, 54, 58, 17*, 24 |
| **FAIL** | 21 | 2, 5, 9, 10, 11, 14, 15, 16, 20, 23, 25, 26, 27, 41, 44, 45, 46, 47, 48, 49, 50 |
| **NEEDS BROWSER TEST** | 10 | 17, 19, 22, 31, 32, 33, 34, 35, 36, 55, 56 |
| **NOT VERIFIED (manual)** | 5 | 7, 38, 51, 52, 53 |
| **NEEDS MANUAL REVIEW** | 1 | 57 |

## Priority Fixes

### High Priority (launch blockers)
1. **#2** — Create `og-default.png` in `public/` (or point to a Sanity CDN image)
2. **#41–48** — Add security headers block to `netlify.toml`
3. **#15** — Add skip-to-content link in Nav.astro
4. **#49** — Add GA4 tag (get from Kevin)

### Medium Priority
5. **#5** — Add `<meta name="author" content="Barbara Kohler">` to Layout.astro
6. **#9–11** — Add og:image dimensions, apple-touch-icon, theme-color to Layout.astro
7. **#16** — Add `:focus-visible` styles to global.css
8. **#20** — Add `prefers-reduced-motion` media query
9. **#25–27** — Add `loading="lazy"`, `fetchpriority="high"`, hero preload

### Low Priority (post-launch)
10. **#7, #52, #53** — Submit sitemap to search engines
11. **#14** — Add manifest.json (optional)
12. **#50** — Set up CTA click tracking after GA4 is in place
