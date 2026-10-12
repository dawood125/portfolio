"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import { aiwa } from "@/lib/content";
import StreamHeading from "./StreamHeading";
import s from "./AiwaMap.module.css";

type Edge = { from: string; to: string };
const EDGES: Edge[] = [
  { from: "pos", to: "api" },
  { from: "purchasing", to: "api" },
  { from: "api", to: "dashboard" },
  { from: "api", to: "db" },
  { from: "db", to: "events" },
  { from: "events", to: "dashboard" },
];

const LANES = [
  { id: "interface", label: "Interface" },
  { id: "core", label: "Core" },
  { id: "data", label: "Data" },
] as const;

/** S-curve between two node boxes, horizontal or vertical depending on layout. */
function curve(a: DOMRect, b: DOMRect, origin: DOMRect) {
  const ax = a.left + a.width / 2 - origin.left;
  const ay = a.top + a.height / 2 - origin.top;
  const bx = b.left + b.width / 2 - origin.left;
  const by = b.top + b.height / 2 - origin.top;
  if (Math.abs(bx - ax) > Math.abs(by - ay)) {
    const sx = ax + (bx > ax ? a.width / 2 : -a.width / 2);
    const ex = bx + (bx > ax ? -b.width / 2 : b.width / 2);
    const mx = (sx + ex) / 2;
    return `M${sx},${ay} C${mx},${ay} ${mx},${by} ${ex},${by}`;
  }
  const sy = ay + (by > ay ? a.height / 2 : -a.height / 2);
  const ey = by + (by > ay ? -b.height / 2 : b.height / 2);
  const my = (sy + ey) / 2;
  return `M${ax},${sy} C${ax},${my} ${bx},${my} ${bx},${ey}`;
}

