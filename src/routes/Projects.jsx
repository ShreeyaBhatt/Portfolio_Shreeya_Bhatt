import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { MissionPanel } from "../components/work/MissionPanel.jsx";
import { projects } from "../data/projects.js";

/** MISSION CONTROL — every project as a mission, featured first. */
export default function Projects() {
  const ordered = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <Section className="pt-28 md:pt-32">
      <SectionHeader
        index="02"
        label="Mission Control"
        meta={`${String(projects.length).padStart(2, "0")} missions logged`}
        titleLines={["Selected", "missions"]}
        titleClassName="text-h1"
        lead="Python-driven data and AI platforms, full-stack builds, and Core Java systems grounded in hand-written data structures. Open any mission for the full brief."
      />

      <div className="mt-10">
        {ordered.map((project, i) => (
          <MissionPanel
            key={project.slug}
            project={project}
            index={i}
            flip={i % 2 === 1}
            number={projects.findIndex((p) => p.slug === project.slug) + 1}
          />
        ))}
        <div className="border-t border-[var(--color-border)]" />
      </div>
    </Section>
  );
}
