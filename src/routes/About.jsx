import { Section } from "../components/ui/Section.jsx";
import { SectionHeading } from "../components/common/SectionHeading.jsx";
import { EducationTimeline } from "../components/about/EducationTimeline.jsx";
import { SkillsBento } from "../components/about/SkillsBento.jsx";
import { GithubIdentityBlock } from "../components/about/GithubIdentityBlock.jsx";
import { CertificationsList } from "../components/about/CertificationsList.jsx";
import { profile } from "../data/profile.js";

export default function About() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <p className="font-mono text-sm text-[var(--color-accent)]">// about</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Hi, I'm {profile.name.split(" ")[0]}.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">{profile.bio}</p>
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
        <SectionHeading eyebrow="// certifications" title="Certifications" />
        <CertificationsList />
      </Section>
    </>
  );
}
