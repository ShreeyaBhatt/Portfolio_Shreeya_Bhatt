import { Hero } from "../components/hero/Hero.jsx";
import { Marquee } from "../components/common/Marquee.jsx";
import { FeaturedExperiment } from "../components/projects/FeaturedExperiment.jsx";
import { SelectedWork } from "../components/home/SelectedWork.jsx";
import { Capabilities } from "../components/home/Capabilities.jsx";
import { AboutTeaser } from "../components/home/AboutTeaser.jsx";
import { ContactCta } from "../components/home/ContactCta.jsx";
import { projects } from "../data/projects.js";
import { profile } from "../data/profile.js";

/**
 * The lab, as one scroll: initialization → the working vocabulary → the lead
 * experiment → the rest of the log → what the work consists of → the person
 * behind it → how to start something. Every section stands on its own.
 */
export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];

  return (
    <>
      <Hero />
      <Marquee items={profile.marquee} durationSeconds={50} />
      <FeaturedExperiment project={featured} />
      <SelectedWork />
      <Capabilities />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
