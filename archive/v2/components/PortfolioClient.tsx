"use client";

import Image from "next/image";
import SmoothScroll from "./SmoothScroll";
import ReelBar from "./ReelBar";
import { useRevealRoot, CountUp } from "./motion";
import { heroProjects, archiveProjects } from "../data/projects";

const MARQUEE = [
  "MERN", "Next.js", "Laravel", "RAG + LangChain", "AWS EC2",
  "CI/CD", "4 live sites", "NCEAC Top Performer",
];

const SERVICES = [
  {
    n: "01", t: "Business Platforms",
    d: "ERP-style back offices, bookings, marketplaces — Laravel or MERN APIs with role-based dashboards that staff actually use.",
    from: "Scoped builds · from $500",
  },
  {
    n: "02", t: "AI Support Agents",
    d: "RAG agents over your docs with LangChain + LangGraph + evals, wired into your site or WhatsApp — not a demo chatbot.",
    from: "Pilots · from $400",
  },
  {
    n: "03", t: "API + Cloud Deploy",
    d: "REST design, JWT auth, MySQL/Mongo schema, AWS EC2 + GitHub Actions pipelines that ship and stay up.",
    from: "API + deploy · from $300",
  },
  {
    n: "04", t: "Care + Iteration",
    d: "After launch: fixes, speed, small features monthly. The reason v1 sites are still live years later.",
    from: "Care · from $120/mo",
  },
];

const STEPS = [
  { b: "1", t: "Scope", d: "One call. Outcome, stack, fixed scope, date." },
  { b: "2", t: "Build", d: "Weekly demos on a staging link. No black box." },
  { b: "3", t: "Harden", d: "Auth, validation, backups, perf pass." },
  { b: "4", t: "Deploy", d: "CI/CD, DNS, monitoring. You own the repo." },
  { b: "5", t: "Iterate", d: "Care plan: fixes + features monthly." },
];

function WorkVisual({ p }: { p: (typeof heroProjects)[number] }) {
  if (p.category === "GenAI") {
    return (
      <div className="work-visual">
        <div className="code-visual" aria-hidden="true">
          <span className="k">$</span> agent.retrieve(<span className="s">“refund policy”</span>)<br />
          <span className="k">→</span> 3 chunks · 0.91 recall · 420ms<br />
          <span className="k">$</span> agent.answer() <span className="s">✓ grounded</span><br />
          evals: faithfulness 0.94 · latency p95
        </div>
        <div className="voverlay" />
      </div>
    );
  }
  // Screenshot slot: harvest 1440×900 WebP per report; typographic stand-in meanwhile
  return (
    <div className="work-visual" data-shot={p.slug} role="img" aria-label={`${p.name} screenshot placeholder`}>
      <span
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 12vw, 150px)",
          lineHeight: 1,
          background: "linear-gradient(160deg, #F4F1EA 30%, rgba(244,241,234,0.25))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          userSelect: "none",
        }}
      >
        {p.name.charAt(0)}
      </span>
      <div className="voverlay" />
      <div className="vbadge">
        <span>{p.live ? "● Live" : "Code"}</span>
        <span className="g">{p.category}</span>
      </div>
    </div>
  );
}

