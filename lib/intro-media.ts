import "server-only";
import fs from "node:fs";
import path from "node:path";

export type IntroVideo = { av1: string; h264: string; poster: string; preview: boolean };

const dir = path.join(process.cwd(), "public", "media", "intro");
const has = (f: string) => fs.existsSync(path.join(dir, f));

/**
 * Prefer the clean export (avatar.*). Fall back to the local-only watermarked preview (avatar-preview.*,
 * gitignored, so it never reaches production). Null means "voice-over on the living portrait".
 */
export function findIntroVideo(): IntroVideo | null {
  for (const [base, preview] of [["avatar", false], ["avatar-preview", true]] as const) {
    if (has(`${base}.h264.mp4`)) {
      return {
        av1: has(`${base}.av1.mp4`) ? `/media/intro/${base}.av1.mp4` : "",
        h264: `/media/intro/${base}.h264.mp4`,
        poster: has(`${base}-poster.webp`) ? `/media/intro/${base}-poster.webp` : "",
        preview,
      };
    }
  }
  return null;
}
