import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#";

/**
 * Text that "decodes" into place — characters settle from random glyphs, left
 * to right, like a terminal resolving a value. Robust by design: it renders
 * the real text immediately and only *briefly* scrambles once it scrolls into
 * view, so a stalled frame can never leave garbage on screen. No-ops under
 * reduced motion.
 *
 * @param {{ text: string, as?: keyof JSX.IntrinsicElements, className?: string, delay?: number }} props
 */
export function Scramble({ text, as: Tag = "span", className, delay = 0 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    setDisplay(text);
    if (prefersReducedMotion || !ref.current) return undefined;
    const node = ref.current;
    let raf = 0;
    let to = 0;
    let failsafe = 0;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const total = text.length;
      let frame = 0;
      failsafe = window.setTimeout(() => {
        cancelAnimationFrame(raf);
        setDisplay(text);
      }, 1600);

      const tick = () => {
        const revealed = Math.floor(frame / 1.8);
        if (revealed > total) {
          setDisplay(text);
          window.clearTimeout(failsafe);
          return;
        }
        let out = "";
        for (let i = 0; i < total; i += 1) {
          if (text[i] === " ") out += " ";
          else if (i < revealed) out += text[i];
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        frame += 1;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          to = window.setTimeout(run, delay);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(to);
      window.clearTimeout(failsafe);
    };
  }, [text, delay, prefersReducedMotion]);

  return (
    <Tag ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </Tag>
  );
}
