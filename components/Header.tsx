import { profile } from "@/lib/content";
import MotionToggle from "./MotionToggle";
import UrduMark from "./UrduMark";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header} data-site-header="">
      <div className={`wrap ${s.bar}`}>
        <a className={s.mark} href="#top" aria-label="Dawood Ahmed — back to top">
          <span className={s.markName}>Dawood Ahmed</span>
          <UrduMark className={s.markUrdu} title="" />
        </a>
        <nav aria-label="Primary" className={s.nav}>
          <a href="#work">Work</a>
          <a href="#ask">Ask</a>
          <a href={profile.cv}>Résumé</a>
          <a href={`mailto:${profile.email}?subject=Project%20enquiry`}>Hire</a>
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
