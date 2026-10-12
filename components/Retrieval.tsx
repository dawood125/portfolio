"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import s from "./Retrieval.module.css";

// Draft line in Dawood's voice — an opinion, not a claim. He approves the wording.
const SENTENCE = "Good software makes a business boring in all the right places.";

/**
 * The showpiece: scattered words are "retrieved" and assemble into one sentence as you scroll.
 * One pinned ScrollTrigger, one scrubbed timeline. Lite: words settle once, no pin. Reduced: static.
 */
export default function Retrieval() {
  const root = useRef<HTMLElement>(null);
  const [assembled, setAssembled] = useState(0);
  const tier = useMotionTier();
  const total = SENTENCE.split(" ").length;

  useGSAP(
    () => {
      const el = root.current;
      const line = el?.querySelector<HTMLElement>("[data-line]");
      if (!el || !line) return;
      if (tier === "reduced") {
        setAssembled(total);
        return;
      }

      const split = SplitText.create(line, { type: "words", wordsClass: "retrieval-word", aria: "auto" });
      const words = split.words as HTMLElement[];
      const rand = gsap.utils.random;
      // Deterministic-looking scatter: each word gets its own drift, wider at the ends.
      const scatter = words.map((_, i) => {
        const edge = Math.abs(i - (words.length - 1) / 2) / (words.length / 2);
        return {
          x: rand(-0.42, 0.42) * window.innerWidth * (0.6 + edge * 0.5),
          y: rand(-0.34, 0.34) * window.innerHeight,
          rotation: rand(-22, 22),
          scale: rand(0.55, 1.35),
        };
      });

      if (tier === "lite") {
        gsap.from(words, {
          x: (i) => scatter[i].x * 0.25,
          y: (i) => scatter[i].y * 0.25,
          rotation: (i) => scatter[i].rotation * 0.4,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
          onComplete: () => setAssembled(total),
        });
        return () => split.revert();
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setAssembled(Math.round(self.progress * total)),
        },
      });
      tl.from(
        words,
        {
          x: (i) => scatter[i].x,
          y: (i) => scatter[i].y,
          rotation: (i) => scatter[i].rotation,
          scale: (i) => scatter[i].scale,
          opacity: 0.12,
          duration: 1,
          stagger: { each: 0.06, from: "random" },
        },
        0
      ).fromTo(el.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "none" }, ">-0.2");

      return () => split.revert();
    },
    { scope: root, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <section ref={root} className={s.section} aria-label="How I think about software">
      <div className={`wrap ${s.inner}`}>
        <p className={`mono ${s.meta}`} aria-hidden="true">
          retrieving · {assembled}/{total} words in place
        </p>
        <p className={s.line} data-line="">
          {SENTENCE}
        </p>
        <span className={s.rule} data-rule="" aria-hidden="true" />
        <p className={`mono ${s.sign}`}>— Dawood</p>
      </div>
    </section>
  );
}
