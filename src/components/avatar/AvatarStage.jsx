import { lazy, Suspense } from "react";
import { cn } from "../../lib/cn.js";
import { use3dCapability } from "./use3dCapability.js";
import { AvatarFallback } from "./AvatarFallback.jsx";
import { ErrorBoundary } from "../common/ErrorBoundary.jsx";
import { useIdleMount } from "../../hooks/useIdleMount.js";

const AvatarScene = lazy(() => import("./AvatarScene.jsx"));

/**
 * The hero's centrepiece. Shows the static schematic immediately, then — on any
 * WebGL-capable device, once the browser is idle — swaps in the animated
 * command core.
 *
 * The scene is wrapped in an ErrorBoundary: if the GPU/driver can't create a
 * context or the scene throws at runtime (more likely on low-end phones), it
 * quietly falls back to the schematic instead of blanking the page.
 */
export function AvatarStage({ className }) {
  const mode = use3dCapability();
  const idle = useIdleMount(2500);
  const show3d = mode === "3d" && idle;

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {show3d ? (
        <ErrorBoundary
          scope="avatar"
          fallback={<AvatarFallback className="absolute inset-0" />}
        >
          <Suspense fallback={<AvatarFallback className="absolute inset-0" pending />}>
            <AvatarScene className="absolute inset-0 h-full w-full" />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <AvatarFallback className="absolute inset-0" pending={mode === "3d"} />
      )}
    </div>
  );
}
