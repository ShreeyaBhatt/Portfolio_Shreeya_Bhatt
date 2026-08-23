import { motion } from "motion/react";
import { Card } from "../ui/Card.jsx";
import { Tag } from "../ui/Tag.jsx";
import { profile } from "../../data/profile.js";
import { staggerContainer, getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** A personal touch alongside the professional sections — sourced from the GitHub profile README. */
export function BeyondTheCode() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <motion.div variants={variants}>
        <Card tilt={false} className="h-full p-6">
          <p className="mb-3 text-xs uppercase tracking-wide text-[var(--color-fg-muted)]">
            Currently scanning for
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.lookingFor.map((role) => (
              <Tag key={role} tone="accent2">
                {role}
              </Tag>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={variants}>
        <Card tilt={false} className="h-full p-6">
          <p className="mb-3 text-xs uppercase tracking-wide text-[var(--color-fg-muted)]">
            A few things about me
          </p>
          <ul className="space-y-2">
            {profile.funFacts.map((fact) => (
              <li key={fact} className="text-sm text-[var(--color-fg-muted)]">
                {fact}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  );
}
