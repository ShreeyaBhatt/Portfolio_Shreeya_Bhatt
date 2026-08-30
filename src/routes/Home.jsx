import { Hero } from "../components/home/Hero.jsx";
import { Marquee } from "../components/common/Marquee.jsx";
import { Uplink } from "../components/home/Uplink.jsx";
import { Channels } from "../components/home/Channels.jsx";
import { profile } from "../data/profile.js";

/**
 * COMMAND DECK — deliberately sparse.
 *
 * The old home page summarised every other route inline (a projects carousel,
 * full capability write-ups, the crew log, a contact block) — so there was no
 * reason to go anywhere. This one gives the visitor the identity (Hero +
 * avatar) and one honest GitHub telemetry read, then three *encrypted*
 * channel cards: enough to know what's behind each door, not enough to skip
 * walking through it. Each card's preview matches the route it opens.
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
      <Uplink />
      <Channels />
    </>
  );
}
