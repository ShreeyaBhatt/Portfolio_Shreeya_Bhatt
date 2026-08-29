import { motion } from "motion/react";
import { CountUp } from "../common/CountUp.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/** Home: DIAGNOSTICS — a compact evidence readout; the numbers count up. */
export function Stats() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="hud relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
          <span className="coord text-[var(--color-accent)]">DIAGNOSTICS · SNAPSHOT</span>
          <span className="coord flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
              style={{ animation: "lab-pulse 2s ease-in-out infinite" }}
            />
            ALL SYSTEMS NOMINAL
          </span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border)] md:grid-cols-4 md:divide-y-0">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 md:p-7"
            >
              <CountUp
                value={stat.value}
                className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[var(--color-accent)]"
              />
              <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
