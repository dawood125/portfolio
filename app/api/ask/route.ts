import { buildSystemPrompt, SOURCE_TAGS } from "@/lib/ask-corpus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Groq's free tier allows 8k tokens/min *per model*; each question costs ~1.7k. When one model is
// rate-limited (429) or erroring, fall through to the next so visitors rarely see a failure.
const MODELS: { id: string; extra?: Record<string, unknown> }[] = [
  { id: "qwen/qwen3.8-27b" },
  { id: "openai/gpt-oss-20b", extra: { reasoning_effort: "low" } },
  { id: "openai/gpt-oss-120b", extra: { reasoning_effort: "low" } },
];
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_QUESTION = 500;
const MAX_TURNS = 4;

// Prototype limiter: per-instance memory. Phase 4 swaps this for Upstash (shared across instances).
const PER_MINUTE = 6;
const PER_DAY = 60;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const day = (hits.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  const minute = day.filter((t) => now - t < 60_000);
  if (minute.length >= PER_MINUTE || day.length >= PER_DAY) return true;
  day.push(now);
  hits.set(ip, day);
  return false;
}

type Turn = { role: "user" | "assistant"; content: string };

function cleanHistory(raw: unknown): Turn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (t): t is Turn =>
        !!t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string"
    )
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, content: t.content.slice(0, 1200) }));
}

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return new Response("The assistant is offline right now.", { status: 503 });

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

  const messages = [{ role: "system", content: buildSystemPrompt() }, ...cleanHistory(body.history), { role: "user", content: q }];
  // Rough token estimate (≈4 chars/token) so the console can show what the model actually read.
  const contextTokens = Math.round(messages.reduce((n, m) => n + m.content.length, 0) / 4);
  let upstream: Response | null = null;
  let model = "";
  let attempts = 0;
  let modelMs = 0;
  for (const m of MODELS) {
    attempts++;
    const sent = performance.now();
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: m.id,
        stream: true,
        temperature: 0.3,
        max_tokens: 320,
        reasoning_format: "hidden",
        ...m.extra,
        messages,
      }),
      signal: AbortSignal.timeout(20_000),
    }).catch(() => null);
    if (res?.ok && res.body) {
      upstream = res;
      model = m.id;
      modelMs = Math.round(performance.now() - sent);
      break;
    }
    res?.body?.cancel().catch(() => {});
  }

  if (!upstream || !upstream.body) {
    return new Response("The assistant is busy right now. Try again in a minute, or email Dawood.", { status: 503 });
  }

  // Re-stream Groq's SSE as plain text deltas.
  const reader = upstream.body.getReader();
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
      "X-Model": model,
      "X-Attempts": String(attempts),
      "X-Model-Ms": String(modelMs),
      "X-Context-Tokens": String(contextTokens),
      "X-Sources": String(SOURCE_TAGS.length),
    },
  });
}
