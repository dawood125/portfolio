# Content Strategy Mapping Dawood Ahmed Projects to Portfolio Narrative

## Given 9 projects (Fertilizer Inventory ibrahim-solution.com, E-Masjid emasjid.me, Biks-Car biks.online, Sugar-Hills sugarhills.in, Jarvis AI, RAG support agent, LinkedIn automation hub, Employee system, FreelanceHub), which 6 should lead and why? How to handle private repos?

### Takeaway
Lead with 4 live-link production builds + 2 GenAI differentiators (Jarvis AI + RAG support agent) in a fixed 6-project order; relegate LinkedIn automation, Employee system and FreelanceHub to a secondary "More builds" grid, and handle private repos with architecture case-studies + anonymized descriptors + demo video instead of code links.

### Cited Findings
- Curate 3–4 deeply implemented projects instead of flooding evaluators with dozens of unfinished repos; depth over breadth ensures hiring leads spend limited review time on best work — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Showcase 3–4 high-quality fully documented projects rather than many small scripts; leaders prefer deep execution + test coverage + architecture docs + live demos — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- 3–6 strong case studies for most niches; quality over quantity, add more only if each adds distinct capability proof — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- 3–5 curated projects relevant to target clients, each as case study showing problem, process, solution, measurable results — [Source](https://www.clientgrowthengine.com/blog/freelance-portfolio-gets-clients)
- Five curated case studies outperform 20 gallery samples, converting at 8–12% vs 2–4% for unfocused ones — [Source](https://www.clientgrowthengine.com/blog/freelance-portfolio-gets-clients)
- Ideal portfolio format is 3 to 5 high-quality projects, each with problem, solution, measurable results; 78% of hiring managers say well-structured portfolio is single most important factor evaluating freelancers — [Source](https://richharrington.dev/article/developer-portfolio-brings-clients-to-your-door)
- Shipped products with real usage are strongest hiring signal outside day job; proves product instinct, completion discipline, user feedback loops — [Source](https://wrok-web.fly.dev/blog/engineering-portfolio-guide-2026)
- Link live deployments directly alongside repo links; pair code with execution so managers verify UI polish and source structure simultaneously — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- All client code is private (NDA); this repo contains architecture case studies for each project — portfolio pattern showing domain + stack table without code (e.g., Medicare System | Healthcare | Laravel · React · Flutter) — [Source](https://github.com/msajid-dev/portfolio)
- Clients are anonymised where required by NDA; case studies state real problem + honest approach + quantified outcomes with anonymized client — [Source](https://haritha.work/case-studies)
- If client declines logo/use permission, use anonymised descriptor: "Series A SaaS, 30-person team, B2B payments infrastructure" — nearly as effective because it grounds work in real context — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Separate job portfolio (skills, stack breadth, contribution volume) from freelance portfolio (case studies, business outcomes, trust signals); framing and emphasis should differ even if evidence overlaps — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Match portfolio to target role; generic fullstack demos say "I can build things," targeted domain projects say "I'm already thinking about problems you hire for" — [Source](https://wrok-web.fly.dev/blog/engineering-portfolio-guide-2026)

### Inferences
- Recommended 6-project lead order for Dawood Ahmed (truthful to CV, no invented metrics):
  1. Fertilizer Inventory (ibrahim-solution.com) — HERO 1: only inventory/ERP-style system with roles/stock/billing implied; proves full-stack ownership + business operations; live link = instant verification.
  2. E-Masjid (emasjid.me) — HERO 2: community SaaS (prayer times, events, donations/content); proves Next.js/MERN public-facing product with real users; contrasts with B2B inventory.
  3. RAG Support Agent — HERO 3 (GenAI differentiator): proves LangChain/vector retrieval grounded answers; positions 2026 AI relevance; GitHub-only is acceptable because AI hires expect repo + demo video over live SaaS link.
  4. Jarvis AI Assistant — HERO 4 (GenAI breadth): voice/text assistant, tool-use/prompts; pairs with #3 to show not one-off AI experiment but repeatable GenAI capability.
  5. Biks-Car (biks.online) — HERO 5: automotive marketplace/booking; proves client freelance delivery + SEO/marketing site performance.
  6. Sugar-Hills (sugarhills.in) — HERO 6: second live client site (hospitality/real-estate); proves repeatability of shipping live client work since Oct 2023 freelance.
- Demote to secondary row ("More builds / GitHub-only"): LinkedIn Automation Hub (shows automation/n8n/API orchestration), Employee Management System (shows CRUD/auth/RBAC admin patterns), FreelanceHub (shows marketplace concept but overlaps with client positioning — keep as code-only proof, not hero).
- Why this 6: covers all four hiring signals in one scroll — live business systems (1,2,5,6) + AI systems (3,4); covers MERN + Next.js + Laravel story without scattering (see positioning section); avoids 9-thumbnail dilution.
- Private-repo handling: for any private/client-owned code, do NOT show "Private repo — request access" dead-end. Use pattern: labeled badge "Private client code — architecture walkthrough below" + stack tags + architecture diagram + 60–90s Loom + bullet role/contribution + anonymized domain descriptor if NDA. This mirrors verified NDA-portfolio pattern above.
- Dual-audience routing: recruiters get /work grid sorted by stack filter (MERN / Next.js / Laravel / GenAI) + GitHub + README quality; clients get /case-studies route with business-outcome headlines + testimonials + CTA per case. Same 6 projects, different headline framing.

### Gaps
- No reliable source found confirming exact live stacks of ibrahim-solution.com, emasjid.me, biks.online, sugarhills.in (inference only from URLs/names); stack inference requires direct site fetch or Dawood confirmation — do not assert Laravel vs MERN per site without verification.
- No source quantifies conversion lift specifically for private-repo vs public-repo portfolios; guidance is pattern-based, not A/B tested.

## What case-study template converts: problem, role, stack, architecture, 2-3 quantified outcomes, links? What to write when metrics are missing?

### Takeaway
Use an 8-beat template (outcome headline → context → role → stack → architecture/process → visuals → outcomes → links/CTA) with business framing for clients and technical appendix for recruiters; when metrics are missing use truthful proxies (shipped scope, timeline met, zero-critical-bugs window, Lighthouse, qualitative client sign-off) and never invent numbers.

### Cited Findings
- Case studies detail business context, technical choices, measurable results — not just feature lists — and elevate portfolio from code display to business solution — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Outline explicit problems/constraints, detail decision process, document bugs/debugging, quantify outcomes with engineering metrics, reflect on learnings/future improvements — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Freelance case-study template: 1) outcome-led headline, 2) context 2–3 sentences, 3) specific role, 4) process 3–5 bullets, 5) results metrics, 6) visuals, 7) CTA — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- Bad headline "Acme Corp Website" vs good "How I increased Acme's demo requests 40% with faster marketing site" — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- No metrics fallback: qualitative outcomes e.g., "Launched on deadline; zero critical bugs in first 30 days" — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- How to write case study without metrics: use permission-approved qualitative results, describe problem/solution clearly, highlight deliverables and timeline met — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- Including measurable results ('increased conversion by 23%') increases inquiry rates 40–60% vs deliverables alone; case-study format (problem/solution/results) lifts inquiries +150–200% — [Source](https://www.clientgrowthengine.com/blog/freelance-portfolio-gets-clients)
- Technical framing ("Optimised React rendering…reduce re-renders 60%") loses clients; business framing ("Rebuilt checkout. Conversion +23%. Load halved. Onboarded 40% more customers") closes clients — translate every technical win to business outcome — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Freelance case-study beats: client context, problem in plain language, what you did (1–2 sentences non-technical), outcome with metrics, testimonial in-case, what you'd do differently — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- If under NDA on specifics, qualitative still beats nothing: "enabled team to launch in three new markets within quarter"; relative figures allowed where exact banned: "completion up roughly a third," "load cut in half" — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Student/dev portfolio case-study template: title, problem, target users, tech stack, main features, your role, screenshots, GitHub, live demo, learning outcome — [Source](https://www.filemakr.com/blog/how-to-build-a-developer-portfolio)
- Provide visual architecture diagrams mapping components, APIs, queues, DB; write decision records explaining why chosen stack over alternatives with trade-offs; explain REST/GraphQL contracts; detail data flow/caching; highlight scaling bottlenecks — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Lead project pages with short executive summary, live links, stack tags, architecture diagram for 30-second skim — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- A portfolio structured as case studies (problem → solution → metric) is what developers should fix when they show code dumps without business context — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)

