import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { StarField } from "./StarField.jsx";
import { Planet } from "./Planet.jsx";

/**
 * The layered environment the whole site sits inside — fixed, behind
 * everything, non-interactive:
 *
 *   1. deep-space vertical gradient
 *   2. two faint nebula clouds
 *   3. a slow parallax star field (canvas)
 *   4. one distant planet as a visual anchor
 *   5. a barely-there technical grid
 *   6. a vignette
 *
 * ORBIT SHIFT — as the whole page scrolls, the planet drifts and rolls a few
 * degrees and the grid slides, so travelling down the site reads as changing
 * perspective in orbit. Subtle, one transform each, and disabled under
 * reduced motion.
 */
export function SpaceBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const planetY = useTransform(scrollYProgress, [0, 1], ["0vh", "-22vh"]);
  const planetRot = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0px", "-140px"]);
  const nebulaX = useTransform(scrollYProgress, [0, 1], ["0vw", "10vw"]);

  return (
    <div
      aria-hidden="true"
      className="space-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1 — base gradient (deep-space only; hidden in light mode) */}
      <div
        className="space-deep absolute inset-0"
        style={{ background: "linear-gradient(180deg, #04060f 0%, #030712 42%, #02040c 100%)" }}
      />

      {/* 2 — nebula */}
      <motion.div
        style={reduce ? undefined : { x: nebulaX }}
        className="space-deep absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] opacity-70"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-accent-2) 16%, transparent) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>
      <div
        className="space-deep absolute bottom-[-10%] right-[-15%] h-[60vh] w-[55vw] opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 62%)",
          filter: "blur(48px)",
        }}
      />

      {/* 3 — drifting particles (recoloured for light mode via --star-color) */}
      <StarField className="space-particles absolute inset-0 h-full w-full" />

      {/* 4 — anchor planet (orbit shift) */}
      <motion.div
        style={reduce ? undefined : { y: planetY, rotate: planetRot }}
        className="space-deep absolute right-[-18rem] top-[38vh] hidden md:block"
      >
        <Planet size={640} tint="#0b1a30" glow="var(--color-accent)" />
      </motion.div>

      {/* 5 — technical grid (orbit shift) */}
      <motion.div
        style={{
          y: reduce ? 0 : gridY,
          maskImage: "radial-gradient(circle at 50% 30%, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black, transparent 78%)",
          "--grid-size": "64px",
        }}
        className="space-deep grid-overlay absolute inset-x-0 -top-40 h-[calc(100%+20rem)] opacity-50"
      />

      {/* 6 — vignette */}
      <div
        className="space-deep absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(2,4,10,0.55) 100%)",
        }}
      />
    </div>
  );
}
