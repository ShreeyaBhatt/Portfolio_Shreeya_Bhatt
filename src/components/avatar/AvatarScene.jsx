import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, Line, useGLTF } from "@react-three/drei";
import { AdditiveBlending, MathUtils } from "three";
import { AvatarFallback } from "./AvatarFallback.jsx";
import { useIsDark } from "../../hooks/useIsDark.js";

/** Coarse "is this a phone/tablet" check — used only to trim the scene's cost. */
const isMobile =
  typeof window !== "undefined" &&
  (window.matchMedia("(max-width: 1024px)").matches ||
    window.matchMedia("(pointer: coarse)").matches);

/* ------------------------------------------------------------------
   AVATAR MODEL SLOT
   ------------------------------------------------------------------
   The command deck is designed for a 3D avatar of a futuristic space
   explorer / developer. No such model ships with the repo, so the
   scene renders a premium abstract "command core" instead.

   To drop in a real avatar: put an optimised GLB at
   `public/models/avatar.glb`, set AVATAR_MODEL_URL below to
   "/models/avatar.glb", and (optionally) tune SCALE / Y. The rig's
   idle float, cursor-tracking tilt and cinematic lighting already
   work for any centred model.
   ------------------------------------------------------------------ */
const AVATAR_MODEL_URL = null;
const MODEL_SCALE = 1;
const MODEL_Y = -1;

/* Per-theme palette. Dark: a night-side violet core with a blue counter-ring.
   Light: a pale pearl body with deeper ink-violet lines, so the core reads as
   part of the daylight page instead of a dark hole punched in it. */
const PALETTES = {
  dark: {
    accent: "#9b8cff",
    ring: "#5b8dff",
    body: "#191630",
    emissive: 0.06,
    shell: 0.2,
    sat: "#c9c2ff",
    satOn: "#ffffff",
    key: "#eef0ff",
  },
  light: {
    accent: "#6a3fd6",
    ring: "#3f6fd0",
    body: "#e6e1fb",
    emissive: 0.02,
    shell: 0.34,
    sat: "#6a3fd6",
    satOn: "#2b1a7a",
    key: "#ffffff",
  },
};

/** Inner ring radius — the mission satellites ride on it. */
const ORBIT_R = 1.72;

/**
 * One waypoint in orbit. A small faceted marker that swells and gains a
 * camera-facing lock ring when active, with an invisible, generous hit sphere
 * so it's easy to catch while it moves.
 */
function Satellite({ index, count, active, palette, onHover, onSelect, hovering, lastHover }) {
  const marker = useRef();
  const angle = (index / count) * Math.PI * 2;
  const pos = [ORBIT_R * Math.cos(angle), ORBIT_R * Math.sin(angle), 0];

  useFrame((_, delta) => {
    if (!marker.current) return;
    const d = Math.min(delta, 0.05);
    const s = MathUtils.damp(marker.current.scale.x, active ? 1.9 : 1, 6, d);
    marker.current.scale.setScalar(s);
    marker.current.rotation.x += d * 0.9;
    marker.current.rotation.y += d * 0.6;
  });

  return (
    <group position={pos}>
      <mesh ref={marker}>
        <octahedronGeometry args={[0.075, 0]} />
        <meshBasicMaterial color={active ? palette.satOn : palette.sat} />
      </mesh>
      {active && (
        <Billboard>
          <mesh>
            <ringGeometry args={[0.2, 0.215, 40]} />
            <meshBasicMaterial color={palette.accent} transparent opacity={0.9} />
          </mesh>
        </Billboard>
      )}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          // A count, not a flag: sliding straight from one satellite to the next
          // can deliver the new "over" before the old "out".
          hovering.current += 1;
          document.body.style.cursor = "pointer";
          onHover?.(index);
        }}
        onPointerOut={() => {
          lastHover.current = { i: index, t: performance.now() };
          hovering.current = Math.max(0, hovering.current - 1);
          if (hovering.current === 0) document.body.style.cursor = "";
          onHover?.(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(index);
        }}
      >
        <sphereGeometry args={[0.3, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function AvatarModel({ url, pointer }) {
  const { scene } = useGLTF(url);
  const group = useRef();
  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.frustumCulled = false;
      }
    });
  }, [scene]);
  useFrame((state, delta) => {
    if (!group.current) return;
    const d = Math.min(delta, 0.05);
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.45,
      3,
      d
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.22,
      3,
      d
    );
  });
  return <primitive ref={group} object={scene} position={[0, MODEL_Y, 0]} scale={MODEL_SCALE} />;
}

