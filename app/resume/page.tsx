import type { Metadata } from "next";
import Link from "next/link";
import { codeProjects, experience, profile, work, SITE_URL } from "@/lib/content";
import { breadcrumbs, graph, PERSON_ID, WEBSITE_ID } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PrintButton from "@/components/PrintButton";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Résumé — Dawood Ahmed, Full-Stack & GenAI Developer",
  description:
    "Résumé of Dawood Ahmed: full-stack developer (React, Next.js, Node.js, Laravel) with applied GenAI. 3+ years, 25+ projects. Open to remote or on-site roles.",
  alternates: { canonical: "/resume" },
};

const STACK_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  data: "Data",
  ai: "AI",
  commerce: "Commerce",
  ship: "Ship & cloud",
};

export default function Resume() {
  return (
    <main id="main" className={s.page}>
      <JsonLd
        data={graph(
          {
            "@type": "ProfilePage",
            "@id": `${SITE_URL}/resume#page`,
            url: `${SITE_URL}/resume`,
            name: "Résumé — Dawood Ahmed",
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: { "@id": PERSON_ID },
            dateModified: "2026-10-13",
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Résumé", path: "/resume" },
          ])
        )}
      />
      <Reveal className={`wrap ${s.sheet}`}>
        <header className={s.head}>
          <div>
            <p className={`mono ${s.kicker}`} data-reveal="">
              résumé · updated Oct 2026
            </p>
            <h1 className={s.name} data-reveal="">
              {profile.name}
            </h1>
            <p className={s.role} data-reveal="1">
              Full-stack developer — React, Next.js, Node.js, Laravel — and applied GenAI.
            </p>
          </div>
          <div className={s.actions} data-reveal="2">
            <a className="btn" href={profile.cv} target="_blank" rel="noopener">
              Download PDF <span className="arrow" aria-hidden="true">↓</span>
            </a>
            <PrintButton className="btn btn--ghost" />
          </div>
        </header>

        <dl className={s.contact}>
          <div>
            <dt>Availability</dt>
            <dd>{profile.availability}</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>
              {profile.location} · {profile.tzLabel}
            </dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <br />
              <a href={profile.whatsapp}>{profile.phone}</a> (WhatsApp)
            </dd>
          </div>
          <div>
            <dt>Profiles</dt>
            <dd>
              <a href={profile.github}>github.com/dawood125</a>
              <br />
              <a href={profile.linkedin}>LinkedIn</a>
            </dd>
          </div>
        </dl>

        <section className={s.section} aria-labelledby="r-summary">
          <h2 id="r-summary" className={`mono ${s.label}`}>
            summary
          </h2>
          <p className={s.summary} data-reveal="">
            {profile.experience} building and deploying production software across internships, client work and full-time
            roles — {profile.projectsShipped} projects. I&apos;ve shipped a POS and inventory product running at two
            distributors, sites for clients in Japan and India, a Shopify store, and a multi-tenant RAG support platform.
            Top Performer in the HEC / NCEAC Generative AI program (2026).
          </p>
        </section>

        <section className={s.section} aria-labelledby="r-exp">
          <h2 id="r-exp" className={`mono ${s.label}`}>
            experience
          </h2>
          <ol className={s.timeline}>
            {experience
              .filter((e) => !e.role.startsWith("BS "))
              .map((e) => (
                <li key={`${e.org}-${e.when}`} data-reveal="">
                  <p className={`mono ${s.when}`}>{e.when}</p>
                  <h3>
                    {e.role} <span>· {e.org}</span>
                  </h3>
                  <p>{e.note}</p>
                </li>
              ))}
          </ol>
        </section>

        <section className={s.section} aria-labelledby="r-work">
          <h2 id="r-work" className={`mono ${s.label}`}>
            selected work
          </h2>
          <ul className={s.work}>
            {work.map((w) => (
              <li key={w.slug} data-reveal="">
                <Link href={`/work/${w.slug}`}>
                  <strong>{w.name}</strong> — {w.kind} ({w.year})
                </Link>
                <p>{w.summary}</p>
                <p className={`mono ${s.meta}`}>
                  {w.role} · {w.stack.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
          <p className={s.more}>
            Also on GitHub: {codeProjects.filter((p) => "url" in p).map((p) => p.name).join(", ")}.
          </p>
        </section>

        <section className={s.section} aria-labelledby="r-skills">
          <h2 id="r-skills" className={`mono ${s.label}`}>
            skills
          </h2>
          <dl className={s.skills}>
            {Object.entries(profile.stack).map(([k, v]) => (
              <div key={k} data-reveal="">
                <dt>{STACK_LABELS[k] ?? k}</dt>
                <dd>{v.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={s.section} aria-labelledby="r-edu">
          <h2 id="r-edu" className={`mono ${s.label}`}>
            education & credential
          </h2>
          <ul className={s.edu}>
            <li data-reveal="">
              <strong>BS Information Technology</strong> — University of the Punjab, 2022–2026. Final-year project:{" "}
              <Link href="/work/e-masjid">E-Masjid</Link> (backend).
            </li>
            <li data-reveal="">
              <strong>{profile.credential.title}</strong> — {profile.credential.issuer}, {profile.credential.year}.{" "}
              <span className="mono">Certificate ID {profile.credential.certificateId}</span>
            </li>
          </ul>
        </section>
      </Reveal>
    </main>
  );
}
