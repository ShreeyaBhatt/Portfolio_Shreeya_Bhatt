import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Small dot + outlined ring that reacts to what it's over. Desktop
 * (pointer: fine) only; native cursor everywhere else.
 *
 * Two tiers of state:
 *  - `[data-cursor-hover]`  → the ring expands. Generic "this is interactive".
 *  - `[data-cursor="..."]`  → the ring expands further and a mono label trails
 *    it. Context-aware readouts:
 *        project  → VIEW EXPERIMENT →
 *        external → OPEN →
 *        contact  → CONNECT →
 *
 * Deliberately not `mix-blend-mode`-based: blend-mode cursors composite
 * unreliably over canvas / nested stacking contexts and can end up an opaque
 * blob. A plain accent dot plus a mostly-hollow ring gets the same feel without
 * depending on blending to render.
 */
const LABELS = {
  project: "View experiment",
  external: "Open",
  contact: "Connect",
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30 });

  const rafRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer && !prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return undefined;
    document.body.classList.add("custom-cursor-active");

    function handleMove(event) {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
        rafRef.current = null;
      });
    }

    function handleOver(event) {
      const labelled = event.target.closest("[data-cursor]");
      const nextLabel = labelled ? LABELS[labelled.getAttribute("data-cursor")] ?? null : null;
      setLabel(nextLabel);
      setHovering(Boolean(nextLabel) || Boolean(event.target.closest("[data-cursor-hover]")));
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? 44 : 26;

  return (
    <>
      {/* small solid dot, tracks the pointer exactly */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full bg-[var(--color-accent)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          opacity: label ? 0 : 1,
        }}
      />

      {/* hollow ring, trails slightly and grows on hover — hidden while a
          contextual label is showing */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border-2 border-[var(--color-accent)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          opacity: label ? 0 : hovering ? 0.9 : 0.45,
          transition: "width 160ms ease, height 160ms ease, opacity 160ms ease",
        }}
      />

      {/* contextual label pill — replaces the ring on [data-cursor] elements */}
      <motion.div
        aria-hidden="true"
        className="label-mono pointer-events-none fixed left-0 top-0 z-[60] flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-[0.6rem] text-[var(--color-bg)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: label ? 1 : 0,
          transition: "opacity 140ms ease",
        }}
      >
        {label ? `${label} →` : ""}
      </motion.div>
    </>
  );
}
