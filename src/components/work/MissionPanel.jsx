import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { ProjectGlyph } from "./ProjectGlyph.jsx";
import { viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * One project as an asymmetric "mission panel". The visual half is a live
 * schematic built from the project's real subsystem list; the meta half is
 * the mission dossier. Panels alternate direction down the page for rhythm.
 * On hover a scan line sweeps the schematic and the frame lights up.
 *
 * @param {{
 *   project: import("../../data/projects.js").Project,
 *   index: number,
 *   flip?: boolean,
 *   number?: number,  // stable mission number (data order); falls back to index
 * }} props
 */
export function MissionPanel({ project, index, flip = false, number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const n = String(number ?? index + 1).padStart(2, "0");
  const nodes = (project.architecture ?? []).slice(0, 8);

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid items-center gap-8 border-t border-[var(--color-border)] py-14 md:gap-12 lg:grid-cols-12 lg:py-20"
    >
      {/* schematic */}
      <Link
        to={`/projects/${project.slug}`}
        data-cursor="mission"
        className={cn(
          "group relative block lg:col-span-7",
          flip ? "lg:order-2 lg:col-start-6" : "lg:order-1"
        )}
      >
        <div className="hud relative aspect-[16/10] overflow-hidden">
          {/* grid + wiring + node schematic */}
          <div className="grid-overlay absolute inset-0 opacity-60" style={{ "--grid-size": "38px" }} />
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full text-[var(--color-accent)]"
            preserveAspectRatio="none"
            viewBox="0 0 400 250"
          >
            {/* central bus + branch stubs to each subsystem row */}
            <line x1="200" y1="40" x2="200" y2="210" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <line x1="60" y1="95" x2="340" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.22" />
            <line x1="60" y1="155" x2="340" y2="155" stroke="currentColor" strokeWidth="1" opacity="0.22" />
            <circle cx="200" cy="40" r="2.5" fill="currentColor" opacity="0.5" />
            <circle
              className="opacity-0 transition-opacity group-hover:opacity-100"
              r="3"
              fill="currentColor"
            >
              <animateMotion dur="1.6s" repeatCount="indefinite" path="M200,40 L200,210" />
            </circle>
            <circle
              className="opacity-0 transition-opacity group-hover:opacity-100"
              r="2.5"
              fill="currentColor"
            >
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M60,95 L340,95" />
            </circle>
          </svg>
          <div className="absolute inset-0 grid grid-cols-2 content-center gap-2.5 p-6 sm:grid-cols-4">
            {nodes.map((node, i) => (
              <span
                key={node}
                className="relative z-10 flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg)]/70 px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-[var(--color-fg-muted)] backdrop-blur-sm transition-colors group-hover:border-[var(--color-accent)]/50"
              >
                <span className="text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate">{node}</span>
              </span>
            ))}
          </div>
          {/* project emblem — large, faint, sits behind the schematic */}
          <ProjectGlyph
            slug={project.slug}
            className="pointer-events-none absolute right-5 top-5 h-20 w-20 text-[var(--color-accent)] opacity-[0.18] transition-opacity duration-500 group-hover:opacity-30"
          />

          {/* corner labels */}
          <span className="coord absolute left-3 top-3">SCHEMATIC · {project.system}</span>
          <span className="coord absolute bottom-3 right-3 text-[var(--color-accent)]">
            {project.status}
          </span>
          {/* hover scan line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 -translate-y-full bg-gradient-to-b from-transparent via-[var(--color-accent)]/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-hover:[animation:scanline_1.6s_ease-in-out]"
          />
          {/* frame glow on hover */}
          <span className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] ring-1 ring-[var(--color-accent)]/0 transition-all group-hover:ring-[var(--color-accent)]/60" />
        </div>
      </Link>

      {/* dossier */}
      <div className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2")}>
        <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          <span className="text-[var(--color-accent)]">MISSION {n}</span>
          {project.featured && (
            <span className="rounded-[var(--radius-sm)] border border-[var(--color-accent)]/40 px-1.5 py-0.5 text-[var(--color-accent)]">
              PRIMARY
            </span>
          )}
        </p>

        <h3 className="mt-4 text-h2 font-bold text-[var(--color-fg)]">{project.title}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
          {project.category}
        </p>

        <p className="mt-5 max-w-md text-[var(--color-fg-muted)]">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <dt className="coord">Timeline</dt>
            <dd className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]">{project.period}</dd>
          </div>
          <div>
            <dt className="coord">Type</dt>
            <dd className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]">{project.system}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t} className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
              {t}
            </li>
          ))}
        </ul>

        <Link
          to={`/projects/${project.slug}`}
          data-cursor="mission"
          className="group mt-7 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent)]"
        >
          View mission
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.article>
  );
}
