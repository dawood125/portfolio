# Animation Technology Stack & Technique Recipes for a Premium Next.js / React 19 Portfolio (state as of Oct 2026)

Research date: 2026-10-12. Version numbers come from the live npm registry and official docs fetched on that date. Statements marked "(inference)" are my own synthesis from the cited building blocks, not something a source says outright.

**Version snapshot (npm registry `latest`, fetched 2026-10-12)**

| Package | Version | License | Notes |
|---|---|---|---|
| `gsap` | 3.15.0 (published ~2026-04-13) | GSAP Standard "no charge" license | all plugins included — [npm](https://registry.npmjs.org/gsap/latest) |
| `@gsap/react` | 2.1.2 | GSAP standard license | peer: gsap ^3.12.5, react >=17 — [npm](https://registry.npmjs.org/@gsap/react/latest) |
| `motion` (formerly framer-motion) | 14.1.0 | MIT | [npm](https://registry.npmjs.org/motion/latest) |
| `lenis` | 1.3.26 | MIT | [npm](https://registry.npmjs.org/lenis/latest) |
| `@react-three/fiber` | 9.8.1 | MIT | peer: react >=19 <19.4, three >=0.156 — [npm](https://registry.npmjs.org/@react-three/fiber/latest) |
| `@react-three/drei` | 10.7.9 | MIT | peer: react ^19, fiber ^9 — [npm](https://registry.npmjs.org/@react-three/drei/latest) |
| `@react-three/rapier` | 2.2.0 | MIT | deps `@dimforge/rapier3d-compat` 0.19.2 — [npm](https://registry.npmjs.org/@react-three/rapier/latest) |
| `three` | 0.186.1 | MIT | 736 KB min / 185 KB gzip — [bundlephobia](https://bundlephobia.com/api/size?package=three) |
| `meshline` | 3.3.1 | MIT | peer three >=0.137 — [npm](https://registry.npmjs.org/meshline/latest) |

Note: the current Next.js docs are at **v16.4.0 (updated 2026-09-10)**, and they say **React 19.3 includes `<ViewTransition>`** ([Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions)). The brief asks for Next.js 15. Everything below works on Next 15 except the stable `<ViewTransition>`; see Q4.

---

## Q1. GSAP status in 2025–2026: fully free? License, current version, `useGSAP` with Next.js App Router / React 19 / Strict Mode, cleanup, SSR pitfalls

### Takeaway
GSAP has been 100% free since the 3.13 release (April 29, 2025). That covers commercial use and every former Club plugin: SplitText, MorphSVG, DrawSVG, ScrollSmoother, Inertia and the rest. The current version is **3.15.0 (April 13, 2026)**, installed from the plain `gsap` npm package. The license is free but **not open source**: it is a proprietary Webflow license with a non-compete clause aimed at no-code animation builders, which does not affect a personal portfolio. In the App Router, `useGSAP()` from `@gsap/react` 2.1.2 inside a `"use client"` component is the supported pattern. It wraps `gsap.context()`, so animations, ScrollTriggers and SplitText instances are reverted on unmount, which also makes Strict Mode's double-invoked effects safe.

### Cited Findings
**Licensing and pricing**
- Webflow: "GSAP is now 100% free to all users — Webflow customer or not… including the previously paid Club plugins." The standard license was expanded to cover commercial use — [Webflow update](https://webflow.com/updates/gsap-becomes-free); [Webflow forum announcement](https://discourse.webflow.com/t/webflow-makes-gsap-100-free/319967)
- GSAP 3.13 release notes: "GSAP is now 100% FREE including ALL of the bonus plugins like SplitText, MorphSVG… even for commercial use." — [gsap.com/blog/3-13](https://gsap.com/blog/3-13/)
- The `gsap-trial` npm package is deprecated. Everything is now in the standard `gsap` package — [npm gsap-trial](https://npmjs.com/package/gsap-trial); [gsap-trial README](https://cdn.jsdelivr.net/npm/gsap-trial@3.13.0/README.md)
- License terms: commercial use is covered. Use is restricted only in "tools that allow users to build visual animations without code" that compete with Webflow's visual animation building capabilities; that use needs Webflow's written consent. Webflow "may terminate" the license for non-compliance. The license is proprietary, and Webflow retains all IP — [GSAP Standard License](https://gsap.com/standard-license/)
- Motion's comparison page (a competitor, so biased) describes GSAP as "closed source" and "owned and funded by Webflow", and notes the license can be terminated at Webflow's discretion — [motion.dev GSAP vs Motion](https://motion.dev/docs/gsap-vs-motion)

**Release history**
- 3.13: April 29, 2025. 3.14: December 8, 2025, which added a MorphSVG `smooth` option that inserts extra anchor points for cleaner morphs. 3.15: April 13, 2026, which added `easeReverse` for "adaptive directional easing", controlling how an ease behaves when a tween is reversed — [gsap.com/blog](https://gsap.com/blog/)
- The SplitText rewrite in 3.13 is about 50% smaller and adds built-in screen-reader accessibility and easy masking — [Webflow update](https://webflow.com/updates/gsap-becomes-free); [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)

**Bundle size**
- `gsap` 3.15.0 main entry is 70,605 B minified / 27,350 B gzip, with zero dependencies — [bundlephobia API](https://bundlephobia.com/api/size?package=gsap@3.15.0)
- Motion's comparison table lists GSAP core at about 23 KB, and ScrollTrigger and scroll-linked animation at +12 KB each — [motion.dev](https://motion.dev/docs/gsap-vs-motion) (competitor-published numbers)

**`useGSAP` (from `@gsap/react`)**
- Install with `npm install @gsap/react`, then call `gsap.registerPlugin(useGSAP)` once to "avoid React version discrepancies" — [gsap.com React guide](https://gsap.com/resources/React/)
- Signature is `useGSAP(callback, config)`. `config` takes `dependencies` (default `[]`), `scope` (a ref that limits selector text to that container's descendants) and `revertOnUpdate` (default false; when true, the context reverts whenever a dependency changes) — [gsap.com React guide](https://gsap.com/resources/React/)
- The hook "automatically handles cleanup using gsap.context()". Animations, ScrollTriggers, Draggables and SplitText instances created during the hook's execution are reverted on unmount — [gsap.com React guide](https://gsap.com/resources/React/)
- Animations created later, in click handlers or `setTimeout`, are not context-safe. Wrap them with `contextSafe()`:
  ```js
  const { contextSafe } = useGSAP({ scope: container });
  const onClick = contextSafe(() => gsap.to('.good', { rotation: 180 }));
  ```
  Remove any manually added event listeners in the returned cleanup function — [gsap.com React guide](https://gsap.com/resources/React/)
- SSR: the hook "uses a layout effect when available and falls back to useEffect when window is undefined". With the App Router or RSC, put `"use client"` at the top of the file — [gsap.com React guide](https://gsap.com/resources/React/)
- Strict Mode: double-invoked effects can create duplicate or conflicting animations, or break `from()` tweens, unless they are reverted. `useGSAP` follows React's cleanup model to handle this. The page discusses React 18 and does not mention React 19 explicitly — [gsap.com React guide](https://gsap.com/resources/React/)

### Inferences
- GSAP should be the primary engine for this portfolio. Every requested effect depends on a former Club plugin: SplitText (kinetic type, blur reveals), DrawSVG (brush path, timeline, brackets), MorphSVG (curved curtain), Flip (grid and accordion), ScrollTrigger plus `containerAnimation` (horizontal kinetic section), CustomEase and `quickTo` (cursor follower). All of them are now free.
- The non-compete clause only covers building a no-code animation tool, so a developer portfolio is clearly fine.
- `useGSAP` behavior under React 19 is not called out in the docs. The cleanup contract is the same as React 18 Strict Mode, so the same pattern applies.
- SSR pitfall: never call `gsap.registerPlugin` or touch `window` or `document` in a Server Component. Keep a single `lib/gsap.ts` client module that registers plugins once, and import `gsap` only from there.
- Two more SSR pitfalls: elements animated with `from()` flash in their final state before hydration, and the fix is to hide them with CSS such as `visibility:hidden` or `opacity:0` and reveal them with `autoAlpha` in the timeline. Also, SplitText must run after fonts load; see Q6.

### Gaps
- The `@gsap/react` README does not explicitly confirm React 19 support. The peer dependency is `react >=17`, so it installs without conflicts.
- No official per-plugin gzip sizes were found for ScrollTrigger, SplitText or DrawSVG on gsap.com. The only per-plugin figures come from Motion's competitor table.

---

## Q2. Motion (formerly Framer Motion): what it is best at, bundle size, and when to combine it with GSAP vs pick one

### Takeaway
Motion is now at **v14.1.0 (MIT)**, past the v11 and v12 the brief mentions. Its unique strengths are **declarative React layout animations (`layout`, `layoutId`), `AnimatePresence` exit animations, gestures and springs**, plus hardware-accelerated WAAPI animations. It is weaker than GSAP for long scrubbed timelines, SplitText-style typography and SVG plugins (Motion's split text requires the paid Motion+). For this portfolio: **GSAP is the primary engine. Add Motion through `LazyMotion` + `m` only for mount/unmount and layout-morph UI** (profile picker, preloader unmount, accordion cards, filtered grid), and never animate the same property of the same element with both libraries.

### Cited Findings
- Versions: v11 changed velocity and render timing. v12 had no breaking changes for React and introduced the `motion` package with `motion/react` imports. v13 stopped bundling `@emotion/is-prop-valid`, which matters for styled-components and Emotion users. v14 had no breaking changes for React but deprecated some internal APIs. The upgrade guide gives no release dates — [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide)
- Current version 14.1.0, MIT — [npm motion](https://registry.npmjs.org/motion/latest)
- Bundle sizes: the full `motion` component is 34 KB. `m` + `LazyMotion` is just under 4.6 KB on initial render. `domAnimation` adds 15 KB and `domMax` (needed for layout animations) adds 25 KB. `useAnimate` mini is 2.3 KB; the hybrid version is 17 KB — [Motion: reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size)
- Motion's comparison page claims: `animate()` mini 2.6 KB and full 18 KB vs GSAP core 23 KB. Scroll triggers cost Motion +0.5 KB vs GSAP +12 KB, and scroll-linked animations +2.5 KB vs +12 KB. Motion's animations are "hardware accelerated" and keep running while JavaScript is blocked; GSAP's are not. GSAP's timeline is mutable; Motion's cannot add or remove tracks during playback. GSAP-only features include grid stagger, relative values, percentage timeline offsets and repeat events. Split Text needs Motion+ — [motion.dev GSAP vs Motion](https://motion.dev/docs/gsap-vs-motion) (vendor-authored; treat performance claims as marketing)
- Layout animations: `<motion.div layout />` measures the layout change and animates it with CSS `transform`. `layoutId` creates shared elements that crossfade and morph between components. `LayoutGroup` coordinates siblings. Children need `layout` too for scale correction. `borderRadius` and `boxShadow` are only corrected when set via `style` or animation props. `layout="position"` suits elements that change aspect ratio, such as images — [Motion layout animations](https://motion.dev/docs/react-layout-animations)
- Expanding-card example: `<motion.div layout style={{ height: isOpen ? "100px" : "500px" }} onClick={() => setOpen(!isOpen)} />` — [Motion layout animations](https://motion.dev/docs/react-layout-animations)
- Olivier Larose's Next.js remake of Dennis Snellenberg's Awwwards portfolio uses **Framer Motion and GSAP together**. Framer Motion handles mount, unmount and variant work: the preloader exit, word reveals, and the floating modal's scale in and out. GSAP handles ScrollTrigger and `quickTo` cursor and magnetic effects — [Olivier Larose: Awwwards Landing Page](https://blog.olivierlarose.com/tutorials/awwwards-landing-page); [Project Gallery Mouse Hover](https://blog.olivierlarose.com/tutorials/project-gallery-mouse-hover)

### Inferences
- **When to use Motion here:**
  - `AnimatePresence` for the preloader, Netflix intro and profile-picker unmount, since exit animations of unmounting React trees are awkward with GSAP alone
  - `layoutId` to morph the selected profile avatar into the hero
  - `layout` for the horizontal accordion cards and for reordering the periodic-table grid
- **When to use GSAP:** everything scroll-scrubbed, pinned, text-split, SVG-drawn, or sequenced as a multi-step timeline.
- **Picking only one:** pick GSAP and use `Flip` instead of Motion layout. That saves about 30 KB (`m` + `domMax`) at the cost of more imperative code. Both choices are defensible, and the decision mostly comes down to developer ergonomics.
- Don't let Motion's `useScroll` and GSAP ScrollTrigger both drive scroll effects in the same app. Two scroll systems make Lenis sync and refresh ordering harder. Pick ScrollTrigger for all scroll-linked work.

### Gaps
- No independent, non-vendor benchmark comparing Motion v14 and GSAP 3.15 runtime performance was found.
- Release dates for Motion v13 and v14 were not found on the upgrade guide.

---

## Q3. Lenis smooth scroll: version, GSAP ScrollTrigger integration, touch behavior, accessibility

### Takeaway
**Lenis 1.3.26 (MIT)** by darkroom.engineering is still the standard smooth-scroll layer. Integrate it by driving `lenis.raf` from `gsap.ticker`, calling `ScrollTrigger.update` on Lenis scroll events, and setting `gsap.ticker.lagSmoothing(0)`. In React, use `<ReactLenis root options={{ autoRaf: false }} ref={…}>` from `lenis/react`. By default touch devices keep native scrolling (`syncTouch: false`), which is the right choice. Lenis wraps native scroll, so `position: sticky`, anchors and accessibility keep working, but it does not support CSS scroll-snap and cannot smooth scrolling over iframes.

### Cited Findings
- Current version 1.3.26, described as "How smooth scroll should be" — [npm lenis](https://registry.npmjs.org/lenis/latest); [GitHub](https://github.com/darkroomengineering/lenis)
- Official GSAP integration:
  ```js
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
  ```
  The GSAP ticker reports time in seconds, and Lenis expects milliseconds — [Lenis README](https://github.com/darkroomengineering/lenis)
- `autoRaf` defaults to false. Either enable it or call `lenis.raf(time)` from your own loop — [Lenis README](https://github.com/darkroomengineering/lenis)
- React: `ReactLenis` props are `options`, `root` (true means the global instance on `<html>`; `'asChild'` is for custom containers) and `ref`. `useLenis(callback, deps, priority)` returns the instance. React GSAP sync pattern:
  ```jsx
  useEffect(() => {
    function update(time) { lenisRef.current?.lenis?.raf(time * 1000) }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])
  return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
  ```
  — [lenis/react README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md)
- Import `lenis/dist/lenis.css`. It is the "Recommended CSS", and `autoToggle` requires it — [Lenis README](https://github.com/darkroomengineering/lenis)
- `syncTouch` defaults to false. It mimics touch-device scrolling and "can be unstable on iOS<16" — [Lenis README](https://github.com/darkroomengineering/lenis)
- Use `data-lenis-prevent` (or the `-wheel`, `-touch`, `-vertical` and `-horizontal` variants) to let nested scrollers such as modals and code blocks scroll natively. `allowNestedScroll: true` also works but costs performance — [Lenis README](https://github.com/darkroomengineering/lenis)
- Limitations:
  - Smooth scroll stops over iframes.
  - Safari is capped at 60 fps, or 30 fps in low-power mode.
  - `position: fixed` may lag on pre-M1 macOS Safari.
  - CSS scroll-snap is unsupported; use `lenis/snap` instead.

  Native scroll is preserved, "so position: sticky, anchor links, and accessibility keep working" — [Lenis README](https://github.com/darkroomengineering/lenis)
- Reduced motion: the fetched README summary reports a `respectReducedMotion` option, default true, that disables smoothing for reduced-motion users, plus a `lenis.prefersReducedMotion` flag — [Lenis README](https://github.com/darkroomengineering/lenis). Flag: verify this option name against the installed version's TypeScript types.

### Inferences
- With Lenis smoothing, use `scrub: true` or a small number like `0.5` on ScrollTriggers. A large `scrub` stacked on Lenis's own easing feels laggy. For the same reason, don't use GSAP ScrollSmoother together with Lenis: pick one, and Lenis is the lighter choice.
- Call `lenis.stop()` while the preloader or Netflix intro plays and `lenis.start()` when it finishes, so users can't scroll under the intro.
- On route change in the App Router, call `lenis.scrollTo(0, { immediate: true })` and then `ScrollTrigger.refresh()` after the new page's images and fonts settle.
- The previous build was judged "not premium" while using CSS, IntersectionObserver and Lenis. Lenis itself wasn't the issue. Premium feel comes from **choreography**: scrubbed timelines, masked SplitText reveals, custom eases such as `cubic-bezier(0.76, 0, 0.24, 1)`, which Larose uses, and sequencing between sections.

### Gaps
- No primary source on Lenis bundle size was found.
- No accessibility audit of Lenis, for example with screen readers or keyboard paging, was found beyond the README's claims.

---

## Q4. CSS-native options in 2026: scroll-driven animations and the View Transitions API (Next.js support, `next-view-transitions`, React `<ViewTransition>`)

### Takeaway
Use CSS **scroll-driven animations** (`animation-timeline: scroll()/view()`) only as progressive enhancement for simple fades and progress bars. They work in Chrome/Edge 115+ and Safari 26, but **Firefox still ships them behind a flag** (reported as of June 2026), so they are not Baseline. Choreographed, pinned or SplitText effects still need GSAP. **View Transitions:** React `<ViewTransition>` is in React 19.3 and works in Next 16 App Router with no config. On **Next.js 15** it was still an experimental flag (`experimental.viewTransition`) with `unstable_ViewTransition`, and the docs said it was "not recommended for production". That is a strong argument to start the project on Next 16.x. If it must stay on Next 15, page transitions should use `template.tsx` with GSAP or Motion `AnimatePresence`.

### Cited Findings
**Scroll-driven animations**
- `scroll()` tracks a scroller's progress. `view()` tracks an element crossing its scrollport. Ranges are `cover`, `entry`, `exit`, `contain`, `entry-crossing` and `exit-crossing`. Named timelines and `timeline-scope` let non-ancestors share a timeline. Animations run "off the main thread" — [Chrome for Developers](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
  ```css
  .card { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 50%; }
  .progress { transform-origin: 0 50%; animation: grow auto linear; animation-timeline: scroll(root block); }
  ```
- Support: Chrome/Edge 115 (July 2023) and Safari 26, with threaded scroll-driven animations in 26.4. Firefox 152 (June 2026) still has it behind `layout.css.scroll-driven-animations.enabled`, on by default only in Nightly. It is on the Interop 2026 list — [buildmvpfast blog](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026); [drweb.de](https://www.drweb.de/css-scroll-animationen-ohne-javascript/). These are secondary sources; Chrome's doc lists only "Firefox Technology Preview" — [Chrome for Developers](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- Mozilla's standards position is positive, but the feature was not enabled by default at the time of the comment — [Mozilla Connect](https://connect.mozilla.org/t5/ideas/implement-css-scroll-driven-animations-animation-timeline/idc-p/116613)
- Recommended fallback: wrap the CSS in `@supports (animation-timeline: scroll())` — [drweb.de](https://www.drweb.de/css-scroll-animationen-ohne-javascript/)

**View Transitions (browser)**
- Cross-document (MPA) view transitions are supported in Chrome and in Safari 18.2. Chrome's documentation lists Firefox as not supported. Same-document support in Firefox is listed as 144 by Chrome's 2025 update and as 133 by a secondary guide, which conflict — [Chrome cross-document docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document); [Chrome: What's new in view transitions 2025](https://developer.chrome.com/blog/view-transitions-in-2025); [devtoolbox guide](https://devtoolbox.dedyn.io/blog/css-view-transitions-complete-guide)

**Next.js and React integration**
- **Next.js 15** (docs v15.5.27): `experimental: { viewTransition: true }` plus `import { unstable_ViewTransition as ViewTransition } from 'react'`. The docs say it is an "experimental API from the React team… not recommended for production use" — [Next.js 15 viewTransition docs](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition)
- **Next.js 16.x** (docs v16.4.0, 2026-09-10): "View transitions work in the App Router with no configuration. React 19.3 includes the `<ViewTransition>` component and `addTransitionType` API." The import is `import { ViewTransition } from 'react'`. Animations are activated by Transitions, `<Suspense>` and `useDeferredValue`, and route navigations count as transitions — [Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions)
- Patterns:
  - Shared element via a matching `name`. Customize with `share="morph" default="none"` and `::view-transition-group(.morph)`.
  - Suspense reveals via `enter`/`exit` classes.
  - Directional navigation via `<Link transitionTypes={['nav-forward']}>`.
  - Anchor a fixed header with `viewTransitionName` plus `animation:none`.
  - Use `::view-transition { pointer-events: none; }` to keep the page interactive.
  - Wrap the rules in a reduced-motion media query.

  Put the wrapper in `page.tsx`, not in the layout, because layouts persist — [Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions)
- The guide says React's integration uses newer API features, transition types and `view-transition-class`, available in "Chromium 125+ and recent Safari and Firefox versions". Without browser support the app works and simply doesn't animate. Demo: [react-view-transitions-demo.labs.vercel.dev](https://react-view-transitions-demo.labs.vercel.dev); code: [vercel-labs/react-view-transitions-demo](https://github.com/vercel-labs/react-view-transitions-demo) — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

### Inferences
- Treat Next 16.x with React 19.3 as the 2026 default. R3F 9.8.1's peer range `react >=19 <19.4` is compatible with it ([npm](https://registry.npmjs.org/@react-three/fiber/latest)). A clean architecture would look like this:
  - `<ViewTransition>` handles route-level transitions, such as project-card-to-case-study morphs.
  - GSAP handles in-page choreography.
  - Lenis handles scroll.
- If the team stays on Next 15, skip `unstable_ViewTransition`. Use a `template.tsx` that runs a GSAP curtain on mount, or Motion `AnimatePresence`. The third-party `next-view-transitions` package is another option, but it is less necessary now that React ships the API.
- A good CSS-native candidate is the **scroll-drawn gold timeline**: `scaleY` on a line via `animation-timeline: view()`, with a GSAP fallback for Firefox.

### Gaps
- caniuse.com could not be fetched directly. The exact Firefox scroll-driven-animation status after June 2026 and the exact Firefox same-document View Transitions version (133 vs 144) are unconfirmed.
- I did not fetch the `next-view-transitions` package's current version or maintenance status.

---

## Q5. WebGL options for tasteful effects: R3F v9 + drei + rapier, OGL, curtains.js, custom shaders; bundle cost and lazy-loading

### Takeaway
three.js is heavy: **0.186.1 is about 185 KB gzip** for the full package. Only load WebGL where it is the effect itself, namely the **lanyard badge** and optionally the **spotlight beam shader**. Never use it as decorative background, which was the "cheap 3D" problem. For the lanyard there are two proven routes:
- **R3F 9.8.1 + drei 10.7.9 + @react-three/rapier 2.2.0 + meshline 3.3.1**, the Vercel Ship technique.
- The newer **React Bits Lanyard**, whose current source uses plain `three` with a custom constraint solver and no rapier: lighter, with reduced-motion and offscreen pausing built in.

For 2D shader effects (god-rays, noise gradients, image distortion), **OGL (~8 KB core gzip)** is a far lighter host than three.js. Lazy-load every canvas with `next/dynamic` from a client component and mount it only when near the viewport.

### Cited Findings
- `three` 0.186.1: 736,231 B minified / 184,898 B gzip — [bundlephobia](https://bundlephobia.com/api/size?package=three)
- OGL: "small, effective WebGL library" with zero dependencies, about 8 KB core, 6 KB math and 10–15 KB extras (min+gzip). Last push was 2025-04-13 per a third-party index — [OGL README](https://raw.githubusercontent.com/oframe/ogl/master/README.md); [GitHub oframe/ogl](https://github.com/oframe/ogl)
- curtains.js turns HTML images and videos into WebGL planes positioned by CSS. v7 was a rewrite, it is MIT licensed, and its last push was 2025-04-03 per a third-party index — [curtainsjs.com](https://www.curtainsjs.com/); [Codrops: WebGL Video Transitions with Curtains.js](https://tympanus.net/codrops/?p=51333)
- R3F performance:
  - `<Canvas frameloop="demand">` renders only on change, and `invalidate()` requests frames.
  - drei `<PerformanceMonitor onDecline={() => setDpr(1)} flipflops={3} onFallback={…}>` adapts DPR.
  - Use instancing for many objects, and keep draw calls to "a few hundred or less".
  - Nested `Suspense` lets low-quality models load first.

  — [R3F scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- drei `<SpotLight>` is "A Volumetric spotlight" with `distance`, `angle`, `attenuation` and `anglePower` (default 5). An optional `depthBuffer` makes it a soft particle where it meets geometry — [drei SpotLight docs](https://drei.docs.pmnd.rs/staging/spot-light)
- glsl-godrays implements "Volumetric Light Scattering as a Post-Process" with an occlusion pass at reduced resolution — [npm glsl-godrays](https://www.npmjs.com/package/glsl-godrays)
- Aceternity UI "Spotlight Shader" is a canvas block that renders beams as soft-gradient cones with position, color, intensity, size, spread angle and blur — [Aceternity spotlight shader](https://ui.aceternity.com/blocks/shaders/spotlight-shader)

### Inferences
- **What makes 3D look "cheap"** (my read of why the earlier build failed; no source states it): generic floating meshes or particle fields with no relationship to content, default lighting, unbounded DPR, constant 60 fps rendering, and long load times. **Tasteful 3D** is a single, purposeful, interactive object, the physics badge, with a PBR material such as clearcoat or iridescence, plus 2D shader post-effects that look photographic: haze, grain, light beams.
- **Lazy-load pattern for App Router** (inference; standard Next.js practice):
  1. Create `components/three/LanyardCanvas.client.tsx` with `"use client"`.
  2. In a client wrapper, call `const Lanyard = dynamic(() => import('./LanyardCanvas.client'), { ssr: false, loading: () => <BadgePoster/> })`.
  3. Mount it only after an IntersectionObserver says the hero is near, or after `requestIdleCallback`.

  This keeps three, R3F and rapier (rapier also ships a WASM blob) out of the initial JS. `ssr:false` must be used from a client component in the App Router.
- Cap DPR at `[1, 2]`, use `frameloop="demand"` when the badge is asleep, pause when offscreen, and keep a static WebP poster fallback for low-end devices and reduced motion.

### Gaps
- No primary bundle-size figure was found for `@react-three/rapier` with its `@dimforge/rapier3d-compat` WASM, or for drei tree-shaken.
- curtains.js and OGL commit activity in 2026 was not confirmed.
- No Codrops tutorial specifically on a stage-spotlight volumetric beam was found.

---

## Q6. Recipe for each requested animation (library + API + key parameters + references)

### Takeaway
Every effect can be built with **GSAP (ScrollTrigger, SplitText, DrawSVG, MorphSVG, Flip, quickTo, CustomEase) + Lenis**, with Motion for mount/unmount and layout morphs and WebGL for the lanyard and, optionally, the spotlight. The citable reference implementations are:
- the Vercel lanyard article
- React Bits Lanyard
- Olivier Larose's Snellenberg remake (preloader, floating thumbnail, magnetic CTA, sticky stacking cards)
- mvaneijgen's GSAP stacking-card CodePens
- Claudio Bonfati's Netflix CSS intro
- the GSAP docs for SplitText, `containerAnimation`, DrawSVG and `quickTo`

### Cited Findings

**(a) Netflix-style cinematic intro + "Who's watching?" picker**
- Claudio Bonfati's pure-CSS Netflix intro is at [codepen.io/claudio_bonfati/pen/mdryxPv](https://codepen.io/claudio_bonfati/pen/mdryxPv), with a write-up on [DEV](https://dev.to/claudiobonfati/netflix-intro-animation-pure-css-1m0c).
  - Each letter gets helper divs layered over an exported image of that letter.
  - It has three phases: a fade across the letter's sides, a "burst" of vertical light bars, and a camera move as the lights recede.
  - Colors are themable via Sass variables.

  — [search summary of DEV/Smashing coverage](https://dev.to/claudiobonfati/netflix-intro-animation-pure-css-1m0c); [speckyboy roundup](https://speckyboy.com/?p=148865)
- No reference implementation of the "Who's watching?" picker animation was found. The closest is a React 19 Netflix clone with a profile screen animated by Framer Motion — [STREAMFIX](https://gitblind.noratr.app/YUKII2K3/STREAMFIX)
- Motion `layoutId`: a new element with a matching ID animates out from the old one. Wrap it in `AnimatePresence` to animate back — [Motion layout animations](https://motion.dev/docs/react-layout-animations)

**(b) AI talking-video hero, lanyard badge, periodic table, accordion cards**
- **Vercel lanyard technique:**
  - Stack: Blender, R3F, drei, react-three-rapier, MeshLine. MeshLine is registered with `extend({ MeshLineGeometry, MeshLineMaterial })`.
  - Three `RigidBody` joints (`j1`–`j3`), each with a `BallCollider` of radius 0.1, hang from a `fixed` body. They are chained with `useRopeJoint(a, b, [[0,0,0],[0,0,0], 1])`.
  - The card attaches with `useSphericalJoint(j3, card, [[0,0,0],[0,1.45,0]])`.
  - The band is a `THREE.CatmullRomCurve3` through j3, j2, j1 and the fixed point, updated each frame with `band.current.geometry.setPoints(curve.getPoints(32))`.
  - The card is a `CuboidCollider [0.8, 1.125, 0.01]`. It is `kinematicPosition` while dragged and `dynamic` otherwise. A tilt correction applies `ang.y - rot.y * 0.25` to the angular velocity.
  - Dragging unprojects the pointer with `vec.set(pointer.x, pointer.y, 0.5).unproject(camera)` and applies it with `setNextKinematicTranslation`.
  - The card face is a drei `<RenderTexture width={2000} height={2000}>` containing `<Text3D>` names, applied to a `meshPhysicalMaterial` with `clearcoat={1} iridescence={1} metalness={0.5} roughness={0.3}`.
  - The implementation is about 80 lines.

  — [Vercel blog](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)
- **React Bits Lanyard:**
  - Install with `npx shadcn@latest add @react-bits/Lanyard-TS-TW`. The card can be dragged, thrown, and clicked to flip — [reactbits.dev/components/lanyard](https://reactbits.dev/components/lanyard)
  - The current source imports only `react` and `three`. It is `'use client'`, with props `gravity`, `damping`, `elasticity`, `breeze`, `intro = true` (a drop-in intro), `strapLength`, `finish = 'glossy'` and `frontImage`/`backImage`.
  - It uses a custom solver (`JOINTS = 4`, `ITERATIONS = 2`, `MAX_STEP = 1/960` substeps). It disables breeze and intro under `prefers-reduced-motion`, caps DPR at 2, pauses offscreen via IntersectionObserver, and sleeps when calm.
  - On touch it uses `touchAction: 'pan-y'` and calls `preventDefault` only when the card is hit.

  — [React Bits source (GitHub raw)](https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/ts-tailwind/Components/Lanyard/Lanyard.tsx)
- **Periodic table filter:** GSAP supports **grid stagger**. Per Motion's own comparison table, Motion does not — [motion.dev GSAP vs Motion](https://motion.dev/docs/gsap-vs-motion)
- **Accordion:** Motion `layout` animates size and position changes with transforms. Give children `layout` for scale correction, and use `layout="position"` on images — [Motion layout animations](https://motion.dev/docs/react-layout-animations)

**(c) Spotlight beam, gold headings, portrait card, stacking cards, gold timeline**
- **Aceternity "Spotlight"** is an SVG ellipse with a Gaussian blur (third-party doc: stdDeviation 151), white fill at about 21% opacity, `pointer-events:none`, and a custom `animate-spotlight` keyframe. **"Spotlight New"** uses dual animated gradients (defaults 560 px width, 1380 px height, 7 s duration) and the `motion` package — [Aceternity Spotlight](https://ui.aceternity.com/components/spotlight); [Spotlight New](https://ui.aceternity.com/components/spotlight-new)
- **Blur cost:** animating `filter: blur()` is expensive because the GPU shader cost grows with pixel count and radius, which can blow the 16 ms frame budget. Chrome's workaround is to precompute a few blurred copies and cross-fade between them. The article is older, so verify current behavior — [Chrome: Animating a blur](https://developer.chrome.com/blog/animated-blur/)
- **Stacking cards, sticky + scale** (Olivier Larose "Cards Parallax"):
  - Each card is 100vh and sticky, with `top: calc(-5vh + ${i * 25}px)`.
  - Container progress uses `useScroll({ offset: ['start start','end end'] })`.
  - Each card has `targetScale = 1 - ((projects.length - i) * 0.05)`, `range = [i * .25, 1]` and `scale = useTransform(progress, range, [1, targetScale])`.
  - Inner image scale `[2, 1]` comes from a per-card `useScroll({ offset: ['start end','start start'] })`.
  - Lenis provides the smoothing.

  — [Olivier Larose: Cards Parallax](https://blog.olivierlarose.com/tutorials/cards-parallax)
- **Stacking cards, GSAP approach** (moderator mvaneijgen):
  - Stack cards in a single CSS grid cell rather than with absolute positioning.
  - Offset them with `gsap.set` by index, animate with `.from()`, and add ScrollTrigger last.
  - Use `ease: "none"` with scrub.

  CodePens: [collection](https://codepen.io/collection/MgeOjK), [scale + perspective](https://codepen.io/mvaneijgen/pen/MWxgQbV), [scrub ease none](https://codepen.io/mvaneijgen/pen/gOEYewo). A forum user found CSS `sticky` combined with ScrollTrigger `pin` hard to get working together — [GSAP forum thread](https://gsap.com/community/forums/topic/39367-scrolltrigger-stacking-cards-animation-logic-to-create-any-effect-yes-even-yours/); [forum 33618](https://gsap.com/community/forums/topic/33618-scrolltrigger-card-stacking/)
- **ScrollTrigger rules:**
  - Don't animate the pinned element itself; animate its children.
  - Only one pinned element per trigger.
  - `pinSpacing` defaults to false in flex containers.
  - `scrub: 1` means one second of catch-up.
  - `anticipatePin: 1` prevents flashes at fast scroll.
  - `ScrollTrigger.matchMedia` is deprecated in favor of `gsap.matchMedia`.

  — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **DrawSVG** animates `stroke-dashoffset` and `stroke-dasharray`. It works on `path`, `line`, `polyline`, `polygon`, `rect` and `ellipse`. Examples: `gsap.from('.draw-me', { drawSVG: 0 })`, `"0 5%"` → `"95% 100%"` for a moving dash, `"live"` to recalculate length. Caveats: only strokes animate; Firefox may stop short, so use 102%; iOS has `rect` bugs; `<use>` contents can't be animated — [DrawSVG docs](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)

**(d) Preloader, brush path, hover thumbnails, blur-in list, kinetic type, CTA**
- **Snellenberg-style preloader** (Larose remake):
  - A greetings array advances by index. The first word shows for 1000 ms, each later word for 150 ms, and the loader stops on the last word.
  - The preloader unmounts after a 2000 ms timeout.
  - The curved SVG curtain's control point animates from `height + 300` to `height` over 0.7 s with ease `[0.76, 0, 0.24, 1]`, with a 0.3 s exit delay.
  - The container slides to `top: -100vh` over 0.8 s with a 0.2 s delay.

  — [Olivier Larose: Awwwards Landing Page](https://blog.olivierlarose.com/tutorials/awwwards-landing-page). The same site has "Svg Curve Loading" and "Svg Bezier Curve" tutorials — [tutorial index](https://blog.olivierlarose.com/tutorials)
- **Floating cursor thumbnail** (Larose "Project Gallery Mouse Hover"):
  - State is `{active, index}`.
  - The modal holds a vertical image stack offset by `top: index * -100%`.
  - The modal, cursor and "View" label each follow via `gsap.quickTo` on `left`/`top` with `ease: "power3"` and durations **0.8 / 0.5 / 0.45**. The different lags create the layered trailing effect.
  - Open and close use Framer Motion scale variants: 0.4 s, ease `[0.76,0,0.24,1]` to open and `[0.32,0,0.67,0]` to close.

  — [Larose tutorial](https://blog.olivierlarose.com/tutorials/project-gallery-mouse-hover). Older Codrops references: [Creating a Menu Image Animation on Hover (2020)](https://tympanus.net/codrops/2020/07/01/creating-a-menu-image-animation-on-hover/); [Image Reveal Hover Effects (2018)](https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects)
- **`gsap.quickTo`** skips per-call parsing, which makes it right for mousemove:
  ```js
  let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" });
  ```
  It handles one numeric property per function, so use `x` rather than `translateX`. Relative and random values are not supported — [quickTo docs](https://gsap.com/docs/v3/GSAP/gsap.quickTo()/)
- **Magnetic button** (for the "let's talk." CTA): `quickTo` on x and y with duration 1 and `"elastic.out(1, 0.3)"`. The offset from center is multiplied by 0.35, and the button resets to 0 on mouse leave. The fill-on-hover is a paused timeline with `top: "-25%"`, `width: "150%"`, 0.4 s, `power3.in` — [Larose Awwwards Landing Page](https://blog.olivierlarose.com/tutorials/awwwards-landing-page); [Magnetic Button](https://blog.olivierlarose.com/tutorials/magnetic-button); [Sticky Footer](https://blog.olivierlarose.com/tutorials/sticky-footer)
- **SplitText (3.13+):**
  - `mask: "lines"|"words"|"chars"` adds clip wrappers for reveals.
  - `autoSplit: true` re-splits on font load or resize.
  - Inside `onSplit(self)`, return the animation so it is reverted and time-synced on each re-split. Animations created outside `onSplit` go stale.
  - `aria: "auto"` keeps screen readers working. `propIndex` adds `--char` and `--word` CSS variables.
  - Wait for `document.fonts.ready`, or use `autoSplit`, to avoid splitting before fonts load.

  — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- **`containerAnimation`** (for horizontal kinetic text): the container animation must use `ease: "none"`, and "pinning and snapping aren't available on containerAnimation-based ScrollTriggers" — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Scattered-letter references:**
  - Codrops repo "On-scroll animations for typographic elements with GSAP" (MIT, updated Dec 2025) — [codrops GitHub org](https://github.com/orgs/codrops/repositories)
  - Codrops "From SplitText to MorphSVG: 5 Creative Demos Using Free GSAP Plugins" — [tympanus.net](https://tympanus.net/codrops/?p=93244)
  - Motion tutorial "Split Text: Scatter" — [motion.dev](https://motion.dev/tutorials/js-split-text-scatter)
  - Framer "ScatteredText" (letters scatter and spring into place on scroll, with radius, rotation and stagger controls) — [Framer marketplace](https://www.framer.com/marketplace/components/scatteredtext/)
  - Per-char random rotation idiom: `rotation: () => gsap.utils.random(-20, 20)` — [gsap text skill doc](https://skills.sh/microck/gsap-skills/gsap-text)

### Inferences — recipe per animation
(Inferences built from the cited APIs above. Parameter values are recommended starting points to tune by eye, not values from a source.)

**(a) Netflix intro + "Who's watching?"**
1. Full-screen black overlay rendered by a client `<Intro>` in the root layout, gated by `sessionStorage` so it plays once per session. Include a visible "Skip" button, and skip entirely under `prefers-reduced-motion`.
2. Logo: write "DAWOOD" as inline SVG letters in a condensed red display face, Netflix-like but not the Netflix wordmark. A GSAP timeline then plays:
   - letters `scaleY 0→1` with a `clip-path` wipe, staggered at 0.06
   - a "light bars" layer of about 30 thin divs with gradient fills animating `scaleY` and `opacity` with `stagger: {each: 0.015, from: "random"}`
   - a camera push: the logo wrapper goes `scale 1 → 12` with `transformOrigin` on one letter, `ease: "power4.in"`, about 1.2 s, crossfading to black
3. Optional "ta-dum" sound: browsers generally block autoplayed audio without a user gesture (general knowledge, not sourced here), so start it only after a click, for example a "Click to enter" gate.
4. Profile picker: an `AnimatePresence` stage with 3–4 avatars ("Recruiter", "Developer", "Client", "Just browsing"). They enter with a GSAP or Motion stagger: `opacity 0→1`, `scale 0.9→1`, 0.08 stagger. Hover gives `scale 1.06` and a white `outline` with no layout shift.
5. On click, a shared `layoutId` morph moves the selected avatar to the nav or hero corner while the overlay exits. Optionally, set the chosen profile in context to tailor hero copy.

**(b1) AI talking-video hero with giant faded name**
- `<video autoPlay muted loop playsInline preload="metadata" poster=…>`, an AV1/H.264 MP4, in front of a giant `font-size: clamp(6rem, 22vw, 26rem)` name.
- The name is `color: transparent; -webkit-text-stroke: 1px rgba(...)` or about 6% opacity. Animate it with ScrollTrigger scrub: `yPercent: -20`, `opacity → 0`.
- A transparent background needs WebM VP9-alpha plus HEVC-alpha for Safari (general knowledge; see Gaps). The cheaper option is to film or AI-generate on the page's exact background color and feather the edges with `mask-image: radial-gradient(...)`.
- Entry: split the name into chars with SplitText, mask `chars`, `yPercent: 100 → 0`, `stagger: 0.04`, `ease: "expo.out"`.

**(b2) Lanyard Developer-ID badge (drop-in + swing)**
- Fastest path: React Bits Lanyard. It is three-only, includes a drop-in `intro`, reduced-motion support and offscreen pause, and takes custom front and back images. Generate the badge face as an image: name, role "Full-Stack Developer", photo, QR to GitHub.
- Custom path (Vercel): R3F + rapier + meshline as cited, with `Physics gravity={[0,-40,0]}` and a fixed `timeStep` (these two values are from memory of the Vercel CodeSandbox, unverified).
- "Swings on scroll": subscribe with `useLenis(({ velocity }) => …)` and apply a small impulse each frame:
  - rapier: `card.current.applyImpulse({ x: 0, y: 0, z: velocity * k })`
  - React Bits: temporarily raise `breeze`, or add a custom impulse hook
- Mount via `next/dynamic` with `ssr:false`, behind a poster image.

**(b3) "Periodic table of my stack" with filter chips**
- CSS grid of `<button>` elements, each with symbol, atomic number and name, colored by category.
- On chip click:
  ```js
  gsap.to(nonMatches, { autoAlpha: 0.15, scale: 0.94, filter: "grayscale(1)", stagger: { grid: "auto", from: clickedIndex, amount: 0.3 } })
  gsap.to(matches, { autoAlpha: 1, scale: 1, filter: "none" })
  ```
- Use `filter: grayscale` only on small tiles; it's cheap at tile size. For reorder-on-filter, use GSAP `Flip.getState(tiles)` → mutate DOM → `Flip.from(state, { absolute: true, stagger: 0.02, ease: "power3.inOut" })`, or Motion `layout` on each tile.
- Use `aria-pressed` on chips and keep dimmed tiles focusable.

**(b4) Horizontal accordion project cards**
- A flex row of cards, where the active card gets `flex: 5` and the others `flex: 1`. Wrap them in `<motion.div layout>`, with `layout` on the title, `layout="position"` on images, and `borderRadius` in `style`.
- Trigger on hover for desktop and tap for touch, using `gsap.matchMedia` or a `(hover:hover)` check.
- Reveal the inner description with SplitText lines masked, `yPercent 100→0`.
- CSS-only fallback: `transition: flex-grow .6s cubic-bezier(.76,0,.24,1)` is acceptable for 4–6 cards.

**(c1) Volumetric stage spotlight with haze and particles** (layered, cheapest first)
1. **Beam cone (CSS/SVG):** an absolutely positioned div with `clip-path: polygon(45% 0, 55% 0, 100% 100%, 0 100%)` and a background of `linear-gradient(to bottom, rgba(255,240,200,.55), rgba(255,240,200,0) 85%)`, plus a static `filter: blur(24px)` and `mix-blend-mode: screen`. Animate only `opacity` and `transform`, never the blur radius (see Chrome blur cost). Add a soft elliptical "floor pool" of radial-gradient light at the photo's feet.
2. **Haze:** a static SVG `feTurbulence` noise layer masked to the cone with `mask-image: linear-gradient`. Drift it slowly with `transform: translate` in a CSS keyframe.
3. **Dust particles:** a small 2D `<canvas>` of 80–150 particles drifting upward inside the cone polygon, with additive alpha. Pause it offscreen and under reduced motion.
4. **Premium option (WebGL):** a single fullscreen OGL fragment-shader quad that raymarches a cone with fbm-noise density (god-rays), or uses the glsl-godrays post-process approach. Alternatively, R3F drei `<SpotLight volumetric anglePower attenuation>`, but only if R3F is already loaded for the lanyard.
5. **Light-on moment:** a GSAP timeline that flickers opacity `0 → .6 → .1 → 1` with `steps` or CustomEase "rough", scales `scaleY 0→1` from the top, then reveals the full-body cutout photo with `clip-path: inset(100% 0 0 0) → inset(0)` and a filter brightness ramp.
6. The photo is a WebP/AVIF cutout with alpha. Add a rim-light gradient overlay masked to the subject's alpha using `mask-image: url(subject.png)`.

**(c2) Giant condensed gold-gradient headings with glow and blur-to-sharp reveal**
- Font: condensed display face, such as Anton, Bebas Neue or a variable condensed grotesk, uppercase, `clamp(4rem, 14vw, 14rem)`.
- Gold: `background: linear-gradient(180deg, #F8E7A1 0%, #D4AF37 45%, #8C6A1C 70%, #F3D27A 100%); -webkit-background-clip: text; color: transparent`.
- Glow: use `filter: drop-shadow(0 0 24px rgba(212,175,55,.35))` on the element. `text-shadow` paints over clipped-gradient text, which is a known quirk (general knowledge).
- Optional sheen: animate `background-position` on a `200%` gradient.
- Reveal: SplitText `type: "chars"` (or words for long lines) with `mask: "lines"`, then `gsap.from(chars, { filter: "blur(12px)", autoAlpha: 0, yPercent: 40, scale: 1.1, stagger: 0.03, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger, start: "top 80%" } })`.
- Keep blur radius ≤ 12px, short durations, and only one heading at a time (blur cost). Remove the filter on complete with `clearProps: "filter"`.

**(c3) Gold-framed portrait card with corner brackets**
- Card with a 1px gold border (`border-image: linear-gradient(...) 1`, or a padded parent per Motion's border advice). Four corner brackets as SVG `<path>` L-shapes.
- Timeline:
  1. Brackets `drawSVG: 0 → 100%` with stagger 0.1.
  2. Frame `clip-path: inset(50% 50% 50% 50%) → inset(0)`.
  3. Inner `<img>` `scale 1.25 → 1` with `ease: "expo.out"`.
- Hover: brackets move outward 6px via `quickTo`, plus a subtle 3D tilt via `quickTo` on `rotationX/rotationY` within ±6°.

**(c4) Sticky stacking project cards**
- Preferred: the CSS sticky + GSAP scale hybrid, with no pin, to avoid the sticky/pin conflict the forum noted. Each `.card` gets `position: sticky; top: calc(10vh + i * 20px)`.
- For each card except the last:
  ```js
  gsap.to(card, { scale: 1 - (n - i) * 0.05, ease: "none", scrollTrigger: { trigger: cards[i+1], start: "top bottom", end: "top top+=10vh", scrub: true } })
  ```
  Also animate an overlay div's opacity from 0 to 0.5 to darken earlier cards (cheaper than `filter: brightness`).
- The Larose Motion version is a drop-in alternative with the exact math cited above. Use `transform-origin: top center`.

**(c5) Scroll-drawn vertical gold timeline**
- A straight line uses a div with `transform-origin: top; scaleY: 0 → 1` scrubbed over the section (`start: "top center", end: "bottom center", scrub: true`). A curved spine uses an SVG path with `drawSVG: "0%" → "100%"`; use 102% in Firefox per the DrawSVG docs.
- Nodes: one ScrollTrigger per milestone with `toggleClass` or an `onEnter` timeline: dot scales and glows, date and text get a SplitText line reveal.
- Progressive enhancement: CSS `animation-timeline: view()` for the line inside `@supports`.

**(d1) Multilingual preloader + curtain wipe**
- Words: "Hello · Assalam-o-Alaikum · Bonjour · Hola · Ciao · Hallo · こんにちは · مرحبا", with a dot prefix. Show the first word for 1000 ms and the rest for 150 ms each (Larose timings), as a GSAP timeline of `.set` text swaps or a React state interval.
- Exit: the overlay goes `yPercent: -100` over 0.8 s with ease `CustomEase "0.76,0,0.24,1"`. Its curved bottom edge is an SVG path whose control-point `d` attribute tweens from `Q w/2 h+300` to `Q w/2 h` (attr tween or MorphSVG).
- Start the hero timeline from a shared master timeline label so the hero headline begins rising while the curtain is about 60% up. Call `lenis.stop()` until done, and wait for `document.fonts.ready` plus hero video `canplay` before exiting.

**(d2) SVG brush path drawing on scroll**
- A plain stroke uses `gsap.fromTo(path, { drawSVG: "0%" }, { drawSVG: "102%", ease: "none", scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 30%", scrub: true } })`.
- For a textured, variable-width brush look, export the brush artwork as a filled shape. Mask it with an SVG `<mask>` containing a thick stroked centerline path that DrawSVG animates, so the mask reveals the brush texture along the path. `vector-effect: non-scaling-stroke` helps keep width consistent across responsive scaling (general SVG knowledge).

**(d3) Project list with cursor-following floating thumbnail**
- Follow the Larose pattern exactly:
  - one fixed modal with an image stack, offset `top: index * -100%`
  - `quickTo` x/y at 0.8 (modal), 0.5 (cursor dot), 0.45 ("View" label), `ease: "power3"`
  - scale in and out on `mouseenter`/`mouseleave` of the list container
- Use transforms (`x`/`y`) instead of `left`/`top` for compositor-only movement. Add rotation from horizontal velocity, `rotation: clamp(-12, 12, dx * 0.2)`, for "swing". Rows get `color` and `padding-left` hover shifts.
- Register only under `gsap.matchMedia({ fine: "(pointer: fine)" })`. On touch, show inline thumbnails.

**(d4) Services list items blurring in on scroll**
- `ScrollTrigger.batch(".service", { onEnter: els => gsap.from(els, { autoAlpha: 0, y: 30, filter: "blur(8px)", stagger: 0.08, duration: 0.9, ease: "power3.out", clearProps: "filter" }), start: "top 85%", once: true })`.
- Small elements with radius ≤ 8px are acceptable per the blur-cost caveat. Don't blur full-viewport layers.

**(d5) Per-letter scattered kinetic type in a pinned horizontal section**
1. Markup: `<section class="kinetic">` containing a `.track` with `white-space: nowrap`, holding one long sentence at about 18vw.
2. Container tween:
   ```js
   const tween = gsap.to(track, {
     x: () => -(track.scrollWidth - innerWidth),
     ease: "none",
     scrollTrigger: {
       trigger: section, pin: true, scrub: 1,
       end: () => "+=" + (track.scrollWidth - innerWidth),
       invalidateOnRefresh: true, anticipatePin: 1,
     },
   })
   ```
3. Split inside `useGSAP`: `SplitText.create(track, { type: "chars", autoSplit: true, onSplit(self) { … return tl } })`.
4. Per char:
   ```js
   gsap.from(char, {
     x: gsap.utils.random(-250, 250), y: gsap.utils.random(-300, 300),
     rotation: gsap.utils.random(-120, 120), scale: gsap.utils.random(0.4, 1.6),
     autoAlpha: 0, ease: "none",
     scrollTrigger: { trigger: char, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
   })
   ```
   No pin or snap on these inner triggers, per the docs.
5. For long sentences (more than ~150 chars), build a single timeline instead of one ScrollTrigger per char: place each char's `from` at a position proportional to its offsetLeft, and scrub that one timeline with the same `containerAnimation`.
6. Use `will-change: transform` only while the section is active, and make chars `display:inline-block`.
7. Reduced motion: no pin; show the sentence statically.

**(d6) Giant "let's talk." CTA**
- Full-width `clamp(5rem, 20vw, 22rem)` text. SplitText chars rise from a mask on enter. Hover fill sweep via a `clip-path` or `background-size` transition.
- A circular magnetic button ("Get in touch") with `quickTo` `elastic.out(1, 0.3)` and a 0.35 multiplier.
- The section uses the Larose "sticky footer" reveal: the footer sits under the page via `position: sticky/fixed`, and content scrolls off it. A parallax `y: -500 → 0` scrub on the footer contents.

### Gaps
- No primary-source tutorial was found for a "Who's watching?" profile-picker animation. The recipe above is synthesized.
- No Codrops article was found specifically for (i) sticky stacking cards, (ii) a stage spotlight or volumetric beam with haze, or (iii) the exact scattered-letters-with-`containerAnimation` effect. The recipes compose cited APIs instead.
- Transparent-background talking video (WebM VP9 alpha and HEVC-with-alpha for Safari) and browser autoplay-audio policy were not researched in this pass.
- The Vercel lanyard's exact `gravity`/`timeStep` values and CodeSandbox URLs were not present in the fetched article text.

---

## Q7. How top creative developers structure animation code in a Next.js app

### Takeaway
The pattern is:
- one client-only **`lib/gsap.ts`** that registers plugins once
- one **`SmoothScroll` provider** (Lenis driven by `gsap.ticker`)
- **one `useGSAP({ scope })` per section component**, each owning its own timeline
- responsive and reduced-motion branches through **`gsap.matchMedia()` conditions**
- `contextSafe` for event-driven tweens
- SplitText inside `onSplit`
- transform/opacity-only animation
- explicit `ScrollTrigger.refresh()` after fonts, images and route changes

Server Components render static markup. Thin `"use client"` islands add motion.

### Cited Findings
- `gsap.matchMedia()` runs a handler when a query matches and **auto-reverts** everything created inside it when the query stops matching. The conditions syntax gives booleans:
  ```js
  mm.add({ isDesktop: "(min-width: 800px)", isMobile: "(max-width: 799px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
    (ctx) => { const { isDesktop, reduceMotion } = ctx.conditions; … })
  ```
  The optional returned cleanup is for custom teardown only. matchMedia "wraps gsap.context() internally", and `mm.revert()` undoes everything — [gsap.matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- `ScrollTrigger.matchMedia` is **deprecated**. Use `gsap.matchMedia` — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- ScrollTrigger start and end values are calculated on refresh. Call `ScrollTrigger.refresh()` after layout changes, and use `invalidateOnRefresh: true` with function-based values. `normalizeScroll` forces scrolling onto the JS thread and can stop the mobile address bar from showing and hiding — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- `useGSAP` handles scoping (`scope`), reverting on unmount, `contextSafe` for handlers, and SSR-safe effect selection — [gsap.com React guide](https://gsap.com/resources/React/)
- SplitText: create animations inside `onSplit()` and return them, so responsive re-splits stay in sync — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- Build the animation first and add ScrollTrigger last. Use `ease: "none"` with scrub — [GSAP forum, mvaneijgen](https://gsap.com/community/forums/topic/39367-scrolltrigger-stacking-cards-animation-logic-to-create-any-effect-yes-even-yours/)
- Motion animates layout via transforms, which "can entirely avoid triggering paint". Avoid animating `border` because it triggers layout — [Motion layout docs](https://motion.dev/docs/react-layout-animations)
- Next.js View Transitions guide: put route-transition wrappers in `page.tsx`, not in layouts, and respect `prefers-reduced-motion` — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

### Inferences — recommended architecture (Next.js App Router, TypeScript)

**Folder layout**
```
app/
  layout.tsx                // RSC: fonts (next/font), <Providers>, <Intro/> (client island)
  page.tsx                  // RSC: composes sections; data from content files
  template.tsx              // (Next 15) client page-transition curtain; or <ViewTransition> on Next 16
components/
  providers/SmoothScroll.tsx    // "use client"; ReactLenis root, autoRaf:false, gsap.ticker sync, lagSmoothing(0), lenis.on('scroll', ScrollTrigger.update)
  intro/NetflixIntro.tsx        // "use client"; AnimatePresence + GSAP timeline; sessionStorage gate
  intro/Preloader.tsx
  sections/Hero.tsx             // "use client"; useGSAP({scope}) + gsap.matchMedia
  sections/StackTable.tsx
  sections/Projects*.tsx
  sections/Timeline.tsx
  sections/KineticStatement.tsx
  three/LanyardLazy.tsx         // "use client"; next/dynamic(() => import('./Lanyard'), { ssr:false }) + IO mount
  ui/MagneticButton.tsx, ui/SplitReveal.tsx, ui/CursorFollower.tsx
lib/
  gsap.ts        // "use client"; gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, Flip, CustomEase, MorphSVGPlugin); CustomEase.create("expoCurtain","0.76,0,0.24,1"); gsap.defaults({ ease: "power3.out", duration: 0.9 }); export * from "gsap"
  motion-tokens.ts  // shared durations/eases so every section feels like one system
hooks/
  useReducedMotion.ts, useIsTouch.ts, useLenisInstance.ts
```

**Per-section template**
```tsx
"use client";
export function Section() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
      const { desktop, reduce } = ctx.conditions!;
      if (reduce) { gsap.set(".reveal", { autoAlpha: 1 }); return; }
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } });
      // … section timeline
    });
    return () => mm.revert(); // belt-and-braces; useGSAP's context also reverts
  }, { scope: root });
  return <section ref={root}>…</section>;
}
```

**Rules**
- Animate only `transform`, `opacity` and (sparingly) `clip-path`. Never animate width, height, top or left on scroll.
- Batch DOM reads in function-based values so ScrollTrigger recomputes them on refresh.
- Create ScrollTriggers in page order, or set `refreshPriority`.
- Call `ScrollTrigger.refresh()` after `document.fonts.ready`, after hero media loads, and after the preloader removes `lenis.stop()`.
- Set initial hidden states in CSS, not JS, to avoid an FOUC flash before hydration.
- Gate heavy effects (WebGL, cursor followers, kinetic per-char sections) behind `matchMedia` for `(pointer:fine)`, `(min-width)` and `(prefers-reduced-motion: no-preference)`.
- Pause canvases and video offscreen.

**Library roles (final recommendation)**

| Role | Library | Approx. cost (gzip) |
|---|---|---|
| Choreography, scroll, text, SVG | GSAP 3.15 + ScrollTrigger + SplitText + DrawSVG + Flip + CustomEase (+ MorphSVG for curtain) | ~27 KB core per bundlephobia (~23 KB per Motion's table) + ~12 KB ScrollTrigger (Motion table) + plugins (sizes not found) |
| Smooth scroll | Lenis 1.3.26 | size not found (small) |
| Mount/unmount + layout morphs | Motion 14 via `LazyMotion` + `m` + `domMax` | ~4.6 KB + 25 KB |
| Route transitions | React `<ViewTransition>` (Next 16 / React 19.3), or `template.tsx` + GSAP (Next 15) | ~0 KB (native) |
| Lanyard | React Bits Lanyard (three only) or R3F 9 + rapier 2 + meshline, lazy | three ≈ 185 KB full; load on demand |
| Spotlight shader (optional) | OGL (~8 KB core) or CSS/SVG/canvas layers | minimal |
| Progressive enhancement | CSS scroll-driven animations inside `@supports` | 0 KB |

### Gaps
- No primary source confirms whether a `gsap.matchMedia()` created inside `useGSAP()` is automatically reverted by the hook's context. The template includes an explicit `mm.revert()` to be safe.
- Exact gzip sizes for SplitText, DrawSVG, Flip and MorphSVG in 3.15, and for Lenis, were not found from primary sources.
- I did not inspect the source of specific award-winning Next.js portfolios. The architecture is synthesized from official docs plus the Olivier Larose and Vercel reference implementations.
