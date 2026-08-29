import { motion } from "motion/react";
import { Tag } from "../ui/Tag.jsx";
import { profile } from "../../data/profile.js";
import { staggerContainer, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** A personal note alongside the professional sections. */
export function BeyondTheCode() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="grid gap-12 md:grid-cols-2 md:gap-16"
    >
      <motion.div variants={variants}>
        <div className="h-px w-full bg-[var(--color-border)]" aria-hidden="true" />
        <p className="label-mono mt-5 text-[var(--color-fg-subtle)]">Currently looking for</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.lookingFor.map((role) => (
            <li key={role}>
              <Tag tone="accent2">{role}</Tag>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={variants}>
        <div className="h-px w-full bg-[var(--color-border)]" aria-hidden="true" />
        <p className="label-mono mt-5 text-[var(--color-fg-subtle)]">A few things about me</p>
        <ul className="mt-6 space-y-4">
          {profile.funFacts.map((fact) => (
            <li key={fact} className="flex gap-4 text-[var(--color-fg-muted)]">
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {fact}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
