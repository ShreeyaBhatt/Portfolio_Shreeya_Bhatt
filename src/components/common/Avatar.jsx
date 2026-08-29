import { motion, useTransform } from "motion/react";
import { cn } from "../../lib/cn.js";
import { useMousePosition } from "../../hooks/useMousePosition.js";

/**
 * A shaded, dimensional portrait — built to read as a 3D render, to belong to
 * the site's cosmic theme, and to look like who it's of: a Gen-Z CS student.
 *
 * Depth, all in SVG: every form filled with a gradient (never flat); one
 * committed light setup — warm key from upper-left, a violet rim (the site
 * accent) raking the right edge — so the face has a lit side and a shadow
 * side; soft occlusion under the jaw, brow, nose and lip; soft speculars on
 * the forehead, cheek, nose bridge and lower lip; and true front-to-back
 * layering.
 *
 * The "CS student / Gen-Z" read is carried by what she's wearing, not by
 * caricature: an oversized hoodie with a bunched hood and drawstrings, thin
 * rounded glasses with a faint screen-glare on the lens, over-ear headphones
 * slung around the neck, a campus/hackathon ID on a lanyard, an enamel ✦ pin,
 * a single bright dyed streak in the fringe, and a cool underlight on the jaw
 * like a laptop is open just out of frame.
 *
 * Movement: the whole bust leans toward the cursor and the pupils track it,
 * on top of a slow bob, hair sway, and blink — and the parent (<AvatarIntro>)
 * makes the whole thing draggable. All of it collapses to a still frame under
 * reduced motion, since `useMousePosition` never moves off 0,0 then and
 * `reduced` drops the loops.
 */
const SKIN_LIGHT = "#F3CDAD";
const SKIN_MID = "#DAA37E";
const SKIN_SHADOW = "#AE765A";
const SKIN_OCCLUSION = "#89583F";
const SKIN_SPEC = "#FFF4E8";
const RIM = "#9B8CFF";
const HAIR_LIGHT = "#332A45";
const HAIR_DARK = "#140F1D";
const HAIR_RIM = "#B9ABF2";
const STREAK = "#C9B7FF";
const BROW = "#231B2F";
const LASH = "#191320";
const FRAME = "#1A1626";

