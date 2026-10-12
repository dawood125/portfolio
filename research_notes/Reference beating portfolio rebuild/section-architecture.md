# Section Architecture — Dawood Ahmed Portfolio Rebuild (Anti-Reference, Jobs + Clients)

## 1. Which Anti sections convert for dev jobs vs freelance clients, and in what order?

### Takeaway
Keep Anti's conversion spine but compress to a single focused Next.js page: sticky nav → hero with portrait + dual CTA → trusted-by strip → stats band → featured works → services → process/engagement → CTA → footer; omit testimonial slider and insights/blog from v1 and replace with verifiable trust substitutes.

### Cited Findings
- Freelance portfolios earn 40-60% more per project than resumes/platform profiles alone, and a visitor decides in 3-5 seconds whether to keep scrolling — portfolio is the single most important freelance asset — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- A 2025 survey of 1,200 hiring managers found 78% prioritize portfolio quality over years of experience when evaluating freelancers — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Clients paying $5,000+ per project spend on average 2 minutes 14 seconds reviewing a portfolio before reaching out — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Niche positioning above the fold converts 8-12% vs 1-3% for generalists; positioning statement should be 10-15 words + supporting credential line — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Recruiters spend 7.4 seconds on initial resume screen (2018 update from 6 seconds in 2012) — [Source](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html)
- Recruiters spend ~80% of review time on 6 data points: name, current title/company, previous title/company, previous start/end dates, current start/end dates, education; rest is cursory keyword pattern-matching — [Source](https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf)
- Hiring managers spend ~30 seconds on a portfolio and need 3 things above the fold: what you do, proof you did it, how to contact you — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Minimum viable freelance site map is 5 pages/sections: Home (offer + proof + CTA), Work/case studies (3-5 deep dives), Services (scoped packages), About (why you), Contact (form + calendar) — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Every freelance portfolio must include at minimum: About (2-3 sentences, niche), project case studies, testimonials/social proof, clear contact/Hire Me CTA, live links, tech stack, professional domain/email — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Portfolios with a single prominent CTA generate 2.5x more inquiries than multiple competing actions; CTA must appear in nav, bottom of each case study, and dedicated bottom section; "Book a Free 15-Minute Call" outperforms "Contact Me" ~2x — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Freelancers switching from contact form to calendar link report 30-40% increase in booked calls — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Recommended micro-commitment flow: above fold (outcome headline + credibility + primary CTA) → mid-page (3 case cards with results) → lower page (process, pricing signal, reviews, secondary CTA) → footer (email, timezone, response time, about link) — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- One primary CTA sitewide; competing "Hire me / Get quote / Download CV / Follow on GitHub" in same viewport kills conversion — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Conversion killers: generic "passionate developer" hero, screenshot grid with no story/CTA, too many niches, missing mobile test (42% review on mobile), no live links, stale stack badges, contact friction (captcha, mandatory phone, PDF upload) — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Slow load kills: >3 seconds loses 53% of visitors; single broken link reduces perceived professionalism 39% per user testing — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Do not build portfolio with overly complex stack to show off; clean fast simple beats technically impressive but slow/confusing — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Single-page anchor-only portfolios lose on both fronts: one URL ranks for one intent only, and hiring manager cannot share link to "the case studies" — separate /services, /hire-me, /about, /projects/[slug] recommended for multi-intent SEO — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Custom domain signals highest seriousness to international clients vs Framer (very high), Notion (medium, interim only), GitHub Pages (low for non-technical, supplementary not primary) — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)

### Inferences
- For Dawood (dual audience), Anti order largely holds but must front-load recruiter scan items (current title/company Techling Jun 2026-present + stack + location/timezone) inside hero to satisfy 7.4-second scan, while freelance proof (4 live links + outcomes) satisfies 2m14s deep read — hero must serve both in first viewport.
- Giant CTA + footer close is validated (2.5x lift); Anti's insights/blog section is the only section to cut from v1 single-page build because it serves neither 30-second recruiter scan nor immediate client booking without content volume (see Q5).
- Testimonial slider and plans/pricing cannot be copied verbatim from Anti agency template without adaptation for solo dev with zero permissioned quotes and jobs-market risk (see Q2-Q3).
- Next.js single-page v1 is acceptable for focus/conversion despite single-URL SEO limit, provided case studies are built as indexable sub-routes or expandable deep-dives in v2 and page stays <100KB JS / Lighthouse 95+ mobile.

