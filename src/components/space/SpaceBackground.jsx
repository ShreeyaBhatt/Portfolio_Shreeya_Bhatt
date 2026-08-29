import { StarField } from "./StarField.jsx";
import { Planet } from "./Planet.jsx";

/**
 * The layered environment the whole site sits inside — fixed, behind
 * everything, non-interactive:
 *
 *   1. deep-space vertical gradient
 *   2. two faint nebula clouds (radial gradients)
 *   3. a slow parallax star field (canvas)
 *   4. one distant planet as a visual anchor, low and to the right
 *   5. a barely-there technical grid
 *   6. a vignette that keeps focus centre-stage
 *
 * Nothing here animates aggressively; it should read as a view through a
 * spacecraft window, not a screensaver.
 */
export function SpaceBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1 — base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #04060f 0%, #030712 42%, #02040c 100%)",
        }}
      />

      {/* 2 — nebula */}
      <div
        className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] opacity-70"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent-2) 16%, transparent) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute right-[-15%] bottom-[-10%] h-[60vh] w-[55vw] opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 62%)",
          filter: "blur(48px)",
        }}
      />

      {/* 3 — stars */}
      <StarField className="absolute inset-0 h-full w-full" />

      {/* 4 — anchor planet */}
      <Planet
        size={640}
        className="right-[-18rem] top-[38vh] hidden md:block"
        tint="#0b1a30"
        glow="var(--color-accent)"
      />

      {/* 5 — technical grid */}
      <div
        className="grid-overlay absolute inset-0 opacity-[0.5]"
        style={{ "--grid-size": "64px", maskImage: "radial-gradient(circle at 50% 30%, black, transparent 78%)", WebkitMaskImage: "radial-gradient(circle at 50% 30%, black, transparent 78%)" }}
      />

      {/* 6 — vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(2,4,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
