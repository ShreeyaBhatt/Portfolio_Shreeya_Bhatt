import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "../../data/site.js";
import { easeEditorial, easeSignature } from "../../lib/motion.js";

/**
 * "Lab initialization" — the hero's boot sequence. Four mono readouts appear in
 * quick succession, hold briefly, then the whole panel wipes upward to reveal
 * the identity beneath it.
 *
 * This is NOT a route-blocking loader: it lives inside the hero, the page is
 * scrollable underneath the entire time, and it runs once per tab
 * (sessionStorage). The parent skips mounting it under prefers-reduced-motion,
 * so there is no reduced-motion branch here — it only ever runs when motion is
 * welcome. `onDone` fires when the wipe completes.
 */
const STEPS = [
  { k: "lab", label: `DIGITAL LAB / ${site.labNumber}` },
  { k: "init", label: "INITIALIZING PERSONAL SYSTEM…" },
  { k: "status", label: "STATUS   ● ONLINE", accent: true },
  { k: "focus", label: "FOCUS   PYTHON / DATA / AI / FULL-STACK" },
];

const STEP_GAP = 0.16;
const HOLD_AFTER = 0.42;

export function LabInit({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const settleAt = STEPS.length * STEP_GAP + HOLD_AFTER;
    const leaveTimer = setTimeout(() => setLeaving(true), settleAt * 1000);
    const doneTimer = setTimeout(() => onDone?.(), (settleAt + 0.6) * 1000);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-102%" } : { y: 0 }}
      transition={{ duration: 0.6, ease: easeEditorial }}
      className="absolute inset-0 z-20 flex flex-col justify-center bg-[var(--color-bg)]"
    >
      <div className="container-page">
        <hr className="hairline mb-8 max-w-md" />
        <ul className="space-y-3">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.k}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * STEP_GAP, duration: 0.3, ease: easeSignature }}
              className="label-mono flex items-center gap-3 text-[var(--color-fg-subtle)]"
            >
              <span className="text-[var(--color-fg-subtle)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={step.accent ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)]"}
              >
                {step.label}
              </span>
            </motion.li>
          ))}
        </ul>
        <hr className="hairline mt-8 max-w-md" />
      </div>
    </motion.div>
  );
}

/** Read once, synchronously, so the hero can decide before first paint. */
export function shouldRunLabInit() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem("lab-init-done") !== "1";
  } catch {
    return true;
  }
}

export function markLabInitDone() {
  try {
    window.sessionStorage.setItem("lab-init-done", "1");
  } catch {
    /* private mode — the intro just runs again next navigation, which is fine */
  }
}
