/**
 * lucide-react dropped brand/logo icons (Github, Linkedin) — these are small
 * hand-rolled replacements using the standard, license-free glyph paths
 * (Simple Icons, CC0), sized/styled to match lucide-react's `size` API.
 */

export function GithubIcon({ size = 20, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** Small line-art rocket used as the launch motif on the intro splash. */
export function RocketIcon({ size = 40, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 64"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M24 4c7 6 10 15 10 25 0 5-1 9-2.5 13h-15C15 38 14 34 14 29c0-10 3-19 10-25z"
        fill="var(--color-bg-raised)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="4.5" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <path
        d="M14 30c-4 1.5-6 5-6 10 4-1 7-3 8.5-6z"
        fill="var(--color-bg-raised)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M34 30c4 1.5 6 5 6 10-4-1-7-3-8.5-6z"
        fill="var(--color-bg-raised)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18.5 42h11l-1.5 5h-8z" fill="var(--color-accent)" opacity="0.5" />
      <path
        className="origin-top animate-pulse"
        d="M20.5 47h7l-1.8 8c-.6 2.2-2.8 2.2-3.4 0z"
        fill="var(--color-accent-2)"
      />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm16.694-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z" />
    </svg>
  );
}
