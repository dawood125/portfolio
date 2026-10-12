"use client";

import { useSyncExternalStore } from "react";

export type MotionTier = "full" | "lite" | "reduced";

const EVENT = "motiontierchange";

function read(): MotionTier {
  const t = document.documentElement.dataset.motion;
  return t === "lite" || t === "reduced" ? t : "full";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** The tier is decided before first paint by the inline script in app/layout.tsx. */
export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, read, () => "full");
}

/** Called by the Motion toggle. Persists the choice and re-runs every section's animations. */
export function setMotionPreference(reduced: boolean) {
  try {
    localStorage.setItem("motion", reduced ? "reduced" : "full");
  } catch {}
  const root = document.documentElement;
  if (reduced) {
    root.dataset.motion = "reduced";
  } else {
    root.dataset.motion = detectTier(false);
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Mirrors the inline head script; keep the two in sync. */
export function detectTier(respectStored = true): MotionTier {
  let stored: string | null = null;
  try {
    stored = respectStored ? localStorage.getItem("motion") : null;
  } catch {}
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (stored === "reduced" || (prefersReduced && stored !== "full")) return "reduced";
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const coarse = matchMedia("(pointer: coarse)").matches || innerWidth < 768;
  const saveData = !!nav.connection?.saveData;
  // Only genuinely weak hardware drops to lite: the effects here are GPU-cheap (transforms, a small canvas).
  const lowEnd = (!!nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) || (!!nav.deviceMemory && nav.deviceMemory <= 2);
  return coarse || saveData || lowEnd ? "lite" : "full";
}

const INTRO_DONE = "introdone";

/** True while the first-visit intro overlay is covering the page. */
export function introPlaying() {
  return document.documentElement.dataset.intro === "play";
}

/** Runs `cb` once the intro has finished (or right away if there is no intro). Returns an unsubscribe. */
export function onIntroDone(cb: () => void) {
  if (!introPlaying()) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(INTRO_DONE, handler, { once: true });
  return () => window.removeEventListener(INTRO_DONE, handler);
}

export function finishIntro() {
  try {
    sessionStorage.setItem("intro-seen", "1");
  } catch {}
  delete document.documentElement.dataset.intro;
  window.dispatchEvent(new Event(INTRO_DONE));
}

/** Inline, pre-paint version of detectTier + intro gate. Stringified into <head>. */
export const tierScript = `(function(){try{var d=document.documentElement,s=null;try{s=localStorage.getItem('motion')}catch(e){}var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,t='full';if(s==='reduced'||(rm&&s!=='full'))t='reduced';else{var n=navigator,c=matchMedia('(pointer: coarse)').matches||innerWidth<768,sd=n.connection&&n.connection.saveData,lc=(n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(n.deviceMemory&&n.deviceMemory<=2);if(c||sd||lc)t='lite'}d.dataset.motion=t;var seen=null;try{seen=sessionStorage.getItem('intro-seen')}catch(e){}if(t!=='reduced'&&!seen)d.dataset.intro='play'}catch(e){}})();`;
