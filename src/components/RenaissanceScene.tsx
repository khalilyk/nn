"use client";

import { MutableRefObject, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import RenaissanceBg from "./RenaissanceBg";
import GoldParticles from "./GoldParticles";
import Sneaker from "./products/Sneaker";
import Skateboard from "./products/Skateboard";
import ShoppingBag from "./products/ShoppingBag";

/* ─── Camera + scene animation driven by scroll ─── */
function SceneContent({ scrollProgress }: { scrollProgress: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // Keyframe camera positions along scroll
    const camX = t < 0.2 ? 0 : t < 0.4 ? -5 : t < 0.6 ? 4 : t < 0.8 ? -2 : 0;
    const camY = t < 0.2 ? 0 : t < 0.4 ? 2.5 : t < 0.6 ? -0.5 : t < 0.8 ? 4 : 1;
    const camZ = t < 0.2 ? 9 : t < 0.4 ? 13 : t < 0.6 ? 6 : t < 0.8 ? 15 : 10;
    const lookY = t < 0.6 ? 0 : t < 0.8 ? 2 : 0.5;

    const ease = 0.035;
    state.camera.position.x += (camX - state.camera.position.x) * ease;
    state.camera.position.y += (camY - state.camera.position.y) * ease;
    state.camera.position.z += (camZ - state.camera.position.z) * ease;
    state.camera.lookAt(0, lookY, 0);

    // Slow ambient world rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.15;
    }
  });

  return (
    <>
      {/* Background */}
      <RenaissanceBg />

      {/* Particles */}
      <GoldParticles />

      {/* Product sculptures */}
      <group ref={groupRef}>
        {/* Sneaker — left foreground */}
        <group position={[-2.2, 0.3, 0]}>
          <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.8}>
            <Sneaker />
          </Float>
        </group>

        {/* Skateboard — right mid */}
        <group position={[3, -0.8, -4]}>
          <Float speed={0.9} rotationIntensity={1.0} floatIntensity={1.3}>
            <Skateboard />
          </Float>
        </group>

        {/* Shopping bag — center back */}
        <group position={[-0.5, 1.5, -8]}>
          <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1.0}>
            <ShoppingBag />
          </Float>
        </group>

        {/* Extra decorative orbs */}
        {[
          [-4, 2, -6], [5, -2, -10], [2, 3, -14], [-6, -1, -12], [0, -3, -5],
        ].map((pos, i) => (
          <Float key={i} speed={0.5 + i * 0.3} floatIntensity={0.8}>
            <mesh position={pos as [number, number, number]}>
              <icosahedronGeometry args={[0.18 + i * 0.06, 1]} />
              <meshStandardMaterial
                color="#C9A032"
                metalness={1}
                roughness={0.1}
                emissive="#C9A032"
                emissiveIntensity={0.25}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Lighting — Caravaggio chiaroscuro */}
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 8, 4]}   intensity={6}   color="#E8C84A" castShadow />
      <pointLight position={[-8, 2, 3]}  intensity={2}   color="#C9A032" />
      <pointLight position={[0, -5, 2]}  intensity={1.5} color="#1F3070" />
      <directionalLight position={[3, 12, 6]} intensity={3} color="#F0D060" />
      <spotLight position={[0, 10, 0]} angle={0.4} intensity={4} color="#C9A032" penumbra={0.8} />

      <Environment preset="sunset" />
      <fog attach="fog" args={["#060409", 18, 45]} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.35}
          luminanceSmoothing={0.85}
          intensity={2.2}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0006, 0.0006)}
        />
        <Vignette offset={0.25} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

/* ─── Main canvas export ─── */
export default function RenaissanceScene({
  scrollProgress,
}: {
  scrollProgress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 58, near: 0.1, far: 80 }}
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      <SceneContent scrollProgress={scrollProgress} />
    </Canvas>
  );
}
