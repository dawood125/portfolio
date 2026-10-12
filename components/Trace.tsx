"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import s from "./Trace.module.css";

/**
 * The site's one motion motif: a request trace drawn down the page as you read.
 * The head sits on the 75% viewport line; nodes ([data-trace-node]) light up as it passes.
 */
export default function Trace() {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      const el = ref.current;
      const host = el?.parentElement;
      if (!el || !host) return;
      const fill = el.querySelector("[data-fill]");
      const head = el.querySelector("[data-head]");
      const nodes = host.querySelectorAll<HTMLElement>("[data-trace-node]");

      if (tier === "reduced") {
        gsap.set(fill, { scaleY: 1 });
        gsap.set(head, { autoAlpha: 0 });
        nodes.forEach((n) => n.classList.add("is-traced"));
        return;
      }

      const st = { trigger: host, start: "top 75%", end: "bottom 75%", scrub: tier === "full" ? 0.4 : true, invalidateOnRefresh: true };
      gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
      gsap.fromTo(head, { y: 0 }, { y: () => host.offsetHeight, ease: "none", scrollTrigger: st });

      nodes.forEach((n) =>
        ScrollTrigger.create({ trigger: n, start: "top 75%", toggleClass: { targets: n, className: "is-traced" } })
      );
    },
    { scope: ref, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className={s.trace} aria-hidden="true">
      <div className={`wrap ${s.inner}`}>
        <span className={s.rail} />
        <span className={s.fill} data-fill="" />
        <span className={s.head} data-head="" />
      </div>
    </div>
  );
}
