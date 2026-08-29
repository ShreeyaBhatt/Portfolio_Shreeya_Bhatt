import { motion } from "motion/react";
import { CountUp } from "../common/CountUp.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/** Home: a compact evidence row — the numbers count up as they arrive. */
export function Stats() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="bg-[var(--color-bg)] p-6 md:p-8"
          >
            <CountUp
              value={stat.value}
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-semibold tracking-tight text-[var(--color-fg)]"
            />
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
