import {
  ahead,
  isWalkable,
  tileAt,
  turn,
  type Enemy,
  type Point,
  type World,
} from "./levels";

export type EnemyKind = "bug" | "virus";

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

const nextOf = (world: World, enemy: Enemy): Enemy => {
  for (const dir of [enemy.dir, turn(enemy.dir, 2)]) {
    const next = ahead(enemy, dir);
    if (isWalkable(tileAt(world, next))) return { ...enemy, ...next, dir };
  }
  return enemy;
};

// Every enemy takes one step each time the cat moves, jumps or waits, and turns back at obstacles.
export function patrolAll(world: World): Pick<World, "bugs" | "viruses"> {
  const step = (enemy: Enemy) => nextOf(world, enemy);
  return { bugs: world.bugs.map(step), viruses: world.viruses.map(step) };
}

export function enemyAt(world: World, at: Point): EnemyKind | null {
  if (world.viruses.some((virus) => same(virus, at))) return "virus";
  if (world.bugs.some((bug) => same(bug, at))) return "bug";
  return null;
}

export function catcher(
  before: World,
  after: Pick<World, "bugs" | "viruses">,
  from: Point,
  to: Point,
): EnemyKind | null {
  const hits = (old: Enemy[], moved: Enemy[]) =>
    moved.some(
      (enemy, index) =>
        same(enemy, to) || (same(enemy, from) && same(old[index], to)),
    );
  if (hits(before.viruses, after.viruses)) return "virus";
  if (hits(before.bugs, after.bugs)) return "bug";
  return null;
}

export const bugAhead = (world: World) => {
  const front = ahead(world.cat, world.cat.dir);
  return world.bugs.find((bug) => same(bug, front)) ?? null;
};

export function enemyComing(world: World): boolean {
  const front = ahead(world.cat, world.cat.dir);
  return [...world.bugs, ...world.viruses].some(
    (enemy) => same(enemy, front) || same(nextOf(world, enemy), front),
  );
}
