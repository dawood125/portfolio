"use client";

import Image from "next/image";
import { useEffect, useRef, ViewTransition } from "react";
import { useMotionTier } from "@/lib/motion";
import type { Work } from "@/lib/content";
import s from "./CaseMedia.module.css";

/** The case-study "monitor". Shares its view-transition name with the home board, so the screen morphs across. */
export default function CaseMedia({ item }: { item: Work }) {
  const video = useRef<HTMLVideoElement>(null);
  const tier = useMotionTier();
  const { media } = item;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (tier === "reduced") {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [tier]);

  if (!media.image) return null;

  return (
    <figure className={s.monitor}>
      <div className={s.screen}>
        <ViewTransition name={`shot-${item.slug}`} share="morph" default="none">
          <div className={s.media}>
            {media.video ? (
              <video ref={video} muted loop playsInline preload="metadata" poster={media.image} aria-label={media.alt}>
                <source src={media.video.av1} type='video/mp4; codecs="av01.0.05M.08"' />
                <source src={media.video.h264} type="video/mp4" />
              </video>
            ) : (
              <Image src={media.image} alt={media.alt ?? item.name} fill priority sizes="(max-width: 900px) 92vw, 60vw" />
            )}
          </div>
        </ViewTransition>
      </div>
      <figcaption className={`mono ${s.caption}`}>
        <span>{item.links.host ? `https://${item.links.host}` : item.name}</span>
        <span>{media.note ?? (media.video ? "screen recording" : "")}</span>
      </figcaption>
    </figure>
  );
}
