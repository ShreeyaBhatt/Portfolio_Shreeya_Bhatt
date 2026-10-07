import { useEffect, useState } from "react";

/**
 * Live read of the theme, straight from the `.dark` class on <html>.
 * `useTheme` keeps its own state per instance, so a component that only needs
 * to *follow* the theme (e.g. the 3D core's materials) watches the class
 * instead and updates whenever any toggle flips it.
 */
export function useIsDark() {
  const read = () =>
    typeof document === "undefined" || document.documentElement.classList.contains("dark");
  const [isDark, setIsDark] = useState(read);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setIsDark(root.classList.contains("dark")));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setIsDark(root.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  return isDark;
}
