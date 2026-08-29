import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Section } from "../ui/Section.jsx";
import { Button } from "../ui/Button.jsx";
import { RevealLines } from "../common/RevealLines.jsx";
import { ExperimentDiagram } from "./ExperimentDiagram.jsx";
import { GithubIcon } from "../common/icons.jsx";
import { getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The lead experiment, given a full block of its own above the index: an
 * architecture plate with its subsystems called out around it, the framing
 * problem, and the ways in. It reads as the product-architecture diagram the
 * brief asks for — the one project a visitor should understand in depth before
 * they scroll.
 *
 * @param {{ project: import("../../data/projects.js").Project }} props
 */
export function FeaturedExperiment({ project }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <Section id="featured-experiment">
      <motion.div
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="hairline origin-left"
      />

      <div className="mt-4 flex items-baseline justify-between gap-6">
        <p className="label-mono flex items-baseline gap-3 text-[var(--color-fg-subtle)]">
          <span className="text-[var(--color-accent)]">EXPERIMENT 001</span>
          <span>Featured</span>
        </p>
        <p className="label-mono inline-flex items-center gap-1.5 text-[var(--color-fg-subtle)]">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
          {project.status}
        </p>
      </div>

      <RevealLines
        lines={[project.title]}
        className="mt-7 text-hero font-display font-semibold"
      />

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={variants}
        className="container-prose mt-6 text-lead text-[var(--color-fg-muted)]"
      >
        {project.summary}
      </motion.p>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <ExperimentDiagram
          label={project.title}
          nodes={project.architecture}
          className="panel tech-border p-3"
        />

        <div>
          <p className="label-mono text-[var(--color-fg-subtle)]">The problem</p>
          <p className="mt-4 text-[var(--color-fg-muted)]">{project.problem}</p>

          <p className="label-mono mt-10 text-[var(--color-fg-subtle)]">Subsystems</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {project.architecture.map((node, i) => (
              <li key={node} className="flex items-baseline gap-2.5">
                <span className="font-mono text-[0.6rem] text-[var(--color-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-[var(--color-fg-muted)]">{node}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button as={Link} to={`/projects/${project.slug}`} variant="primary">
              Open case study <ArrowRight size={15} />
            </Button>
            {project.demoUrl && (
              <Button
                as="a"
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                data-cursor="external"
              >
                <ExternalLink size={14} /> {project.demoLabel || "Live demo"}
              </Button>
            )}
            {project.codeUrl && (
              <Button
                as="a"
                href={project.codeUrl}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                data-cursor="external"
              >
                <GithubIcon size={14} /> Code
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
