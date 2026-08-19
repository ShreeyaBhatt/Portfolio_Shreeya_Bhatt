import { cn } from "../../lib/cn.js";

/** Small labeled badge for things like "Featured" or category markers. */
export function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-accent)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]",
        className
      )}
    >
      {children}
    </span>
  );
}
