import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A soft mint glow that trails the cursor — just enough to make the dark
 * ground feel lit from wherever you're pointing. Fixed, behind content,
 * `pointer-events-none`, and updated on a rAF so the pointer handler stays
 * cheap. Skipped on touch and under reduced motion.
 */
export function Spotlight() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[42rem] w-[42rem] will-change-transform"
      style={{
        marginLeft: "-21rem",
        marginTop: "-21rem",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 9%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}
