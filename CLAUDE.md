# The Kohler Group

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: The Kohler Group | Repo: github.com/Spirit-Media-US/the-kohler-group | Domain: thekohlergroup.net | Sanity ID: 2bom5gqg | R2 bucket: n/a

**Migration protocol:** /home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md
**Sanity Studio:** Embedded at thekohlergroup.net/studio/ (static build)
**Infrastructure:** Deploy webhook wired, CORS origins configured, studio deployed

## Status — as of 2026-04-26

### Completed & Live on Main
- Live site, completed migration
- Sanity Studio embedded at /studio with deploy webhook and CORS configured

### On dev — pending Kevin's "push to main"
- `/save-our-marriage` landing page for Barbara's $15K Marriage Intensive funnel.
  Built to Barbara's HTML prototype design (sapphire+gold+cream, Cormorant
  Garamond serif). 8-question screening quiz with 3 branched outcomes
  (qualified / not-ready / travel-impossible) plus an Individual Intensive
  sub-form. Submit fires a mailto: to `siteSettings.barbaraEmail` with all
  answers pre-filled (TKG isn't in our GHL — matches the existing MailtoLink
  pattern on the rest of the site). Existing `/intensives/marriage` page
  untouched. Dev preview: https://dev.the-kohler-group.pages.dev/save-our-marriage
- `Layout.astro` now supports `landing={true}` prop that suppresses the global
  `<Nav>` and `<Footer>` for funnel pages, while keeping all SEO/preload/
  font/JSON-LD machinery intact. Existing pages render unchanged.
- `siteSettings` schema extended with 4 SOM fields: `somVideoUrl`,
  `somHeroBackground`, `somBarbaraPhoto`, `somPrice`. Barbara can edit from
  Studio without code changes. Defaults render correctly when fields are blank.
- Cormorant Garamond self-hosted to `assets.spiritmediapublishing.com/fonts/cormorant-garamond/`
  per the perf gate. Single weight (400) preloaded; rest load via `font-display:swap`.
- SOM page CSS scoped under `body.som-page` so the navy/gold/cream palette and
  Cormorant serif don't leak into the rest of TKG. Verbatim port of Barbara's
  prototype CSS.
- Couples thumbnails strip above "Who This Is For": 4 square photos —
  young-couple + senior-couple from Sanity, plus 2 lifestyle couple photos
  hot-linked from `images.unsplash.com` (`img-src` allowlist updated in
  `public/_headers`).

### Blocked — pending Barbara
- `saveourmarriage.us` → 301 redirect to `/save-our-marriage`. Waiting on
  Barbara to confirm where the domain is registered. Once known: if it's
  on Cloudflare, add a redirect rule; if elsewhere, set a host-level 301.
- "Message from Barbara" video — placeholder card renders until Barbara
  records and pastes the YouTube URL into Studio's `SOM — Barbara Video URL`.

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
