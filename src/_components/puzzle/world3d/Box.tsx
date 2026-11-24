"use client";

import { Edges } from "@react-three/drei";
import type * as THREE from "three";
import { palette } from "./materials";

export type Vec3 = [number, number, number];

type BoxProps = {
  size: Vec3;
  position: Vec3;
  material: THREE.Material | THREE.Material[];
  edges?: boolean;
  rotation?: Vec3;
};

export function Box({
  size,
  position,
  material,
  edges = true,
  rotation,
}: BoxProps) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      material={material}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      {edges && <Edges color={palette.ink} threshold={20} />}
    </mesh>
  );
}

export type Detail = [size: Vec3, position: Vec3, material: THREE.Material];

export function Details({ parts }: { parts: Detail[] }) {
  return parts.map(([size, position, material], index) => (
    <Box
      key={index}
      size={size}
      position={position}
      material={material}
      edges={false}
    />
  ));
}
