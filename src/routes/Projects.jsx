import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { WorkSpread } from "../components/work/WorkSpread.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <Section className="pt-28 md:pt-32">
      <SectionHeader
        label="Work"
        meta={`${String(projects.length).padStart(2, "0")} projects`}
        titleLines={["Selected", "work"]}
        titleClassName="text-h1"
        lead="Python-driven data and AI platforms, full-stack development, and Core Java systems built around hand-written data structures. Open any entry for the full case study."
      />

      <div className="mt-14">
        {projects.map((project, i) => (
          <WorkSpread key={project.slug} project={project} index={i} />
        ))}
        <div className="border-t border-[var(--color-border)]" />
      </div>
    </Section>
  );
}
