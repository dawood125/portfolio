"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import { seasons } from "@/lib/content";
import StreamHeading from "./StreamHeading";
import s from "./Seasons.module.css";

const toMonths = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/** The career as a request trace: one span per role, drawn left to right as you scroll. */
export default function Seasons({ now }: { now: string }) {
  const root = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  const start = toMonths(seasons.from);
  const end = toMonths(seasons.to);
  const span = end - start;
  const pct = (ym: string) => ((toMonths(ym) - start) / span) * 100;
  const nowPct = pct(now);
  const years = Array.from({ length: Number(seasons.to.slice(0, 4)) - Number(seasons.from.slice(0, 4)) + 1 }, (_, i) =>
    String(Number(seasons.from.slice(0, 4)) + i)
  ).filter((y) => toMonths(`${y}-01`) >= start);

  useGSAP(
    () => {
      if (tier === "reduced") return;
      const bars = root.current?.querySelectorAll("[data-bar]");
      const labels = root.current?.querySelectorAll("[data-label]");
      const chart = root.current?.querySelector("[data-chart]");
      if (!bars?.length) return;
      gsap
        .timeline({
          scrollTrigger:
            tier === "full"
              ? { trigger: chart, start: "top 75%", end: "bottom 55%", scrub: 0.6 }
              : { trigger: chart, start: "top 75%", once: true },
        })
        .fromTo(labels!, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.12 }, 0)
        .fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" }, 0.05)
        .fromTo(root.current!.querySelectorAll("[data-now], [data-mark]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, ">-0.2");
    },
    { scope: root, dependencies: [tier], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="seasons" className={s.section} aria-labelledby="seasons-title">
      <div className={`wrap ${s.head}`}>
        <span className={s.node} data-trace-node="" aria-hidden="true" />
        <StreamHeading id="seasons-title" className={s.title}>
          The trace so far.
        </StreamHeading>
        <p className={s.intro}>My career drawn the way I read a request: one span per role, all running toward now.</p>
      </div>

      <div className="wrap">
        <div className={s.chart} data-chart="">
          <div className={s.axis} aria-hidden="true">
            {years.map((y) => (
              <span key={y} className={`mono ${s.year}`} style={{ left: `${pct(`${y}-01`)}%` }}>
                {y}
              </span>
            ))}
          </div>

          <ol className={s.rows}>
            {seasons.rows.map((r, i) => {
              const left = pct(r.start);
              const right = r.end ? pct(r.end) : nowPct;
              return (
                <li key={i} className={s.row}>
                  <span className={s.label} data-label="">
                    <strong>{r.label}</strong>
                    <span className="mono">
                      {r.org} · {r.start.slice(0, 4)}
                      {r.approx ? "" : `-${r.start.slice(5)}`} → {r.end ? `${r.end.slice(0, 4)}${r.approx ? "" : `-${r.end.slice(5)}`}` : "now"}
                    </span>
                  </span>
                  <span className={s.track}>
                    {years.map((y) => (
                      <span key={y} className={s.grid} style={{ left: `${pct(`${y}-01`)}%` }} aria-hidden="true" />
                    ))}
                    <span
                      className={s.bar}
                      data-bar=""
                      data-kind={r.kind}
                      data-open={!r.end}
                      data-approx={!!r.approx}
                      style={{ left: `${left}%`, width: `${Math.max(0.8, right - left)}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ol>

          <div className={s.overlay}>
            <span className={s.now} data-now="" style={{ left: `${nowPct}%` }} aria-hidden="true">
              <span className="mono">now</span>
            </span>
            {seasons.marks.map((m) => (
              <span key={m.at} className={s.mark} data-mark="" style={{ left: `${pct(m.at)}%` }}>
                <span className="mono">{m.label}</span>
              </span>
            ))}
          </div>
        </div>

        <aside className={s.note}>
          <p className="mono">also in 2026</p>
          <ul>
            {seasons.year2026.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
