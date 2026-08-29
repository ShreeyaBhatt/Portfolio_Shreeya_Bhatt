import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

/**
 * The depth layer behind <NodeField>. A slow-drifting particle cloud plus a few
 * faint connecting filaments, rotating gently and easing toward the pointer.
 *
 * Kept intentionally minimal — no text, no lights, no postprocessing, ~140
 * points and 5 lines — because the crisp labelled diagram lives in the SVG on
 * top; this only adds parallax shimmer in the gaps. The whole module is
 * dynamically imported, so three.js never touches the main bundle, and it is
 * only ever mounted on capable, motion-OK desktops.
 */
const ACCENT = "#e8a24a";
const STEEL = "#7c8598";

function Field() {
  const group = useRef();

  const points = useMemo(() => {
    const arr = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, []);

  const filaments = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 6; i += 1) {
      lines.push(
        new Float32Array([
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 2,
        ])
      );
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = state.pointer;
    g.rotation.y = MathUtils.damp(g.rotation.y, p.x * 0.3 + state.clock.elapsedTime * 0.02, 3, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, -p.y * 0.2, 3, delta);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color={ACCENT} transparent opacity={0.55} sizeAttenuation />
      </points>

      {filaments.map((positions, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={STEEL} transparent opacity={0.25} />
        </line>
      ))}
    </group>
  );
}

export default function NodeField3D({ className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 38 }}
      frameloop="always"
    >
      <Field />
    </Canvas>
  );
}