export function Avatar({ reduced = false, className }) {
  const loop = (props) => (reduced ? {} : props);

  const mouse = useMousePosition();
  const bustX = useTransform(mouse.x, [-1, 1], [-6, 6]);
  const bustY = useTransform(mouse.y, [-1, 1], [-5, 5]);
  const bustRotate = useTransform(mouse.x, [-1, 1], [-2.5, 2.5]);
  const pupilX = useTransform(mouse.x, [-1, 1], [-2.2, 2.2]);
  const pupilY = useTransform(mouse.y, [-1, 1], [-1.6, 1.6]);

  return (
    <svg
      viewBox="0 0 240 280"
      className={cn("block", className)}
      role="img"
      aria-label="Stylised 3D portrait of Shreeya"
    >
      <defs>
        <radialGradient id="av-skin" cx="38%" cy="30%" r="82%">
          <stop offset="0%" stopColor={SKIN_LIGHT} />
          <stop offset="55%" stopColor={SKIN_MID} />
          <stop offset="100%" stopColor={SKIN_SHADOW} />
        </radialGradient>
        <linearGradient id="av-neck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKIN_MID} />
          <stop offset="100%" stopColor={SKIN_OCCLUSION} />
        </linearGradient>
        <linearGradient id="av-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={HAIR_LIGHT} />
          <stop offset="100%" stopColor={HAIR_DARK} />
        </linearGradient>
        <linearGradient id="av-hair-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HAIR_RIM} stopOpacity="0.75" />
          <stop offset="45%" stopColor={HAIR_RIM} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="av-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={RIM} stopOpacity="0" />
          <stop offset="100%" stopColor={RIM} stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="av-iris" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#8A73C8" />
          <stop offset="70%" stopColor="#4C3B7A" />
          <stop offset="100%" stopColor="#2B2049" />
        </radialGradient>
        <linearGradient id="av-lip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C87680" />
          <stop offset="100%" stopColor="#9A4A59" />
        </linearGradient>
        <linearGradient id="av-hoodie" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A2740" />
          <stop offset="100%" stopColor="#131120" />
        </linearGradient>
        <radialGradient id="av-glow" cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <filter id="av-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="av-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <ellipse cx="120" cy="120" rx="150" ry="158" fill="url(#av-glow)" />
      <ellipse cx="120" cy="252" rx="84" ry="18" fill={SKIN_OCCLUSION} opacity="0.22" filter="url(#av-blur)" />

      {/* lean toward the cursor */}
      <motion.g
        style={{
          x: bustX,
          y: bustY,
          rotate: bustRotate,
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      >
        {/* settle-into-frame on mount */}
        <motion.g
          initial={loop({ rotate: 6, y: 14, opacity: 0 })}
          animate={loop({ rotate: 0, y: 0, opacity: 1 })}
          transition={loop({ type: "spring", stiffness: 120, damping: 17 })}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <motion.g
            animate={loop({ rotate: [-1, 1, -1] })}
            transition={loop({ duration: 7, ease: "easeInOut", repeat: Infinity })}
            style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
          >
            <motion.g
              animate={loop({ y: [0, -3, 0] })}
              transition={loop({ duration: 4, ease: "easeInOut", repeat: Infinity })}
            >
              {/* ---- back hair ---- */}
              <motion.g
                animate={loop({ rotate: [-1.4, 1.4, -1.4] })}
                transition={loop({ duration: 6, ease: "easeInOut", repeat: Infinity })}
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
              >
                <path d="M62 96 C 54 142 56 198 66 244 C 70 260 82 270 92 274 C 84 250 78 210 80 166 C 82 136 84 116 90 98 C 82 94 70 92 62 96 Z" fill="url(#av-hair)" />
                <path d="M178 96 C 186 142 184 198 174 244 C 170 260 158 270 148 274 C 156 250 162 210 160 166 C 158 136 156 116 150 98 C 158 94 170 92 178 96 Z" fill="url(#av-hair)" />
                <path d="M120 38 C 82 38 60 66 58 108 C 58 118 66 122 74 114 C 82 82 100 62 120 60 C 140 62 158 82 166 114 C 174 122 182 118 182 108 C 180 66 158 38 120 38 Z" fill="url(#av-hair)" />
                <path d="M120 38 C 88 38 66 62 60 100 C 74 68 96 52 120 50 C 144 52 166 68 180 100 C 174 62 152 38 120 38 Z" fill="url(#av-hair-rim)" />
              </motion.g>

              {/* ---- hood bunched behind the neck ---- */}
              <path d="M84 178 C 78 150 100 136 120 136 C 140 136 162 150 156 178 C 148 160 136 150 120 150 C 104 150 92 160 84 178 Z" fill="url(#av-hoodie)" />
              <path d="M66 210 C 56 182 62 152 84 146 C 78 166 78 192 88 214 Z" fill="url(#av-hoodie)" />
              <path d="M174 210 C 184 182 178 152 156 146 C 162 166 162 192 152 214 Z" fill="url(#av-hoodie)" />

              {/* headphone band around the back of the neck */}
              <path d="M74 190 C 82 214 100 224 120 224 C 140 224 158 214 166 190" fill="none" stroke="#0E0B16" strokeWidth="7" strokeLinecap="round" />

              {/* ---- hoodie body ---- */}
              <path d="M44 280 C 48 234 80 218 120 218 C 160 218 192 234 196 280 Z" fill="url(#av-hoodie)" />
              <path d="M150 224 C 178 234 190 254 194 280 L182 280 C 178 254 166 238 146 230 Z" fill={RIM} opacity="0.14" />
              {/* collar ribbing */}
              <path d="M104 214 l0 10 M112 213 l0 12 M120 212 l0 13 M128 213 l0 12 M136 214 l0 10" stroke="#0E0B16" strokeWidth="1.5" opacity="0.5" />
              {/* drawstrings + aglets */}
              <path d="M112 220 C 111 236 110 250 110 262" stroke="#0E0B16" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M128 220 C 129 234 131 246 132 258" stroke="#0E0B16" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle cx="110" cy="264" r="3" fill={RIM} />
              <circle cx="132" cy="260" r="3" fill={RIM} />
              {/* kangaroo pocket */}
              <path d="M84 250 Q 120 266 156 250" stroke="#0E0B16" strokeWidth="2" fill="none" opacity="0.55" />

              {/* lanyard behind the neck */}
              <path d="M108 150 L 103 214 M132 150 L 137 214" stroke="#3B2F63" strokeWidth="4" strokeLinecap="round" />

              {/* ---- neck ---- */}
              <path d="M103 176 C 103 196 101 214 99 228 L141 228 C 139 214 137 196 137 176 C 132 190 108 190 103 176 Z" fill="url(#av-neck)" />
              <path d="M92 176 C 104 192 136 192 148 176 C 140 200 100 200 92 176 Z" fill={SKIN_OCCLUSION} opacity="0.55" filter="url(#av-soft)" />
              {/* laptop underlight on the jaw */}
              <ellipse cx="120" cy="182" rx="30" ry="13" fill="#93A9FF" opacity="0.12" filter="url(#av-soft)" />

              {/* headphone earcups resting on the shoulders */}
              <g>
                <rect x="62" y="196" width="21" height="27" rx="9" fill="#0E0B16" />
                <rect x="66" y="201" width="13" height="17" rx="6" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
                <rect x="157" y="196" width="21" height="27" rx="9" fill="#0E0B16" />
                <rect x="161" y="201" width="13" height="17" rx="6" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
              </g>

              {/* ---- ID badge on the lanyard ---- */}
              <g transform="rotate(-4 120 222)">
                <rect x="101" y="206" width="38" height="30" rx="4" fill="var(--color-bg-raised)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
                <path d="M110 214 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 Z" fill="var(--color-accent)" />
                <rect x="118" y="212" width="16" height="2.4" rx="1.2" fill="var(--color-fg-subtle)" opacity="0.7" />
                <rect x="118" y="218" width="12" height="2.4" rx="1.2" fill="var(--color-fg-subtle)" opacity="0.5" />
                <rect x="106" y="227" width="28" height="2.4" rx="1.2" fill="var(--color-fg-subtle)" opacity="0.4" />
              </g>

              {/* ---- face ---- */}
              <path d="M120 60 C 92 60 74 78 72 104 C 71 122 74 142 82 160 C 90 176 104 190 120 192 C 136 190 150 176 158 160 C 166 142 169 122 168 104 C 166 78 148 60 120 60 Z" fill="url(#av-skin)" />
              <path d="M170 100 C 172 122 168 146 158 164 C 150 178 140 188 132 192 C 140 184 150 172 156 156 C 164 138 167 120 166 100 Z" fill="url(#av-rim)" filter="url(#av-soft)" />
              <ellipse cx="102" cy="82" rx="17" ry="11" fill={SKIN_SPEC} opacity="0.32" filter="url(#av-soft)" />
              <ellipse cx="90" cy="132" rx="12" ry="9" fill={SKIN_SPEC} opacity="0.26" filter="url(#av-soft)" />
              <ellipse cx="150" cy="120" rx="12" ry="20" fill={SKIN_SHADOW} opacity="0.3" filter="url(#av-soft)" />

              {/* ---- ear + star stud ---- */}
              <path d="M70 116 C 63 120 63 134 72 141 C 77 137 79 126 77 118 C 75 115 72 115 70 116 Z" fill={SKIN_MID} />
              <path d="M72 138 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 Z" fill="var(--color-accent-2)" />

              {/* ---- brows ---- */}
              <path d="M83 100 C 92 93 104 92 113 97 C 105 95 93 96 86 103 Z" fill={BROW} />
              <path d="M127 95 C 136 90 148 91 157 98 C 150 94 138 93 129 97 Z" fill={BROW} />

              {/* ---- eyes ---- */}
              <motion.g
                animate={loop({ scaleY: [1, 1, 0.08, 1] })}
                transition={loop({ duration: 3.6, times: [0, 0.9, 0.94, 1], repeat: Infinity, repeatDelay: 1.4 })}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <ellipse cx="100" cy="118" rx="15" ry="9" fill={SKIN_SHADOW} opacity="0.28" filter="url(#av-soft)" />
                <ellipse cx="140" cy="118" rx="15" ry="9" fill={SKIN_SHADOW} opacity="0.28" filter="url(#av-soft)" />
                <path d="M86 119 C 92 111 108 111 114 118 C 108 124 92 125 86 119 Z" fill="#EFE9F1" />
                <path d="M126 118 C 132 111 148 111 154 119 C 148 125 132 124 126 118 Z" fill="#EFE9F1" />
                <motion.g style={{ x: pupilX, y: pupilY }}>
                  <circle cx="100" cy="118" r="6.4" fill="url(#av-iris)" />
                  <circle cx="140" cy="118" r="6.4" fill="url(#av-iris)" />
                  <circle cx="100" cy="118" r="3" fill="#160F22" />
                  <circle cx="140" cy="118" r="3" fill="#160F22" />
                  <circle cx="97.6" cy="115.4" r="2" fill="#FFFFFF" />
                  <circle cx="137.6" cy="115.4" r="2" fill="#FFFFFF" />
                  <circle cx="102.5" cy="120.5" r="1" fill="#FFFFFF" opacity="0.5" />
                  <circle cx="142.5" cy="120.5" r="1" fill="#FFFFFF" opacity="0.5" />
                </motion.g>
                <path d="M85 118 C 92 110 109 110 115 117" stroke={LASH} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M125 117 C 131 110 148 110 155 118" stroke={LASH} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M85 118 c -3 -1 -5 -3 -6 -6" stroke={LASH} strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M87 121 c -3 0 -5 -1 -7 -3" stroke={LASH} strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <path d="M155 118 c 3 -1 5 -3 6 -6" stroke={LASH} strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M153 121 c 3 0 5 -1 7 -3" stroke={LASH} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </motion.g>

              {/* ---- glasses ---- */}
              <g fill="none" stroke={FRAME} strokeWidth="2.6">
                <rect x="80" y="107" width="36" height="23" rx="10" fill="rgba(200,210,255,0.07)" />
                <rect x="124" y="107" width="36" height="23" rx="10" fill="rgba(200,210,255,0.07)" />
                <path d="M116 115 q 4 -4 8 0" />
                <path d="M80 115 L 64 110" strokeLinecap="round" />
                <path d="M160 115 L 176 110" strokeLinecap="round" />
              </g>
              <path d="M86 128 L 100 109 L 106 109 L 92 128 Z" fill="#FFFFFF" opacity="0.12" />
              <path d="M130 128 L 144 109 L 150 109 L 136 128 Z" fill="#FFFFFF" opacity="0.1" />

              {/* ---- nose ---- */}
              <path d="M124 112 C 128 126 130 140 126 150 C 124 144 122 128 122 114 Z" fill={SKIN_SHADOW} opacity="0.4" filter="url(#av-soft)" />
              <ellipse cx="119" cy="128" rx="3" ry="16" fill={SKIN_SPEC} opacity="0.28" filter="url(#av-soft)" />
              <ellipse cx="118" cy="147" rx="5" ry="4" fill={SKIN_SPEC} opacity="0.3" filter="url(#av-soft)" />
              <ellipse cx="112" cy="152" rx="3" ry="2" fill={SKIN_OCCLUSION} opacity="0.5" filter="url(#av-soft)" />
              <ellipse cx="127" cy="152" rx="3" ry="2" fill={SKIN_OCCLUSION} opacity="0.5" filter="url(#av-soft)" />
              <ellipse cx="120" cy="157" rx="10" ry="3" fill={SKIN_OCCLUSION} opacity="0.35" filter="url(#av-soft)" />

              {/* ---- lips ---- */}
              <ellipse cx="120" cy="176" rx="18" ry="5" fill={SKIN_OCCLUSION} opacity="0.22" filter="url(#av-soft)" />
              <path d="M104 167 C 110 162 116 163 120 166 C 124 163 130 162 136 167 C 130 171 124 172 120 170 C 116 172 110 171 104 167 Z" fill="url(#av-lip)" />
              <path d="M105 169 C 112 179 128 179 135 169 C 128 175 112 175 105 169 Z" fill="url(#av-lip)" />
              <ellipse cx="122" cy="172" rx="6" ry="2" fill="#E7ADB2" opacity="0.55" filter="url(#av-soft)" />
              <circle cx="124" cy="172" r="1.1" fill="#FFFFFF" opacity="0.7" />
              <circle cx="112" cy="165" r="0.9" fill="#FFFFFF" opacity="0.5" />
              <circle cx="128" cy="165" r="0.9" fill="#FFFFFF" opacity="0.5" />

              {/* constellation freckles */}
              <g fill="var(--color-accent)" opacity="0.4">
                <circle cx="146" cy="138" r="1.1" />
                <circle cx="152" cy="146" r="0.9" />
                <circle cx="149" cy="152" r="0.8" />
              </g>

              {/* enamel ✦ pin on the collar */}
              <path d="M150 210 l2 4.2 4.2 2 -4.2 2 -2 4.2 -2 -4.2 -4.2 -2 4.2 -2 Z" fill="var(--color-accent-2)" />

              {/* ---- face-framing hair + dyed streak ---- */}
              <motion.g
                animate={loop({ rotate: [1, -1, 1] })}
                transition={loop({ duration: 5, ease: "easeInOut", repeat: Infinity })}
                style={{ transformBox: "fill-box", transformOrigin: "top center" }}
              >
                <path d="M74 78 C 62 96 58 130 62 166 C 64 140 70 112 80 92 C 84 84 88 80 92 78 C 86 74 80 74 74 78 Z" fill="url(#av-hair)" />
                <path d="M166 78 C 178 96 182 130 178 166 C 176 140 170 112 160 92 C 156 84 152 80 148 78 C 154 74 160 74 166 78 Z" fill="url(#av-hair)" />
                <path d="M150 58 C 160 74 158 96 146 108 C 132 120 106 120 90 112 C 82 108 77 100 78 92 C 88 102 108 106 124 101 C 138 96 147 84 149 66 C 149 61 150 58 150 58 Z" fill="url(#av-hair)" />
                <path d="M150 58 C 156 70 155 86 148 98 C 150 84 149 70 145 60 Z" fill={HAIR_RIM} opacity="0.5" />
                {/* the dyed streak */}
                <path d="M146 60 C 138 80 118 96 96 100 C 116 90 134 74 142 56 Z" fill={STREAK} opacity="0.85" />
                <path d="M92 108 C 100 104 110 100 118 94 C 110 104 100 110 90 112 Z" fill={STREAK} opacity="0.5" />
                <path d="M78 92 C 70 86 66 76 66 66 C 70 78 76 86 84 90 Z" fill="url(#av-hair)" />
                <path d="M164 92 C 172 84 176 72 176 62 C 174 76 168 86 160 92 Z" fill="url(#av-hair)" />
              </motion.g>
            </motion.g>
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
