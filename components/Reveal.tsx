"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";

/**
 * Scroll reveals for server-rendered pages: every [data-reveal] inside rises in once, in small staggered groups.
 * Content is fully visible in the HTML; reduced tier never hides it.
 */
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || tier === "reduced") return;
      const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-reveal]"));
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: tier === "full" ? 28 : 14, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: tier === "full" ? 0.8 : 0.5,
            ease: "power3.out",
            delay: Number(item.dataset.reveal || 0) * 0.08,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: root, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
