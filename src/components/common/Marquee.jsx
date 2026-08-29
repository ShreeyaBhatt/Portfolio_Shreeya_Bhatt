import { cn } from "../../lib/cn.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * An edge-to-edge scrolling band of short strings.
 *
 * The track holds the item list twice and translates by exactly -50%, so the
 * second copy lands precisely where the first began and the loop is seamless
 * — no JS, no measurement, one CSS animation. Hovering the band pauses it
 * (`.marquee-track:hover`). Both ends fade into the page via a mask.
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
        <span className="whitespace-nowrap font-display text-h3 font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]">
          {item}
        </span>
        <span aria-hidden="true" className="text-sm text-[var(--color-accent)]">
          ✦
        </span>
      </li>
    ));

  const maskGradient = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden py-8", className)}
      style={{ maskImage: maskGradient, WebkitMaskImage: maskGradient }}
    >
      <ul
        className={cn("flex w-max items-center", !prefersReducedMotion && "marquee-track")}
        style={
          prefersReducedMotion
            ? undefined
            : {
                animationDuration: `${durationSeconds}s`,
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
