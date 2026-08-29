import { cn } from "../../lib/cn.js";

/**
 * Consistent max-width/padding wrapper reused across every page section.
 * The vertical rhythm is deliberately generous — whitespace is what lets the
 * oversized display type read as composed rather than crowded.
 */
export function Section({ className, children, id, ...props }) {
  return (
    <section id={id} className={cn("container-page py-20 md:py-32", className)} {...props}>
      {children}
    </section>
  );
}