### Inferences
- Recommended 8-beat template for Dawood (fits both audiences, truthful):
  1. Outcome-led headline (client language) + stack chips + live/GitHub buttons above fold. Example pattern (do NOT publish numbers until verified): "Fertilizer inventory + billing system for distributor — live at ibrahim-solution.com [Live] [Walkthrough]".
  2. Context (2–3 sentences): who uses it, what manual/broken process it replaced.
  3. My role (1 line, specific): e.g., "Sole full-stack developer: schema, REST APIs, dashboard, deploy" vs "Full-stack dev".
  4. Stack + links: frontend/backend/DB/auth/hosting + GitHub (or Private badge + why) + live URL.
  5. Architecture (1 diagram + 3–5 bullets): data flow, auth/RBAC, key models/APIs, caching/file handling, deploy pipeline.
  6. Build notes (recruiter appendix): hardest bug/trade-off + what changed (e.g., N+1 fix, JWT refresh, RAG chunking choice) — 2–3 sentences, no jargon wall.
  7. Outcomes (2–3 bullets, truthful tier): Tier A verified metric if client approves; Tier B relative/qualitative ("live in production", "delivered scope X on timeline Y", "Lighthouse X", "zero critical bugs first 30 days"); Tier C learning/what-next ("Next: role audit log / pgvector evals"). Never invent %.
  8. CTA/testimonial slot: per-case "Want similar? [Book call]" + 1-line client quote if permission, else omit (don't fake).
- For GitHub-only (Jarvis, RAG, LinkedIn hub, Employee, FreelanceHub): replace live button with 90-sec demo video + README parity (setup steps, env vars, seed creds, folder structure) because hiring managers skim README/architecture, rarely clone — README quality is conversion lever.
- Missing-metrics playbook (no invented metrics): use scope facts (roles, modules, entities), delivery facts (live URL, date shipped), quality facts (responsive, auth coverage, validation states), maintainability facts (README, CI/lint, migration scripts). One honest "What I'd do differently" line signals seniority without fake perfection.

### Gaps
- No reliable benchmark found for exact number of outcomes (2 vs 3) maximizing conversion; 2–3 is practitioner consensus, not experimental result.
- No Dawood-approved metrics available at research time; all outcome bullets must be marked TBD pending client permission/measurement.

## How to position MERN plus Next.js plus Laravel plus GenAI without looking scattered? What single-sentence positioning wins?

### Takeaway
Anchor on one outcome ("production full-stack systems") with MERN/Next.js as core, Laravel as backend range, GenAI as 2026 accelerator — one umbrella sentence plus 3 service lines prevents scattered-generalist read.

### Cited Findings
- Don't list every skill; offer 3 clear packages/service lines (e.g., marketing site / e-commerce build / retainer) — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- Specific positioning beats long list of everything you can do; prospect self-qualifies immediately (example: "Full-stack developer for Series A B2B SaaS. I rebuild slow buggy MVPs...") vs "I build websites" — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Hero must state specific positioning, not job title — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- "Full-stack" is most overused title; must position so you don't read as senior in nothing — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Target niche+problem keywords (e.g., "Freelance React developer healthcare", "Shopify developer for small brands") — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- MERN gives total control but forces intentional planning (routing, JWT, hooks, REST); Laravel gives rapid backend structure; combining both with strong frontend gives vision/roots+wings framing from practitioner journey — [Source](https://medium.com/@isidorejad/laravel-vs-mern-stack-my-journey-lessons-learned-and-encouragement-for-young-developers-dd6b69ddcc4e)
- Production Laravel 11 API + Next.js 15 frontend starter pattern (Sanctum auth, MySQL/Postgres, React Query, ShadCN) is recognized scalable architecture — [Source](https://github.com/Mr-LuaM/laravel-next-starter)
- MERN + GenAI positioning is established market pattern: "Full-Stack Developer | MERN & GenAI", "MERN stack, Next.js, AI integrations", live AI SaaS proof — [Source](https://v0-rounded-neo-brutalist-portfolio.vercel.app/)
- Example live positioning: "Full-Stack MERN + Next.js developer building AI-powered SaaS apps using OpenAI, Claude, Gemini. 3 live apps." — [Source](https://www.rajaniket.com/)
- Example live positioning: "Full-stack developer skilled in MERN & Next.js with experience in scalable platforms, real-time data, AI, cloud deployments" — [Source](https://samipevekar.is-a.dev/)
- AI + MERN integration paths: pre-trained APIs (OpenAI/HuggingFace), in-Node libs, or Python training + Flask/FastAPI connected to Node backend — [Source](https://medium.com/@alifazmiruddin/ai-with-mern-stack-technology-building-smarter-applications-2da06209af18)

### Inferences
- Positioning risk: listing "MERN + Next.js + Laravel + GenAI + …" as flat skill cloud reads scattered/junior-generalist. Fix: hierarchy — Core (MERN/Next.js) → Range (Laravel APIs when PHP/MySQL fit) → Edge (GenAI/RAG applied to those apps).
- Recommended single-sentence options (pick 1, truthful, no metric invention):
  - Option A (recruiter-safe): "Full-stack developer (MERN + Next.js) shipping live business systems, with Laravel API range and applied GenAI (RAG/support agents)."
  - Option B (client-safe): "I build live inventory, booking & content platforms with Next.js/Node — now with AI support agents that answer from your own docs."
  - Option C (premium/short): "Production full-stack builds + AI support layer — 4 live sites, 25+ projects shipped."
- Supporting 3 service lines to prevent scatter: 1) Business web platforms (inventory/booking/CMS — Next.js+MERN/Laravel), 2) AI support agents (RAG over docs/WhatsApp/web), 3) Care/iteration (fix, speed, admin features). Each maps to 2 heroes.
- Stack narrative line for About: "MERN/Next.js by default for speed + SEO; Laravel when relational/PHP hosting fits; GenAI via LangChain + vectors, Node API bridge, evals before ship." This explains breadth as judgment, not dabbling.
- SEO/title variant: "Full-Stack Developer (MERN, Next.js, Laravel) + GenAI — Inventory, Booking & Support Agents".

### Gaps
- No source tests which single sentence converts best for Pakistan + remote-client dual market; options are synthesized from patterns, need A/B or mentor review.
- Laravel proof depth in Dawood's 9 unclear (which heroes actually use Laravel vs Node); positioning assumes at least one Laravel-backed build can be named — verify before publishing.

## How to use certifications (NCEAC Generative AI Top Performer 2026), 25+ projects, 3+ years experience, Techling role for trust?

### Takeaway
Place Top Performer + Techling + 3+ years + 25+ projects as a 4-item trust strip with proof links, then re-use each once in context (cert → AI cases, Techling → process, years → timeline, 25+ → range grid) — never as floating vanity numbers.

### Cited Findings
- Portfolio is sales document answering "Can this person solve my problem, and can I trust them?" — leads with outcomes, process briefly, next step obvious — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- 74% of clients review freelancer portfolios before decision; freelancers with portfolio hired 9x more often (Upwork) — [Source](https://www.forbes.com/sites/chelseatobin/2025/11/12/5-tips-for-creating-the-best-freelance-portfolio-that-wins-you-clients)
- Freelancers with portfolios hired up to 9x more often than those without — [Source](https://richharrington.dev/article/developer-portfolio-brings-clients-to-your-door)
- About page trust: 2–3 sentences on who you help + location/timezone + one credibility line (years, client type, not name-dropping without permission) — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- Show recent certifications with business context ("AWS Cost Optimization — Applied to reduce client costs avg 35%") + talks + OSS solving business problems — [Source](https://medium.com/@Staragiletechbytes/how-to-build-a-portfolio-that-attracts-high-value-freelance-devops-clients-692ea7ea0020)
- Testimonial anatomy: name, role, company, problem sentence, outcome sentence; link LinkedIn where possible as trust anchor; 3 strong > 20 generic — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- After delivery send: "Would you be open to 2–3 sentence testimonial about [specific outcome]? Happy to draft bullet you can edit" — draft reduces effort, increases completion — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- Include client logos only with written permission; email "Would you be okay listing [Company]?" suffices — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Availability signal ("Currently accepting Q2 2026 projects") creates urgency + in-demand proof; stale date kills credibility — update quarterly — [Source](https://showproof.io/guides/freelance-developer-portfolio/)
- Clear "how I work" 4-step (discovery → scope/price → milestones → revisions) addresses prior bad-dev experience anxiety — [Source](https://showproof.io/guides/freelance-developer-portfolio/)

### Inferences
- Trust-strip implementation (hero-adjacent, 4 tiles, all truthful to CV):
  1. "NCEAC Generative AI — Top Performer (2026) [Verify/Certificate link]" → links to RAG + Jarvis cases, not isolated badge page.
  2. "Full-Stack Developer @ Techling (Jun 2026–Present)" → links to process note: team delivery, reviews, production standards.
  3. "3+ years / 25+ projects (freelance since Oct 2023; Sky Waves, RISS prior)" → links to timeline + full grid proving range, not just claim.
  4. "BS IT, Univ. of Punjab (2026)" → education anchor for recruiter ATS/recency; keep one line.
- Usage rules: each trust item appears twice max (strip + one contextual reuse). Example: cert badge inside RAG case ("Techniques from Top Performer coursework applied: chunking, hybrid BM25+vector, re-rank, RAGAS-style checks"); Techling role inside About/process ("Team workflow: scoped tickets, PR reviews, staging → prod"); 25+ as grid header ("25+ shipped — 6 featured, rest indexed by stack"), not as headline without proof.
- Testimonial gap plan: since no client quotes provided, ship with "Client sign-off pending" placeholders hidden at launch; send draft-bullet ask (template above) to Ibrahim-solution/Biks/Sugar-Hills/E-Masjid owners post-launch. Do not fabricate quotes or logos.
- Recruiter vs client split: recruiters weight Techling tenure + degree year + stack breadth + README/CI evidence; clients weight live links + qualitative outcomes + responsiveness + availability line. Serve both by ordering strip: Live work → Techling → Cert → Education for clients; Techling → Stack → Cert → Live work for recruiter resume PDF version.

### Gaps
- No verifiable source for Dawood's NCEAC certificate URL, Techling employment proof, or 25+ project list; trust strip must link to real artifacts or omit links — unverified counts should be labeled "selected" to stay truthful.
- No testimonials or permissioned logos available at research time; social-proof section must launch as process + availability + contact-form strength, not fake proof.

## What project visuals are needed per project (screenshots provided for 4, what to request for other 5: video, GIF, architecture diagram)?

### Takeaway
Standardize 6 visuals per hero (cover + 3 product shots + architecture diagram + 60–90s demo) with responsive + accessibility labels; reuse provided 4 screenshots as-is and commission a 22-item shot-list for the missing 5 plus diagram/GIF upgrades.

### Cited Findings
- Proof can be portfolio site, GitHub repos, live demos, screenshots, docs, clear explanations; needs clarity, working projects, clean presentation, honest explanation — not heavy animation — [Source](https://www.filemakr.com/blog/how-to-build-a-developer-portfolio)
- Each project should include screenshots (dashboard, forms, reports, admin panel) + GitHub + live demo or demo video — [Source](https://www.filemakr.com/blog/how-to-build-a-developer-portfolio)
- If hosting not possible, add short demo video — [Source](https://www.filemakr.com/blog/how-to-build-a-developer-portfolio)
- Strong README includes overview, features, setup, DB instructions, screenshots, demo login creds if applicable — [Source](https://www.filemakr.com/blog/how-to-build-a-developer-portfolio)
- Visuals: before/after, key screens, code architecture (devs); label images for accessibility — [Source](https://devbiztools.com/blog/how-to-build-freelance-portfolio-that-converts)
- Provide one-click demo creds or pre-auth guest button; pre-populate realistic test data so evaluators don't land on empty dashboard — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Ensure responsive across desktop/mobile; monitor uptime/cold starts; fast initial load prevents tab-close — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Pre-populate with dynamic users/histories/mock transactions to highlight workflows immediately — [Source](https://fueler.io/blog/how-to-build-an-engineering-portfolio-that-gets-you-interviews)
- Two-minute walkthrough: script opening, cut login tour, put detail in appendix — [Source](https://gtmengineersearch.com/gtm-engineer-portfolio)
- Diagram: label arrows, show failure paths, keep each diagram focused on one idea — [Source](https://gtmengineersearch.com/gtm-engineer-portfolio)
- Guided screenshot/video demos transform static visuals into interactive step walkthroughs capturing typing/dragging/scrolling — [Source](https://docs.supademo.com/create/by-demo-type/guided-screenshot-and-video-demos)

### Inferences
- Per-hero visual standard (6 assets, consistent 16:10, WebP, <300KB, alt text):
  1. Cover (1200×750): product hero screen + outcome headline overlay.
  2. Shot A — core workflow (e.g., inventory stock table/billing; masjid events/prayer admin; RAG chat with citations).
  3. Shot B — admin/auth/data view (dashboard, roles, analytics, vector ingest).
  4. Shot C — mobile responsive (375px) same flow proving responsive claim.
  5. Architecture diagram (1 idea per diagram): boxes for client → API → DB/auth/storage/AI with labeled arrows + failure/caching note.
  6. Demo (60–90s Loom/MP4 + 5–8s GIF teaser for card hover): scripted — 0:00 problem, 0:15 live click-through (skip login tour via guest creds), 1:00 architecture + outcome.
- Asset shot-list for user to provide (22 items; assumes 4 screenshots provided cover Fertilizer, E-Masjid, Biks-Car, Sugar-Hills — confirm which):
  - For those 4 live sites: 1) confirm permission to embed screenshots/live link, 2) 1 mobile shot each (4), 3) 1 architecture diagram each — even simple flow — (4), 4) guest/demo creds or consent to blur private data, 5) 60–90s Loom each OR one 3-min combined client-work reel.
  - For other 5 (Jarvis, RAG agent, LinkedIn hub, Employee system, FreelanceHub): 1) 3 product screenshots each = 15 images (empty-state + populated-state required, no empty dashboards), 2) 1 architecture diagram each = 5 (RAG must show ingest→chunk→embed→retrieve→generate + eval; Jarvis must show STT/LLM/tools; LinkedIn hub must show triggers/queues/limits; Employee must show RBAC schema; FreelanceHub must show roles/jobs/payments), 3) demo video each (RAG + Jarvis mandatory; others Loom or GIF acceptable), 4) README screenshot block + setup steps + seed instructions, 5) explicit private/public flag + anonymization notes for any client data.
- GIF/interactive upgrade (post-launch): card-hover GIFs (5–8s, <2MB) for 6 heroes; optional Supademo-style guided tour for Fertilizer + RAG (highest client/recruiter value); keep autoplay muted + captions for accessibility.
- Do-not-ship list: empty dashboards, login-wall-only screenshots, broken live links, stale "Available Q1 2024"-style banners, unlabeled stock heroes.

### Gaps
- Unknown which 4 projects the provided screenshots actually cover and their resolution/permission status; shot-list assumes live-site 4 but needs user confirmation.
- No source defines optimal image count per dev case study; 3+diagram+video standard is synthesized from checklist + conversion guidance, not tested ideal.
