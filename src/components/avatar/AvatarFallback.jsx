import { cn } from "../../lib/cn.js";

/**
 * Shown when WebGL is unavailable or the visitor prefers reduced motion, and
 * while the 3D scene loads. A framed schematic of the command core — a
 * deliberate diagram, not a broken slot.
 */
export function AvatarFallback({ className, pending = false }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative flex aspect-square w-full items-center justify-center overflow-hidden", className)}
    >
      <div
        className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 320 320" className={cn("relative h-full w-full text-[var(--color-accent)]", pending && "animate-pulse")} fill="none">
        <ellipse cx="160" cy="160" rx="120" ry="46" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <ellipse cx="160" cy="160" rx="46" ry="120" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="160" cy="160" r="128" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="2 7" />
        <polygon
          points="160,96 214,132 194,196 126,196 106,132"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity="0.9"
        />
        <circle cx="160" cy="158" r="16" fill="currentColor" opacity="0.9" />
        <path d="M20 44V20h24M300 276v24h-24" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <p className="absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
        {pending ? "Core · initializing" : "Core · schematic"}
      </p>
    </div>
  );
}
