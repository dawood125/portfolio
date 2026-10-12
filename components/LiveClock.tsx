"use client";

import { useEffect, useState } from "react";

const PKT = "Asia/Karachi";

function fmt(d: Date, timeZone?: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(d);
}

/** Offset of the visitor's clock from PKT, in hours (e.g. -4, +4, +3.5). */
function offsetFromPkt(d: Date) {
  const pkt = new Date(d.toLocaleString("en-US", { timeZone: PKT }));
  const local = new Date(d.toLocaleString("en-US"));
  return Math.round(((local.getTime() - pkt.getTime()) / 36e5) * 2) / 2;
}

export default function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);

  const off = now ? offsetFromPkt(now) : 0;
  const visitorIsPkt = now ? off === 0 : true;

  return (
    <p className={className}>
      <span>Sheikhupura </span>
      <time suppressHydrationWarning>{now ? fmt(now, PKT) : "--:--"}</time>
      <span> PKT</span>
      {now && !visitorIsPkt && (
        <span>
          {" · your time "}
          <time>{fmt(now)}</time>
          {` (${off > 0 ? "+" : "−"}${Math.abs(off)}h)`}
        </span>
      )}
    </p>
  );
}
