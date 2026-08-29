import { motion } from "motion/react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** Home: SYSTEMS — the three things this portfolio argues for, as modules. */
export function Approach() {
  const rm = usePrefersReducedMotion();
  return (
    <section
      id="approach"
      data-spine="02 · Systems"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="02"
        label="Systems"
        meta="03 primary modules"
        titleLines={["Three core", "systems"]}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {profile.capabilities.map((cap, i) => (
          <motion.article
            key={cap.title}
            initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hud group relative flex flex-col overflow-hidden p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[var(--color-accent)]/12 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.7rem] text-[var(--color-accent)]">
                MOD {String(i + 1).padStart(2, "0")}
              </span>
              <span className="coord flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                NOMINAL
              </span>
            </div>
            <h3 className="mt-6 text-h3 font-bold">{cap.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {cap.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
              {cap.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--color-fg-subtle)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
