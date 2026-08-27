import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function PrismaticBox() {
  const meshRef = useRef();

  const shaderArgs = useMemo(() => ({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        // Full rainbow stripe sweeps left to right, animated
        float hue = fract(vUv.x * 0.85 + uTime * 0.035);
        vec3 rainbow = hsv2rgb(vec3(hue, 1.0, 1.0));

        // Warm orange-red blob peaks at horizontal centre, upper half
        float cx = 1.0 - abs(vUv.x * 2.0 - 1.0);
        float cy = smoothstep(0.0, 0.7, vUv.y);
        vec3 warmColor = vec3(1.6, 0.55, 0.08);
        vec3 col = mix(rainbow, warmColor, cx * cy * 0.68);

        // Brighter toward top
        col *= (0.55 + 0.75 * vUv.y);

        // White-yellow top edge
        float topEdge = smoothstep(0.72, 1.0, vUv.y);
        col = mix(col, vec3(3.5, 3.5, 2.8), topEdge);

        // Warm white-red bottom edge
        float bottomEdge = smoothstep(0.28, 0.0, vUv.y);
        col = mix(col, vec3(3.0, 1.8, 1.2), bottomEdge);

        // Blue neon left / right trims
        float leftTrim  = smoothstep(0.10, 0.0, vUv.x);
        float rightTrim = smoothstep(0.90, 1.0, vUv.x);
        col += vec3(0.5, 1.3, 2.6) * leftTrim  * 2.2;
        col += vec3(0.4, 1.0, 2.0) * rightTrim * 2.2;

        // Overall brightness for bloom
        col *= 1.5;

        gl_FragColor = vec4(col, 1.0);
      }
    `
  }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * -0.42;
    meshRef.current.rotation.x = Math.sin(t * 0.28) * 0.14;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.07;
    meshRef.current.material.uniforms.uTime.value = t;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.6, 1.8, 1.6]} />
      <shaderMaterial args={[shaderArgs]} toneMapped={false} />
    </mesh>
  );
}

export default function Box() {
  return (
    <div className="hero__canvas-wrap">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#080808');
        }}
      >
        <PrismaticBox />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.14}
            mipmapBlur
            intensity={0.9}
            radius={0.4}

          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}