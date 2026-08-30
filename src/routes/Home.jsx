import { Hero } from "../components/home/Hero.jsx";
import { Marquee } from "../components/common/Marquee.jsx";
import { Intro } from "../components/home/Intro.jsx";
import { Uplink } from "../components/home/Uplink.jsx";
import { Channels } from "../components/home/Channels.jsx";
import { profile } from "../data/profile.js";

/**
 * COMMAND DECK — the introduction, then the way in.
 *
 * Identity and one honest sentence (Hero) → the working vocabulary (Marquee)
 * → a plain-language briefing on what the work consists of (Intro) → the
 * GitHub telemetry read (Uplink) → three routes with honest previews
 * (Channels). No sealed doors — just enough to make a visitor curious about
 * the pages behind it.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        items={profile.marquee}
        durationSeconds={55}
        className="relative z-10 border-y border-[var(--color-border)] bg-[var(--color-bg)]"
      />
      <Intro />
      <Uplink />
      <Channels />
    </>
  );
}
