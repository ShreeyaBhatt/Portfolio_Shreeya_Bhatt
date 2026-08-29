import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section.jsx";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { ExperimentIndex } from "../projects/ExperimentIndex.jsx";
import { projects } from "../../data/projects.js";

/**
 * The rest of the log, beneath the featured experiment. WealthNest is
 * `projects[0]` and gets its own block upstream, so this lists the remainder
 * and numbers them from 002.
 */
export function SelectedWork() {
  const rest = projects.slice(1);

  return (
    <Section id="experiments">
      <SectionHeader
        index="01"
        label="Experiments"
        meta={`${String(projects.length).padStart(2, "0")} Logged`}
        titleLines={[
          "The",
          <span key="l2" className="accent-italic">
            log
          </span>,
        ]}
        lead="Machine learning inside real products, full-stack platforms, and console systems built from the data structures up. Each entry opens as a short case study."
      />

      <div className="mt-16">
        <ExperimentIndex projects={rest} startIndex={2} />
      </div>

      <Link
        to="/projects"
        data-cursor-hover
        className="group mt-10 inline-flex items-center gap-3 text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
      >
        <span className="link-underline text-lead font-medium">All experiments</span>
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      </Link>
    </Section>
  );
}
