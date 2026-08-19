import { Section } from "../components/ui/Section.jsx";
import { SectionHeading } from "../components/common/SectionHeading.jsx";
import { Link } from "react-router-dom";
import { EducationTimeline } from "../components/about/EducationTimeline.jsx";
import { SkillsBento } from "../components/about/SkillsBento.jsx";
import { GithubIdentityBlock } from "../components/about/GithubIdentityBlock.jsx";
import { BeyondTheCode } from "../components/about/BeyondTheCode.jsx";
import { ProfilePhoto } from "../components/common/ProfilePhoto.jsx";
import { certifications } from "../data/certifications.js";
import { profile } from "../data/profile.js";

export default function About() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-sm text-[var(--color-accent)]">// about</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Hi, I'm {profile.name.split(" ")[0]}.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">{profile.bio}</p>
          </div>
          <ProfilePhoto className="h-28 w-28 shrink-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-raised)] sm:h-36 sm:w-36" />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// education" title="Education" />
        <EducationTimeline />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// skills" title="Skills" />
        <SkillsBento />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// open source" title="GitHub" />
        <GithubIdentityBlock />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// beyond the code" title="A little more about me" />
        <BeyondTheCode />
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="// certifications" title="Certifications" />
        <p className="-mt-6 mb-8 max-w-2xl text-[var(--color-fg-muted)]">
          {certifications.length} certifications completed so far, spanning Python, machine
          learning, web fundamentals, Java, and version control.
        </p>
        <Link
          to="/certifications"
          data-cursor-hover
          className="inline-flex items-center gap-1 font-medium text-[var(--color-accent)] hover:underline"
        >
          View all certifications & credentials →
        </Link>
      </Section>
    </>
  );
}
