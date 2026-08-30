import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, Unlock } from "lucide-react";
import { SectionHeader } from "../common/SectionHeader.jsx";
import { cn } from "../../lib/cn.js";
import { viewportOnce } from "../../lib/motion.js";
import { projects } from "../../data/projects.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#";
const scramble = (text) =>
  text
    .split("")
    .map((ch) => (ch === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
    .join("");

/**
 * Each card's `teaser` is a truthful one-line preview of the route it opens —
 * decrypt it for the gist, click it for the whole page. Keep these in step
 * with what's actually on /projects, /about and /contact.
 */
const CHANNELS = [
  {
    code: "CH-01",
    title: "MISSIONS",
    to: "/projects",
    meta: `${String(projects.length).padStart(2, "0")} logged`,
    teaser:
      "An AI family-investment platform with ML risk models, an expense tracker built twice on purpose, and console systems grounded in hand-written data structures.",
  },
  {
    code: "CH-02",
    title: "CREW",
    to: "/about",
    meta: "Personnel",
    teaser:
      "The person behind the work — a development timeline, the systems map, the training record, and an off-duty log.",
  },
  {
    code: "CH-03",
    title: "CHANNEL",
    to: "/contact",
    meta: "Open",
    teaser:
      "A direct comms link — available for internships. Email, LinkedIn, GitHub, and a form that reaches me straight away.",
  },
];

/**
 * A word that holds as ciphertext until `active`, then resolves left to right.
 * `instant` (reduced motion) skips straight to the real text. The real string
 * is always the value passed in, so nothing here changes what a screen reader
 * announces — only what a sighted visitor sees before they engage.
 */
function DecryptText({ text, active, instant, className }) {
  const [display, setDisplay] = useState(() => (instant ? text : scramble(text)));
  const rafRef = useRef(0);

  useEffect(() => {
    if (instant) {
      setDisplay(text);
      return undefined;
    }
    cancelAnimationFrame(rafRef.current);
    let frame = 0;
    const total = text.length;

    const tick = () => {
      frame += active ? 1 : -2;
      const revealed = Math.max(0, Math.min(total, Math.floor(frame / 1.7)));
      let out = "";
      for (let i = 0; i < total; i += 1) {
        if (text[i] === " ") out += " ";
        else if (i < revealed) out += text[i];
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setDisplay(out);
      if (active && revealed < total) rafRef.current = requestAnimationFrame(tick);
      else if (!active && revealed > 0) rafRef.current = requestAnimationFrame(tick);
      else if (active) setDisplay(text);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, instant, text]);

  return <span className={cn("tabular-nums", className)}>{display}</span>;
}

function ChannelCard({ channel, index }) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [noHover, setNoHover] = useState(false);

  // Touch devices never fire hover — decrypt on mount there instead of
  // stranding the visitor on a wall of glyphs.
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const sync = () => setNoHover(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const forced = reduced || noHover;
  const active = forced || hovered || focused;

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
        aria-label={`Open ${channel.title.toLowerCase()} channel`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "hud group relative block overflow-hidden p-6 transition-transform duration-300",
          "hover:-translate-y-1 focus-visible:-translate-y-1"
        )}
      >
        {/* border lights on decrypt */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[var(--radius-md)] ring-1 transition-all duration-300",
            active ? "ring-[var(--color-accent)]/60" : "ring-transparent"
          )}
        />

        {/* scan-line sweep, replays each time the card is engaged */}
        {active && !reduced && (
          <motion.span
            key={hovered || focused ? "on" : "auto"}
            aria-hidden="true"
            initial={{ y: "-130%" }}
            animate={{ y: "130%" }}
            transition={{ duration: 0.7, ease: "linear" }}
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[var(--color-accent)]/25 to-transparent"
          />
        )}

        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[0.7rem] tracking-[0.12em] text-[var(--color-accent)]">
            {channel.code}
          </span>
          <span className="flex items-center gap-1.5 text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-accent)]">
            {active ? <Unlock size={13} aria-hidden="true" /> : <Lock size={13} aria-hidden="true" />}
            <span className="coord">{active ? "Decrypted" : "Sealed"}</span>
          </span>
        </div>

        <h3 className="relative mt-8 text-h2 font-extrabold uppercase">
          <DecryptText text={channel.title} active={active} instant={reduced} />
        </h3>

        <p className="relative mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
          {channel.meta}
        </p>

        {reduced ? (
          <p className="relative mt-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            {channel.teaser}
          </p>
        ) : (
          <motion.p
            animate={{ filter: active ? "blur(0px)" : "blur(5px)", opacity: active ? 1 : 0.5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-5 select-none text-sm leading-relaxed text-[var(--color-fg-muted)]"
          >
            {channel.teaser}
          </motion.p>
        )}

        <span className="relative mt-6 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
          <span className="h-px w-6 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-10" />
          {active ? "Access" : "Decrypt to preview"}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

/** Home: ENCRYPTED CHANNELS — the three routes, sealed until you engage. */
export function Channels() {
  return (
    <section
      id="channels"
      data-spine="02 · Channels"
      className="container-page scroll-mt-24 py-20 md:py-28"
    >
      <SectionHeader
        index="02"
        label="Encrypted Channels"
        meta="03 sealed"
        titleLines={["Three sealed", "transmissions"]}
        lead="The deck routes to three channels. Decrypt a header for the gist — open it for the full signal."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {CHANNELS.map((channel, i) => (
          <ChannelCard key={channel.code} channel={channel} index={i} />
        ))}
      </div>
    </section>
  );
}
