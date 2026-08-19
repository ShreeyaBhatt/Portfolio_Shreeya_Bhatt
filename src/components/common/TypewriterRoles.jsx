import { useEffect, useState } from "react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const TYPING_MS = 65;
const DELETING_MS = 35;
const PAUSE_AFTER_TYPED_MS = 1400;
const PAUSE_AFTER_DELETED_MS = 300;

/** Terminal-style typewriter that cycles through profile.roles — a personal, code-flavored touch. */
export function TypewriterRoles({ className }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const roles = profile.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(prefersReducedMotion ? roles[0].length : 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const currentRole = roles[roleIndex];

    if (!deleting && subIndex === currentRole.length) {
      const timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPED_MS);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      }, PAUSE_AFTER_DELETED_MS);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => setSubIndex((index) => index + (deleting ? -1 : 1)),
      deleting ? DELETING_MS : TYPING_MS
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, roleIndex, roles, prefersReducedMotion]);

  const text = prefersReducedMotion ? roles[0] : roles[roleIndex].slice(0, subIndex);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className={prefersReducedMotion ? "opacity-100" : "animate-pulse"}
      >
        |
      </span>
    </span>
  );
}
