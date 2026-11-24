"use client";

import { Edges } from "@react-three/drei";
import type * as THREE from "three";
import {
  Box,
  Details,
  type Detail,
  type Vec3,
} from "@/_components/puzzle/world3d/Box";
import { palette } from "@/_components/puzzle/world3d/materials";
import { catMaterials as cat } from "./materials";

const face: Detail[] = [
  [[0.15, 0.17, 0.04], [-0.14, 0.06, 0.33], cat.eye],
  [[0.15, 0.17, 0.04], [0.14, 0.06, 0.33], cat.eye],
  [[0.04, 0.13, 0.03], [-0.13, 0.05, 0.355], cat.ink],
  [[0.04, 0.13, 0.03], [0.15, 0.05, 0.355], cat.ink],
  [[0.09, 0.05, 0.03], [0, -0.07, 0.34], cat.ear],
  [[0.14, 0.03, 0.03], [0, -0.13, 0.335], cat.ink],
  [[0.04, 0.1, 0.02], [-0.09, 0.25, 0.33], cat.furDark],
  [[0.04, 0.1, 0.02], [0, 0.25, 0.33], cat.furDark],
  [[0.04, 0.1, 0.02], [0.09, 0.25, 0.33], cat.furDark],
];

const whiskers: Detail[] = [-0.04, -0.1].flatMap((y): Detail[] => [
  [[0.2, 0.015, 0.015], [-0.38, y, 0.26], cat.ink],
  [[0.2, 0.015, 0.015], [0.38, y, 0.26], cat.ink],
]);

function Ear({ x }: { x: number }) {
  return (
    <group position={[x, 0.46, 0.1]} scale={[1, 1, 0.45]}>
      <Pyramid radius={0.2} height={0.32} material={cat.fur} />
      <group position={[0, -0.03, 0.09]}>
        <Pyramid radius={0.09} height={0.15} material={cat.ear} />
      </group>
    </group>
  );
}

type PyramidProps = {
  radius: number;
  height: number;
  material: THREE.Material;
};

function Pyramid({ radius, height, material }: PyramidProps) {
  return (
    <mesh material={material} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[radius, height, 4]} />
      <Edges color={palette.ink} threshold={20} />
    </mesh>
  );
}

const tailPosition: Vec3 = [0.12, 0.08, -0.38];

export function CatBody() {
  return (
    <>
      <Box size={[0.64, 0.64, 0.64]} position={[0, 0, 0]} material={cat.fur} />
      <Ear x={-0.18} />
      <Ear x={0.18} />
      <Details parts={face} />
      <Details parts={whiskers} />
      <group position={tailPosition} rotation={[-0.5, 0, 0.2]}>
        <Box size={[0.1, 0.4, 0.1]} position={[0, 0.2, 0]} material={cat.fur} />
        <Box
          size={[0.11, 0.1, 0.11]}
          position={[0, 0.38, 0]}
          material={cat.furDark}
        />
      </group>
    </>
  );
}
