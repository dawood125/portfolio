# Performance, Accessibility & SEO Guardrails for a Heavy-Animation, Video-Hero Portfolio (Next.js 15 App Router + React 19, Vercel), researched 2026-10-12

> Version context (checked 2026-10-12 via npm registry): `next` latest = 16.4.0 (the 15.x line is still receiving backports, `backport` dist-tag = 15.5.27); `react` = 19.3.0; `gsap` = 3.15.0; `lenis` = 1.3.26; `motion` = 14.1.0; `three` = 0.186.1; `@react-three/fiber` = 9.8.1 (peer deps: react >=19 <19.4, three >=0.156); `@react-three/drei` = 10.7.9; `@react-three/rapier` = 2.2.0; `@dimforge/rapier3d(-compat)` = 0.21.0; `@vercel/speed-insights` = 2.0.0. The Next.js docs pages cited below now carry `version: 16.4.0`. The APIs used here (next/font, next/dynamic, metadata files, JSON-LD) work the same way in 15.x. One difference: in `opengraph-image`, `params` became a Promise in v16.0.0.
>
> Size-measurement method: library sizes come either from the bundlephobia API (minified + gzip, whole package) or from my own `gzip -9` of the published minified dist files fetched from unpkg on 2026-10-12. Real tree-shaken bundles are smaller for tree-shakeable libs (three, drei, motion), and Brotli on Vercel is usually ~10–20% smaller than gzip. That Brotli saving is my estimate; I did not measure it.

---

## 1. Core Web Vitals 2026 thresholds, and how preloaders, intro animations, hidden SplitText and video heroes affect LCP/INP

### Takeaway
The thresholds have not changed: LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1, all at the 75th percentile and segmented by mobile/desktop. Chrome does not count anything at opacity 0, including transparent text (Chrome 130+). A hero headline that SplitText hides and then reveals therefore gets its LCP stamp only once it actually paints visibly, so every millisecond of preloader or intro delay is added straight to LCP. Videos are LCP candidates: Chrome uses whichever comes first of poster load and first-frame paint. The safe pattern has three parts. Server-render the hero text and poster so they are visible in the first paint. Make any preloader or curtain a short, skippable, first-visit-only overlay. Never hide `<html>`/`<body>` or the LCP element at opacity 0 while JS boots.

