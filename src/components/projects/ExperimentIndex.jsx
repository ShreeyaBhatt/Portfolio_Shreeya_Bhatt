import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn.js";
import { getRevealVariants, staggerContainer, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The work, logged as experiment entries rather than cards.
 *
 * Each row states the essentials up front — number, title, category, status,
 * year — and reads fine with no interaction at all. On hover / focus (desktop)
 * the row expands a small instrument readout (system, stack, subsystem
 * pipeline) and a thin light bar sweeps across it once. Under reduced motion
 * the readout is simply always shown and nothing sweeps.
 *
 * Rows are full-area <Link>s tagged `data-cursor="project"` so the custom
 * cursor reads "VIEW EXPERIMENT →".
 *
 * @param {{ projects: import("../../data/projects.js").Project[], startIndex?: number }} props
 */
export function ExperimentIndex({ projects, startIndex = 1 }) {
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
      {projects.map((project, index) => {
        const number = String(index + startIndex).padStart(3, "0");
        const readout = [
          ["System", project.system],
          ["Stack", project.tech.slice(0, 4).join(" · ")],
          ["Status", project.status],
        ];

        return (
          <motion.li
            key={project.slug}
            variants={variants}
            className="border-b border-[var(--color-border)]"
          >
            <Link
              to={`/projects/${project.slug}`}
              data-cursor="project"
              className="group relative block overflow-hidden py-7 md:py-9"
            >
              {/* hover wash */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 origin-left scale-x-0 bg-[var(--color-accent-soft)]",
                  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-hover:scale-x-100 group-focus-visible:scale-x-100"
                )}
              />

              {/* one-shot light sweep on hover */}
              {!prefersReducedMotion && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 w-full -translate-x-full opacity-0",
                    "bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)]",
                    "group-hover:opacity-40 group-hover:[animation:scan-line_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                  )}
                />
              )}

              <div
                className={cn(
                  "relative flex flex-col gap-3 px-1 md:px-2",
                  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "md:group-hover:translate-x-3 md:group-focus-visible:translate-x-3"
                )}
              >
                <div className="flex flex-col gap-3 md:grid md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-8">
                  <span className="label-mono text-[var(--color-fg-subtle)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    EXP {number}
                  </span>

                  <div>
                    <h3 className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[var(--color-fg-muted)]">
                      {project.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 md:flex-col md:items-end md:gap-2">
                    <span className="label-mono inline-flex items-center gap-1.5 text-[var(--color-fg-subtle)]">
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
                      />
                      {project.status}
                    </span>
                    <span className="label-mono whitespace-nowrap text-[var(--color-fg-subtle)]">
                      {project.period.slice(-4)}
                    </span>
                  </div>
                </div>

                {/* instrument readout — revealed on hover, always shown under reduced motion */}
                <div
                  className={cn(
                    "grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]",
                    "motion-reduce:grid-rows-[1fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <dl className="mt-4 grid gap-x-8 gap-y-3 border-t border-[var(--color-border)] pt-4 sm:grid-cols-3 md:max-w-2xl">
                      {readout.map(([term, value]) => (
                        <div key={term}>
                          <dt className="coord">{term}</dt>
                          <dd className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {project.architecture?.length > 0 && (
                      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.65rem] text-[var(--color-fg-subtle)]">
                        {project.architecture.map((node, i) => (
                          <span key={node} className="inline-flex items-center gap-2">
                            {i > 0 && <span className="text-[var(--color-border-strong)]">→</span>}
                            {node.toUpperCase()}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <ArrowUpRight
                size={24}
                strokeWidth={1.5}
                aria-hidden="true"
                className={cn(
                  "absolute right-1 top-7 text-[var(--color-fg-subtle)] transition-all duration-300 md:right-2 md:top-9",
                  "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
                )}
              />
            </Link>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