export default function PortfolioClient() {
  const rootRef = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#work">Skip to work</a>
      <SmoothScroll />

      {/* NAV */}
      <nav className="nav" aria-label="Primary">
        <div className="nav-inner">
          <a className="brand" href="#top">D<i>A</i>.</a>
          <div className="nav-links">
            <a href="#work">Works</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-cta">
            <a className="btn ghost" style={{ padding: "9px 18px", fontSize: 13 }} href="/Dawood_Ahmed_CV.pdf" download>CV ↓</a>
            <a className="btn" style={{ padding: "9px 18px", fontSize: 13 }} href="mailto:dawood.bhatti8812@gmail.com">Let&apos;s Talk →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="aurora" aria-hidden="true"><span className="b1" /><span className="b2" /><span className="b3" /></div>
        <div className="wrap hero-grid">
          <div>
            <span className="badge rv"><span className="dot" /> Available Q4 2026 · MERN · Laravel · GenAI</span>
            <h1 className="display rv rv-d1" style={{ marginTop: 22 }}>
              I build<br />digital <span className="goldword">experiences</span><br />that ship.
            </h1>
            <p className="hero-sub rv rv-d2">
              I&apos;m <strong>Dawood Ahmed</strong>, a Full-Stack Developer creating clean,
              production business platforms + AI agents — 3+ years, 25+ projects, 4 live sites.
            </p>
            <div className="hero-ctas rv rv-d3">
              <a className="btn" href="#work">View My Works</a>
              <a className="btn ghost" href="/Dawood_Ahmed_CV.pdf" download>Download CV ↓</a>
            </div>
            <div className="hero-tags rv rv-d4">
              {["TypeScript", "Next.js", "Laravel API", "RAG", "AWS EC2", "CI/CD"].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <div className="portrait-stage rv rv-d2">
            <figure className="portrait" style={{ margin: 0 }}>
              <Image src="/portrait-800.webp" alt="Studio portrait of Dawood Ahmed" width={800} height={1000} priority />
              <figcaption>NCEAC Top Performer 2026 · Techling Full-Stack</figcaption>
            </figure>
            <div className="portrait-card"><strong>4 live sites</strong>ibrahim · emasjid · biks · sugarhills</div>
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <div className="strip" aria-label="Stack and proof">
        <div className="marquee">
          {[0, 1].map((k) => (
            <span key={k}>
              {MARQUEE.map((m) => <i key={`${k}-${m}`}>✦ {m}</i>)}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ paddingTop: 56, paddingBottom: 0 }}>
        <div className="wrap">
          <div className="stats rv">
            <div className="stat"><b><CountUp to={25} suffix="+" /></b><span>Projects shipped, freelance + full-time</span></div>
            <div className="stat"><b><CountUp to={4} /></b><span>Live client sites you can open now</span></div>
            <div className="stat"><b><CountUp to={3} suffix="+" /></b><span>Years experience, Oct 2023 →</span></div>
            <div className="stat"><b><em>#1</em></b><span>NCEAC GenAI Top Performer 2026</span></div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="wrap">
          <div className="sec-head rv">
            <p className="eyebrow">Featured works</p>
            <h2 className="display">Selected works.<br /><span className="goldword">Engineered value.</span></h2>
            <p>Scroll for the system-architecture cards. Each platform was built to solve complex operational problems — open the live ones, read the code for the rest.</p>
          </div>
          <div className="work-grid">
            {heroProjects.map((p, i) => (
              <article key={p.slug} className={`work-card rv rv-d${(i % 4) + 1}`}>
                <WorkVisual p={p} />
                <div className="work-body">
                  <span className="mono-label">{p.category} · {p.stack.slice(0, 3).join(" · ")}</span>
                  <h3>{p.live ? <a href={p.live} target="_blank" rel="noreferrer">{p.name} ↗</a> : p.name}</h3>
                  <p className="outcome">{p.headline}.</p>
                  <p className="desc">{p.description}</p>
                  <div className="work-links">
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer">↗ Live demo</a>}
                    {p.github && !p.private && <a href={p.github} target="_blank" rel="noreferrer">⌁ GitHub</a>}
                    {p.private && <span className="priv">Private client code · demo on call</span>}
                    {!p.live && p.github && <span className="priv">GitHub-only · diagram + Loom on request</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section id="archive" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">More builds — range</p>
          <div className="archive-grid">
            {archiveProjects.map((p, i) => (
              <article key={p.slug} className={`mini rv rv-d${(i % 3) + 1}`}>
                <span className="chip">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.headline}</p>
                <a href={p.github} target="_blank" rel="noreferrer">⌁ GitHub</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <p className="eyebrow">Services I provide</p>
            <h2 className="display">What hiring me<br /><span className="goldword">gets you.</span></h2>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <div key={s.n} className={`svc rv rv-d${(i % 4) + 1}`}>
                <span className="n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="from">{s.from}</span>
              </div>
            ))}
          </div>
          <div className="engage rv">
            <div className="engage-row">
              <strong>Fixed scope</strong>
              <span>Defined outcome, date, price. Best for launches.</span>
              <a className="btn ghost" style={{ padding: "9px 18px", fontSize: 13 }} href="mailto:dawood.bhatti8812@gmail.com?subject=Fixed%20scope%20project">Start →</a>
            </div>
            <div className="engage-row">
              <strong>Care plan</strong>
              <span>Fixes + speed + small features, monthly. Sites stay alive.</span>
              <a className="btn ghost" style={{ padding: "9px 18px", fontSize: 13 }} href="mailto:dawood.bhatti8812@gmail.com?subject=Care%20plan">Ask →</a>
            </div>
            <div className="engage-row">
              <strong>Full-time</strong>
              <span>Join your team. MERN + Laravel + GenAI, remote worldwide.</span>
              <a className="btn ghost" style={{ padding: "9px 18px", fontSize: 13 }} href="https://linkedin.com/in/dawood-ahmed-8953b63a2" target="_blank" rel="noreferrer">LinkedIn →</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">How I work</p>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={s.b} className={`step rv rv-d${(i % 5) + 1}`}>
                <b>{s.b}</b>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-big" id="contact">
        <div className="aurora" aria-hidden="true"><span className="b2" /></div>
        <div className="wrap">
          <p className="eyebrow rv" style={{ justifyContent: "center" }}>Have a project in mind?</p>
          <h2 className="display rv rv-d1">Let&apos;s <span className="goldword">talk.</span></h2>
          <div className="row rv rv-d2">
            <a className="btn" href="mailto:dawood.bhatti8812@gmail.com">Email me</a>
            <a className="btn ghost" href="https://github.com/dawood125" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn ghost" href="https://linkedin.com/in/dawood-ahmed-8953b63a2" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn gold-ghost" href="tel:+923261959755">+92 326 1959755</a>
          </div>
          <p className="mono-label cta-meta rv rv-d3">Lahore PK · remote worldwide · replies within 24h</p>
        </div>
      </section>

      <footer>
        <div className="wrap foot-grid">
          <span className="mono-label">© 2026 Dawood Ahmed · MERN · Next.js · Laravel · GenAI</span>
          <span className="mono-label">Zero-3D · transform-only motion · DOM-first SEO</span>
        </div>
      </footer>

      <ReelBar />
    </div>
  );
}
