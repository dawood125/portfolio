# Portfolio Project — Agent Handoff

> Give this file to any AI agent to continue work. It contains the owner, goal,
> full build history, current architecture, design system, content, and open TODOs.

## 1. Owner + goal

- **Owner:** Dawood Ahmed — Full Stack Developer (MERN · Next.js · Laravel · Applied GenAI)
- **Location:** Sheikhupura, Pakistan · remote worldwide. Email `dawood.bhatti8812@gmail.com`,
  phone `+92 326 1959755`, GitHub `github.com/dawood125`,
  LinkedIn `linkedin.com/in/dawood-ahmed-8953b63a2`.
- **Background:** 3+ years (freelance since Oct 2023, RISS intern 2023, Sky Waves 2026,
  Techling Jun 2026 → present), 25+ projects, BS IT Punjab 2026,
  NCEAC/HEC Generative AI Top Performer 2026.
- **Goal:** a premium, unique portfolio that beats Instagram-reference portfolios and
  converts **both** full-time recruiters **and** freelance clients.
- **Positioning sentence:** "Full-stack developer shipping live business systems with
  Laravel API range and applied GenAI (MERN/Next.js core)."

## 2. Build history (v1 → v2)

- **v1 — "champagne studio" 3D portfolio** (per `reports/Premium fullstack portfolio blueprint.md`):
  Next.js + React Three Fiber scroll-film with a node-graph diorama, gold-on-charcoal
  editorial system. Built and `npm run build` passed — but the **owner rejected it**:
  UI/UX not premium enough and the background 3D animation looked cheap.
- **References supplied by owner** in `Data/Refrences/` (note the typo, keep the folder name):
  `WhatsApp Image ... .jpeg` (Anti — dark + mint agency portfolio, the main bar),
  5 MP4s (720×1280 screen recordings): Netflix-concept portfolio (viral gimmick —
  explicitly **excluded**), Lohitha light interactive portfolio (periodic-table skills,
  achievements — ideas only, light theme rejected), Aura dark-gold cinematic portfolio,
  Devender light minimal portfolio. Frame extracts were studied; key lesson: refs use
  **zero heavy 3D** — wow comes from spotlight + photography + glass + type + motion.
- **v2 — "reference-beating" rebuild** (per `reports/Reference beating portfolio rebuild.md`,
  CURRENT): 3D deleted entirely; Anti structure fused with Aura cinematic scale;
  clean compositor-only motion. `npm run build` passes. This is what is on disk now.

## 3. Current stack + commands

- Next.js `^15.3.0` · React `^19.1.1` · `lenis@1.2.3` only. **No three/fiber/drei/gsap.**
- `npm run dev` → http://localhost:3000 · `npm run build` · `npm start`
- Last build: `/` 15.2 kB, first load 118 kB (was 53.6/156 kB in v1).
- Config: `next.config.ts` (transpilePackages three is leftover, harmless — remove if tidying),
  `tsconfig.json` (excludes Data/research_notes/reports), `next-env.d.ts`.
- Note: D: drive previously hit 0 bytes free and blocked `npm install`; ~7.5 GB was freed.
  If installs fail with ENOSPC again, free D: space or move the project to C:.

## 4. File map (source of truth)

| Path | Purpose |
|---|---|
| `app/layout.tsx` | Fonts (Anton, Instrument Serif, Space Grotesk, JetBrains Mono), metadata, JSON-LD Person |
| `app/page.tsx` | Renders `PortfolioClient` |
| `app/globals.css` | Entire design system + motion (tokens, aurora, reveals, nav, hero, cards, services, CTA) |
| `components/PortfolioClient.tsx` | All sections (single-page Anti spine) |
| `components/motion.tsx` | `useRevealRoot` (IO reveals) + `CountUp` (eased counters) |
| `components/SmoothScroll.tsx` | Lenis only; skips on `prefers-reduced-motion` and `?reel=1` |
| `components/ReelBar.tsx` | Scripted `?reel=1` tour (top→work→services→contact, 4 s each) for OS screen-record to MP4 |
| `data/projects.ts` | 6 heroes + 3 archive (names, headlines, stacks, links, private flags) |
| `Data/projects.ts` | Stale copy — **ignore**, use `data/projects.ts` |
| `app/sitemap.ts`, `app/robots.ts` | SEO (sitemap, robots, metadataBase `https://dawoodahmed.dev`) |
| `public/portrait-800.webp` (21 KB) + `public/portrait-800.jpg` (37 KB) | Optimized portrait in use |
| `public/Dawood_Ahmed_CV.pdf` | CV download target |
| `Data/` | Raw inputs: CV docx/pdf, `New updated image.jpg` (2.6 MB original), `Refrences/` refs |
| `reports/`, `research_notes/` | Deep-research outputs (two rounds, see §7) |

## 5. Design system (fusion — do not regress)

