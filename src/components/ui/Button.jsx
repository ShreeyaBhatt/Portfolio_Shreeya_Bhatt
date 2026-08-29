import { useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { cn } from "../../lib/cn.js";
import { getMotionComponent } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Shared button primitive.
 *
 * Two things move on it:
 *  - a fill that wipes up from the bottom edge on hover (one transform, so it
 *    stays smooth), with the label inverting as it passes;
 *  - a magnetic pull — while the pointer is over the button it drifts a
 *    fraction of the cursor's offset from centre, then springs back on leave.
 *    The pull is spring-smoothed and disabled under reduced motion.
 *
 * Every CTA renders through this so radius, padding, easing, and that motion
 * stay consistent site-wide.
 */
const variantClasses = {
  primary: "border-transparent bg-[var(--color-accent)] text-[var(--color-bg)] hover:text-[var(--color-bg)]",
  secondary:
    "border-[var(--color-border-strong)] bg-transparent text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-bg)]",
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
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  function handlePointerMove(event) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * 0.3);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * 0.4);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <Component
      ref={ref}
      data-cursor-hover
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x, y }}
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
