"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * The header and footer persist across client navigations, so their scroll-linked animations were measured
 * on the previous page. Re-measure every trigger once the new page has painted.
 */
export default function RouteEffects() {
  const pathname = usePathname();
  useEffect(() => {
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 700); // after images/fonts settle
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
