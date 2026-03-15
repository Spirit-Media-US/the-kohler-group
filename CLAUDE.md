# The Kohler Group

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: The Kohler Group | Repo: github.com/Spirit-Media-US/the-kohler-group | Domain: thekohlergroup.net | Sanity ID: 2bom5gqg | R2 bucket: n/a

## Dev Commands

- `npm run dev` — local preview at localhost:4321
- `npm run build` — production build to dist/

## Rules

- All work goes to the **dev** branch — never push directly to main
- Only merge dev to main when Kevin says "push to main"
- Never push without local preview first
- **Regression check:** When fixing something, verify the fix doesn't break the same element at other breakpoints or in other contexts. Test both mobile AND desktop viewports before considering a visual change done. Use responsive Tailwind classes (e.g., `bg-center lg:bg-left-top`) rather than replacing one value with another when the original value was correct at certain screen sizes.
- **Before pushing:** Run a full `git diff` against the last known-good commit and review every hunk — not just the files you intended to change. Verify no content (embeds, links, markup) was accidentally removed or altered. If rewriting a section, preserve all existing elements (iframes, videos, images) unless explicitly asked to change them.
- **Never rewrite surrounding code:** When editing a specific line or section, do not touch adjacent code unless it's part of the requested change. Copy-paste the original structure and only modify the targeted elements.
