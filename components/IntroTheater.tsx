"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type KeyboardEvent, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion";
import { profile } from "@/lib/content";
import type { IntroVideo } from "@/lib/intro-media";
import s from "./IntroTheater.module.css";

type Word = { w: string; s: number; e: number };

type Props = {
  video: IntroVideo | null;
  /** The hero portrait frame the theater lifts out of (and returns to). */
  origin: HTMLElement | null;
  /** The silent B&W loop playing in the hero; its current frame is the first thing you see. */
  loop: HTMLVideoElement | null;
  onClosed: () => void;
};

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
const BARS = 18;

/**
 * Intro theater. The portrait frame lifts out of the hero (FLIP), the B&W still becomes the talking colour avatar,
 * a transcript lights up word by word, and a live meter shows the voice. Esc / backdrop / ✕ reverse it home.
 */
export default function IntroTheater({ video, origin, loop, onClosed }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const snap = useRef<HTMLCanvasElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const audioGraph = useRef<{ ctx: AudioContext; analyser: AnalyserNode } | null>(null);
  const closing = useRef(false);
  const afterClose = useRef<string | null>(null);
  const tier = useMotionTier();

  const [mounted, setMounted] = useState(false);
  const [words, setWords] = useState<Word[][]>([]);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState<number>(profile.intro.seconds);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    fetch(profile.intro.words)
      .then((r) => r.json())
      .then(setWords)
      .catch(() => setWords([]));
  }, []);

  // Freeze the hero loop's current frame onto the canvas: the theater opens on exactly what you were looking at.
  const paintSnapshot = useCallback(() => {
    const c = snap.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    c.width = 720;
    c.height = 900;
    if (loop && loop.readyState >= 2) ctx.drawImage(loop, 0, 0, 720, 900);
    else {
      const img = new Image();
      img.src = "/media/portrait-poster.webp";
      img.onload = () => ctx.drawImage(img, 0, 0, 720, 900);
    }
  }, [loop]);

  /* ---------- audio meter (Web Audio) ---------- */
  const startMeter = useCallback(() => {
    const el = media.current;
    if (!el || audioGraph.current) return;
    try {
      const ctx = new AudioContext();
      const src = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.72;
      src.connect(analyser);
      analyser.connect(ctx.destination);
      audioGraph.current = { ctx, analyser };
    } catch {
      // Meter is decoration; playback works without it.
    }
  }, []);

  // One rAF loop while playing: transcript position, meter bars.
  useEffect(() => {
    if (paused) return;
    let raf = 0;
    const bins = new Uint8Array(32);
    const tick = () => {
      const el = media.current;
      if (el) setT(el.currentTime);
      const g = audioGraph.current;
      if (g && tier !== "reduced") {
        g.analyser.getByteFrequencyData(bins);
        meter.current.forEach((bar, i) => {
          const v = bins[Math.min(31, 1 + Math.floor((i / BARS) * 22))] / 255;
          bar.style.transform = `scaleY(${0.08 + v * 0.92})`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      meter.current.forEach((bar) => (bar.style.transform = "scaleY(0.08)"));
    };
  }, [paused, tier]);

  /* ---------- open ---------- */
  useGSAP(
    () => {
      if (!mounted || !root.current || !win.current) return;
      paintSnapshot();
      const lenis = (window as unknown as { __lenis?: { stop(): void } }).__lenis;
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";

      const backdrop = root.current.querySelector("[data-backdrop]");
      const panel = root.current.querySelector("[data-panel]");
      const lines = root.current.querySelectorAll("[data-reveal]");
      const play = () => {
        startMeter();
        media.current?.play().catch(() => setPaused(true));
      };

      const focusIn = () => closeBtn.current?.focus({ preventScroll: true });

      if (tier === "reduced") {
        focusIn();
        gsap.set(snap.current, { autoAlpha: 0 });
        play();
        return;
      }

      const target = win.current.getBoundingClientRect();
      const from = origin?.getBoundingClientRect();
      const flip = tier === "full" && from && from.width > 0;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 0);
      if (flip) {
        // FLIP: start exactly where the hero frame is, then travel to centre stage.
        tl.set(origin, { visibility: "hidden" }, 0.02).fromTo(
          win.current,
          {
            x: from.left - target.left,
            y: from.top - target.top,
            scale: from.width / target.width,
            transformOrigin: "0 0",
          },
          { x: 0, y: 0, scale: 1, duration: 1.05, ease: "expo.inOut" },
          0
        );
      } else {
        tl.fromTo(win.current, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.05);
      }
      tl.fromTo(panel, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "aperture" }, flip ? 0.62 : 0.2)
        .fromTo(lines, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06 }, flip ? 0.85 : 0.35)
        .add(play, flip ? 0.9 : 0.3)
        .add(focusIn, flip ? 1.0 : 0.45)
        // The still B&W frame dissolves into the colour, talking avatar as the voice begins.
        .to(snap.current, { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, flip ? 1.0 : 0.4);
    },
    { scope: root, dependencies: [mounted] }
  );

  /* ---------- close ---------- */
  const close = useCallback(() => {
    if (closing.current || !root.current || !win.current) return;
    closing.current = true;
    const el = media.current;
    el?.pause();
    const finish = () => {
      if (origin) gsap.set(origin, { clearProps: "visibility" });
      document.documentElement.style.overflow = "";
      (window as unknown as { __lenis?: { start(): void } }).__lenis?.start();
      audioGraph.current?.ctx.close().catch(() => {});
      onClosed();
      if (afterClose.current) document.getElementById(afterClose.current)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (tier === "reduced") return finish();

    paintSnapshot();
    const backdrop = root.current.querySelector("[data-backdrop]");
    const panel = root.current.querySelector("[data-panel]");
    const from = win.current.getBoundingClientRect();
    const to = origin?.getBoundingClientRect();
    const flip = tier === "full" && to && to.width > 0;
    const tl = gsap.timeline({ onComplete: finish, defaults: { ease: "power3.inOut" } });
    tl.to(panel, { clipPath: "inset(0% 100% 0% 0%)", duration: 0.45, ease: "aperture" }, 0).to(
      snap.current,
      { autoAlpha: 1, duration: 0.45 },
      0
    );
    if (flip) {
      const current = gsap.getProperty(win.current, "x") as number;
      const currentY = gsap.getProperty(win.current, "y") as number;
      tl.to(
        win.current,
        {
          x: current + (to.left - from.left),
          y: currentY + (to.top - from.top),
          scale: to.width / from.width,
          transformOrigin: "0 0",
          duration: 0.85,
          ease: "expo.inOut",
        },
        0.2
      );
    } else {
      tl.to(win.current, { y: 30, autoAlpha: 0, duration: 0.45 }, 0.1);
    }
    tl.to(backdrop, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, flip ? 0.55 : 0.2);
  }, [origin, onClosed, paintSnapshot, tier]);

  // Esc closes even if focus has wandered outside the dialog (e.g. after clicking the stage).
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  /* ---------- controls ---------- */
  function toggle() {
    const el = media.current;
    if (!el) return;
    if (el.paused) {
      if (ended) el.currentTime = 0;
      startMeter();
      audioGraph.current?.ctx.resume().catch(() => {});
      el.play().catch(() => {});
    } else el.pause();
  }
  function seek(to: number) {
    const el = media.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(dur, to));
    setT(el.currentTime);
    if (el.paused && !ended) {
      startMeter();
      el.play().catch(() => {});
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
    } else if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && (e.target as HTMLElement).tagName !== "INPUT") {
      e.preventDefault();
      seek((media.current?.currentTime ?? 0) + (e.key === "ArrowRight" ? 5 : -5));
    } else if (e.key === " " && (e.target as HTMLElement).tagName !== "BUTTON" && (e.target as HTMLElement).tagName !== "INPUT") {
      e.preventDefault();
      toggle();
    } else if (e.key === "Tab") {
      // keep focus inside the dialog
      const f = root.current?.querySelectorAll<HTMLElement>("button, input, [href]");
      if (!f || !f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Keep the spoken word in view inside the transcript.
  const flat = words.flat();
  const current = flat.findIndex((w) => t >= w.s && t < w.e + 0.08);
  useEffect(() => {
    if (current < 0 || !transcript.current) return;
    const el = transcript.current.querySelector<HTMLElement>(`[data-i="${current}"]`);
    if (!el) return;
    const box = transcript.current;
    const top = el.offsetTop - box.offsetTop;
    if (top < box.scrollTop + 24 || top > box.scrollTop + box.clientHeight - 48) {
      box.scrollTo({ top: Math.max(0, top - box.clientHeight / 3), behavior: tier === "reduced" ? "auto" : "smooth" });
    }
  }, [current, tier]);

  if (!mounted) return null;

  let index = -1;
  const mediaEvents = {
    onPlay: () => {
      setPaused(false);
      setEnded(false);
    },
    onPause: () => setPaused(true),
    onEnded: () => {
      setPaused(true);
      setEnded(true);
    },
    onLoadedMetadata: (e: SyntheticEvent<HTMLMediaElement>) => setDur(e.currentTarget.duration || profile.intro.seconds),
  };

  return createPortal(
    <div
      ref={root}
      className={s.theater}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onKeyDown={onKeyDown}
      data-tier={tier}
    >
      <div className={s.backdrop} data-backdrop="" onClick={close} />

      <div className={s.stage}>
        <div ref={win} className={s.window}>
          {video ? (
            <video
              ref={(el) => {
                media.current = el;
              }}
              className={s.media}
              playsInline
              preload="auto"
              poster={video.poster || undefined}
              muted={muted}
              {...mediaEvents}
            >
              {video.av1 && <source src={video.av1} type='video/mp4; codecs="av01.0.05M.08"' />}
              <source src={video.h264} type="video/mp4" />
              <track kind="captions" src={profile.intro.captions} srcLang="en" label="English" />
            </video>
          ) : (
            <>
              <video className={s.media} muted loop playsInline autoPlay={tier !== "reduced"} poster="/media/portrait-poster.webp">
                <source src="/media/portrait-loop.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                <source src="/media/portrait-loop.h264.mp4" type="video/mp4" />
              </video>
              <audio
                ref={(el) => {
                  media.current = el;
                }}
                src={profile.intro.audio}
                preload="auto"
                muted={muted}
                {...mediaEvents}
              />
            </>
          )}
          <canvas ref={snap} className={s.snapshot} aria-hidden="true" />
          {video?.preview && <span className={`mono ${s.previewTag}`}>local preview · trial watermark</span>}
          <span className={s.progress} style={{ transform: `scaleX(${dur ? t / dur : 0})` }} aria-hidden="true" />
          <span className={s.corner} data-c="tl" aria-hidden="true" />
          <span className={s.corner} data-c="tr" aria-hidden="true" />
          <span className={s.corner} data-c="bl" aria-hidden="true" />
          <span className={s.corner} data-c="br" aria-hidden="true" />
        </div>

        <aside className={s.panel} data-panel="">
          <header className={s.head} data-reveal="">
            <p className="mono">
              <span className={s.dotLive} data-on={!paused} aria-hidden="true" />
              intro.{video ? "mp4" : "voice"} · AI {video ? "animated avatar" : "voice-over"}
            </p>
            <span className={s.meter} aria-hidden="true">
              {Array.from({ length: BARS }, (_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) meter.current[i] = el;
                  }}
                />
              ))}
            </span>
            <button ref={closeBtn} type="button" className={s.close} onClick={close} aria-label="Close intro">
              <kbd className="mono">Esc</kbd> ✕
            </button>
          </header>

          <h2 id="intro-title" className={s.title} data-reveal="">
            Hi — I&apos;m Dawood&apos;s AI double.
          </h2>

          <div ref={transcript} className={s.transcript} data-reveal="" data-lenis-prevent="">
            {words.map((para, p) => (
              <p key={p}>
                {para.map((w) => {
                  index++;
                  const i = index;
                  const state = i < current ? "past" : i === current ? "now" : t > 0 && w.s < t ? "past" : "next";
                  return (
                    <Fragment key={i}>
                      <button type="button" data-i={i} data-state={state} className={s.word} onClick={() => seek(w.s)} tabIndex={-1}>
                        {w.w}
                      </button>{" "}
                    </Fragment>
                  );
                })}
              </p>
            ))}
          </div>

          <div className={s.controls} data-reveal="">
            <button type="button" className={s.play} onClick={toggle} aria-label={paused ? "Play" : "Pause"}>
              {paused ? (ended ? "↺" : "▶") : "❚❚"}
            </button>
            <input
              className={s.scrub}
              type="range"
              min={0}
              max={dur}
              step={0.1}
              value={t}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              style={{ ["--p" as string]: `${dur ? (t / dur) * 100 : 0}%` }}
            />
            <span className={`mono ${s.time}`}>
              {mmss(t)} / {mmss(dur)}
            </span>
            <button type="button" className={s.mute} onClick={() => setMuted((m) => !m)} aria-pressed={muted}>
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>

          {ended && (
            <div className={s.end} data-reveal="">
              <a className="btn" href={profile.cv} target="_blank" rel="noopener">
                Read my CV <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a
                className={`btn ${s.ghost}`}
                href="#ask"
                onClick={(e) => {
                  e.preventDefault();
                  afterClose.current = "ask";
                  close();
                }}
              >
                Ask my work
              </a>
              <a className={`btn ${s.ghost}`} href={`mailto:${profile.email}?subject=Project%20enquiry`}>
                Start a project
              </a>
            </div>
          )}

          <p className={`mono ${s.disclosure}`} data-reveal="">
            {profile.intro.disclosure}
          </p>
        </aside>
      </div>
    </div>,
    document.body
  );
}
