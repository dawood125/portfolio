import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { liveSystems, profile } from "@/lib/content";

export const alt = "Dawood Ahmed — Full-Stack & GenAI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const portrait = await readFile(path.join(process.cwd(), "public/media/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#EDECE8", color: "#111214", padding: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#5B5D63", letterSpacing: 1 }}>WWW.DAWOODAHMED.DEV</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.9 }}>Dawood</div>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.9, paddingLeft: 52 }}>Ahmed</div>
            <div style={{ display: "flex", fontSize: 32, marginTop: 28, lineHeight: 1.25, maxWidth: 620 }}>
              {`Full-stack & GenAI developer. ${liveSystems.length} live client systems, and a portfolio you can question.`}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#5B5D63" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#2B3FE0" }} />
            <div style={{ display: "flex" }}>{profile.availability}</div>
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 400, height: 518, border: "1px solid #111214", padding: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={378} height={496} style={{ objectFit: "cover", width: 378, height: 496 }} alt="" />
        </div>
      </div>
    ),
    size
  );
}
