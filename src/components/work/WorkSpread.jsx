import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { viewportOnce } from "../../lib/motion.js";

/**
 * One project as a full-width editorial row: an oversized index, the title, a
 * one-line thesis in the serif accent voice, then period + stack beneath.
 * The whole row is the link, in a single left-flowing column.
 *
 * @param {{ project: import("../../data/projects.js").Project, index: number }} props
 */
export function WorkSpread({ project, index }) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-[var(--color-border)] py-8 md:grid-cols-[3.5rem_1fr] md:py-11"
      >
        <span className="pt-1.5 font-mono text-[0.7rem] text-[var(--color-accent)]">{n}</span>

        <div>
          <h3 className="text-h2 font-semibold text-[var(--color-fg)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-lg accent-italic text-lead leading-snug text-[var(--color-fg-muted)]">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
              {project.period}
            </span>
            <span aria-hidden="true" className="text-[var(--color-border-strong)]">·</span>
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className="font-mono text-[0.7rem] text-[var(--color-fg-muted)]">
                {t}
              </span>
            ))}
          </div>

          <span
            aria-hidden="true"
            className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-fg)]"
          >
            Read case study
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
