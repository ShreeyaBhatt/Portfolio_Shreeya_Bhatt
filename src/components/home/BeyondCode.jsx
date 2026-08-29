import { motion } from "motion/react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/** Home: CREW LOG — the person behind the work, as terminal log lines. */
export function BeyondCode() {
  return (
    <section
      id="beyond"
      data-spine="03 · Crew"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="03"
        label="Crew · Off-Duty"
        meta="personal log"
        titleLines={["Off the", "clock"]}
      />

      <div className="hud mt-12 max-w-2xl overflow-hidden">
        <div className="border-b border-[var(--color-border)] px-5 py-3">
          <span className="coord text-[var(--color-accent)]">CREW LOG · S. BHATT</span>
        </div>
        <ul className="divide-y divide-[var(--color-border)]">
          {profile.funFacts.map((fact, i) => (
            <motion.li
              key={fact}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="grid grid-cols-[3rem_1fr] gap-x-4 px-5 py-5"
            >
              <span className="pt-1 font-mono text-[0.65rem] text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lead font-medium leading-snug text-[var(--color-fg)]">
                {fact}
              </p>
            </motion.li>
          ))}
        </ul>
        <p className="border-t border-[var(--color-border)] px-5 py-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
          Currently mid-course on AWS &amp; cloud · graduating 2028 · open to internships
        </p>
      </div>
    </section>
  );
}
