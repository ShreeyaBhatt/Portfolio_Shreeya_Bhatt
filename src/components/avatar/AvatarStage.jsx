import { lazy, Suspense } from "react";
import { cn } from "../../lib/cn.js";
import { use3dCapability } from "./use3dCapability.js";
import { AvatarFallback } from "./AvatarFallback.jsx";
import { useIdleMount } from "../../hooks/useIdleMount.js";

const AvatarScene = lazy(() => import("./AvatarScene.jsx"));

/**
 * The hero's centrepiece. Shows the static schematic immediately, then — only
 * on a capable desktop, and only once the browser is idle — swaps in the
 * WebGL command core. Deferring the three.js load keeps it out of the
 * first-paint / time-to-interactive window.
 */
export function AvatarStage({ className }) {
  const mode = use3dCapability();
  const idle = useIdleMount(2500);
  const show3d = mode === "3d" && idle;

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {show3d ? (
        <Suspense fallback={<AvatarFallback className="absolute inset-0" pending />}>
          <AvatarScene className="absolute inset-0 h-full w-full" />
        </Suspense>
      ) : (
        <AvatarFallback className="absolute inset-0" pending={mode === "3d"} />
      )}
    </div>
  );
}
