"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Skateboard() {
  const deckMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1A0E06"),
        metalness: 0.1,
        roughness: 0.8,
      }),
    []
  );

  const griptapeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0A0804"),
        metalness: 0,
        roughness: 1,
      }),
    []
  );

  const truckMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9A032"),
        metalness: 1,
        roughness: 0.08,
        emissive: new THREE.Color("#C9A032"),
        emissiveIntensity: 0.2,
      }),
    []
  );

  const wheelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E8E0CC"),
        metalness: 0.3,
        roughness: 0.5,
        emissive: new THREE.Color("#C9A032"),
        emissiveIntensity: 0.05,
      }),
    []
  );

  const wheelPositions: [number, number, number][] = [
    [1.15, -0.26, 0.44],
    [1.15, -0.26, -0.44],
    [-1.15, -0.26, 0.44],
    [-1.15, -0.26, -0.44],
  ];

  return (
    <group scale={0.9} rotation={[0.15, -0.5, 0.05]}>
      {/* Deck bottom */}
      <mesh position={[0, 0, 0]} material={deckMat}>
        <boxGeometry args={[3.2, 0.1, 0.85]} />
      </mesh>

      {/* Grip tape top */}
      <mesh position={[0, 0.06, 0]} material={griptapeMat}>
        <boxGeometry args={[3.0, 0.02, 0.78]} />
      </mesh>

      {/* Nose kick */}
      <mesh position={[1.45, 0.15, 0]} rotation={[0, 0, 0.5]} material={deckMat}>
        <boxGeometry args={[0.45, 0.1, 0.85]} />
      </mesh>

      {/* Tail kick */}
      <mesh position={[-1.45, 0.1, 0]} rotation={[0, 0, -0.35]} material={deckMat}>
        <boxGeometry args={[0.45, 0.1, 0.85]} />
      </mesh>

      {/* Front truck baseplate */}
      <mesh position={[1.1, -0.12, 0]} material={truckMat}>
        <boxGeometry args={[0.55, 0.1, 0.82]} />
      </mesh>

      {/* Rear truck baseplate */}
      <mesh position={[-1.1, -0.12, 0]} material={truckMat}>
        <boxGeometry args={[0.55, 0.1, 0.82]} />
      </mesh>

      {/* Axles */}
      <mesh position={[1.1, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={truckMat}>
        <cylinderGeometry args={[0.05, 0.05, 1.0, 12]} />
      </mesh>
      <mesh position={[-1.1, -0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={truckMat}>
        <cylinderGeometry args={[0.05, 0.05, 1.0, 12]} />
      </mesh>

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]} material={wheelMat}>
          <cylinderGeometry args={[0.22, 0.22, 0.2, 20]} />
        </mesh>
      ))}

      {/* Bearing highlights */}
      {wheelPositions.map((pos, i) => (
        <mesh key={`b${i}`} position={[pos[0], pos[1], pos[2]]} rotation={[Math.PI / 2, 0, 0]} material={truckMat}>
          <cylinderGeometry args={[0.07, 0.07, 0.22, 12]} />
        </mesh>
      ))}
    </group>
  );
}
