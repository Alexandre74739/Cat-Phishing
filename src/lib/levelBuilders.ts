import {
  createBlock,
  type Block,
  type BlockType,
  type Condition,
} from "./blocks";

export const f = () => createBlock("forward");
export const l = () => createBlock("left");
export const r = () => createBlock("right");
export const t = () => createBlock("turnAround");
export const g = () => createBlock("grab");
export const w = () => createBlock("wait");
export const jump = () => createBlock("jump");
export const smash = () => createBlock("smash");
export const bridge = () => createBlock("bridge");
export const open = () => createBlock("open");
export const zap = () => createBlock("zap");
export const rep = (times: number, children: Block[]) =>
  createBlock("repeat", children, { times });
export const until = (children: Block[]) => createBlock("until", children);
export const when = (condition: Condition, children: Block[]) =>
  createBlock("if", children, { condition });
export const ifElse = (condition: Condition, yes: Block[], no: Block[]) =>
  createBlock("ifElse", yes, { condition, alt: no });

// Each course hands over every block learned so far, so picking the right one is part of the puzzle.
const move: BlockType[] = ["forward", "left", "right", "turnAround"];

export const basicsPalette: BlockType[] = [
  "forward",
  "left",
  "right",
  "grab",
  "smash",
  "bridge",
  "repeat",
  "if",
];

export const keysPalette: BlockType[] = [
  ...move,
  "grab",
  "smash",
  "bridge",
  "open",
  "repeat",
];

export const gatesPalette: BlockType[] = [...keysPalette, "if"];

export const lavaPalette: BlockType[] = [
  ...move,
  "grab",
  "smash",
  "bridge",
  "jump",
  "repeat",
  "until",
  "if",
];

export const enemyPalette: BlockType[] = [
  ...move,
  "grab",
  "open",
  "jump",
  "wait",
  "zap",
  "repeat",
  "until",
  "if",
  "ifElse",
];

export const fullPalette: BlockType[] = [
  ...move,
  "grab",
  "smash",
  "bridge",
  "open",
  "jump",
  "repeat",
  "until",
  "if",
  "ifElse",
];