- Base `#06090B` · surfaces `#0B1114/#0E1519` · ink `#F4F1EA` (17.7:1 AAA) · dim `#9AA4A8`.
- **Mint `#5EEAD4` = interactive ONLY** (links, chips, CTA, focus, active nav).
  **Gold `#E8C47C` = prestige ONLY** (one display word/viewport, eyebrows, hairlines, portrait rim).
  Never swap the roles. Gold gradient `#F9ECBE→#C9A227` for display ≥32 px only.
- Type: Anton 400 uppercase display (`clamp(56px,8.5vw,124px)`, lh 0.92) · Instrument Serif
  italic for the single gold word · Space Grotesk 16–18 px/1.7 body · JetBrains Mono 11–12 px
  uppercase labels. Max 4 families.
- Signature: left-type/right-portrait hero, spotlight + 3-blob aurora (transform-only,
  16–22 s drift), 16 px glass `saturate(140%)`, `white/0.08` hairlines, 6% static grain,
  **one gradient per viewport**. Portrait: navy/charcoal cutout, gold border + mint
  outline-offset, floating "4 live sites" card.
- Motion: IO reveals 0.6–0.8 s `cubic-bezier(0.19,1,0.22,1)`, stagger ≤80 ms steps capped
  400 ms; 26 s marquee (pause on hover); 1.4 s count-ups; translate-only hovers.
  Reduced-motion kills drift/marquee/smoothing; reveals render final state.

## 6. Sections + content (current)

Order: sticky nav → hero (`#top`) → marquee strip → stats → featured work (`#work`:
4 live screenshot-style cards + 2 GenAI code-visual cards) → archive (`#archive`) →
services (`#services`: 4 cards with starting-from bands + 3 engagement rows) →
process (`#process`: 5 steps) → giant CTA (`#contact`) → footer.
Deliberately omitted: testimonial slider (zero permissioned quotes — never fabricate),
blog, rigid 3-tier pricing.

- **6 heroes (fixed order):** Ibrahim Business Manager (Laravel ERP, live
  ibrahim-solution.com) · E-Masjid (Next.js community SaaS, live emasjid.me) ·
  RAG support agent (LangChain/LangGraph, GitHub-only) · Jarvis AI (Node+Groq,
  GitHub-only) · BIKS Trading (live biks.online, **private repo → "demo on call"**) ·
  SugarHills (live sugarhills.in, **private repo → "demo on call"**).
- **3 archive:** LinkedIn automation hub · Employee system · FreelanceHub (all GitHub).
- **Live repos:** `github.com/dawood125/<repo>` for Fertilizer-Inventory, E-Masjid,
  Jarvis, rag-customer-support-agent, linkedin-content-automation-hub,
  employee-management-system, freelancehub. Biks-Car + Sugar-Hills are private.
- Truth rules: no invented metrics/quotes; stats allowed are 25+ projects, 4 live,
  3+ years, NCEAC Top Performer 2026.

## 7. Research archive

- Round 1: `reports/Premium fullstack portfolio blueprint.md` + 5 notes in
  `research_notes/Premium fullstack portfolio blueprint/` (3D trends, brand vibe,
  hiring signals, tech architecture, content mapping). Superseded on 3D/aesthetic —
  still valid for hiring psychology + IA reasoning.
- Round 2 (current authority): `reports/Reference beating portfolio rebuild.md` + 4 notes
  in `research_notes/Reference beating portfolio rebuild/` (fusion-design-system,
  clean-motion-system, section-architecture, content-imagery-plan). On conflicts,
  round 2 wins.

## 8. Open TODOs (highest value first)

1. **Harvest 4 real screenshots** (1440×900, WebP) from the live sites and swap the
   typographic stand-ins — hooks are `data-shot={slug}` + `.work-visual` in
   `components/PortfolioClient.tsx` (`WorkVisual`). Sites are JS-rendered, so capture
   manually (owner offered project images/video).
2. **Confirm starting-from prices** in `SERVICES` (currently $500/$400/$300/$120-mo
   placeholders) and engagement rows with the owner.
3. **Compress/verify portrait** — done (21 KB webp in use); delete `public/portrait-800.jpg`
   if unused, keep webp.
4. **Deploy to Vercel**, set custom domain, phone-test every demo link + CV download.
5. **Reel:** open `?reel=1`, OS screen-record the 16 s tour, post to Instagram.
6. Optional: testimonial request script + LinkedIn recommendations; `/blog` v2 later.

## 9. Working agreements for the next agent

- Keep the mint/gold role discipline and the no-3D decision unless the owner asks.
- Keep everything truthful (no fake numbers, quotes, or client logos — Techling +
  NCEAC strip only).
- Verify with `npm run build` after changes; keep first-load JS near 118 kB.
- Ask the owner before adding sections (testimonials/blog/pricing tables) or deps.
