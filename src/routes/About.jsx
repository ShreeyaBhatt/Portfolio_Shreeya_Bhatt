import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { EducationTimeline } from "../components/about/EducationTimeline.jsx";
import { SkillsCarousel } from "../components/about/SkillsCarousel.jsx";
import { GithubIdentityBlock } from "../components/about/GithubIdentityBlock.jsx";
import { BeyondTheCode } from "../components/about/BeyondTheCode.jsx";
import { certifications } from "../data/certifications.js";
import { profile } from "../data/profile.js";

export default function About() {
  const firstName = profile.name.split(" ")[0];

  return (
    <>
      <Section className="pb-0 pt-16 md:pt-20">
        <p className="label-mono text-[var(--color-fg-subtle)]">About</p>

        <RevealLines
          as="h1"
          animateOnMount
          className="mt-8 text-h1 font-display font-medium"
          lines={[
            `Hi, I'm ${firstName}.`,
            <span key="l2">
              I build{" "}
              <span className="accent-italic text-[var(--color-accent)]">software</span>.
            </span>,
          ]}
        />

        <p className="container-prose mt-10 text-lead text-[var(--color-fg-muted)]">
          {profile.bio}
        </p>
      </Section>

      <Section>
        <SectionHeader index="01" label="Education" meta="2021 — 2028" />
        <div className="mt-16">
          <EducationTimeline />
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="02"
          label="Skills"
          meta="05 Categories"
          titleLines={[
            "What I work",
            <span key="l2" className="accent-italic text-[var(--color-accent)]">
              with
            </span>,
          ]}
          lead="Five groups, one panel each — swipe or use the arrows to move through them."
        />
        <div className="mt-16">
          <SkillsCarousel />
        </div>
      </Section>

      <Section>
        <SectionHeader index="03" label="GitHub" meta="Open source" />
        <div className="mt-16">
          <GithubIdentityBlock />
        </div>
      </Section>

      <Section>
        <SectionHeader index="04" label="Beyond the code" />
        <div className="mt-16">
          <BeyondTheCode />
        </div>
      </Section>

      <Section className="pb-28 md:pb-40">
        <SectionHeader
          index="05"
          label="Credentials"
          meta={`${String(certifications.length).padStart(2, "0")} Completed`}
          lead={`${certifications.length} certifications so far, spanning Python, machine learning, web fundamentals, Java, and version control.`}
        />
        <Link
          to="/certifications"
          data-cursor-hover
          className="group mt-10 inline-flex items-center gap-3 text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
        >
          <span className="link-underline text-lead font-medium">View all credentials</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </Link>
      </Section>
    </>
  );
}
