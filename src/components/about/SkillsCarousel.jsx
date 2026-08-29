import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { skillCategories } from "../../data/skills.js";
import { cn } from "../../lib/cn.js";
import { easeSignature, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A horizontal carousel of skill categories, one full colour panel per group.
 *
 * Movement is native scroll-snap rather than a JS drag rig. That buys real
 * touch swiping, trackpad momentum, and keyboard scrolling for free, and it
 * degrades perfectly if scripting is slow to arrive — the controls below only
 * call `scrollTo`, they aren't what makes it work.
 *
 * Each panel carries a `.tone-*` class that defines `--slide-accent` and
 * `--slide-tint` (see src/styles/index.css). Those two variables colour the
 * numeral, the rules, the chips, the panel wash, and the ambient glow behind
 * the deck, so a slide's identity is one class rather than a dozen props —
 * and it flips with the theme without any JS.
 *
 * Depth comes from scale: the focused panel sits at full size while its
 * neighbours hold back slightly, so the deck reads as cards in space rather
 * than a filmstrip.
 */
export function SkillsCarousel() {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const total = skillCategories.length;

  const scrollToIndex = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      const slide = slideRefs.current[clamped];
      const track = trackRef.current;
      if (!slide || !track) return;

      // Centre the target slide in the track. `scrollIntoView` would also
      // scroll the page vertically, which yanks the reader out of the section.
      const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
      track.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
    },
    [total, prefersReducedMotion]
  );

  // Derive the active slide from real scroll position — whichever slide's
  // centre is nearest the track's centre — so swipes, arrows, keyboard, and
  // trackpad all stay in sync through one code path.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = null;
    function handleScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const trackCentre = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let nearestDistance = Infinity;
        slideRefs.current.forEach((slide, index) => {
          if (!slide) return;
          const distance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - trackCentre);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = index;
          }
        });
        setActiveIndex(nearest);
      });
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  }

  const activeTone = skillCategories[activeIndex].tone;

  return (
    <div className="relative">
      {/* Ambient glow behind the deck, tinted by whichever panel is focused.
          This is what makes the colour change feel like an event rather than
          a swapped swatch — the light around the card changes too. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[var(--radius-lg)] blur-3xl transition-colors duration-700",
          `tone-${activeTone}`
        )}
        style={{ background: "var(--slide-tint)" }}
      />

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Skills by category"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        // The track is focusable so the deck is reachable and drivable by
        // keyboard alone; it keeps a visible focus ring for exactly that
        // reason, offset inward so it isn't cropped by the overflow.
        className={cn(
          "scroll-track flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 md:gap-8",
          "rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-accent)]"
        )}
        // Inline rather than an arbitrary Tailwind class: `calc()` needs real
        // whitespace around its operator, which a class string can't carry
        // without underscore escapes. The padding is half the track minus
        // half a panel, so the first and last panels can reach dead centre
        // like every other one — without it, neither end can ever be focused.
        style={{ paddingInline: "max(1.5rem, calc(50% - 27rem))" }}
      >
        {skillCategories.map((category, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={category.category}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}: ${category.category}`}
              className={cn(
                `tone-${category.tone}`,
                "relative w-[85vw] max-w-[54rem] shrink-0 snap-center overflow-hidden",
                "rounded-[var(--radius-lg)] border bg-[var(--color-bg-raised)]",
                "px-7 py-10 sm:px-12 sm:py-14 md:px-16 md:py-20",
                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive
                  ? "scale-100 opacity-100 shadow-[var(--shadow-raised)]"
                  : "scale-[0.94] opacity-55"
              )}
              style={{
                borderColor: isActive ? "var(--slide-accent)" : "var(--color-border)",
                backgroundImage:
                  "linear-gradient(155deg, var(--slide-tint), transparent 55%)",
              }}
            >
              {/* Oversized ghost numeral — depth and a sense of place in the deck. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] font-bold leading-none opacity-[0.07] sm:text-[16rem]"
                style={{ color: "var(--slide-accent)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <p className="label-mono" style={{ color: "var(--slide-accent)" }}>
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>

                <h3 className="mt-5 text-h2 font-medium">{category.category}</h3>

                <p className="mt-5 max-w-lg text-lead text-[var(--color-fg-muted)]">
                  {category.blurb}
                </p>

                <div
                  className="mt-10 h-px w-full"
                  style={{ background: "var(--slide-accent)", opacity: 0.35 }}
                  aria-hidden="true"
                />

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    // Chips stagger in as their panel takes focus, and settle
                    // back when it loses it — so swiping to a slide has a
                    // payoff rather than just sliding finished content past.
                    <motion.li
                      key={skill}
                      initial={false}
                      animate={
                        isActive || prefersReducedMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={{
                        duration: 0.4,
                        ease: easeSignature,
                        delay: isActive && !prefersReducedMotion ? skillIndex * 0.045 : 0,
                      }}
                      className="rounded-full border px-4 py-2 font-mono text-xs sm:text-sm"
                      style={{
                        borderColor: "color-mix(in srgb, var(--slide-accent) 45%, transparent)",
                        color: "var(--slide-accent)",
                        background: "var(--slide-tint)",
                      }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>

                <p className="label-mono mt-10 text-[var(--color-fg-subtle)]">
                  {category.skills.length} skills
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls: segmented rail + counter + arrows. The rail doubles as
          navigation, so the whole deck is reachable in one click. */}
      <div className={cn("mt-8 flex items-center justify-between gap-6", `tone-${activeTone}`)}>
        <div className="flex flex-1 items-center gap-2">
          {skillCategories.map((category, index) => (
            <button
              key={category.category}
              type="button"
              data-cursor-hover
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to ${category.category}`}
              aria-current={index === activeIndex}
              className="group relative flex h-6 flex-1 items-center rounded-full"
            >
              <span
                className="block h-0.5 w-full rounded-full transition-colors duration-300"
                style={{
                  background:
                    index === activeIndex
                      ? "var(--slide-accent)"
                      : "var(--color-border-strong)",
                }}
              />
            </button>
          ))}
        </div>

        <p className="label-mono shrink-0 tabular-nums text-[var(--color-fg-subtle)]">
          <span style={{ color: "var(--slide-accent)" }}>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>{" "}
          / {String(total).padStart(2, "0")}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <CarouselButton
            label="Previous category"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            <ArrowLeft size={16} />
          </CarouselButton>
          <CarouselButton
            label="Next category"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === total - 1}
          >
            <ArrowRight size={16} />
          </CarouselButton>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        className="label-mono mt-6 text-[var(--color-fg-subtle)]"
      >
        Drag, swipe, or use ← → to explore
      </motion.p>
    </div>
  );
}

function CarouselButton({ label, onClick, disabled, children }) {
  return (
    <button
      type="button"
      data-cursor-hover
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300",
        disabled
          ? "cursor-not-allowed border-[var(--color-border)] text-[var(--color-fg-subtle)] opacity-40"
          : "border-[var(--color-border-strong)] text-[var(--color-fg)] hover:bg-[var(--slide-accent)] hover:text-[var(--color-bg)]"
      )}
      style={disabled ? undefined : { borderColor: "var(--slide-accent)" }}
    >
      {children}
    </button>
  );
}
