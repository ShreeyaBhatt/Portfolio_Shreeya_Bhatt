import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A brief hyperspace jump between routes — star streaks accelerate outward from
 * centre while the screen dims, then clears (~560ms). Purely decorative and
 * `pointer-events-none`; skipped entirely under reduced motion (PageTransition's
 * fade covers that case).
 */
export function WarpTransition() {
  const { pathname } = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (first.current) {
      first.current = false;
      return; // no warp on initial load
    }
    setActive(true);
    const timer = setTimeout(() => setActive(false), 620);
    return () => clearTimeout(timer);
  }, [pathname, prefersReducedMotion]);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    const cx = w / 2;
    const cy = h / 2;

    const streaks = Array.from({ length: 150 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random() * 60,
      speed: 6 + Math.random() * 22,
      len: 20 + Math.random() * 120,
      hue: Math.random() < 0.3 ? "143, 220, 255" : "255, 255, 255",
    }));

    const start = performance.now();
    const DURATION = 560;
    let raf = 0;

    const frame = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const accel = 1 + t * 9;
      ctx.clearRect(0, 0, w, h);
      // dim flash: in then out
      const dim = t < 0.5 ? t * 2 * 0.55 : (1 - (t - 0.5) * 2) * 0.55;
      ctx.fillStyle = `rgba(2, 4, 10, ${dim})`;
      ctx.fillRect(0, 0, w, h);

      const alpha = t < 0.15 ? t / 0.15 : t > 0.8 ? (1 - t) / 0.2 : 1;
      for (const s of streaks) {
        s.r += s.speed * accel;
        const x1 = cx + Math.cos(s.a) * s.r;
        const y1 = cy + Math.sin(s.a) * s.r;
        const x2 = cx + Math.cos(s.a) * (s.r - s.len);
        const y2 = cy + Math.sin(s.a) * (s.r - s.len);
        ctx.strokeStyle = `rgba(${s.hue}, ${alpha * 0.9})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[68] h-full w-full"
    />
  );
}
