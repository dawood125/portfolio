import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { codeProjects, work, SITE_URL } from "@/lib/content";
import { breadcrumbs, graph, PERSON_ID } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import StreamHeading from "@/components/StreamHeading";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Work — case studies by Dawood Ahmed",
  description:
    "Case studies: AIWA Flow (POS & inventory, online and offline), SugarHills Resort, BIKKS Trading (Japan), DIVERSITY (Shopify), NeuralDesk (multi-tenant RAG) and E-Masjid.",
  alternates: { canonical: "/work" },
};

const STATUS: Record<string, string> = { live: "Live", private: "Private", code: "Code on GitHub", retired: "Code on GitHub" };

export default function WorkIndex() {
  return (
    <main id="main" className={s.page}>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/work#page`,
            url: `${SITE_URL}/work`,
            name: "Work — case studies by Dawood Ahmed",
            author: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: work.map((w, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/work/${w.slug}`, name: w.name })),
            },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ])
        )}
      />
      <header className={`wrap ${s.head}`}>
        <p className={`mono ${s.kicker}`}>work · {work.length} case studies</p>
        <StreamHeading as="h1" className={s.title}>
          The work, opened up.
        </StreamHeading>
        <p className={s.lede}>Client systems in Pakistan, Japan and India, a product of my own, and the projects I learned the most from.</p>
      </header>

      <Reveal className={`wrap ${s.grid}`}>
        {work.map((w, i) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className={s.card} data-reveal={i % 2}>
            <span className={s.frame}>
              {w.media.image ? (
                <Image src={w.media.image} alt="" fill sizes="(max-width: 900px) 92vw, 45vw" />
              ) : (
                <span className={`mono ${s.code}`}>
                  {w.arch.map((a) => (
                    <span key={a.layer}>
                      {a.layer.toLowerCase()} → {a.tech}
                    </span>
                  ))}
                </span>
              )}
            </span>
            <span className={`mono ${s.meta}`}>
              {w.sector} · {w.year} · {STATUS[w.status]}
            </span>
            <span className={s.name}>
              {w.name} <span aria-hidden="true">→</span>
            </span>
            <span className={s.summary}>{w.summary}</span>
          </Link>
        ))}
      </Reveal>

      <section className={`wrap ${s.more}`} aria-labelledby="more">
        <h2 id="more" className={`mono ${s.kicker}`}>
          also on GitHub
        </h2>
        <ul>
          {codeProjects.map((p) => (
            <li key={p.slug}>
              {"url" in p ? (
                <a href={p.url} target="_blank" rel="noopener">
                  {p.name} ↗
                </a>
              ) : (
                <span>{p.name}</span>
              )}
              <span>{p.summary}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
