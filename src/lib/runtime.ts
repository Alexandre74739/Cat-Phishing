import type { Block, BlockType, Condition } from "./blocks";
import { bugAhead, catcher, enemyAt, enemyComing, patrolAll } from "./enemies";
import {
  ahead,
  cellKey,
  isWalkable,
  setTile,
  tileAt,
  turn,
  type Point,
  type Tile,
  type World,
} from "./levels";

export type StepKind =
  | "move"
  | "jump"
  | "turn"
  | "grab"
  | "key"
  | "zap"
  | "bridge"
  | "smash"
  | "open"
  | "nothing"
  | "wait"
  | "bump"
  | "splash"
  | "burn"
  | "caught"
  | "check"
  | "win";

export type Step = {
  kind: StepKind;
  blockId: string;
  world: World;
  at?: Point;
};

export type FailReason =
  | "empty"
  | "blocked"
  | "spam"
  | "locked"
  | "stream"
  | "lava"
  | "bug"
  | "virus"
  | "gemsMissing"
  | "notAtGoal"
  | "tooLong";

export type Outcome = { ok: true } | { ok: false; reason: FailReason };

const maxSteps = 600;
const maxLoops = 120;

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

const solidReasons: Partial<Record<Tile, FailReason>> = {
  "#": "blocked",
  R: "spam",
  D: "locked",
};

const tileChecks: Partial<Record<Condition, Tile>> = {
  stream: "~",
  spam: "R",
  lava: "L",
  gate: "D",
};

const sideTurns: Partial<Record<Condition, number>> = {
  path: 0,
  pathRight: 1,
  pathLeft: -1,
};

const turns: Partial<Record<BlockType, number>> = {
  left: -1,
  right: 1,
  turnAround: 2,
};

const tileActions: Partial<
  Record<BlockType, { from: Tile; to: Tile; kind: StepKind }>
> = {
  bridge: { from: "~", to: "=", kind: "bridge" },
  smash: { from: "R", to: ".", kind: "smash" },
  open: { from: "D", to: "O", kind: "open" },
};

class Stop {
  readonly outcome: Outcome;
  constructor(outcome: Outcome) {
    this.outcome = outcome;
  }
}

const fail = (reason: FailReason) => new Stop({ ok: false, reason });

export function holds(world: World, condition: Condition): boolean {
  const { cat } = world;
  const side = sideTurns[condition];
  if (side !== undefined)
    return isWalkable(tileAt(world, ahead(cat, turn(cat.dir, side))));
  const tile = tileChecks[condition];
  if (tile) return tileAt(world, ahead(cat, cat.dir)) === tile;
  if (condition === "bug") return bugAhead(world) !== null;
  return enemyComing(world);
}

