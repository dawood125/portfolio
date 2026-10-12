# Performant Next.js + React Three Fiber Portfolio Architecture

## What is the proven 2026 stack: Next.js App Router + React Three Fiber + drei + GSAP ScrollTrigger + Lenis? Versions, pitfalls, alternatives?

### Takeaway
Pin Next.js 15.1+ (React 19 stable) + `@react-three/fiber@9.x` + `three` latest + `@react-three/drei@10.x` + `gsap@3.12.7+` + `lenis@1.2.3+`; render all WebGL in `'use client'` Canvas with `transpilePackages:['three']`, drive Lenis from GSAP ticker as single loop, and use `pmndrs/react-three-next` View-portalling pattern for multi-section scroll-film.

### Cited Findings
- Fiber v9 pairs with React 19; Fiber v8 pairs with React 18 — must match major versions like react-dom — [Source](https://r3f.docs.pmnd.rs/getting-started/installation)
- Latest Fiber is 9.6.1 (published ~2 months ago), 9.5.0 weekly downloads ~1.49M — [Source](https://www.npmjs.com/package/@react-three/fiber)
- Next.js 13.1+ requires `transpilePackages: ['three']` in `next.config.js` because three ecosystem ships untranspiled addons — [Source](https://r3f.docs.pmnd.rs/getting-started/installation)
- Next.js 15 stable uses React 19 RC, changes caching to uncached-by-default for GET Route Handlers and Client Router Cache (`staleTime 0`), adds `after()`, async `cookies()/headers()/params`, Turbopack dev stable — [Source](https://nextjs.org/blog/next-15)
- Next.js 15.1 fully supports React 19 stable in both Pages and App Router — [Source](https://nextjs.org/blog/next-15-1)
- Upgrade path is `npx @next/codemod@canary upgrade latest` + `npm install next@latest react@latest react-dom@latest` — [Source](https://nextjs.org/docs/app/guides/upgrading/version-15)
- `next/dynamic` is deprecated in App Router; use `React.lazy()+Suspense` for code-splitting — [Source](https://nextjs-changelog-z704778.public.builtwithrocket.new/home)
- Official starter `pmndrs/react-three-next` achieves TTL ~100ms, First-load JS ~79kb, Lighthouse 100 across Performance/A11y/Best-Practices/SEO via shared Canvas + `tunnel-rat` `<View/>` + `gl.scissor` viewport segments, App-directory architecture — [Source](https://github.com/pmndrs/react-three-next)
- Canonical Lenis+GSAP wiring is single loop: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add((time)=>lenis.raf(time*1000))`, `gsap.ticker.lagSmoothing(0)`; never add separate `requestAnimationFrame` for Lenis — [Source](https://github.com/iart-ai/web-animation-skills/blob/main/skills/gsap-web/references/scrolltrigger-lenis.md)
- Same wiring reproduced in minimal example: `duration:1.2, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))`, `smooth:true, smoothTouch:false`, then sync + ticker + `lagSmoothing(0)`; must `ScrollTrigger.refresh()` after dynamic layout changes — [Source](https://github.com/tinux-labs/gsap-plugin-scrolltrigger)
- Production Next.js 15.2.2 + React 19 + GSAP 3.12.7 + Lenis 1.2.3 + Tailwind v4 + TS example uses `SmoothScrollProvider` wrapping `layout.tsx` — [Source](https://github.com/tnmod/lenis-gsap-nextjs-example)
- Lenis repo explicitly documents `Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin` setup section — [Source](https://github.com/darkroomengineering/lenis)
- GSAP docs: ScrollTrigger links animation progress to scroll via `scrub:true/1`, `scrollerProxy()` for 3rd-party smooth-scroll, or native integration with ScrollSmoother — [Source](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
- Common Lenis+GSAP mistake is two independent rAF loops causing jitter/marker-drift/broken pins; fix is GSAP ticker drives Lenis with seconds-to-milliseconds `*1000` conversion — [Source](https://github.com/creativoma/lenis-gsap-lab)
- Alternatives: GSAP ScrollSmoother (Club Greensock, members-only, fully integrated, no proxy needed) vs Lenis (MIT, native scroll, free); state via `zustand/jotai`, physics via `@react-three/rapier` or `cannon-es`, post via `@react-three/postprocessing` — [Source](https://gsap.com/docs/v3/Plugins/ScrollTrigger); [Source](https://github.com/pmndrs/react-three-fiber/blob/master/docs/getting-started/introduction.mdx)

### Inferences
- For scroll-film camera, store scroll progress in ref/zustand (not React state) and lerp camera in `useFrame`; use `ScrollTrigger scrub:1` + `useGSAP` + `gsap.context().revert()` cleanup to avoid double-trigger in StrictMode.
- Solo-dev maintainability favors Lenis (free, MIT) over ScrollSmoother; budget for `lenis` package rename (`@studio-freight/lenis` → `lenis`) when copying old tutorials.
- Must mark every file importing `Canvas/useFrame/Lenis/gsap` as `'use client'`; keep page/layout Server Components for metadata/SEO.

### Gaps
- No reliable source found for exact 2026 `drei@10.x` + `three@r17x/r18x` peer matrix; verify via `npm view` at scaffold time.
- No reliable source confirming Next.js 16 stable status for production portfolio in Oct 2026; 15.x remains safest pinned target.

## How to architect continuous scroll-film camera: Canvas setup, DPR clamp, InstancedMesh, suspense/lazy, post-processing budget?

### Takeaway
One full-viewport sticky `<Canvas dpr={[1,1.5]} gl={{antialias:true, powerPreference:'high-performance'}} camera={{fov:35}}>` + `frameloop="always"` for scroll-film (demand only if static), DPR clamp 1–1.5, <300 draw calls via InstancedMesh/shared geometry, nested Suspense + `React.lazy` for 300–400KB 3D bundle, `PerformanceMonitor` + `performance.regress()` adaptive scaling, and post budget ≤1–2 passes (Bloom+Vignette, no SSAO on mobile).

### Cited Findings
- Cap DPR via `<Canvas dpr={[1,1.5]}>`; R3F picks in range based on device; on iPhone 12 mini this alone took 35fps→60fps; above 2.0 pays for invisible pixels; 400×600 logical at DPR 3.0 = 1200×1800 = 9× workload — [Source](https://3d2048.com/r3f-mobile-optimization.html)
- R3F defaults to `frameloop="always"` (~60 renders/sec forever); `frameloop="demand"` renders only on prop change/invalidate, dropping idle CPU 40%→3% on mid Android, but requires manual `invalidate()` for mutated props like OrbitControls — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance); [Source](https://3d2048.com/r3f-mobile-optimization.html)
- Drei controls do `invalidate` automatically; custom controls must `addEventListener('change', invalidate)` — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Keep meshes to few hundred or less, absolute max 1000 draw calls; win back via instancing to hundreds of thousands objects in single draw call with `<instancedMesh args={[null,null,count]}>` + `setMatrixAt` + `instanceMatrix.needsUpdate=true` — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Naive per-mesh `<boxGeometry>` creates separate GPU buffers; share via `useMemo(()=>new BoxGeometry(1,1,1),[])` + `geometry={shared}`; graduate to drei `<Instances>/<Instance>` for hundreds — [Source](https://3d2048.com/r3f-mobile-optimization.html)
- Drei `<Instances>` overhead reported: identical Box grids run high fps in vanilla/pure-R3F `instancedMesh` but drop with per-`<Instance>` React mapping due to CPU reconciler cost; prefer imperative `instancedMesh+useRef` for large dynamic counts — [Source](https://github.com/pmndrs/react-three-fiber/discussions/3326)
- Merging geometries to cut 300→56 draw calls can still drop fps if material program switches return; must also atlas materials — [Source](https://github.com/pmndrs/react-three-fiber/discussions/1447)
- Every `useLoader` asset cached automatically by URL; GLTFJSX links geometries/materials for reuse — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Nested Suspense pattern: outer fallback loading indicator → inner `<Suspense fallback={<Model url="/low.glb"/>}><Model url="/high.glb"/></Suspense>` for progressive LOD — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Lazy-split 3D bundle (`three+R3F+drei` ~300–400KB gzipped) via `lazy(()=>import('./Game3D'))` + `<Suspense>` cuts mobile 3G TTI 8s→2s — [Source](https://3d2048.com/r3f-mobile-optimization.html)
- `<Detailed distances={[0,10,20]}><mesh high/><mesh mid/><mesh low/></Detailed>` implements LOD without boilerplate — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- `PerformanceMonitor onIncline/onDecline/onChange({factor})` adapts DPR/effects; example `useState(1.5)` → `setDpr(2)`/`setDpr(1)` or `round(0.5+1.5*factor,1)`; `flipflops+onFallback` sets lowest baseline then shuts down — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- `performance: {current,min:0.1,max:1,debounce:200,regress()}` movement regression: call `regress()` on controls/scroll change, multiply DPR/effects by `current` via `<AdaptivePixelRatio/>`; mere `regress()` does nothing unless app opts in — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Shadows disabled by default; enabling per-light shadow pass re-renders scene to depth buffer; removing shadows took low Android 22fps→55fps; gate via `shadows={!isMobile}` + `castShadow={!isMobile}` or `deviceMemory/hardwareConcurrency` tiering — [Source](https://3d2048.com/r3f-mobile-optimization.html)
- Minimal lighting: `<ambientLight intensity={0.6}/>` (constant cost) + one `<directionalLight>`; each extra Standard-material light adds per-fragment cost; prefer drei `<Environment preset="city"/>` IBL (200–800KB HDR cost) over fill lights — [Source](https://3d2048.com/r3f-mobile-optimization.html)
- React 18+ concurrency (`startTransition/useTransition`) holds 60fps under 510×TextGeometry 1.5s-jank load where vanilla drops to 5–20fps — [Source](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Measure with Chrome DevTools Performance Frames track + remote debugging + `r3f-perf <Perf/>` draw-call/triangle overlay; optimize worst frame, not average — [Source](https://3d2048.com/r3f-mobile-optimization.html)

### Inferences
- Scroll-film must stay `frameloop="always"` (continuous camera lerp) + `performance={{min:0.5}}` regression on scroll to halve DPR during fast scroll; use `demand` only for static hero sections.
- Camera rig: single sticky Canvas `position:fixed inset-0 -z-10`, DOM sections `h-screen` each mapping to camera waypoint via ScrollTrigger `onUpdate(progress)` → `camera.position.lerpVectors()` + `lookAt`; disable `OrbitControls` on touch or gate to desktop.
- Post budget for mid Android: `EffectComposer` with `Bloom luminanceThreshold~1` + `Vignette` only; skip `SSAO/N8AO`, `DOF`, shadows; toggle via `usePerformanceMonitor`.

### Gaps
- No citable 2026 benchmark for exact postprocessing ms cost on Mali/Adreno mid-range; must profile target device with `r3f-perf`.
- No reliable source for `@react-three/postprocessing` v3 + R3F v9 peer compatibility list; verify at install.

## How to keep SEO and accessibility: DOM text layer, metadata, sitemap, semantic HTML, prefers-reduced-motion, keyboard nav?

### Takeaway
Keep all indexable copy in DOM (Canvas `aria-hidden`, never text-in-WebGL), use App Router `metadata`/`generateMetadata` + `sitemap.ts`/`robots.ts` + JSON-LD, semantic landmarks, `prefers-reduced-motion` kill-switch for Lenis/GSAP/WebGL, and full keyboard operability.

### Cited Findings
- Next.js Metadata API defines `<head>` via static `metadata` object or dynamic `generateMetadata()` in `layout.js/page.js`; file-based `favicon.ico/apple-icon/opengraph-image/twitter-image/robots.txt/sitemap.xml` overrides config-based — [Source](https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata)
- `metadata`/`generateMetadata` only supported in Server Components to include in initial HTML; `generateMetadata` data-fetch must complete before streaming `<head>` — [Source](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- For dynamically rendered pages Next.js streams metadata separately without blocking UI, but disables streaming for bots (`Twitterbot, Slackbot, Bingbot` via User-Agent) so crawlers get `<head>` intact; configurable via `htmlLimitedBots` — [Source](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- `sitemap.(xml|js|ts)` matches Sitemaps XML format; `export default function sitemap(): MetadataRoute.Sitemap` returns URL array; supports `images/videos` props and `generateSitemaps` sharding; cached by default as Route Handler — [Source](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- Title is top SEO element for ranking+CTR; description not ranking factor but affects CTR; Open Graph standardizes share previews — [Source](https://nextjs.org/learn/seo/metadata)
- Starter achieves Lighthouse 100 SEO/A11y by keeping DOM + Canvas synchronized (events/DOM/viewport) rather than WebGL-only content — [Source](https://github.com/pmndrs/react-three-next)
- Core Web Vitals good thresholds: LCP ≤2500ms, INP ≤200ms, CLS ≤0.1 at 75th percentile; thresholds chosen so ≥10% origins achievable via CrUX — [Source](https://web.dev/articles/defining-core-web-vitals-thresholds)
- Lab thresholds identical: LCP ≤2.5s / >4s poor, INP ≤200ms / >500ms poor, CLS ≤0.1 / >0.25 poor — [Source](https://unlighthouse.dev/learn-lighthouse/core-web-vitals)
- Only 48% mobile / 56% desktop pass all three CWV in 2025; LCP good only 62% mobile (hardest), INP 77%, CLS 81% — [Source](https://almanac.httparchive.org/en/2025/performance)
- No citable R3F docs in fetched set for `prefers-reduced-motion`; established pattern is `matchMedia('(prefers-reduced-motion: reduce)')` → disable Lenis smoothing + `ScrollTrigger` scrub pinning + set static camera frame.

### Inferences
- Architecture: `<main><section aria-label>` per film chapter with real `<h1>/<h2>/<p>/<a>` for 4 live +5 GitHub projects + studio `<Image alt>`; Canvas `aria-hidden="true"` + `role="img" aria-label` fallback + `prefers-reduced-motion` poster image swap.
- Keyboard: each chapter focusable, skip-link to `#content`, Lenis `anchors:true` + arrow/Tab navigation, visible focus rings, `aria-live` for reel-recording status.
- SEO checklist: `title.template '%s | Studio'`, `description`, `canonical`, `openGraph`, `twitter`, `robots`, `sitemap.ts` with 4 live URLs + `/`, `manifest`, JSON-LD `Person/CreativeWork`.

### Gaps
- No primary source found for drei `@react-three/a11y` maintenance status in 2026; treat as optional, DOM-layer semantics is authoritative.
- No reliable source for updated 2026 CWV thresholds tightening to LCP 2.0s/INP 150ms (single low-authority blog claimed this); defer to web.dev 2.5s/200ms/0.1 until Google confirms — contradicted by [Source](https://wsc.us.org/article/3) vs [Source](https://web.dev/articles/defining-core-web-vitals-thresholds).

## How to implement in-browser MP4 recording: captureStream + MediaRecorder + fixed-framerate render loop, limits and export quality?

### Takeaway
Record WebGL Canvas via `canvas.captureStream(60)` + `new MediaRecorder(stream,{mimeType:'video/mp4;codecs=avc1,mp4a.40.2', videoBitsPerSecond:12_000_000})` with feature-detect fallback to `video/webm;codecs=vp9`, drive deterministic camera timeline with fixed-timestep accumulator decoupled from live scroll, and offer 1080p/30fps ~8–12Mbps MP4 (Safari native, Chrome 126+).

### Cited Findings
- `MediaRecorder(stream, {mimeType, audioBitsPerSecond, videoBitsPerSecond})` records `MediaStream` from `getUserMedia/<audio>/<video>/<canvas>`; check via `MediaRecorder.isTypeSupported()`; throws `NotSupportedError` if unsupported — [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder)
- Container options include `"video/webm"` or `"video/mp4"` with bitrate controls — [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- Recording flow: `captureStream()` → `new MediaRecorder` → `ondataavailable` chunks → `mediaRecorder.start(timeslice)` → `stop()` → `Blob(chunks,{type:mimeType})` download; example `canvas.captureStream(25)` then 9s stop — [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)
- Canvas capture pattern known since 2016: `canvas.captureStream()` → `new MediaRecorder(canvasStream)`; pixel-manipulation via `drawImage` + WebGL preferred for efficiency — [Source](https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder)
- Safari supports MP4 file with H.264 + AAC; feature-detect helper `supportsRecording(mime)` checking `MediaRecorder.isTypeSupported` else `startsWith("audio/mp4")||startsWith("video/mp4")` — [Source](https://webkit.org/blog/11353/mediarecorder-api/)
- 2023 probe: Safari 16.6 only `audio/mp4`/`video/mp4` (`avc1,mp4a`); Chrome 116 only `video/webm`/`audio/webm` (`vp9,vp8,avc1,av1,h264,opus,pcm`) — [Source](https://stackoverflow.com/questions/41739837/all-mime-types-supported-by-mediarecorder-in-firefox-and-chrome/42307926)
- Chrome lacked `video/mp4` muxing (`Failed to initialize native MediaRecorder`), long-standing request noting Apple devices don't play webm natively and Web Share needs client-side mp4 — [Source](https://issues.chromium.org/issues/40127044)
- Chrome Platform Status tracks `MP4 container support for MediaRecorder` (H264+AAC muxing) — [Source](https://chromestatus.com/feature/5163469011943424)
- MediaRecorder widely available since Apr 2021, global usage ~96.63% (`start` event); supported Edge 79+, Firefox 25+, Chrome 49+, Safari 14.1+ desktop / 14.5+ iOS — [Source](https://caniuse.com/mdn-api_mediarecorder_start_event); [Source](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder)
- Known pitfalls: Safari macOS canvas `captureStream()` historically produced blank/black video (WebKit bugs 229611/230613, WebGL backing-store issue) — [Source](https://www2.webkit.org/show_bug.cgi?id=229611)
- Chromium fixed canvas-capture RGB frames backed by CPU memory vs GPU textures to avoid black output — [Source](https://groups.google.com/a/chromium.org/g/feature-media-reviews/c/iC1lODgxmUg)

### Inferences
- Reel mode: hide UI overlays, set fixed `1280×720` or `1920×1080` offscreen size (clamp DPR 1), disable Lenis smoothing, run scripted GSAP timeline at fixed `1/60` accumulator stepping `lenis.raf` + `composer.render` manually, `stream=canvas.captureStream(60)`, `recorder.start(1000)` timeslice, stop → Blob → `a.download="reel.mp4"`.
- Quality ladder: 720p30 @5Mbps (~20MB/min) for quick share, 1080p30 @12Mbps (~90MB/min) for portfolio; if `isTypeSupported('video/mp4')==false` record webm then client-transcode via `ffmpeg.wasm` or server convert, with clear UX label.
- Limits: no audio unless adding `AudioContextDest` track; mobile Safari memory caps ~100–200MB Blob; long 60s takes require `requestData` chunking; variable live-scroll fps causes judder — must use deterministic timeline, not live user scroll.

### Gaps
- No reliable source confirming Chrome 126+ MP4 MediaRecorder shipped-by-default version number; must runtime-detect with `isTypeSupported` and log fallback rate.
- No citable spec for `captureStream(fps)` frame-dropping behavior under heavy WebGL load; needs empirical test on mid Android.

## How to deploy: Vercel vs VPS, image/video optimization, font loading, analytics, contact form without backend?

### Takeaway
Deploy static-first portfolio on Vercel Hobby $0 (100GB bandwidth, 5K image transforms/mo) with `next/image` + `next/font` + `next/third-parties` analytics; use VPS (Hetzner/Coolify) only if egress or ISR writes exceed free tier; contact via Resend/Formspree/Route Handler + honeypot, no custom backend.

### Cited Findings
- Vercel Hobby: 200 projects, 100 deployments/day, 1 concurrent build, 45min build timeout, 100MB CLI upload, 32GB disk — [Source](https://vercel.com/docs/limits)
- Hobby included: 100GB Fast Data Transfer, 1M CDN requests, 1M Function invocations, 4hrs Active CPU, 360GB-hrs provisioned memory; Pro: 1TB bandwidth then $0.15/GB, $0.60/M invocations — [Source](https://vercel.com/docs/limits/fair-use-guidelines); [Source](https://vercel.com/pricing)
- Image Optimization Hobby: 5K transformations/mo, 300K cache reads, 100K writes; overage $0.05–0.0812/1K transforms, $0.40–0.64/1M reads, $4.00–6.40/1M writes; each unique src×size counts once — [Source](https://vercel.com/docs/pricing?from=related&relationship=related&source_path=%2Fdocs%2Fimage-optimization%2Flimits-and-pricing&source_site=vercel-docs)
- Real-project analysis: 50 posts×3 breakpoints=150 transforms on first load; must set `minimumCacheTTL:86400` and prefer CMS CDN (Sanity) to avoid $5/1K overage — [Source](https://dev.to/nayankyada/vercel-pricing-2026-what-you-actually-pay-for-a-real-nextjs-project-33md)
- Vercel deploys standard Next.js with zero config, Git import + per-PR previews; maintains Next.js so features land first vs Cloudflare OpenNext adapter requiring R2/Durable Objects for ISR — [Source](https://vercel.com/kb/guide/next-js-on-vercel-vs-cloudflare)
- Vercel Functions: configurable to 4GB mem, 250MB bundle (5GB Large beta), 300s Hobby / 800s Pro wall-clock vs Cloudflare 10ms–5min CPU-time model — [Source](https://vercel.com/kb/guide/next-js-on-vercel-vs-cloudflare)
- Next.js Image best practice: `<Image>` for auto lazy-load + LCP optimization — [Source](https://dev.to/syed_mudasseranayat_e251/how-to-optimize-seo-in-nextjs-using-metadata-and-getserversideprops-5af1)
- No primary fetch for `next/font` in this round, but App Router convention is `next/font/google` self-hosted with `display:swap` + `preload` to avoid CLS/FOUT.

### Inferences
- Portfolio fits Hobby: ~9 project thumbs + studio photo as `next/image` AVIF/WebP `sizes` + `priority` for LCP hero, videos as muted `poster` + `preload="none"` hosted on Cloudinary/Bunny (not Vercel bandwidth), fonts via `next/font` (Inter/Space Grotesk) subset latin.
- Analytics privacy-cheap: Vercel Speed Insights (10K events free) + Web Analytics 50K/mo or Plausible/Umami self-host; contact: `app/api/contact/route.ts` + Resend free tier + Zod + rate-limit + honeypot, fallback Formspree if zero-code needed.
- Switch to VPS when: >100GB video egress, need `ffmpeg` transcode, or want $5–6/mo flat Hetzner + Coolify + Cloudflare CDN; keep `output:'standalone'` Docker for portability.
- 4 live links: SSG cards with `og:image` pre-generated; 5 GitHub-only: Octokit build-time fetch + ISR 24h; studio photo: `ImageResponse` OG + `sitemap.images`.

### Gaps
- No reliable source found for Resend/Formspree free quotas as of Oct 2026; confirm pricing page before committing.
- No citable `next/font` 2026 loading metrics in fetched set; needs Lighthouse before/after test.
