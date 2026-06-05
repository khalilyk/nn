"use client";

import { useMemo } from "react";
import * as THREE from "three";

const goldMat = () =>
  new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C9A032"),
    metalness: 0.95,
    roughness: 0.12,
    emissive: new THREE.Color("#C9A032"),
    emissiveIntensity: 0.18,
  });

const chromeMat = () =>
  new THREE.MeshStandardMaterial({
    color: new THREE.Color("#E8E0CC"),
    metalness: 0.85,
    roughness: 0.2,
    emissive: new THREE.Color("#D4C89A"),
    emissiveIntensity: 0.08,
  });

const darkMat = () =>
  new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1A1208"),
    metalness: 0.6,
    roughness: 0.3,
  });

export default function Sneaker() {
  const gm = useMemo(goldMat, []);
  const cm = useMemo(chromeMat, []);
  const dm = useMemo(darkMat, []);

  return (
    <group scale={0.85} rotation={[0.1, 0.4, 0]}>
      {/* Outsole */}
      <mesh position={[0, -0.38, 0]} material={dm}>
        <boxGeometry args={[2.5, 0.18, 0.95]} />
      </mesh>

      {/* Midsole — gold */}
      <mesh position={[0, -0.22, 0]} material={gm}>
        <boxGeometry args={[2.35, 0.22, 0.88]} />
      </mesh>

      {/* Upper body */}
      <mesh position={[-0.05, 0.1, 0]} material={cm}>
        <boxGeometry args={[2.1, 0.55, 0.82]} />
      </mesh>

      {/* Heel counter */}
      <mesh position={[-0.95, 0.2, 0]} material={gm}>
        <boxGeometry args={[0.58, 0.62, 0.82]} />
      </mesh>

      {/* Toe box */}
      <mesh position={[1.0, 0.0, 0]} material={gm}>
        <sphereGeometry args={[0.35, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      </mesh>

      {/* Tongue */}
      <mesh position={[0.2, 0.48, 0]} material={cm}>
        <boxGeometry args={[0.4, 0.55, 0.08]} />
      </mesh>

      {/* Collar top */}
      <mesh position={[-0.55, 0.38, 0]} material={gm}>
        <boxGeometry args={[0.9, 0.12, 0.84]} />
      </mesh>

      {/* Laces — 5 crossings */}
      {[-0.2, -0.0, 0.18, 0.36, 0.54].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0]} material={gm} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.76, 6]} />
        </mesh>
      ))}

      {/* Side swoosh / logo decal (abstract) */}
      <mesh position={[0.1, 0.05, 0.42]} material={gm} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.8, 0.06, 0.02]} />
      </mesh>
    </group>
  );
}
