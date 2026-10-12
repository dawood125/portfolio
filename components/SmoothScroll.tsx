"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";

/** Smooth wheel scrolling on the full tier only. Touch and reduced tiers keep native scroll. */
export default function SmoothScroll() {
  const tier = useMotionTier();

  useEffect(() => {
    if (tier !== "full") return;
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      autoRaf: false,
      prevent: (node) => node.closest?.("[data-lenis-prevent]") != null,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [tier]);

  return null;
}
