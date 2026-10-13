import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, work, workBySlug, SITE_URL } from "@/lib/content";
import CaseMedia from "@/components/CaseMedia";
import CaseLayers from "@/components/CaseLayers";
import Reveal from "@/components/Reveal";
import StreamHeading from "@/components/StreamHeading";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, graph, PERSON_ID, snippet } from "@/lib/seo";
import s from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = workBySlug((await params).slug);
  if (!item) return {};
  const long = `${item.name} — ${item.kind}`;
  const title = long.length <= 60 ? long : `${item.name} — case study by Dawood Ahmed`;
  return {
    title,
    description: snippet(item.summary),
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: { title, description: snippet(item.summary), type: "article", url: `${SITE_URL}/work/${item.slug}` },
  };
}

const STATUS: Record<string, string> = {
  live: "Live",
  private: "Private system",
  code: "Code on GitHub",
  retired: "Demo retired · code on GitHub",
};

export default async function CaseStudy({ params }: Params) {
  const item = workBySlug((await params).slug);
  if (!item) notFound();
  const i = work.indexOf(item);
  const next = work[(i + 1) % work.length];

  return (
    <main id="main" className={s.page} data-ink-hero="" style={{ ["--accent" as string]: item.accent }}>
      <JsonLd
        data={graph(
          {
            "@type": "CreativeWork",
            "@id": `${SITE_URL}/work/${item.slug}#work`,
            name: item.name,
            headline: `${item.name} — ${item.kind}`,
            description: item.summary,
            url: `${SITE_URL}/work/${item.slug}`,
            image: `${SITE_URL}/work/${item.slug}/opengraph-image`,
            dateCreated: item.year.slice(0, 4),
            genre: item.kind,
            keywords: item.stack.join(", "),
            creator: { "@id": PERSON_ID },
            author: { "@id": PERSON_ID },
            ...(item.links.live ? { sameAs: item.links.live } : {}),
            ...(item.links.code ? { codeRepository: item.links.code } : {}),
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: item.name, path: `/work/${item.slug}` },
          ])
        )}
      />
      {/* Inside the box: the case opens on ink */}
      <header className={s.hero}>
        <div className={`wrap ${s.heroGrid}`}>
          <nav aria-label="Breadcrumb" className={`mono ${s.back}`}>
            <Link href="/">home</Link> / <Link href="/work">work</Link> / <span aria-current="page">{item.slug}</span>
          </nav>
          <p className={`mono ${s.kicker}`}>
            <span className={s.dot} aria-hidden="true" />
            case study · {item.sector} · {item.year}
          </p>
          <StreamHeading as="h1" className={s.title}>
            {item.name}
          </StreamHeading>
          <p className={s.summary}>{item.summary}</p>

          <div className={s.visual}>
            {item.media.image ? (
              <CaseMedia item={item} />
            ) : (
              <div className={s.pipeline}>
                <p className={`mono ${s.pipelineLabel}`}>the pipeline</p>
                <CaseLayers layers={item.arch} tone="ink" label={`${item.name} pipeline`} />
              </div>
            )}
          </div>

          <dl className={s.facts}>
            <div>
              <dt>My role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>For</dt>
              <dd>{item.client}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                {STATUS[item.status]}
                {item.links.live && (
                  <>
                    {" · "}
                    <a href={item.links.live} target="_blank" rel="noopener">
                      {item.links.host} ↗
                    </a>
                  </>
                )}
                {item.links.code && (
                  <>
                    {" · "}
                    <a href={item.links.code} target="_blank" rel="noopener">
                      code ↗
                    </a>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd className="mono">{item.stack.join(" · ")}</dd>
            </div>
          </dl>
          {item.links.note && <p className={`mono ${s.note}`}>{item.links.note}</p>}
        </div>
      </header>

      <Reveal className={s.body}>
        <section className={`wrap ${s.block}`} aria-labelledby="problem">
          <h2 id="problem" className={`mono ${s.label}`}>
            the problem
          </h2>
          <p className={s.problem} data-reveal="">
            {item.problem}
          </p>
        </section>

        <section className={`wrap ${s.block}`} aria-labelledby="built">
          <h2 id="built" className={`mono ${s.label}`}>
            what I built
          </h2>
          <ul className={s.built}>
            {item.built.map((b, k) => (
              <li key={b} data-reveal={k % 2}>
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className={`wrap ${s.block}`} aria-labelledby="decisions">
          <h2 id="decisions" className={`mono ${s.label}`}>
            decisions that mattered
          </h2>
          <div className={s.decisions}>
            {item.decisions.map((d, k) => (
              <article key={d.title} className={s.decision} data-reveal={k % 3}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </section>

        {item.media.image && (
          <section className={`wrap ${s.block}`} aria-labelledby="inside">
            <h2 id="inside" className={`mono ${s.label}`}>
              inside
            </h2>
            <div className={s.inside}>
              <CaseLayers layers={item.arch} label={`${item.name} architecture`} />
              {item.media.gallery?.map((g) => (
                <figure key={g.src} className={s.shot} data-reveal="">
                  <div className={s.shotFrame}>
                    <Image src={g.src} alt={g.alt} fill sizes="(max-width: 900px) 92vw, 40vw" />
                  </div>
                  <figcaption className="mono">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className={`wrap ${s.block}`} aria-labelledby="result">
          <h2 id="result" className={`mono ${s.label}`}>
            result
          </h2>
          <div className={s.result}>
            <ul className={s.results}>
              {item.results.map((r) => (
                <li key={r} data-reveal="">
                  {r}
                </li>
              ))}
            </ul>
            {item.quote && (
              <figure className={s.quote} data-reveal="">
                <blockquote>
                  <p>{item.quote.text}</p>
                </blockquote>
                <figcaption className="mono">— {item.quote.by}</figcaption>
              </figure>
            )}
          </div>
        </section>

        <nav className={`wrap ${s.next}`} aria-label="Next case study">
          <p className={`mono ${s.label}`}>next case study</p>
          <Link href={`/work/${next.slug}`} className={s.nextLink}>
            <span className={s.nextName}>{next.name}</span>
            <span className={s.nextKind}>
              {next.kind} · {next.year}
            </span>
            <span aria-hidden="true" className={s.nextArrow}>
              →
            </span>
          </Link>
          <p className={s.ask}>
            Want something like this?{" "}
            <Link href="/hire">See how I work</Link> or <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`About ${item.name}`)}`}>email me</a>.
          </p>
        </nav>
      </Reveal>
    </main>
  );
}