function CommandCore({ pointer, palette, count, active, onHover, onSelect, lastHover }) {
  const group = useRef();
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  // While a satellite is under the pointer the orbit nearly stops and the
  // cursor-follow tilt freezes, so the target holds still long enough to click.
  const hovering = useRef(0);
  const spin = useRef(0.35);
  const lock =
    typeof active === "number" && count > 0
      ? [
          ORBIT_R * Math.cos((active / count) * Math.PI * 2),
          ORBIT_R * Math.sin((active / count) * Math.PI * 2),
          0,
        ]
      : null;

  const particles = useMemo(() => {
    const n = isMobile ? 40 : 80;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i += 1) {
      const r = 1.9 + Math.random() * 1.6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.cos(ph) * 0.7;
      arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    return arr;
  }, []);

  const fresnel = useMemo(
    () => ({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {},
      vertexShader: `varying vec3 vN; varying vec3 vV;
        void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0);
          vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying vec3 vN; varying vec3 vV;
        void main(){ float f = pow(1.0-max(dot(vN,vV),0.0), 2.2);
          gl_FragColor = vec4(vec3(0.61,0.55,1.0)*f, f*0.85); }`,
    }),
    []
  );

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (group.current && hovering.current === 0) {
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.5, 2.5, d);
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -pointer.current.y * 0.28, 2.5, d);
    }
    if (core.current) {
      core.current.rotation.y += d * 0.28;
      core.current.rotation.x += d * 0.1;
      const s = 1 + Math.sin(t * 1.4) * 0.02;
      core.current.scale.setScalar(s);
    }
    spin.current = MathUtils.damp(spin.current, hovering.current > 0 ? 0 : 0.35, 6, d);
    if (ringA.current) ringA.current.rotation.z += d * spin.current;
    if (ringB.current) ringB.current.rotation.z -= d * 0.24;
  });

  return (
    <group ref={group}>
      {/* faceted body */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={palette.body}
          metalness={0.3}
          roughness={0.4}
          flatShading
          emissive={palette.accent}
          emissiveIntensity={palette.emissive}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={palette.accent} wireframe transparent opacity={palette.shell} />
      </mesh>
      {/* fresnel glow */}
      <mesh scale={1.07}>
        <icosahedronGeometry args={[1, 2]} />
        <shaderMaterial attach="material" {...fresnel} />
      </mesh>
      {/* inner core */}
      <mesh scale={0.34}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.8} />
      </mesh>
      <pointLight color={palette.accent} intensity={3.4} distance={8} />

      {/* inner orbit — the ring and its mission satellites spin together */}
      <group rotation={[Math.PI / 2.3, 0.4, 0]}>
        <group ref={ringA}>
          <mesh>
            <torusGeometry args={[ORBIT_R, 0.012, 8, 128]} />
            <meshBasicMaterial color={palette.accent} transparent opacity={0.6} />
          </mesh>
          {lock && (
            <Line
              points={[[0, 0, 0], lock]}
              color={palette.accent}
              lineWidth={1}
              dashed
              dashSize={0.08}
              gapSize={0.06}
              transparent
              opacity={0.65}
            />
          )}
          {Array.from({ length: count }, (_, i) => (
            <Satellite
              key={i}
              index={i}
              count={count}
              active={i === active}
              palette={palette}
              onHover={onHover}
              onSelect={onSelect}
              hovering={hovering}
              lastHover={lastHover}
            />
          ))}
        </group>
      </group>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.6, 0.3]}>
        <torusGeometry args={[2.02, 0.009, 8, 128]} />
        <meshBasicMaterial color={palette.ring} transparent opacity={0.45} />
      </mesh>

      {/* drifting particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color={palette.accent} transparent opacity={0.6} sizeAttenuation blending={AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function Scene({ pointer, palette, count, active, onHover, onSelect, lastHover }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color={palette.key} />
      <directionalLight position={[-4, -1, -3]} intensity={1.9} color={palette.ring} />
      <directionalLight position={[0, 2, 4]} intensity={0.9} color="#cfd8ff" />
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
        {AVATAR_MODEL_URL ? (
          <Suspense fallback={null}>
            <AvatarModel url={AVATAR_MODEL_URL} pointer={pointer} />
          </Suspense>
        ) : (
          <CommandCore
            pointer={pointer}
            palette={palette}
            count={count}
            active={active}
            onHover={onHover}
            onSelect={onSelect}
            lastHover={lastHover}
          />
        )}
      </Float>
    </>
  );
}

export default function AvatarScene({ className, count = 0, active, onHover, onSelect }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [lost, setLost] = useState(false);
  const palette = PALETTES[useIsDark() ? "dark" : "light"];
  // The satellite the pointer most recently left, and when. A click that lands
  // just off a moving satellite a moment after leaving it still counts.
  const lastHover = useRef({ i: -1, t: 0 });

  // Never leave the pointer cursor stuck if the scene unmounts mid-hover.
  useEffect(() => () => {
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // A phone GPU can drop the WebGL context under memory pressure. If that
  // happens, stop trying and show the schematic instead of a frozen canvas.
  if (lost)
    return <AvatarFallback className={className} count={count} active={active} onHover={onHover} onSelect={onSelect} />;

  return (
    <div className={className}>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: isMobile ? "default" : "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{ position: [0, 0, 7], fov: 34 }}
        onPointerMissed={() => {
          const { i, t } = lastHover.current;
          if (i >= 0 && performance.now() - t < 450) onSelect?.(i);
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setLost(true);
            },
            { once: true }
          );
        }}
      >
        <Scene
          pointer={pointer}
          palette={palette}
          count={count}
          active={active}
          onHover={onHover}
          onSelect={onSelect}
          lastHover={lastHover}
        />
      </Canvas>
    </div>
  );
}

if (AVATAR_MODEL_URL) useGLTF.preload(AVATAR_MODEL_URL);
