import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { ExperimentIndex } from "../components/projects/ExperimentIndex.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <Section className="pt-24 md:pt-28">
      <SectionHeader
        label="Experiments"
        meta={`${String(projects.length).padStart(2, "0")} Logged`}
        titleLines={[
          "The",
          <span key="l2" className="accent-italic">
            experiment log
          </span>,
        ]}
        titleClassName="text-h1"
        lead="Five entries spanning Python-driven data and AI platforms, full-stack development, and Core Java systems built around solid data structures. Hover an entry for its readout; open it for the full case study."
      />

      <div className="mt-16">
        <ExperimentIndex projects={projects} />
      </div>
    </Section>
  );
}
