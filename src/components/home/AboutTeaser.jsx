import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section.jsx";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { profile } from "../../data/profile.js";
import { getRevealVariants, staggerContainer, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A short read on who's behind the work, with the numbers alongside it.
 *
 * The figures are set in display type rather than body copy — at this size
 * they function as evidence you can take in at a glance, which is what a
 * skim-reading recruiter is actually doing on this section.
 */
export function AboutTeaser() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <Section>
      <SectionHeader
        index="03"
        label="The Researcher"
        meta={profile.location}
        titleLines={[
          "The",
          <span key="l2" className="accent-italic">
            researcher
          </span>,
        ]}
      />

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
        <div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={variants}
            className="text-h3 font-display font-medium leading-[1.25]"
          >
            I build with Python at the core — data-driven, AI-powered applications with machine
            learning at their heart, backed by full-stack platforms and systems grounded in{" "}
            <span className="accent-italic text-[var(--color-accent)]">
              clean architecture
            </span>
            .
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={variants}
            className="mt-8 max-w-xl text-[var(--color-fg-muted)]"
          >
            Currently in my Computer Science degree at L.J. Institute of Engineering and
            Technology, and spending the time around it on machine learning, system design, and
            cloud.
          </motion.p>

          <Link
            to="/about"
            data-cursor-hover
            className="group mt-10 inline-flex items-center gap-3 text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
          >
            <span className="link-underline font-medium">More about me</span>
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-x-8 gap-y-10 self-start"
        >
          {profile.stats.map((stat) => (
            <motion.div key={stat.label} variants={variants}>
              <hr className="hairline" aria-hidden="true" />
              <dd className="mt-4 font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.04em]">
                {stat.value}
              </dd>
              <dt className="label-mono mt-3 text-[var(--color-fg-subtle)]">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}
