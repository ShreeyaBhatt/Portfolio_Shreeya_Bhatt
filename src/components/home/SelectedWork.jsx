import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section.jsx";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { ProjectIndex } from "../projects/ProjectIndex.jsx";
import { projects } from "../../data/projects.js";

/** The three projects that best argue the case, with the rest a click away. */
const FEATURED_COUNT = 3;

export function SelectedWork() {
  return (
    <Section>
      <SectionHeader
        index="01"
        label="Selected Work"
        meta={`${String(projects.length).padStart(2, "0")} Projects`}
        titleLines={[
          "Things I've",
          <span key="l2">
            actually <span className="accent-italic text-[var(--color-accent)]">shipped</span>
          </span>,
        ]}
        lead="Machine learning inside real products, full-stack platforms, and systems built from the data structures up."
      />

      <div className="mt-16">
        <ProjectIndex projects={projects.slice(0, FEATURED_COUNT)} />
      </div>

      <Link
        to="/projects"
        data-cursor-hover
        className="group mt-10 inline-flex items-center gap-3 text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
      >
        <span className="link-underline text-lead font-medium">View all work</span>
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      </Link>
    </Section>
  );
}
