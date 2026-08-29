import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Counts from 0 up to `value` once it scrolls into view, preserving the
 * original string's zero-padding ("05" counts 00 → 05). Reduced motion jumps
 * straight to the value.
 *
 * @param {{ value: string, duration?: number, className?: string }} props
 */
export function CountUp({ value, duration = 1100, className }) {
  const target = parseInt(String(value).replace(/\D/g, ""), 10);
  const pad = String(value).replace(/\D/g, "").length;
  const suffix = String(value).replace(/[0-9]/g, "");
  const prefersReducedMotion = usePrefersReducedMotion();
  const [n, setN] = useState(prefersReducedMotion || !Number.isFinite(target) ? target : 0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || !Number.isFinite(target) || !ref.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setN(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration, prefersReducedMotion]);

  const text = Number.isFinite(target)
    ? String(n).padStart(pad, "0") + suffix
    : value;

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
