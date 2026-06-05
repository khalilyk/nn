"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleVert = `
  attribute float aSize;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    float dist = length(mvPos.xyz);

    // Drift upward gently
    vec3 pos = position;
    pos.y += sin(uTime * 0.3 + position.x * 1.5) * 0.4;
    pos.x += cos(uTime * 0.25 + position.z * 1.2) * 0.3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (350.0 / dist);
    vAlpha = smoothstep(30.0, 5.0, dist) * 0.7;
  }
`;

const particleFrag = `
  varying float vAlpha;

  void main() {
    // Soft circle particle
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = (1.0 - d * 2.0) * vAlpha;
    gl_FragColor = vec4(0.8, 0.63, 0.14, alpha);
  }
`;

export default function GoldParticles() {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3]     = r * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta) - 5;
      sizes[i] = Math.random() * 6 + 2;
    }
    return { positions, sizes };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.018;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
