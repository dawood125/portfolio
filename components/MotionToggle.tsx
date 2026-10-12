"use client";

import { setMotionPreference, useMotionTier } from "@/lib/motion";

/** Site-level motion switch (WCAG 2.3.3). Persists in localStorage; every section re-runs its animations. */
export default function MotionToggle({ className }: { className?: string }) {
  const tier = useMotionTier();
  const on = tier !== "reduced";
  return (
    <button
      type="button"
      className={className}
      role="switch"
      aria-checked={on}
      onClick={() => setMotionPreference(on)}
    >
      <span className="mono">Motion</span>
      <span aria-hidden="true" data-on={on} />
    </button>
  );
}
