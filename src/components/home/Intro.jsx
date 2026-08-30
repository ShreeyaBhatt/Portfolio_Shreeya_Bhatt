import { motion } from "motion/react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Home: BRIEFING — the plain-language introduction. Who Shreeya is in one
 * sentence, then the three things the work actually consists of, each as a
 * short module with its own toolset. Enough to know what's here and want to
 * look closer.
 */
export function Intro() {
  const rm = usePrefersReducedMotion();

  return (
    <section
      id="briefing"
      data-spine="01 · Briefing"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="01"
        label="Briefing"
        meta="Who / what"
        titleLines={["What I", "build"]}
      />

      <p className="container-prose mt-8 text-lead text-[var(--color-fg-muted)]">
        {profile.bio}
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {profile.capabilities.map((cap, i) => (
          <motion.article
            key={cap.title}
            initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hud flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.7rem] text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="coord text-[var(--color-fg-subtle)]">Module</span>
            </div>

            <h3 className="mt-6 text-h3 font-bold text-[var(--color-fg)]">{cap.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {cap.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
              {cap.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--color-fg-subtle)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
