import { cn } from "../../lib/cn.js";

/** Marker for the one thing on a page that should be singled out. */
export function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 text-[var(--color-accent)]",
        className
      )}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
      {children}
    </span>
  );
}
