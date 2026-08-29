import { cn } from "../../lib/cn.js";
import { getMotionComponent } from "../../lib/motion.js";

/**
 * Shared button primitive.
 *
 * The hover is a fill that wipes up from the bottom edge rather than a colour
 * fade — it's a single transform, so it stays smooth, and it gives every CTA
 * on the site the same physical, deliberate feel. The label sits above the
 * fill and inverts as it passes.
 *
 * Every CTA renders through this so radius, padding, and easing stay
 * consistent (design-token guardrail).
 */
const variantClasses = {
  primary: cn(
    "border-transparent bg-[var(--color-accent)] text-[var(--color-bg)]",
    "hover:text-[var(--color-bg)]"
  ),
  secondary: cn(
    "border-[var(--color-border-strong)] bg-transparent text-[var(--color-fg)]",
    "hover:border-[var(--color-accent)] hover:text-[var(--color-bg)]"
  ),
  ghost: "border-transparent bg-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
};

/** The colour that wipes up behind the label. */
const fillClasses = {
  primary: "bg-[var(--color-fg)]",
  secondary: "bg-[var(--color-accent)]",
  ghost: "bg-transparent",
};

export function Button({ as = "button", variant = "primary", className, children, ...props }) {
  const Component = getMotionComponent(as);

  return (
    <Component
      data-cursor-hover
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border",
        "px-6 py-3 text-sm font-medium transition-colors duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:translate-y-0",
            fillClasses[variant]
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </Component>
  );
}
