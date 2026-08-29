import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { RevealLines } from "../common/RevealLines.jsx";
import { Scramble } from "../common/Scramble.jsx";
import { AvatarStage } from "../avatar/AvatarStage.jsx";
import { HudLabel } from "../space/HudLabel.jsx";
import { getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";

/** COMMAND DECK — the visitor enters Shreeya's spacecraft interface. */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reveal = getRevealVariants(prefersReducedMotion);

  return (
    <section className="container-page relative flex min-h-[92svh] flex-col justify-center pt-28 md:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
        {/* ---- identity ---- */}
        <div>
          <p className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              style={{ animation: "lab-pulse 2.2s ease-in-out infinite", boxShadow: "0 0 8px var(--color-accent)" }}
            />
            <Scramble text="SYSTEM ONLINE" className="eyebrow" />
            <span className="coord">// COMMAND DECK</span>
          </p>

          <RevealLines
            as="h1"
            animateOnMount
            className="mt-5 text-display font-extrabold"
            lines={["SHREEYA", "BHATT"]}
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Python Developer
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-[var(--color-fg-subtle)]">
              Data &nbsp;·&nbsp; AI &nbsp;·&nbsp; Full-Stack
            </p>

            <p className="container-prose mt-6 text-lead text-[var(--color-fg-muted)]">
              Computer Science student building{" "}
              <span className="accent-italic">AI-powered, data-driven</span> applications end
              to end — with Python at the core.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent)] transition-all hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)]"
              >
                Explore missions
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                to="/contact"
                className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                Open channel
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--color-border)] pt-6 sm:grid-cols-4">
              <HudLabel k="Subject" v="S. Bhatt" />
              <HudLabel k="Focus" v="Python / AI" />
              <HudLabel k="Location" v="India" />
              <HudLabel k="Build" v={site.build} live />
            </dl>
          </motion.div>
        </div>

        {/* ---- avatar / command core ---- */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
        >
          <Link
            to="/projects"
            data-cursor="mission"
            aria-label="Enter Mission Control"
            className="corner-frame group relative block overflow-hidden rounded-[var(--radius-md)] p-3 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <AvatarStage />
            <span className="coord absolute left-3 top-3 z-10">AVATAR · CORE</span>
            <span className="coord absolute bottom-3 right-3 z-10 flex items-center gap-1.5 text-[var(--color-accent)]">
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
                style={{ animation: "lab-pulse 1.8s ease-in-out infinite" }}
              />
              TRACKING
            </span>
            {/* enter prompt — appears on hover / focus */}
            <span className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center justify-center">
              <span className="translate-y-3 rounded-[var(--radius-sm)] border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-bg)_80%,transparent)] px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                Enter mission control →
              </span>
            </span>
            {/* frame lights up on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] ring-1 ring-[var(--color-accent)]/0 transition-all group-hover:ring-[var(--color-accent)]/50"
            />
          </Link>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 lg:flex">
        <span className="coord">Scroll to travel</span>
        <motion.span
          aria-hidden="true"
          className="block h-8 w-px bg-[var(--color-border-strong)]"
          animate={prefersReducedMotion ? undefined : { scaleY: [0.3, 1, 0.3] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
