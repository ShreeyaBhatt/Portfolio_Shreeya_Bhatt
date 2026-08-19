import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor-hover
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-[var(--radius-sm)] p-2 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
