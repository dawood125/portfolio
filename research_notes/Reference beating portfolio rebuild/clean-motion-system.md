# Clean Premium Motion System — Zero WebGL

## What motion do reference portfolios actually use (reveals, counters, marquee, hovers, cards)? What durations/easings feel premium?

### Takeaway
Reference-style portfolios converge on the same cheap compositor-only toolkit — fade/translate reveals via IntersectionObserver, eased count-ups, seamless translateX marquees, lift-on-hover cards, magnetic buttons — with premium feel coming from ~0.6–0.8s expo-out reveals and 50–100ms staggers, not from library weight.

### Cited Findings
- A reference-style portfolio repo documents its whole motion layer as hand-written CSS keyframes plus tiny IntersectionObserver hooks (`useReveal`, `useCountUp`), explicitly avoiding framer-motion and GSAP, with ~195 KB JS / ~35 KB CSS gzipped — including magnetic cursor with mouse-follow halo, global spotlight via CSS variables `--mx`/`--my`, scroll progress bar throttled with rAF, page transitions (fade/slide/blur-in), animated counters fired by IntersectionObserver, and infinite tech marquee below hero — [Source](https://github.com/dhruv-15-03/Portfolio)
- Premium motion token set: durations grow sub-linearly with travel distance roughly `duration x (travel/160px)^0.5` clamped 0.6x–1.8x; stagger uses per-child offset `offset x index^0.85` so long lists don't take proportionally long; entrances must decelerate (fast start, settle into rest) — [Source](https://www.springs.studio/)
- Motion timing tables: tooltip/micro-feedback 80–120ms, button/toggle 120–180ms, card enter/exit 200–350ms, modal 300–400ms, page transition 400–600ms, dramatic reveal 600–1200ms, ambient 2000–20000ms; premium personality runs slower (350/500/800ms for quick/standard/slow) with 0% overshoot; stagger standard 50–100ms with total stagger budget <500ms (<400ms standard, <600ms dramatic) — [Source](https://github.com/LottieFiles/motion-design-skill/blob/main/skills/motion-design/reference/timing-easing-tables.md)
- Industry-standard easings: MD3 Standard `(0.2, 0, 0, 1)` for default on-screen, MD3 Emphasized `(0.05, 0.7, 0.1, 1)` for entrances, MD3 Decelerate `(0, 0, 0, 1)` for entering, Apple HIG `(0.25, 0.1, 0.25, 1)`; directional rule entrance=ease-out, exit=ease-in, on-screen=ease-in-out, looping=sine, rotation/progress=linear — [Source](https://github.com/LottieFiles/motion-design-skill/blob/main/skills/motion-design/reference/timing-easing-tables.md)
- Out-expo premium ease is `cubic-bezier(0.19, 1, 0.22, 1)` — [Source](https://www.easings.dev/out-expo)
- Copy-paste reveal pattern: `.fade-in-scale` animates `fadeInScale 300ms cubic-bezier(0.16, 1, 0.3, 1)` from `opacity:0; transform: scale(0.95)`; stagger children use `fadeInUp` from `translateY(20px)`; button press feedback must be <150ms — [Source](https://gist.github.com/uxderrick/07b81ca63932865ef1a7dc94fbe07838)
- Representative premium hero spec: IntersectionObserver-driven reveal using `cubic-bezier(0.2, 0.8, 0.2, 1)` over 0.8s with cascade delays 200/300/400/600/800ms; marquee `translateX(0 → -50%)` linear infinite over ~22s pausing on hover; hero image slow vertical float (±8px, 6s ease-in-out); button arrow translates ~8px with springy `cubic-bezier(0.34, 1.56, 0.64, 1)`; stats count-up from 0 on intersection — [Source](https://promptedsite.com/hi/t/verdant-advisory-h10)
- Seamless marquee technique: children render twice on a single track translated `0 → -50%` with identical halves so the loop point is invisible; pauses on hover (fine pointers only), pauses offscreen via IntersectionObserver, freezes under `prefers-reduced-motion` — [Source](https://www.paragon-ui.com/docs/marquee)
- Logo-wall marquee defaults: moderate speed (30–70 range optimal), `duration 30s` per loop, gap ~40–48px, explicit container dimensions; initialize only when in view via IntersectionObserver; clean up instances; adjust speed/border-radius for mobile — [Source](https://www.marqueekit.com/docs/examples)
- ScrollTrigger reveal canonical pattern: `gsap.from(".item", { y: 50, opacity: 0, scrollTrigger: { trigger: ".item", start: "top 85%" } })`; parallax via `yPercent: -20` with `scrub: true`; scroll storytelling via pinned timeline `start: "top top", end: "+=200%"`, `pin: true, scrub: true` — [Source](https://dev.to/vishwark/mastering-gsap-scrolltrigger-a-complete-practical-guide-5bi3)
- For grids of cards animating on scroll, use `ScrollTrigger.batch()` instead of one ScrollTrigger per element, with e.g. `stagger: 0.15` and `start: "top 85%"` to group elements entering together — [Source](https://dev.to/rashid_ks_cd537c300b8d67d/building-performant-scroll-driven-animations-with-gsap-scrolltrigger-3hb2)
- Magnetic button core pattern: measure button center via `getBoundingClientRect()`, compute pointer offset, translate button a fraction (e.g. `x/y * 0.4` or strength ~150px falloff) toward cursor with `will-change: transform`, snap back with expo/spring ease on leave; GSAP canonical demo uses `.magnetic-wrap` hit-area larger than the button with `.js-magnetic-area` / `.js-magnetic-content` split — [Source](https://codepen.io/GreenSock/pen/yLOmYgV); simplified vanilla variants translate on `mousemove` and lerp back via rAF — [Source](https://codepen.io/tkdev-hub/pen/pvEBaQR); a zero-dependency TypeScript option defaults to `data-distance 50px`, `data-attraction 0.3` — [Source](https://github.com/phucbm/magnetic-button)
- CSS-only fake magnetic effect (wrapper `:hover` shifting button e.g. `translate(10px,-10px)` with transition) exists but is directional, not cursor-tracking — [Source](https://medium.com/@fulton_shaun/magnetic-buttons-with-css-only-11e249b320a2)

### Inferences
- The "beat the refs" spec that stays credible: 0.6–0.8s expo-out reveals (`cubic-bezier(0.19,1,0.22,1)` or `(0.2,0.8,0.2,1)`), 20px/50px travel, 60–80ms stagger capped at ~400ms total; 22–30s linear marquee; count-ups ~1.2–1.6s ease-out; magnetic pull 0.3–0.4 with fast snap-back.
- Counters like 120+/80+ and logo marquees are IO + rAF, not scroll-scrub — cheaper and more reliable on mobile than ScrollTrigger scrub.

### Gaps
- No reliable public source found dissecting the exact Anti/Aura/Lohitha ref repos' durations (names appear to be private client refs, not published case studies); values above are inferred from representative premium portfolio implementations.
- No citable source for accordion/tilt-card usage in those specific refs; tilt is deliberately excluded from the recommended spec (see perf section).

## How to implement cleanly in Next.js: CSS keyframes + IntersectionObserver vs GSAP ScrollTrigger vs Lenis — keep vs drop after R3F Canvas deletion?

### Takeaway
Default to CSS keyframes + a single `useReveal`/`useCountUp` IntersectionObserver system; add Lenis for smooth scroll feel; add GSAP ScrollTrigger only if scrubbed/pinned storytelling or parallax is required; delete `three`, `@react-three/fiber`, `@react-three/drei`.

### Cited Findings
- Lenis is a lightweight dependency-free smooth-scroll library (~5KB claim on landing) that wraps native scroll so `position: sticky`, anchor links, and accessibility keep working; setup is one line `new Lenis()` with optional `autoRaf: true`; ships adapters `lenis/react`, `lenis/vue`, `lenis/nuxt`, plus `lenis/snap` — [Source](https://lenis.dev/)
- Recommended Lenis CSS: `html.lenis, html.lenis body { height: auto; }`, `.lenis.lenis-smooth { scroll-behavior: auto !important; }`, `[data-lenis-prevent] { overscroll-behavior: contain; }`, `.lenis-stopped { overflow: hidden/clip; }`, `iframe { pointer-events: none; }`, or `import 'lenis/dist/lenis.css'` — [Source](https://www.npmjs.com/package/lenis?activeTab=versions)
- Canonical GSAP+Lenis wiring: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add((time) => lenis.raf(time * 1000))`, `gsap.ticker.lagSmoothing(0)` — [Source](https://www.npmjs.com/package/lenis?activeTab=versions)
- Next.js 15 + React 19 + Lenis 1.2.3 + GSAP 3.12.7 reference integration wraps the app in a `SmoothScrollProvider` (client component) and uses `useGSAP`/refs with `ScrollTrigger.refresh()` after route changes — [Source](https://github.com/tnmod/lenis-gsap-nextjs-example)
- A Next.js Lenis guide recommends `lerp: 0.1, duration: 1.2` options via `<ReactLenis root>` in the root layout (`"use client"`), noting conflicting `overflow: hidden` / `position: fixed` CSS breaks smoothing — [Source](https://github.com/sheraz-saqib/lenis-in-reactjs-or-nextjs)
- Production-gated pattern: skip Lenis on touch devices (`if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return`) with `smoothTouch: false` default — [Source](https://gist.github.com/dashmedialtd/006d1f92fb97baf4372ee08c9b0287ca)
- Lenis was originally built to synchronize WebGL and DOM scroll on the main thread; the buttery smoothing was a side effect of scroll-position interpolation (lerp) — [Source](https://github.com/darkroomengineering/lenis/blob/main/MANIFESTO.md)
- ScrollTrigger capabilities: scrub (tie progress to scrollbar, `scrub: 1` adds catch-up smoothing), pin (`pin: true` + `pinSpacing`), snap to labels, `once: true` to kill after first run, `anticipatePin`, `containerAnimation` for horizontal scroll; never animate the pinned element itself, animate children — [Source](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-scrolltrigger/SKILL.md)
- React best practice: use refs for targets, `useGSAP` hook from `@gsap/react` for auto-cleanup, kill ScrollTriggers on unmount, call `ScrollTrigger.refresh()` after route changes — [Source](https://gsapify.com/gsap-scrolltrigger)
- Only animate `transform` and `opacity` in scroll-driven tweens; animating `width/height/top/left/margin/box-shadow` triggers layout recalc every scroll tick and stutters on mid-range devices — [Source](https://dev.to/rashid_ks_cd537c300b8d67d/building-performant-scroll-driven-animations-with-gsap-scrolltrigger-3hb2)
- Stale ScrollTriggers pointing at removed DOM nodes in SPAs leak memory and fire on wrong elements; explicit cleanup is required — [Source](https://dev.to/rashid_ks_cd537c300b8d67d/building-performant-scroll-driven-animations-with-gsap-scrolltrigger-3hb2)
- Smaller bundles load faster and improve Core Web Vitals; Next.js recommends `@next/bundle-analyzer` (`ANALYZE=true npm run build`) to find large deps and remove/split/lazy-load them — [Source](https://nextjs.org/docs/app/guides/package-bundling)
- The `three` npm package ships multi-MB `build/` (~5MB) + `examples/` (~25MB) payloads, confirming it as the dominant bundle weight to remove — [Source](https://unpkg.com/three@0.158)

### Inferences
- Keep: `lenis` (single dep, CSS file, one client provider, `anchors: true` if anchor links needed). Keep-or-defer: `gsap` + `ScrollTrigger` only when the design needs scrub/parallax/pin; a reveal/counter/marquee/magnetic portfolio does not need it.
- Drop: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, any `Canvas`/`useFrame`/`useThree` components, R3F event-loop code, and WebGL-synced Lenis options. Deletion plan: `npm rm three @react-three/fiber @react-three/drei`; delete Canvas component + diorama assets; remove `transpilePackages`/webpack WebGL shims; run analyzer before/after to prove the delta.
- Solo-maintainer ordering: ship IO+CSS+Lenis first (zero scrub bugs, trivial cleanup); promote to ScrollTrigger only for one pinned/parallax section, behind `gsap.matchMedia` + reduced-motion guard.

### Gaps
- No citable minified/gzipped byte figure for three+fiber+drei as a combined Next.js client chunk from a primary source; the analyzer run on the actual repo is still needed to quote the exact saving.

## Aurora/spotlight background technique: layered radial-gradients, blur, slow drift, grain — code patterns and perf cost vs old WebGL diorama?

### Takeaway
Aurora = 2–4 oversized blurred gradient blobs (radial/conic) on a dark base, animated only via `transform` drift (7–24s alternate), plus optional cursor-anchored spotlight and SVG-noise grain; it is orders of magnitude cheaper than a WebGL diorama because after first paint the compositor reuses cached textures.

### Cited Findings
- Minimal aurora recipe: oversized `::before` with `inset: -40%`, `conic-gradient(...)`, `filter: blur(28px)`, `opacity: .85`, animated `translate3d + rotate + scale` over `9s ease-in-out infinite alternate`, with `@media (prefers-reduced-motion: reduce) { animation: none; }` — [Source](https://nudaui.dev/components/gradient-aurora)
- Light-mode aurora variant: three absolutely-positioned spans at staggered tops/heights, each `linear-gradient(90deg, transparent, --a, --b, --e, transparent)` with `filter: blur(1.2em)`, `mix-blend-mode: multiply`, animated `translateX(±10%) + rotate + scaleY` over 7–12s `cubic-bezier(0.45,0,0.55,1) infinite alternate`; whole system scales via `--bgx-size` em units — [Source](https://www.aicssanimations.com/directory/Animated-Backgrounds/aurora)
- Mesh-gradient recipe: stack multiple `radial-gradient(at X% Y%, color 0px, transparent 50%)` layers over a solid base (e.g. `#0f172a`) and apply high-radius `filter: blur(40–100px)` to melt banding; animate `background-position`/`background-size` with keyframes for slow drift — [Source](https://littleblueinsight.com/tool/technology/css-gradient-mesh-generator/)
- Aurora-curtain variant: bands with `filter: blur(60px)`, opacity pulsing 12s alternate, conic-gradient rotation via custom property animation over 18–24s — [Source](https://codepen.io/Ahmod-Musa/pen/emNqPQd)
- Classic two-layer aurora: outer `linear-gradient(45deg, #32a6ff, #3f6fff, #8d54ff)` with `background-size: 200%` animated 10s + inner `radial-gradient(rgba(255,255,255,0), rgba(255,255,255,.15))` animated 7s through `background-position` keyframes — [Source](https://codepen.io/shottsn/embed/QOqpqP)
- Spotlight pattern: fixed full-viewport layer with `radial-gradient(circle at X% Y%, transparent 130–160px, rgba(0,0,0,.85–.95) 150–200px)`; cursor position written to CSS vars (`--mx/--my`) or `background-image` on `mousemove`; portfolio implementation anchors a fixed radial gradient to cursor via `--mx/--my` — [Source](https://gist.github.com/ChristopherDalziel/bd1ad271e1273a889599f4df59f6b1fe); [Source](https://github.com/dhruv-15-03/Portfolio)
- Only `transform` and `opacity` are guaranteed compositor-only in all major browsers; animating anything else risks layout/paint per frame — [Source](https://web.dev/articles/animations-overview)
- Blink compositor can also offload `filter` and `backdrop-filter` animations in some cases, but the safe cross-browser guarantee remains transform + opacity — [Source](https://chromium.googlesource.com/experimental/chromium/src/+/refs/tags/75.0.3770.90/third_party/blink/renderer/core/animation/README.md)
- Layer discipline: promote moving elements with `will-change: transform` (or `translateZ(0)` fallback) but never `* { will-change }` — every layer costs VRAM/management; aim ~4–5ms compositing during scroll/transitions — [Source](https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/blog/stick-to-compositor-only-properties-and-manage-layer-count/index.md)
- Scoped promotion pattern: no `will-change` at rest; add `.panel--animating { will-change: transform, opacity }` only during animation, release to `auto` after — [Source](https://www.css-animation.com/core-css-animation-fundamentals)
- Gradient-stop animation is not smoothly interpolable in most browsers (it steps); the smooth workaround is oversized `background-size: 200%` + `background-position` keyframes — [Source](https://stackoverflow.com/questions/23441060/how-to-animate-gradients-using-css)

### Inferences
- Recommended build: one fixed `.aurora` container (`aria-hidden`, `pointer-events: none`, `z-index: -1`) with 3 blurred blob divs (transform-only drift, 9/12/18s, `will-change: transform` only on the blobs, `contain: strict`); one cursor spotlight layer throttled by rAF and disabled on touch/reduced-motion; one static SVG feTurbulence grain overlay at low opacity (no animation).
- Perf contrast vs WebGL diorama: aurora pays one paint + blur raster, then pure composite; WebGL pays continuous JS + GPU frame loop, shader compile, and Lenis sync overhead. Removing Canvas should collapse both JS parse and sustained frame cost even before measuring.
- Avoid animating `filter: blur()` values per-frame on mid-range Android (it can force repaint); animate `transform`/`opacity` of pre-blurred blobs instead.

### Gaps
- No head-to-head FPS/power benchmark (CSS aurora vs three.js diorama on mid-range Android) found in citable sources; recommend measuring with DevTools Performance + `about:tracing` on the actual build.
- Grain-overlay best practice (data-URI SVG vs canvas noise vs CSS) lacks a single authoritative perf source; treat as static layer until measured.

## Reel-exportability without 3D: deterministic scroll timeline + MediaRecorder of DOM? Or simple MP4 via screen-capture bookmarks?

### Takeaway
Skip in-page MediaRecorder-of-DOM (it only records canvas/camera streams, not arbitrary DOM); ship a deterministic "reel mode" (fixed-duration scripted scroll/section tour) and capture it with OS screen capture to MP4 for reels.

### Cited Findings
- `MediaRecorder` records a `MediaStream` source (camera/mic via `getUserMedia`, or `<audio>/<video>`/`<canvas>` elements); it is constructed as `new MediaRecorder(stream, options)` with `mimeType`/`bitsPer second` options and emits `dataavailable` Blobs — [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- The standard recording flow is: obtain MediaStream → `new MediaRecorder(stream)` → handle `ondataavailable` chunks → `stop()` → assemble `Blob` → object-URL download — [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)
- Canvas capture path is `canvas.captureStream(25)` → record → stop after N seconds → download `.webm` — [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API); a worked canvas-to-video example renders to canvas for 3s and records via `captureStream` + MediaRecorder — [Source](https://mozdevs.github.io/MediaRecorder-examples/record-canvas-to-video.html)
- No DOM-capture API exists in the MediaRecorder/MDIAStream Recording specs surfaced: sources are streams, not arbitrary DOM subtrees — [Source](https://www.w3.org/TR/2022/WD-mediastream-recording-20220607)
- ScrollTrigger supports deterministic timelines usable as a reel script: timeline with `scrub`/`pin`/`snap: { snapTo: "labels" }`, plus `onUpdate: self => console.log(self.progress)` for progress tracking — [Source](https://dev.to/vishwark/mastering-gsap-scrolltrigger-a-complete-practical-guide-5bi3)

### Inferences
- Recommended approach: (1) add `?reel=1` query mode that disables Lenis smoothing quirks, hides cursor/nav, sets fixed viewport (1080×1920), and auto-plays a ~15–20s scripted timeline (hero → counters → work cards → marquee → testimonial → CTA) with deterministic durations; (2) record with native screen capture (Windows Snipping Tool / OBS / QuickTime) and export MP4; (3) optionally add chapter bookmarks (section anchors) so each capture take starts at an exact scroll position.
- A "MediaRecorder of DOM" feature would require either a canvas-mirroring library (heavy, fragile) or `getDisplayMedia` tab-capture (permission UX, browser-dependent) — not worth it for a solo maintainer when OS capture already yields reel-ready MP4.

### Gaps
- No reliable citable tutorial for deterministic Next.js scroll-tour + screen-capture reel workflow as a single packaged solution; recommendation is a synthesis, not a single-source pattern.
- `getDisplayMedia` + MediaRecorder tab-capture as an in-app "record reel" button was not validated against 2026 browser permission UX; left as future work, not recommended now.

## Reduced-motion, mobile, perf budgets: what disables, what stays, how to keep LCP under 2.5s?

### Takeaway
Respect `prefers-reduced-motion` by default (Lenis already does), gate magnetic/spotlight/tilt/parallax behind fine-pointer + no-reduced-motion + desktop-width checks, and protect LCP with `next/font` self-hosting + `next/image` priority/sizes discipline on Vercel.

### Cited Findings
- Lenis now honors `prefers-reduced-motion` by default via `respectReducedMotion: true`: smoothing disabled (`lerp` forced to 1, 1:1 input tracking), programmatic scrolls (`scrollTo`, anchors) jump instantly, while scroll keeps running on the main thread; `lenis.prefersReducedMotion` getter exposes the state — [Source](https://www.npmjs.com/package/lenis?activeTab=versions)
- Lenis maintainers' stated plan: forcing `lerp: 1` rather than killing Lenis preserves WebGL/DOM sync infrastructure while removing decoupled acceleration that triggers motion sickness — [Source](https://github.com/darkroomengineering/lenis/issues/534)
- Lenis is positioned as the only smooth-scroll option of its generation that preserves native scrollbar and honors reduced-motion by default (~1.35M weekly installs, v1.3.26, Aug 2026) — [Source](https://index.chele.bi/r/lenis)
- Accessibility checklist pattern: scroll reveals, hover animations, and Lenis smooth-scroll all bail to static path when OS reduced-motion is set; body/CTA contrast ≥4.5:1; touch targets ≥44pt — [Source](https://www.alphabeta.design/accessibility)
- Reference portfolio gates its magnetic cursor + halo: auto-disables on touch, on `prefers-reduced-motion`, and below 1280px — [Source](https://github.com/dhruv-15-03/Portfolio)
- Animation accessibility pattern: `@media (prefers-reduced-motion: reduce) { animation: none; opacity: 1; transform: none; }` with functional-only opacity fallback where needed — [Source](https://gist.github.com/uxderrick/07b81ca63932865ef1a7dc94fbe07838); marquee components freeze entirely under reduced-motion (`animation: none`) — [Source](https://www.paragon-ui.com/docs/marquee); framer-motion offers `useReducedMotion()` for component-level branching — [Source](https://github.com/divyanshus2404/BlueBottleCap-Saas/issues/31)
- `next/font` self-hosts Google/local fonts at build time (no external requests), eliminates layout shift via size-matched fallback, supports `subsets: ['latin']`, variable fonts, and `display: 'swap'` — [Source](https://nextjs.org/docs/15/app/getting-started/fonts)
- `next/image` auto-optimizes (correct sizing, WebP/AVIF, CLS-free space reservation, below-fold lazy-load); the LCP image must carry `priority`/`preload` and correct `sizes` (e.g. `"(max-width: 768px) 100vw, 50vw"` for 2-col grids); quality 75–85 is the sweet spot — [Source](https://nextjs.org/docs/14/app/building-your-application/optimizing/images); [Source](https://vercel.com/academy/nextjs-foundations/images-next-image)
- Vercel Image Optimization caches transformed images on the CDN; skip optimization (`unoptimized`) for <10KB icons, SVGs, GIFs, or frequently-changing images — [Source](https://vercel.com/docs/image-optimization)
- Compositor-only rule restated for budgets: animate `transform`/`opacity` only; `width/height/padding/margin/top/left` trigger layout+paint+composite — [Source](https://gist.github.com/uxderrick/07b81ca63932865ef1a7dc94fbe07838); CSS and Web Animations on those two properties typically run on the compositor thread, surviving main-thread JS pressure — [Source](https://web.dev/articles/animations-overview)

### Inferences
- Disable map (reduced-motion OR mobile): Lenis smoothing (automatic via `respectReducedMotion`; plus manual `smoothTouch: false` and touch-gate), aurora drift (`animation: none`, static gradient stays), marquee (static row, no loop), magnetic/spotlight/tilt/parallax (not initialized), count-ups (jump to final value), reveals (render final state, no transform).
- Keep-always: semantic HTML, focus states, color contrast, 44pt targets, instant anchor navigation, static aurora gradient (brand intact without motion), final counter values (content intact).
- Perf budget to hold 60fps + LCP <2.5s on mid-range Android: ≤3 blurred aurora blobs (transform-only), ≤1 marquee in viewport at a time (pause offscreen via IO), images via `next/image` with explicit `sizes` + LCP `priority`, fonts via `next/font` latin-subset variable, total stagger <500ms, no layout-property animation, analyzer-verified removal of three/fiber/drei.

### Gaps
- No citable absolute "under 2s load / under N KB" guarantee for Vercel + Next.js 15 generally; actual LCP must be measured with Lighthouse/Web Vitals on the deployed build (field data varies by network/device).
- Mid-range Android frame-rate for 3-blob blurred aurora specifically lacks a published benchmark; the ≤3-blob cap is an inference from layer-cost guidance, not a measured threshold.
