import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { RevealLines } from "../common/RevealLines.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/** Home: the closing call to action. */
export function ContactCta() {
  return (
    <section
      id="contact"
     
      data-spine="04 · Contact"
      className="container-page scroll-mt-24 py-24 md:py-36"
    >
      <motion.hr
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rule-accent origin-left"
      />
      <p className="mt-5 eyebrow">
        <span className="text-[var(--color-accent)]">04</span>
        <span className="mx-2.5 text-[var(--color-fg-subtle)]">/</span>Contact
      </p>

      <RevealLines
        as="h2"
        className="mt-8 text-h1 font-semibold"
        lines={[<>Let's build</>, <>something.</>]}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
      >
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
        >
          {profile.email}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <Link
          to="/contact"
          className="link-underline font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
        >
          Use the form
        </Link>
      </motion.div>
    </section>
  );
}
