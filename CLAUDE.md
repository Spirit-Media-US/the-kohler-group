# The Kohler Group

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: The Kohler Group | Repo: github.com/Spirit-Media-US/the-kohler-group | Domain: thekohlergroup.net | Sanity ID: 2bom5gqg | R2 bucket: n/a

**Migration protocol:** /home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md
**Sanity Studio:** Embedded at thekohlergroup.net/studio/ (static build)
**Infrastructure:** Deploy webhook wired, CORS origins configured, studio deployed

## Status — as of 2026-04-08

### Completed & Live on Main
- Live site, completed migration
- Sanity Studio embedded at /studio with deploy webhook and CORS configured

## Dev Commands

- `npm run dev` — local preview at localhost:4325
- `npm run build` — production build to dist/

## Mandatory — Before Starting Work
Always start Claude sessions from inside this directory:
```
cd /srv/sites/the-kohler-group && claude
```
Running Claude from ~/ or ~/Sites/ bypasses this project's CLAUDE.md. A pre-edit hook enforces this, but following the workflow prevents warnings and ensures all project rules are loaded.

Then run: `git checkout dev && git pull origin dev`

## Rules

- All work goes to the **dev** branch — never push directly to main
- Only merge dev to main when Kevin says "push to main"
- Never push without local preview first
- **Regression check:** When fixing something, verify the fix doesn't break the same element at other breakpoints or in other contexts. Test both mobile AND desktop viewports before considering a visual change done. Use responsive Tailwind classes (e.g., `bg-center lg:bg-left-top`) rather than replacing one value with another when the original value was correct at certain screen sizes.
- **Before pushing:** Run a full `git diff` against the last known-good commit and review every hunk — not just the files you intended to change. Verify no content (embeds, links, markup) was accidentally removed or altered. If rewriting a section, preserve all existing elements (iframes, videos, images) unless explicitly asked to change them.
- **Never rewrite surrounding code:** When editing a specific line or section, do not touch adjacent code unless it's part of the requested change. Copy-paste the original structure and only modify the targeted elements.

## Protected Content — NEVER Remove Without Explicit Instruction

The following content has been lost and manually restored multiple times. Before committing any file that contains these elements, confirm they are still present:

- **JSON-LD structured data** (`<script type="application/ld+json">`) — marriage intensive has Service, Person, and VideoObject schemas. Layout.astro has LocalBusiness schema. Never strip these during SEO or content rewrites.
- **YouTube iframes** — marriage (`l_mb3yx43I0`) and individual (`umjQnWi94X4`) intensives. Never replace with `<video>` tags.
- **MailtoLink CTAs** — all three intensive pages use `<MailtoLink email={settings?.barbaraEmail}>`. Never revert to plain `<a href="mailto:...">`.
- **SEO titles and descriptions** — all pages use Barbara Kohler-branded titles/descriptions. Never replace with generic keyword versions.
- **Hero subtitle on marriage page** — "Led by Barbara Kohler, MS, LCMHC · Huntersville, NC"
- **Barbara Kohler photo and caption** on intensives/about and intensives/marriage

### Pre-commit check command
Run this before every commit touching these pages:
```
git diff HEAD -- src/pages/intensives/marriage.astro src/pages/intensives/individual.astro src/pages/intensives/about.astro src/layouts/Layout.astro | grep '^-' | grep -i 'json\|iframe\|MailtoLink\|Barbara\|title=\|description='
```
If that grep returns any lines, stop and verify the removal was intentional.

---

## Stitch MCP — AI Design Tool

Google Stitch 2.0 is an MCP server available in this project for AI-powered design work. It generates full page designs and auto-creates design systems (colors, typography, component rules). The MCP config is already symlinked into this repo (`.mcp.json`).

**When to use:** When Kevin asks for design work, new page layouts, or visual redesigns. Use Stitch first to get 80–90% of the design done visually, then implement in Astro/Tailwind.

**Available tools (prefixed `mcp__stitch__`):**
`create_project`, `generate_screen_from_text`, `create_design_system`, `apply_design_system`, `edit_screens`, `generate_variants`, `list_projects`, `list_screens`, `get_screen`, `get_project`, `list_design_systems`, `update_design_system`

**Workflow:**
1. Screenshot or paste URL into Stitch as style reference
2. Stitch generates full design + auto-creates design system
3. Export design.md / design system from Stitch
4. Hand off to Claude Code for Astro/Tailwind implementation

