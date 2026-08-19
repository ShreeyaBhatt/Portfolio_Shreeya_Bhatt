import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";
import { TypewriterRoles } from "../common/TypewriterRoles.jsx";
import { profile } from "../../data/profile.js";
import { easeSignature, durations } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export function HeroContent() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.2]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[75vh] flex-col justify-center py-20 md:py-28"
    >
      <motion.div style={{ y, opacity }} className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.transition, ease: easeSignature }}
          className="mb-4 font-mono text-sm text-[var(--color-accent)]"
        >
          {"// "}Computer Science student & builder
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.page, ease: easeSignature, delay: 0.08 }}
          className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.transition, ease: easeSignature, delay: 0.14 }}
          className="mt-4 font-mono text-lg text-[var(--color-accent-2)] sm:text-xl"
        >
          <TypewriterRoles />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.page, ease: easeSignature, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-[var(--color-fg-muted)] md:text-xl"
        >
          {profile.tagline} — I build{" "}
          <span className="text-[var(--color-accent)]">AI-powered</span> and{" "}
          <span className="text-[var(--color-accent-2)]">data-driven</span> applications, end to
          end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.page, ease: easeSignature, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button as={Link} to="/projects" variant="primary">
            View Projects
          </Button>
          <div className="flex items-center gap-3 text-[var(--color-fg-muted)]">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              data-cursor-hover
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              data-cursor-hover
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
