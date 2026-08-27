import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Environment,
  ContactShadows,
  Sparkles,
  MeshReflectorMaterial,
  Trail,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

/* ── Two fully separate palettes — no shared hues ── */
const LOGO_PALETTE = {
  core: '#fb7185',      // rose
  coreDeep: '#881337',
  accent: '#fda4af',    // soft coral
  accentDeep: '#9f1239',
  wire: '#ffe4e6',
};

const PRODUCT_PALETTE = {
  core: '#14b8a6',      // teal
  coreDeep: '#134e4a',
  accent: '#34d399',    // emerald
  accentDeep: '#065f46',
  wire: '#d1fae5',
};

/* ── Orbiting electron-style particle with a comet trail ── */
function OrbitParticle({ radius, speed, offset, color, height = 0 }) {
  const ref = useRef(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, height + Math.sin(t * 1.6) * 0.15, Math.sin(t) * radius);
    }
  });
  return (
    <Trail width={1.2} length={5} color={color} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

/* ── 3D Logo Model — rose/coral ── */
function ChromeLogoMesh() {
  const coreRef = useRef(null);
  const wireRef = useRef(null);
  const innerRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.4;
      coreRef.current.rotation.y += delta * 0.7;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.25;
      wireRef.current.rotation.z += delta * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.6;
      innerRef.current.rotation.z += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
      ringRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group scale={1.1}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <MeshDistortMaterial
          color={LOGO_PALETTE.core}
          emissive={LOGO_PALETTE.coreDeep}
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.08}
          envMapIntensity={1.5}
          distort={0.16}
          speed={2}
        />
      </mesh>

      <mesh ref={innerRef} scale={0.55}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={LOGO_PALETTE.accent}
          emissive={LOGO_PALETTE.accentDeep}
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.15}
          envMapIntensity={1.3}
        />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={LOGO_PALETTE.wire} wireframe transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.4, 0.035, 16, 64]} />
        <meshStandardMaterial
          color={LOGO_PALETTE.accent}
          emissive={LOGO_PALETTE.core}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      <OrbitParticle radius={1.55} speed={0.9} offset={0} color={LOGO_PALETTE.accent} />
      <OrbitParticle radius={1.35} speed={-1.2} offset={2} color={LOGO_PALETTE.wire} height={0.3} />
      <OrbitParticle radius={1.65} speed={0.6} offset={4} color={LOGO_PALETTE.core} height={-0.25} />
    </group>
  );
}

/* ── 3D Product Hologram Model — teal/emerald ── */
function ProductHologramMesh() {
  const groupRef = useRef(null);
  const scanRefs = useRef([]);

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
    scanRefs.current.forEach((ref, i) => {
      if (ref) {
        const t = state.clock.elapsedTime * 0.8 + i * 1.8;
        ref.position.y = (((t % 3) + 3) % 3) - 1.4;
        ref.material.opacity = 0.9 - Math.abs((((t % 3) + 3) % 3) - 1.5) * 0.5;
      }
    });
  });

  return (
    <group ref={groupRef} scale={1.05} position={[0, -0.05, 0]}>
      <mesh>
        <cylinderGeometry args={[0.42, 0.5, 1.3, 32]} />
        <meshStandardMaterial
          color={PRODUCT_PALETTE.core}
          emissive={PRODUCT_PALETTE.coreDeep}
          emissiveIntensity={0.35}
          metalness={0.85}
          roughness={0.2}
          envMapIntensity={1.4}
        />
      </mesh>

      <mesh position={[0, 0.72, 0]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.42, 32, 16]} />
        <meshStandardMaterial color={PRODUCT_PALETTE.core} metalness={0.85} roughness={0.2} envMapIntensity={1.4} />
      </mesh>

      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.35, 24]} />
        <meshStandardMaterial color={PRODUCT_PALETTE.coreDeep} metalness={0.8} roughness={0.25} />
      </mesh>

      <mesh>
        <cylinderGeometry args={[0.44, 0.52, 1.32, 32]} />
        <meshBasicMaterial color={PRODUCT_PALETTE.wire} wireframe transparent opacity={0.28} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (scanRefs.current[i] = el)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.012, 8, 48]} />
          <meshBasicMaterial color={PRODUCT_PALETTE.accent} transparent opacity={0.9} />
        </mesh>
      ))}

      <Sparkles count={25} scale={[1.3, 2.2, 1.3]} size={2.5} speed={0.4} color={PRODUCT_PALETTE.accent} opacity={0.8} />
    </group>
  );
}

function LoadingPlaceholder({ color }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 0.9 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

const ModelViewer = ({ type = 'logo' }) => {
  const isLogo = type === 'logo';
  const palette = isLogo ? LOGO_PALETTE : PRODUCT_PALETTE;

  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-4, -3, -2]} intensity={0.6} color={palette.core} />
      <pointLight position={[3, -2, 2]} intensity={0.6} color={palette.accent} />

      <Environment preset="city" background={false} />

      <Suspense fallback={<LoadingPlaceholder color={palette.core} />}>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
          {isLogo ? <ChromeLogoMesh /> : <ProductHologramMesh />}
        </Float>
        <Sparkles count={15} scale={4} size={1.5} speed={0.2} color={palette.accent} opacity={0.35} />
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <planeGeometry args={[6, 6]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={256}
          mixBlur={1}
          mixStrength={15}
          roughness={1}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#050505"
          metalness={0.6}
          mirror={0}
        />
      </mesh>

      <ContactShadows position={[0, -1.14, 0]} opacity={0.5} scale={4} blur={2.5} far={2} />

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
};

export default ModelViewer;