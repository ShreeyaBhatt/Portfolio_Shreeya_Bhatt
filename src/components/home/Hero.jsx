import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { RevealLines } from "../common/RevealLines.jsx";
import { Scramble } from "../common/Scramble.jsx";
import { SpinBadge } from "../common/SpinBadge.jsx";
import { getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { profile } from "../../data/profile.js";

/** The landing view — an editorial title block with a rotating seal. */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reveal = getRevealVariants(prefersReducedMotion);

  return (
    <section className="container-page relative flex min-h-[88svh] flex-col justify-center pt-28 md:pt-32">
      {/* rotating "available" seal — top-right on desktop */}
      <div className="pointer-events-none absolute right-6 top-28 hidden md:block md:right-10 xl:right-16">
        <SpinBadge className="pointer-events-auto" />
      </div>

      <Scramble as="p" text="PORTFOLIO / 2026" className="eyebrow block" />

      <RevealLines
        as="h1"
        animateOnMount
        className="mt-6 text-display font-semibold"
        lines={["Shreeya", "Bhatt"]}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={reveal}
        transition={{ delay: 0.5 }}
        className="mt-8 max-w-2xl"
      >
        <p className="text-lead text-[var(--color-fg-muted)]">
          Computer Science student building{" "}
          <span className="text-[var(--color-fg)]">AI-powered, data-driven</span> applications
          end to end — with <span className="accent-italic">Python</span> at the core.
        </p>

        <p className="mt-6 flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "lab-pulse 2.4s ease-in-out infinite" }}
          />
          {profile.availability}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
          >
            View work
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            to="/contact"
            className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Get in touch
          </Link>
          {/* seal shows here on mobile */}
          <SpinBadge className="md:hidden" size={92} />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-fg-subtle)]">
          Scroll
        </span>
        <motion.span
          aria-hidden="true"
          className="block h-8 w-px bg-[var(--color-border-strong)]"
          animate={prefersReducedMotion ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
