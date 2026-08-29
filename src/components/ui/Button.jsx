import { cn } from "../../lib/cn.js";

/**
 * Shared button primitive — a spacecraft control. Static (no magnetic pull):
 * the only motion is a fill that wipes up from the bottom edge on hover. Every
 * CTA renders through this so radius, padding and easing stay consistent.
 */
const variantClasses = {
  primary:
    "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)] hover:text-[var(--color-accent)]",
  secondary:
    "border-[var(--color-border-strong)] bg-transparent text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ghost: "border-transparent bg-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
};

const fillClasses = {
  primary: "bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)]",
  secondary: "bg-[var(--color-accent-soft)]",
  ghost: "bg-transparent",
};

export function Button({ as: Component = "button", variant = "primary", className, children, ...props }) {
  return (
    <Component
      data-cursor="select"
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-[var(--radius-sm)] border",
        "px-5 py-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0",
            fillClasses[variant]
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </Component>
  );
}
