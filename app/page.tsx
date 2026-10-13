import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import AskConsole from "@/components/AskConsole";
import Trace from "@/components/Trace";
import LiveSystems from "@/components/LiveSystems";
import Quotes from "@/components/Quotes";
import AiwaMap from "@/components/AiwaMap";
import Retrieval from "@/components/Retrieval";
import StackMatrix from "@/components/StackMatrix";
import Seasons from "@/components/Seasons";
import { checkLiveSystems } from "@/lib/status";
import { findIntroVideo } from "@/lib/intro-media";

// Live-system status is measured when the page regenerates.
export const revalidate = 300;

function nowInPkt() {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default async function Home() {
  const status = await checkLiveSystems();
  const introVideo = findIntroVideo();

  return (
    <>
      <Intro />
      <main id="main">
        <Hero introVideo={introVideo} />
        <AskConsole />
        <div className="traced">
          <LiveSystems status={status} />
          <Quotes />
          <AiwaMap />
          <Retrieval />
          <StackMatrix />
          <Seasons now={nowInPkt()} />
          {/* Last, so it paints over the sections and its difference blend reads on paper and ink alike. */}
          <Trace />
        </div>
      </main>
    </>
  );
}
