"use client";

import { useCallback, useEffect, useState } from "react";

const STOPS = ["top", "work", "services", "contact"] as const;

/** Deterministic scripted tour for screen-recording the reel (?reel=1).
 *  DOM MediaRecorder cannot capture DOM — use OS screen recorder to MP4. */
export default function ReelBar() {
  const [touring, setTouring] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("reel") === "1") {
      setTouring(true);
      let i = 0;
      const step = () => {
        const el = document.getElementById(STOPS[i]);
        el?.scrollIntoView({ behavior: "auto", block: "start" });
        i = (i + 1) % STOPS.length;
      };
      step();
      const id = setInterval(step, 4000);
      return () => clearInterval(id);
    }
  }, []);

  const startTour = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("reel", "1");
    window.location.href = url.toString();
  }, []);

  const stopTour = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("reel");
    window.location.href = url.toString();
  }, []);

  return (
    <div className="reel-bar" role="toolbar" aria-label="Reel tour">
      {!touring ? (
        <>
          <button onClick={startTour}>▶ Play reel tour</button>
          <span className="hint">4 stops · 16s · screen-record to MP4 for Instagram</span>
        </>
      ) : (
        <>
          <span className="hint">● TOUR — recording? capture screen now</span>
          <button onClick={stopTour}>Stop tour</button>
        </>
      )}
    </div>
  );
}
