import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { BuildInfo } from "@/components/SiteFooter";

/** Commit from Vercel's env, else read the local .git. Build time is stamped by next.config at build. */
export function getBuildInfo(): BuildInfo {
  let commit = process.env.VERCEL_GIT_COMMIT_SHA ?? null;
  if (!commit) {
    try {
      const git = path.join(process.cwd(), ".git");
      const head = fs.readFileSync(path.join(git, "HEAD"), "utf8").trim();
      commit = head.startsWith("ref: ") ? fs.readFileSync(path.join(git, head.slice(5)), "utf8").trim() : head;
    } catch {
      commit = null;
    }
  }
  return { commit, builtAt: process.env.BUILD_TIME ?? new Date().toISOString() };
}
