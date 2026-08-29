import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { AdditiveBlending, MathUtils } from "three";

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

const CYAN = "#35d6f5";
const VIOLET = "#8f83ff";

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

function CommandCore({ pointer }) {
  const group = useRef();
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();

  const particles = useMemo(() => {
    const n = 80;
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
          gl_FragColor = vec4(vec3(0.21,0.84,0.96)*f, f*0.85); }`,
    }),
    []
  );

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.5, 2.5, d);
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -pointer.current.y * 0.28, 2.5, d);
    }
    if (core.current) {
      core.current.rotation.y += d * 0.28;
      core.current.rotation.x += d * 0.1;
      const s = 1 + Math.sin(t * 1.4) * 0.02;
      core.current.scale.setScalar(s);
    }
    if (ringA.current) ringA.current.rotation.z += d * 0.35;
    if (ringB.current) ringB.current.rotation.z -= d * 0.24;
  });

  return (
    <group ref={group}>
      {/* faceted body */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#16283e"
          metalness={0.3}
          roughness={0.4}
          flatShading
          emissive={CYAN}
          emissiveIntensity={0.06}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.2} />
      </mesh>
      {/* fresnel glow */}
      <mesh scale={1.07}>
        <icosahedronGeometry args={[1, 2]} />
        <shaderMaterial attach="material" {...fresnel} />
      </mesh>
      {/* inner core */}
      <mesh scale={0.34}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.8} />
      </mesh>
      <pointLight color={CYAN} intensity={3.4} distance={8} />

      {/* orbital rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.4, 0]}>
        <torusGeometry args={[1.72, 0.012, 8, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.6, 0.3]}>
        <torusGeometry args={[2.02, 0.009, 8, 128]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.45} />
      </mesh>

      {/* drifting particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color={CYAN} transparent opacity={0.6} sizeAttenuation blending={AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function Scene({ pointer }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#dff6ff" />
      <directionalLight position={[-4, -1, -3]} intensity={1.9} color={VIOLET} />
      <directionalLight position={[0, 2, 4]} intensity={0.9} color="#bfefff" />
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
        {AVATAR_MODEL_URL ? (
          <Suspense fallback={null}>
            <AvatarModel url={AVATAR_MODEL_URL} pointer={pointer} />
          </Suspense>
        ) : (
          <CommandCore pointer={pointer} />
        )}
      </Float>
    </>
  );
}

export default function AvatarScene({ className }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 34 }}
      >
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}

if (AVATAR_MODEL_URL) useGLTF.preload(AVATAR_MODEL_URL);
