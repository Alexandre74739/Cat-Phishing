import type { Block, BlockType } from "./blocks";
import {
  bugsInRange,
  catcher,
  enemyAt,
  patrolAll,
  virusComing,
} from "./enemies";
import {
  ahead,
  cellKey,
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

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

const solidReasons: Partial<Record<Tile, FailReason>> = {
  "#": "blocked",
  R: "spam",
  D: "locked",
};

const tileChecks: Partial<Record<BlockType, Tile>> = {
  ifWall: "#",
  ifStream: "~",
  ifSpam: "R",
  ifGate: "D",
  ifLava: "L",
};

const tileActions: Partial<
  Record<BlockType, { from: Tile; to: Tile; kind: StepKind }>
> = {
  bridge: { from: "~", to: "=", kind: "bridge" },
  smash: { from: "R", to: ".", kind: "smash" },
  open: { from: "D", to: "O", kind: "open" },
};

class Stop {
  constructor(readonly outcome: Outcome) {}
}

const fail = (reason: FailReason) => new Stop({ ok: false, reason });

// Turning, grabbing, zapping and building are free: only moving, jumping and waiting let the enemies step.
// The program must end on the chest with every gem grabbed.
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

  function* fall(blockId: string, at: Point, tile: "~" | "L") {
    world = { ...world, cat: { ...world.cat, ...at } };
    yield snap(tile === "~" ? "splash" : "burn", blockId, at);
    throw fail(tile === "~" ? "stream" : "lava");
  }

  function* enter(blockId: string, kind: StepKind, to: Point) {
    const tile = tileAt(world, to);
    const solid = solidReasons[tile];
    if (solid) {
      yield snap("bump", blockId, to);
      throw fail(solid);
    }
    const enemy = enemyAt(world, to);
    if (enemy) {
      world = { ...world, cat: { ...world.cat, ...to } };
      yield snap("caught", blockId, to);
      throw fail(enemy);
    }
    if (tile === "~" || tile === "L") yield* fall(blockId, to, tile);
    yield* act(blockId, kind, to);
  }

  function* jump(blockId: string) {
    const over = ahead(world.cat, world.cat.dir);
    const tile = tileAt(world, over);
    const solid = solidReasons[tile];
    if (solid) {
      yield snap("bump", blockId, over);
      throw fail(solid);
    }
    if (tile === "~") yield* fall(blockId, over, tile);
    const enemy = enemyAt(world, over);
    if (enemy) {
      world = { ...world, cat: { ...world.cat, ...over } };
      yield snap("caught", blockId, over);
      throw fail(enemy);
    }
    yield* enter(blockId, "jump", ahead(over, world.cat.dir));
  }

  function* grab(blockId: string) {
    const key = cellKey(world.cat);
    if (world.gems.includes(key)) {
      world = { ...world, gems: world.gems.filter((gem) => gem !== key) };
      yield snap("grab", blockId, world.cat);
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

  function* zap(blockId: string) {
    const zapped = bugsInRange(world);
    if (zapped.length === 0) {
      yield snap("nothing", blockId);
      return;
    }
    world = {
      ...world,
      bugs: world.bugs.filter((bug) => !zapped.includes(bug)),
    };
    yield snap("zap", blockId, zapped[0]);
  }

  function* loop(block: Block, keepGoing: () => boolean) {
    const children = block.children ?? [];
    while (keepGoing()) {
      if (children.length === 0) throw fail("tooLong");
      yield* run(children);
    }
  }

  const holds = (type: BlockType) => {
    const front = ahead(world.cat, world.cat.dir);
    const tile = tileChecks[type];
    if (tile) return tileAt(world, front) === tile;
    if (type === "ifGem") return world.gems.includes(cellKey(world.cat));
    return bugsInRange(world).length > 0;
  };

  function* run(list: Block[]): Generator<Step, void> {
    for (const block of list) {
      if (++steps > maxSteps) throw fail("tooLong");
      const { cat } = world;
      switch (block.type) {
        case "forward":
          yield* enter(block.id, "move", ahead(cat, cat.dir));
          break;
        case "jump":
          yield* jump(block.id);
          break;
        case "left":
        case "right":
          world = {
            ...world,
            cat: { ...cat, dir: turn(cat.dir, block.type === "left" ? -1 : 1) },
          };
          yield snap("turn", block.id);
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
        case "until":
          yield* loop(block, () => !same(world.cat, world.goal));
          break;
        case "whileVirus":
          yield* loop(block, () => virusComing(world));
          break;
        default: {
          const yes = holds(block.type);
          yield snap("check", block.id);
          if (yes) yield* run(block.children ?? []);
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

  if (!same(world.cat, world.goal)) return { ok: false, reason: "notAtGoal" };
  if (world.gems.length > 0) return { ok: false, reason: "gemsMissing" };
  yield snap("win", program[program.length - 1].id);
  return { ok: true };
}

export function starsFor(used: number, optimal: number): 1 | 2 | 3 {
  if (used <= optimal) return 3;
  if (used <= optimal + 3) return 2;
  return 1;
}
