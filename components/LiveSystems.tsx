"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import { liveSystems } from "@/lib/content";
import type { StatusReport } from "@/lib/status";
import StreamHeading from "./StreamHeading";
import s from "./LiveSystems.module.css";

function pktTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }).format(new Date(iso));
}

export default function LiveSystems({ status }: { status: StatusReport }) {
  const [active, setActive] = useState(liveSystems[0].slug);
  const [inspect, setInspect] = useState(false);
  const root = useRef<HTMLElement>(null);
  const prev = useRef(active);
  const tier = useMotionTier();

  // Only the active screen plays; the rest stay paused (and unloaded until first shown).
  useEffect(() => {
    root.current?.querySelectorAll<HTMLVideoElement>("[data-layer] video").forEach((v) => {
      const isActive = v.closest<HTMLElement>("[data-layer]")?.dataset.layer === active;
      if (isActive && tier !== "reduced") v.play().catch(() => {});
      else v.pause();
    });
  }, [active, tier]);

  // Monitor swap: the incoming screen wipes across the outgoing one.
  useGSAP(
    () => {
      if (prev.current === active) return;
      const layer = root.current?.querySelector<HTMLElement>(`[data-layer="${active}"]`);
      const outgoing = root.current?.querySelector<HTMLElement>(`[data-layer="${prev.current}"]`);
      prev.current = active;
      if (!layer) return;
      root.current?.querySelectorAll<HTMLElement>("[data-layer]").forEach((l) => (l.style.zIndex = "0"));
      if (outgoing) outgoing.style.zIndex = "1";
      layer.style.zIndex = "2";
      if (tier === "reduced") {
        gsap.set(layer, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }
      gsap.fromTo(layer, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "aperture" });
      gsap.fromTo(layer.querySelector("[data-media]"), { scale: 1.06 }, { scale: 1, duration: 0.9, ease: "power3.out" });
    },
    { scope: root, dependencies: [active, tier] }
  );

  // Inspect: an x-ray scan reveals the system's layers over its own screen.
  useGSAP(
    () => {
      const x = root.current?.querySelector<HTMLElement>("[data-xray]");
      if (!x) return;
      const rows = x.querySelectorAll("[data-xray-row]");
      const links = x.querySelectorAll("[data-xray-link]");
      const scan = x.querySelector("[data-xray-scan]");
      if (tier === "reduced") {
        gsap.set(x, { clipPath: inspect ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", visibility: inspect ? "visible" : "hidden" });
        gsap.set(rows, { autoAlpha: 1, y: 0 });
        return;
      }
      if (inspect) {
        gsap
          .timeline()
          .set(x, { visibility: "visible" })
          .fromTo(x, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "aperture" }, 0)
          .fromTo(scan, { y: 0, autoAlpha: 1 }, { y: () => x.offsetHeight, duration: 0.7, ease: "aperture" }, 0)
          .to(scan, { autoAlpha: 0, duration: 0.2 }, 0.7)
          .fromTo(rows, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.09 }, 0.25)
          .fromTo(links, { scaleY: 0 }, { scaleY: 1, duration: 0.35, stagger: 0.09, ease: "power2.out" }, 0.45);
      } else {
        gsap
          .timeline()
          .to(x, { clipPath: "inset(100% 0% 0% 0%)", duration: 0.45, ease: "aperture" })
          .set(x, { visibility: "hidden", clipPath: "inset(0% 0% 100% 0%)" })
          .set(scan, { y: 0 });
      }
    },
    { scope: root, dependencies: [inspect, tier] }
  );

  // When the active system changes under an open x-ray, re-stream its layers.
  useGSAP(
    () => {
      if (!inspect || tier === "reduced") return;
      const rows = root.current?.querySelectorAll("[data-xray-row]");
      if (rows) gsap.fromTo(rows, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 });
    },
    { scope: root, dependencies: [active] }
  );

  const current = liveSystems.find((x) => x.slug === active)!;
  const st = status.systems[active];

  return (
    <section ref={root} id="work" className={s.section} aria-labelledby="work-title">
      <div className={`wrap ${s.head}`}>
        <span className={s.node} data-trace-node="" aria-hidden="true" />
        <StreamHeading id="work-title" className={s.title}>
          Running right now.
        </StreamHeading>
        <div className={s.intro}>
          <p>
            Four client systems I built and delivered in 2026 that people use every day. The status next to each one is
            measured by this site&apos;s server, not typed in.
          </p>
          <p className={`mono ${s.checked}`}>checked {pktTime(status.checkedAt)} PKT · re-checked every 5 min</p>
        </div>
      </div>

      <div className={`wrap ${s.board}`}>
        <ol className={s.list}>
          {liveSystems.map((sys) => {
            const r = status.systems[sys.slug];
            return (
              <li key={sys.slug} id={`system-${sys.slug}`} className={s.item} data-active={sys.slug === active}>
                <a
                  className={s.row}
                  href={sys.url}
                  target="_blank"
                  rel="noopener"
                  onMouseEnter={() => setActive(sys.slug)}
                  onFocus={() => setActive(sys.slug)}
                >
                  <span className={s.thumb}>
                    <Image src={sys.image} alt="" fill sizes="(max-width: 900px) 92vw, 1px" />
                  </span>
                  <span className={s.name}>
                    {sys.name}
                    <span className={s.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </span>
                  <span className={s.kind}>
                    {sys.kind} · {sys.client}
                  </span>
                  <span className={`mono ${s.stack}`}>{sys.stack.join(" · ")}</span>
                  <span className={`mono ${s.status}`} data-ok={r?.ok}>
                    {r?.ok ? (
                      <>
                        <span className={s.dot} aria-hidden="true" />
                        up · HTTP {r.code} · {r.ms} ms
                      </>
                    ) : (
                      <>no answer within 10 s at last check</>
                    )}
                  </span>
                  <span className="sr-only"> (opens {sys.host} in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ol>

        <div className={s.monitorCol}>
          <figure className={s.monitor}>
            <div className={s.screen}>
              {liveSystems.map((sys, i) => (
                <div
                  key={sys.slug}
                  className={s.layer}
                  data-layer={sys.slug}
                  style={{ zIndex: sys.slug === liveSystems[0].slug ? 2 : 0 }}
                >
                  <div className={s.media} data-media="" data-pan={!sys.video}>
                    {sys.video ? (
                      <video muted loop playsInline preload="none" poster={sys.image} aria-label={`${sys.name} — scrolling screen recording`}>
                        <source src={sys.video.av1} type='video/mp4; codecs="av01.0.05M.08"' />
                        <source src={sys.video.h264} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={sys.image}
                        alt={`${sys.name} — ${sys.imageNote ?? "home page"}`}
                        fill
                        sizes="(max-width: 900px) 1px, 52vw"
                        priority={i === 0}
                      />
                    )}
                  </div>
                </div>
              ))}

              <div className={s.xray} data-xray="" aria-hidden={!inspect}>
                <span className={s.scan} data-xray-scan="" />
                <p className={`mono ${s.xrayTitle}`}>
                  {current.name} <span>· inside</span>
                </p>
                <ol className={s.layers}>
                  {current.arch.map((l, i) => (
                    <li key={`${current.slug}-${l.layer}`} data-xray-row="">
                      {i > 0 && <span className={s.link} data-xray-link="" aria-hidden="true" />}
                      <span className={`mono ${s.layerName}`}>{l.layer}</span>
                      <strong className={s.layerTech}>{l.tech}</strong>
                      <span className={s.layerDoes}>{l.does}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <figcaption className={`mono ${s.caption}`}>
              <span>https://{current.host}</span>
              <span className={s.captionRight}>
                <span>
                  {st?.ok ? `HTTP ${st.code} in ${st.ms} ms` : "no response"}
                  {current.imageNote ? ` · ${current.imageNote.toLowerCase()}` : current.video ? " · screen recording" : ""}
                </span>
                <button
                  type="button"
                  className={s.inspect}
                  aria-pressed={inspect}
                  onClick={() => setInspect((v) => !v)}
                >
                  {inspect ? "Close x-ray" : "Inspect"}
                </button>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
