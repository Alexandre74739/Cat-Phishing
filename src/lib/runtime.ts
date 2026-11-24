import type { Block } from "./blocks";
import {
  ahead,
  cellKey,
  isWalkable,
  tileAt,
  turn,
  type Point,
  type Virus,
  type World,
} from "./levels";

export type StepKind =
  | "move"
  | "turn"
  | "grab"
  | "zap"
  | "nothing"
  | "wait"
  | "bump"
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
  | "bug"
  | "virus"
  | "gemsMissing"
  | "notAtGoal"
  | "tooLong";

export type Outcome = { ok: true } | { ok: false; reason: FailReason };

const maxSteps = 400;

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

function patrol(world: World, virus: Virus): Virus {
  for (const dir of [virus.dir, turn(virus.dir, 2)]) {
    const next = ahead(virus, dir);
    if (isWalkable(tileAt(world, next)) && !world.bugs.includes(cellKey(next)))
      return { ...virus, ...next, dir };
  }
  return virus;
}

class Stop {
  constructor(readonly outcome: Outcome) {}
}

// Viruses take one step each time the cat moves or waits; turning is free.
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

  function* act(blockId: string, kind: "move" | "wait", to: Point) {
    const from = world.cat;
    const viruses = world.viruses.map((virus) => patrol(world, virus));
    const caught = viruses.some(
      (virus, index) =>
        same(virus, to) ||
        (same(virus, from) && same(world.viruses[index], to)),
    );
    world = { ...world, cat: { ...from, ...to }, viruses };
    yield snap(kind, blockId);
    if (caught) {
      yield snap("caught", blockId, to);
      throw new Stop({ ok: false, reason: "virus" });
    }
  }

  const virusAhead = () => {
    const next = ahead(world.cat, world.cat.dir);
    return world.viruses.some(
      (virus) => same(virus, next) || same(patrol(world, virus), next),
    );
  };

  function* loop(block: Block, keepGoing: () => boolean) {
    const children = block.children ?? [];
    while (keepGoing()) {
      if (children.length === 0)
        throw new Stop({ ok: false, reason: "tooLong" });
      yield* run(children);
    }
  }

  function* run(list: Block[]): Generator<Step, void> {
    for (const block of list) {
      if (++steps > maxSteps) throw new Stop({ ok: false, reason: "tooLong" });
      const { cat } = world;
      switch (block.type) {
        case "forward": {
          const next = ahead(cat, cat.dir);
          if (!isWalkable(tileAt(world, next))) {
            yield snap("bump", block.id, next);
            throw new Stop({ ok: false, reason: "blocked" });
          }
          if (world.bugs.includes(cellKey(next))) {
            yield snap("bump", block.id, next);
            throw new Stop({ ok: false, reason: "bug" });
          }
          if (world.viruses.some((virus) => same(virus, next))) {
            world = { ...world, cat: { ...cat, ...next } };
            yield snap("caught", block.id, next);
            throw new Stop({ ok: false, reason: "virus" });
          }
          yield* act(block.id, "move", next);
          break;
        }
        case "left":
        case "right":
          world = {
            ...world,
            cat: { ...cat, dir: turn(cat.dir, block.type === "left" ? -1 : 1) },
          };
          yield snap("turn", block.id);
          break;
        case "grab": {
          const key = cellKey(cat);
          if (!world.gems.includes(key)) {
            yield snap("nothing", block.id);
            break;
          }
          world = { ...world, gems: world.gems.filter((gem) => gem !== key) };
          yield snap("grab", block.id, cat);
          break;
        }
        case "zap": {
          const next = ahead(cat, cat.dir);
          const key = cellKey(next);
          if (!world.bugs.includes(key)) {
            yield snap("nothing", block.id);
            break;
          }
          world = { ...world, bugs: world.bugs.filter((bug) => bug !== key) };
          yield snap("zap", block.id, next);
          break;
        }
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
          yield* loop(block, virusAhead);
          break;
        case "ifWall":
        case "ifGem":
        case "ifBug": {
          const front = ahead(cat, cat.dir);
          const yes =
            block.type === "ifWall"
              ? !isWalkable(tileAt(world, front))
              : block.type === "ifGem"
                ? world.gems.includes(cellKey(cat))
                : world.bugs.includes(cellKey(front));
          yield snap("check", block.id);
          if (yes) yield* run(block.children ?? []);
          break;
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
