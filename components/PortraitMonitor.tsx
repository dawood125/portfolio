"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { preload } from "react-dom";
import { useMotionTier } from "@/lib/motion";
import { profile } from "@/lib/content";
import s from "./PortraitMonitor.module.css";

const POSTER = "/media/portrait-poster.webp";
const RAMP = " .,:;-=+*#%@"; // dark → light
const CELL_W = 7;
const CELL_H = 11;
const LENS_R = 92;

type Cue = { start: number; end: number; text: string };

function parseVtt(src: string): Cue[] {
  const toS = (t: string) => {
    const [h, m, sec] = t.split(":");
    return Number(h) * 3600 + Number(m) * 60 + Number(sec);
  };
  return src
    .split(/\r?\n\r?\n/)
    .map((block) => {
      const lines = block.trim().split(/\r?\n/);
      const i = lines.findIndex((l) => l.includes("-->"));
      if (i < 0) return null;
      const [a, b] = lines[i].split("-->").map((x) => x.trim());
      return { start: toS(a), end: toS(b), text: lines.slice(i + 1).join(" ") };
    })
    .filter((c): c is Cue => !!c);
}

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

/**
 * Silent, AI-animated loop of a photo of Dawood (disclosed in the caption).
 * - Poster paints first (LCP); playback starts after hydration, never on the reduced tier.
 * - X-ray lens (full tier, fine pointer): the portrait re-rendered live as characters — the glass box, literally.
 * - Intro: Dawood's cloned voice with synced captions, played over the living portrait.
 */
