import { cn } from "../../lib/cn.js";

/** Consistent max-width/padding wrapper reused across every page section. */
export function Section({ className, children, id, ...props }) {
  return (
    <section id={id} className={cn("container-page py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}
