import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { ExperimentLog } from "../components/journal/ExperimentLog.jsx";
import { experimentLog } from "../data/log.js";

export default function Journal() {
  return (
    <Section className="pb-28 pt-24 md:pb-40 md:pt-28">
      <SectionHeader
        label="Journal"
        meta={`${String(experimentLog.length).padStart(2, "0")} Entries`}
        titleLines={[
          "The experiment",
          <span key="l2" className="accent-italic">
            log
          </span>,
        ]}
        titleClassName="text-h1"
        lead="A running notebook — what I'm reading, trying, and learning right now. Notes, not finished work, and updated by hand."
      />

      <div className="mt-16">
        <ExperimentLog />
      </div>
    </Section>
  );
}
