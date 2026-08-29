import { motion } from "motion/react";
import { Section } from "../ui/Section.jsx";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { profile } from "../../data/profile.js";
import { getRevealVariants, staggerContainer, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * What the work actually consists of, in three columns.
 *
 * Deliberately not cards: three bordered boxes would compete with the project
 * index above. A hairline over each column and generous space between them
 * says "these are peers" more quietly, and keeps the page's rhythm editorial.
 */
export function Capabilities() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <Section>
      <SectionHeader
        index="02"
        label="Capabilities"
        meta="What I do"
        titleLines={[
          "Three things I",
          <span key="l2">
            do <span className="accent-italic text-[var(--color-accent)]">well</span>
          </span>,
        ]}
      />

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8"
      >
        {profile.capabilities.map((capability, index) => (
          <motion.li key={capability.title} variants={variants} className="group">
            <div className="h-px w-full bg-[var(--color-border)] transition-colors duration-500 group-hover:bg-[var(--color-accent)]" />
            <p className="label-mono mt-5 text-[var(--color-accent)]">
              ({String(index + 1).padStart(2, "0")})
            </p>
            <h3 className="mt-5 text-h3 font-medium">{capability.title}</h3>
            <p className="mt-4 text-[var(--color-fg-muted)]">{capability.description}</p>
            <p className="mt-6 font-mono text-xs text-[var(--color-fg-subtle)]">
              {capability.tools.join("  ·  ")}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
