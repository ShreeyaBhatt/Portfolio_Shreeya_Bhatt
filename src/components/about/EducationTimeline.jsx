import { motion } from "motion/react";
import { education } from "../../data/education.js";
import { staggerContainer, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Education as a two-column ledger: dates held left, the entry set right.
 *
 * The old vertical rail-with-dots is a blog-post pattern; ruled rows read as a
 * record, which is what a CV section is, and they line up with the project
 * index elsewhere on the site.
 */
export function EducationTimeline() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="border-t border-[var(--color-border)]"
    >
      {education.map((entry) => (
        <motion.li
          key={entry.degree}
          variants={itemVariants}
          className="grid gap-3 border-b border-[var(--color-border)] py-8 md:grid-cols-[10rem_1fr] md:gap-10 md:py-10"
        >
          <p className="label-mono pt-1 text-[var(--color-accent)]">{entry.period}</p>
          <div>
            <h3 className="text-h3 font-medium">{entry.degree}</h3>
            <p className="mt-2 text-[var(--color-fg-muted)]">
              {entry.institution} — {entry.location}
            </p>
            {entry.detail && (
              <p className="mt-4 max-w-2xl text-sm text-[var(--color-fg-subtle)]">
                {entry.detail}
              </p>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
