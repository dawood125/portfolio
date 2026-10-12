# Build the Portfolio That Proves Itself

Dawood Ahmed should stop translating his four reference portfolios' *styles* and build a concept only he can claim: a **"Glass Box" portfolio, where the site is an observable, running system**. The hero is a working "Ask my work" RAG console over his own case studies. The work section is a board of his real client systems with real live status. One motion motif ties every section together: a request "trace" that draws down the page and streams headings in like tokens. The references feel great because a real person is on screen, the story has a structure, and the motion is choreographed. Their signature moves, though, are now free tutorials, public demos or marketplace templates: the Netflix picker, the lanyard badge, the gold spotlight with stacking cards, and the multilingual preloader with a hover list. Jurors mark derivative concepts down. Awwwards weights **Design 40% and Usability 30%**, and even Site-of-the-Day portfolios score lowest on usability and accessibility, which is exactly where a full-stack engineer can outscore designers. Recruiters skim in seconds and freelance clients buy reduced risk. So every claim must be readable without animation and must link to proof: no counters, no lifted headlines, no invented numbers. The build is **Next.js 16.4 + React 19.3 + GSAP 3.15 + Lenis 1.3.26**, with all text server-rendered and WebGL and the AI widget kept out of a ≤170 KB first-load bundle, plus a motion toggle and a lighter mobile tier. Use his real face and his real voice, not a photoreal AI clone, and reseed the "Saeed and Co" dashboard with demo data before it goes anywhere public. Built part-time, the plan runs roughly ten weeks in six phases, followed by a two-to-four-week live "bake" before any award submission.

## The references win on presence and lose on provenance

All four references share three strengths. **A person is present**: Lohitha's gesturing character, Aura's spotlit figure, Devender's desk video, Sushmita's blur-to-sharp portrait. **The story has a structure**: episodes and seasons, an ID badge that flips into "what I am", milestones from 2021 to 2026. **The motion is choreographed** rather than sprinkled. This is the same discipline that award winners describe. Stefan Vitasović, a lead creative developer and Awwwards juror, calls his repeated interactions "**motion motifs** … Similar to a catchy part of a song" ([Codrops](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/)). The Awwwards-verified 2024–2026 personal winners all use **one or two colours** and build around one signature idea, for example #f40c3f on #160000 for Antoine Wodniack ([Awwwards](https://www.awwwards.com/sites/aw-portfolio)) and #8082F8 on #FFF5EE for Cyd Stumpel ([Awwwards](https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025)). One caveat: the four Instagram portfolios themselves could not be identified, so nothing is known about their awards or their real-world results.

