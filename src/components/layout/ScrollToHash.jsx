import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * React Router doesn't scroll to `#hash` targets on navigation. This does:
 * on every location change it either scrolls the matching element into view
 * (honouring reduced motion) or, with no hash, resets to the top.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    // The destination route may not have painted yet — try now, next frame,
    // and once more after a beat, then stop.
    let done = false;
    const target = hash.slice(1);
    const tryScroll = () => {
      if (done) return;
      const el = document.getElementById(target);
      if (el) {
        done = true;
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    };
    tryScroll();
    const raf = requestAnimationFrame(tryScroll);
    const t = window.setTimeout(tryScroll, 140);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pathname, hash, prefersReducedMotion]);

  return null;
}
