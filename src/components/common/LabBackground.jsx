import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The lab's ambient backdrop — mounted once in the layout, sitting behind
 * everything at a negative z-index.
 *
 * Three flat layers, all CSS, all driven by the theme custom properties in
 * src/styles/index.css so they flip with light/dark without a JS colour read:
 *
 *   1. a fine 1px grid (two repeating linear-gradients)
 *   2. a faint grain wash (inline SVG fractal noise as a data-URI)
 *   3. one soft instrument glow, low and off-centre
 *
 * The glow drifts very slowly so the ground is never perfectly static; under
 * prefers-reduced-motion it holds still. Nothing here ever paints above the
 * content or intercepts a pointer event.
 */
const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
     <filter id='n'>
       <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
       <feColorMatrix type='saturate' values='0'/>
     </filter>
     <rect width='100%' height='100%' filter='url(#n)'/>
   </svg>`
);

export function LabBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1px grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "var(--grid-size) var(--grid-size)",
          maskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, black 30%, transparent 90%)",
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          opacity: "var(--grain-opacity)",
        }}
      />

      {/* instrument glow */}
      <div
        className="absolute -inset-[20%]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 18% 12%, var(--color-accent-soft), transparent 60%), radial-gradient(ellipse 45% 38% at 82% 92%, var(--color-accent-2-soft), transparent 60%)",
          opacity: "var(--glow-opacity)",
          animation: prefersReducedMotion
            ? undefined
            : "lab-glow-drift 90s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes lab-glow-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-2%, 2%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