What fails is provenance. Each reference's most memorable move now has a public source that jurors recognise. Dennis Snellenberg runs an Awwwards collection called "Copy Dennis", described as a tribute to creators who took "a little bit too much inspiration" from his portfolio ([Awwwards](https://www.awwwards.com/sites/copy-dennis-collection)). Since 2023 his preloader, hover gallery and curved menu have been a free rebuild tutorial ([Olivier Larose](https://blog.olivierlarose.com/tutorials/awwwards-landing-page)). The lanyard is Vercel's Ship 2024 badge, built in "about 80 lines of mostly declarative code" with a public sandbox ([Vercel](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)), and it now installs as a one-command React Bits component ([React Bits](https://reactbits.dev/components/lanyard)). Designer Jackie Zhang names the trap: "**The mistake was that I was translating a style instead of a concept**" ([Codrops](https://tympanus.net/codrops/2026/03/20/jackie-zhangs-portfolio-from-chasing-references-to-finding-direction/)).

| Reference | What genuinely works | What is now cloned, commoditised or risky | What survives into Dawood's site |
|---|---|---|---|
| **A. Netflix "SUSHMITA — The Series"** | A familiar mental model. A narrative frame (seasons, episodes, "to be continued"). Audience awareness. | Netflix clones are standard tutorial and coursework projects. A recruiter told one Netflix-portfolio builder it looked "over-engineered", and commenters found skills "buried under creative flair" ([Yo Motherboard](https://yomotherboard.com/question/is-my-netflix-inspired-portfolio-too-much/)). A mandatory "Who's watching?" gate triggers NN/g's audience-navigation failure modes: overlapping labels, extra work before the task, fear of missing out ([NN/g](https://www.nngroup.com/articles/audience-based-navigation/)). | A career told in "seasons". An optional, non-gating audience lens. An honest "currently building…" ending. |
| **B. Lohitha, cream** | Full-body presence and warmth. Sans plus italic-serif contrast. A skills filter that dims non-matches. | Cream plus serif display is the documented "warm editorial" second-wave AI default ([Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)). The lanyard is Vercel's public badge. A periodic table is a novelty layout for what is really a list. A photoreal AI talking clone invites "is this person real?" | The filter-and-dim interaction, repurposed as a proof matrix. A typographic gesture that has a reason behind it. |
| **C. "Aura", navy + gold** | Stage light gives presence. Architecture-metrics panels beside projects signal engineering depth. A drawn timeline. | "I build digital experiences" is generic, and v2 lifted it. Gold gradient, glow and blur-to-sharp are effects without a concept, and animating `filter: blur()` is costly ([Chrome](https://developer.chrome.com/blog/animated-blur/)). Sticky stacking cards are a published tutorial ([Larose](https://blog.olivierlarose.com/tutorials/cards-parallax)). Spotlight effects are copy-paste blocks ([Aceternity](https://ui.aceternity.com/components/spotlight)). | An architecture view beside every project. Photographic light on a real portrait. |
| **D. Devender, B&W minimal** | Restraint. A hand-drawn brush stroke. Big type lists instead of a gallery. One kinetic sentence. A giant CTA. | The multilingual preloader, curtain wipe, hover-reveal list and "let's talk" together are Snellenberg's site, and the per-letter scatter ships as a Framer component ([Framer](https://www.framer.com/marketplace/components/scatteredtext/)). | List over gallery, which current winners also choose ([Shcherban](https://tympanus.net/codrops/2026/05/02/designing-against-the-gallery-a-two-year-journey-to-a-layered-portfolio-experience/); [HAOQI](https://tympanus.net/codrops/2026/08/15/inside-haoqi-design-letting-dom-and-webgl-share-a-retro-futurist-stage/)). A short branded intro in his *own* script. One kinetic sentence. |

### Both rejected builds failed for documented reasons

The v1 champagne 3D scroll-film failed the way generic 3D usually fails. In winning portfolios, 3D carries the concept: Bruno Simon's driving world, HAOQI's refractive glass name, iTom's sketch corridor. It is never ambient wallpaper ([Awwwards](https://www.awwwards.com/brunos-portfolio-case-study.html); [Codrops](https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/)).

v2 matched almost every catalogued "AI template" tell. Its **#06090B-plus-mint palette** is the pattern Tomasz Szmajda sees in about 90% of portfolios: "**dark background, neon accent colors, text on the left, image on the right**" ([Codrops](https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/)). Its aurora glows and glass cards appear on both published tell lists ([Fountain Institute](https://pages.thefountaininstitute.com/posts/7-tells-that-a-ui-is-ai-generated); [Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)). Its giant-letter placeholders, standing in for project images, are what an Awwwards juror calls "Lorem-ipsum energy" ([Hon Tran](https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day)). Its fabricated eval figures broke the most important rule of all: "delete any number you cannot source" ([Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)). Fabrication is also a legal exposure for US-facing marketing. The FTC's 2024 rule bans fake and AI-generated testimonials, with civil penalties of about **$51,744 per violation** ([FTC](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials)).

### Beating the references means winning the axes they ignore

Each viral reference is a *costume*: a borrowed interface (Netflix, a conference badge, a stage, a famous designer's site). Dawood's site should be an *instrument*, something that demonstrates the work by doing it. It should also win where those sites are weakest. Awwwards scores **Design 40%, Usability 30%, Creativity 20% and Content 10%**. At least 18 jurors vote, and the three scores furthest from the average are dropped ([Awwwards](https://www.awwwards.com/about-evaluation/)). Across nine verified Site-of-the-Day portfolios, Usability scored only **6.92–7.3**. The accessibility developer sub-score ranged from **6.2 to 7.0**; the one exception was Cyd Stumpel's CSS-native, View-Transitions build at **7.8** ([Awwwards](https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025)). One juror adds that desktop-only builds cap at Honorable Mention ([Hon Tran](https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day)).

Hiring has the same shape. The only eye-tracking data shows a **7.4-second** first résumé pass, where simple, headed layouts held attention ([HR Dive](https://www.hrdive.com/news/recruiters-spend-74-seconds-looking-at-your-resume/541582/)). Recruiters also trust hard-to-fake public traces such as GitHub activity more than self-description ([Marlow & Dabbish](https://www.cs.cmu.edu/~xia/resources/Documents/Marlow-cscw13.pdf)). In this case the award goal and the hiring goal point the same way.

## Glass Box is the concept only Dawood can claim

### The concept comes from his facts, not from a mood board

The portfolios that last start from something true about the maker. Bruno Simon built a car game partly because "I loved Micro Machine on Playstation when I was a kid". The site drew **400,000+ visitors** and "lots of job offers" ([Pastel](https://usepastel.com/blog/how-a-design-portfolio-got-the-attention-of-400-000-visitors)). Martin Laxenaire built a scene out of his real freelance invoices ([Codrops](https://tympanus.net/codrops/2025/10/06/self-doubt-and-the-quest-for-fun-how-i-ended-up-turning-my-portfolio-into-a-game/)).

Applied to Dawood, the method looks for the most characteristic thing in his world. He runs live business systems for clients in Pakistan, Japan (BIKS, a Japanese-language marketplace) and India (SugarHills in Kerala). He builds RAG and LangGraph agents, Groq apps and n8n automations. He works across PKT (UTC+5), IST (UTC+5:30) and JST (UTC+9). The most characteristic thing in that world is a **pipeline that is live, measured and running**.

The anti-template guidance says to write the direction down before writing code: four to six named colours with roles, one or two typefaces, and "a layout concept drawn from the product" ([Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)). Then every feature must pass three tests. It should only make sense on Dawood's site. It should carry real content or proof. And it should still work for a recruiter who never touches it.

### Three directions, side by side

| | **A. Glass Box (recommended)** | **B. Lahore Standard Time** | **C. Season One** |
|---|---|---|---|
| Premise | The portfolio is an observable system. Every claim traces back to evidence. | The site is lit by the real time in Lahore. Projects sit on the route between his clients' time zones. | His career as a serialized production with seasons, episodes and credits. |
| Hero | B&W portrait, a TL;DR facts strip, and a working "Ask my work" console with three starter questions and real measured latency. | His portrait in one of four grades (dawn, day, dusk, night) matching Lahore's current time, with "your time / my time / overlap today". | A one-second production slate that resolves into a "Now showing" card with *Play intro* and *Read CV*. |
| Signature motion motif | **The trace.** A hairline draws down the page like a request trace and branches into sections. Headings stream in as tokens. Opening a project "opens the box": the paper surface flips to ink internals. | **The terminator.** A soft day/night edge wipes across sections and page transitions. | **Timecode and hard cuts.** A scroll-progress timecode scrubber, with cuts between "episodes". |
| Palette | Drafting paper #EDECE8, ink #111214, graphite #5B5D63, one ultramarine signal #2B3FE0 (#8C9BFF on ink). Green #188A49 is used only for real status. | Four light states from one ramp, with a sodium-lamp orange #F26B1D accent at dusk and night. | Projection black #0E0D0C and screen white #F2EFE8. Each episode takes an accent sampled from that client's UI. |
| Type pairing | One variable neo-grotesk for display and text, plus one mono reserved for machine data. The Urdu name is an SVG mark. | A high-contrast serif with true italics (used only for times and places), plus a grotesk for text. | A wide grotesk for episode titles, a neutral grotesk for text, and a mono for timecode. |
| What it keeps from the references | Presence (C, D), filter-and-dim (B), architecture panels (C), list over gallery (D). | Cinematic light (C), italic-serif contrast (B), B&W restraint at night (D). | Episodes and seasons (A), the audience lens (A), posters (A). |
| Main risk | The console *is* the signature. If it is slow or jailbreakable, the centrepiece becomes the weak point. | Four grades multiply the assets, the contrast checks and the QA. Jurors only ever see one state. | Reads as a Netflix clone, and its black base drifts toward the "dark signal" default. |
| Effort estimate (part-time) | About 10 weeks | About 10–12 weeks (asset-heavy) | About 8 weeks |

**Concept B** is the most cinematic option and answers a real client question: "when can we talk?" Pakistan's UTC+5 is commonly framed as full overlap with the EU working day and about four morning hours with US Eastern ([Cadence](https://cadence.withremote.ai/blog/hire-remote-developers-pakistan)). But its novelty is a visual system that changes with the clock, and that multiplies every contrast and asset decision by four.

**Concept C** channels the reference Dawood clearly loves. It is the most clone-adjacent option, though. Netflix visual language signals tutorial work, and the precedents that make film language credible ground it in real production craft: Jason Bergh's film-strip edges, credits preloader and viewfinder cursor ([Codrops](https://tympanus.net/codrops/2026/02/20/cinematic-presence-the-directors-cut-of-the-jason-bergh-experience/)).

**Concept A** is the one no template can supply. Nobody else has his clients, his live systems or his RAG stack. The chat-portfolio precedents show the feature is credible when engineered properly: toukoum's audience-aware chat portfolio ([GitHub](https://github.com/toukoum/portfolio)), and santifer.io's evals, red-teaming and cost tab ([Bright Coding](https://prompts.brightcoding.dev/blog/santifercv-santiago-production-grade-ai-portfolio-with-agentic-rag)). Plain "ask me anything" bubbles, on the other hand, are now commodity tutorials.

### Glass Box answers each reference on its own terms

The recommendation is **A, enriched with B's live overlap clock** (a supporting detail, not the concept) **and C's per-project accent colours and "seasons" timeline**. Per-project accents are an established winner pattern ([Rocca](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/); [Jonas Reymondin](https://tympanus.net/codrops/2026/03/16/jonas-reymondins-portfolio-reclaiming-the-ui-eye-through-systems-code-and-pixel-motion/)).

Glass Box also gives Dawood both moods he liked. The paper surface carries the calm of Lohitha and Devender. The ink "internals" (the Ask console, the architecture views, the footer) carry the cinematic dark of Aura and the Netflix concept, and the switch between them has a meaning: outside is the product, inside is the system.

| Reference | What it does best | How Glass Box answers it |
|---|---|---|
| Netflix series | Narrative frame, audience awareness | "Seasons" timeline. A non-gating lens (Hiring full-time / Need something built / Here for the code) that reorders content but never hides it. |
| Lohitha | Warm personal presence, playful filtering | Real portrait and real voice. A stack × project matrix where every skill lights the projects that prove it. |
| Aura | Cinematic presence, architecture beside projects | Ink "internals" with clickable architecture graphs, real latency and real status. |
| Devender | Restraint, lists, one kinetic sentence | DOM list of live systems, one scrubbed "retrieval" sentence, an Urdu name mark instead of greetings. |

The recommendation still carries real uncertainty. No study measures how recruiters react to portfolio chatbots. A chatbot annoys when it gates information, auto-opens, or answers slowly or vaguely. So the static site must stand completely on its own and the console stays optional. The fallback is also worth keeping in mind: if the console is cut, Glass Box still works as a "receipts-first" editorial site with the trace motif.

### Design system: one accent, two typefaces, a written ban list

Put the system in a `DESIGN.md` in the repo before any component exists, as the anti-slop guidance recommends ([Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)). Every AI-assisted section then gets reviewed against it.

**Colour.** The palette rejects both second-wave defaults: the paper is a neutral drafting grey, not cream, and the accent is ultramarine, not terracotta or acid green. The ultramarine is an owned choice. It nods to the tile blues of Lahore's Mughal monuments (our inference, not a sourced convention) and to the hyperlink's original colour. The contrast figures below were computed with the WCAG relative-luminance formula. Re-verify them with a checker once the values are final.

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--paper` | #EDECE8 | Default surface | — |
| `--ink` | #111214 | Text on paper; background of the "internals" | ≈15.9:1 on paper |
| `--graphite` | #5B5D63 | Secondary text, captions | ≈5.6:1 on paper |
| `--signal` | #2B3FE0 | Links, focus ring, trace head, active chip (on paper) | ≈6.2:1 on paper |
| `--signal-ink` | #8C9BFF | The same roles on ink | ≈7.4:1 on ink |
| `--live` | #188A49 | A genuine "up" status dot, always paired with a text label | ≈3.7:1 on paper (non-text, so ≥3:1 is enough) |
| `--project` | Sampled per client | Used only inside that client's case study | Check per project |

**Typography.** Use two families at most, as variable fonts loaded through `next/font`, which self-hosts at build time and generates metric-matched fallbacks to limit CLS ([Next.js](https://nextjs.org/docs/app/api-reference/components/font)).

The primary family is one neo-grotesk for both display and text. These are our suggestions, since the research did not test fonts: Switzer or General Sans from Fontshare, or PP Neue Montreal if he buys a licence. Verify each licence. Hierarchy should come from type size rather than style changes, the advice that solved Awwwards juror Artem Shcherban's own list design ([Codrops](https://tympanus.net/codrops/2026/05/02/designing-against-the-gallery-a-two-year-journey-to-a-layered-portfolio-experience/)). Avoid Inter, which is a named default ([Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)). In our judgement, also avoid Geist and Space Grotesk, which are ubiquitous in Next.js templates, and Anton, which he already rejected.

The second family is a mono, such as IBM Plex Mono or Commit Mono. It appears **only for data a machine produced**: timestamps, latency, URLs, commit hashes, status. All-caps mono eyebrow labels and "01 / 02 / 03" markers are listed second-wave tells ([Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/)).

The Urdu name داؤد احمد is never a web font. Older Noto Nastaliq Urdu builds ran about **497 KB** ([Google Fonts PR](https://github.com/google/fonts/pull/7950)), and Nastaliq needs a line-height of about 1.8 ([Open Design](https://open-design.ai/fr/plugins/design-system-urdu/)). So ship it as an SVG path traced from a refined rendering or a commissioned calligrapher, always shown with its transliteration. Use it once in the intro and once in the footer. The Arteco site's pairing of a modern sans with a heritage script is the model ([Fonts In Use](https://www.fontsinuse.com/uses/36815/arteco-website)). Truck-art colour stays out entirely, because the style is already heavily commodified ([Rutgers VTC](https://vtc.rutgers.edu/?p=12281)).

**Grid, motion and imagery.** Use a Swiss-style offset grid, 10 columns on desktop and 4 on mobile, instead of the 12-column default that 2026 trend writers call tired ([Envato](https://elements.envato.com/learn/web-design-trends)).

Motion tokens are about **150 ms** for hover and focus, **280 ms** for UI, **600 ms** for reveals, and **at most 1,200 ms** for the intro. Halve them on mobile; Bergh's site cuts transitions from 0.6 s to 0.3 s there ([Codrops](https://tympanus.net/codrops/2026/02/20/cinematic-presence-the-directors-cut-of-the-jason-bergh-experience/)). The default ease is `power3.out`, wipes use a `CustomEase` "aperture" curve of `0.76,0,0.24,1`, and anything scrubbed uses `none`. Only `transform`, `opacity` and `clip-path` ever animate, which is Gradogna's "Position, Opacity, and Clip Masks" discipline ([Codrops](https://tympanus.net/codrops/2025/01/30/case-study-gianluca-gradogna-portfolio-25/)).

The portrait is graded B&W. Project media stays full colour inside one identical "monitor" frame, with a mono caption strip showing the real URL and real status. The shared frame unifies mismatched client screenshots the way winners use a single shader "lens" ([Vitasović](https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/)).

The ban list covers emoji icons, glass panels, aurora gradients and a default bento grid. It also covers any status dot not backed by a real check, because "status dots attached to everything" is a named tell ([Fountain Institute](https://pages.thefountaininstitute.com/posts/7-tells-that-a-ui-is-ai-generated)). Keep the native cursor: jurors count a custom cursor that hides the real one as an accessibility fault ([Hon Tran](https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day)).

## Eleven routes, two front doors, one signature

### The site map deep-links each audience past any picker

NN/g's research says audience self-classification should be secondary to task navigation ([NN/g](https://www.nngroup.com/articles/audience-based-navigation/)). Dawood controls most of his high-value entry links, so the strongest conversion lever is **deep links**. CV, LinkedIn and job applications point to `/resume`. Upwork, Fiverr and WhatsApp proposals point to `/hire`. GitHub READMEs point to the matching case study. Visitors arriving by those routes never see a picker. The home page shows universal content at once, with a dual CTA as the lightweight form of the picker.

| Route | Primary audience | Purpose | Primary CTA |
|---|---|---|---|
| `/` | Everyone | TL;DR, live systems, Ask console, proof | Read my CV / Start a project |
| `/work` | Both | The full live-systems board with filters | Open a case study |
| `/work/[slug]` (6) | Both | Case studies: Ibrahim Business Manager, E-Masjid, BIKS Trading, SugarHills, RAG support agent, FreelanceHub (default picks; see decisions) | Live / Code / Hire |
| `/archive` | Engineers, recruiters | Every one of the 25+ projects with year, stack and link. This is what makes "25+" checkable. | GitHub |
| `/resume` | Recruiters | One-screen summary, timeline, skills matrix, verifiable credentials, PDF CV, print stylesheet | Download CV / Email |
| `/hire` | Clients | Packages with "starting from" prices, process, timelines, FAQ, channels | Book a call / WhatsApp |
| `/about` | Both | Story, real intro video, portrait; `ProfilePage` JSON-LD lives here | Watch intro |
| `/now` | Both | What he is building this month, and from where | — |
| `/colophon` | Engineers, jurors | How this site is built: budgets, Lighthouse runs, reduced-motion design, Ask architecture and evals | View source |
| `/contact` | Clients | A plain form (never an LLM tool) plus every channel | Send |
| `/llms.txt` (+ optional `/mcp`) | AI agents | Machine-readable résumé and projects (Phase 6) | — |

Clients and recruiters convert on different events. Recruiters download the CV or email; clients book or message on WhatsApp. So each page gets one primary CTA for its audience, with the other audience's CTA as secondary. Log these events with privacy-friendly analytics so the audience lens is validated rather than assumed. No research shows such pickers work on personal portfolios.

### The home page reads in ten seconds and rewards three minutes

The home page is designed for a two-stage read. Stage one is a skim of about ten seconds: who, role, stack, years, location and time zone, availability, CV. Stage two is a one-to-three-minute dig into two to four case studies. All draft lines below are suggestions to be verified and reworded by Dawood. None may ship unless it is true.

| # | Section | What it shows | Copy direction (drafts) | Action |
|---|---|---|---|---|
| 0 | Intro (first visit only, ≤1.2 s) | داؤد احمد draws in Nastaliq and resolves to "Dawood Ahmed". An aperture opens onto an already-painted hero. | Only the name | Skip intro |
| 1 | Hero | Name, role line, facts strip (Next.js · Laravel · MERN · applied GenAI · ~3 years · Lahore, PKT UTC+5 · availability). B&W portrait with a live Lahore clock. Audience lens. Ask console with three starter chips. | "I build the software businesses open every morning, and the AI that answers for them." Console: "Ask my work a question. Answers cite my case studies." | Read my CV / Start a project |
| 2 | Running right now | Four client systems as a real `<a href>` list: client type and country, his role, stack, year, verified status. A fixed monitor pane plays the selected loop. | Lead with role and outcome, not stack. Example shape, only if true: "Japanese-language machinery marketplace · sole developer". | Open the box |
| 3 | Inside one system | One clickable architecture graph (RAG agent or Ibrahim ERP). Each node opens "why this choice". | One opinion of his own, e.g. when *not* to use an LLM. | Read the case study |
| 4 | What I reach for | A stack × project matrix with filter chips. Choosing "Laravel" lights the projects that prove it. | "Every skill here links to where I used it." | Filter |
| 5 | Retrieval (showpiece) | Fragments of real case-study sentences fly together into one sentence as you scroll. | A sentence in his own voice about how he works. | — |
| 6 | Seasons | A trace waterfall from 2023 to 2026: RISS internship 2023, freelance since Oct 2023, Sky Waves 2026, Techling Jun 2026 to now, BS IT 2026, NCEAC/HEC Generative AI Top Performer 2026. | Exact dates and roles. "Details limited by NDA" for employer work. | View résumé |
| 7 | Receipts | Verification links for the award, the degree, GitHub, named LinkedIn recommendations, and platform reviews only if they exist. | No counters. | See the archive |
| 8 | Overlap | Visitor's time vs PKT, overlap bars for UK/EU, Gulf and US-East, and a four-step process. | Commit only to hours he will actually keep. | Book / WhatsApp |
| 9 | Footer | Big CTA, channels, the site's own pipeline strip: deployed commit, build time, Lighthouse score, Ask median latency. All values computed, never typed. | "Bring me the messy spreadsheet." / "Tell me what's slow, manual or breaking." | Email / Book / WhatsApp |

The audience lens deliberately reworks the Netflix picker. It is a small chip row (Hiring full-time · Need something built · Here for the code · Show everything) that appears over already-rendered content. It reorders sections 2–8 and swaps the primary CTA, persists in `localStorage`, and stays switchable from the header. This follows NN/g's mitigations: plain "For …" labels, previews of what each path contains, and easy switching ([NN/g](https://www.nngroup.com/articles/audience-based-navigation/)). The Netflix ending, "To be continued…", survives as the `/now` line at the foot of the page, the convention for what "you'd tell a friend you hadn't seen in a year" ([nownownow](https://nownownow.com/about)).

### Case studies, the résumé and the hire page follow proof-first templates

**Case studies** follow a scannable template with the result at the top: context, problem, constraints, role, approach, decisions, result and lessons ([TieTalent](https://tietalent.com/en/blog/220/beyond-the-ats-how-to-build-a-tech-portfolio); [GigRadar](https://gigradar.io/lesson/portfolios-that-sell)). Each page uses the same parts in the same order:

| Part | Content |
|---|---|
| Hero strip | Client type and country, year, Dawood's exact role, stack chips, Live and Code links, and a one-line outcome. Private repos say "Code private — client project" instead of showing a dead link ([DEV](https://dev.to/_d7eb1c1703182e3ce1782/developer-portfolio-checklist-20-things-hiring-managers-look-for-388p)). |
| Trace waterfall | The project phases, with durations only if he actually knows them. |
| Problem and constraints | What the client needed and what limited the solution. |
| Architecture graph | A clickable diagram of the system. |
| Decisions | Two or three choices with their trade-offs, e.g. Japanese-language UI and listing search on BIKS, or the booking flow on SugarHills. |
| Result | Honest proxies: "live since [year]", "client still running it in 2026", reproducible Lighthouse scores, languages supported, or a permissioned quote. Never a percentage he cannot source. |
| Visuals | Three to six screenshots or loops. |
| What I'd do next | Lessons, which signal seniority. |

Each case study runs 600–1,200 words. Six of them also keeps the portfolio under GigRadar's warning that more than six to eight pieces is a mistake.

**`/resume`** is a one-screen summary plus timeline, skills matrix, credentials with verification links, and an ATS-friendly single-column PDF. Use international format: no photo, CNIC, date of birth or marital status, which domestic South Asian CVs often include. It also gets a print stylesheet.

**`/hire`** offers three or four packages: a business website, a web app or MVP, AI/RAG and automation integration, and a care plan. Each shows a "starting from" price, the hybrid most often recommended ([Sagan Morrow](https://saganmorrow.com/?p=15774)), though no controlled study exists either way. The page also covers the process, typical timelines, and a FAQ on code ownership, hosting, revisions and milestone payments. Contact channels sit side by side: a booking link, WhatsApp click-to-chat, email, and Upwork or Fiverr links where those profiles exist.

Overseas clients start with a trust deficit, because same-country pairs build trust more easily ([BU working paper](https://questromworld.bu.edu/platformstrategy/wp-content/uploads/sites/49/2019/07/PlatStrat2019_paper_38.pdf)). Effective trust signals are the ones that are costly to fake ([DPRG 2025](https://doi.org/10.1108/DPRG-06-2025-0169)). So `/hire` foregrounds the real intro video, the overlap hours and milestone billing, not badges.

### Copy rules keep it human and true

Write the way he would talk to a friend, and read every line aloud ([Paul Graham](https://paulgraham.com/talk.html)). In practice that means specific nouns (client industry, city and country, stack), the first person with active verbs, one opinion per section, and admitting limits by referring out the work he doesn't do.

**Ban list.** Any phrase that could sit unchanged on someone else's portfolio is banned, including every rejected-build line: "I build digital experiences", "Selected works", "Engineered value", "Passionate full-stack developer", "Turning ideas into reality" and "let's talk."

**Client copy.** "Connect. Pray. Give back.", "Serving the community since 1985" and "Wake up above the clouds" belong to his clients. They may appear inside screenshots, captioned as the client's content, but never as his claims.

**No hidden AI instructions.** Never put hidden instructions for AI screeners in the site or CV. Greenhouse found them in about **1%** of résumés it reviewed in H1 2025, and recruiters now hunt for them ([Boston Globe](https://www.bostonglobe.com/2025/10/07/business/ai-resumes-jobs-recruiters-applications)).

### Every effect gets a job, a library and an exit

The motion architecture follows the pattern award-winning Next.js builds converge on. A single client-only `lib/gsap.ts` registers ScrollTrigger, SplitText, DrawSVG, Flip, CustomEase and MotionPath once. A `SmoothScroll` provider drives Lenis from `gsap.ticker`, calls `ScrollTrigger.update` on scroll, and sets `lagSmoothing(0)` ([Lenis](https://github.com/darkroomengineering/lenis)). Each section owns one `useGSAP({ scope })` timeline, which reverts on unmount and is Strict-Mode safe ([GSAP](https://gsap.com/resources/React/)). Responsive and reduced-motion branches run through `gsap.matchMedia()` conditions, which auto-revert ([GSAP](https://gsap.com/docs/v3/GSAP/gsap.matchMedia())). One clock drives scroll, tweens and any shader uniform, as jurors recommend ([Hon Tran](https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day)).

A tiny inline script assigns each visitor a tier before first paint. **Tier C (reduced)** applies when `prefers-reduced-motion` is set or the site's own Motion toggle is off. **Tier B (mobile-lite)** applies for coarse pointers, widths under 768 px, Save-Data or slow connections, or four or fewer CPU cores. Everyone else gets **Tier A (full)**. `deviceMemory` is Chromium-only, so it is only a hint ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory)). The visible toggle is itself a sufficient technique for WCAG 2.3.3 ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).

| Section | Effect | Library / API / technique | Key parameters | Tier C (reduced) | Tier B (mobile-lite) |
|---|---|---|---|---|---|
| Global scroll | Smooth wheel | Lenis 1.3.26 via `ReactLenis root`, `autoRaf:false`, ticker sync | `smoothWheel:true`, `syncTouch:false`, `anchors:true`; `data-lenis-prevent` on console and modals; move focus after `scrollTo` | Off (native) | Not initialised (native touch) |
| Intro | Nastaliq stroke draw → Latin name → aperture opens | GSAP DrawSVG on the SVG mark; `clip-path: circle()` on a fixed overlay; `sessionStorage` gate; `lenis.stop()`/`start()`; `inert` on content underneath | ≤1.2 s; "Skip intro" is the first tab stop; Esc skips; first visit only | Skipped | 0.6 s fade only |
| Hero text | LCP-safe reveal | `<h1>` server-rendered and visible. SplitText lines with `mask:"lines"`, small `yPercent` offset, opacity never 0; `split.revert()` on complete | `autoSplit:true` and animations built in `onSplit`, after `document.fonts.ready` | No animation | Words, not chars |
| Portrait | Living portrait | Real cinemagraph as muted AV1/H.264 loop, or a 2.5D depth shader on OGL (~8 KB core) loaded after LCP | Poster AVIF ≤150 KB preloaded with `fetchpriority="high"`; DPR cap 1.5–2; pause offscreen; visible Pause control (WCAG 2.2.2) | Static photo | Static photo |
| Trace spine | Line draws with scroll; a signal-blue packet leads it | SVG path + DrawSVG, ScrollTrigger `scrub:true`, `ease:"none"`; MotionPathPlugin for the packet | Draw to 102% to cover Firefox stopping short ([DrawSVG](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)) | Line shown fully drawn | Straight path, no packet |
| Section headings | Token-stream reveal with a trailing caret | SplitText `type:"words"`, `mask:"words"`, `aria:"auto"` | Stagger 0.035–0.05 s, 0.5 s, `power3.out`; revert after | Instant | Lines instead of words |
| Ask console | Streaming answer, citations, span bars, generative-UI cards | AI SDK `useChat`, imported on focus; typed `tool-*` parts render components ([AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)); span bars `scaleX` | Real measured retrieve/generate milliseconds | Bars appear without scaling | Same features, lighter layout |
| Live systems board | Monitor pane swaps the loop; row indicator; status | DOM list of `<a>`. GSAP `clip-path: inset()` wipe on the monitor (≈0.45 s); `quickTo` row indicator; IntersectionObserver plays only the visible video | Preview on hover *and* `:focus-visible`; Esc dismisses (WCAG 1.4.13) | 150 ms crossfade on posters | Inline poster thumbnails; tap opens the case study |
| Row → case study | "Open the box": shared-element morph, paper flips to ink | React `<ViewTransition>` with a per-project `name`, `share="morph"`, `transitionTypes={['nav-forward']}` ([Next.js](https://nextjs.org/docs/app/guides/view-transitions)) | ≈500 ms group animation; `::view-transition { pointer-events:none }` | Crossfade or instant | ≈300 ms |
| Architecture graph | Edges draw, nodes open panels | Static SVG + DrawSVG stagger; React Flow lazy-loaded only on interaction | Click or Enter opens a "why this choice" panel | Static diagram | Static SVG, tap nodes |
| Stack matrix | Chips dim non-matching cells | GSAP grid stagger `from: clickedIndex` (Motion lacks grid stagger ([Motion](https://motion.dev/docs/gsap-vs-motion))); Flip for reorder; `aria-pressed` on chips | Dimmed cells stay focusable | Instant state change | No stagger |
| Retrieval showpiece | Scattered fragments assemble into one sentence | One pinned ScrollTrigger, `scrub:1`, a single timeline (not one trigger per char), `gsap.utils.random` start positions | One pin only; `invalidateOnRefresh`, `anticipatePin:1` | Static sentence | Not pinned; words fade in once |
| Seasons | Waterfall bars grow; spine draws | CSS `animation-timeline: view()` inside `@supports`, with a GSAP ScrollTrigger fallback because Firefox still ships it behind a flag ([buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)) | `scaleX` from 0, `transform-origin:left` | Bars static | Simplified |
| Overlap clock | Live times and overlap bar | `Intl.DateTimeFormat`, CSS transitions | Update every 30 s | No motion | Same |
| Footer CTA | Headline rises; underline draws | SplitText chars masked once; DrawSVG underline; no magnetic button | Plays once | Static | Static |

Two rules govern the hero, because Core Web Vitals punish exactly what award sites like to do. First, **never start the LCP element at opacity 0.** Chromium excludes opacity-0 elements from LCP, and since Chrome 130 it also excludes transparent text, so a hidden-then-revealed headline adds its whole delay to LCP ([Chromium](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2024_10_lcp.md); [web.dev](https://web.dev/articles/lcp)). That is also why Glass Box has no gradient text in the hero. Second, **paint the content under the intro.** The intro is an overlay above already-painted, server-rendered content, and it never hides `<html>` or `<body>`. Whether an overlay covering painted content delays LCP is unverified, so lab-test it in the DevTools Performance panel and cut the intro if it costs time.

WCAG 2.2 adds three duties on top. Any draggable element needs a non-drag alternative (2.5.7). Targets must be at least 24×24 px (2.5.8). Focus must never be fully hidden by sticky or overlay elements (2.4.11) ([W3C](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)).

## Next.js 16, GSAP and Lenis, with WebGL and AI off the critical path

### The stack, pinned to October 2026 versions

| Layer | Choice | Version | Why | Cost to the first load |
|---|---|---|---|---|
| Framework | Next.js App Router | **16.4.0** (upgrade from ^15.3.0) | Stable `<ViewTransition>`, no config ([Next.js](https://nextjs.org/docs/app/guides/view-transitions)) | Baseline (previous build ≈118 KB) |
| UI runtime | React | 19.3.0 | Ships `<ViewTransition>`; inside R3F's `>=19 <19.4` peer range if 3D ever returns ([npm](https://registry.npmjs.org/@react-three/fiber/latest)) | — |
| Choreography | gsap + @gsap/react | 3.15.0 + 2.1.2 | 100% free since 3.13, including SplitText, DrawSVG and MorphSVG ([GSAP](https://gsap.com/blog/3-13/)) | ≈28.3 + 18.0 + 3.7 KB gz (core, ScrollTrigger, SplitText) ([unpkg](https://unpkg.com/gsap@3.15.0/dist/)) |
| Smooth scroll | lenis | **1.3.26** (repo pins 1.2.3) | Native scroll, so sticky positioning and anchors keep working | ≈5.5 KB gz ([bundlephobia](https://bundlephobia.com/api/size?package=lenis)) |
| Layout/mount animation | Motion 14.1.0 | **Skip** | GSAP Flip plus native View Transitions cover it; saves ≈30 KB (`m` + `domMax`) ([Motion](https://motion.dev/docs/react-reduce-bundle-size)) | 0 |
| WebGL | OGL | current | ≈8 KB core, enough for the portrait depth shader ([OGL](https://github.com/oframe/ogl)) | 0 (post-LCP, Tier A only) |
| AI | AI SDK + Groq (Llama 3.1 8B Instant) + Upstash Ratelimit | current | Streaming plus generative UI; fast, cheap inference | 0 (imported on focus) |
| Diagrams | Static SVG; React Flow on interaction | current | Clickable architecture views | 0 initially |
| SEO | Metadata API, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, JSON-LD typed with `schema-dts` | built in | Each case study is its own indexable, shareable URL | — |
| Monitoring | `@vercel/speed-insights` 2.0.0 + Web Analytics; Upptime for client uptime | 2.0.0 | Real-user P75 field data; free GitHub-Actions uptime checks every 5 minutes ([Upptime](https://github.com/upptime/upptime)) | ≈small |
| QA | Lighthouse CI, Playwright + `@axe-core/playwright` | current | Gates every deploy | — |

GSAP's licence is free but **not open source**. Its one restriction targets no-code visual animation builders that compete with Webflow, so it does not affect a portfolio ([GSAP](https://gsap.com/standard-license/)). Styling should be CSS Modules plus custom-property tokens, with no UI kit, because a uniform "card kit" is itself a listed tell. Avoid three.js unless the physics-object decision below goes the other way. three is about 185 KB gzipped, R3F adds 57 KB, and Rapier's physics WASM is **1.17–1.65 MB gzipped**, more than the entire rest of the site ([bundlephobia](https://bundlephobia.com/api/size?package=three); [unpkg](https://unpkg.com/@dimforge/rapier3d-compat@0.21.0/?meta)).

### Upgrade to Next.js 16 now, while the codebase is tiny

**Recommendation: upgrade in Phase 0.** The repo holds only Next ^15.3, React ^19.1 and Lenis 1.2.3, so migrating now should cost little (our estimate) and buys three things. Route transitions become native, because React 19.3's `<ViewTransition>` works in the Next 16 App Router "with no configuration". On Next 15 the same feature sits behind `experimental.viewTransition` with `unstable_ViewTransition`, and its own docs call it "not recommended for production use" ([Next.js 15 docs](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition)). React 19.3 also stays inside R3F's peer range should 3D ever return, and current documentation and examples target 16.4.

The one known change that touches this plan: in `opengraph-image`, `params` became a Promise in v16.0.0 ([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)). Other v16 breaking changes were not researched, so run the full build and test pass after upgrading.

Staying on 15.5.x is viable, since it still receives backports, but only if Dawood accepts doing page transitions with a `template.tsx` GSAP curtain instead of native morphs. That would give up the "open the box" shared-element transition, the Glass Box's second-best moment.

### "Ask my work" must be engineered like a product, at near-zero cost

**Corpus and model.** The corpus is small: six case studies, the CV, the `/hire` FAQ and `/now`. Embed it at build time into a JSON vector file, or pass it to the model whole if it fits. Serve answers with Groq's Llama 3.1 8B Instant, which aggregators price at about **$0.05/$0.08 per million input/output tokens**. That puts 1,000 three-thousand-token chats at roughly **$0.17** (our arithmetic; verify in the Groq console) ([aipricing.guru](https://www.aipricing.guru/groq-pricing/)). Groq's free-tier limits apply organisation-wide, so per-IP limiting matters more than money ([fast.io](https://fast.io/resources/groq-rate-limit/)).

**Answers as interface.** Use the AI SDK's tool parts to render answers as real UI: `tool-showProject` returns a project card, `tool-showArchitecture` returns the graph, and `tool-showAvailability` returns the overlap clock ([AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)).

**Guardrails.** OWASP says "no foolproof prevention method is known" for prompt injection ([OWASP](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)), so layer the defences. Rate-limit with an Upstash sliding window of about 10 requests per minute per IP ([Upstash](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)), backed by a daily global budget kill-switch. Cap `max_tokens` around 400 and inputs near 500 characters. Give the model **no side-effecting tools**: the contact form stays a normal form. Keep the corpus static, with no browsing. Put a canary token in the system prompt and allowlist outbound links. Add Cloudflare Turnstile only if abuse appears.

**Honesty and resilience.** Label the console "AI assistant, not Dawood". Make it answer "I don't know" and hand off to booking for anything commercial. Cache the three starter-chip answers at build time so the hero never shows an error.

**Evals.** santifer.io blocks deploys on 71 tests ([Bright Coding](https://prompts.brightcoding.dev/blog/santifercv-santiago-production-grade-ai-portfolio-with-agentic-rag)). A smaller CI suite of golden questions and adversarial prompts gives Dawood **real eval numbers to publish on `/colophon`**. That is the honest replacement for v2's invented eval card.

### Budgets turn "award-level" into pass/fail numbers

| Budget | Target | Basis |
|---|---|---|
| LCP | ≤2.5 s at P75 mobile (aim ≤2.0 s in lab) | Good threshold ([web.dev](https://web.dev/articles/vitals)) |
| INP | ≤200 ms | Taps and clicks only; scroll is not counted ([web.dev](https://web.dev/articles/inp)) |
| CLS | ≤0.1 (aim ≤0.05) | web.dev; Utsubo self-target |
| FCP / TTFB | ≤1.8 s / <800 ms | Vercel Speed Insights targets ([Vercel](https://vercel.com/docs/speed-insights/metrics)) |
| Home first-load JS | ≤170 KB gz, hard ceiling 200 KB | ≈118 KB baseline + ≈50 KB GSAP + ≈5.5 KB Lenis |
| WebGL | Post-LCP, Tier A only, DPR ≤2, paused offscreen | Jurors want heavy WebGL dynamically imported ([Hon Tran](https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day)) |
| AI widget | 0 KB initial | Load on demand ([Next.js](https://nextjs.org/docs/app/guides/lazy-loading)) |
| Hero poster | AVIF ≤100–150 KB, preloaded with `fetchpriority="high"` | `fetchpriority` cannot be set on `poster` itself ([web.dev](https://web.dev/articles/lazy-loading-video)) |
| Hero loop | ≤1–1.5 MB mobile, ≤3 MB desktop, no audio track | Engineering estimate |
| Project loops | ≤2–4 MB each, `preload="none"`, played only in view | web.dev lazy video |
| Fonts | 2 families; display WOFF2 ≤40–60 KB | next/font guidance |
| Intro | ≤1.2 s, first visit only, skippable | "A six-second progress bar is a usability penalty wearing a costume" ([Hon Tran](https://www.hontran.dev/blog/how-to-win-an-awwwards-site-of-the-day)) |
| Accessibility | WCAG 2.2 AA plus the 2.3.3 toggle; zero axe violations; body contrast ≥4.5:1 | Beat SOTD accessibility sub-scores of 6.2–7.0 |
| SEO | All text in view-source; links as `<a href>`; `ProfilePage` on `/about` | Google renders JS late, and "not all bots can run JavaScript" ([Google](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)) |

**Testing.** Run lab tests with Lighthouse's default mobile profile: Slow 4G with 150 ms RTT and 1.6 Mbps, plus a 4× CPU slowdown ([Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md)). Field data comes from Vercel Speed Insights. It measures only hard navigations, so also load case studies directly ([Vercel](https://vercel.com/docs/speed-insights/metrics)).

**Structured data.** Google's `ProfilePage` markup (updated 2026-09-08) is invalid on a home page dominated by non-profile content. Put it on `/about`, give the `Person` a stable `@id` with `sameAs` links to GitHub, LinkedIn, Upwork and Fiverr, and use the descriptor "Dawood Ahmed — Full-Stack & GenAI Developer" to separate his name from others sharing it ([Google](https://developers.google.com/search/docs/appearance/structured-data/profile-page)).

### Real face, real voice, seeded data

**Photo direction.** His one asset, a 2048×2048 chest-up headshot on dark grey, already suits Glass Box, because the concept needs no full-body figure. A half-day shoot would still lift the site; photographer rates in Pakistan were not researched. The shot list is a tight portrait, a three-quarter seated shot at a desk with a laptop (lamp key, graded B&W), and a standing three-quarter shot. Shoot all three on mid-grey seamless with a soft key and a rim light to separate the navy blazer from the background. For each pose, also record 10–20 seconds of locked-off 4K video as cinemagraph raw material.

**The living portrait.** Turn the portrait into motion without AI risk in one of two ways. Mask a real cinemagraph in DaVinci Resolve (free) and loop it at 4–6 seconds under 1 MB. Or render an offline 2.5D loop with DepthFlow, which produces seamless loops but is **AGPL**, so use it as a tool and never ship its code ([PyPI](https://pypi.org/project/depthflow)). Jake Archibald's rule applies here: "Where possible, build animations with web technologies instead of video" ([Jake Archibald](https://jakearchibald.com/2024/video-with-transparency/)).

| Video option | Tools and cost (Oct 2026 snapshots) | Best use | Authenticity risk | Verdict |
|---|---|---|---|---|
| Real 45–60 s intro in his own voice | Phone, lav mic and desk lamp; WebVTT captions; host in `/public` or on Mux's free tier | `/about`, `/hire`, "Watch intro" button | None | **Do this** |
| Real cinemagraph | Locked-off takes, free tools | Silent hero motion | None | **Recommended hero motion** |
| AI silent loop from photo (Lohitha-style) | Google AI Pro, **Rs 5,600/month billed in PKR** ([ProPakistani](https://propakistani.pk/2026/04/01/google-nearly-doubles-storage-and-ai-package-prices-in-pakistan/)). 1,000 Flow credits ≈ 50 Veo 3.1 Fast or 10 Quality clips ([SaaS CRM Review](https://saascrmreview.com/google-flow-pricing/)). Clips are 8 s; Pro output reportedly carries a visible watermark; SynthID is always embedded ([BGR](https://www.bgr.com/tech/those-amazing-veo-3-videos-will-finally-tell-you-they-were-made-with-ai/)) | Decorative only, disclosed | Medium | Optional |
| His photo lip-synced to his own recorded audio | Hedra Basic **$15/mo** ([Magic Hour](https://magichour.ai/blog/guide-to-hedra-ai)); HeyGen Creator **$29/mo**, Avatar IV 16 credits/min ([HeyGen](https://help.heygen.com/en/articles/11269603-heygen-avatar-iv-complete-guide)); Kling Avatar API ≈$0.056/s at 720p ([Kling](https://kling.ai/dev/pricing)). USD billing needs a card with international recurring payments enabled ([Evertry](https://evertry.co/blog/how-to-buy-chatgpt-plus-in-pakistan-even-if-your-local-card-doesnt-work/)) | Stylised or disclosed only | High if undisclosed | Avoid photoreal |
| Synthetic-voice talking clone | Veo dialogue fits 8 s, and the voice is not his | — | Highest | Avoid |
| Sora 2 | App shut down 26 Apr 2026; API 24 Sep 2026 ([Wikipedia](https://en.wikipedia.org/wiki/Sora_(text-to-video_model))) | — | — | Unavailable |

The case against a photoreal AI "Dawood" is about trust, not technology. In Checkr's 2025 survey, **62%** of hiring professionals said job seekers now fake identities with AI better than HR can detect it ([Checkr](https://checkr.com/resources/articles/hiring-hoax-manager-survey-2025)). One recruiter caught avatar candidates because their delivery had a polish that "never faltered" ([The Next Web](https://thenextweb.com/news/ai-avatars-job-interviews-candidates-recruiters)). Flow may also block uploads of realistic people, though that evidence is user reports, not official policy ([APIPass](https://apipass.dev/blogs/google-flow-errors-troubleshooting-guide)). For a Pakistan-based developer selling to Japan, India, the Gulf and the West, "is this person real?" is the question the site must never raise.

**Project recordings.** The current 1366×640 screenshots will look soft on retina screens. Recapture everything at DPR 2 (≥2732 px wide) in a clean Chrome profile. Screen Studio is Mac-only, so on Windows use Cap (free for personal use; about **$58** for a commercial licence) or FocuSee ([Hinto AI](https://hintoai.com/blog/alternatives/screen-studio-alternatives)). Take full-page stills with DevTools' "Capture full size screenshot" ([Umaar](https://umaar.com/dev-tips/151-screenshot-capture/)). Each 6–12 s loop moves from the hero through a smooth scroll to one key interaction: listing search on BIKS (with English annotations over the Japanese UI), the booking flow on SugarHills, prayer times or donations on E-Masjid. Serve video at its displayed size and strip the audio track, which saves 10–30% ([ImageKit](https://imagekit.io/blog/nextjs-video-optimization/)). Encode AV1 first, with an H.264 fallback and an AVIF poster. These are starting points to tune by eye:

```bash
ffmpeg -i in.mov -vf "scale=1440:-2,fps=30" -an -c:v libaom-av1 -crf 34 -cpu-used 3 -pix_fmt yuv420p -movflags +faststart loop.av1.mp4
ffmpeg -i in.mov -vf "scale=1440:-2,fps=30" -an -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart loop.h264.mp4
```

**Anonymisation and permissions.** These are on the critical path. "Gib software image 1.png" shows **real "Saeed and Co" sales, bank-balance and pending-payment figures**. It must not ship. The preferred fix is to run the app against a seeded demo database with a fictional company, SKUs, PKR amounts and dates, and label the result "demo data". Blurring is the fallback, but it reads as visibly censored and less premium. Ibrahim Business Manager has no screenshot yet, so capture it the same seeded way. Every client needs a written yes before the site uses their name, logo, URL, UI or uptime monitoring. Where permission is refused, re-create the screens and label them "Confidential client — re-created screenshots" ([Wonderlist](https://www.wonderlist.design/insights/showcasing-work-under-nda)).

## Ten weeks, six phases, and a bake before any award

The schedule assumes about 15–20 hours a week alongside the Techling job. It is an estimate, not a sourced figure. Its key principle: the **plain, motion-off site is built first and must be complete on its own**, so animation can only add value, never hold content hostage.

| Phase | Weeks | Deliverables | Exit criteria (milestone) |
|---|---|---|---|
| **0. Decide and direct** | 1 | Answers to the open decisions below. `DESIGN.md` (tokens, type, signature moment, motion budget, ban list). Content inventory. Permission emails to all four clients. Upgrade to Next 16.4 and Lenis 1.3.26. | `DESIGN.md` merged. Every client has a permission status. Copy outline approved by Dawood. |
| **1. Content-first static build** | 2–3 | All 11 routes server-rendered with real copy and interim images. Metadata, OG images, JSON-LD, sitemap, robots. ATS PDF CV. `/resume` and `/hire` complete. | Motion-off site shippable. Lighthouse mobile lab LCP ≤2.0 s. Zero axe violations. Every claim links to evidence. Deploy as v0 so indexing starts. |
| **2. Asset production** (parallel) | 2–5 | Photo shoot or regrade, cinemagraph, real intro video with captions, DPR-2 project loops, seeded ERP and dashboard captures, architecture SVGs, Urdu SVG mark. | All media inside budget. Permissions logged. No real client financial data anywhere. |
| **3. Motion system** | 4–6 | `lib/gsap.ts`, SmoothScroll provider, tier script and Motion toggle. Intro, hero, trace, token headings, systems board and monitor, view transitions, matrix, Seasons, retrieval showpiece. | Each section passes Tier B and Tier C checks. First-load JS ≤170 KB. No long tasks over 50 ms while scrolling on a 4×-throttled profile. |
| **4. Glass-box features** | 6–7 | Ask console (corpus, Groq, generative UI, guardrails, eval suite in CI). Upptime board for consenting clients. Footer pipeline strip. `/colophon`. | Golden and adversarial suites pass and block deploys on failure. Rate limits and the global kill-switch verified. Cached starter answers work with the API offline. |
| **5. Harden and launch** | 8 | Full QA: iOS Safari and a mid-range Android, NVDA/VoiceOver, keyboard-only, Ctrl+F in pinned sections, 200% zoom and 320 px reflow. Search Console. Analytics events. Deep links swapped into LinkedIn, CV, Upwork and GitHub. | Every gate in the definition of done below is green. |
| **6. Bake and submit** | 9–12 | Two to four weeks live. Fix field-data regressions. Write the site's own case study. Submit to Awwwards (~$75), CSSDA ($49) and FWA (free–$35) ([Utsubo](https://www.utsubo.com/blog/award-winning-website-design-guide)). Optional `llms.txt`/MCP endpoint and `/hire/*` SEO pages. | Speed Insights P75 is green on mobile. No open P1 bugs. |

Several winners spent most of their effort here. Thibault Guignand says most of his timeline went into making desktop, tablet, mobile and reduced motion all behave ([Codrops](https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/)). iTom's builders moved shader warm-up into the preloader after visitors complained about waiting twice ([Codrops](https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/)). Plan Phase 5 as real work, not polish.

### The definition of done is a set of gates, not a feeling

| Gate | Passes when |
|---|---|
| Truth | Every number, credential, client name and quote links to evidence or has written permission. No phrase from the ban list. No client copy presented as his. |
| Skim | Name, role, stack, years, location and time zone, availability and CV are readable at first paint with JS disabled. |
| Performance | Lab mobile LCP ≤2.0 s, CLS ≤0.05, TBT <200 ms (median of 5 runs). Field P75 LCP ≤2.5 s, INP ≤200 ms. First-load JS ≤170 KB gz. No three/Rapier/AI code in initial chunks. |
| Motion ethics | Intro ≤1.2 s, skippable, first visit only. Any loop longer than 5 s has a Pause control. Tier C removes all non-essential movement. The Motion toggle persists. |
| Accessibility | Zero axe violations. Keyboard-only path through intro, lens, board, matrix and console. Focus never obscured. Targets ≥24 px. Hover previews also open on focus and close on Esc. Split text reads as words in NVDA and VoiceOver. |
| Mobile | Tier B looks designed, not shrunk. One pin at most on iOS, with `ignoreMobileResize` ([GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/)). Tested on a real mid-range Android. |
| AI safety | Eval and red-team suites pass in CI. Rate limits verified. "AI, not Dawood" label shown. No side-effecting tools. |
| SEO | View-source shows the h1, copy and project links. Rich Results Test passes. OG previews correct on LinkedIn and WhatsApp. |

### The decisions only Dawood can make

| # | Question | Recommended default | Why |
|---|---|---|---|
| 1 | Which concept: Glass Box, Lahore Standard Time, or Season One? | **Glass Box**, with the overlap clock and per-project accents | The only concept no template or tutorial can supply. |
| 2 | Upgrade to Next.js 16.4 or stay on 15.5? | **Upgrade in Phase 0** | Stable native view transitions; the codebase is still tiny. |
| 3 | Hero media: real cinemagraph, AI-animated loop, or talking video? | **Real cinemagraph or depth loop, plus a real recorded 45 s intro behind a button** | Deepfake-era trust; AI is allowed only if disclosed and decorative. |
| 4 | Ship "Ask my work" in v1? | **Yes, tightly scoped**; cut to a static receipts site if Phase 4 slips | It is the signature, but the site must not depend on it. |
| 5 | Netflix-style picker as a gate or a lens? | **Non-gating lens plus deep links** | NN/g's audience-navigation failure modes; recruiter skim time. |
| 6 | Keep a physics object like the lanyard? | **No**. If he insists, re-author it as his own artefact with a verlet rope (no Rapier) and an HTML alternative | Public 80-line demo; 1.2–1.65 MB physics WASM; WCAG 2.5.7. |
| 7 | Which clients agree to be named, linked, screenshotted and uptime-monitored? | **Ask all four in writing now**; show "client name withheld" where refused | Permission is the true critical path. |
| 8 | What is "Gib software image 1.png": the Ibrahim/fertilizer inventory system, a separate Gib Software job, or employer work under NDA? Is there permission? | **Keep it off the site until answered**, then reseed with demo data | It shows a real client's financials. |
| 9 | Which six projects are featured? | The four live client sites, the RAG support agent and FreelanceHub; Jarvis, the n8n hub and the employee-management app go to `/archive` | Six to eight pieces maximum; balance of client proof and AI depth. |
| 10 | Show prices on `/hire`? | **"Starting from" per package**, with the figures set by Dawood | The most-recommended hybrid; no controlled evidence either way. |
| 11 | What availability can you state truthfully while employed at Techling? | **Exactly what your contract allows** (check moonlighting clauses), e.g. "open to remote roles; limited freelance slots" | The truth rule applies to availability too. |
| 12 | Include the Urdu name mark? | **Yes, as SVG**, once in the intro and footer, with transliteration | Personal, restrained, zero font weight. |
| 13 | Sound? | **None in v1**; opt-in only if added later | Winners never autoplay sound ([R—K](https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/)). |
| 14 | Fonts: free or licensed? | **Free variable grotesk first**; buy PP Neue Montreal only if the free option fails the type test | Budget; verify every licence. |
| 15 | Real testimonials available? | **Only verbatim, attributed and permissioned**; otherwise none | FTC rule; costly-signal research. |
| 16 | Domain and name descriptor? | A full-name domain with "Full-Stack & GenAI Developer" used consistently on every profile | Entity consolidation for a common name. |

## Conclusion

The way to beat four viral portfolios is not a better costume. It is proof they cannot fake. Every reference Dawood admires borrows its authority from somewhere else: Netflix's interface, Vercel's badge, a famous designer's preloader, a stage light. Glass Box borrows nothing. It shows a real person, real client systems with real status, a real RAG pipeline answering in real milliseconds, and real eval results. Even the most damaging artefact of the rejected v2, the invented eval card, turns into an asset: a CI eval suite whose genuine results are both the credibility mechanism and the clearest demonstration of his GenAI engineering.

The research also removes the apparent conflict between "award-level" and "hireable". Jurors give 70% of the score to design and usability. Winners lose most points on usability and accessibility. Recruiters skim in seconds, and clients pay for reduced risk. So the engineering discipline that makes a site fast, accessible and honest is the same discipline that wins juries and wins work. That is why the riskiest items in this plan are not technical. They are four permission emails, one anonymised dashboard and a truthful availability line. The real critical path runs through Dawood's inbox and his own honesty rules, not through GSAP.
