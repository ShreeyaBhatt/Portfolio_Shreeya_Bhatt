import { cn } from "../../lib/cn.js";

/**
 * One dark celestial body — a visual anchor, never a decoration. Rendered as a
 * softly lit sphere with an atmospheric rim and a faint terminator shadow.
 * Position it mostly off-screen with `className` (e.g. `-right-40 -top-40`).
 *
 * @param {{ size?: number, tint?: string, glow?: string, className?: string }} props
 */
export function Planet({ size = 520, tint = "#0a1526", glow = "var(--color-accent)", className }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        // Mid/edge/shade read theme tokens (set in index.css) so the same body
        // renders as a night-side planet in dark mode and a pale moon in light.
        background: `radial-gradient(circle at 32% 30%, ${tint} 0%, var(--planet-mid, #04070f) 62%, var(--planet-edge, #02040a) 100%)`,
        boxShadow: `inset -${size * 0.16}px -${size * 0.12}px ${size * 0.3}px var(--planet-shade, rgba(0,0,0,0.85)),
                    0 0 ${size * 0.34}px -${size * 0.12}px color-mix(in srgb, ${glow} 40%, transparent)`,
      }}
    >
      {/* atmosphere rim */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `inset ${size * 0.02}px ${size * 0.02}px ${size * 0.06}px color-mix(in srgb, ${glow} 22%, transparent)`,
        }}
      />
    </div>
  );
}
