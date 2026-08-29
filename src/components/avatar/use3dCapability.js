import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * "3d" unless the visitor asked for reduced motion, the device has very few
 * cores, or WebGL isn't available — then "fallback".
 * @returns {"3d" | "fallback"}
 */
function webglOk() {
  try {
    const c = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
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
    const lowCore =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency < 4;
    setMode(lowCore || !webglOk() ? "fallback" : "3d");
  }, [reduced]);
  return mode;
}
