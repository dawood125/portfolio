"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { introPlaying, onIntroDone, useMotionTier } from "@/lib/motion";
import { liveSystems, profile } from "@/lib/content";
import LiveClock from "./LiveClock";
import PortraitMonitor from "./PortraitMonitor";
import type { IntroVideo } from "@/lib/intro-media";
import s from "./Hero.module.css";

export default function Hero({ introVideo }: { introVideo: IntroVideo | null }) {
  const root = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || tier === "reduced") return;

      const name = el.querySelector<HTMLElement>("[data-name]")!;
      const frame = el.querySelector<HTMLElement>("[data-portrait-frame]")!;
      const video = frame.querySelector("video");
      const rise = el.querySelectorAll("[data-rise]");
      let split: SplitText | null = null;
      let cancelEntrance = () => {};
      let stopProximity = () => {};

      // The name leans toward the cursor: each letter's variable weight follows pointer distance.
      // Full tier + fine pointer only; letters keep their width budget small (620 → 780).
      const enableProximity = () => {
        if (tier !== "full" || !matchMedia("(pointer: fine)").matches) return;
        const chars = SplitText.create(name, { type: "chars", charsClass: "name-char", aria: "auto" });
        const BASE = 620;
        const MAX = 790;
        const SIGMA = 130;
        const setters = chars.chars.map((c) => gsap.quickTo(c, "fontWeight", { duration: 0.55, ease: "power3.out" }));
        let rects: DOMRect[] = [];
        const measure = () => (rects = chars.chars.map((c) => c.getBoundingClientRect()));
        const onMove = (e: globalThis.PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          if (!rects.length) measure();
          rects.forEach((r, i) => {
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const k = Math.exp(-(dx * dx + dy * dy) / (2 * SIGMA * SIGMA));
            setters[i](BASE + (MAX - BASE) * k);
          });
        };
        const onLeave = () => setters.forEach((set) => set(BASE));
        const reset = () => (rects = []);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        window.addEventListener("scroll", reset, { passive: true });
        window.addEventListener("resize", reset);
        stopProximity = () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("scroll", reset);
          window.removeEventListener("resize", reset);
          chars.revert();
        };
      };

      // Entrance plays once per session, hidden under the intro overlay until it lifts.
      if (introPlaying()) {
        split = SplitText.create(name, {
          type: tier === "full" ? "lines,chars" : "lines",
          mask: "lines",
          linesClass: "split-line",
          aria: "auto",
        });
        const parts = tier === "full" ? split.chars : split.lines;
        gsap.set(parts, { yPercent: 130 });
        gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(rise, { y: 18, autoAlpha: 0 });

        cancelEntrance = onIntroDone(() => {
          gsap
            .timeline()
            .to(parts, { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: tier === "full" ? 0.03 : 0.09 }, 0)
            .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "aperture" }, 0.08)
            .fromTo(video, { scale: 1.16 }, { scale: 1, duration: 1.5, ease: "power3.out" }, 0.08)
            .to(rise, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07 }, 0.4)
            .add(() => {
              split?.revert();
              split = null;
              enableProximity();
            });
        });
      } else {
        enableProximity();
      }

      // Scroll-out depth: portrait drifts slower than the page, the name lifts away. Full tier only.
      if (tier === "full") {
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(el.querySelector("[data-portrait]"), { y: -70, ease: "none", scrollTrigger: st });
        gsap.to(name, { yPercent: -14, ease: "none", scrollTrigger: st });
      }

      return () => {
        cancelEntrance();
        stopProximity();
        split?.revert();
      };
    },
    { scope: root, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <section ref={root} className={s.hero} id="top" aria-labelledby="hero-name">
      <div className={`wrap ${s.grid}`}>
        <div className={s.meta} data-rise="">
          <p className={s.available}>{profile.availability}</p>
          <LiveClock className={`mono ${s.clock}`} />
        </div>

        <h1 id="hero-name" className={s.name} data-name="">
          <span className={s.nameLine}>Dawood</span>
          <span className={s.nameLine}>Ahmed</span>
        </h1>

        <PortraitMonitor className={s.portrait} introVideo={introVideo} />

        <div className={s.lede} data-rise="">
          <p className={s.statement}>
            I build the software businesses open every morning — <em>and the AI that answers for them.</em>
          </p>
          <div className={s.ctas}>
            <a className="btn" href={profile.cv} target="_blank" rel="noopener">
              Read my CV <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href={`mailto:${profile.email}?subject=Project%20enquiry`}>
              Start a project
            </a>
          </div>
        </div>

        <dl className={s.spec} data-rise="">
          <div>
            <dt>Builds with</dt>
            <dd>Next.js · Laravel · MERN · RAG / LangGraph</dd>
          </div>
          <div>
            <dt>Track record</dt>
            <dd>
              {profile.experience} · {profile.projectsShipped} projects · {liveSystems.length} live client systems
            </dd>
          </div>
          <div>
            <dt>Credential</dt>
            <dd>
              HEC / NCEAC Generative AI — Top Performer {profile.credential.year}
              <span className="mono"> · ID {profile.credential.certificateId}</span>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>Sheikhupura, Pakistan · {profile.tzLabel}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