### Gaps
- No reliable source found quantifying sticky-nav vs non-sticky nav lift specifically for dev portfolios; recommendation rests on CTA-repetition findings (3 locations) not nav-specific A/B data.
- No 2025-2026 roast/teardown dataset quantifying portrait-vs-no-portrait hero lift for developers; dual-CTA hero pattern inferred from CTA and recruiter-scan studies.

## 2. Services + plans verdict: 4 service lines with starting-from pricing vs no pricing?

### Takeaway
INCLUDE services grid (4 lines: Business Platforms, AI Agents, API + Cloud, Care Plans) and INCLUDE lightweight starting-from bands + engagement models, but EXCLUDE rigid 3-tier SaaS-style plans table from v1 hero; frame pricing as freelance filter that coexists with an explicit "Open to full-time" recruiter signal.

### Cited Findings
- Freelancers describing clear process close 35% more proposals at 20-25% higher rates — process must list 3-5 phases with name + description + timeline — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Services must be specific enough to buy: "Full Stack SaaS Development — Next.js, Supabase, Vercel — from $4,500" beats "Web Development"; tiered packages (Starter/Professional/Enterprise) reduce negotiation friction and allow self-selection — [Source](https://freelancerpulse.com/blog/how-to-build-high-converting-freelance-portfolio)
- Publish a rates signal even if ranges only; e.g. "Projects typically start from Rs 150,000 (~USD 1,100) for scoped builds" filters tire-kickers without locking into menu price — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Hidden pricing attracts more inquiries but many are unqualified; "from Rs 120,000 for scoped Laravel builds" saves both sides time; adjust to USD for international work — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Avoid showing INR prices on portfolio aimed at overseas clients; use USD if publishing rates, else "available on request" + clear contact path — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Add budget bands to intake: "Under $5,000 / $5,000-15,000 / $15,000-50,000 / $50,000+" to anchor expectations — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Live solo-dev precedent: fixed starting prices listed in full — websites from $100, apps from $249, automation quoted per-job with fixed price in writing before start; hosting/care $120/yr ($240 with bookings) — [Source](https://bengallagher.dev/)
- Pricing models: hourly protects against ambiguity; project-based rewards speed but requires tight scope agreement; value-based (anchor to client revenue/time saved) is holy grail but requires discovery data — start hourly, transition to value as outcome data accrues — [Source](https://dev.to/kethmars/how-to-price-yourself-as-a-freelance-developer-3-strategies-48n)
- Services section usually fails when it says "Contact for quote" everywhere; converts when it shows clear scope + starting price band — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Hire-me page must explain engagement models (hourly, project, retainer), timezone overlap, tools, availability, rates/ranges, FAQ — removes hesitation — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Services page must contain what you offer, who it is for, process, starting points, with Service schema — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- For web developers process must emphasize technical planning/testing: code review, cross-browser testing, performance optimization — buyers of $10k-50k projects want risk reduction — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)

### Inferences
- For Dawood: 4 service cards map cleanly to buyer intents (non-technical founder → Business Platforms; AI-curious → AI Agents; technical CTO → API + Cloud; repeat revenue → Care Plans) and to recruiter keyword scan (Next.js, AI, APIs, cloud) — include all 4 with 1-line outcome + stack chips + "Starting from $X" band in USD.
- Exclude full Anti-style 3-column feature-comparison pricing table from v1: Dawood lacks delivery-volume data to defend fixed tiers and risks anchoring too low for international clients or alienating recruiters who read menu pricing as "not seeking employment"; replace with (a) starting-from line per service + (b) 3 engagement rows (Fixed-scope build / Monthly care / Full-time role) with timeline + CTA, no hard prices beyond floor.
- Recruiter risk is mitigated by explicit dual-track header ("Available for freelance projects & full-time roles") and by placing CV/LinkedIn secondary CTA alongside "Book discovery call" primary — no source found showing starting-from bands harm job applications when full-time availability is explicit, but generalist/cheap positioning does harm (8-12% vs 1-3% niche finding).
- Care Plans line doubles as retainer/engagement model proof (process finding: 35% close lift) and should quote as "/mo from $X" to set retainer anchor without fabricating client revenue claims.

### Gaps
- No reliable source found directly measuring recruiter attitude to pricing on portfolio (e.g., "X% of recruiters penalize pricing"); verdict rests on freelance conversion studies + absence of contrary job-market evidence.
- No verified Dawood rate floor available in brief; starting-from numbers must be supplied by Dawood — do not invent USD bands.

## 3. Testimonials with zero permissioned quotes: placeholder, LinkedIn, or omit?

### Takeaway
OMIT testimonial slider from v1; NEVER ship placeholder/fabricated quotes; substitute with (a) LinkedIn recommendations link block, (b) collaborator/mentor endorsement pattern if available, (c) "Request testimonial / Become first featured client" CTA that turns gap into pipeline.

### Cited Findings
- Adding 3+ client testimonials increases inquiry rates 45-65%; best testimonials mention business impact + experience + recommendation, e.g. "redesigned landing page, conversions 1.2%→3.8% in first month" beats "great to work with" — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- If new to freelancing with no client testimonials, an endorsement from collaborator, mentor, or reviewer of work still provides useful social proof — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- If just starting with no testimonials, fastest path is 1-2 reduced-rate (not free) projects in exchange for detailed video testimonial; even one strong testimonial changes conversion math — [Source](https://freelancerpulse.com/blog/how-to-build-high-converting-freelance-portfolio)
- FTC final rule (Aug 2024) bans fake reviews/testimonials: prohibits creating/selling/buying reviews by non-existent persons, AI-generated fakes, or persons without actual experience, or misrepresenting experience; allows civil penalties — [Source](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)
- Do not let AI invent metrics, testimonials, or client logos; treat claims like advertising claims — must be truthful/substantiated per FTC advertising guidance and Endorsement Guides (16 C.F.R. Part 255) — [Source](https://aiexpert.ee/en/articles/portfolio-case-evidence-not-hype)
- Required evidence per case: client permission to describe work (email enough; obey stricter NDA), 1-sentence problem, constraints, shipped deliverables, provable outcomes, anonymization plan; if permission missing, stop and write labeled illustrative sample instead of fake case — [Source](https://aiexpert.ee/en/articles/portfolio-case-evidence-not-hype)
- Anonymizing client name does not license invented metrics; "Series B SaaS" with fabricated lift is still false claim — [Source](https://aiexpert.ee/en/articles/portfolio-case-evidence-not-hype)
- If project didn't ship or no analytics access, say so and substitute qualitative evidence; honest partial evidence beats confident vagueness — [Source](https://designcase.app/blog/anatomy-interview-ready-ux-case-study/)
- Real stories outperform synthetic: imperfections, pauses, unexpected wording stop scroll; synthetic average is forgettable; only authentic testimonials from real people with yes to sharing — [Source](https://fitchgrowth.co/insights/why-i-never-faked-a-testimonial/)
- Fictional/speculative portfolio pieces are ethical only if transparently labeled: "Landing page concept for fictional fintech brand" / "Speculative redesign, not commissioned" — ethical problem starts when invented work presented as hired work — [Source](https://www.linkedin.com/posts/beulahnegedu_is-it-ethical-to-add-fictional-jobs-to-your-activity-7508078837461815297-mvID)
- Visual polish of real quote (taking verified email/Slack praise into clean card) is ethical; fabricating 5-star text + stock avatar is deception; map quote to appropriate container (don't fake a tweet from an email) — [Source](https://postworthy.app/blog/ethical-marketing-social-proof-best-practices)

### Inferences
- Dawood v1 must have zero slider dots with lorem-ipsum or AI quotes — legal (FTC), trust (prospect checks + past client recognizes fiction), and interview risk (cannot defend invented 140% lift on sales call) all forbid it.
- Honest pattern for Dawood: replace slider with 3-cell "Trust in progress" strip — Cell 1: NCEAC Top Performer 2026 badge (verifiable award), Cell 2: Techling employment + LinkedIn recommendations link ("See endorsements on LinkedIn"), Cell 3: CTA card ("Worked with me? Leave a testimonial →" + "Be my next case study — book call"). This preserves Anti's social-proof slot without fabrication and creates testimonial pipeline.
- As soon as 1 permissioned quote exists (even from mentor/collaborator per Skydo pattern), promote to single featured quote + logo/permission line; graduate to 3-quote slider only at 3+ permissioned impact quotes (45-65% lift threshold).

### Gaps
- No source found for "placeholder testimonial" converting better than omission; all ethics and conversion sources point to omit-or-substitute, not placeholder.
- Unknown whether Dawood has any LinkedIn recommendations already permissioned for embed — needs verification before build.

## 4. Work cards: Anti anatomy (screenshot + category + external icon), how many, private-repo handling?

### Takeaway
Ship 4 image cards (matches truthful "4 live sites"), each with real screenshot + category + outcome line + stack chips + dual links (Live + Code/Access); never dead-end private repos — use "Private repo — walkthrough on call" + case-study modal/page instead of dead GitHub 404.

### Cited Findings
- Include 3-5 case studies maximum; optimal is 4-6 curated; 5 strong beats 15 mediocre; remove projects without measurable results, off-niche, or >2 years old — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Aim for 3-5 strong well-documented projects, not screenshot fill; smaller relevant selection avoids overwhelming international clients — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Portfolios with outcome metrics convert 3x better than work samples alone; every case study must follow Problem-Solution-Result — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Most effective case structure: Context → Problem → Process → Solution → Outcome; lead with quantifiable outcome at top to capture skimmers; 2-4 strong examples more effective than many weak — [Source](https://thetailorcv.com/blog/how-to-write-portfolio-case-study)
- Proven 5-part framework: problem, role, process, solution, impact; open with 1-paragraph summary (problem + role + outcome) so recruiter decides in 15 seconds; reading length 5-8 minutes; scannable headings — [Source](https://mylivecv.com/en-US/blog/portfolio-case-study-structure)
- If hard numbers unavailable (early-stage/confidential), use qualitative proof: shipped feature still live, stakeholder feedback, adopted process; state plainly when estimate vs measured; inventing precise stats loses credibility in interview — [Source](https://mylivecv.com/en-US/blog/portfolio-case-study-structure)
- Case title should be outcome for client type, not codename; template: Context (2-3 sentences) → Constraints (budget/timeline/team/legacy) → Role (owned vs delegated) → Solution (architecture + why) → Outcome (measurable or operational win) → Stack → CTA ("Need similar? Book 20-min call") — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Never publish confidential data; anonymize private projects ("Nepal-based law firm portal"); name + link only public-safe work — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Some NDAs forbid any public mention — obey stricter rule; ask narrow anonymized exception, or labeled illustrative walkthrough with fictional data clearly marked, or private reference call — [Source](https://aiexpert.ee/en/articles/portfolio-case-evidence-not-hype)
- Outcomes need not be vanity metrics: "Replaced email PDF workflow with document portal + payment collection" beats "built modern UI"; include 1 technical paragraph for technical buyers (why Laravel 12 over WordPress, why Redis) — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Screenshots alone tell client little; each project must explain problem, solution, tech, what changed — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Strong result metrics for web dev: load-time improvement, conversion lift, uptime, revenue impact; e.g. 4.2s→1.1s + mobile conversions +47% worth more than 20 screenshots — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Repeat same CTA at bottom of every case study; do not strand reader after proof — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Two-three deep case studies beat twenty thumbnails; project case study worth more than ten screenshots — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Always get permission before using client logo; most clients happy to be featured — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- GitHub supplements but never substitutes portfolio: GitHub shows code not context (client, problem, result, role); use as supporting link — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Showing 15-20 projects signals generalist who takes anything; top 3 mistakes costing $10k-30k/yr are too many projects, no context, no outcome metrics — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)

### Inferences
- Card anatomy for Dawood (Anti-adapted): [16:10 screenshot w/ live badge] + [Category label e.g. Business Platform / AI Agent] + [Title as outcome e.g. "Booking portal that cut manual admin"] + [1-line problem→result] + [Stack chips: Next.js, etc.] + [Live ↗ + Case study → + Code/Access state]. This preserves Anti's screenshot+category+external-icon pattern while adding conversion-required outcome + stack + non-dead-end access state.
- Count = 4: exactly matches verifiable "4 live sites" and sits in validated 3-5 / 4-6 window; 6 would force inventing 2 extra live proofs and trigger generalist signal — exclude 6.
- Private-repo handling: 3-state link — (Public → GitHub icon live), (Private-permissioned → "Private repo — demo on call" button opening contact/calendar, no hyperlink to 404), (NDA-forbidden → anonymized card with no name/logo, operational outcome only + same CTA). All cards link to case-study anchor/modal ending in CTA so no dead ends.
- "25+ projects" belongs in stats band, not as 25 cards — cards are curated proof, stats are volume proof.

### Gaps
- No source found specifying exact card pixel dimensions or hover interaction that lifts conversion for dev portfolios; anatomy recommendation is synthesis of conversion + case-study structure findings.
- Live-site uptime/perf numbers for Dawood's 4 sites not yet evidenced — cards must ship with operational outcomes until measured Lighthouse/conversion numbers permissioned.

## 5. Nav, logo strip (Techling, NCEAC, live clients?), stats (truthful numbers)?

### Takeaway
INCLUDE sticky nav (5 links + dual CTA), INCLUDE slim credibility strip labeled honestly (Techling as Employer + NCEAC Top Performer 2026 as Recognition — NOT "trusted by clients" unless live clients permission), INCLUDE 4-cell stats band using only verifiable numbers (3+ years, 25+ projects, 4 live sites, Top Performer 2026); EXCLUDE unverified client logos and invented metrics.

### Cited Findings
- CTA must appear in nav bar plus bottom of each case study plus dedicated bottom section — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Contact form fields max 5: name, email, project summary, budget band, timeline; captcha maze kills conversion — [Source](https://kokil.com.np/blog/freelance-portfolio-site-what-actually-converts)
- Add timezone + typical call availability + response window to remove cross-border concern; e.g. available 6-10pm IST overlapping US East morning — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Use professional email (you@yourname.com) over Gmail for international credibility — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Keep language simple/neutral, niche obvious ("React frontends for B2B SaaS" beats "I build websites"), show international experience with permission — [Source](https://www.skydo.com/blog/freelance-web-developer-portfolio)
- Client logos (5-8 recognizable) above fold can decide bounce vs explore; always get permission before using logo — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Specific numbers build authority even without named clients: "87 projects / $2.4M revenue / 4.9 across 52 reviews" as stat bar near top — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- For developers, GitHub stars / OSS contributions supplement testimonials for CTO buyers; awards/features (Awwwards etc.) justify premium — [Source](https://whatshouldicharge.io/guides/how-to-build-a-freelance-portfolio)
- Social proof that can be verified: named clients with permission, LinkedIn recommendations, GitHub with real activity — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Response time: reply within a day; portfolio's job is to get message — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Blog/Insights SEO reality: portfolio SEO needs content volume — not 5 posts but hundreds covering client queries to build topical authority; SEO is poor strategy for needing clients next week, excellent for sustainable compounding lead gen — [Source](https://www.jamesrossjr.com/blog/portfolio-seo-strategy-developer)
- 5-15 sporadic posts serve as writing proof, not traffic engine; lead-gen engine needs 400+ targeting query clusters — [Source](https://www.jamesrossjr.com/blog/portfolio-site-400-blog-articles)
- Single blog post got 23,340 impressions vs projects page 68; blog is SEO engine not portfolio page — but requires migration + canonical + infrastructure work compounding over months — [Source](https://www.sanderdesnaijer.com/blog/from-zero-to-27k-impressions-seo)
- Highest ROI order: service pages with commercial intent → location pages → comparison posts → case-study pages → tutorials; 1 post/week enough; after 52 posts library compounds — [Source](https://usamasoft.com/blog/rank-developer-portfolio-google)
- One strong technical post/month beats 4 thin ones; every post must link to hire-me/services page; quality over cadence — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)
- Performance budget is trust signal: Lighthouse 95+ mobile, <100KB JS home, self-hosted fonts, CDN; technical reviewer opens DevTools — failing CLS while claiming "performance-focused" kills claim — [Source](https://shawab.space/blog/developer-portfolio-website-seo-guide)

### Inferences
- Nav (sticky, Next.js): Logo "DA." + links Work / Services / Process / About / Contact + dual CTA [Book Call primary] [CV ↓ secondary]; mobile hamburger must preserve CTA visibility — satisfies nav-CTA + 30-sec scan + dual-audience without competing CTAs in hero viewport beyond the two.
- Logo strip verdict: SHIP slim strip but label "Currently @ Techling • Recognized by NCEAC 2026" with 2 grayscale marks + "4 live client platforms (names on permission)" text placeholder — do NOT label Techling/NCEAC as "clients" and do NOT invent live-client logos; upgrade to "Trusted by" only when ≥3 live clients grant logo permission.
- Stats band verdict: SHIP 4 cells exactly — "3+ Years Full-Stack", "25+ Projects Built", "4 Live in Production", "Top Performer — NCEAC 2026"; omit revenue/uptime/% lifts until measured/permissioned; place directly under hero as recruiter skim + client authority (mirrors "specific numbers" finding without overclaim).
- Insights/blog verdict: OMIT blog grid/preview from v1 single-page build; reserve /blog route + schema for v2 with 1 strong technical post/month linked to services/hire-me; v1 focus preserves speed (<100KB JS, LCP green) and avoids stale 3-post blog signaling inactivity — blog is long-game SEO, not v1 conversion lever.
- Footer must carry timezone (PKT + overlap), response promise ("Replies within 1 business day"), professional email, GitHub/LinkedIn sameAs, location for Person schema — closes cross-border trust gap per Skydo/Shawab findings.

### Gaps
- No verified list of Dawood's 4 live site URLs/names/permissions or Techling logo-use permission — strip can only ship text labels until evidence folder confirms.
- No measured performance (Lighthouse/LCP) or outcome numbers for the 4 live sites — stats must stay at volume + award level, not impact level, until permissioned analytics exist.