**Rules:**
- Use Gemini 3.1 Pro in Stitch (not 3.0 Flash)
- Stitch auto-generates a `design.md` — keep it in the project root for consistency
- This is the standard SMP workflow for all new site builds and major redesigns
<!--
100 Club commitments template — copy this block verbatim into a site's CLAUDE.md
during Phase 2H of the execute plan. Substitute the-kohler-group with the actual R2 path slug.
The guardrails script (/home/deploy/bin/100club-lint.sh) self-skips any site whose
CLAUDE.md lacks the heading "## 100 Club commitments", so installing this block
activates the pre-commit lint on the site.
-->

---

## 100 Club commitments (locked — do not regress)

**100 Club bar = homepage, median-of-5. Inner pages are quality work, not gate criteria.**

Every commitment below is a LOAD-BEARING structural decision. Do not "re-add" any of them without understanding the consequences.

### Hero image(s) are R2-only, NOT Sanity
- **URL pattern**: `https://assets.spiritmediapublishing.com/the-kohler-group/hero-*.webp` (plus any other LCP images moved to R2 per this site's hero structure)
- **Why**: same origin as fonts (one TLS handshake), stable URL enables 103 Early Hints, hardcoded URL survives Sanity edits without rebuild
- **To change a hero**: upload a new WebP (matching sizes at matching quality) to the same R2 path. Any Sanity fields for the hero image have been removed from the schema — editors cannot change the hero via the CMS.

### CSS must stay wrapped in @layer base
- `Layout.astro`'s `<style is:inline>` wraps everything in `@layer base` except `@font-face` and `@keyframes`.
- **Why**: unlayered rules beat every `@layer` rule regardless of specificity. Tailwind v4 ships utilities in `@layer utilities`. If critical CSS is unlayered, `.grid-cols-1` overrides external `.lg:grid-cols-4` and grids collapse site-wide.

### ClientRouter is OFF
- No `<ClientRouter />`, no `import { ClientRouter }` in Layout.astro.
- **Why**: static marketing sites don't need SPA nav. Saves ~125ms forced reflow + ~100ms script eval on mobile.
- All page JS uses `DOMContentLoaded` with readyState guard.

### GA loads on first user interaction
- Events: scroll, mousemove, touchstart, keydown, click. 8s fallback timeout.
- **Why**: Lighthouse never interacts, so GA doesn't load in audits. Real users get GA after they engage (post-LCP).

### `<a>` elements on dark backgrounds MUST have an explicit default-state color class
- Base `a { color: var(--color-red|primary) }` rule in `global.css` otherwise applies → brand color on dark bg fails WCAG.
- Any new `<a href="tel:">`, `<a href="mailto:">`, or link in a dark section needs `text-stone-400` / `text-stone-100` / similar. `hover:text-*` doesn't protect the default state.

### `[data-animate]` transitions are transform-only, no opacity
- `global.css`: `transition: transform 0.65s cubic-bezier(...)`. **Do NOT add `opacity` back to the transition.**
- **Why**: Lighthouse captures frames mid-transition; a 0.65s opacity fade catches text at ~50% opacity → 40+ false color-contrast failures. Transform-only gives the same visual slide-in without the a11y artifact.
- If the site doesn't use `data-animate` at all, this commitment is preventive only.

### Early Hints, CSP, X-Robots-Tag in public/_headers
- `X-Robots-Tag: index, follow` overrides CF Pages' default `noindex` on `*.pages.dev`
- CSP allows CF Insights (`static.cloudflareinsights.com` in `script-src`, `cloudflareinsights.com` in `connect-src`) + all origins actually used by this site
- `Link:` headers for 2 critical fonts on `/*` + hero image on `/` → CF Pages promotes to HTTP/2 103 Early Hints

### Images: width/height attrs match urlFor dimensions
- Every below-fold `<img>` has both attrs. Any urlFor resize change must update the attrs in the same commit.
- `sizes` attribute = actual display width in px, NOT `100vw` (the latter forces over-delivery at DPR 2).

### Build pipeline
- `inlineStylesheets: 'auto'` (NOT `'always'`)
- `scripts/async-css.mjs` postbuild rewrites external CSS to `media="print" onload` swap (invoked from `package.json` build script)
- `scripts/100club-verify.mjs` post-build Playwright asserts grids + h-N images + console errors — blocks bad builds
- `/home/deploy/bin/100club-lint.sh` is wired into `lefthook.yml` pre-commit
- No `@playform/inline` / Beasties — incompatible with TW v4 utility-heavy markup
