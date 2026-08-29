import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { ProjectIndex } from "../components/projects/ProjectIndex.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <Section className="pt-16 md:pt-20">
      <SectionHeader
        label="Work"
        meta={`${String(projects.length).padStart(2, "0")} Projects`}
        titleLines={[
          "Selected",
          <span key="l2" className="accent-italic text-[var(--color-accent)]">
            work
          </span>,
        ]}
        titleClassName="text-h1"
        lead="Five projects spanning Python-driven data and AI platforms, full-stack development, and Core Java systems built around solid data structures."
      />

      <div className="mt-16">
        <ProjectIndex projects={projects} />
      </div>
    </Section>
  );
}
