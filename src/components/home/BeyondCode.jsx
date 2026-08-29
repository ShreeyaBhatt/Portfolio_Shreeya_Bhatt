import { motion } from "motion/react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/** Home: the person behind the work — kept short, taken straight from the
    "fun facts" already on the GitHub profile. */
export function BeyondCode() {
  return (
    <section
      id="beyond"
     
      data-spine="03 · Crew"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader index="03" label="Crew · Off-Duty" titleLines={["Off the", "clock"]} />

      <ul className="mt-12 max-w-2xl space-y-6">
        {profile.funFacts.map((fact, i) => (
          <motion.li
            key={fact}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex gap-5 border-b border-[var(--color-border)] pb-6 text-h3 font-display font-medium leading-snug"
          >
            <span className="pt-2 font-mono text-[0.7rem] text-[var(--color-accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {fact}
          </motion.li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
        Currently mid-course on AWS &amp; cloud computing. Graduating 2028. Open to internships.
      </p>
    </section>
  );
}
