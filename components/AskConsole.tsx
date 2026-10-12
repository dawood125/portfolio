"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { codeProjects, liveSystems, profile } from "@/lib/content";
import s from "./AskConsole.module.css";

const STARTERS = [
  "What has he shipped that's live?",
  "How deep is his GenAI work?",
  "Can he start soon — remote or on-site?",
];

type Turn = { role: "user" | "assistant"; content: string };

/** Real, browser-measured timestamps for one question. */
type Run = {
  t0: number;
  headers?: number; // response headers reached the browser (model already started)
  modelMs?: number; // server-measured: Groq time to first byte
  first?: number; // first token arrived
  end?: number;
  model?: string;
  attempts?: number;
  contextTokens?: number;
  sources?: number;
};

type Source = { label: string; href: string; external?: boolean; image?: string; kind?: string };

const sources: Record<string, Source> = {
  ...Object.fromEntries(
    liveSystems.map((x) => [x.slug, { label: x.name, href: `#system-${x.slug}`, image: x.image, kind: `${x.kind} · live` }])
  ),
  ...Object.fromEntries(
    codeProjects.map((p) => [
      p.slug,
      { label: p.name, href: "url" in p && p.url ? p.url : "#work", external: "url" in p && !!p.url, kind: p.stack.slice(0, 3).join(" · ") },
    ])
  ),
  cv: { label: "CV", href: profile.cv, external: true, kind: "Career & credentials" },
};

