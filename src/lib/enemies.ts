import {
  ahead,
  cellKey,
  isSolid,
  isWalkable,
  tileAt,
  turn,
  type Enemy,
  type Point,
  type World,
} from "./levels";

export type EnemyKind = "bug" | "virus";

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

// Every enemy takes one step each time the cat moves, jumps or waits, and turns back at obstacles.
export function patrolAll(world: World): Pick<World, "bugs" | "viruses"> {
  const taken = new Set([...world.bugs, ...world.viruses].map(cellKey));
  const step = (enemy: Enemy): Enemy => {
    taken.delete(cellKey(enemy));
    for (const dir of [enemy.dir, turn(enemy.dir, 2)]) {
      const next = ahead(enemy, dir);
      if (isWalkable(tileAt(world, next)) && !taken.has(cellKey(next))) {
        taken.add(cellKey(next));
        return { ...enemy, ...next, dir };
      }
    }
    taken.add(cellKey(enemy));
    return enemy;
  };
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

// The zap beam reaches two tiles ahead, unless something solid stops it first.
export function bugsInRange(world: World): Enemy[] {
  const { cat } = world;
  const near = ahead(cat, cat.dir);
  const far = ahead(near, cat.dir);
  const targets = isSolid(tileAt(world, near)) ? [near] : [near, far];
  return world.bugs.filter((bug) =>
    targets.some((target) => same(bug, target)),
  );
}

export function virusComing(world: World): boolean {
  const next = ahead(world.cat, world.cat.dir);
  const moved = patrolAll(world).viruses;
  return [...world.viruses, ...moved].some((virus) => same(virus, next));
}
