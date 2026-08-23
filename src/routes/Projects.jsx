import { Section } from "../components/ui/Section.jsx";
import { PageEyebrow } from "../components/common/PageEyebrow.jsx";
import { SignalField } from "../components/hero/SignalField.jsx";
import { ProjectGrid } from "../components/projects/ProjectGrid.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <>
      <div className="relative h-40 overflow-hidden md:h-52">
        <SignalField density={0.5} interactive={false} className="opacity-60" />
      </div>
      <Section className="pt-8">
        <PageEyebrow>// launch log</PageEyebrow>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Things I've launched
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">
          Five missions spanning Python-driven data & AI platforms, full-stack development, and
          Core Java systems built around solid data structures.
        </p>

        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </Section>
    </>
  );
}
