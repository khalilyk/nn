"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1,0));
    float c = hash(i + vec2(0,1));
    float d = hash(i + vec2(1,1));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p); p *= 2.1; a *= 0.5;
    }
    return v;
  }

  void main() {
    // Renaissance palette
    vec3 deep    = vec3(0.024, 0.016, 0.035); // near-black purple
    vec3 umber   = vec3(0.14,  0.085, 0.03);  // burnt umber
    vec3 sienna  = vec3(0.22,  0.10,  0.04);  // raw sienna
    vec3 gold    = vec3(0.80,  0.63,  0.14);  // old gold
    vec3 verdigris = vec3(0.10, 0.22, 0.18);  // patina green

    float y = vUv.y;

    // Base atmosphere
    vec3 bg = mix(umber, deep, smoothstep(0.0, 0.85, y));
    bg = mix(bg, verdigris, smoothstep(0.5, 0.9, y) * 0.15);

    // Golden hour glow — like a candle behind a canvas
    float glow1 = fbm(vUv * 1.8 + vec2(uTime * 0.015, 0.0));
    float band  = (1.0 - abs(y - 0.38) * 2.8);
    band = max(0.0, band) * glow1;
    bg = mix(bg, gold * 0.6, band * 0.55);

    // Subtle craquelure / oil-painting texture
    float craq = fbm(vUv * 22.0 + 3.0) * 0.06;
    bg += craq - 0.03;

    // Vignette
    float vig = length(vUv - 0.5) * 1.2;
    bg *= 1.0 - vig * 0.5;

    gl_FragColor = vec4(max(bg, vec3(0.0)), 1.0);
  }
`;

export default function RenaissanceBg() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -25]} scale={[90, 55, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
