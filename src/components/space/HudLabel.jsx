import { cn } from "../../lib/cn.js";

/**
 * A single spacecraft-diagnostic readout: a small mono key over a value, with
 * an optional leading status dot. Used around the hero avatar and in profile /
 * mission panels. Deliberately tiny — telemetry, not headings.
 *
 * @param {{ k: string, v: import("react").ReactNode, live?: boolean, className?: string }} props
 */
export function HudLabel({ k, v, live = false, className }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="coord flex items-center gap-1.5">
        {live && (
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
            style={{ animation: "lab-pulse 2.2s ease-in-out infinite", boxShadow: "0 0 8px var(--color-accent)" }}
          />
        )}
        {k}
      </p>
      <p className="mt-1 font-mono text-[0.8rem] text-[var(--color-fg)]">{v}</p>
    </div>
  );
}
