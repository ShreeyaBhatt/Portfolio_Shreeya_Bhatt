import { lazy, Suspense } from "react";
import { cn } from "../../lib/cn.js";
import { use3dCapability } from "./use3dCapability.js";
import { AvatarFallback } from "./AvatarFallback.jsx";

const AvatarScene = lazy(() => import("./AvatarScene.jsx"));

/**
 * The hero's centrepiece. Renders the WebGL command core (or a real avatar
 * GLB, once one is placed — see AvatarScene.jsx) on capable devices, and a
 * schematic fallback otherwise. three.js loads lazily, so it never blocks
 * first paint.
 */
export function AvatarStage({ className }) {
  const mode = use3dCapability();

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {mode === "fallback" ? (
        <AvatarFallback className="absolute inset-0" />
      ) : (
        <Suspense fallback={<AvatarFallback className="absolute inset-0" pending />}>
          <AvatarScene className="absolute inset-0 h-full w-full" />
        </Suspense>
      )}
    </div>
  );
}
