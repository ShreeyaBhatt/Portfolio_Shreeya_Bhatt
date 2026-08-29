import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  // Dark is the site's intended default; only an explicit "light" choice opts
  // out. This matches the pre-paint script in index.html.
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

/** Reads/writes the `.dark` class on <html>, persisted to localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
