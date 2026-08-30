import { motion } from "motion/react";
import { CountUp } from "../common/CountUp.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";
import { projects } from "../../data/projects.js";
import { certifications } from "../../data/certifications.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const handle = profile.githubUrl.replace(/^https?:\/\//, "");

/**
 * Home: GITHUB UPLINK — a compact telemetry read taken from the GitHub
 * profile (repos, stars, focus areas) alongside two site figures, numbers
 * counting up as it scrolls in. The one place the home page volunteers
 * concrete evidence; everything else it makes you go and find.
 */
export function Uplink() {
  const rm = usePrefersReducedMotion();

  const figures = [
    { label: "Public repos", value: profile.github.publicRepos },
    { label: "Stars earned", value: profile.github.stars },
    { label: "Missions shipped", value: projects.length },
    { label: "Certifications", value: certifications.length },
  ];

  return (
    <section
      id="uplink"
      data-spine="02 · Uplink"
      className="container-page scroll-mt-24 py-16 md:py-20"
    >
      <div className="hud relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] px-5 py-3">
          <span className="coord text-[var(--color-accent)]">UPLINK · {handle}</span>
          <span className="coord flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
              style={{ animation: "lab-pulse 2s ease-in-out infinite" }}
            />
            FEED SYNCED
          </span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border)] md:grid-cols-4 md:divide-y-0">
          {figures.map((figure, i) => (
            <motion.div
              key={figure.label}
              initial={rm ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 md:p-7"
            >
              <CountUp
                value={String(figure.value).padStart(2, "0")}
                className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight text-[var(--color-accent)]"
              />
              <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
                {figure.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 border-t border-[var(--color-border)] px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="coord mb-2">Focus areas</p>
            <ul className="flex flex-wrap gap-2">
              {profile.github.focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--color-fg-muted)]"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="external"
            className="link-underline shrink-0 justify-self-start font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)] sm:justify-self-end"
          >
            View profile →
          </a>
        </div>
      </div>
    </section>
  );
}
