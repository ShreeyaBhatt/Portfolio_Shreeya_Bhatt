import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { timeline } from "../../data/timeline.js";
import { staggerContainer, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The development timeline — a vertical run of phases, each one a year, drawn
 * from the portfolio's own records rather than a job history. A hairline rail
 * runs down the left with a marker per phase; the final phase is left open
 * (dashed marker, no closing rule) because it hasn't happened yet.
 */
export function DevTimeline() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="relative"
    >
      {/* the rail */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-2 w-px bg-[var(--color-border)] md:left-[calc(9rem+7px)]"
      />

      {timeline.map((phase) => (
        <motion.li
          key={phase.year}
          variants={variants}
          className="relative grid gap-4 pb-14 pl-8 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-10 md:pl-0"
        >
          {/* marker */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 md:left-[9rem]",
              phase.open
                ? "border-dashed border-[var(--color-accent)] bg-transparent"
                : "border-[var(--color-accent)] bg-[var(--color-bg)]"
            )}
          />

          <p className="label-mono pt-0.5 text-[var(--color-accent)] md:pr-8 md:text-right">
            {phase.year}
          </p>

          <div className="md:pl-10">
            <h3 className="text-h3 font-semibold">{phase.title}</h3>
            <p className="mt-3 max-w-xl text-[var(--color-fg-muted)]">{phase.summary}</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {phase.built.length > 0 && (
                <div>
                  <p className="coord">Built</p>
                  <ul className="mt-3 space-y-2">
                    {phase.built.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-[var(--color-fg-muted)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="coord">Explored</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {phase.explored.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-[var(--color-border-strong)] px-2.5 py-1 font-mono text-[0.7rem] text-[var(--color-fg-muted)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
