import { HeroContent } from "../components/hero/HeroContent.jsx";
import { Marquee } from "../components/common/Marquee.jsx";
import { SelectedWork } from "../components/home/SelectedWork.jsx";
import { Capabilities } from "../components/home/Capabilities.jsx";
import { AboutTeaser } from "../components/home/AboutTeaser.jsx";
import { ContactCta } from "../components/home/ContactCta.jsx";
import { profile } from "../data/profile.js";

/**
 * The home page is a single scroll narrative, numbered end to end:
 * hero → what I work with → the work → what I do → who I am → how to reach me.
 * Everything below the hero is a section a visitor could stop at and still
 * have learned something worth knowing.
 */
export default function Home() {
  return (
    <>
      <HeroContent />
      <Marquee items={profile.marquee} durationSeconds={50} />
      <SelectedWork />
      <Capabilities />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
