import type { ArchLayer } from "@/lib/content";
import s from "./CaseLayers.module.css";

/** The "inside" of a system: its layers, top to bottom, with a request packet travelling down. Pure CSS motion. */
export default function CaseLayers({ layers, tone = "paper", label }: { layers: ArchLayer[]; tone?: "paper" | "ink"; label: string }) {
  return (
    <ol className={s.layers} data-tone={tone} aria-label={label}>
      {layers.map((l, i) => (
        <li key={l.layer} className={s.layer} data-reveal={i}>
          {i > 0 && <span className={s.link} aria-hidden="true" />}
          <span className={`mono ${s.name}`}>{l.layer}</span>
          <strong className={s.tech}>{l.tech}</strong>
          <span className={s.does}>{l.does}</span>
        </li>
      ))}
    </ol>
  );
}
