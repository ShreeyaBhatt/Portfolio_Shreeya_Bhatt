import { useState } from "react";
import { profile } from "../../data/profile.js";
import { cn } from "../../lib/cn.js";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

/**
 * Profile photo with a graceful fallback: if public/profile.jpg hasn't been
 * added yet (see README "Manual Follow-ups"), shows an initials tile instead
 * of a broken-image icon.
 */
export function ProfilePhoto({ className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={profile.name}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] font-display text-4xl font-semibold text-white",
          className
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={profile.photoPath}
      alt={profile.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
