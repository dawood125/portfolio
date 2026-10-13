import type { Metadata } from "next";
import Link from "next/link";
import { profile, SITE_URL } from "@/lib/content";
import { breadcrumbs, graph, PERSON_ID } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import StreamHeading from "@/components/StreamHeading";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Hire Dawood Ahmed — systems, websites, Shopify & AI",
  description:
    "Hire a full-stack developer for POS and inventory systems, booking and catalogue websites, Shopify stores and AI assistants on your documents. Quoted per project.",
  alternates: { canonical: "/hire" },
};

// Every service points at the work that proves it.
const SERVICES = [
  {
    title: "Business systems",
    body: "POS, inventory and back-office software for the way your business actually runs — online, or as an offline desktop install.",
    proof: [{ label: "AIWA Flow", href: "/work/aiwa-flow" }],
  },
  {
    title: "Websites that bring in work",
    body: "Fast, search-friendly sites with booking or catalogue flows, enquiries routed where you answer them, and more than one language when you need it.",
    proof: [
      { label: "SugarHills Resort", href: "/work/sugarhills" },
      { label: "BIKKS Trading", href: "/work/bikks" },
    ],
  },
  {
    title: "Shopify stores",
    body: "Custom themes and a catalogue structure built around how your customers shop — not a generic template.",
    proof: [{ label: "DIVERSITY", href: "/work/diversity" }],
  },
  {
    title: "AI assistants on your own documents",
    body: "An assistant that answers customers from your policies and files, shows where each answer came from, and says when it doesn't know.",
    proof: [
      { label: "NeuralDesk", href: "/work/neuraldesk" },
      { label: "the Ask console on this site", href: "/#ask" },
    ],
  },
];

const STEPS = [
  { t: "A short call", d: "You tell me what's slow, manual or breaking. I ask a lot of questions." },
  { t: "A written scope", d: "What I'll build, what I won't, when it's ready, and the quote." },
  { t: "Build", d: "You see it working as it comes together, not only at the end." },
  { t: "Launch", d: "Deployed online, or installed on site and set up for your team." },
  { t: "After launch", d: "Fixes and improvements as your business uses it." },
];

const FAQ = [
  {
    q: "How much does a project cost?",
    a: "Every project is quoted after a short call, based on what it needs to do. You get the price in writing before anything starts.",
  },
  {
    q: "You're in Pakistan — how does that work for my time zone?",
    a: `I'm on ${profile.tzLabel} and already work with clients in Japan and India. We agree on a time for calls, and email or WhatsApp in between.`,
  },
  {
    q: "Are you looking for a full-time role too?",
    a: "Yes — remote or on-site. Recruiters, the résumé page has everything in one place.",
    link: { label: "Open the résumé", href: "/resume" },
  },
];

const BRIEF = encodeURIComponent(
  "Hi Dawood,\n\nWhat my business does:\n\nWhat's slow, manual or breaking:\n\nWhat I'd like built:\n\nWhen I need it by:\n\nBest way to reach me:\n"
);

export default function Hire() {
  return (
    <main id="main" className={s.page}>
      <JsonLd
        data={graph(
          {
            "@type": "ItemList",
            "@id": `${SITE_URL}/hire#services`,
            name: "Services by Dawood Ahmed",
            itemListElement: SERVICES.map((sv, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Service", name: sv.title, description: sv.body, provider: { "@id": PERSON_ID }, areaServed: "Worldwide" },
            })),
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Hire", path: "/hire" },
          ])
        )}
      />
      <header className={`wrap ${s.hero}`}>
        <p className={`mono ${s.kicker}`}>hire · freelance and full-time</p>
        <StreamHeading as="h1" className={s.title}>
          Tell me what&apos;s slow, manual or breaking.
        </StreamHeading>
        <p className={s.lede}>
          I build the software a business runs on — and I&apos;m available now. No price list: every project is quoted after
          a short call.
        </p>
        <div className={s.ctas}>
          <a className="btn" href={`mailto:${profile.email}?subject=Project%20enquiry&body=${BRIEF}`} data-track="hire_brief">
            Email a short brief <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn btn--ghost" href={profile.whatsapp} target="_blank" rel="noopener">
            WhatsApp {profile.phone}
          </a>
        </div>
      </header>

      <Reveal>
        <section className={`wrap ${s.block}`} aria-labelledby="services">
          <h2 id="services" className={`mono ${s.label}`}>
            what I build
          </h2>
          <div className={s.services}>
            {SERVICES.map((sv, i) => (
              <article key={sv.title} className={s.service} data-reveal={i % 2}>
                <h3>{sv.title}</h3>
                <p>{sv.body}</p>
                <p className={`mono ${s.proof}`}>
                  proof:{" "}
                  {sv.proof.map((p, k) => (
                    <span key={p.href}>
                      {k > 0 && " · "}
                      <Link href={p.href}>{p.label}</Link>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={`wrap ${s.block}`} aria-labelledby="process">
          <h2 id="process" className={`mono ${s.label}`}>
            how it works
          </h2>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.t} data-reveal={i}>
                <span className={`mono ${s.stepN}`}>{i + 1}</span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`wrap ${s.block}`} aria-labelledby="faq">
          <h2 id="faq" className={`mono ${s.label}`}>
            questions
          </h2>
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q} data-reveal="">
                <summary>{f.q}</summary>
                <p>
                  {f.a}{" "}
                  {f.link && (
                    <Link href={f.link.href}>
                      {f.link.label} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
