import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Sparkles } from "@react-three/drei";
import { MathUtils } from "three";

/**
 * The intro's real-time 3D portrait: a low-poly, flat-shaded bust of a Gen-Z
 * CS student, lit for the site's cosmic theme — a warm key from the left, a
 * violet rim from behind-right, a cool fill from below like a laptop is open
 * just out of frame. Emissive accents (glasses glint, headphone rings, pins,
 * the dyed streak) carry the glow without a postprocessing pass.
 *
 * Everything is built from primitives — no model file to load, so this is
 * deterministic and needs no network. The stylisation is the point, not a
 * compromise: faceted planes read as a designed object rather than an
 * uncanny face.
 *
 * Movement: <PresentationControls> makes the head drag-to-rotate and spring
 * back; between drags an inner group eases toward the pointer so it keeps
 * "looking" at the cursor, the pupils track a little further, it blinks, and
 * <Float> keeps it gently adrift. This whole module is lazy-loaded and only
 * mounts for the once-per-session intro, so Three.js never touches the main
 * bundle. The intro itself is skipped under reduced motion, so nothing here
 * needs to guard for it.
 */

const SKIN = "#e7b18c";
const HAIR = "#2b2142";
const HAIR_STREAK = "#bda6ff";
const HOODIE = "#1b1930";
const FRAME_DARK = "#100c18";
const ACCENT = "#9b8cff";
const GOLD = "#f5c453";
const RIM = "#8a76ff";
const COOL = "#7aa2ff";

