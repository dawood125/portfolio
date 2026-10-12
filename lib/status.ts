import "server-only";
import { liveSystems } from "./content";

export type SystemStatus = {
  slug: string;
  ok: boolean;
  code: number | null;
  ms: number | null;
};

export type StatusReport = {
  checkedAt: string; // ISO
  systems: Record<string, SystemStatus>;
};

const TIMEOUT_MS = 10_000;

async function probeOnce(url: string): Promise<{ code: number; ms: number; ok: boolean } | null> {
  const started = performance.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "dawood-portfolio-status/1.0 (+uptime check)" },
    });
    // Headers arriving is enough to time the response; don't download the page.
    res.body?.cancel().catch(() => {});
    return { code: res.status, ms: Math.round(performance.now() - started), ok: res.ok };
  } catch {
    return null;
  }
}

/** One retry: a single dropped packet shouldn't mark a client's site as down. */
async function probe(slug: string, url: string): Promise<SystemStatus> {
  const r = (await probeOnce(url)) ?? (await probeOnce(url));
  return r ? { slug, ...r } : { slug, ok: false, code: null, ms: null };
}

/**
 * Measured when the page is (re)generated; the page revalidates every 5 minutes.
 * If *every* site fails at once, the problem is almost certainly on our side (network, cold region),
 * so outside of the build we throw: ISR then keeps serving the last good page instead of a false outage.
 */
export async function checkLiveSystems(): Promise<StatusReport> {
  const results = await Promise.all(liveSystems.map((s) => probe(s.slug, s.url)));
  const allFailed = results.every((r) => !r.ok);
  if (allFailed && process.env.NEXT_PHASE !== "phase-production-build") {
    throw new Error("Live-system check failed for every site; keeping the previous status.");
  }
  return {
    checkedAt: new Date().toISOString(),
    systems: Object.fromEntries(results.map((r) => [r.slug, r])),
  };
}
