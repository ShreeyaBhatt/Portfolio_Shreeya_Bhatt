import { motion } from "motion/react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/** Home: the three things this portfolio actually argues for. */
export function Approach() {
  return (
    <section
      id="approach"
     
      data-spine="02 · Systems"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="02"
        label="Systems"
        titleLines={["Three core", "systems"]}
      />

      <div className="mt-12 max-w-2xl divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {profile.capabilities.map((cap, i) => (
          <motion.article
            key={cap.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7"
          >
            <span className="pt-1 font-mono text-[0.7rem] text-[var(--color-accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-h3 font-semibold">{cap.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {cap.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {cap.tools.map((t) => (
                  <li key={t} className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
