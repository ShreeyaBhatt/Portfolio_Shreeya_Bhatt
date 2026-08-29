import { cn } from "../../lib/cn.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * An edge-to-edge scrolling band of short strings.
 *
 * The track holds the item list twice and translates by exactly -50%, so the
 * second copy lands precisely where the first began and the loop is seamless
 * — no JS, no measurement, one CSS animation.
 *
 * Spacing lives entirely *inside* each item (padding, not a flex `gap`): a gap
 * on the track would also sit between the two copies, making the track wider
 * than 2× one copy and putting a visible stutter at every wrap.
 *
 * Both ends fade into the page background via a mask, so the band reads as a
 * window onto something continuous rather than a strip that abruptly stops.
 *
 * Under reduced motion the track is static and the list renders once.
 *
 * @param {{ items: string[], durationSeconds?: number, reverse?: boolean, className?: string }} props
 */
export function Marquee({ items, durationSeconds = 45, reverse = false, className }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderItems = (copy) =>
    items.map((item, index) => (
      <li
        key={`${copy}-${item}-${index}`}
        className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
      >
        <span className="whitespace-nowrap font-display text-h3 font-medium text-[var(--color-fg-muted)]">
          {item}
        </span>
        <span aria-hidden="true" className="text-sm text-[var(--color-accent)]">
          ✦
        </span>
      </li>
    ));

  const maskGradient = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden py-8", className)}
      style={{ maskImage: maskGradient, WebkitMaskImage: maskGradient }}
    >
      <ul
        className="flex w-max items-center"
        style={
          prefersReducedMotion
            ? undefined
            : {
                animation: `marquee-scroll ${durationSeconds}s linear infinite`,
                animationDirection: reverse ? "reverse" : "normal",
              }
        }
      >
        {renderItems("a")}
        {!prefersReducedMotion && renderItems("b")}
      </ul>
    </div>
  );
}
