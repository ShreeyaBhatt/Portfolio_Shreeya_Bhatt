import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { cn } from "../../lib/cn.js";
import { viewportOnce } from "../../lib/motion.js";
import { projects } from "../../data/projects.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The three places to go from the deck. Each card is an honest one-line
 * preview of the route it opens — no gimmicks, just enough to make you want
 * to walk through the door. Keep the teasers in step with what's actually on
 * /projects, /about and /contact.
 */
const CHANNELS = [
  {
    code: "01",
    title: "Missions",
    to: "/projects",
    meta: `${String(projects.length).padStart(2, "0")} logged`,
    teaser:
      "An AI family-investment platform with ML risk models, an expense tracker built twice on purpose, and Core-Java systems grounded in hand-written data structures.",
    cta: "Open mission control",
  },
  {
    code: "02",
    title: "Crew",
    to: "/about",
    meta: "The person",
    teaser:
      "The story behind the work — a year-by-year development timeline, the systems map, the training record, and an off-duty log.",
    cta: "Read the record",
  },
  {
    code: "03",
    title: "Channel",
    to: "/contact",
    meta: "Open",
    teaser:
      "A direct line — currently available for internships. Email, LinkedIn, GitHub, and a message form that reaches me straight away.",
    cta: "Open a channel",
  },
];

function ChannelCard({ channel, index }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={channel.to}
        data-cursor="mission"
        className={cn(
          "hud group relative flex h-full flex-col overflow-hidden p-6 transition-transform duration-300",
          "hover:-translate-y-1 focus-visible:-translate-y-1"
        )}
      >
        {/* frame lights on hover / focus */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] ring-1 ring-transparent transition-all duration-300 group-hover:ring-[var(--color-accent)]/60 group-focus-visible:ring-[var(--color-accent)]/60"
        />
        {/* scan-line sweep on hover */}
        {!reduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 -translate-y-full bg-gradient-to-b from-transparent via-[var(--color-accent)]/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-hover:[animation:scanline_0.9s_ease-in-out]"
          />
        )}

        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[0.7rem] tracking-[0.14em] text-[var(--color-accent)]">
            CH-{channel.code}
          </span>
          <span className="coord text-[var(--color-fg-subtle)]">{channel.meta}</span>
        </div>

        <h3 className="relative mt-8 text-h2 font-extrabold uppercase text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
          {channel.title}
        </h3>

        <p className="relative mt-4 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
          {channel.teaser}
        </p>

        <span className="relative mt-7 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
          <span className="h-px w-6 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-10" />
          {channel.cta}
          <ArrowRight
            size={13}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}

/** Home: THE DECK — the three routes, each with an honest preview. */
export function Channels() {
  return (
    <section
      id="channels"
      data-spine="03 · Deck"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="03"
        label="The Deck"
        meta="03 routes"
        titleLines={["Where to go", "from here"]}
        lead="Three places to head next — the work, the person behind it, and a way to get in touch."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {CHANNELS.map((channel, i) => (
          <ChannelCard key={channel.code} channel={channel} index={i} />
        ))}
      </div>
    </section>
  );
}
