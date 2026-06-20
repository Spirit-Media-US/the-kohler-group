# The Kohler Group

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: The Kohler Group | Repo: github.com/Spirit-Media-US/the-kohler-group | Domain: thekohlergroup.net | Sanity ID: 2bom5gqg | R2 bucket: n/a

**Migration protocol:** /home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md
**Sanity Studio:** Embedded at thekohlergroup.net/studio/ (static build)
**Infrastructure:** Deploy webhook wired, CORS origins configured, studio deployed

## Status — as of 2026-05-22

### Completed & Live on Main
- Live site, completed migration
- Sanity Studio embedded at /studio with deploy webhook and CORS configured
- **Landing-page copy is Sanity-editable (2026-06-12).** `somPage` ("Save My
  Marriage — Page") and `hytPage` ("Heal Your Trauma — Page") singleton schemas
  expose the editable prose (hero, section labels/intros, pillars, who-this-is-for,
  stat boxes, investment copy + includes, bio paragraphs, testimonials/quiz
  intros, footer legal) as grouped fields + arrays. Each `.astro` field is
  `{page?.x || 'hardcoded default'}` — blank Sanity = original render, so the
  pages never break. Stylized gold-italic section TITLES, hero H1, the quizzes,
  video, and JSON-LD stay in code. One published doc per page is pre-filled with
  current copy for editing. Landing-page testimonials are driven by Testimonial
  `service` type: Marriage Intensive → SOM; Trauma OR Individual Intensive → HYT.
- `/save-my-marriage` landing page (Barbara's $15K Marriage Intensive funnel) —
  Barbara's HTML prototype design ported verbatim, scoped under `body.som-page`.
  8-question screening quiz (`MarriageIntensiveQuiz.astro`) with 3 branched
  outcomes (qualified / not-ready / travel-impossible) plus an Individual
  Intensive sub-form. Submit fires a mailto: to `siteSettings.barbaraEmail`
  with all answers pre-filled (TKG isn't in our GHL — matches the existing
  MailtoLink pattern). Existing `/intensives/marriage` page untouched.
  Legacy `/save-our-marriage` 301s to the new slug via `public/_redirects`.
- `/heal-your-trauma` landing page (Barbara's $9,400 Individual Trauma
  Intensive funnel) — launched 2026-05-22. Sapphire+gold+cream / Cormorant
  Garamond palette scoped under `body.hyt-page`. 7-question screener
  (`TraumaIntensiveQuiz.astro`) with branched "fit" / "not-ready" outcomes.
  Mailto: submission pattern same as SOM. Existing `/intensives/individual`
  page untouched. Hero h1 is the question form: "Is Trauma Stealing Everything
  You've Built?" Video (`https://youtu.be/xq--LBt3LX4`) wired through
  `siteSettings.hytVideoUrl`. Investment section includes "Longer Individual
  Intensives for severe trauma are available at an additional cost." note.
  Client-photo strip under Testimonials (4 illustrative photos + "For privacy"
  disclaimer, mirroring the SOM couples strip pattern). Environment grid
  uses 3-up layout from 3 Sanity fallback Daetwyler photos; threshold lowered
  to ≥3 so Barbara's eventual upload of 3 photos in Studio under "HYT —
  Environment Image Grid" will replace the fallbacks.
- `Layout.astro` supports `landing={true}` prop that suppresses the global
  `<Nav>` and `<Footer>` for funnel pages, while keeping SEO/preload/font/JSON-LD
  machinery intact.
- `siteSettings` schema extended with SOM fields (`somVideoUrl`,
  `somHeroBackground`, `somBarbaraPhoto`, `somPrice`) and HYT fields
  (`hytVideoUrl`, `hytHeroBackground`, `hytBarbaraPhoto`, `hytPrice`,
  `hytEnvironmentImages`). Barbara can edit all of these from Studio without
  code changes. Defaults render correctly when fields are blank.
- `testimonial` schema has a "Trauma Intensive" service option. Until Sanity
  has any posts tagged with it, HYT falls back to four generic intensive
  quotes ported verbatim from Barbara's prototype.
- Cormorant Garamond self-hosted to
  `assets.spiritmediapublishing.com/fonts/cormorant-garamond/` per the perf
  gate. Single weight (400) preloaded; rest load via `font-display:swap`.
- SOM "couples thumbnails" strip above "Who This Is For": 4 square photos —
  2 from Sanity + 2 lifestyle couple photos hot-linked from
  `images.unsplash.com` (`img-src` allowlist updated in `public/_headers`).
- **Funnel-domain redirects live (HTTPS-capable)** — `savemymarriage.us` and
  `healyourtrauma.net` (both registered at Name.com under Barbara) now have
  their DNS hosted on our SMP Cloudflare account (registrar stays Name.com
  — only nameservers moved to `alexandra.ns.cloudflare.com` +
  `bart.ns.cloudflare.com`). Each zone has a Redirect Rule that 301s
  every request (apex + www, http + https) to the matching TKG page with
  trailing slash. Universal SSL active. SMP zone standard applied
  (mirage off, 0rtt on, early_hints on; `ai_bots_protection=block`,
  `is_robots_txt_managed=false`). Replaced the previous Name.com URL
  Forwarding setup, which was HTTP-only — that limitation was breaking
  ~30–70% of typed visits because modern browsers default to https://.
  Verified 2026-05-22: all 8 variants (2 domains × apex/www × http/https)
  return 301 → correct TKG page, served by Cloudflare. Zone IDs:
  savemymarriage.us `9de6364029569a7b050d988c2b752f3d`,
  healyourtrauma.net `e18917a90b5af90d1b37065437f7ff7a`.

### Funnel-page videos — LIVE (2026-06-15)
- Both funnel pages were shipping a "Video Coming Soon" placeholder because
  `siteSettings.somVideoUrl` / `hytVideoUrl` were never populated (the video
  facade only renders when the field holds a YouTube URL). Populated both
  fields directly in published Sanity and the Sanity→CF webhook rebuilt prod:
  `/save-my-marriage` → `https://youtu.be/l_mb3yx43I0` (Barbara's existing
  "Christian Marriage Intensive" video, same as `/intensives/marriage`);
  `/heal-your-trauma` → `https://youtu.be/xq--LBt3LX4` (the documented HYT
  video). If Barbara records a dedicated personal-message video for either
  funnel, swap the URL in Studio under "SOM/HYT — Barbara Video URL" + Publish.
- NOTE: never instruct Barbara/Ashley (the client) to fix Sanity content
  themselves — devs do that work. See team-rules "DEVS DELIVER, KEVIN REVIEWS".

### Blocked — pending Barbara
- HYT "Your Environment" image grid — currently displays 3 Sanity fallback
  photos. Barbara can upload her own 3 photos of Daetwyler Plaza (lakeside
  path / pond / bridge) in Studio under "HYT — Environment Image Grid" to
  replace the fallbacks. (Note: previously specced for 4 photos; reduced
  to 3 on 2026-05-22 when one Sanity photo was removed.)

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
