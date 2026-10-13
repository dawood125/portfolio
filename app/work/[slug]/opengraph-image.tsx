import { ImageResponse } from "next/og";
import { work, workBySlug } from "@/lib/content";

export const alt = "Case study — Dawood Ahmed";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const item = workBySlug((await params).slug);
  const name = item?.name ?? "Case study";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111214", color: "#EDECE8", padding: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#8C9BFF" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: item?.accent ?? "#2B3FE0" }} />
          <div style={{ display: "flex" }}>{`case study · ${item?.sector ?? ""} · ${item?.year ?? ""}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: name.length > 14 ? 104 : 132, fontWeight: 700, letterSpacing: -5, lineHeight: 0.92 }}>{name}</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 26, lineHeight: 1.25, color: "#C9C8C3", maxWidth: 980 }}>{item?.summary ?? ""}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A7A9AE" }}>
          <div style={{ display: "flex" }}>Dawood Ahmed — full-stack & GenAI developer</div>
          <div style={{ display: "flex" }}>www.dawoodahmed.dev</div>
        </div>
      </div>
    ),
    size
  );
}
