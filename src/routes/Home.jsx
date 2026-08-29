import { Hero } from "../components/home/Hero.jsx";
import { Marquee } from "../components/common/Marquee.jsx";
import { Stats } from "../components/home/Stats.jsx";
import { Work } from "../components/home/Work.jsx";
import { Approach } from "../components/home/Approach.jsx";
import { BeyondCode } from "../components/home/BeyondCode.jsx";
import { ContactCta } from "../components/home/ContactCta.jsx";
import { profile } from "../data/profile.js";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        items={profile.marquee}
        durationSeconds={55}
        className="relative z-10 border-y border-[var(--color-border)] bg-[var(--color-bg)]"
      />
      <Stats />
      <Work />
      <Approach />
      <BeyondCode />
      <ContactCta />
    </>
  );
}
