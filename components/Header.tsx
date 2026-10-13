import Link from "next/link";
import { profile } from "@/lib/content";
import MotionToggle from "./MotionToggle";
import UrduMark from "./UrduMark";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header} data-site-header="">
      <div className={`wrap ${s.bar}`}>
        <Link className={s.mark} href="/" aria-label="Dawood Ahmed — home">
          <span className={s.markName}>Dawood Ahmed</span>
          <UrduMark className={s.markUrdu} title="" />
        </Link>
        <nav aria-label="Primary" className={s.nav}>
          <Link href="/work">Work</Link>
          <a href="/#inside">Inside</a>
          <a href="/#ask">Ask</a>
          <Link href="/resume">Résumé</Link>
          <Link href="/hire">Hire</Link>
        </nav>
        <div className={s.tools}>
          <MotionToggle className={s.toggle} />
          <a className={`btn ${s.cta}`} href={`mailto:${profile.email}`}>
            Email me
          </a>
        </div>
      </div>
    </header>
  );
}
