"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import { profile } from "@/lib/content";
import LiveClock from "./LiveClock";
import UrduMark from "./UrduMark";
import s from "./SiteFooter.module.css";

export type BuildInfo = { commit: string | null; builtAt: string };

const WHATSAPP = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

/** The end of the trace: one clear ask, every channel, and the pipeline that built this page. */
export default function SiteFooter({ build }: { build: BuildInfo }) {
  const root = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      const el = root.current;
      const h = el?.querySelector<HTMLElement>("[data-cta]");
      if (!el || !h || tier === "reduced") return;
      const split = SplitText.create(h, { type: tier === "full" ? "lines,chars" : "lines", mask: "lines", linesClass: "split-line", aria: "auto" });
      const parts = tier === "full" ? split.chars : split.lines;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", once: true }, onComplete: () => split.revert() });
      tl.fromTo(parts, { yPercent: 120 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: tier === "full" ? 0.018 : 0.08 })
        .fromTo(el.querySelectorAll("[data-rise]"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, 0.35)
        .fromTo(el.querySelector("[data-urdu]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }, 0.2);
      return () => split.revert();
    },
    { scope: root, dependencies: [tier], revertOnUpdate: true }
  );

  const built = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Karachi" }).format(
    new Date(build.builtAt)
  );

  return (
    <footer ref={root} className={s.footer} id="contact" aria-labelledby="contact-title">
      <div className={`wrap ${s.grid}`}>
        <p className={`mono ${s.kicker}`} data-rise="">
          end of trace · 200 OK
        </p>
        <h2 id="contact-title" className={s.cta} data-cta="">
          Send me the messy spreadsheet.
        </h2>
        <p className={s.sub} data-rise="">
          Hiring for a full-time role, remote or on-site — or running a business on something that should run itself?
          Tell me what&apos;s slow, manual or breaking.
        </p>

        <a className={s.mail} href={`mailto:${profile.email}?subject=Hello%20Dawood`} data-rise="">
          {profile.email}
          <span aria-hidden="true">↗</span>
        </a>

        <ul className={s.channels} data-rise="">
          <li>
            <a href={WHATSAPP} target="_blank" rel="noopener">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.cv} target="_blank" rel="noopener">
              CV (PDF)
            </a>
          </li>
        </ul>

        <div className={s.place} data-rise="">
          <LiveClock className="mono" />
          <p className="mono">{profile.availability}</p>
        </div>

        <figure className={s.urdu} data-urdu="">
          <UrduMark title="داؤد احمد — Dawood Ahmed, written in Urdu" />
          <figcaption className="mono">داؤد احمد · Dawood Ahmed, in Urdu</figcaption>
        </figure>
      </div>

      <div className={`wrap ${s.strip}`}>
        <p className="mono">© {new Date(build.builtAt).getFullYear()} Dawood Ahmed</p>
        <p className="mono">
          {build.commit ? `built from commit ${build.commit.slice(0, 7)}` : "built locally"} · {built} · Next.js 16 · GSAP ·
          live status re-checked every 5 min
        </p>
      </div>
    </footer>
  );
}
