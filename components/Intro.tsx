"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { finishIntro, introPlaying } from "@/lib/motion";
import UrduMark from "./UrduMark";
import s from "./Intro.module.css";

/**
 * First visit per session only (gate set pre-paint in <head>). ≤ 1.2s, skippable, Esc skips.
 * The page underneath is already rendered; this overlay only lifts away from it.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !introPlaying()) return;

      // Everything behind the overlay is inert until it lifts.
      const behind = document.querySelectorAll("#main, [data-site-header], .skip-link");
      behind.forEach((n) => n.setAttribute("inert", ""));

      const strokes = el.querySelectorAll("[data-urdu-strokes] path");
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          behind.forEach((n) => n.removeAttribute("inert"));
          finishIntro();
        },
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: 0.62, stagger: { each: 0.035, from: "start" } }, 0)
        .to(strokes, { fillOpacity: 1, duration: 0.3, ease: "power1.out" }, 0.38)
        .to(el.querySelectorAll(`.${s.latin} span`), { y: 0, duration: 0.45, ease: "power3.out", stagger: 0.05 }, 0.32)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.48, ease: "aperture" }, 0.86)
        .to(el.querySelector(`.${s.stage}`), { yPercent: -18, duration: 0.48, ease: "aperture" }, 0.86);

      const skip = () => tl.progress(1);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
      window.addEventListener("keydown", onKey);
      const btn = el.querySelector("button");
      btn?.addEventListener("click", skip);
      btn?.focus({ preventScroll: true });

      return () => {
        window.removeEventListener("keydown", onKey);
        btn?.removeEventListener("click", skip);
        behind.forEach((n) => n.removeAttribute("inert"));
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className={s.intro}>
      <div className={s.stage}>
        <UrduMark className={s.urdu} strokes />
        <p className={s.latin} aria-hidden="true">
          <span>Dawood Ahmed</span>
        </p>
      </div>
      <button type="button" className={`mono ${s.skip}`}>
        Skip intro <kbd>Esc</kbd>
      </button>
    </div>
  );
}
