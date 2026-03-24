# The Kohler Group

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: The Kohler Group | Repo: github.com/Spirit-Media-US/the-kohler-group | Domain: thekohlergroup.net | Sanity ID: 2bom5gqg | R2 bucket: n/a

## Dev Commands

- `npm run dev` — local preview at localhost:4325
- `npm run build` — production build to dist/

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
