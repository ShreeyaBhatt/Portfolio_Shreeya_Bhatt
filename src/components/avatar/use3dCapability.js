import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * "3d" only on a capable desktop that hasn't opted out; "fallback" everywhere
 * else. The 3D command core pulls in three.js (~250 KB gzip + heavy script
 * eval), so it is deliberately desktop-only — phones and tablets get the
 * static schematic, which is plenty.
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
    const nav = typeof navigator !== "undefined" ? navigator : {};
    const smallScreen = window.matchMedia("(max-width: 1024px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowCore =
      typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency < 4;
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory < 4;
    const saveData = Boolean(nav.connection && nav.connection.saveData);

    const capable = !smallScreen && !coarse && !lowCore && !lowMem && !saveData && webglOk();
    setMode(capable ? "3d" : "fallback");
  }, [reduced]);

  return mode;
}
