import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { DevTimeline } from "../components/about/DevTimeline.jsx";
import { Toolbox } from "../components/about/Toolbox.jsx";
import { BuildProcess } from "../components/about/BuildProcess.jsx";
import { LabActivity } from "../components/about/LabActivity.jsx";
import { EducationTimeline } from "../components/about/EducationTimeline.jsx";
import { BeyondTheCode } from "../components/about/BeyondTheCode.jsx";
import { certifications } from "../data/certifications.js";
import { profile } from "../data/profile.js";

export default function About() {
  return (
    <>
      <Section className="pb-0 pt-24 md:pt-28">
        <p className="label-mono text-[var(--color-fg-subtle)]">The Researcher</p>

        <RevealLines
          as="h1"
          animateOnMount
          className="mt-8 text-h1 font-display font-semibold"
          lines={[
            "I turn messy problems",
            <span key="l2">
              into <span className="accent-italic">systems</span>.
            </span>,
          ]}
        />

        <p className="container-prose mt-10 text-lead text-[var(--color-fg-muted)]">
          {profile.bio}
        </p>
      </Section>

      <Section>
        <SectionHeader
          index="01"
          label="The Timeline"
          meta="2024 — 2028"
          titleLines={[
            "A development",
            <span key="l2" className="accent-italic">
              timeline
            </span>,
          ]}
          lead="Not a job history — a record of what got built and what got learned, year by year, drawn from the material on this site."
        />
        <div className="mt-16">
          <DevTimeline />
        </div>
      </Section>

      <Section id="skills">
        <SectionHeader
          index="02"
          label="The Toolbox"
          meta="07 Drawers"
          titleLines={[
            "The",
            <span key="l2" className="accent-italic">
              toolbox
            </span>,
          ]}
          lead="Python at the centre, everything else growing out from it. Pick a drawer to see what's in it and what it connects to — no ratings, because a number next to a language measures nothing."
        />
        <div className="mt-16">
          <Toolbox />
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="03"
          label="How I Build"
          meta="04 Stages"
          titleLines={[
            "How I",
            <span key="l2" className="accent-italic">
              build
            </span>,
          ]}
        />
        <div className="mt-16">
          <BuildProcess />
        </div>
      </Section>

      <Section>
        <SectionHeader index="04" label="Lab Activity" meta="Telemetry" />
        <div className="mt-14">
          <LabActivity />
        </div>
      </Section>

      <Section>
        <SectionHeader index="05" label="Education" meta="2021 — 2028" />
        <div className="mt-16">
          <EducationTimeline />
        </div>
      </Section>

      <Section>
        <SectionHeader index="06" label="Beyond the Code" />
        <div className="mt-16">
          <BeyondTheCode />
        </div>
      </Section>

      <Section className="pb-28 md:pb-40">
        <SectionHeader
          index="07"
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
