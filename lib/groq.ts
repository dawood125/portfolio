import "server-only";

export const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Groq's free tier allows 8k tokens/min *per model*; each question costs ~2k. When one model is
// rate-limited (429) or erroring, fall through to the next so visitors rarely see a failure.
export const MODELS: { id: string; extra?: Record<string, unknown> }[] = [
  { id: "qwen/qwen3.8-27b" },
  { id: "openai/gpt-oss-20b", extra: { reasoning_effort: "low" } },
  { id: "openai/gpt-oss-120b", extra: { reasoning_effort: "low" } },
];

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/** First model that answers wins. Returns the raw Response (streaming or not) plus timings. */
export async function callGroq(messages: ChatMessage[], { stream }: { stream: boolean }) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  let attempts = 0;
  for (const m of MODELS) {
    attempts++;
    const sent = performance.now();
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: m.id, stream, temperature: 0.3, max_tokens: 320, reasoning_format: "hidden", ...m.extra, messages }),
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    }).catch(() => null);
    if (res?.ok && (stream ? res.body : true)) {
      return { res, model: m.id, attempts, modelMs: Math.round(performance.now() - sent) };
    }
    res?.body?.cancel().catch(() => {});
  }
  return null;
}