export default function AiwaMap() {
  const root = useRef<HTMLElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState("api");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const replay = useRef<() => void>(() => {});
  const tier = useMotionTier();

  // Measure node boxes → connector paths. Re-measure on resize.
  const measure = useCallback(() => {
    const m = map.current;
    if (!m) return;
    const o = m.getBoundingClientRect();
    const box = (id: string) => m.querySelector(`[data-node="${id}"]`)!.getBoundingClientRect();
    const next: Record<string, string> = {};
    for (const e of EDGES) next[`${e.from}-${e.to}`] = curve(box(e.from), box(e.to), o);
    setPaths(next);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (map.current) ro.observe(map.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // Edges draw in; then one sale is traced through the system, step by step.
  useGSAP(
    () => {
      const el = root.current;
      if (!el || !Object.keys(paths).length) return;
      const edges = el.querySelectorAll<SVGPathElement>("[data-edge]");
      const packet = el.querySelector<SVGCircleElement>("[data-packet]");
      const nodes = el.querySelectorAll("[data-node]");

      if (tier === "reduced") {
        gsap.set(edges, { strokeDashoffset: 0 });
        gsap.set(packet, { autoAlpha: 0 });
        replay.current = () => {};
        return;
      }

      gsap.set(edges, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(nodes, { y: 16, autoAlpha: 0 });

      const route = aiwa.flow.map((f, i) => (i === 0 ? null : `${aiwa.flow[i - 1].node}-${f.node}`));
      const trace = () => {
        const tl = gsap.timeline({ onStart: () => setPlaying(true), onComplete: () => setPlaying(false) });
        tl.set(packet, { autoAlpha: 0 });
        aiwa.flow.forEach((f, i) => {
          tl.call(() => setStep(i));
          const key = route[i];
          const path = key ? el.querySelector<SVGPathElement>(`[data-edge="${key}"]`) : null;
          if (path) {
            const len = path.getTotalLength();
            const o = { t: 0 };
            tl.set(packet, { autoAlpha: 1 }).to(o, {
              t: 1,
              duration: 0.9,
              ease: "power2.inOut",
              onUpdate: () => {
                const p = path.getPointAtLength(o.t * len);
                packet?.setAttribute("cx", String(p.x));
                packet?.setAttribute("cy", String(p.y));
              },
            });
          }
          tl.to({}, { duration: 1.1 });
        });
        tl.to(packet, { autoAlpha: 0, duration: 0.3 });
        return tl;
      };

      let current: gsap.core.Timeline | null = null;
      replay.current = () => {
        current?.kill();
        current = trace();
      };

      // Pre-place the packet at the first node.
      const first = el.querySelector<HTMLElement>(`[data-node="${aiwa.flow[0].node}"]`);
      if (first && map.current && packet) {
        const o = map.current.getBoundingClientRect();
        const b = first.getBoundingClientRect();
        packet.setAttribute("cx", String(b.left + b.width / 2 - o.left));
        packet.setAttribute("cy", String(b.top + b.height / 2 - o.top));
      }

      gsap
        .timeline({ scrollTrigger: { trigger: map.current, start: "top 72%", once: true } })
        .to(nodes, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07 })
        .to(edges, { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: "power2.inOut" }, 0.25)
        .add(() => replay.current(), "+=0.2");

      return () => current?.kill();
    },
    { scope: root, dependencies: [paths, tier], revertOnUpdate: true }
  );

  // Keep layout-dependent ScrollTriggers honest after paths settle.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [paths]);

  const activeNode = step >= 0 ? aiwa.flow[step].node : null;
  const sel = aiwa.nodes.find((n) => n.id === selected)!;
  const activeEdge = step > 0 ? `${aiwa.flow[step - 1].node}-${aiwa.flow[step].node}` : null;

  return (
    <section ref={root} id="inside" className={s.section} aria-labelledby="inside-title">
      <div className={`wrap ${s.head}`}>
        <p className={`mono ${s.kicker}`}>inside · AIWA Flow</p>
        <StreamHeading id="inside-title" className={s.title}>
          Inside the box.
        </StreamHeading>
        <p className={s.intro}>
          AIWA Flow is my own inventory product — Ibrahim Business Manager runs on it. Here is one sale, traced through
          it. Pick any part to see what it does.
        </p>
      </div>

      <div className={`wrap ${s.body}`}>
        <div ref={map} className={s.map}>
          <svg className={s.wires} aria-hidden="true">
            {EDGES.map((e) => {
              const key = `${e.from}-${e.to}`;
              return paths[key] ? (
                <path key={key} data-edge={key} d={paths[key]} pathLength={1} className={s.edge} data-hot={activeEdge === key} />
              ) : null;
            })}
            <circle data-packet="" r={6} className={s.packet} />
          </svg>

          {LANES.map((lane) => (
            <div key={lane.id} className={s.lane} data-lane={lane.id}>
              <p className={`mono ${s.laneLabel}`}>{lane.label}</p>
              {aiwa.nodes
                .filter((n) => n.lane === lane.id)
                .map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    data-node={n.id}
                    className={s.node}
                    data-active={activeNode === n.id}
                    aria-pressed={selected === n.id}
                    onClick={() => setSelected(n.id)}
                  >
                    <span className={s.nodeLabel}>{n.label}</span>
                    <span className={`mono ${s.nodeTech}`}>{n.tech}</span>
                  </button>
                ))}
            </div>
          ))}
        </div>

        <aside className={s.side}>
          <ol className={s.steps} aria-label="One sale, traced">
            {aiwa.flow.map((f, i) => (
              <li key={i} data-state={i < step ? "done" : i === step ? "now" : "next"}>
                <span className="mono">{i + 1}</span>
                {f.text}
              </li>
            ))}
          </ol>
          <button type="button" className={s.replay} onClick={() => replay.current()} disabled={playing || tier === "reduced"}>
            {playing ? "Tracing…" : "↻ Trace a sale again"}
          </button>
          <div className={s.detail} aria-live="polite">
            <p className={`mono ${s.detailTech}`}>{sel.tech}</p>
            <h3>{sel.label}</h3>
            <p>{sel.does}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
