/** Small mono "// comment" label used atop every page, marked with a star so the motif reads consistently as a constellation chart. */
export function PageEyebrow({ children }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-sm text-[var(--color-accent)]">
      <span className="text-[var(--color-accent-2)]" aria-hidden="true">
        ✦
      </span>
      {children}
    </p>
  );
}
