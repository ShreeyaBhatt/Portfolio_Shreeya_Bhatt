import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { RevealLines } from "./RevealLines.jsx";
import { easeEditorial, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The one section header — a spacecraft panel heading. A glowing accent rule
 * draws in, a thin scan line sweeps once, then a mono channel row
 * (`02 / MISSION CONTROL … 05 PROJECTS`) and an optional display title + lead.
 *
 * @param {{
 *   index?: string, label: string, meta?: string,
 *   titleLines?: import("react").ReactNode[], lead?: import("react").ReactNode,
 *   className?: string, titleClassName?: string,
 * }} props
 */
export function SectionHeader({ index, label, meta, titleLines, lead, className, titleClassName }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reveal = getRevealVariants(prefersReducedMotion);

  return (
    <div className={cn("relative", className)}>
      <div className="relative h-0.5 w-full overflow-hidden">
        <motion.hr
          aria-hidden="true"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="rule-accent origin-left"
        />
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: "220%", opacity: [0, 1, 1, 0] }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
            className="absolute left-0 top-0 h-full w-16 bg-[var(--color-accent)]"
            style={{ filter: "blur(2px)" }}
          />
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <p className="eyebrow flex items-baseline gap-2.5">
          {index && <span className="text-[var(--color-accent)]">{index}</span>}
          {index && <span className="text-[var(--color-fg-subtle)]">/</span>}
          <span>{label}</span>
        </p>
        {meta && <p className="eyebrow shrink-0 text-[var(--color-fg-subtle)]">{meta}</p>}
      </div>

      {titleLines && (
        <RevealLines lines={titleLines} className={cn("mt-7 text-h2 font-bold", titleClassName)} />
      )}

      {lead && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reveal}
          className="container-prose mt-6 text-lead text-[var(--color-fg-muted)]"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
