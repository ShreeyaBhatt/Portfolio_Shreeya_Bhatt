import { Section } from "../components/ui/Section.jsx";
import { SectionHeading } from "../components/common/SectionHeading.jsx";
import { PageEyebrow } from "../components/common/PageEyebrow.jsx";
import { Link } from "react-router-dom";
import { EducationTimeline } from "../components/about/EducationTimeline.jsx";
import { SkillsConstellation } from "../components/about/SkillsConstellation.jsx";
import { GithubIdentityBlock } from "../components/about/GithubIdentityBlock.jsx";
import { BeyondTheCode } from "../components/about/BeyondTheCode.jsx";
import { certifications } from "../data/certifications.js";
import { profile } from "../data/profile.js";

export default function About() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <PageEyebrow>// mission log</PageEyebrow>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Hi, I'm {profile.name.split(" ")[0]}.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">{profile.bio}</p>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// training orbit" title="Education" />
        <EducationTimeline />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// star map" title="Skills" />
        <SkillsConstellation />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// mission control" title="GitHub" />
        <GithubIdentityBlock />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// beyond the orbit" title="A little more about me" />
        <BeyondTheCode />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// flight certifications" title="Certifications" />
        <p className="-mt-6 mb-8 max-w-2xl text-[var(--color-fg-muted)]">
          {certifications.length} certifications completed so far, spanning Python, machine
          learning, web fundamentals, Java, and version control.
        </p>
        <Link
          to="/certifications"
          data-cursor-hover
          className="inline-flex items-center gap-1 font-medium text-[var(--color-accent)] hover:underline"
        >
          View the full certification log →
        </Link>
      </Section>
    </>
  );
}
