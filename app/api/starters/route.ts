import { buildSystemPrompt, retrieve } from "@/lib/ask-corpus";
import { callGroq } from "@/lib/groq";
import { STARTERS } from "@/lib/starters";

// Generated at build and then at most once a day; served as a static file from the CDN.
export const dynamic = "force-static";
export const revalidate = 86400;

export type StarterAnswer = { answer: string; model: string; retrieved: string[]; contextTokens: number; generatedAt: string };

export async function GET() {
  const out: Record<string, StarterAnswer> = {};
  for (const q of STARTERS) {
    const retrieved = retrieve(q);
    const system = buildSystemPrompt(retrieved);
    const r = await callGroq(
      [
        { role: "system", content: system },
        { role: "user", content: q },
      ],
      { stream: false }
    );
    if (!r) continue; // the console falls back to a live answer for anything missing
    try {
      const data = await r.res.json();
      const answer = data.choices?.[0]?.message?.content?.trim();
      if (answer) {
        out[q] = { answer, model: r.model, retrieved, contextTokens: Math.round((system.length + q.length) / 4), generatedAt: new Date().toISOString() };
      }
    } catch {}
  }
  return Response.json(out);
}
