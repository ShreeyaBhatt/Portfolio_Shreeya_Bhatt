import { cn } from "../../lib/cn.js";
import { easeSignature, durations, getMotionComponent } from "../../lib/motion.js";

const variantClasses = {
  primary:
    "bg-[var(--color-accent)] text-white hover:brightness-110 shadow-[var(--shadow-resting)]",
  secondary:
    "bg-transparent text-[var(--color-fg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ghost: "bg-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
};

/**
 * Shared button primitive — every CTA in the site should render through this
 * so hover-lift, radius, and easing stay consistent (design-token guardrail).
 */
export function Button({
  as = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  const Component = getMotionComponent(as);

  return (
    <Component
      data-cursor-hover
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: durations.micro, ease: easeSignature }}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-5 py-2.5 text-sm font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
