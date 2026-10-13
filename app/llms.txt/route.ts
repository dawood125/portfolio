import { codeProjects, experience, profile, work, SITE_URL } from "@/lib/content";

// A plain-text summary for AI agents and LLM search (https://llmstxt.org). Same facts as the site.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${profile.name} — Full-Stack & GenAI Developer`,
    "",
    `> ${profile.role} based in ${profile.location} (${profile.tzLabel}). ${profile.availability}. ${profile.experience}, ${profile.projectsShipped} projects. ${profile.credential.title} (${profile.credential.year}).`,
    "",
    `Contact: ${profile.email} · WhatsApp ${profile.phone} · ${profile.github} · ${profile.linkedin}`,
    "",
    "## Pages",
    `- [Home](${SITE_URL}/): live client systems, the AIWA Flow architecture, an AI assistant that answers from the case studies`,
    `- [Work](${SITE_URL}/work): all case studies`,
    `- [Résumé](${SITE_URL}/resume): experience, skills, education, credential`,
    `- [Hire](${SITE_URL}/hire): services for clients (quoted per project)`,
    `- [CV (PDF)](${SITE_URL}${profile.cv})`,
    "",
    "## Case studies",
    ...work.map(
      (w) =>
        `- [${w.name}](${SITE_URL}/work/${w.slug}): ${w.kind}, ${w.year}. ${w.summary} Role: ${w.role}. Stack: ${w.stack.join(", ")}.${w.links.live ? ` Live: ${w.links.live}` : ""}${w.links.code ? ` Code: ${w.links.code}` : ""}`
    ),
    "",
    "## Experience",
    ...experience.map((e) => `- ${e.role}, ${e.org} (${e.when}). ${e.note}`),
    "",
    "## Skills",
    ...Object.entries(profile.stack).map(([k, v]) => `- ${k}: ${v.join(", ")}`),
    "",
    "## Optional",
    ...codeProjects.map((p) => `- ${"url" in p ? `[${p.name}](${p.url})` : p.name}: ${p.summary}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
