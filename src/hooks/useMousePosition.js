import { useEffect } from "react";
import { motionValue } from "motion/react";

/**
 * One shared, normalised pointer position for the whole app: -1..1 on each
 * axis with 0,0 at the viewport centre.
 *
 * Every consumer reads the *same* two motion values and derives its own
 * transform from them (`useTransform(x, [-1, 1], [...])`), so there is a
 * single global listener no matter how many components subscribe, and moving
 * the mouse never triggers a React render — only the motion values update.
 *
 * The listener is ref-counted: attached on the first subscriber, removed when
 * the last one unmounts. It is not attached at all when the user prefers
 * reduced motion, so every derived transform simply stays at its 0 position.
 */
const x = motionValue(0);
const y = motionValue(0);

let subscribers = 0;
let raf = null;

function handleMove(event) {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = null;
    x.set((event.clientX / window.innerWidth) * 2 - 1);
    y.set((event.clientY / window.innerHeight) * 2 - 1);
  });
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useMousePosition() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    subscribers += 1;
    if (subscribers === 1) {
      window.addEventListener("pointermove", handleMove, { passive: true });
    }

    return () => {
      subscribers -= 1;
      if (subscribers === 0) {
        window.removeEventListener("pointermove", handleMove);
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        x.set(0);
        y.set(0);
      }
    };
  }, []);

  return { x, y };
}
