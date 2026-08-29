import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { onLab } from "../../lib/labEvents.js";
import { projects } from "../../data/projects.js";
import { toolboxGroups } from "../../data/skills.js";
import { easeSignature } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * "Scan the lab" — the site's signature interaction, and completely optional.
 *
 * On a `lab:scan` event a bright line sweeps the page top to bottom; while it
 * runs, `body.lab-scanning` outlines every instrument panel and lifts the grid
 * (see src/styles/index.css). It finishes on a short "SYSTEM SCAN COMPLETE"
 * readout, then clears itself.
 *
 * Under reduced motion there's no sweep — the readout appears, holds, and goes.
 */
const SWEEP_MS = 1900;
const REPORT_MS = 2600;

export function LabScan() {
  const [phase, setPhase] = useState("idle"); // idle | sweep | report
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(
    () =>
      onLab("scan", () => {
        setPhase((p) => (p === "idle" ? (prefersReducedMotion ? "report" : "sweep") : p));
      }),
    [prefersReducedMotion]
  );

  useEffect(() => {
    if (phase === "idle") return undefined;
    if (phase === "sweep") {
      document.body.classList.add("lab-scanning");
      const t = window.setTimeout(() => setPhase("report"), SWEEP_MS);
      return () => window.clearTimeout(t);
    }
    // report
    document.body.classList.remove("lab-scanning");
    const t = window.setTimeout(() => setPhase("idle"), REPORT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(
    () => () => document.body.classList.remove("lab-scanning"),
    []
  );

  const rows = [
    ["Experiments", String(projects.length).padStart(2, "0")],
    ["Toolbox drawers", String(toolboxGroups.length).padStart(2, "0")],
    ["Certifications", "07"],
    ["Contact", "ONLINE"],
  ];

  return (
    <>
      <AnimatePresence>
        {phase === "sweep" && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[85]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-[38vh]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-accent) 14%, transparent) 78%, var(--color-accent))",
              }}
              initial={{ y: "-38vh" }}
              animate={{ y: "100vh" }}
              transition={{ duration: SWEEP_MS / 1000, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 h-0.5 bg-[var(--color-accent)] shadow-[0_0_24px_2px_var(--color-accent)]"
              initial={{ y: "-2px" }}
              animate={{ y: "100vh" }}
              transition={{ duration: SWEEP_MS / 1000, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "report" && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              role="status"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeSignature }}
              className="panel tech-border w-full max-w-xs bg-[var(--color-bg)]/90 p-5 backdrop-blur-md"
            >
              <p className="label-mono text-[var(--color-accent)]">System scan complete</p>
              <dl className="mt-4 space-y-2">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="coord">{label}</dt>
                    <dd className="font-mono text-xs text-[var(--color-fg-muted)]">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