// Turning, grabbing, zapping and building are free: only moving, jumping and waiting let the enemies step.
// The level is won as soon as the cat stands on the chest with every gem grabbed.
export function* runProgram(
  start: World,
  program: Block[],
): Generator<Step, Outcome> {
  if (program.length === 0) return { ok: false, reason: "empty" };
  let world = start;
  let steps = 0;

  const snap = (kind: StepKind, blockId: string, at?: Point): Step => ({
    kind,
    blockId,
    world,
    at,
  });

  function* checkWin(blockId: string) {
    if (!same(world.cat, world.goal) || world.gems.length > 0) return;
    yield snap("win", blockId);
    throw new Stop({ ok: true });
  }

  function* act(blockId: string, kind: StepKind, to: Point) {
    const from = world.cat;
    const moved = patrolAll(world);
    const caughtBy = catcher(world, moved, from, to);
    world = { ...world, cat: { ...from, ...to }, ...moved };
    yield snap(kind, blockId);
    if (caughtBy) {
      yield snap("caught", blockId, to);
      throw fail(caughtBy);
    }
  }

  function* caught(blockId: string, at: Point) {
    const enemy = enemyAt(world, at);
    if (!enemy) return;
    world = { ...world, cat: { ...world.cat, ...at } };
    yield snap("caught", blockId, at);
    throw fail(enemy);
  }

  function* enter(blockId: string, kind: StepKind, to: Point) {
    const tile = tileAt(world, to);
    const solid = solidReasons[tile];
    if (solid) {
      yield snap("bump", blockId, to);
      throw fail(solid);
    }
    yield* caught(blockId, to);
    if (tile === "~" || tile === "L") {
      world = { ...world, cat: { ...world.cat, ...to } };
      yield snap(tile === "~" ? "splash" : "burn", blockId, to);
      throw fail(tile === "~" ? "stream" : "lava");
    }
    yield* act(blockId, kind, to);
    yield* checkWin(blockId);
  }

  // The cat can jump over a stream, lava or spam, but never over a firewall, a gate or an enemy.
  function* jump(blockId: string) {
    const over = ahead(world.cat, world.cat.dir);
    const tile = tileAt(world, over);
    if (tile === "#" || tile === "D") {
      yield snap("bump", blockId, over);
      throw fail(solidReasons[tile] ?? "blocked");
    }
    yield* caught(blockId, over);
    yield* enter(blockId, "jump", ahead(over, world.cat.dir));
  }

  function* grab(blockId: string) {
    const key = cellKey(world.cat);
    if (world.gems.includes(key)) {
      world = { ...world, gems: world.gems.filter((gem) => gem !== key) };
      yield snap("grab", blockId, world.cat);
      yield* checkWin(blockId);
    } else if (world.keys.includes(key)) {
      world = {
        ...world,
        keys: world.keys.filter((item) => item !== key),
        keysHeld: world.keysHeld + 1,
      };
      yield snap("key", blockId, world.cat);
    } else yield snap("nothing", blockId);
  }

  function* changeTile(block: Block) {
    const action = tileActions[block.type];
    const front = ahead(world.cat, world.cat.dir);
    const locked = block.type === "open" && world.keysHeld === 0;
    if (!action || tileAt(world, front) !== action.from || locked) {
      yield snap("nothing", block.id);
      return;
    }
    world = setTile(world, front, action.to);
    if (block.type === "open")
      world = { ...world, keysHeld: world.keysHeld - 1 };
    yield snap(action.kind, block.id, front);
  }

  // Only a bug right in front can be zapped: viruses are too strong and must be dodged.
  function* zap(blockId: string) {
    const bug = bugAhead(world);
    if (!bug) {
      yield snap("nothing", blockId);
      return;
    }
    world = { ...world, bugs: world.bugs.filter((item) => item !== bug) };
    yield snap("zap", blockId, bug);
  }

  function* run(list: Block[]): Generator<Step, void> {
    for (const block of list) {
      if (++steps > maxSteps) throw fail("tooLong");
      const { cat } = world;
      const quarter = turns[block.type];
      if (quarter !== undefined) {
        world = { ...world, cat: { ...cat, dir: turn(cat.dir, quarter) } };
        yield snap("turn", block.id);
        continue;
      }
      switch (block.type) {
        case "forward":
          yield* enter(block.id, "move", ahead(cat, cat.dir));
          break;
        case "jump":
          yield* jump(block.id);
          break;
        case "grab":
          yield* grab(block.id);
          break;
        case "zap":
          yield* zap(block.id);
          break;
        case "bridge":
        case "smash":
        case "open":
          yield* changeTile(block);
          break;
        case "wait":
          yield* act(block.id, "wait", cat);
          break;
        case "repeat":
          for (let round = 0; round < (block.times ?? 0); round++)
            yield* run(block.children ?? []);
          break;
        case "until": {
          const children = block.children ?? [];
          for (let round = 0; !same(world.cat, world.goal); round++) {
            if (round >= maxLoops || children.length === 0)
              throw fail("tooLong");
            yield* run(children);
          }
          break;
        }
        default: {
          const yes = holds(world, block.condition ?? "path");
          yield snap("check", block.id);
          yield* run((yes ? block.children : block.alt) ?? []);
        }
      }
    }
  }

  try {
    yield* run(program);
  } catch (error) {
    if (error instanceof Stop) return error.outcome;
    throw error;
  }

  if (same(world.cat, world.goal)) return { ok: false, reason: "gemsMissing" };
  return { ok: false, reason: "notAtGoal" };
}

export function starsFor(used: number, optimal: number): 1 | 2 | 3 {
  if (used <= optimal) return 3;
  if (used <= optimal + 3) return 2;
  return 1;
}
