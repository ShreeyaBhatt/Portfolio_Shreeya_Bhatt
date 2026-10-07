import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AvatarStage } from "./AvatarStage.jsx";
import { waypoints } from "./waypoints.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** How long each waypoint holds the readout while the core scans on its own. */
const CYCLE_MS = 4200;

const pad = (n) => String(n).padStart(2, "0");

/**
 * NAV CORE — the hero's centrepiece, and a working navigator for the site.
 *
 * Every satellite in orbit is a destination: Missions, the Service Record
 * (experience), Systems, Credentials, the Mission Log, and the Channel. The
 * core scans them on its own (one per CYCLE_MS) and the readout shows the
 * locked waypoint with a live fact from the site's data and a way in.
 * Hovering or tapping a satellite — or focusing one of the numbered channels
 * on the rail — locks the scan onto it; clicking a locked satellite goes there.
 *
 * The rail is the accessible path: real links, keyboard-focusable, named. The
 * 3D satellites and the 2D schematic's dots are pointer conveniences on top.
 * Under reduced motion there's no auto-scan; everything else still works.
 */
export function MissionCore() {
  const reduced = usePrefersReducedMotion();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const total = waypoints.length;

  useEffect(() => {
    if (reduced || engaged) return undefined;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % total);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, engaged, total]);

  const hover = useCallback((i) => {
    if (i != null) setActive(i);
  }, []);

  // First tap locks a satellite (so touch users see the readout); a click on
  // the satellite that's already locked travels there.
  const select = useCallback(
    (i) => {
      if (i === active) navigate(waypoints[i].to);
      else setActive(i);
    },
    [active, navigate]
  );

  const point = waypoints[active];
  const scanning = !engaged && !reduced;

  return (
    <div
      className="corner-frame group relative overflow-hidden rounded-[var(--radius-md)] p-3"
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
      }}
    >
      <div className="relative">
        <AvatarStage count={total} active={active} onHover={hover} onSelect={select} />

        {/* channel rail — the accessible way to every waypoint; centred on the
            drawing, not the frame, so it stays put when the readout stacks */}
        <nav aria-label="Site navigator" className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
          <ul className="flex flex-col gap-1.5">
            {waypoints.map((w, i) => {
              const on = i === active;
              return (
                <li key={w.id}>
                  <Link
                    to={w.to}
                    data-cursor="mission"
                    aria-label={`${w.code.toLowerCase()} — ${w.title}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] border font-mono text-[0.6rem] tracking-[0.06em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                      on
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                        : "border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {pad(i + 1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* header telemetry */}
      <p aria-hidden="true" className="coord absolute left-3 top-3 z-10">
        NAV CORE · {pad(total)} WAYPOINTS
      </p>
      <p
        aria-hidden="true"
        className="coord absolute right-3 top-3 z-10 flex items-center gap-1.5 text-[var(--color-accent)]"
      >
        <span
          className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
          style={scanning ? { animation: "lab-pulse 1.8s ease-in-out infinite" } : undefined}
        />
        {scanning ? "SCANNING" : "LOCKED"}
      </p>

      {/* locked-waypoint readout — overlays the core from sm up; on phones it
          sits under the drawing so no satellite hides behind it */}
      <div className="relative z-10 mt-3 sm:absolute sm:bottom-3 sm:left-3 sm:mt-0 sm:w-[min(18rem,calc(100%-4.5rem))]">
        <div className="hud relative overflow-hidden px-3.5 py-3">
          {/* Keyed so each lock re-runs a short fade-in; no exit animation, so
              the readout can never lag behind the locked waypoint. */}
          <motion.div
            key={point.id}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <p className="coord truncate text-[var(--color-accent)]">
              {pad(active + 1)} · {point.code} · {point.status}
            </p>
            <p className="mt-1 truncate font-display text-base font-bold leading-tight text-[var(--color-fg)]">
              {point.title}
            </p>
            <p className="mt-0.5 truncate font-mono text-[0.62rem] text-[var(--color-fg-subtle)]">
              {point.detail}
            </p>
            <Link
              to={point.to}
              data-cursor="mission"
              className="link-underline mt-2 inline-block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-accent)]"
            >
              {point.cta} <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
          {/* scan timer — how long until the core moves to the next waypoint */}
          {scanning && (
            <span
              key={`timer-${active}`}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 block h-px origin-left bg-[var(--color-accent)]"
              style={{ animation: `scan-timer ${CYCLE_MS}ms linear forwards` }}
            />
          )}
        </div>
      </div>

      {/* frame lights up while engaged */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] ring-1 ring-[var(--color-accent)]/0 transition-all group-hover:ring-[var(--color-accent)]/50"
      />
    </div>
  );
}
