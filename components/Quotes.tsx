import Link from "next/link";
import { quotes } from "@/lib/content";
import Reveal from "./Reveal";
import StreamHeading from "./StreamHeading";
import s from "./Quotes.module.css";

/** Client words, verbatim and attributed — each one linked to the system it's about. */
export default function Quotes() {
  return (
    <section className={s.section} aria-labelledby="quotes-title">
      <div className={`wrap ${s.head}`}>
        <span className={s.node} data-trace-node="" aria-hidden="true" />
        <StreamHeading id="quotes-title" className={s.title}>
          In their words.
        </StreamHeading>
        <p className={s.intro}>Unedited, from the people who run these systems every day.</p>
      </div>
      <Reveal className={`wrap ${s.grid}`}>
        {quotes.map((q, i) => (
          <figure key={q.slug} className={s.quote} data-reveal={i}>
            <span className={s.mark} aria-hidden="true">
              “
            </span>
            <blockquote>
              <p>{q.text}</p>
            </blockquote>
            <figcaption>
              <span className="mono">{q.by}</span>
              <Link href={`/work/${q.slug}`}>
                {q.name} case study <span aria-hidden="true">→</span>
              </Link>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