export default function PortraitMonitor({ className }: { className?: string }) {
  preload(POSTER, { as: "image", fetchPriority: "high" });

  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const sampler = useRef<HTMLCanvasElement | null>(null);
  const tier = useMotionTier();

  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [intro, setIntro] = useState<{ on: boolean; t: number; cue: string }>({ on: false, t: 0, cue: "" });
  const cues = useRef<Cue[] | null>(null);

  // Loop playback: pause offscreen, never on reduced tier.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (tier === "reduced" || userPaused) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [tier, userPaused]);

  /* ---------- X-ray lens ---------- */
  const lens = useRef({ x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0, raf: 0, font: "" });

  const draw = useCallback(() => {
    const L = lens.current;
    const c = canvas.current;
    const v = video.current;
    const f = frame.current;
    if (!c || !v || !f) return;
    const ctx = c.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    L.x += (L.tx - L.x) * 0.2;
    L.y += (L.ty - L.y) * 0.2;
    L.r += (L.tr - L.r) * 0.16;

    const w = f.clientWidth;
    const h = f.clientHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (c.width !== Math.round(w * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (L.r > 0.5 && v.readyState >= 2) {
      const cols = Math.ceil(w / CELL_W);
      const rows = Math.ceil(h / CELL_H);
      const sample = (sampler.current ??= document.createElement("canvas"));
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true })!;
      // object-fit: cover mapping of the 720×900 video into the frame
      const vw = v.videoWidth || 720;
      const vh = v.videoHeight || 900;
      const scale = Math.max(w / vw, h / vh);
      const sw = w / scale;
      const sh = h / scale;
      sctx.drawImage(v, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, cols, rows);
      const px = sctx.getImageData(0, 0, cols, rows).data;

      ctx.save();
      ctx.beginPath();
      ctx.arc(L.x, L.y, L.r, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "rgba(17,18,20,0.94)";
      ctx.fillRect(L.x - L.r, L.y - L.r, L.r * 2, L.r * 2);
      ctx.font = L.font;
      ctx.textBaseline = "top";
      const c0 = Math.max(0, Math.floor((L.x - L.r) / CELL_W));
      const c1 = Math.min(cols - 1, Math.ceil((L.x + L.r) / CELL_W));
      const r0 = Math.max(0, Math.floor((L.y - L.r) / CELL_H));
      const r1 = Math.min(rows - 1, Math.ceil((L.y + L.r) / CELL_H));
      for (let ry = r0; ry <= r1; ry++) {
        for (let cx = c0; cx <= c1; cx++) {
          const i = (ry * cols + cx) * 4;
          const lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(Math.pow(lum, 0.8) * RAMP.length))];
          if (ch === " ") continue;
          ctx.fillStyle = lum > 0.62 ? "#EDECE8" : lum > 0.3 ? "#8C9BFF" : "#4A55A8";
          ctx.fillText(ch, cx * CELL_W, ry * CELL_H);
        }
      }
      ctx.restore();
      ctx.beginPath();
      ctx.arc(L.x, L.y, L.r, 0, Math.PI * 2);
      ctx.strokeStyle = "#8C9BFF";
      ctx.lineWidth = 1;
      ctx.stroke();
      if (L.r > 60) {
        ctx.font = L.font;
        ctx.fillStyle = "#8C9BFF";
        ctx.fillText("x-ray", L.x + L.r * 0.72, L.y - L.r * 0.86);
      }
    }

    if (L.tr > 0 || L.r > 0.5) L.raf = requestAnimationFrame(draw);
    else {
      L.raf = 0;
      ctx.clearRect(0, 0, w, h);
    }
  }, []);

  const lensEnabled = tier === "full";

  function onEnter(e: PointerEvent<HTMLDivElement>) {
    if (!lensEnabled || e.pointerType !== "mouse") return;
    const rect = frame.current!.getBoundingClientRect();
    const L = lens.current;
    L.x = L.tx = e.clientX - rect.left;
    L.y = L.ty = e.clientY - rect.top;
    L.tr = LENS_R;
    if (!L.font) {
      const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim();
      L.font = `500 11px ${mono || "monospace"}, monospace`;
    }
    if (!L.raf) L.raf = requestAnimationFrame(draw);
  }
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!lensEnabled || e.pointerType !== "mouse") return;
    const rect = frame.current!.getBoundingClientRect();
    lens.current.tx = e.clientX - rect.left;
    lens.current.ty = e.clientY - rect.top;
  }
  function onLeave() {
    lens.current.tr = 0;
  }
  useEffect(() => () => cancelAnimationFrame(lens.current.raf), []);

  /* ---------- Intro (cloned-voice) ---------- */
  async function toggleIntro() {
    const a = audio.current;
    if (!a) return;
    if (intro.on) {
      a.pause();
      a.currentTime = 0;
      setIntro({ on: false, t: 0, cue: "" });
      return;
    }
    if (!cues.current) {
      try {
        cues.current = parseVtt(await (await fetch(profile.intro.captions)).text());
      } catch {
        cues.current = [];
      }
    }
    setIntro({ on: true, t: 0, cue: "" });
    a.currentTime = 0;
    a.play().catch(() => setIntro({ on: false, t: 0, cue: "" }));
    if (tier !== "reduced") {
      setUserPaused(false);
      video.current?.play().catch(() => {});
    }
  }
  function onTime() {
    const a = audio.current;
    if (!a) return;
    const t = a.currentTime;
    const cue = cues.current?.find((c) => t >= c.start && t <= c.end + 0.15)?.text ?? "";
    setIntro((prev) => (prev.on ? { on: true, t, cue } : prev));
  }

  const progress = intro.on ? Math.min(1, intro.t / profile.intro.seconds) : 0;

  return (
    <figure className={`${s.monitor} ${className ?? ""}`} data-portrait="">
      <div
        ref={frame}
        className={s.frame}
        data-portrait-frame=""
        data-lens={lensEnabled}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <video
          ref={video}
          className={s.video}
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          width={720}
          height={900}
          aria-label="Black-and-white portrait of Dawood Ahmed, breathing and blinking"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/portrait-loop.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
          <source src="/media/portrait-loop.h264.mp4" type="video/mp4" />
        </video>
        <canvas ref={canvas} className={s.lens} aria-hidden="true" />

        {intro.on && (
          <div className={s.captions} aria-live="off">
            <p>{intro.cue}</p>
          </div>
        )}
        <span className={s.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

        <span className={s.corner} data-c="tl" aria-hidden="true" />
        <span className={s.corner} data-c="tr" aria-hidden="true" />
        <span className={s.corner} data-c="bl" aria-hidden="true" />
        <span className={s.corner} data-c="br" aria-hidden="true" />
      </div>

      <audio
        ref={audio}
        src={profile.intro.audio}
        preload="none"
        onTimeUpdate={onTime}
        onEnded={() => setIntro({ on: false, t: 0, cue: "" })}
      >
        <track kind="captions" src={profile.intro.captions} srcLang="en" label="English" />
      </audio>

      <figcaption className={`mono ${s.caption}`}>
        <span className={s.label}>
          {intro.on
            ? `AI voice-over · my cloned voice · ${mmss(intro.t)}/${mmss(profile.intro.seconds)}`
            : lensEnabled
              ? "AI-animated portrait · hover to x-ray"
              : "AI-animated from a photo"}
        </span>
        <span className={s.buttons}>
          <button type="button" className={s.btn} data-primary="" onClick={toggleIntro} aria-pressed={intro.on}>
            {intro.on ? "Stop intro" : `▶ Intro ${mmss(profile.intro.seconds)}`}
          </button>
          {tier !== "reduced" && (
            <button
              type="button"
              className={s.btn}
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              aria-label={playing ? "Pause portrait animation" : "Play portrait animation"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
