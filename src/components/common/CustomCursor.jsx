import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** Small dot+ring cursor that scales on hoverable elements. Desktop (pointer: fine) only. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

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
      setHovering(Boolean(event.target.closest("[data-cursor-hover]")));
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

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: hovering ? 36 : 18,
        height: hovering ? 36 : 18,
        backgroundColor: "#ffffff",
        transition: "width 150ms ease, height 150ms ease",
      }}
    />
  );
}
