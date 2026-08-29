import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor-hover
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
