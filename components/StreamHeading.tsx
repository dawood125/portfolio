"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";

type Props = { as?: ElementType; id?: string; className?: string; children: ReactNode };

/** Headings arrive as a token stream: words rise out of their own masks, a caret trails and fades. */
export default function StreamHeading({ as: Tag = "h2", id, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || tier === "reduced") return;
      const split = SplitText.create(el, {
        type: tier === "full" ? "words" : "lines",
        mask: tier === "full" ? "words" : "lines",
        wordsClass: "split-word",
        linesClass: "split-line",
        aria: "auto",
      });
      const parts = tier === "full" ? split.words : split.lines;
      const caret = el.querySelector<HTMLElement>("[data-caret]");
      gsap.set(parts, { yPercent: 135 });
      if (caret) gsap.set(caret, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onComplete: () => split.revert(),
      });
      tl.to(parts, { yPercent: 0, duration: 0.55, stagger: 0.045, ease: "power3.out" });
      if (caret) tl.to(caret, { autoAlpha: 1, duration: 0.01 }, 0.1).to(caret, { autoAlpha: 0, duration: 0.2, delay: 0.5 });
      return () => split.revert();
    },
    { scope: ref, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
      <span data-caret="" aria-hidden="true" className="stream-caret" />
    </Tag>
  );
}
