"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import { trailGeometries, trailMaterials } from "./materials";

const count = 36;
const spacing = 0.09;
const lift: Record<string, number> = {
  flames: 1.6,
  bubbles: 0.7,
  sparkles: -0.2,
  snow: -0.1,
  hearts: 0.8,
};

type Particle = { life: number; at: THREE.Vector3; speed: THREE.Vector3 };

const createParticles = (): Particle[] =>
  Array.from({ length: count }, () => ({
    life: 0,
    at: new THREE.Vector3(),
    speed: new THREE.Vector3(),
  }));

type TrailProps = { target: RefObject<THREE.Group | null>; kind: string };

export function Trail({ target, kind }: TrailProps) {
  const looks = trailMaterials[kind];
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const particles = useRef(createParticles());
  const last = useRef<THREE.Vector3 | null>(null);
  const travelled = useRef(0);
  const next = useRef(0);

  useFrame((_, delta) => {
    const group = target.current;
    if (!group || !looks) return;
    const position = group.position;
    last.current ??= position.clone();
    const moved = last.current.distanceTo(position);
    last.current.copy(position);
    if (moved < 1) travelled.current += moved;
    while (travelled.current > spacing) {
      travelled.current -= spacing;
      const particle = particles.current[next.current];
      next.current = (next.current + 1) % count;
      particle.life = 1;
      particle.at.set(
        position.x + (Math.random() - 0.5) * 0.3,
        0.15 + Math.random() * 0.4,
        position.z + (Math.random() - 0.5) * 0.3,
      );
      particle.speed.set(
        (Math.random() - 0.5) * 0.4,
        lift[kind] ?? 0.4,
        (Math.random() - 0.5) * 0.4,
      );
    }
    particles.current.forEach((particle, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;
      particle.life -= delta * (kind === "flames" ? 1.8 : 1.1);
      mesh.visible = particle.life > 0;
      if (!mesh.visible) return;
      particle.at.addScaledVector(particle.speed, delta);
      mesh.position.copy(particle.at);
      mesh.scale.setScalar(particle.life);
      mesh.rotation.y += delta * 4;
    });
  });

  if (!looks) return null;
  return Array.from({ length: count }, (_, index) => (
    <mesh
      key={index}
      ref={(mesh) => {
        meshes.current[index] = mesh;
      }}
      geometry={trailGeometries[kind]}
      material={looks[index % looks.length]}
      visible={false}
    />
  ));
}
