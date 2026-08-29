/**
 * A fixed film-grain layer over the whole page. Flat near-black backgrounds
 * read as filmed rather than printed once there's a little noise on top. It's
 * a static SVG-turbulence data URI — no animation, so it costs nothing after
 * first paint — and sits under interactive chrome via `mix-blend-mode`.
 */
export function Grain() {
  return <div aria-hidden="true" className="grain" />;
}
