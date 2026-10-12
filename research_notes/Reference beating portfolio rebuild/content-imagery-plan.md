# Reference-Beating Content and Imagery Plan

## 1. Hero Copy: Name, Role Line, Positioning, Dual CTAs, Availability Badge

### Takeaway
Truthful hero is: Dawood Ahmed — Full-Stack Developer (MERN / Next.js / Laravel + GenAI) — one-sentence positioning naming MERN + Next.js core, Laravel range, GenAI edge; dual CTAs View Work + Download CV; availability badge must beat generic "Available" with specificity (location + stack + next opening) and use live pulse-dot pattern.

### Cited Findings
- Centered card hero pattern uses gradient avatar/initials, open-to-work badge pill below avatar, name, role/title line, 2–3 sentence bio, skill tags, stats row, dual CTAs (View my work primary + Download CV secondary), social icons — [Source](https://webdevpuneet.com/ui-snippets/portfolio-hero/)
- Pulsing status dot uses `box-shadow: 0 0 0 3px rgba(34,197,94,0.2)` + `blink` keyframe animating opacity 1 to 0.4 looping, positioned top-right of card to signal live availability; badge `✦ Open to work` provides second signal at different visual weight — [Source](https://webdevpuneet.com/ui-snippets/portfolio-hero/)
- If not available, remove badge and change dot to amber `#f59e0b` (busy/selective) or red `#ef4444` (booked); update blink values to match — [Source](https://webdevpuneet.com/ui-snippets/portfolio-hero/)
- Personal portfolio hero block pattern: live "available for work" badge with ping dot (`animate-ping` + solid dot), serif headline with tinted emphasis span, sub-line, three-stat row with hairline dividers, dual rounded CTAs, tooltip-backed core-stack icon row framed by gradient rules — [Source](https://hirael.com/blocks/hero/hero-06)
- Conversion-first freelance hero leads with single confident line + two-line bio naming person and terms (fixed scope, clear deliverables), primary `Start a project` + secondary ghost `See the work first`; four-figure trust strip at base of fold (e.g. projects shipped, repeat clients, avg engagement, next opening) — [Source](https://www.shadcn-ui-blocks.com/blocks/portfolio-pro/hero-sections/cta-focused-hero)
- Four-signal strip only works when numbers are real; placeholder repeat-client rate reads as invented, fill from actual history — [Source](https://www.shadcn-ui-blocks.com/blocks/portfolio-pro/hero-sections/cta-focused-hero)
- Live-site fetches confirm only page titles (JS-rendered apps return minimal markdown): `Ibrahim Business Manager` — [Source](https://ibrahim-solution.com/); `E-Masjid System - Mosque Management Platform` — [Source](https://emasjid.me/); `BIKS Trading Company — Premium Japanese Vehicle Export` — [Source](https://biks.online/); SugarHills full markdown confirms Wayanad/Kerala luxury resort, cottages, infinity pool, booking via BookingJini — [Source](https://sugarhills.in/)

### Inferences
- Proposed truthful hero copy blocks (drafts, not claims — all fields verifiable from assignment constraints + local `Data/projects.ts`):
  - Eyebrow badge options beating "Available": (a) `● Available for Q4 2026 — MERN / Laravel / GenAI` (b) `✦ Open to work — Lahore / Remote Worldwide` (c) `Available now — 2 yrs freelance · 4 live client sites`. Recommend (a) + pulse dot; include `Lahore, Pakistan · Remote` + `dawood.bhatti8812@gmail.com` link nearby, not inside badge.
  - H1: `Dawood Ahmed` (no alias, matches CV + email).
  - Role line: `Full-Stack Developer — MERN · Next.js · Laravel · GenAI`.
  - One-sentence positioning: `I build production MERN and Next.js apps with Laravel range for ERP-style back offices, and ship GenAI features with LangChain, LangGraph and RAG.`
  - Sub-proof (no invented metrics): `BS IT, University of the Punjab (2026) · Techling, Sky Waves, RISS · Freelance since Oct 2023 · 4 live client deployments.`
  - Dual CTAs: Primary `View work →` anchors to `#work`; Secondary `Download CV` links to `/Dawood_Ahmed_CV.pdf` with `download` attr. Social row: GitHub, LinkedIn, email `mailto:` only — no invented X/Dribbble.
  - Stats row must avoid fabricated counts: use `9 Projects documented / 4 Live sites / 3 Employers + freelance since 2023` — all countable from `Data/projects.ts` + constraints.
- Anti-style image-led tweak: left copy + right spotlight portrait cutout (see §3), badge overlapping cutout base, stack chips under CTAs (Next.js, React, TypeScript, Laravel 11, Node.js, MongoDB, LangChain).

### Gaps
- No reliable source found for Dawood's exact current availability date or rate; do not render "next opening Oct 2026" unless user confirms — placeholder would violate truthfulness rule noted in [Source](https://www.shadcn-ui-blocks.com/blocks/portfolio-pro/hero-sections/cta-focused-hero).
- GitHub READMEs of 9 repos not fetched (tool budget); stack chips below taken from local `Data/projects.ts` only, need verification against READMEs before final ship.
- CV PDF (`Data/Dawood_Ahmed_CV.pdf`) not parsed in this pass; role line and employer list taken from assignment constraints only.

## 2. Six Heroes: Truthful Headline, Description, Stack Chips, Live/GitHub/Private Treatment, Screenshot Harvest Plan (1440×900)

### Takeaway
Order 6 heroes as in `Data/projects.ts`; 4 have live URLs, 2 are GitHub-only, 2 live entries are marked `private:true` and need arch-plus-demo treatment (live link + "Private source" badge, no GitHub button). Harvest hero-viewport screenshots at 1440×900 WebP for all 4 live sites; GitHub-only heroes use code/README or terminal cards, not fake browser chrome.

### Cited Findings
- Portfolio screenshot automation defaults: desktop viewport `{ width: 1440, height: 900 }`, `waitUntil: networkidle`, output to `public/screenshots` as WebP @ quality 90, `fullPage` or viewport modes, Playwright real-Chromium rendering — [Source](https://github.com/djsy01/portfolio-shot)
- Screenshot format test (5 public pages, q80): WebP 41.1 KiB vs AVIF 46.4 KiB vs JPEG 102.7 KiB vs PNG 297.6 KiB on homepage sample; on text-heavy MDN capture JPEG (167.8 KiB) exceeded PNG (119.4 KiB); WebP/AVIF are delivery candidates, PNG is precise master — [Source](https://allscreenshots.com/blog/png-jpeg-webp-avif-jpeg-xl-screenshots)
- Quality 80 is not shared visual standard (AVIF SSIMULACRA 89.6 vs WebP 76.9 in test); thumbnails need "right website" recognition, support articles need glyph legibility — different quality bars — [Source](https://allscreenshots.com/blog/png-jpeg-webp-avif-jpeg-xl-screenshots)
- Keep lossless PNG master, generate WebP/AVIF derivatives per destination; for attachments needing wide compatibility JPEG/PNG may still be justified — [Source](https://allscreenshots.com/blog/png-jpeg-webp-avif-jpeg-xl-screenshots)
- Live titles confirm positioning: Ibrahim = business manager; E-Masjid = mosque management; BIKS = Japanese vehicle export; SugarHills = Wayanad cottages/infinity pool/BookingJini booking — [Source](https://ibrahim-solution.com/); [Source](https://emasjid.me/); [Source](https://biks.online/); [Source](https://sugarhills.in/)

### Inferences
- Ordered 6 with truthful copy (headlines/descriptions paraphrased from local `Data/projects.ts` — no outcomes invented):
  1. **Ibrahim Business Manager (Fertilizer Inventory)** — Headline: `ERP-style inventory that runs a real fertilizer business`. 2-sentence: `Laravel 11 API with React + TypeScript dashboard covering products, orders and stock alerts with event-driven design. Deployed for a live client at ibrahim-solution.com.` Chips: `Laravel 11, React, TypeScript, MySQL, Tailwind, Recharts`. Treatment: `Live` + `GitHub` buttons (both public per local data). Harvest: `1440×900` hero viewport of login/dashboard hero (await auth wall; if login-gated capture public landing + blur sensitive rows).
  2. **E-Masjid** — Headline: `Community SaaS connecting hearts through faith`. 2-sentence: `Mosque services platform for prayer times, events, donations and fund requests. Public Next.js build serving community.` Chips: `Next.js, React, Node.js, MongoDB`. Treatment: `Live` + `GitHub`. Harvest: `1440×900` hero with prayer-times/events section visible.
  3. **RAG Customer Support Agent** — Headline: `Retrieval agent that answers from your own docs`. 2-sentence: `LangChain + LangGraph pipeline with vector embeddings and evals over private docs. GitHub-only demo; no live URL claimed.` Chips: `LangChain, LangGraph, RAG, Vector DB, Groq`. Treatment: `GitHub only` + `Case study` card (terminal/RAG-flow diagram, no fake live button).
  4. **Jarvis AI Assistant** — Headline: `Desktop AI that controls Windows by voice`. 2-sentence: `Lightweight Node.js assistant that opens files, apps and tasks via natural language. Uses Groq LLM for fast responses; GitHub-only.` Chips: `Node.js, Groq API, Windows Automation`. Treatment: `GitHub only` + CLI transcript visual.
  5. **BIKS Trading Company** — Headline: `Heavy-machinery marketplace that sells excavators`. 2-sentence: `Client delivery at biks.online for browsing collections, vehicle detail and multilingual message + sell flow. Source is private; live link only.` Chips: `React, Next.js, Node.js, MongoDB`. Treatment: `Live` + `Private source 🔒` badge (no GitHub button despite local URL — per `private:true`).
  6. **SugarHills Resort** — Headline: `Luxury resort booking above the clouds`. 2-sentence: `Paid international client in Kerala, India — React + TypeScript + Tailwind resort site with admin panel for content. Live at sugarhills.in; source private.` Chips: `React, TypeScript, Node.js, Express, MongoDB, JWT`. Treatment: `Live` + `Private source 🔒`. Harvest: `1440×900` hero `Wake up above the clouds` with infinity-pool image + cottages row (`Mist A-Frame ₹10,500`, `Cloud pool A-Frame ₹14,500`) visible — prices from [Source](https://sugarhills.in/) are resort's, not Dawood's outcome, do not present as his pricing win.
- Card pattern per hero: screenshot (16/10, `next/image`), headline, 2-sentence desc, chips (max 6), link row conditional: Live→external icon, GitHub→icon, Private→`Private repo — demo on request` pill. No stars/forks counts unless fetched live.
- Harvest spec: Playwright/Chromium `1440×900`, `networkidle`, capture viewport (not fullPage) for card consistency; keep PNG master, ship WebP q85–90 + AVIF fallback via `next/image` (see §3/§5). Filename: `public/shots/<slug>-1440x900.webp`.

### Gaps
- Three live fetches returned title-only (JS auth/client render) — [Source](https://ibrahim-solution.com/); [Source](https://emasjid.me/); [Source](https://biks.online/) — actual hero layout/colors unknown; user must manually capture per §5.
- GitHub READMEs not fetched; evals/coverage claims for RAG agent unverified — do not render eval scores or accuracy % in cards.
- BIKS/SugarHills `private:true` vs GitHub URLs in local data conflict; assume private wins (no public code button) pending user confirmation.

## 3. Portrait: Navy-Blazer Charcoal Photo as Spotlight Cutout (2.7 MB → ~200 KB)

### Takeaway
Present `public/portrait.jpg` / `Data/New updated image.jpg` (navy blazer, charcoal backdrop) as Anti-style spotlight cutout: remove/replace background with radial spotlight, soft mask + inner edge light, badge overlay at base; compress 2.7 MB source to ~200 KB via resize + WebP/AVIF + `next/image`.

### Cited Findings
- `next/image` requires `width`+`height` (or `fill` in relative parent + `objectFit: cover`), supports `quality` (default 75, allowlist via `qualities`), `sizes` for responsive `srcset`, `placeholder="blur"` + `blurDataURL` (auto for static imports), `priority` deprecated in v16 for `preload`, `formats: ['image/avif','image/webp']` with AVIF ~20% smaller than WebP but ~50% longer encode — [Source](https://nextjs.org/docs/app/api-reference/components/image)
- AVIF typically ~50% smaller than JPEG and ~20% smaller than WebP at similar quality; WebP broader fallback for older browsers — [Source](https://takeasnapshot.com/screenshot-to-avif) (page content via search highlight; direct fetch not performed — treat compression ratios as indicative, not guaranteed).
- Screenshot/image delivery guidance: keep lossless master, test WebP and AVIF at displayed dimensions, compare bytes at fixed visual bar — [Source](https://allscreenshots.com/blog/png-jpeg-webp-avif-jpeg-xl-screenshots)
- Hero avatar pattern supports swapping gradient initials for real `img` with `object-fit: cover` without layout change — [Source](https://webdevpuneet.com/ui-snippets/portfolio-hero/)

### Inferences
- Treatment spec (no new photo shoot needed):
  - Source: use highest-res `Data/New updated image.jpg` (2.7 MB per assignment) as master; keep untouched in `assets/masters/`.
  - Cutout: background removal (remove.bg / Photoshop Select Subject) → transparent PNG → place on CSS radial spotlight (`radial-gradient(circle at 50% 35%, #2b3445, #0b0e14 70%)`) + film-grain overlay + 1px `rgba(255,255,255,0.14)` ring; soft mask `mask-image: radial-gradient(120% 120% at 50% 20%, black 62%, transparent 98%)` to feather shoulders.
  - Edge light: `drop-shadow(0 0 24px rgba(120,160,255,0.35))` + left rim `inset` highlight to lift navy blazer from charcoal; avoid pure-black bg (loses blazer lapels).
  - Badge overlay: availability pill + `Lahore · Remote` chip overlapping cutout base (Anti-style), plus tiny `BS IT '26` credential chip — all verifiable, no invented award.
  - Compression to ~200 KB: export cutout at 900×1200 max, Squoosh/Sharp WebP q78–82 + AVIF q62–68; expect 140–220 KB; ship via `next/image` as `<Image src="/portrait-cutout.webp" width={720} height={900} sizes="(max-width:768px) 70vw, 360px" placeholder="blur" />` with `formats:['image/avif','image/webp']` in `next.config.js`; `preload` hero portrait (LCP). Keep `portrait.jpg` original out of bundle.
  - Fallback: if cutout edges look crunchy, use non-cut rounded-blob (`border-radius: 32% 68% ...`) with same spotlight — less masking risk.
- Alt text: `Portrait of Dawood Ahmed, Full-Stack Developer` (descriptive per image a11y guidance in [Source](https://nextjs.org/docs/app/api-reference/components/image)).

### Gaps
- Source dimensions/format unverified (assumed JPEG ~2.7 MB); actual pixel size and EXIF orientation unknown — user must confirm before batch export.
- No automated background-removal verified in this pass; edge quality on navy-on-charcoal needs human QA at 200% zoom.
- AVIF encode cost vs Vercel build noted in [Source](https://nextjs.org/docs/app/api-reference/components/image) — pre-generate AVIF at build, do not rely on on-demand for hero LCP.

## 4. Archive Builds (3) + Skills Presentation (Lohitha Interactive Groups vs Anti Service Cards)

### Takeaway
Archive one-liners stay strictly to local `Data/projects.ts` stacks with no outcomes; skills should be Anti-style service cards (3–4 outcome-framed services) with Lohitha-style interactivity (hover/tabs) layered on top — cards win for image-led Anti reference, groups win for keyword scanning.

### Cited Findings
- Conversion hero guidance stresses real numbers over invented trust signals — applies equally to archive + services — [Source](https://www.shadcn-ui-blocks.com/blocks/portfolio-pro/hero-sections/cta-focused-hero)
- Hero stack-icon row pattern (tooltip-backed icons framed by gradient rules, Core stack label) shows how to present skills compactly under hero — [Source](https://hirael.com/blocks/hero/hero-06)
- Tag/chip row pattern for skills under bio (`React, Next.js, TypeScript, Node.js...`) — [Source](https://webdevpuneet.com/ui-snippets/portfolio-hero/)

### Inferences
- Archive copy (one line + stack, GitHub-only, no live buttons):
  - `LinkedIn Content Automation Hub — n8n workflow: MongoDB → AI post → WhatsApp approval → LinkedIn.` Chips: `n8n, MongoDB, AI Agent, WhatsApp API, LinkedIn API`.
  - `Employee Management System — MERN + RBAC task management with JWT.` Chips: `React, Node.js, Express, MongoDB, JWT`.
  - `FreelanceHub — Fiverr-style marketplace with chat + Stripe + CI/CD.` Chips: `React, Node.js, Express, MongoDB, Stripe, AWS EC2`. Append `Production-ready` only if README proves CI/CD + Stripe live — currently per local description only, flag for verification.
  - Archive layout: compact 3-col list rows with `GitHub →` link, no screenshots (or 800×450 thumbs if user captures README demos); label `Archived / Demo on request`.
- Skills/services recommendation (Anti-beating, truthful to CV):
  - Option A (Anti service cards — recommended for this brief): 3 cards: (1) `MERN + Next.js Apps — React, Next.js, Node, Express, MongoDB, JWT` (2) `Laravel Back Offices — Laravel 11 APIs, MySQL, Recharts dashboards` (3) `GenAI Features — LangChain, LangGraph, RAG, Groq, n8n automation`. Each card: icon, 1-line scope, chip row, proof link (`See: SugarHills / Ibrahim / RAG agent`). No hourly rate or years-per-stack claims.
  - Option B (Lohitha interactive groups): tabbed `Frontend / Backend / AI & Automation / Tools` with hover glow + proficiency dots. Better for ATS keyword scan but weaker image-led Anti feel; use as second section below service cards or as filter for archive.
  - Hybrid (best): Anti cards on homepage + interactive group filter on `/skills` or archive header. Do not render percentage bars (e.g. "React 95%") — unverifiable and beaten by Anti minimalism.
- Services proof mapping: MERN→SugarHills/BIKS/E-masjid live links; Laravel→Ibrahim live link; GenAI→RAG/Jarvis/LinkedIn GitHub links.

### Gaps
- No source confirming Stripe/AWS EC2 live deployment for FreelanceHub or n8n production run for LinkedIn hub — one-liners must stay capability-framed, not outcome-framed, until READMEs checked.
- Lohitha reference videos/images in `Data/Refrences/` not viewable in this pass; interaction detail (tabs vs hover) inferred from brief label only.
- No verified testimonials, client counts, or repeat-rate to attach to service cards — leave slots empty rather than invent.

## 5. Missing Assets Shot-List: Screenshots, Dimensions/Formats, Testimonial Script, Logo Permissions

### Takeaway
User must manually capture 4 live hero viewports (JS-rendered, fetch failed) at 1440×900 + portrait cutout derivatives + 3 optional archive thumbs; ship WebP (AVIF fallback) via `next/image`; testimonials/logos require explicit written permission — no logos, quotes, or Google-review names on portfolio without consent.

### Cited Findings
- Default capture spec: desktop `1440×900`, `networkidle`, WebP q90 to `public/screenshots`, `home.webp`-style naming; add `devices`/`colorSchemes` suffixes only when multi-variant — [Source](https://github.com/djsy01/portfolio-shot)
- Keep PNG master + WebP/AVIF derivatives; WebP/AVIF current-browser support, JPEG/PNG fallback for unfamiliar software; JPEG XL needs fallback (Safari 17+, Chromium/Firefox plans as of Sept 2026) — [Source](https://allscreenshots.com/blog/png-jpeg-webp-avif-jpeg-xl-screenshots)
- `next/image` remote optimization requires `remotePatterns` allowlist, `qualities` allowlist (default `[75]`), `deviceSizes`/`imageSizes` for `srcset`; `minimumCacheTTL` default 4h — [Source](https://nextjs.org/docs/app/api-reference/components/image)
- SugarHills cottages/pricing/reviews content is resort marketing (e.g. cottages, ₹ prices, Google 4.8 quotes from Priya/Kiran/Anjali) — [Source](https://sugarhills.in/) — must not be presented as Dawood testimonials or outcomes.

### Inferences
- Concrete checklist (sizes = delivered web assets, not masters):
  - `shots/ibrahim-hero-1440x900.webp` (≤180 KB, q85) — hero viewport, hide PII; fallback PNG master `ibrahim-hero-2880x1800.png`.
  - `shots/emasjid-hero-1440x900.webp` — prayer-times hero; mobile alt `emasjid-hero-390x844.webp` (≤120 KB).
  - `shots/biks-hero-1440x900.webp` — collection/vehicle-detail hero; note multilingual UI visible.
  - `shots/sugarhills-hero-1440x900.webp` — `Wake up above the clouds` + pool image; crop to exclude BookingJini iframe chrome.
  - `portrait-cutout-720x900.webp` (≤200 KB target) + `portrait-cutout-720x900.avif` + `portrait-fallback-480x600.jpg`; `blur-placeholder.txt` (10px base64) for `blurDataURL`.
  - Optional: `shots/archive-<slug>-800x450.webp` (≤90 KB each) for 3 archive builds if README demo exists; else omit image, keep text row.
  - `og/og-cover-1200x630.jpg` (≤150 KB) for link previews; `favicons` via existing pipeline.
  - Config: `next.config.js images: { formats:['image/avif','image/webp'], qualities:[65,75,85,90], remotePatterns: [] }` — screenshots are local, no remote allowlist needed; `sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"` for cards per [Source](https://nextjs.org/docs/app/api-reference/components/image).
  - Capture steps: Chromium incognito `1440×900`, `networkidle`, hide extensions, scroll to top, screenshot viewport (not fullPage for cards), export PNG → Squoosh WebP q85 → check glyph legibility at card width (~640px) before accepting smaller bytes.
- Testimonial request script (copy-paste, permission-first):
  > `Subject: Quick testimonial + logo permission for my portfolio? Hi [Name] — Thanks for trusting me with [project + live URL]. Could I add a 1–2 sentence quote from you on my portfolio, alongside [Company]’s name/logo? Suggested prompt: What did I build, and what was it like working together? I’ll show your name, role and company exactly as you write them, and remove it anytime you ask. No worries if you’d rather not — thanks either way! — Dawood (dawood.bhatti8812@gmail.com)`
  - Do not copy SugarHills Google reviews ([Source](https://sugarhills.in/)) as testimonials; separate resort guests ≠ Dawood clients.
- Logo permissions: written email/WhatsApp consent required per logo; use grayscale wordmark at ≤120×40px, link to live site, add `Logo used with permission` caption; remove within 48h on request; no Techling/Sky Waves/RISS logos without employer consent (employment ≠ endorsement).

### Gaps
- No reliable template/logo-norm source fetched (search rate-limited); script above is inferred best practice, not cited — needs legal review before publishing employer logos.
- Actual Ibrahim/E-Masjid/BIKS hero layouts unknown due to JS-only fetches; dimensions assume standard desktop hero — adjust after manual capture.
- CV PDF download path (`/Dawood_Ahmed_CV.pdf`) exists in `public/` per directory listing but version freshness unconfirmed; re-export before linking Download CV.
