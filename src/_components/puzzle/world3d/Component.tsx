"use client";

import { Edges } from "@react-three/drei";
import { Box, Details, type Detail, type Vec3 } from "./Box";
import { materials, palette } from "./materials";

const serverFront: Detail[] = [0.2, 0.36].flatMap((y): Detail[] => [
  [[0.44, 0.07, 0.02], [0, y, 0.34], materials.slot],
  [[0.02, 0.07, 0.44], [0.34, y, 0], materials.slot],
]);

const serverStatus: Detail[] = [
  [[0.16, 0.04, 0.02], [-0.1, 0.52, 0.34], materials.status],
  [[0.02, 0.04, 0.16], [0.34, 0.52, 0.1], materials.status],
];

const chipPins: Detail[] = [-0.18, 0, 0.18].flatMap((offset): Detail[] => [
  [[0.05, 0.05, 0.08], [offset, 0.06, 0.34], materials.pin],
  [[0.08, 0.05, 0.05], [0.34, 0.06, offset], materials.pin],
  [[0.05, 0.05, 0.08], [offset, 0.06, -0.34], materials.pin],
  [[0.08, 0.05, 0.05], [-0.34, 0.06, offset], materials.pin],
]);

function Server({ alt }: { alt: boolean }) {
  return (
    <>
      <Box
        size={[0.66, 0.62, 0.66]}
        position={[0, 0.31, 0]}
        material={alt ? materials.serverAlt : materials.server}
      />
      <Details parts={serverFront} />
      <Details parts={serverStatus} />
    </>
  );
}

function Chip() {
  return (
    <>
      <Box
        size={[0.6, 0.18, 0.6]}
        position={[0, 0.09, 0]}
        material={materials.chip}
      />
      <Details parts={chipPins} />
      <Box
        size={[0.18, 0.02, 0.18]}
        position={[-0.12, 0.19, -0.12]}
        material={materials.chipLabel}
        edges={false}
      />
    </>
  );
}

function Capacitor({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} material={materials.capacitor} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 10]} />
        <Edges color={palette.ink} threshold={30} />
      </mesh>
      <mesh position={[0, 0.51, 0]} material={materials.capacitorTop}>
        <cylinderGeometry args={[0.13, 0.13, 0.03, 10]} />
      </mesh>
    </group>
  );
}

export function Component({ seed }: { seed: number }) {
  const kind = seed % 6;
  if (kind === 2) return <Chip />;
  if (kind === 4)
    return (
      <>
        <Capacitor position={[-0.15, 0, -0.12]} />
        <Capacitor position={[0.17, 0, 0.14]} />
      </>
    );
  return <Server alt={kind % 2 === 1} />;
}