function Bust() {
  const inner = useRef();
  const eyes = useRef();
  const pupilL = useRef();
  const pupilR = useRef();

  useFrame((state, delta) => {
    const group = inner.current;
    if (!group) return;

    const p = state.pointer; // normalised -1..1, updated in place
    group.rotation.y = MathUtils.damp(group.rotation.y, p.x * 0.4, 4, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, -p.y * 0.24, 4, delta);

    const px = p.x * 0.03;
    const py = p.y * 0.028;
    if (pupilL.current) pupilL.current.position.set(-0.17 + px, 0.42 + py, 0.63);
    if (pupilR.current) pupilR.current.position.set(0.17 + px, 0.42 + py, 0.63);

    // blink: a quick dip every ~4.2s
    const phase = state.clock.elapsedTime % 4.2;
    const blink = phase > 3.95 ? Math.abs(Math.cos(((phase - 3.95) / 0.25) * Math.PI)) : 1;
    if (eyes.current) eyes.current.scale.y = Math.max(0.08, blink);
  });

  return (
    <group ref={inner} position={[0, 0.04, 0]}>
      {/* ---- head ---- */}
      <mesh position={[0, 0.42, 0]} scale={[0.92, 1.06, 0.95]}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial color={SKIN} flatShading roughness={0.78} metalness={0} />
      </mesh>
      <mesh position={[0, 0.34, 0.58]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.075, 0.16, 4]} />
        <meshStandardMaterial color={SKIN} flatShading roughness={0.8} />
      </mesh>

      {/* ---- hair ---- */}
      <mesh position={[0, 0.5, -0.12]} scale={[1.14, 1.13, 1.06]}>
        <icosahedronGeometry args={[0.66, 1]} />
        <meshStandardMaterial color={HAIR} flatShading roughness={0.55} />
      </mesh>
      <mesh position={[-0.5, -0.02, 0.02]} rotation={[0, 0, 0.22]}>
        <capsuleGeometry args={[0.17, 0.72, 3, 6]} />
        <meshStandardMaterial color={HAIR} flatShading roughness={0.55} />
      </mesh>
      <mesh position={[0.5, -0.02, 0.02]} rotation={[0, 0, -0.22]}>
        <capsuleGeometry args={[0.17, 0.72, 3, 6]} />
        <meshStandardMaterial color={HAIR} flatShading roughness={0.55} />
      </mesh>
      <mesh position={[0.04, 0.74, 0.4]} rotation={[0.5, 0, -0.16]} scale={[1, 0.5, 0.66]}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={HAIR} flatShading roughness={0.55} />
      </mesh>
      {/* dyed streak */}
      <mesh position={[0.33, 0.54, 0.46]} rotation={[0.3, -0.3, -0.42]}>
        <boxGeometry args={[0.055, 0.5, 0.05]} />
        <meshStandardMaterial color={HAIR_STREAK} emissive={HAIR_STREAK} emissiveIntensity={0.35} flatShading />
      </mesh>

      {/* ---- eyes ---- */}
      <group ref={eyes}>
        <mesh position={[-0.17, 0.42, 0.58]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial color="#f3edf6" roughness={0.35} />
        </mesh>
        <mesh position={[0.17, 0.42, 0.58]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial color="#f3edf6" roughness={0.35} />
        </mesh>
        <mesh ref={pupilL} position={[-0.17, 0.42, 0.63]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#241a3c" emissive={ACCENT} emissiveIntensity={0.15} />
        </mesh>
        <mesh ref={pupilR} position={[0.17, 0.42, 0.63]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#241a3c" emissive={ACCENT} emissiveIntensity={0.15} />
        </mesh>
      </group>
      <mesh position={[-0.17, 0.54, 0.58]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.17, 0.03, 0.05]} />
        <meshStandardMaterial color={HAIR} flatShading />
      </mesh>
      <mesh position={[0.17, 0.54, 0.58]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.17, 0.03, 0.05]} />
        <meshStandardMaterial color={HAIR} flatShading />
      </mesh>

      {/* ---- glasses ---- */}
      <group position={[0, 0.42, 0.6]}>
        <mesh position={[-0.17, 0, 0]}>
          <torusGeometry args={[0.14, 0.02, 8, 20]} />
          <meshStandardMaterial color={FRAME_DARK} metalness={0.35} roughness={0.35} />
        </mesh>
        <mesh position={[0.17, 0, 0]}>
          <torusGeometry args={[0.14, 0.02, 8, 20]} />
          <meshStandardMaterial color={FRAME_DARK} metalness={0.35} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 0.018, 0.02]} />
          <meshStandardMaterial color={FRAME_DARK} />
        </mesh>
        <mesh position={[-0.17, 0, 0.004]}>
          <circleGeometry args={[0.125, 16]} />
          <meshStandardMaterial color={ACCENT} transparent opacity={0.14} emissive={ACCENT} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.17, 0, 0.004]}>
          <circleGeometry args={[0.125, 16]} />
          <meshStandardMaterial color={ACCENT} transparent opacity={0.14} emissive={ACCENT} emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* ---- neck ---- */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.34, 7]} />
        <meshStandardMaterial color={SKIN} flatShading roughness={0.82} />
      </mesh>

      {/* ---- hoodie ---- */}
      <mesh position={[0, -0.74, 0]}>
        <cylinderGeometry args={[0.6, 0.94, 0.94, 8]} />
        <meshStandardMaterial color={HOODIE} flatShading roughness={0.92} />
      </mesh>
      <mesh position={[0, -0.28, -0.16]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.34, 0.13, 6, 12]} />
        <meshStandardMaterial color={HOODIE} flatShading roughness={0.92} />
      </mesh>
      <mesh position={[-0.08, -0.52, 0.33]}>
        <cylinderGeometry args={[0.012, 0.012, 0.42, 5]} />
        <meshStandardMaterial color="#0d0a14" />
      </mesh>
      <mesh position={[0.08, -0.5, 0.33]}>
        <cylinderGeometry args={[0.012, 0.012, 0.38, 5]} />
        <meshStandardMaterial color="#0d0a14" />
      </mesh>
      <mesh position={[-0.08, -0.74, 0.33]}>
        <octahedronGeometry args={[0.035]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.08, -0.71, 0.33]}>
        <octahedronGeometry args={[0.035]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} />
      </mesh>

      {/* ---- headphones round the neck ---- */}
      <mesh position={[0, -0.16, -0.04]} rotation={[1.35, 0, 0]}>
        <torusGeometry args={[0.5, 0.045, 8, 24, Math.PI * 1.25]} />
        <meshStandardMaterial color={FRAME_DARK} metalness={0.25} roughness={0.5} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[0.47 * s, -0.16, 0.06]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 14]} />
            <meshStandardMaterial color={FRAME_DARK} roughness={0.5} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} position={[0.05 * s, 0, 0]}>
            <torusGeometry args={[0.08, 0.014, 6, 16]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}

      {/* ---- lanyard + ID badge ---- */}
      <mesh position={[-0.12, -0.5, 0.29]} rotation={[0, 0, 0.26]}>
        <boxGeometry args={[0.024, 0.5, 0.02]} />
        <meshStandardMaterial color="#3b2f63" />
      </mesh>
      <mesh position={[0.12, -0.5, 0.29]} rotation={[0, 0, -0.26]}>
        <boxGeometry args={[0.024, 0.5, 0.02]} />
        <meshStandardMaterial color="#3b2f63" />
      </mesh>
      <mesh position={[0, -0.78, 0.35]} rotation={[0.22, 0, -0.05]}>
        <boxGeometry args={[0.34, 0.24, 0.02]} />
        <meshStandardMaterial color="#0d0f1c" flatShading />
      </mesh>
      <mesh position={[-0.08, -0.76, 0.37]} rotation={[0.22, 0, -0.05]}>
        <octahedronGeometry args={[0.03]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.7} />
      </mesh>

      {/* ---- star earring ---- */}
      <mesh position={[-0.49, 0.3, 0.18]}>
        <octahedronGeometry args={[0.04]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight args={["#b9c4ff", "#161226", 0.55]} />
      <directionalLight position={[-4, 5, 5]} intensity={2.3} color="#fff1e6" />
      <directionalLight position={[5, 1.5, -3]} intensity={2.7} color={RIM} />
      <directionalLight position={[0, -3, 4]} intensity={0.8} color={COOL} />

      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        polar={[-0.35, 0.35]}
        azimuth={[-0.7, 0.7]}
        config={{ mass: 1, tension: 170, friction: 24 }}
      >
        <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
          <Bust />
        </Float>
      </PresentationControls>

      <Sparkles count={44} scale={[4, 4, 3]} size={2.6} speed={0.4} color={GOLD} opacity={0.85} />
      <Sparkles count={26} scale={[3.4, 3.4, 2.4]} size={1.7} speed={0.3} color={ACCENT} opacity={0.7} />
    </>
  );
}

export default function Avatar3D({ className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3.4], fov: 32 }}
    >
      <Scene />
    </Canvas>
  );
}
