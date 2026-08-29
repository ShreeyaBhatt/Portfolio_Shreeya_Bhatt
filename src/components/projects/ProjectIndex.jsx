import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn.js";
import { getRevealVariants, staggerContainer, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The work, as an editorial index rather than a grid of cards.
 *
 * This portfolio has no project screenshots, and a card grid without imagery
 * is just five boxes of text pretending to be visual. A numbered index leans
 * into that instead: the type *is* the design, each row reads as a line in a
 * table of contents, and hovering lights the row up and slides it aside.
 *
 * Rows are `<Link>`s covering their full area, so the whole row is one large,
 * obvious target — on a phone especially.
 */
export function ProjectIndex({ projects, startIndex = 1 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="border-t border-[var(--color-border)]"
    >
      {projects.map((project, index) => (
        <motion.li
          key={project.slug}
          variants={variants}
          className="border-b border-[var(--color-border)]"
        >
          <Link
            to={`/projects/${project.slug}`}
            data-cursor-hover
            className="group relative block overflow-hidden py-8 md:py-10"
          >
            {/* Accent wash that wipes in from the left on hover — the row
                lights up rather than merely changing text colour. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 origin-left scale-x-0 bg-[var(--color-accent-soft)]",
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:scale-x-100 group-focus-visible:scale-x-100"
              )}
            />

            <div
              className={cn(
                "relative flex flex-col gap-4 px-1",
                "md:grid md:grid-cols-[3.5rem_1fr_auto] md:items-baseline md:gap-8 md:px-2",
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "md:group-hover:translate-x-3 md:group-focus-visible:translate-x-3"
              )}
            >
              <span className="label-mono text-[var(--color-fg-subtle)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                {String(index + startIndex).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-xl text-[var(--color-fg-muted)]">{project.category}</p>
                <p className="mt-4 font-mono text-xs text-[var(--color-fg-subtle)]">
                  {project.tech.slice(0, 4).join("  ·  ")}
                </p>
              </div>

              <div className="flex items-center gap-6 md:justify-end">
                <span className="label-mono whitespace-nowrap text-[var(--color-fg-subtle)]">
                  {project.period.slice(-4)}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-[var(--color-fg-subtle)] transition-all duration-300",
                    "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
                  )}
                >
                  <ArrowUpRight size={26} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ol>
  );
}
