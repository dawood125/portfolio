# 3D Developer Portfolio Trends 2025-2026

## Which 3D portfolio sites won Awwwards, GSAP Site of the Year, or went viral on Instagram in 2025-2026, and what specific techniques did they use?

### Takeaway
In 2025-2026 the top honors went to a drivable WebGL/WebGPU world (Bruno Simon folio-2025), a navigable 3D gallery world (Samsy Gen-02), and scroll-choreographed Three.js + GSAP hybrids (Monolith Project, Pantheon, Stas Bondar); pure static portfolios did not win 3D categories.

### Cited Findings
- Bruno Simon's folio-2025 (bruno-simon.com) won Best Portfolio Site at CSSDA WOTY 2025 with score 8.84 — [Source](https://www.cssdesignawards.com/blog/2025-website-of-the-year-winners/430)
- Bruno Simon folio-2025 is open-source (Vite + Three.js + TSL/WebGPU path) with systems for DayCycles lighting, Weather (rain/snow/lightning), physics vehicle (PhysicalVehicle/VisualVehicle), instanced foliage/objects, and Blender→GLB→compress pipeline — [Source](https://github.com/brunosimon/folio-2025)
- Folio-2025 stack note explicitly credits TSL enabling both WebGL and WebGPU in the same portfolio — [Source](https://github.com/brunosimon/folio-2025/blob/main/sources/index.html)
- Merouane Bali — Portfolio won Best Innovation Site at CSSDA WOTY 2025 (8.82), ahead of Dropbox Brand overall winner (9.03) — [Source](https://www.cssdesignawards.com/blog/2025-website-of-the-year-winners/430)
- The Monolith Project (Ethan Chiu, Nando Correa, Fabian Tjoe-a-on) scored 8.85 joint-third at CSSDA WOTY 2025 and was GSAP SOTM November 2025 built with ScrollTrigger + Three.js + React — [Source](https://www.cssdesignawards.com/blog/2025-website-of-the-year-winners/430); [Source](https://gsap.com/SOTY-2025)
- GSAP SOTY 2025 monthly shortlist is dominated by Three.js/WebGL hybrids: Stas Bondar (Jan: ScrollTrigger+DrawSVG+SplitText+Three.js), Mat Voyce (Feb: ScrollTrigger+Observer+Three.js+React), Aurel's Grand Theater (Apr: ScrollTrigger+MotionPath+Vue+Three.js), Phantom Land (Jun: CustomEase+useGSAP+Three.js+React), Aether 1 (Jul: Three.js+Webflow), Ponpon Mania comic (Sep: ScrollTrigger+SplitText+WebGL), Pantheon Media Group (Oct: Next.js+R3F+Drei+Lenis), Monolith (Nov) — [Source](https://gsap.com/SOTY-2025)
- Pantheon Media Group (ToyFight, Oct 2025 GSAP shortlist) is the direct Next.js + R3F + Drei + Lenis + ScrollTrigger reference for this project's stack — [Source](https://gsap.com/SOTY-2025)
- Samuel Honigstein (Samsy) Gen-02 portfolio at samsy.ninja won Awwwards SOTD + Developer Award Oct 2025; built with Vue.js + GSAP + custom WebGL/WebGPU as navigable interactive rooms showcasing a decade of work — [Source](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world)
- Awwwards SOTY 2025 went to Lando Norris (OFF+BRAND, immersive WebGL/Rive/film build) and Developer SOTY 2025 to Messenger (abeto.co miniature-planet Three.js experience) — [Source](https://www.awwwards.com/annual-awards-2025); [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md)
- Awwwards scoring is Design 40% / Usability 30% / Creativity 20% / Content 10%, min 18 jurors, HM ≥6.5, Developer Award >7 — [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/analysis/jury-evidence.md); [Source](https://www.webdesignawards.io/awards/awwwards)
- 2025 Awwwards portfolio Honorable Mentions skewed minimalist-interaction (Rauno Freiberg Portfolio 2025, Mitchell Hou, Mehdi Bouayaben) rather than heavy 3D, showing restraint also medals — [Source](https://www.awwwards.com/sites/portfolio-2025)
- Creator-breakdown economy in 2025-2026 is tutorial-clone driven: Adrian Hajdin / JavaScript Mastery 3D portfolio template (1030 stars) defines the viral Hacker-Room + globe + bento template, forked hundreds of times — [Source](https://github.com/adrianhajdin/threejs-portfolio)
- High-quality 2025 full-stack reference: David Hckh portfolio-2025 (861 stars, Vue+TS+GSAP+Lenis+three.js+Howler+vite-plugin-glsl, bilingual EN/DE, content-driven project slugs) — [Source](https://github.com/davidhckh/portfolio-2025)
- Full-stack proof-of-skill reference: Bakki Mahesh portfolio (Next.js App Router + R3F particle hero + GSAP ScrollTrigger + Framer Motion + Lenis + command palette + live GitHub API, targeting 95+ Lighthouse) — [Source](https://www.maheshkumar.tech/projects/portfolio)

### Inferences
- For Dawood Ahmed (MERN/Next.js/Laravel/GenAI, jobs + freelance), the winning move is not a Bruno-clone game world but a Pantheon/Monolith-style hybrid: DOM-first case studies + one signature R3F hero + scroll-linked accents.
- Judges reward navigable/choreographed 3D tied to content (rooms, chapters, comic panels), not free-floating decoration.

### Gaps
- No reliable public source quantifies "went viral on Instagram" for developer 3D portfolios in 2025-2026 with view counts; Instagram search returned only 3D-artist reels, not web-portfolio breakdown reels. Note as missing.
- GSAP SOTY 2025 final winner was still "winner will be announced soon" at fetch time; monthly shortlist used as proxy — [Source](https://gsap.com/SOTY-2025)

## What are the signature effects that still impress vs cliches to avoid (particle spheres, scroll-jacking, Bruno Simon clones)?

### Takeaway
Custom shaders, physics-driven worlds, scroll-scrubbed storytelling, and miniature-planet/diorama scenes still win; generic particle spheres, multi-Canvas hacker rooms, and uncredited Bruno Simon drive-around clones now read as dated/template.

### Cited Findings
- Still-winning signatures 2025: drivable physics world with day/night + weather systems (Bruno folio-2025: Wind, Tornado, RainLines, Snow, WaterSurface, Trails, DayCycles) — [Source](https://github.com/mo-shawa/Bruno-Simon-folio-2025)
- Still-winning signatures 2025: miniature-planet Three.js world (Messenger, Developer SOTY 2025) and full immersive film+3D world (Lando Norris, SOTY 2025) — [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md)
- Still-winning signatures 2025: interactive comic + Matter.js physics + WebGL + Lenis (Ponpon Mania, Awwwards SOTM Oct 2025) — [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md)
- Still-winning signatures 2025-2026: scroll-driven stacking panels with 30°→0° rotation reveals + pinning (follow.art SOTD rebuild, GSAP+Lenis) — [Source](https://www.youtube.com/watch?v=UaaUmPdDS1g)
- GSAP 2025 showreel foregrounds ScrollTrigger + SplitText + DrawSVG + CustomEase + Observer pairings, not raw 3D alone — [Source](https://gsap.com/)
- Cliché signal: three.js forum critique of 2025 portfolios repeatedly flags weak typography, blurry text, scroll-jump on hover, and keyboard/scroll-access pain even when 3D is liked — [Source](https://discourse.threejs.org/t/portfolio-showcase/81361); [Source](https://discourse.threejs.org/t/personal-portfolio-site/51414)
- Cliché signal: three.js community notes pure visual portfolio sites are now trivially AI-generable; real engineering depth (state, performance, edge cases, integrations) is the differentiator — [Source](https://discourse.threejs.org/t/is-ai-taking-over-the-visual-portfolio-side-of-three-js-what-domains-still-need-real-3d-engineering/91159)
- Template saturation: Hacker-Room + globe + bento + testimonial structure is now a copy-paste template (HackerRoom.jsx via gltfjsx, 34.62MB→2.56MB compressed, globe via three-globe earth-night/topology textures) — [Source](https://github.com/Abej-Rijwi/threejs-portfolio)
- Award research notes judges instantly recognize template and AI layouts; "Judges check mobile first" — [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/analysis/jury-evidence.md)
- Minimal Wigner: 2025 Awwwards portfolio HMs (Rauno Freiberg, Mitchell Hou) won with type-driven restraint + horizontal scroll/hero reveal, proving minimal still medals — [Source](https://www.awwwards.com/sites/portfolio-2025)

### Inferences
- Avoid for Dawood: full-screen particle sphere hero with no content tie-in; 6+ simultaneous Canvases ("Balls" pattern); direct Bruno jeep-clone without new mechanic; scroll-jacking that breaks keyboard/scrollbar.
- Invest instead: one bespoke shader or diorama tied to full-stack identity (e.g., API/node-graph, terminal→deploy pipeline), plus GSAP text choreography (SplitText reveals, DrawSVG diagrams of architecture).

### Gaps
- No citable 2025-2026 "cliché list" article found; cliches inferred from template saturation + forum critique + jury-evidence note, not a primary awards source. Flag as inference.

## How do winners balance spectacle with performance on mid-range mobile (DPR, instancing, post-processing budgets)?

### Takeaway
Winners cap DPR at 1.5-2, collapse draw calls via instancing/merging, gate post-processing on mobile, and use frameloop=demand + adaptive quality; multiple WebGL contexts is the #1 mobile killer.

### Cited Findings
- Cap DPR: `dpr={[1, 2]}` on R3F Canvas caps pixel ratio at 2; going higher on 3x displays burns GPU for zero visible gain — [Source](https://empire-ui.com/blog/react-three-fiber-guide)
- Cap DPR in vanilla: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`; dropping DPR 3→2 cuts fragment-shader pixels >55% — [Source](https://salivity.github.io/three.js/article/three-js-mobile-performance-limit-device-pixel-ratio)
- Adaptive DPR pattern: drei `<PerformanceMonitor>` collecting avg fps to lower DPR/quality live; R3F docs recommend it — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance); [Source](https://raw.githubusercontent.com/iart-ai/webgl-animation-skills/main/skills/threejs-animation/references/r3f-and-perf.md)
- Instancing is the single biggest win: 100 `<mesh>` → 1 `<instancedMesh>` (1 draw call); use low-seg geometry at small scale (sphere 8×8 not 32×32) — [Source](https://empire-ui.com/blog/react-three-fiber-guide)
- 500+ draw calls/frame struggles on most hardware regardless of triangle count; share geometries/materials, merge static geos via BufferGeometryUtils, use LOD — [Source](https://threejsroadmap.com/blog/draw-calls-the-silent-killer); [Source](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- Never setState inside useFrame (60 re-renders/sec); mutate refs with delta, use startTransition for expensive ops — [Source](https://r3f.docs.pmnd.rs/advanced/pitfalls); [Source](https://github.com/emalorenzo/three-agent-skills/blob/main/R3F_BEST_PRACTICES.md)
- frameloop="demand" + invalidate() cuts GPU usage ~70% on mostly-static scenes; render only on change — [Source](https://empire-ui.com/blog/react-three-fiber-guide); [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Post-processing budget: @react-three/postprocessing Bloom(mipmapBlur) + SMAA instead of MSAA, HalfFloat frame buffers; DepthOfField expensive on mobile — gate behind capability/fps check; stacking 4+ effects can halve mobile fps — [Source](https://empire-ui.com/blog/react-three-fiber-guide); [Source](https://github.com/emalorenzo/three-agent-skills/blob/main/R3F_BEST_PRACTICES.md)
- Asset budget: gltf-transform optimize + Draco can take 3MB→400KB; useGLTF.preload + Suspense; KTX2/Basis textures cut GPU memory ~70% vs PNG — [Source](https://empire-ui.com/blog/react-three-fiber-guide)
- Mobile crash root cause 2025: rendering each "Ball" in its own Canvas creates parallel WebGL contexts (browser-limited, lower on mobile); fix is single Canvas — [Source](https://discourse.threejs.org/t/react-three-fiber-app-crashing-on-iphone-and-android/77725)
- Jury reality check: no fixed MB cap in Awwwards criteria; performance scored as perceived arrival + WPO sub-score; winners ship 5.7MB initial (Messenger) and heavy 3D still scores Usability 7.9/WPO 7.6 (Lando Norris) if critical path is fast — [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/analysis/jury-evidence.md)
- Practitioner rule: "3D is a garnish, not the meal — capping particle counts and DPR keeps performance excellent" while targeting 95+ Lighthouse — [Source](https://www.maheshkumar.tech/projects/portfolio)
- Template repos now ship with reduced particle count on mobile via useMediaQuery + lazy loading + LOD + auto quality downscaling as standard — [Source](https://github.com/razinahmed/threejs-3d-portfolio)

### Inferences
- Next.js + R3F budget for Dawood: single Canvas, dpr [1,1.75] mobile / [1,2] desktop, <150 draw calls, instanced particles <800 mobile / <2000 desktop, 1 post effect max on mobile (Bloom mipmapBlur or none), GLB total <1.5MB gzipped, dynamic import Canvas with ssr:false.
- Use PerformanceMonitor → step down DPR 2→1.5→1 + disable Bloom if fps <45 for 2s.

### Gaps
- No 2025-2026 primary source gives exact mid-range-device fps tables for R3F portfolios; budgets above are synthesized from docs + practitioner guides, not a lab benchmark.

## What scroll/camera patterns work best: continuous dolly vs discrete dioramas vs minimal accents?

### Takeaway
2025 winners favor scroll-scrubbed continuous dolly through staged chapters (ScrollTrigger pin + scrub) over free-drive; discrete dioramas per section is the best mobile-safe runner-up; minimal ambient accents win when content must convert (jobs/clients).

### Cited Findings
- Dominant pattern 2025: GSAP ScrollTrigger choreographs pinned sections with internal timelines; Three.js dominates 3D, Lenis smooths scroll — [Source](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md)
- Canonical R3F scroll rig: drei `<ScrollControls pages={3} damping={0.2}>` + `useScroll()` offset 0..1 driving camera y/z + lookAt in useFrame; `<Scroll html>` for DOM that scrolls with scene — [Source](https://drei.docs.pmnd.rs/controls/scroll-controls); [Source](https://raw.githubusercontent.com/iart-ai/webgl-animation-skills/main/skills/threejs-animation/references/r3f-and-perf.md)
- Continuous dolly example: React 19 + R3F + GSAP ScrollTrigger portfolio where camera + geometry respond continuously to scroll progress (not canned animation), with reduced-motion fallback — [Source](https://github.com/jawadhaider0024/jawad-portfolio-v2)
- Discrete diorama signal: Ancient Egypt 2026 showcase turns five lightweight Three.js dioramas into a browser journey (chapter-per-room model) — [Source](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world)
- Navigable-rooms pattern (Samsy Gen-02): wander digital gallery, each room reveals different work — immersive but high-build-cost — [Source](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world)
- Free-drive pattern (Bruno folio-2025): drive physics vehicle to discover content/achievements — highest wow, highest usability/accessibility cost — [Source](https://bruno-simon.com/)
- Minimal-accent pattern: three.js used for animated background only, rest plain HTML/CSS/JS UI — praised for clarity, critiqued when camera jumps on hover or scroll needs finger-intensive wheel — [Source](https://discourse.threejs.org/t/portfolio-3d-background-portfolio-site/92832)
- Correct Lenis+ScrollTrigger wiring (single loop): `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t=>lenis.raf(t*1000))`, `lagSmoothing(0)`; separate rAF loops cause jitter/marker drift/broken pins — [Source](https://github.com/darkroomengineering/lenis); [Source](https://github.com/iart-ai/web-animation-skills/blob/main/skills/gsap-web/references/scrolltrigger-lenis.md)
- Pin+scrub pitfall: `once:true + pin + scrub` leaves pin-spacer blank space; fix via onLeave kill + ScrollTrigger.refresh + lenis.scrollTo correction — [Source](https://gsap.com/community/forums/topic/44795-scrolltrigger-once-with-pin-and-scrub-lenis-creates-a-blank-space)
- Award-choreography stack 2025: Lenis (duration 1.2, smoothWheel) + GSAP ScrollTrigger pinning + horizontal Practice-Areas pin section — [Source](https://github.com/creativoma/lenis-gsap-lab)

### Inferences
- Recommendation for Dawood (jobs + freelance conversion): continuous scrubbed dolly for hero→work (desktop), auto-degrading to discrete fade/slide dioramas on mobile (disable pin, snap camera per section), minimal ambient shader elsewhere so recruiters can skim.
- Avoid scroll-jacking: keep native scrollbar + keyboard nav; Lenis duration ~1.1-1.2, never lock scroll for >1 viewport without skip.

### Gaps
- No A/B or conversion data found comparing dolly vs dioramas vs minimal for hiring outcomes; recommendation is craft consensus, not measured.

## How do winners handle reduced-motion, SEO with 3D, and reel-exportability?

### Takeaway
Winners ship DOM-first content (Next.js SSG + JSON-LD) with Canvas dynamically imported and disabled under prefers-reduced-motion; reel-exportability is designed in via fixed-camera chapters and deterministic timelines, not screen-capture luck.

### Cited Findings
- Reduced-motion standard: `window.matchMedia('(prefers-reduced-motion: reduce)')` → disable auto-rotation/parallax/camera-shake, snap instead of smooth zoom, provide manual motion toggle — [Source](https://www.intelligentgraphicandcode.com/development/threejs-interfaces/accessibility)
- R3F SPA pattern: skip Lenis + ScrollTrigger smoothing when prefersReduced, verify ticker cleanup + ScrollTrigger kill on nav — [Source](https://github.com/iart-ai/web-animation-skills/blob/main/skills/gsap-web/references/scrolltrigger-lenis.md)
- Scroll-linked portfolio template ships responsive layout with reduced-motion fallback as a feature — [Source](https://github.com/jawadhaider0024/jawad-portfolio-v2)
- 3D a11y consensus: canvas has no semantic structure for screen readers; ship mirror DOM content / tables / keyboard controls alongside scene, don't put all text in WebGL; drei `<Html>` / CSS2DRenderer for positioned labels — [Source](https://discourse.threejs.org/t/accessibility-for-3d-websites/87092); [Source](https://www.intelligentgraphicandcode.com/development/threejs-interfaces/accessibility)
- Keyboard 3D utility: a3 npm package adds tab-focus boxes, Enter-to-click, screen-reader roles for meshes — [Source](https://github.com/HilarieSit/a3)
- SEO with 3D (Next.js): App Router SSG for project/case-study pages, 3D dynamically imported client-side (`ssr:false` / 'use client'), content in typed data files, full metadata + OG + JSON-LD + sitemap — [Source](https://www.maheshkumar.tech/projects/portfolio)
- SEO-friendly 3D pattern: Nuxt/Next SSR shell + Three.js enhancement; redundant DOM copy ensures crawlability — [Source](https://discourse.threejs.org/t/3d-portfolio-free/82893)
- SEO checklist standard: meta description + OG/Twitter cards + share image (`share-image.png?cb=a` pattern from folio-2025 index.html) — [Source](https://github.com/brunosimon/folio-2025/blob/main/sources/index.html)
- R3F + Next.js App Router requires 'use client' + dynamic ssr:false for Canvas; wrap Canvas in error boundary falling back to static image/CSS on WebGL loss — [Source](https://empire-ui.com/blog/react-three-fiber-guide)
- Reel-exportability signals: GSAP SOTY monthly builds are chapter-based (Jan–Dec) with deterministic ScrollTrigger timelines ideal for 0:55 vertical captures; webgpu.com showcase embeds 0:55 demo video for Gen-02 — [Source](https://gsap.com/SOTY-2025); [Source](https://www.webgpu.com/showcase/gen-02-portfolio-an-immersive-world)
- Breakdown-reel economy: YouTube creators rebuild SOTD scroll systems (follow.art stacking panels) shot-by-shot; pinnable discrete chapters export cleanly to 9:16 — [Source](https://www.youtube.com/watch?v=UaaUmPdDS1g)

### Inferences
- Dawood checklist: (1) reduced-motion → static hero frame + no Lenis + section snap; (2) SEO → each project has SSG route with JSON-LD Project schema + OG image, Canvas `aria-hidden` with full DOM duplicate; (3) reels → build 3 fixed camera bookmarks (hero/diorama/contact) with `?reel=hero` query param driving deterministic 8s timeline for screen capture at 1080×1920.
- Do not rely on `<Html>` overlays for primary copy; keep H1/job-title/CTA in real DOM above Canvas.

### Gaps
- No primary winner case study found detailing a reel-export pipeline (camera bookmarks / deterministic clock) — recommendation is synthesized from showcase video practice + GSAP chapter structure. Flag as inference.
- Instagram-specific viral mechanics (aspect, caption, audio) for portfolio reels had no citable 2025-2026 source; omitted rather than invented.
