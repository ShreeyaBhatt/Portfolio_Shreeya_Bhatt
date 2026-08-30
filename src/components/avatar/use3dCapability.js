import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * "3d" wherever the browser can actually run WebGL and the visitor hasn't
 * opted out; "fallback" (the static schematic) otherwise.
 *
 * The 3D command core used to be desktop-only. It now runs on phones too — the
 * scene is tuned down for mobile in AvatarScene, and AvatarStage wraps the
 * canvas in an error boundary so a GPU that can't cope drops back to the
 * schematic instead of taking the page with it.
 *
 * Still falls back when: the visitor prefers reduced motion, WebGL is missing,
 * Data Saver is on, or the device reports very little memory (<2 GB) — cases
 * where a live WebGL scene is genuinely the wrong call.
 *
 * @returns {"3d" | "fallback"}
 */
function webglOk() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function use3dCapability() {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState("fallback");

  useEffect(() => {
    if (reduced) {
      setMode("fallback");
      return;
    }
    const nav = typeof navigator !== "undefined" ? navigator : {};
    const veryLowMem =
      typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory < 2;
    const saveData = Boolean(nav.connection && nav.connection.saveData);

    setMode(!veryLowMem && !saveData && webglOk() ? "3d" : "fallback");
  }, [reduced]);

  return mode;
}
