import { Link } from "react-router-dom";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { ProjectCarousel } from "../work/ProjectCarousel.jsx";
import { projects } from "../../data/projects.js";

/** Home: the projects as a draggable carousel, then a link to the full index. */
export function Work() {
  return (
    <section
      id="work"
      data-spine="01 · Missions"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="01"
        label="Mission Control"
        meta={`${String(projects.length).padStart(2, "0")} logged`}
        titleLines={["Selected", "missions"]}
        lead="A family investment platform with ML risk models, an expense tracker built twice on purpose, and console systems grounded in hand-written data structures."
      />

      <div className="mt-12">
        <ProjectCarousel />
        <div className="mt-8">
          <Link
            to="/projects"
            className="link-underline font-mono text-[0.75rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            All missions →
          </Link>
        </div>
      </div>
    </section>
  );
}
