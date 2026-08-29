import { useEffect, useRef, useState } from "react";

/**
 * A desktop-only targeting-reticle cursor. A fast cyan point marks the exact
 * pointer; a slower square of corner brackets tracks behind it like a HUD
 * lock. Over anything interactive the brackets snap inward, a ring locks on,
 * and a context label appears. Never rendered on touch devices.
 */
const LABELS = {
  mission: "Open mission",
  select: "Select",
  channel: "Open channel",
  external: "Open link",
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [label, setLabel] = useState("");
  const dotRef = useRef(null);
  const reticleRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const lag = { x: pos.x, y: pos.y };
    let raf = 0;
    let down = false;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el =
        e.target instanceof Element
          ? e.target.closest("[data-cursor],a,button,[role='button']")
          : null;
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
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.2;
      lag.y += (pos.y - lag.y) * 0.2;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${down ? 0.5 : 1})`;
      if (reticleRef.current)
        reticleRef.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0) rotate(${down ? 45 : 0}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const SIZE = hot ? 34 : 26;
  const bracket = "absolute h-[7px] w-[7px] border-[var(--color-accent)] transition-all duration-200";
  const inset = hot ? 5 : 0;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[65]">
      {/* exact point */}
      <span
        ref={dotRef}
        className="fixed left-0 top-0 h-1 w-1 rounded-full bg-[var(--color-accent)] transition-transform duration-100"
        style={{ boxShadow: "0 0 8px var(--color-accent)" }}
      />

      {/* tracking reticle (origin is its centre; children position from centre) */}
      <span ref={reticleRef} className="fixed left-0 top-0">
        <span
          className="absolute transition-all duration-200"
          style={{ width: SIZE, height: SIZE, left: -SIZE / 2, top: -SIZE / 2 }}
        >
          {/* lock ring */}
          <span
            className="absolute inset-0 rounded-full border border-[var(--color-accent)] transition-all duration-200"
            style={{
              opacity: hot ? 0.85 : 0,
              transform: `scale(${hot ? 1 : 0.4})`,
              boxShadow: hot ? "0 0 12px -2px var(--color-accent)" : "none",
            }}
          />
          {/* corner brackets */}
          <span className={`${bracket} border-l border-t`} style={{ left: inset, top: inset }} />
          <span className={`${bracket} border-r border-t`} style={{ right: inset, top: inset }} />
          <span className={`${bracket} border-l border-b`} style={{ left: inset, bottom: inset }} />
          <span className={`${bracket} border-r border-b`} style={{ right: inset, bottom: inset }} />
        </span>

        {/* context label — rides off the lower-right of the reticle */}
        <span
          className="absolute whitespace-nowrap rounded-[3px] border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-sm transition-opacity duration-150"
          style={{ left: SIZE / 2 + 6, top: SIZE / 2 - 4, opacity: hot && label ? 1 : 0 }}
        >
          {label || "—"} <span aria-hidden="true">→</span>
        </span>
      </span>
    </div>
  );
}
