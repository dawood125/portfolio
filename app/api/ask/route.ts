import { buildSystemPrompt, retrieve } from "@/lib/ask-corpus";
import { callGroq } from "@/lib/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUESTION = 500;
const MAX_TURNS = 4;

// Per-instance limits. Vercel reuses warm instances, so this stops casual abuse; Groq's own free-tier
// limits are the hard ceiling (there is no paid usage to run up).
const PER_MINUTE = 6;
const PER_DAY = 60;
const GLOBAL_PER_DAY = 1500;
const hits = new Map<string, number[]>();
let globalDay = { day: "", count: 0 };

function limited(ip: string) {
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  if (globalDay.day !== today) globalDay = { day: today, count: 0 };
  if (globalDay.count >= GLOBAL_PER_DAY) return true;
  const day = (hits.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  const minute = day.filter((t) => now - t < 60_000);
  if (minute.length >= PER_MINUTE || day.length >= PER_DAY) return true;
  day.push(now);
  hits.set(ip, day);
  globalDay.count++;
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return false;
}

/** Only this site may use the assistant (blocks other pages from spending its quota). */
function allowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from some browsers omit it; curl is still rate-limited
  try {
    const host = new URL(origin).hostname;
    return host === "localhost" || host === "dawoodahmed.dev" || host.endsWith(".dawoodahmed.dev") || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

type Turn = { role: "user" | "assistant"; content: string };

function cleanHistory(raw: unknown): Turn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t): t is Turn => !!t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string")
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, content: t.content.slice(0, 1200) }));
}

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) return new Response("The assistant is offline right now.", { status: 503 });
  if (!allowedOrigin(req)) return new Response("Forbidden.", { status: 403 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return new Response("That's a lot of questions — please wait a minute, or email Dawood directly.", { status: 429 });
  }

  let body: { q?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request.", { status: 400 });
  }
  const q = typeof body.q === "string" ? body.q.trim() : "";
  if (!q || q.length > MAX_QUESTION) {
    return new Response(`Ask in ${MAX_QUESTION} characters or fewer.`, { status: 400 });
  }

  const history = cleanHistory(body.history);
  const retrieved = retrieve(q, history.filter((t) => t.role === "assistant"));
  const messages = [{ role: "system" as const, content: buildSystemPrompt(retrieved) }, ...history, { role: "user" as const, content: q }];
  // Rough token estimate (≈4 chars/token) so the console can show what the model actually read.
  const contextTokens = Math.round(messages.reduce((n, m) => n + m.content.length, 0) / 4);

  const upstream = await callGroq(messages, { stream: true });
  if (!upstream?.res.body) {
    return new Response("The assistant is busy right now. Try again in a minute, or email Dawood.", { status: 503 });
  }

  // Re-stream Groq's SSE as plain text deltas.
  const reader = upstream.res.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const data = line.startsWith("data:") ? line.slice(5).trim() : "";
        if (!data || data === "[DONE]") continue;
        try {
          const delta = JSON.parse(data).choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch {
          // ignore keep-alives / partial frames
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Model": upstream.model,
      "X-Attempts": String(upstream.attempts),
      "X-Model-Ms": String(upstream.modelMs),
      "X-Context-Tokens": String(contextTokens),
      "X-Retrieved": retrieved.join(","),
    },
  });
}