### Cited Findings
**Thresholds**
- Good thresholds are LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1. Measure at the 75th percentile of page loads, segmented across mobile and desktop. A page passes only if all three are met. INP became a stable Core Web Vital in 2024, replacing FID (page last updated 2024-10-31). [web.dev – Web Vitals](https://web.dev/articles/vitals)
- LCP: good ≤2.5 s, poor >4.0 s (page last updated 2025-09-04). [web.dev – LCP](https://web.dev/articles/lcp)
- INP: good ≤200 ms, needs improvement 200–500 ms, poor >500 ms. INP is "the longest interaction observed, ignoring outliers" (one highest interaction ignored per 50). Only clicks, taps and key presses count. Scrolling, hovering and zooming "are not observed". Latency = input delay + processing duration + presentation delay (page last updated 2025-09-02). [web.dev – INP](https://web.dev/articles/inp)
- Vercel Speed Insights uses the same targets (LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms) plus FCP ≤1.8 s and TTFB <800 ms (doc last updated 2026-09-01). [Vercel – Speed Insights Metrics](https://vercel.com/docs/speed-insights/metrics)

**What counts as LCP, and opacity / visibility rules**
- LCP candidates are `<img>`, `<image>` in SVG, `<video>`, elements with a `url()` background image (not gradients), and block-level elements containing text. In Chromium, "Elements with an opacity of 0 are excluded". Full-viewport elements (treated as background) are excluded, as are low-entropy placeholder images. Text using web fonts during the font block period doesn't count. Reporting stops once the user taps, scrolls or presses a key. Only the visible, in-viewport portion counts toward size, and "later changes to an element's size or position don't create new candidates." [web.dev – LCP](https://web.dev/articles/lcp)
- Chromium LCP changelog: Chrome 86 made "Largest Contentful Paint ignores paints with opacity 0". Sites whose largest element starts at opacity 0 now see a longer LCP reflecting "the time until the largest contentful paint is visible to the user". [Chromium changelog 2020_08](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2020_08_lcp.md), [LCP changelog index](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/lcp.md)
- Chrome 130 (stable week of 21 Oct 2024): "When texts are transparent, and with no visible decorations like shadows, and strokes, they should be not eligible for LCP." [Chromium changelog 2024_10](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2024_10_lcp.md)
- Chrome 144 includes a bug fix for "LCP and FCP handling when document opacity changes from zero to non-zero". Chrome 140 had a bug reporting text presentation timestamps too early, fixed in 143. [LCP changelog index](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/lcp.md)
- DebugBear (updated 2025-11-10): an element is not a candidate while invisible, and finishing a fade does not trigger a new record. A later repaint, such as a web font swap, does: "if an element is repainted then the LCP will be higher than expected." The easiest fix is to disable the animation. Their workaround is to start the fade at a non-zero opacity such as `0.1`. Chrome treats a change to the documentElement's opacity (as A/B-test tools use) as a valid LCP candidate. [DebugBear – opacity animation poor LCP](https://www.debugbear.com/blog/opacity-animation-poor-lcp)
- Shopify guidance: remove transitions and animations from LCP elements. If JS doesn't trigger a fade-in until 6 s, LCP is recorded at 6 s even when the image downloaded at 2 s. Per a search-result summary, Shopify estimates hero-section fades alone waste ~650–900 ms of LCP; I did not open the page to confirm that number. [Shopify.dev – Don't hide LCP image behind animations](https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations)
- Lighthouse can fail with a `NO_LCP` error when the likely LCP element starts at opacity 0. One developer worked around it by starting at 0.01. This is a secondary source and the workaround is unofficial. [Renaissance Design – fixing NO_LCP](https://renaissance-design.net/2024/fixing-the-no_lcp-error-in-lighthouse/)

**Video heroes**
- For `<video>`, LCP uses "the poster image load time or first-frame presentation time, … whichever is earlier." [web.dev – LCP](https://web.dev/articles/lcp)
- Chrome 116 change: videos used to be skipped unless they had a poster. Now a video is a candidate "exactly like an image", stamped at "the time that the first video frame is presented on screen". "Pages with large auto-playing videos should start seeing that video used as the LCP element." [Chromium changelog 2023_08](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_08_lcp.md)
- Chrome 151 launched "Prompt LCP entry emission for video elements (RequestMainFrameAfterFirstVideoFrame)". Chrome 153 fixed race conditions in timestamp attribution for first video frames. [LCP changelog index](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/lcp.md)
- If a video is the LCP candidate, use a poster and preload it with `<link rel="preload" … fetchpriority="high">`, and don't put `loading="lazy"` on it. `fetchpriority` can't currently be set on the `poster` attribute (page last updated 2026-07-02). [web.dev – Lazy-loading video](https://web.dev/articles/lazy-loading-video)

**Preloaders and WCAG**
- WCAG 2.2.2 lists a preloader that is "the only content on the page" as needing no pause mechanism. Note 4: a preload animation "can be considered essential if interaction cannot occur during that phase for all users." [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)

### Inferences
- **Hero headline with SplitText chars from opacity 0.** It is not an LCP candidate until chars paint at non-zero opacity, so LCP ≈ JS download + hydrate + font load + animation start delay. On a throttled mid-range Android that easily exceeds 2.5 s. Guardrails, any of which works:
  1. Render the h1 visible in SSR HTML and animate something other than its opacity: a decorative duplicate, `clip-path`, or chars starting at opacity ≥0.1 / small `y` offsets.
  2. Let the hero poster image/video be the larger LCP element and preload it, so the text reveal timing matters less.
  3. Start the text animation from a CSS state that already matches the final layout (no `display:none`) so there's no CLS.
- **Masked line reveals** (SplitText `mask: "lines"` with `yPercent: 100`) clip the text out of its box. LCP counts only the visible portion, and "later changes to … position don't create new candidates". Fully clipped text may never become the LCP element, so LCP falls to the next-largest element (often the hero poster). That is fine if the poster is fast and bad if the next candidate is slow. Verify in DevTools.
- **Gold gradient text** (`background-clip:text; color:transparent`) may be caught by the Chrome 130 transparent-text exclusion. The changelog doesn't say whether `background-clip:text` counts as a "decoration". Test it. If the headline is excluded, LCP shifts to another element.
- **Preloader that sets `html{opacity:0}` / `body{visibility:hidden}`** until assets load: LCP is pushed to the reveal moment, and the Chrome 144 fix suggests Chrome now handles document opacity 0→1 "correctly", meaning the reveal time is recorded. Never hide the document.
- **Award-site pattern that preserves LCP.** I did not find an authoritative write-up; this is my synthesis of the rules above. Use a *curtain* overlay (fixed `div` above already-painted SSR content) that runs only on the first visit per session (`sessionStorage` flag), lasts ≤ ~1–1.5 s, has a "Skip intro" button, and is skipped entirely for `prefers-reduced-motion` and for return visits and internal navigations. Content underneath is painted at full opacity from the first frame. See Gaps: whether occlusion by an overlay delays LCP is unverified.
- **INP.** Scroll and hover don't count, so Lenis/ScrollTrigger scrubbing doesn't directly score. Heavy scroll-handler work, SplitText re-splits on resize, WebGL frames and hydration long tasks all add *input delay* to the next tap or click (menu, cursor-follow list, chat button). Keep per-frame JS small, use `transform`/`opacity` only, and defer non-critical client components.

### Gaps
- No primary source states whether an element painted at full opacity but *covered by an opaque overlay* (curtain preloader) is recorded at its paint time or at reveal time. Lab-test this with DevTools Performance → Timings → LCP.
- No source states precisely whether an opacity 0→1 tween records LCP at the first non-zero frame or later. DebugBear only says completing the fade doesn't re-record.
- CLS "poor" boundary (>0.25) was not shown in the extracted web.dev text. It is widely documented but was not re-verified here.

---

## 2. JS and asset budgets (GSAP, Lenis, Motion, R3F/three/rapier, video) and code-splitting WebGL

### Takeaway
GSAP core + ScrollTrigger + SplitText is about 50 KB gz and Lenis about 5.5 KB gz. That is acceptable on the home route if it replaces Motion rather than being added alongside it. three + R3F alone are about 240 KB gz before your scene code. Rapier physics adds a WASM payload of about 1.2–1.65 MB gz, far larger than everything else on the site combined. The lanyard must be a lazily loaded, in-view, capable-device-only, post-LCP enhancement, or be rebuilt without Rapier. Video and the poster image will dominate total bytes, so budget them explicitly.

### Cited Findings
**Measured/registry sizes (min + gzip)**
- `gsap` 3.15.0 whole package: 27.35 KB gz (bundlephobia). [bundlephobia API – gsap](https://bundlephobia.com/api/size?package=gsap)
- GSAP 3.15.0 dist files, my own `gzip -9` of unpkg minified files: `gsap.min.js` 28.3 KB, `ScrollTrigger.min.js` 18.0 KB, `SplitText.min.js` 3.7 KB, `Observer.min.js` 4.3 KB, `ScrollSmoother.min.js` 5.5 KB. [unpkg gsap@3.15.0/dist](https://unpkg.com/gsap@3.15.0/dist/)
- SplitText was rewritten in v3.13.0 ("Major rewrite"), "half the size" of the old version. [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- Since 3.13, GSAP including all former Club plugins (SplitText, MorphSVG, etc.) is "100% FREE … even for commercial use" thanks to Webflow. `gsap-trial` is deprecated; install `gsap`. [GSAP 3.13 release blog](https://gsap.com/blog/3-13/), [CodePen blog](https://blog.codepen.io/2025/05/05/chris-corner-gsap-more-like-freesap/), [npm gsap-trial](https://npmjs.com/package/gsap-trial)
- `lenis` 1.3.26: 5.47 KB gz, zero runtime deps. [bundlephobia API – lenis](https://bundlephobia.com/api/size?package=lenis), [Lenis README](https://github.com/darkroomengineering/lenis)
- `motion` 14.1.0 whole package: 47.9 KB gz on bundlephobia. Motion's docs call that figure misleading because of tree shaking. Their numbers: `motion` component 34 KB (not tree-shakeable); `m` + `LazyMotion` just under 4.6 KB initial; `domAnimation` +15 KB; `domMax` +25 KB; `useAnimate` mini 2.3 KB, hybrid 17 KB; `useReducedMotion` about 1 KB. Features can be loaded async via `LazyMotion features={() => import('./features')}`. [bundlephobia API – motion](https://bundlephobia.com/api/size?package=motion), [Motion – Reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size)
- `three` 0.186.1: 184.9 KB gz whole build (bundlephobia; real tree-shaken usage is lower). `@react-three/fiber` 9.8.1: 57.0 KB gz including its deps. `@react-three/drei` 10.7.9: 521 KB gz whole package, which means you must import individual helpers. [bundlephobia – three](https://bundlephobia.com/api/size?package=three), [bundlephobia – @react-three/fiber](https://bundlephobia.com/api/size?package=@react-three/fiber), [bundlephobia – @react-three/drei](https://bundlephobia.com/api/size?package=@react-three/drei)
- Rapier, measured by me from unpkg on 2026-10-12:
  - `@react-three/rapier` 2.2.0 ESM: 15.1 KB gz. [unpkg](https://unpkg.com/@react-three/rapier@2.2.0/dist/react-three-rapier.esm.js)
  - `@dimforge/rapier3d-compat` 0.21.0 `dist/rapier.mjs` (WASM inlined as base64): 4.34 MB raw / **1.65 MB gz**. [unpkg](https://unpkg.com/@dimforge/rapier3d-compat@0.21.0/?meta)
  - Non-compat `@dimforge/rapier3d` 0.21.0 `rapier_wasm3d_bg.wasm`: 3.08 MB raw / **1.17 MB gz**. [unpkg](https://unpkg.com/@dimforge/rapier3d@0.21.0/?meta)

**Code-splitting in Next.js App Router**
- `next/dynamic` = `React.lazy()` + Suspense. `ssr: false` works only in Client Components; it errors in Server Components ("Please move it into a Client Component"). When a Server Component dynamically imports a Client Component, automatic code splitting "is currently **not** supported". Libraries can be loaded on demand with `await import('lib')` inside an event handler. A `loading` fallback component can be supplied (doc lastUpdated 2026-03-10). [Next.js – Lazy loading guide](https://nextjs.org/docs/app/guides/lazy-loading)
- R3F performance: `<Canvas frameloop="demand">` renders only when something changes (`invalidate()` for manual frames). Drei `PerformanceMonitor` raises or lowers quality (DPR, effects) on FPS incline/decline. `performance`/`regress()` lowers quality during movement. Keep draw calls under ~1000, ideally a few hundred, and use instancing and shared geometries/materials. The page does *not* cover pausing when offscreen. [R3F – Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

**Video weight / loading**
- Non-autoplay videos: `preload="none"` is "the best chance of avoiding loading the video". Most browsers default to `metadata`, which still downloads some data. You can switch to `preload="metadata"` on hover. Autoplaying, GIF-like videos need `autoplay muted loop playsinline` (`playsinline` is required for iOS autoplay). Lazy-load with `loading="lazy"` where supported, with an IntersectionObserver fallback that starts with `preload="none"` + poster and enables autoplay when in view (updated 2026-07-02). [web.dev – Lazy-loading video](https://web.dev/articles/lazy-loading-video)
- Transparent/alpha talking-head video needs two encodes: HEVC-with-alpha (Safari) listed **first**, then VP9-with-alpha WebM (Chrome/Firefox), because Safari plays VP9 without transparency. In Jake Archibald's example the VP9 file was 1.1 MB vs 3.4 MB for HEVC. A non-Apple device might pick the HEVC file and render it without alpha. [Jake Archibald – Video with alpha transparency (2024)](https://jakearchibald.com/2024/video-with-transparency/), [Rotato – transparent videos 2025](https://rotato.app/read/transparent-videos-for-the-web)

### Inferences
These budgets are proposals derived from the data above; they are not from an authoritative source.

**Proposed budgets**

| Item | Budget |
|---|---|
| Home route first-load JS (gz) | ≤ ~170 KB. Previous build ~118 KB, plus ~50 KB for GSAP core+ScrollTrigger+SplitText, plus ~5.5 KB Lenis. Hard ceiling 200 KB. |
| Animation library | Use **one** primary library (GSAP). If Motion is kept for page transitions or micro-interactions, use `m` + `LazyMotion` with async `domAnimation` (~4.6 KB initial) and never the full `motion` component (34 KB). |
| WebGL chunk (three + R3F + scene) | ~250–300 KB gz JS, loaded after LCP, only when the badge section nears the viewport (IntersectionObserver `rootMargin: '200px'`), and only on capable devices. |
| Rapier | Keep it out of every route's default chunk. Prefer replacing it with a hand-written verlet rope / spring (a few KB) or a GSAP-driven pendulum. If Rapier is kept: load on hover or first pointer interaction on desktop, otherwise show a static PNG badge. |
| LCP poster/hero image | AVIF/WebP, ≤ ~100–150 KB on mobile, `fetchpriority="high"` + preload, served via `next/image` with `priority` (or `preload` in newer Next versions) and correct `sizes`. |
| Hero video | Mobile ≤ ~1–1.5 MB (720p or less, 6–10 s loop, no audio track); desktop ≤ ~3 MB. Use `preload="metadata"`/`none` + poster. Don't autoplay on `saveData`/reduced-motion/low-end devices. The alpha version is bigger (HEVC alpha ~3× VP9 in Archibald's example), so consider a non-alpha video over a matching background color. |
| Project screen recordings | `preload="none"`, lazy via IntersectionObserver, ≤ ~2–4 MB each, 720p, AV1/VP9 + H.264 fallback, and played only while in view (pause on exit). |
| AI chat assistant | 0 KB in the initial bundle. Load the widget via `import()` on button click, following the Next.js lazy-loading "load on demand" pattern. |

**Code-splitting pattern for the WebGL badge**
- Wrap the canvas in a `'use client'` wrapper that renders a static image placeholder.
- An IntersectionObserver plus a capability check (see Q6) flips state, and only then renders `dynamic(() => import('./Badge3D'), { ssr:false })`.
- Use `frameloop="demand"` or pause the `useFrame` loop when offscreen, cap DPR at 1.5, and unmount on route change.

### Gaps
- No authoritative published "video hero ≤ X MB" budget was found. The figures above are engineering estimates.
- Next.js 15 App Router baseline (framework + React) first-load size was not re-measured. Use the existing build's 118 KB as the empirical baseline.
- Brotli sizes were not measured (gzip only).

---

## 3. Smooth scroll (Lenis) accessibility and UX

### Takeaway
Lenis 1.x drives the native scroll position, not a transformed wrapper. Its defaults are fairly safe: touch input is not hijacked (`syncTouch:false`), it respects `prefers-reduced-motion` by default, and `data-lenis-prevent` handles nested scroll areas. Known pain points are no CSS scroll-snap support, iframes, Safari frame caps, nested scrollers, anchor links (opt-in `anchors`), and occasional keyboard/space-bar conflicts in inputs. Enable it for wheel input on fine-pointer desktops only, keep native touch scrolling, and test Ctrl+F and skip-link focus.

### Cited Findings
- Lenis 1.3.26 options (defaults): `syncTouch:false` (true "may be unstable on iOS < 16"), `touchMultiplier:1`, `autoRaf:false`, `anchors:false` (true or ScrollToOptions for smooth anchor links), `allowNestedScroll:false` (it "can hurt performance" because it checks the DOM on every scroll event), `smoothWheel:true`, and a `prevent(node)` function. [Lenis README](https://github.com/darkroomengineering/lenis)
- Limitations listed: no CSS scroll-snap (use `lenis/snap`); capped at 60 fps on Safari and 30 fps in low-power mode; smooth scroll stops over iframes; `position: fixed` may lag on pre-M1 macOS Safari; nested scroll needs configuration. Attributes `data-lenis-prevent`, `-wheel`, `-touch`, `-vertical`, `-horizontal` exist for nested areas, and `lenis.css` is recommended. [Lenis README](https://github.com/darkroomengineering/lenis)
- Accessibility: `respectReducedMotion` defaults to `true`. Under reduced motion, smoothing is disabled, `lerp` is forced to 1, and programmatic scrolls jump instantly, while Lenis keeps running for WebGL/DOM sync. `lenis.prefersReducedMotion` is exposed. The README does not discuss keyboard or find-in-page. [Lenis README](https://github.com/darkroomengineering/lenis)
- Official GSAP integration: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);` [Lenis README](https://github.com/darkroomengineering/lenis)
- In a GreenSock forum thread about ScrollSmoother (a transform-based smoother, not Lenis), Ctrl+F found matches but didn't scroll to them. Replies note that wheel-only smoothing keeps native find, keyboard and scrollbar scrolling working. [GreenSock forum – ScrollSmoother accessibility](https://greensock.com/forums/topic/34032-scrollsmoother-accessibility/)
- Webflow users reported Lenis making the page scroll when pressing space inside an input. A fix was reported in Lenis v0.2.21, but some users still saw it. [Webflow forum – form fields with Lenis](https://discourse.webflow.com/t/help-form-fields-with-lenis-smooth-scroll/222293)
- Equalize Digital's smooth-scroll test: tab to a skip link, activate it, then press Tab again. Focus should land on the next focusable element after the target, not jump back up. [The Admin Bar – Accessibility Weekly: smooth scroll](https://theadminbar.com/accessibility-weekly/watch-out-for-smooth-scroll)

### Inferences
- **Recommended config:** `new Lenis({ smoothWheel: true, syncTouch: false, anchors: true, autoRaf: false })`, driven by the GSAP ticker.
  - Initialize it only when `matchMedia('(pointer: fine) and (hover: hover)')` matches and reduced motion is not requested. Coarse-pointer and touch devices get native scroll, which is the default behavior anyway, but skipping init saves CPU and avoids bugs.
  - Add `data-lenis-prevent` to the chat panel, modals, code blocks and horizontally scrollable lists.
  - Call `lenis.stop()` while a modal or the preloader is open, and `start()` after.
  - Skip links and anchor links must also move *focus*: set `tabindex="-1"` on the target and `focus({preventScroll:true})` after `lenis.scrollTo`.
- **Pinned horizontal sections** (GSAP-scrubbed translateX inside a pin) are keyboard- and Ctrl+F-hostile: content offscreen in the horizontal track is still in DOM order, but find-in-page cannot scroll it horizontally into view. Two mitigations:
  1. Each card in the horizontal track should be focusable or contain links. On `focusin`, compute the matching vertical scroll position (`ScrollTrigger.start + progress * distance`) and `lenis.scrollTo` it.
  2. Under reduced motion or on mobile, render the track as a normal vertical list.

### Gaps
- No Lenis-specific primary test of find-in-page or screen-reader behavior was found. Verify manually with Ctrl+F, NVDA/VoiceOver, keyboard Space/PageDown/Home/End, and skip links.

---

## 4. prefers-reduced-motion and the WCAG 2.2 criteria involved (2.2.2, 2.3.3, 2.3.1), autoplay video, motion toggle

### Takeaway
Under `prefers-reduced-motion: reduce`, remove non-essential *movement*: parallax, scrubbed transforms, pinned horizontal scroll, zooms, smooth-scroll inertia, cursor-follow motion, page-flip/curtain transitions and autoplaying video. Short opacity/color crossfades are acceptable, because WCAG 2.3.3 does not count opacity or color changes as "motion". Separately, any auto-starting motion lasting more than 5 s shown alongside other content, including a looping hero video and marquee text, needs a visible pause/stop control (2.2.2, Level A). The pause requirement applies to everyone, not only users with the OS setting. A site-level "Reduce motion" toggle is an explicitly listed sufficient technique for 2.3.3.

### Cited Findings
- **SC 2.2.2 Pause, Stop, Hide (Level A):**
  - Moving, blinking or scrolling content that starts automatically, lasts more than five seconds and is presented in parallel with other content needs "a mechanism for the user to pause, stop, or hide it" unless essential. "Starts automatically" includes content triggered indirectly, such as by scrolling into view.
  - A preloader that is the only content needs no mechanism.
  - Note 2: "all content on the web page … must meet this success criterion" (the inference that this covers decorative motion is my reading).

  [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- **SC 2.3.3 Animation from Interactions (Level AAA):**
  - "Motion animation triggered by interaction can be disabled" unless essential. Scroll-triggered movement beyond scrolling itself can trigger vestibular reactions such as dizziness and headaches.
  - Motion animation means movement, size change or animating into place. Color, blur (an erratum removed the blur exclusion) and opacity changes that don't alter apparent size, shape or position are *excluded*.
  - Parallax is "often non-essential".
  - Sufficient techniques: C39 (CSS `prefers-reduced-motion`), SCR40 (the same query in JS), and "Allowing users to set a preference that prevents animation". Examples include a site-wide parallax off switch and a page-flip transition disabled under reduced motion.

  [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- web.dev: reduce motion "preferably to the point where all non-essential movement is removed". Options range "from refraining from having autoplaying videos to disabling certain purely decorative effects". Parallax and zooming effects can cause motion sickness. Example: `<picture>` with `media="(prefers-reduced-motion: no-preference)"` serving the animated version and a static fallback (2019 article, still canonical). [web.dev – prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
- `gsap.matchMedia()` with conditions `{ isDesktop, isMobile, reduceMotion: "(prefers-reduced-motion: reduce)" }`:
  - It reruns when conditions toggle and auto-reverts every animation and ScrollTrigger created in the handler.
  - The docs show a reduced variant with no rotation or scrub.
  - A user checkbox can drive it via `gsap.matchMediaRefresh()`.

  [GSAP matchMedia docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia())
- Lenis disables smoothing automatically under reduced motion (`respectReducedMotion: true`). [Lenis README](https://github.com/darkroomengineering/lenis)

### Inferences
**Reduced-motion matrix (proposal)**

| Effect | No preference | Reduce |
|---|---|---|
| Preloader / curtain wipe | ≤1.5 s, first visit only, skippable | Skip entirely; show content immediately |
| Hero video (talking/alpha) | Muted autoplay + visible Pause button (2.2.2) | Poster image + play button (no autoplay) |
| SplitText kinetic headlines | Char/word stagger | Single short opacity fade (≤300 ms) or none |
| Pinned horizontal scroll | GSAP pin + scrub | Normal vertical stack / native horizontal overflow with scroll-snap |
| Parallax, scrub scale/rotate, marquees | On | Off (marquee static or paused) |
| Sticky stacking cards | Scale/translate stack | Plain sticky or static list (no scale) |
| Lenis | On (desktop) | Off (native) |
| Custom cursor follower / magnetic buttons | On (fine pointer) | Native cursor; no magnetic motion |
| Hover-reveal image following cursor | Follows with lerp | Static thumbnail at fixed position, fade only |
| Page transitions | Curtain/clip wipe | Instant or crossfade |
| R3F lanyard swing | Physics | Static badge image (or frameloop paused) |

- Provide a visible **"Motion: On/Off" toggle** in the header or footer. Store it in `localStorage`, default it from the OS media query, and expose it as a `data-motion="reduced"` attribute on `<html>` set by a tiny inline script before paint (prevents a flash of motion). Feed it into `gsap.matchMedia` (via a custom condition) and Lenis (`destroy`/`start`). This also covers the 2.3.3 "user preference" technique.
- **SC 2.3.1 Three Flashes:** avoid strobe-like curtain flashes, rapid full-screen color inversions on page transitions, and flashing video content.

### Gaps
- The W3C Understanding page for SC 2.3.1 (Three Flashes or Below Threshold, Level A) was not fetched in this pass. Its exact thresholds (no more than three flashes per second, or below general/red flash thresholds) should be confirmed at https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html.

---

## 5. Accessibility of kinetic/split text, custom cursors, focus, contrast, keyboard access to hover-reveal lists and horizontal sections, skip-intro

### Takeaway
GSAP SplitText ≥3.13 handles screen readers by default: `aria: "auto"` puts an `aria-label` on the parent and `aria-hidden` on every line/word/char. Nested links and emphasis lose their semantics in that mode, so use `aria:"none"` plus a visually hidden copy for rich text, and `revert()` after the animation. WCAG 2.2 AA adds checks that this design pattern commonly fails:
- 2.4.11 Focus Not Obscured: sticky headers, curtains and cursor blobs must not fully hide focus.
- 2.5.8 Target Size: 24×24 CSS px.
- 2.5.7 Dragging Movements: the draggable lanyard needs a non-drag alternative or must be purely decorative.
- 1.4.13 Content on Hover or Focus: hover-reveal previews must also appear on focus, be dismissible with Esc, and stay hoverable.

Gold or gradient text must reach 4.5:1 (3:1 for ≥24px or ≥18.5px bold) against every part of the background it sits on.

### Cited Findings
- SplitText `aria` option. `"auto"` (default) "Adds an aria label to the split element(s), populated from its text" and "aria-hidden to the line, word, and character elements". It "will not honor the semantics or functionality of nested elements". `"hidden"` aria-hides everything. `"none"` adds nothing; use it with a screen-reader-only duplicate when nested links need to be read. [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- SplitText `autoSplit:true` re-splits when fonts finish loading or width changes, so create animations inside `onSplit()`. `revert()` restores the original `innerHTML` and is recommended after animating to cut DOM node count. Splitting before fonts load causes misalignment, and SplitText `console.warn`s in that case. `mask: "lines"|"words"|"chars"` wraps items in a `visibility: clip` element. [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- WCAG 2.2 (W3C Recommendation, 5 Oct 2023) new criteria:
  - 2.4.11 Focus Not Obscured (Minimum) AA: the focused component "is not entirely hidden due to author-created content".
  - 2.4.13 Focus Appearance AAA: indicator area ≥ a 2 CSS px perimeter, with ≥3:1 change in contrast.
  - 2.5.7 Dragging Movements AA: any dragging function must also work with a single pointer without dragging.
  - 2.5.8 Target Size (Minimum) AA: targets of at least 24×24 CSS px, with spacing and inline-link exceptions.
  - 4.1.1 Parsing removed.

  [W3C – What's new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- SC 1.4.13 Content on Hover or Focus (AA) applies when "receiving and then removing pointer hover or keyboard focus triggers additional content". The content must be **dismissible** (without moving hover/focus), **hoverable** and **persistent**. It covers custom tooltips, previews and non-modal popups, but not native `title` tooltips. [W3C Understanding 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- SC 1.4.3 Contrast (Minimum): 4.5:1 for normal text and 3:1 for large text (≥18 pt ≈ 24 px, or ≥14 pt ≈ 18.5 px bold). Ratios are thresholds and are not rounded. Contrast is measured against the background "over which the text is rendered in normal usage". Failure F83 covers background images that don't provide sufficient contrast. Thin fonts can render fainter, so exceed the minimum. [W3C Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- Smooth-scroll skip-link focus test. [The Admin Bar](https://theadminbar.com/accessibility-weekly/watch-out-for-smooth-scroll)
- Google only discovers links that are `<a>` elements with `href`. This matters for hover-reveal project lists built from `div`s. [Google – JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

### Inferences
- **Kinetic headline pattern:** keep the server-rendered `<h1>` as real text, then split on the client with `aria:"auto"`. After the intro tween completes, call `split.revert()` so screen readers and find-in-page see plain text again. For paragraphs with links, use `aria:"none"` + `<span class="sr-only">` copy and `aria-hidden="true"` on the animated clone. Avoid splitting body copy into chars (DOM bloat hurts INP and memory on low-end Android).
- **Custom cursor:**
  - Render it only for `(pointer: fine)`. Never set `cursor:none` on touch devices.
  - Set `pointer-events:none` and `aria-hidden="true"` on the follower.
  - Keep the native cursor visible, or ensure the custom one has strong contrast.
  - Under reduced motion or the motion toggle, fall back to the native cursor.
  - Never let the blob cover focus rings (2.4.11).
  - Text labels inside the cursor ("View", "Drag") must not be the only way to learn an action. Duplicate them in the link's accessible name.
- **Focus visibility:** use a global `:focus-visible` style, for example a 2–3 px outline in the brand gold plus a dark offset ring so it reaches ≥3:1 on both dark sections and photos. Add `scroll-margin-top` equal to the sticky header height so focused elements aren't obscured (2.4.11). The curtain/preloader must set `inert` on the content underneath while it covers it, then remove `inert`.
- **Hover-reveal project list:** each row should be an `<a href="/work/slug">`. Show the preview on `:hover` *and* `:focus-visible`, dismiss it on `Esc` (1.4.13), and keep the image `aria-hidden` (decorative) with the row text as the link name. On touch, show static thumbnails inline.
- **Horizontal pinned section:** keep DOM order logical, make cards focusable via their links, sync scroll on `focusin`, and offer prev/next buttons (≥24×24 px). Under reduced motion or on mobile, show a vertical list.
- **Lanyard (2.5.7):** if dragging the badge does anything (for example revealing contact info), provide a button alternative. Otherwise mark the canvas `aria-hidden` and put the same info (name, role, link to résumé) in real HTML next to it.
- **Gold or gradient text on dark:** check contrast at the *darkest stop* of the gradient against the *lightest* local background, including video frames behind text. Mid-gold such as #B8860B on #0A0A0A passes for large text, but darker golds or low-opacity gradients may not. This is illustrative only; verify with a contrast checker. Avoid animated opacity on body text that rests below 4.5:1.
- **Skip intro:** the preloader gets a focusable "Skip intro" button as the first tab stop, and Esc also skips. Add a "Skip to content" link at the top of `<body>`.

### Gaps
- No primary source was found on custom-cursor accessibility specifically. The recommendations above are derived from WCAG 2.4.7/2.4.11/1.4.13 and common practice.
- Exact contrast values for the planned gold palette need measuring once colors are chosen.

---

## 6. Mobile strategy: what to simplify or disable on small or low-end devices, GPU-friendly properties, blur jank, iOS Safari pinning

### Takeaway
Decide motion tiers at runtime: (A) full desktop, (B) mobile-lite, (C) reduced. Inputs are `matchMedia('(pointer: coarse)')`, viewport width, `prefers-reduced-motion`, `navigator.connection.saveData`/`effectiveType`, `navigator.hardwareConcurrency` and `navigator.deviceMemory`. `deviceMemory` is Chromium-only, so treat it as a hint and never the sole gate. Animate only `transform` and `opacity`, and avoid animating blur or backdrop-filter. On iOS Safari, minimize pins and use `ScrollTrigger.config({ ignoreMobileResize: true })`. `normalizeScroll()` is experimental and opt-in, so use it only if pin jitter is unacceptable.

### Cited Findings
- Animate `opacity` and `transform` only. "Avoid any property that triggers layout or paint unless it's absolutely necessary." Use `will-change` "sparingly, and only if you encounter a performance issue". "Anything that involves a blur … takes longer to paint" (last updated 2020-10-06). [web.dev – Animations guide](https://web.dev/articles/animations-guide)
- `navigator.deviceMemory` returns approximate GB, rounded to a power of 2 and clamped (bounds unspecified, may change), and works in secure contexts only. MDN labels it "Limited availability" (not Baseline). The fetch summary added, from general knowledge rather than the page, that it is Chromium-only and missing from Firefox/Safari. [MDN – Navigator.deviceMemory](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory)
- `ScrollTrigger.normalizeScroll()`:
  - It "Forces scrolling to be done on the JavaScript thread". It addresses address-bar show/hide resize jumps, multi-thread jitter on pinned elements, iOS Safari scroll/pointer misreporting and overscroll bounce.
  - It is "an experimental feature" and opt-in because ScrollTrigger was built "specifically _not_ to do scroll-jacking". It relinquishes control during multi-touch and pinch-zoom and has no fake scrollbar.
  - For iOS portrait address-bar resizes, the docs suggest `ScrollTrigger.config({ ignoreMobileResize: true })`, with the caveat that skipping refreshes can make trigger positions inaccurate.

  [GSAP – normalizeScroll](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/)
- Lenis is capped at 60 fps on Safari and 30 fps in low-power mode, and `syncTouch` may be unstable on iOS <16. [Lenis README](https://github.com/darkroomengineering/lenis)
- `gsap.matchMedia()` conditions (`isDesktop`/`isMobile`/`reduceMotion`) auto-revert animations and ScrollTriggers when the breakpoint changes. [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia())
- R3F: `PerformanceMonitor` to drop DPR or effects on FPS decline, `frameloop="demand"`, and few draw calls. [R3F – Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

### Inferences
**Proposed tiering logic** (client-only, run once and stored on `<html data-tier>`):

```ts
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || localStorage.motion === 'off';
const coarse = matchMedia('(pointer: coarse)').matches;
const small = innerWidth < 768;
const conn = (navigator as any).connection;
const slowNet = conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? '');
const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
const lowMem = ((navigator as any).deviceMemory ?? 8) <= 4; // Chromium-only hint
const tier = reduce ? 'C' : (coarse || small || slowNet || lowCpu || lowMem) ? 'B' : 'A';
```

- **Tier B (mobile-lite):**
  - **Off:** Lenis, custom cursor, cursor-follow hover-reveal, WebGL lanyard (static image instead) and the preloader beyond a quick fade.
  - **Simplified:** pinned horizontal scroll becomes native `overflow-x: auto` with `scroll-snap`. SplitText goes from chars to words or lines. Sticky stacking cards keep only `position: sticky` with no scale. Parallax is off or limited to a single layer.
  - **Video:** hero video becomes the poster image plus tap-to-play, or a 480p/720p short loop only on fast connections. Project videos load poster-only.
- **Tier A (desktop):** everything on, but WebGL still loads lazily post-LCP, DPR is capped at 1.5–2, and render loops pause offscreen.
- **Blur/backdrop-filter:** avoid animating `filter: blur()` and avoid large `backdrop-filter` panels over moving content or video, especially on Android mid-range. Pre-render blurred images or use semi-opaque solid backgrounds. This is my inference from "blur takes longer to paint"; I found no 2026 benchmark.
- **iOS Safari pinning:**
  - Use `svh`/`dvh` units carefully. `100svh` for pinned sections avoids address-bar resize jumps.
  - Call `ScrollTrigger.config({ ignoreMobileResize: true })`.
  - Keep pin counts low (one or two pins on mobile).
  - Avoid `pinSpacing` + `position: fixed` stacks inside transformed parents.
  - Test `normalizeScroll(true)` only if pins jitter, and only on iOS (`ScrollTrigger.isTouch === 1`), because it hijacks touch scrolling.

### Gaps
- `navigator.hardwareConcurrency` support/clamping (Safari has historically capped or reported a fixed value) was not verified in this pass.
- No 2026 benchmark data was found quantifying `backdrop-filter`/`filter` cost on mid-range Android.

---

## 7. Fonts: next/font best practice, variable fonts, subsetting, avoiding layout shift with display fonts used in kinetic animation

### Takeaway
Use `next/font` (self-hosted at build time with no request to Google) with **variable** fonts and `subsets: ['latin']`. Keep `adjustFontFallback` on (default) so a metric-matched fallback minimizes CLS. Load the display/kinetic font only in the layout or page that uses it, so it is preloaded only there. Split text with SplitText only after `document.fonts.ready` (or `autoSplit:true` + `onSplit`), otherwise line breaks change after the swap, which causes both CLS and broken animations.

### Cited Findings
- `next/font` "includes built-in automatic self-hosting … you can optimally load web fonts with no layout shift". Google font CSS and files are downloaded at build time: "No requests are sent to Google by the browser." The docs recommend variable fonts "for the best performance and flexibility". Non-variable fonts need an explicit `weight` (doc lastUpdated 2026-09-24). [Next.js – Font module](https://nextjs.org/docs/app/api-reference/components/font)
- Options:
  - `display` defaults to `'swap'`.
  - `preload` defaults to `true`.
  - `subsets` sets which subsets get `<link rel=preload>`, and a warning appears if none are given.
  - `axes` adds extra variable axes; by default only weight is included, to keep size down.
  - `adjustFontFallback` defaults to `true` for Google fonts and `'Arial'` for local fonts, generating a fallback that reduces CLS.
  - `fallback` sets the fallback stack.
  - `variable` exposes a CSS variable.
  - `declarations` (local fonts) can set `ascent-override` and similar descriptors.

  [Next.js – Font module](https://nextjs.org/docs/app/api-reference/components/font)
- A font is preloaded only on routes where it's used. A font defined in a page preloads only there, one in a layout preloads for wrapped routes, and one in the root layout preloads everywhere. "Use multiple fonts conservatively." Define fonts once in a shared `fonts.ts`. [Next.js – Font module](https://nextjs.org/docs/app/api-reference/components/font)
- SplitText: split after fonts load (`document.fonts.ready.then(...)`) or use `autoSplit: true`, building tweens in `onSplit()`. Splitting early causes misalignment or shifts. [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- Text using a web font during its block period isn't an LCP candidate, and a font-swap repaint can push LCP later. [web.dev – LCP](https://web.dev/articles/lcp), [DebugBear](https://www.debugbear.com/blog/opacity-animation-poor-lcp)

### Inferences
- **Two families maximum:** one variable display face for kinetic headlines (`next/font/local`, WOFF2, subset to Latin plus needed punctuation, ideally <40–60 KB) and one variable text face (Google via `next/font/google`, `subsets:['latin']`). Self-host with `localFont({ src, display:'swap', adjustFontFallback:'Arial', declarations:[{prop:'size-adjust', ...}] })` if the automatic fallback metrics are off.
- **Display font for the LCP headline:** keep `display:'swap'` so the fallback paints immediately and LCP isn't stuck behind the block period. `'optional'` is an option if you'd rather never swap on slow networks; it can skip the brand font on first visit.
- Reserve headline box height (fixed `line-height`, `min-height`, or `text-wrap: balance` with known line count) so the swap doesn't shift sections below. That keeps CLS ≤0.1.
- Avoid animating `font-variation-settings` (variable-axis animation) on large text on mobile. It forces re-layout and paint every frame. This is my inference from web.dev's layout/paint guidance.

### Gaps
- No measured file sizes were collected for candidate display fonts. Measure once fonts are chosen.

---

## 8. SEO for an animation-heavy portfolio: SSR text, Metadata API, OG images, JSON-LD (Person/ProfilePage), sitemap, case-study pages

### Takeaway
Google renders JS with headless Chromium, but rendering is deferred and "not all bots can run JavaScript". All meaningful text should therefore be in server-rendered HTML (React Server Components by default), with animations layered on client-side. Use a **multi-page** structure (`/`, `/work`, `/work/[slug]` case studies, `/about`, `/contact`). Each page gets unique metadata, a generated OG image, and JSON-LD: `ProfilePage` + `Person` on the about/home page, and `CreativeWork` on case studies. Add `sitemap.ts`/`robots.ts`. Navigation and project lists must be real `<a href>` links so Google can crawl them.

### Cited Findings
- Google processes JS in three phases: crawl → render → index. Pages are queued for rendering; "Once Google's resources allow, a headless Chromium renders the page". "Server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers", and "not all bots can run JavaScript". Links are discovered only from `<a>` elements with `href`. JS may set `<title>` and meta description (last updated 2026-03-04). [Google – JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- Next.js JSON-LD guidance:
  - Render `<script type="application/ld+json">` in `layout`/`page` with `JSON.stringify(jsonLd).replace(/</g, '\\u003c')` to prevent XSS.
  - Use the native `<script>`, not `next/script`.
  - Type it with `schema-dts` (`WithContext<Person>`).
  - Validate with Google's Rich Results Test and the Schema Markup Validator.

  Doc lastUpdated 2026-03-02. [Next.js – JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)
- Google `ProfilePage` structured data: the page's main focus must be a single person or organization affiliated with the site, and blog "About Me" pages are valid examples. Required: `mainEntity` (Person/Organization) with `name` (or `alternateName`). Recommended: `dateCreated`, `dateModified`, plus on the entity `alternateName`, `description`, `identifier`, `image`, `sameAs`, `interactionStatistic` and `agentInteractionStatistic` (last updated 2026-09-08). [Google – ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- `opengraph-image.tsx` with `ImageResponse` from `next/og`:
  - Export `alt`, `size` (`{width:1200,height:630}`) and `contentType`.
  - Images are statically generated at build time and cached unless they use request-time APIs.
  - Fonts are passed as ArrayBuffers (e.g. `.ttf`).
  - Static `opengraph-image.(jpg|png|gif)` files are also supported. Build fails if OG > 8 MB or Twitter > 5 MB.
  - Since v16.0.0, `params` is a Promise.

  Doc lastUpdated 2026-07-09. [Next.js – opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- In Next.js, Server Components are code-split automatically, and lazy loading applies to Client Components. Keeping text in Server Components keeps it out of client JS. [Next.js – Lazy loading guide](https://nextjs.org/docs/app/guides/lazy-loading)

### Inferences
- **Single page vs multi-page:** a single long animated page ranks mostly for the brand name ("Dawood Ahmed"). Separate case-study pages (`/work/[slug]` with `generateStaticParams` + `generateMetadata`) let each project target long-tail queries such as "[industry] web app case study Next.js" or "freelance React developer Pakistan" and give shareable URLs with their own OG images. Keep page transitions client-side for UX (App Router `<Link>`), but each URL must also render fully when loaded directly.
- **Metadata baseline:**
  - In root `layout.tsx`, set `metadataBase`, a `title.template` ("%s · Dawood Ahmed"), a default `description`, `alternates.canonical`, `openGraph`, `twitter: { card: 'summary_large_image' }`, and `robots`.
  - Per page, use `generateMetadata`.
  - Add `app/sitemap.ts` and `app/robots.ts` (Next.js metadata file conventions: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
- **JSON-LD set:**
  - Home/about: `ProfilePage` → `mainEntity: Person { name, alternateName, jobTitle, image, url, sameAs: [GitHub, LinkedIn, Dribbble…], knowsAbout, address/areaServed }`.
  - Optionally a `WebSite`.
  - Case studies: `CreativeWork`/`Article` with `author` → the same Person `@id`.
  - Use stable `@id`s (`https://site/#person`) to link entities.
- **Preloader/SEO:** because the content is SSR'd and visible in HTML under the overlay, crawlers get the text regardless of animation. Never gate content behind JS-only fetches or scroll-triggered insertion. SplitText runs client-side after hydration, so crawlers still see the original text (and `revert()` restores it).
- **Video SEO** (optional): add `VideoObject` for project demo videos on case-study pages, with `thumbnailUrl`, `uploadDate` and `contentUrl`.

### Gaps
- `generateMetadata`, `sitemap.ts` and `robots.ts` doc pages were not re-fetched in this pass. The APIs are long-standing, but check the 15.x docs for exact type signatures.
- No evidence was found on whether Google surfaces `ProfilePage` rich results for personal portfolio home pages, as opposed to forum or author profiles. It is valid markup either way, but a visible SERP feature is not guaranteed.

---

## 9. Testing checklist and tools

### Takeaway
Use lab tools to catch regressions before deploy: Lighthouse/PSI mobile (Slow 4G + 4× CPU), WebPageTest on a real Moto G-class device, and the Chrome Performance panel with CPU throttling. Use field data to judge real users: Vercel Speed Insights (P75, hard navigations only) and the CrUX data shown in PageSpeed Insights. Pair this with automated (axe) plus manual keyboard, screen-reader, reduced-motion and find-in-page tests, and structured-data validators.

### Cited Findings
- Lighthouse/PSI default mobile throttling is "Slow 4G": 150 ms RTT, 1.6 Mbps down, 750 Kbps up (roughly the bottom 25% of 4G / top 25% of 3G), plus a 4× CPU slowdown that moves a high-end desktop into the mid-tier mobile range. Simulated throttling (default) is fast and deterministic but can be inaccurate in edge cases; DevTools throttling is request-level. WebPageTest "Mobile 3G - Fast" equals Slow 4G. [Lighthouse – Throttling docs](https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md)
- Vercel Speed Insights:
  - The Real Experience Score uses real-user data, P75 by default, with P90/95/99 also available.
  - Data points are collected only on hard navigations, which for Next.js apps means "only the first-page view in a session". Up to 6 metrics per visit; INP and CLS are sent on page leave.
  - Scores: 0–49 poor, 50–89 needs improvement, 90–100 good. Detailed breakdowns require Speed Insights Plus.

  [Vercel – Speed Insights Metrics](https://vercel.com/docs/speed-insights/metrics)
- Validate JSON-LD with Google's Rich Results Test and validator.schema.org. [Next.js – JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)
- Run the skip-link focus test with smooth scroll enabled. [The Admin Bar](https://theadminbar.com/accessibility-weekly/watch-out-for-smooth-scroll)
- Check for `NO_LCP` in Lighthouse when hero elements start at opacity 0. [Renaissance Design](https://renaissance-design.net/2024/fixing-the-no_lcp-error-in-lighthouse/)

### Inferences
**Pre-merge and pre-deploy checklist (proposal)**

1. **Bundle:** `next build` output plus `@next/bundle-analyzer`.
   - Home first-load JS ≤ ~170 KB gz.
   - No `three`, `@react-three/*`, `@dimforge/*` or chat SDK in the initial chunks.
   - The Rapier WASM file is fetched only after interaction or in-view.
2. **Lab perf (mobile):** PSI and Lighthouse CLI with defaults (Slow 4G, 4× CPU).
   - Targets: LCP <2.5 s, TBT <200 ms, CLS <0.05.
   - Run 5× and take the median.
   - Also run a "first visit with preloader" scenario versus a "return visit" scenario.
3. **WebPageTest:** real Moto G (Power/Stylus-class) Android device or Moto G4 emulation, "4G" and "3G Fast" profiles, test locations close to target audiences (Mumbai/Singapore/Dubai plus US/EU).
   - Inspect the filmstrip to confirm the hero text/poster is visible in the first frames and not hidden behind the curtain.
   - Check total bytes, with video at ≤ ~1.5 MB on mobile.
4. **Chrome DevTools Performance panel:**
   - Enable CPU 4–6× throttle.
   - Record the load and confirm the LCP marker element and time.
   - Record scrolling through pinned sections and look for long tasks over 50 ms, layout thrash (purple) and paint storms (green). Enable "Rendering → Paint flashing / Layer borders / Frame rendering stats".
   - Record clicks on the menu, project links and chat button to get INP-like interaction timings.
   - Emulate `prefers-reduced-motion: reduce` in the Rendering tab.
5. **Accessibility:**
   - Automated: axe DevTools (or `@axe-core/playwright` in CI) and Lighthouse a11y.
   - Keyboard-only pass: skip intro, skip link, menu, horizontal section, hover-reveal list on focus, Esc dismiss, visible focus never fully obscured, targets ≥24 px.
   - Screen reader: NVDA + Chrome and VoiceOver + Safari/iOS. Split headlines should be read as whole words or sentences, not letters.
   - Ctrl+F finds and scrolls to text inside the pinned and horizontal sections.
   - Contrast checks on gold/gradient text over darkest and lightest backdrop regions.
   - 200% zoom and reflow at 320 px width.
6. **SEO:**
   - View-source (not the DOM) shows the h1, intro copy and project links.
   - Rich Results Test and Schema validator.
   - OG preview (opengraph.xyz or a LinkedIn Post Inspector-style tool).
   - `sitemap.xml` and `robots.txt` reachable.
   - Google Search Console URL Inspection → "View crawled page".
7. **Field monitoring:** enable `@vercel/speed-insights` (2.0.0) and Vercel Web Analytics.
   - Watch P75 mobile LCP/INP/CLS per route after each deploy, segmented by country if possible.
   - Client-side navigations are *not* measured, so test case-study pages via direct loads too.

### Gaps
- WebPageTest's current device list (whether a physical Moto G Power is still offered in 2026) and axe DevTools' current version were not verified in this pass.
- CrUX data will not exist for a new low-traffic portfolio. PSI field data will likely show "insufficient data", so Vercel Speed Insights (RUM) is the main field source.
