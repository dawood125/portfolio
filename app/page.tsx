import Intro from "@/components/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AskConsole from "@/components/AskConsole";
import Trace from "@/components/Trace";
import LiveSystems from "@/components/LiveSystems";
import { checkLiveSystems } from "@/lib/status";
import { findIntroVideo } from "@/lib/intro-media";
import { profile } from "@/lib/content";

// Live-system status is measured when the page regenerates.
export const revalidate = 300;

export default async function Home() {
  const status = await checkLiveSystems();
  const introVideo = findIntroVideo();

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Intro />
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero introVideo={introVideo} />
        <AskConsole />
        <div className="traced">
          <Trace />
          <LiveSystems status={status} />
        </div>
      </main>
      <footer className="prototype-foot">
        <div className="wrap">
          <p className="mono">
            Glass Box · prototype step 1 — hero, Ask console, live systems. Case studies, résumé and hire pages come next.
          </p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </footer>
    </>
  );
}
