import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";
import { ProfilePhoto } from "../common/ProfilePhoto.jsx";
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
    <div ref={containerRef} className="relative flex min-h-[85vh] flex-col justify-center">
      <motion.div style={{ y, opacity }} className="container-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: durations.page, ease: easeSignature }}
        >
          <ProfilePhoto className="h-20 w-20 rounded-full border-2 border-[var(--color-accent)] shadow-[var(--shadow-raised)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.transition, ease: easeSignature }}
          className="mb-4 mt-6 font-mono text-sm text-[var(--color-accent)]"
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.page, ease: easeSignature, delay: 0.16 }}
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
          <Button
            as="a"
            href={profile.resumePath}
            download
            variant="secondary"
          >
            <Download size={16} /> Download Resume
          </Button>
          <div className="ml-2 flex items-center gap-3 text-[var(--color-fg-muted)]">
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: durations.page, delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-fg-muted)]"
        aria-hidden="true"
      >
        <ArrowDown size={20} className={prefersReducedMotion ? "" : "animate-bounce"} />
      </motion.div>
    </div>
  );
}
