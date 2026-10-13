"use client";

import { useRef, useState } from "react";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import { codeProjects, matrix, work, type SkillGroup } from "@/lib/content";
import StreamHeading from "./StreamHeading";
import s from "./StackMatrix.module.css";


const GROUPS: ("All" | SkillGroup)[] = ["All", "Frontend", "Backend", "Data", "AI", "Ship", "Commerce"];

const projectHref = (slug: string) => {
  if (work.some((x) => x.slug === slug)) return `/work/${slug}`;
  const p = codeProjects.find((x) => x.slug === slug);
  return p && "url" in p && p.url ? p.url : "#work";
};
const projectName = (slug: string) =>
  work.find((x) => x.slug === slug)?.name ?? codeProjects.find((x) => x.slug === slug)?.name ?? slug;

/** Every dot is a project's own stack entry (lib/content). Filter by area; hover to cross-highlight. */
export default function StackMatrix() {
  const root = useRef<HTMLElement>(null);
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  const [hover, setHover] = useState<{ row?: number; col?: string }>({});
  const flipState = useRef<Flip.FlipState | null>(null);
  const tier = useMotionTier();

  // First reveal: dots pop in on a diagonal wave.
  useGSAP(
    () => {
      if (tier === "reduced") return;
      const dots = root.current?.querySelectorAll("[data-dot]");
      if (!dots?.length) return;
      // fromTo, not from: explicit end values can't be corrupted when ScrollTrigger re-measures the page.
      gsap.fromTo(
        dots,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: { amount: 0.8, grid: "auto", from: "start" },
          scrollTrigger: { trigger: root.current?.querySelector("[data-grid]"), start: "top 78%", once: true },
        }
      );
    },
    { scope: root, dependencies: [tier], revertOnUpdate: true }
  );

  // Filtering: rows that leave collapse, the rest glide into place (Flip).
  useGSAP(
    () => {
      if (!flipState.current) return;
      if (tier === "reduced") {
        flipState.current = null;
        return;
      }
      Flip.from(flipState.current, {
        targets: root.current?.querySelectorAll("[data-row]"),
        duration: 0.55,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, delay: 0.1 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.25 }),
      });
      flipState.current = null;
    },
    { scope: root, dependencies: [group] }
  );

  function pick(g: (typeof GROUPS)[number]) {
    if (g === group) return;
    flipState.current = Flip.getState(root.current!.querySelectorAll("[data-row]"));
    setGroup(g);
  }

  const rows = matrix.skills.map((sk, i) => ({ ...sk, i })).filter((sk) => group === "All" || sk.group === group);
  const lit = (slug: string) =>
    hover.col === slug || (hover.row != null && matrix.skills[hover.row].in.includes(slug));

  return (
    <section ref={root} id="stack" className={s.section} aria-labelledby="stack-title">
      <div className={`wrap ${s.head}`}>
        <span className={s.node} data-trace-node="" aria-hidden="true" />
        <StreamHeading id="stack-title" className={s.title}>
          What I reach for.
        </StreamHeading>
        <p className={s.intro}>
          No skill bars, no percentages. Each dot is a project where I used that tool — open one to check.
        </p>
      </div>

      <div className="wrap">
        <div className={s.filters} role="group" aria-label="Filter skills by area">
          {GROUPS.map((g) => (
            <button key={g} type="button" className={s.chip} aria-pressed={g === group} onClick={() => pick(g)}>
              {g}
            </button>
          ))}
        </div>

        <div className={s.grid} data-grid="" role="table" aria-label="Skills by project" onMouseLeave={() => setHover({})}>
          <div className={s.headRow} role="row">
            <span className={s.corner} role="columnheader">
              <span className="sr-only">Skill</span>
            </span>
            {matrix.projects.map((p) => (
              <a
                key={p.slug}
                role="columnheader"
                href={projectHref(p.slug)}
                className={`mono ${s.colHead}`}
                data-lit={lit(p.slug)}
                onMouseEnter={() => setHover({ col: p.slug })}
                title={projectName(p.slug)}
                {...(projectHref(p.slug).startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
              >
                <span>{p.short}</span>
              </a>
            ))}
          </div>

          {rows.map((sk) => (
            <div
              key={sk.name}
              role="row"
              className={s.row}
              data-row=""
              data-flip-id={sk.name}
              data-lit={hover.row === sk.i}
              onMouseEnter={() => setHover({ row: sk.i })}
            >
              <span role="rowheader" className={s.skill}>
                {sk.name}
                <span className={`mono ${s.group}`}>{sk.group}</span>
              </span>
              {matrix.projects.map((p) => {
                const on = sk.in.includes(p.slug);
                return (
                  <span key={p.slug} role="cell" className={s.cell} data-col-lit={hover.col === p.slug}>
                    {on ? (
                      <span className={s.dot} data-dot="" title={`${sk.name} — ${projectName(p.slug)}`}>
                        <span className="sr-only">
                          {sk.name} used in {projectName(p.slug)}
                        </span>
                      </span>
                    ) : (
                      <span className={s.empty} aria-hidden="true" />
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Narrow screens: the same facts as a list */}
        <ul className={s.list}>
          {rows.map((sk) => (
            <li key={sk.name}>
              <strong>{sk.name}</strong>
              <span>{sk.in.map((slug) => matrix.projects.find((p) => p.slug === slug)?.short).join(" · ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
