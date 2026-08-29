import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn.js";
import { projects } from "../../data/projects.js";

/**
 * A horizontal, snap-scrolling gallery of the projects: drag it, wheel it,
 * arrow-key it, or use the controls. A progress bar and an "NN / NN" readout
 * track where you are. This is the home page's lead "work" surface; the full
 * list still lives on /projects.
 */
export function ProjectCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });

  const cardWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 1;
    const first = track.querySelector("[data-card]");
    return first ? first.getBoundingClientRect().width + 24 : track.clientWidth;
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / cardWidth()));
  }, [cardWidth]);

  const go = useCallback(
    (dir) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({ left: dir * cardWidth(), behavior: "smooth" });
    },
    [cardWidth]
  );

  // pointer drag
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const down = (e) => {
      drag.current = {
        active: true,
        startX: e.clientX,
        startLeft: track.scrollLeft,
        moved: 0,
      };
      track.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      drag.current.moved = Math.abs(dx);
      track.scrollLeft = drag.current.startLeft - dx;
    };
    const up = (e) => {
      drag.current.active = false;
      track.releasePointerCapture?.(e.pointerId);
      // snap to nearest
      track.scrollTo({ left: Math.round(track.scrollLeft / cardWidth()) * cardWidth(), behavior: "smooth" });
    };

    track.addEventListener("pointerdown", down);
    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
    return () => {
      track.removeEventListener("pointerdown", down);
      track.removeEventListener("pointermove", move);
      track.removeEventListener("pointerup", up);
      track.removeEventListener("pointercancel", up);
    };
  }, [cardWidth]);

  const total = projects.length;

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* header row: readout + controls */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          <span className="text-[var(--color-accent)]">{String(index + 1).padStart(2, "0")}</span>
          {" / "}
          {String(total).padStart(2, "0")}
          <span className="ml-3 hidden sm:inline">drag · scroll · ← →</span>
        </p>
        <div className="flex gap-2">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              aria-label={dir < 0 ? "Previous project" : "Next project"}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {dir < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      {/* track */}
      <ul
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        className="scroll-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-gutter:stable] focus-visible:outline-none"
      >
        {projects.map((p, i) => (
          <li
            key={p.slug}
            data-card
            className="min-w-[82vw] shrink-0 snap-start sm:min-w-[24rem] lg:min-w-[27rem]"
          >
            <Link
              to={`/projects/${p.slug}`}
              onClick={(e) => {
                if (drag.current.moved > 6) e.preventDefault(); // ignore clicks that were drags
              }}
              className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-raised)] md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] text-[var(--color-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                  {p.status}
                </span>
              </div>

              <h3 className="mt-8 text-h3 font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-fg-subtle)]">{p.category}</p>

              <p className="mt-5 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {p.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
                {p.tech.slice(0, 4).map((t) => (
                  <li key={t} className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
                    {t}
                  </li>
                ))}
              </ul>

              <span className="mt-7 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-fg)]">
                Open case study
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* progress */}
      <div className="mt-6 h-px w-full bg-[var(--color-border)]">
        <div
          className="h-full bg-[var(--color-accent)] transition-[width] duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
