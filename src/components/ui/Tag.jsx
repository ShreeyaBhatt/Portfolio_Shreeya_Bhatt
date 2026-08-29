import { cn } from "../../lib/cn.js";

/**
 * Small mono chip used for tech stacks and credential topics.
 *
 * Outlined rather than filled: a project card can carry seven of these, and
 * seven filled swatches would out-shout the project title they belong to.
 */
export function Tag({ className, children, tone = "accent" }) {
  const toneClasses =
    tone === "accent2"
      ? "border-[var(--color-accent-2)]/35 text-[var(--color-accent-2)]"
      : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs",
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
