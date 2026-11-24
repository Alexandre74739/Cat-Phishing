import * as THREE from "three";
import { dirAngles } from "@/_components/puzzle/world3d/materials";
import type { Cat } from "@/lib/levels";

export type CatMotion = {
  effects: { bump: number; win: number; nod: number; wait: number };
  waitTotal: number;
  span: { tx: number; tz: number; distance: number };
  snap: boolean;
};

export const createMotion = (): CatMotion => ({
  effects: { bump: 0, win: 0, nod: 0, wait: 0 },
  waitTotal: 1,
  span: { tx: NaN, tz: NaN, distance: 1 },
  snap: true,
});

export function applyEvent(motion: CatMotion, kind: string, duration = 0.5) {
  if (kind === "bump" || kind === "caught") motion.effects.bump = 1;
  if (kind === "grab" || kind === "nothing") motion.effects.nod = 1;
  if (kind === "wait") {
    motion.effects.wait = duration;
    motion.waitTotal = duration;
  }
  if (kind === "win") motion.effects.win = 0.001;
  if (kind === "reset") {
    motion.effects = { bump: 0, win: 0, nod: 0, wait: 0 };
    motion.snap = true;
  }
}

const turnTowards = (from: number, to: number) =>
  ((((to - from + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) -
  Math.PI;

export function stepCat(
  motion: CatMotion,
  root: THREE.Group,
  body: THREE.Group,
  cat: Cat,
  offset: { x: number; z: number },
  delta: number,
) {
  const tx = cat.x - offset.x;
  const tz = cat.y - offset.z;
  if (motion.snap) {
    root.position.set(tx, 0, tz);
    root.rotation.y = dirAngles[cat.dir];
    motion.snap = false;
  }
  root.position.x = THREE.MathUtils.damp(root.position.x, tx, 9, delta);
  root.position.z = THREE.MathUtils.damp(root.position.z, tz, 9, delta);
  root.rotation.y +=
    turnTowards(root.rotation.y, dirAngles[cat.dir]) * Math.min(1, delta * 12);

  const { span, effects } = motion;
  if (span.tx !== tx || span.tz !== tz) {
    span.distance = Math.max(
      0.01,
      Math.hypot(tx - root.position.x, tz - root.position.z),
    );
    span.tx = tx;
    span.tz = tz;
  }
  const remaining = Math.hypot(tx - root.position.x, tz - root.position.z);
  const progress = Math.min(1, remaining / span.distance);
  let hop = span.distance > 0.05 ? Math.sin(progress * Math.PI) * 0.35 : 0;

  body.rotation.x = 0;
  body.position.z = 0;
  if (effects.bump > 0) {
    effects.bump = Math.max(0, effects.bump - delta * 2.5);
    body.position.z = Math.sin(effects.bump * Math.PI * 3) * 0.18;
    body.rotation.x = Math.sin(effects.bump * Math.PI * 3) * 0.3;
  }
  if (effects.nod > 0) {
    effects.nod = Math.max(0, effects.nod - delta * 3);
    body.rotation.x = Math.sin(effects.nod * Math.PI) * 0.35;
  }
  body.rotation.z = 0;
  body.scale.set(1, 1, 1);
  if (effects.wait > 0) {
    effects.wait = Math.max(0, effects.wait - delta);
    const beat = 1 - effects.wait / motion.waitTotal;
    const air = Math.sin(beat * Math.PI);
    hop = air * 0.3;
    body.rotation.z = Math.sin(beat * Math.PI * 2) * 0.22;
    body.scale.set(1 - air * 0.08, 1 + air * 0.14, 1 - air * 0.08);
  }
  body.rotation.y = 0;
  if (effects.win > 0) {
    effects.win += delta;
    hop = Math.abs(Math.sin(effects.win * 7)) * 0.5;
    body.rotation.y = effects.win * 9;
  }
  body.position.y = 0.33 + hop;
}
