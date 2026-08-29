import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";
import { easeSignature } from "../../lib/motion.js";
import { labToast } from "../../lib/labEvents.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The persistent instrument readout — a small panel pinned to the lower-left
 * corner on large screens. It states four facts (availability, current focus,
 * location, build) in the same mono register as the rest of the lab.
 *
 * It comes online once the visitor starts exploring (a little past the top of
 * the page) so it never sits over the hero, and it starts collapsed to a single
 * line — click to expand. Hidden below `lg` and whenever the mobile nav overlay
 * owns the screen (the layout sets `data-nav-open` on <body>).
 *
 * The status dot is a Phase-3 easter-egg target; for now it only pulses.
 */
const rows = [
  { label: "Currently exploring", value: site.currentlyExploring.join(" / ") },
  { label: "Location", value: profile.location.replace(", India", ", IN").toUpperCase() },
  { label: "Build", value: site.build },
];

export function LabStatus() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Poke the status dot a few times in a row → a nod, nothing more.
  const pokes = useRef(0);
  const pokeTimer = useRef(null);
  function pokeDot() {
    pokes.current += 1;
    window.clearTimeout(pokeTimer.current);
    pokeTimer.current = window.setTimeout(() => {
      pokes.current = 0;
    }, 1400);
    if (pokes.current >= 3) {
      pokes.current = 0;
      labToast("nothing to see here. keep exploring.");
    }
  }

  useEffect(() => {
    function onScroll() {
      setOnline(window.scrollY > 220);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {online && (
        <motion.aside
          aria-label="Lab status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: easeSignature }}
          className="lab-status fixed bottom-5 left-5 z-40 hidden w-[15rem] lg:block"
        >
          <div className="panel tech-border backdrop-blur-md">
            <div className="flex items-stretch">
              <button
                type="button"
                data-cursor-hover
                onClick={pokeDot}
                aria-label="Status indicator"
                className="flex items-center pl-3.5 pr-2"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { animation: "lab-pulse 2.4s ease-in-out infinite" }
                  }
                />
              </button>
              <button
                type="button"
                data-cursor-hover
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="flex flex-1 items-center justify-between gap-3 py-2.5 pr-3.5 text-left"
              >
                <span className="label-mono text-[var(--color-fg)]">Lab status</span>
                <span className="label-mono text-[var(--color-accent)]">{site.status}</span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.dl
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: easeSignature }}
                  className="overflow-hidden border-t border-[var(--color-border)]"
                >
                  <div className="space-y-2.5 px-3.5 py-3">
                    {rows.map((row) => (
                      <div key={row.label} className="flex flex-col gap-0.5">
                        <dt className="coord">{row.label}</dt>
                        <dd className="font-mono text-[0.7rem] text-[var(--color-fg-muted)]">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </motion.dl>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
