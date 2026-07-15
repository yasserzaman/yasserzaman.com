# Changelog

Revision log for yasserzaman.com. Newest entries on top. Format loosely follows [Keep a Changelog](https://keepachangelog.com).

---

## 2026-07-15 — Baseline audit + performance/hygiene pass

### Context
First full review of the codebase by Claude (principal-dev pass). Site is a React 19 + Vite 6 + TypeScript + Tailwind v4 single-page portfolio, originally scaffolded in Google AI Studio, then hand-evolved across 4 commits. Deployed to yasserzaman.com.

### Fixed
- **Hero portrait was 7.7MB** (`yasser_hero_portrait.jpg`, 4000×3000, unresized since initial commit). Resized to 1050×1400 and recompressed → **195KB** (97.5% reduction). This was the single biggest performance liability on the site (loaded above the fold, blocking LCP).
- Recompressed `the_ceoShot.jpg` (380KB → 285KB) and `yasser_journey_portrait.jpg` (459KB → 287KB), both resized to a sane max of 1200px on the long edge.
- Converted `yasser_thobe_portrait.png` → `.jpg` (282KB → 40KB); PNG was the wrong format for a photograph. Updated the import in `App.tsx` accordingly.
- Total image payload: **~8.8MB → ~807KB** (91% reduction).

### Added
- Full SEO/social metadata in `index.html`: meta description, canonical URL, robots directive, Open Graph tags, Twitter card tags, theme-color.
- `public/og-image.jpg` — 1200×630 social share card (generated from the hero portrait as a placeholder; a purpose-designed card would be a nice future upgrade).
- `public/robots.txt` and `public/sitemap.xml`.
- This changelog.

### Removed
- Dead dependencies never used in source: `@google/genai`, `express`, `dotenv`, `tsx`, `@types/express` (leftovers from the original AI Studio Gemini-backend scaffold — no server, no API routes, no genai calls exist anywhere in `src`). 122 packages pruned from `node_modules`.
- Debug scripts left over from an earlier agent session: `check_env.js`, `find_backups.js`.
- Unused image assets never imported anywhere: `myz_sovereign_glyph_1781974322807.jpg`, `myz_vector_logo_1781975065491.jpg`. **Note:** these read as candidate logo/glyph explorations (possibly AI-generated) and are still recoverable from git history (commit `508dee4`) if you want to revisit them for a proper brand mark later — flagging in case deletion was premature.
- Simplified the `clean` npm script (`rm -rf dist server.js` → `rm -rf dist`; `server.js` never existed in this repo).

### Verified
- `tsc --noEmit` clean.
- `vite build` succeeds; `dist/` output confirmed correct (hashed assets, `public/` files copied to output root).

### Known issues / not yet fixed
- **Contact form doesn't send anywhere.** `Contact.tsx` simulates a submit with `setTimeout` and writes to `localStorage` only — no message actually reaches Yasser. Needs a real submission path (decision pending — see action plan).
- JS bundle is 527KB (172KB gzipped) — Vite's build warns on chunk size. Not urgent; would need route-level/library code-splitting (e.g. lazy-loading GSAP/motion) to address. Parked for later.

---
