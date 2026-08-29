import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";

/**
 * A drawn stand-in for a photo: a flat-colour, bold-outline character face
 * with headphones — a nod to the singing that's on the profile. It's built to
 * be dropped onto the cream "sticker" disc the intro gives it, so it never
 * depends on whatever colour sits behind it.
 *
 * Motion lives here rather than in the caller because it belongs to the
 * character, not the scene: a periodic blink, a slow bob, and a one-time wave
 * as it lands. `reduced` freezes all three into one static frame.
 *
 * All geometry is in a 200×200 user space; every animated group uses
 * `transform-box: fill-box` so its origin is its own centre, not the SVG's.
 */
const INK = "#141018";
const SKIN = "#F7C9A4";
const HAIR = "#6D4AFF";
const GOLD = "#FFC44D";
const BLUSH = "#FF8FB1";
const CREAM = "#FDF7EE";

export function Avatar({ reduced = false, className }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("block", className)}
      role="img"
      aria-label="Illustrated portrait of Shreeya"
    >
      <motion.g
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={reduced ? undefined : { duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        {/* hoodie / shoulders */}
        <path
          d="M50 184 C 58 150 142 150 150 184 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* hair silhouette */}
        <rect x="46" y="50" width="108" height="108" rx="50" fill={HAIR} stroke={INK} strokeWidth="5" />
        {/* headphone band */}
        <path d="M38 100 C 38 40 162 40 162 100" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        {/* face */}
        <rect x="60" y="62" width="80" height="92" rx="36" fill={SKIN} stroke={INK} strokeWidth="5" />
        {/* fringe */}
        <path
          d="M62 88 C 72 64 128 64 138 88 C 120 76 80 76 62 88 Z"
          fill={HAIR}
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* ear cups */}
        <rect x="28" y="92" width="24" height="36" rx="11" fill={INK} />
        <rect x="33" y="99" width="14" height="22" rx="7" fill={GOLD} />
        <rect x="148" y="92" width="24" height="36" rx="11" fill={INK} />
        <rect x="153" y="99" width="14" height="22" rx="7" fill={GOLD} />
        {/* eyebrows */}
        <path d="M76 98 q 9 -6 18 -1" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <path d="M106 97 q 9 -5 18 1" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        {/* eyes — blink */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduced ? undefined : { scaleY: [1, 1, 0.15, 1] }}
          transition={
            reduced
              ? undefined
              : { duration: 2.8, times: [0, 0.92, 0.96, 1], repeat: Infinity, repeatDelay: 0.6 }
          }
        >
          <ellipse cx="85" cy="112" rx="6.5" ry="8.5" fill={INK} />
          <ellipse cx="115" cy="112" rx="6.5" ry="8.5" fill={INK} />
          <circle cx="87" cy="109" r="2" fill={CREAM} />
          <circle cx="117" cy="109" r="2" fill={CREAM} />
        </motion.g>
        {/* nose */}
        <path
          d="M100 116 l -3 9 q 3 3 6 0"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* blush */}
        <ellipse cx="74" cy="128" rx="8" ry="5" fill={BLUSH} opacity="0.7" />
        <ellipse cx="126" cy="128" rx="8" ry="5" fill={BLUSH} opacity="0.7" />
        {/* mouth */}
        <path d="M86 134 Q 100 148 114 134" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        {/* wave — plays once as the avatar lands */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
          initial={reduced ? undefined : { rotate: 0 }}
          animate={reduced ? undefined : { rotate: [0, 18, -10, 14, 0] }}
          transition={reduced ? undefined : { duration: 1.1, ease: "easeInOut", delay: 0.5 }}
        >
          <rect x="150" y="150" width="12" height="26" rx="6" fill={SKIN} stroke={INK} strokeWidth="4" />
          <circle cx="156" cy="146" r="13" fill={SKIN} stroke={INK} strokeWidth="4" />
          <path d="M148 141 q 8 -9 16 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