/** Turns bare https URLs from the model into links (text only; never HTML). */
function linkify(text: string, key: string) {
  return text.split(/(https:\/\/[^\s)]+[^\s).,;:!?])/g).map((t, i) =>
    t.startsWith("https://") ? (
      <a key={`${key}-u${i}`} className={s.url} href={t} target="_blank" rel="noopener">
        {t.replace(/^https:\/\//, "")}
      </a>
    ) : (
      t
    )
  );
}

/** Renders one line: prose plus [[tag]] citations. Hides a half-received tag at the end of the stream. */
function renderLine(line: string, key: string) {
  const safe = line.replace(/\*\*/g, "").replace(/\[\[[^\]]*\]?$/, "");
  return safe.split(/(\[\[[a-z0-9-]+\]\])/g).map((part, i) => {
    const m = part.match(/^\[\[([a-z0-9-]+)\]\]$/);
    if (!m) return <span key={`${key}-${i}`}>{linkify(part, `${key}-${i}`)}</span>;
    const src = sources[m[1]];
    if (!src) return null;
    return (
      <a key={`${key}-${i}`} className={s.cite} href={src.href} {...(src.external ? { target: "_blank", rel: "noopener" } : {})}>
        {src.label}
      </a>
    );
  });
}

/** Minimal formatting for model output: paragraphs and "-"/"*" bullet lists. No HTML is ever injected. */
function render(text: string, caret: ReactNode) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const lines = text.split("\n");
  const flush = (k: number) => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${k}`} className={s.list}>
        {bullets.map((b, i) => (
          <li key={i}>{renderLine(b, `li-${k}-${i}`)}</li>
        ))}
      </ul>
    );
    bullets = [];
  };
  lines.forEach((raw, k) => {
    const bullet = raw.match(/^\s*[*\-•]\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }
    flush(k);
    if (raw.trim()) blocks.push(<p key={`p-${k}`}>{renderLine(raw, `p-${k}`)}</p>);
  });
  flush(lines.length);
  blocks.push(<span key="caret">{caret}</span>);
  return blocks;
}

const ms = (n: number) => (n < 1000 ? `${Math.round(n)} ms` : `${(n / 1000).toFixed(2)} s`);

/** The glass box: each stage of the request, drawn live from real timestamps. */
function Pipeline({ run, now }: { run: Run; now: number }) {
  const stop = run.end ?? now;
  const total = Math.max(1, stop - run.t0);
  // Before headers arrive we only know "in flight". After, the server tells us how much of that was the model.
  const net = run.headers != null ? Math.max(0, run.headers - run.t0 - (run.modelMs ?? 0)) : undefined;
  const modelStart = run.t0 + (net ?? 0);
  const stages = [
    {
      label: "your browser → server",
      detail: run.contextTokens
        ? `${run.sources} sources · ≈${(run.contextTokens / 1000).toFixed(1)}k tokens of context · whole corpus, no retrieval step`
        : "question in flight",
      a: run.t0,
      b: run.headers != null ? run.t0 + (net ?? 0) : undefined,
    },
    {
      label: "model → first token",
      detail: run.model
        ? `${run.model.split("/").pop()} on Groq${run.attempts && run.attempts > 1 ? ` · fell back ${run.attempts - 1}× (rate limit)` : ""}`
        : "waiting for the model",
      a: run.headers != null ? modelStart : undefined,
      b: run.headers,
    },
    { label: "stream the answer", detail: run.end ? "done" : run.headers ? "streaming…" : "", a: run.headers, b: run.end },
  ];
  return (
    <ol className={s.pipe} aria-label="How this answer was produced">
      {stages.map((st) => {
        const started = st.a != null;
        const a = st.a ?? stop;
        const b = st.b ?? (started ? now : a);
        return (
          <li key={st.label} data-state={st.b != null ? "done" : started ? "live" : "idle"}>
            <span className={s.pipeLabel}>{st.label}</span>
            <span className={s.pipeMs}>{started ? ms(b - a) : "—"}</span>
            <span className={s.pipeTrack}>
              <span
                className={s.pipeBar}
                style={{ left: `${((a - run.t0) / total) * 100}%`, width: `${(Math.max(0, b - a) / total) * 100}%` }}
              />
            </span>
            {st.detail && <span className={s.pipeDetail}>{st.detail}</span>}
          </li>
        );
      })}
      {run.end && (
        <li className={s.pipeTotal} data-state="done">
          <span className={s.pipeLabel}>total, measured in your browser</span>
          <span className={s.pipeMs}>{ms(run.end - run.t0)}</span>
        </li>
      )}
    </ol>
  );
}

export default function AskConsole() {
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [now, setNow] = useState(0);
  const history = useRef<Turn[]>([]);
  const abort = useRef<AbortController | null>(null);

  // Tick the live pipeline while a request is in flight.
  useEffect(() => {
    if (!busy) return;
    let raf = 0;
    const tick = () => {
      setNow(performance.now());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [busy]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    abort.current?.abort();
    const ctrl = new AbortController();
    abort.current = ctrl;

    const r: Run = { t0: performance.now() };
    setRun({ ...r });
    setNow(r.t0);
    setAsked(text);
    setAnswer("");
    setError("");
    setBusy(true);
    setQ("");

    let full = "";
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, history: history.current }),
        signal: ctrl.signal,
      });
      r.headers = performance.now();
      r.model = res.headers.get("X-Model") ?? undefined;
      r.modelMs = Number(res.headers.get("X-Model-Ms") ?? 0) || 0;
      r.attempts = Number(res.headers.get("X-Attempts") ?? 1);
      r.contextTokens = Number(res.headers.get("X-Context-Tokens") ?? 0) || undefined;
      r.sources = Number(res.headers.get("X-Sources") ?? 0) || undefined;
      setRun({ ...r });
      if (!res.ok || !res.body) {
        r.end = performance.now();
        setRun({ ...r });
        setError((await res.text()) || "Something went wrong.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!r.first) {
          r.first = performance.now();
          setRun({ ...r });
        }
        full += decoder.decode(value, { stream: true });
        setAnswer(full);
      }
      r.end = performance.now();
      setRun({ ...r });
      history.current = [...history.current, { role: "user" as const, content: text }, { role: "assistant" as const, content: full }].slice(-4);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError("Couldn't reach the assistant. Try again, or email Dawood.");
      r.end = performance.now();
      setRun({ ...r });
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(q);
  }

  // Generative-UI-lite: every source the answer cited becomes a card.
  const cited = busy
    ? []
    : [...new Set([...answer.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1]))].filter((slug) => sources[slug] && slug !== "cv").slice(0, 4);

  const open = !!run;

  return (
    <section id="ask" className={s.section} aria-labelledby="ask-title">
      <div className="wrap">
        <div className={s.console}>
          <div className={s.top}>
            <h2 id="ask-title" className="mono">
              ask <span aria-hidden="true">›</span> dawood&apos;s work
            </h2>
            <p className="mono">AI assistant · not Dawood · answers only from his CV and case studies</p>
          </div>

          <form className={s.form} onSubmit={onSubmit}>
            <label htmlFor="ask-input" className="sr-only">
              Ask a question about Dawood&apos;s work
            </label>
            <span className={`mono ${s.prompt}`} aria-hidden="true">
              ›
            </span>
            <input
              id="ask-input"
              className={s.input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder="Ask about his work…"
            />
            <button className={s.send} type="submit" disabled={busy || !q.trim()}>
              {busy ? "Thinking" : "Ask"} <span aria-hidden="true">↵</span>
            </button>
          </form>

          <div className={s.chips}>
            {STARTERS.map((t) => (
              <button key={t} type="button" className={s.chip} onClick={() => ask(t)} disabled={busy}>
                {t}
              </button>
            ))}
          </div>

          <div className={s.answerWrap} data-open={open}>
            <div className={s.answerInner}>
              <div className={s.body}>
                <div className={s.answer} aria-busy={busy}>
                  {asked && <p className={`mono ${s.asked}`}>› {asked}</p>}
                  {error ? (
                    <p className={s.error}>{error}</p>
                  ) : (
                    <div className={s.text}>{render(answer, busy ? <span className={s.caret} aria-hidden="true" /> : null)}</div>
                  )}
                  {cited.length > 0 && (
                    <ul className={s.cards} aria-label="Sources cited">
                      {cited.map((slug, i) => {
                        const src = sources[slug];
                        return (
                          <li key={slug} style={{ animationDelay: `${i * 70}ms` }}>
                            <a
                              className={s.card}
                              href={src.href}
                              {...(src.external ? { target: "_blank", rel: "noopener" } : {})}
                            >
                              {src.image ? (
                                <span className={s.cardImg}>
                                  <Image src={src.image} alt="" fill sizes="160px" />
                                </span>
                              ) : (
                                <span className={`mono ${s.cardCode}`} aria-hidden="true">
                                  {"</>"}
                                </span>
                              )}
                              <span className={s.cardText}>
                                <strong>{src.label}</strong>
                                <span className="mono">{src.kind}</span>
                              </span>
                              <span aria-hidden="true" className={s.cardArrow}>
                                {src.external ? "↗" : "↓"}
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {run && <Pipeline run={run} now={now} />}
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {busy ? "Answering…" : answer ? "Answer ready." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
