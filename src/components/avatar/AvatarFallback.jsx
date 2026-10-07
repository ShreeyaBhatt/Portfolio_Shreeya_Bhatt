import { cn } from "../../lib/cn.js";

/** Satellites sit on the schematic's outer orbit (the wide ellipse). */
const CX = 160;
const CY = 160;
const RX = 120;
const RY = 46;
const orbit = (count) =>
  Array.from({ length: count }, (_, i) => {
    const a = -Math.PI / 2 + (i / count) * Math.PI * 2;
    return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
  });

/**
 * Shown when WebGL is unavailable or the visitor prefers reduced motion, and
 * while the 3D scene loads. A framed schematic of the command core — a
 * deliberate diagram, not a broken slot — with the waypoint satellites on its
 * outer orbit. Dots are pointer/touch targets only; the keyboard path is the
 * channel rail in MissionCore, so the drawing itself stays aria-hidden.
 *
 * @param {{ className?: string, pending?: boolean, count?: number, active?: number, onHover?: (i: number|null) => void, onSelect?: (i: number) => void }} props
 */
export function AvatarFallback({ className, pending = false, count = 0, active, onHover, onSelect }) {
  const satellites = orbit(count);
  const lock = typeof active === "number" ? satellites[active] : null;

  return (
    <div
      aria-hidden="true"
      className={cn("relative flex aspect-square w-full items-center justify-center overflow-hidden", className)}
    >
      <div
        className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 320 320" className="relative h-full w-full text-[var(--color-accent)]" fill="none">
        <g className={cn(pending && "animate-pulse")}>
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <ellipse cx={CX} cy={CY} rx="46" ry="120" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx={CX} cy={CY} r="128" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="2 7" />
          <polygon
            points="160,96 214,132 194,196 126,196 106,132"
            stroke="currentColor"
            strokeWidth="1.75"
            opacity="0.9"
          />
          <circle cx={CX} cy="158" r="16" fill="currentColor" opacity="0.9" />
          <path d="M20 44V20h24M300 276v24h-24" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        </g>

        {/* link from the core to the locked satellite */}
        {lock && (
          <line x1={CX} y1="158" x2={lock.x} y2={lock.y} stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        )}

        {satellites.map((s, i) => {
          const on = i === active;
          return (
            <g
              key={i}
              className={onSelect ? "cursor-pointer" : undefined}
              onPointerEnter={onHover ? () => onHover(i) : undefined}
              onClick={onSelect ? () => onSelect(i) : undefined}
            >
              {/* generous hit area for touch */}
              <circle cx={s.x} cy={s.y} r="16" fill="transparent" />
              {on && <circle cx={s.x} cy={s.y} r="11" stroke="currentColor" strokeWidth="1" opacity="0.8" />}
              <circle cx={s.x} cy={s.y} r={on ? 5.5 : 3.5} fill="currentColor" opacity={on ? 1 : 0.65} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
