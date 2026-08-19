import { cn } from "../../lib/cn.js";

/** Small mono-font chip used for tech stacks, post tags, and stat labels. */
export function Tag({ className, children, tone = "accent" }) {
  const toneClasses =
    tone === "accent2"
      ? "bg-[var(--color-accent-2-soft)] text-[var(--color-accent-2)]"
      : "bg-[var(--color-accent-soft)] text-[var(--color-accent)]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 font-mono text-xs",
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
