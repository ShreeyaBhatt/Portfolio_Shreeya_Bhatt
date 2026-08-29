/**
 * A bespoke line-art emblem per project — a small piece of schematic art that
 * says what the thing *is* at a glance, so a card isn't just typed info.
 *
 * All monochrome: `fill="none"`, `stroke="currentColor"`, so colour comes from
 * the parent (`text-[var(--color-accent)]`, an opacity utility for a
 * watermark, etc.). One or two `currentColor`-filled dots per glyph for a
 * focal point. Drawn on a 64×64 grid.
 *
 * @param {{ slug: string, className?: string, title?: string }} props
 */
const GLYPHS = {
  // WealthNest — an ascending value line inside a frame, orbit ring + holdings.
  wealthnest: (
    <>
      <rect x="6" y="10" width="52" height="40" rx="4" />
      <path d="M13 42 L25 32 L33 37 L48 20" />
      <path d="M42 20 H48 V26" />
      <circle cx="48" cy="20" r="2.4" fill="currentColor" stroke="none" />
      <ellipse cx="32" cy="52" rx="20" ry="5" />
      <circle cx="20" cy="52" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="32" cy="54" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="44" cy="52" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),

  // SpendWise — one ledger, built twice: two offset cards + a coin.
  spendwise: (
    <>
      <rect x="8" y="16" width="34" height="26" rx="3" />
      <rect x="20" y="24" width="34" height="26" rx="3" />
      <path d="M25 32 H45 M25 38 H39" />
      <circle cx="44" cy="20" r="8" />
      <path d="M44 16 V24 M40.5 20 H47.5" />
      <circle cx="44" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),

  // CareeRise — a job portal feeding a hand-built linked-node queue.
  careerise: (
    <>
      <rect x="20" y="10" width="24" height="17" rx="2" />
      <path d="M27 10 V7 a5 5 0 0 1 10 0 V10" />
      <path d="M32 27 V39" />
      <circle cx="16" cy="44" r="5" />
      <path d="M21 44 H27" />
      <circle cx="32" cy="44" r="5" />
      <path d="M37 44 H43" />
      <circle cx="48" cy="44" r="5" />
      <path d="M53 44 H57" />
      <circle cx="16" cy="44" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),

  // SmartCart — a till: cart + a small inventory matrix.
  smartcart: (
    <>
      <path d="M8 12 H14 L20 40 H46" />
      <path d="M14 18 H52 L48 34 H20" />
      <circle cx="24" cy="48" r="3.5" />
      <circle cx="43" cy="48" r="3.5" />
      <path d="M30 24 H30.01 M38 24 H38.01 M30 30 H30.01 M38 30 H38.01" strokeWidth="3" />
    </>
  ),

  // Payroll — a payslip and a coin stack.
  "payroll-management-system": (
    <>
      <rect x="9" y="9" width="28" height="46" rx="3" />
      <path d="M15 20 H31 M15 28 H31 M15 36 H25" />
      <ellipse cx="47" cy="30" rx="10" ry="3.6" />
      <ellipse cx="47" cy="38" rx="10" ry="3.6" />
      <ellipse cx="47" cy="46" rx="10" ry="3.6" />
      <path d="M37 30 V46 M57 30 V46" />
      <circle cx="47" cy="30" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
};

export function ProjectGlyph({ slug, className, title }) {
  const glyph = GLYPHS[slug];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyph}
    </svg>
  );
}
