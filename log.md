# Changelog

Revision log for yasserzaman.com. Newest entries on top. Format loosely follows [Keep a Changelog](https://keepachangelog.com).

---

## 2026-07-15 — Copy fix: Agentic Sales Report token-cost claim

### Fixed
- Corrected a factual mix-up in the "proves" copy for the Agentic Sales Report project. The 10,000–15,000 GPT-5.5 token figure is what it cost to **build** the agent (per Yasser), not the per-report runtime cost — per-report cost actually scales with input size. Rewrote to state that distinction plainly, tightened the wording, and added the Phase 2 roadmap (near-zero spend + a UI interaction layer, replacing the current Codex-CLI-only workflow).

### Verified
- `tsc --noEmit` clean, `vite build` succeeds.

---
## 2026-07-15 — New flagship project + contact form wired up

### Added
- **New project: "Agentic Sales Report"** — added to `Work.tsx` as the lead entry in the core group (ahead of Defect Tracker), researched from github.com/yassarminhaj/agentic-sales-report and the LinkedIn launch post. Codex-orchestrated agent that reconciles AL-Taj's invoices into a finished sales report; ~10-15K tokens/report, 3 markdown routing files, open-sourced.
  - All `REF_` codes across every project renumbered sequentially (REF_01 -> REF_10) to keep the blueprint IDs consistent.
  - Added to the Work_Better pillar's bullet list.
  - Hero.tsx footer strip ("Proof_Projects") now reads "Agentic Sales Report // Defect Tracker".
- **Contact form now actually sends.** Replaced the fake `setTimeout` + `localStorage` submit in `Contact.tsx` with a real POST to Formspree (`VITE_FORMSPREE_FORM_ID` env var — see `.env.example`). Added a distinct "not configured yet" state so the form fails visibly instead of pretending to succeed if the env var is missing.
- `ImportMetaEnv` typing for `VITE_FORMSPREE_FORM_ID` in `vite-env.d.ts`.

### Removed
- Stale `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` flag from `metadata.json` and the old `GEMINI_API_KEY`/`APP_URL` vars from `.env.example` — leftovers from the AI Studio Gemini scaffold, consistent with the dead `@google/genai` dependency removed earlier today.

### Verified
- `tsc --noEmit` clean, `vite build` succeeds.

### Action required from Yasser
- **Contact form is wired but not live yet.** Create a free form at formspree.io, then set `VITE_FORMSPREE_FORM_ID` as an environment variable in Vercel (Project Settings -> Environment Variables) and redeploy. Until then, submitting the form shows an honest "not configured" message instead of a fake success.
- Changes in this session are committed locally but **not pushed** — review `git log` / `git diff` before pushing to `main`, since Vercel will likely auto-deploy on push.

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
- **New flagship project queued**: adding "Agentic Sales Report" (github.com/yassarminhaj/agentic-sales-report) to Work.tsx as the lead project, ahead of Defect Tracker. Plan drafted and sent for approval; not yet implemented.

---
