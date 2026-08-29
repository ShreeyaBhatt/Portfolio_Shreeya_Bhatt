import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { RevealLines } from "../common/RevealLines.jsx";
import { profile } from "../../data/profile.js";
import { easeSignature, durations } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { useMousePosition } from "../../hooks/useMousePosition.js";

const [firstName, ...restOfName] = profile.name.split(" ");
const lastName = restOfName.join(" ");

/**
 * The hero: name at display scale, one honest sentence about the work, and a
 * meta row that answers a recruiter's first three questions (what, where,
 * available?) without making them scroll.
 *
 * The name is set as two masked lines that rise into place, with the surname
 * in serif italic — that single typographic contrast is doing most of the work
 * of making an otherwise plain layout feel authored.
 */
export function HeroContent() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 90]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0]);

  // The name drifts a few pixels against the cursor — a shallow parallax that
  // gives the biggest element on the page a little life without pulling focus.
  const mouse = useMousePosition();
  const nameX = useTransform(mouse.x, [-1, 1], [12, -12]);
  const nameY = useTransform(mouse.y, [-1, 1], [9, -9]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[88vh] flex-col justify-between pb-12 pt-[12vh] md:pt-[16vh]"
    >
      <motion.div style={{ y, opacity }} className="container-page">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durations.transition, ease: easeSignature }}
          className="label-mono flex items-center gap-3 text-[var(--color-fg-subtle)]"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]"
          />
          {profile.availability}
        </motion.p>

        <motion.div style={{ x: nameX, y: nameY }}>
          <RevealLines
            as="h1"
            animateOnMount
            className="mt-8 text-display font-display font-medium"
            lines={[
              firstName,
              <span key="last" className="accent-italic text-[var(--color-accent)]">
                {lastName}
              </span>,
            ]}
          />
        </motion.div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.page, ease: easeSignature, delay: 0.35 }}
            className="max-w-xl text-lead text-[var(--color-fg-muted)]"
          >
            Computer Science student and Python developer. I build{" "}
            <span className="text-[var(--color-fg)]">AI-powered</span> and{" "}
            <span className="text-[var(--color-fg)]">data-driven</span> applications — models,
            APIs, and interfaces — and take them all the way to something people can actually use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.page, ease: easeSignature, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button as={Link} to="/projects" variant="primary">
              View work
            </Button>
            <Button as={Link} to="/contact" variant="secondary">
              Get in touch
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Meta strip along the bottom edge — the hero's baseline, and the
          visual cue that there is more page below it. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: durations.page, ease: easeSignature, delay: 0.6 }}
        className="container-page mt-16"
      >
        <hr className="hairline" aria-hidden="true" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <p className="label-mono text-[var(--color-fg-subtle)]">
            {profile.disciplines.join("  /  ")}
          </p>
          <p className="label-mono text-[var(--color-fg-subtle)]">{profile.location}</p>
          <p className="label-mono flex items-center gap-2 text-[var(--color-fg-subtle)]">
            Scroll
            <ArrowDown size={13} className="animate-bounce" aria-hidden="true" />
          </p>
        </div>
      </motion.div>
    </div>
  );
}
