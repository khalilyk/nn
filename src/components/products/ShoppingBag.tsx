"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function ShoppingBag() {
  const bagMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0A0804"),
        metalness: 0.05,
        roughness: 0.7,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9A032"),
        metalness: 1,
        roughness: 0.1,
        emissive: new THREE.Color("#C9A032"),
        emissiveIntensity: 0.3,
      }),
    []
  );

  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2A1E0A"),
        metalness: 0.2,
        roughness: 0.6,
      }),
    []
  );

  return (
    <group scale={0.8} rotation={[0, 0.3, 0]}>
      {/* Main body */}
      <mesh material={bagMat}>
        <boxGeometry args={[1.5, 2.0, 0.65]} />
      </mesh>

      {/* Front panel accent */}
      <mesh position={[0, 0, 0.33]} material={accentMat}>
        <boxGeometry args={[1.3, 1.75, 0.02]} />
      </mesh>

      {/* Logo patch (abstract) */}
      <mesh position={[0, 0.1, 0.35]} material={goldMat}>
        <boxGeometry args={[0.55, 0.08, 0.01]} />
      </mesh>
      <mesh position={[0, 0.0, 0.35]} material={goldMat}>
        <boxGeometry args={[0.08, 0.3, 0.01]} />
      </mesh>

      {/* Top gusset */}
      <mesh position={[0, 1.05, 0]} material={accentMat}>
        <boxGeometry args={[1.5, 0.1, 0.65]} />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -1.05, 0]} material={goldMat}>
        <boxGeometry args={[1.55, 0.1, 0.7]} />
      </mesh>

      {/* Handles (rope/ribbon — torus shapes) */}
      <mesh position={[-0.28, 1.4, 0]} rotation={[Math.PI / 2, 0, 0.15]} material={goldMat}>
        <torusGeometry args={[0.32, 0.045, 12, 28, Math.PI * 1.1]} />
      </mesh>
      <mesh position={[0.28, 1.4, 0]} rotation={[Math.PI / 2, 0, -0.15]} material={goldMat}>
        <torusGeometry args={[0.32, 0.045, 12, 28, Math.PI * 1.1]} />
      </mesh>

      {/* Handle attachment rivets */}
      {[-0.52, 0.52].map((x, i) => (
        <mesh key={i} position={[x, 0.92, 0.33]} material={goldMat}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 10]} />
        </mesh>
      ))}

      {/* Side panels */}
      <mesh position={[-0.765, 0, 0]} material={accentMat}>
        <boxGeometry args={[0.02, 2.0, 0.65]} />
      </mesh>
      <mesh position={[0.765, 0, 0]} material={accentMat}>
        <boxGeometry args={[0.02, 2.0, 0.65]} />
      </mesh>
    </group>
  );
}
