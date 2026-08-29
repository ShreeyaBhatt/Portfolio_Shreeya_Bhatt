import { useEffect, useRef, useState } from "react";

/**
 * A desktop-only cursor: a small glowing point that trails the pointer, plus a
 * ring that grows and shows a label when over something interactive. Elements
 * opt in with `data-cursor="mission | select | channel | external"`; links and
 * buttons get "select" automatically. Never rendered on touch devices.
 */
const LABELS = {
  mission: "Open mission →",
  select: "Select →",
  channel: "Open channel →",
  external: "Open link ↗",
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el = e.target instanceof Element ? e.target.closest("[data-cursor],a,button") : null;
      if (!el) {
        setHot(false);
        setLabel("");
        return;
      }
      const kind =
        el.getAttribute("data-cursor") ||
        (el.tagName === "A" && el.getAttribute("target") === "_blank" ? "external" : "select");
      setHot(true);
      setLabel(LABELS[kind] || "");
    };
    const down = () => ringRef.current?.style.setProperty("--press", "0.82");
    const up = () => ringRef.current?.style.setProperty("--press", "1");

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(var(--press, 1))`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65]">
      <span
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
        style={{ boxShadow: "0 0 10px var(--color-accent)" }}
      />
      <span
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          width: hot && label ? "auto" : hot ? "44px" : "30px",
          height: hot ? "24px" : "30px",
          paddingInline: hot && label ? "12px" : "0",
          borderColor: hot ? "var(--color-accent)" : "var(--color-border-strong)",
          backgroundColor: hot
            ? "color-mix(in srgb, var(--color-accent) 10%, transparent)"
            : "transparent",
        }}
      >
        {hot && label && (
          <span className="whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            {label}
          </span>
        )}
      </span>
    </div>
  );
}
