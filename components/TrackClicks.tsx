"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * One delegated listener: any link or button with data-track="name" sends a Vercel Analytics event,
 * and every CV / email / WhatsApp link is tracked automatically. No personal data is sent.
 */
export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      const name =
        el.dataset.track ??
        (href.endsWith(".pdf") ? "cv_download" : href.startsWith("mailto:") ? "email_click" : href.includes("wa.me/") ? "whatsapp_click" : null);
      if (!name) return;
      track(name, { path: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
