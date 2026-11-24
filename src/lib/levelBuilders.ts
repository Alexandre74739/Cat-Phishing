import { createBlock, type Block, type BlockType } from "./blocks";

export const f = () => createBlock("forward");
export const l = () => createBlock("left");
export const r = () => createBlock("right");
export const g = () => createBlock("grab");
export const w = () => createBlock("wait");
export const fs = (count: number) => Array.from({ length: count }, f);
export const rep = (times: number, children: Block[]) =>
  createBlock("repeat", children, times);
export const until = (children: Block[]) => createBlock("until", children);
export const ifWall = (children: Block[]) => createBlock("ifWall", children);
export const ifGem = (children: Block[]) => createBlock("ifGem", children);
export const whileVirus = (children: Block[]) =>
  createBlock("whileVirus", children);

export const move: BlockType[] = ["forward", "left", "right"];
export const loops: BlockType[] = [...move, "repeat"];
export const untilLoops: BlockType[] = [...loops, "until"];
export const collecting: BlockType[] = [...move, "grab", "repeat", "until"];
export const smart: BlockType[] = [...collecting, "ifGem", "ifWall"];
export const patrol: BlockType[] = [...move, "wait", "repeat"];
export const antivirus: BlockType[] = [
  ...patrol,
  "until",
  "whileVirus",
  "ifWall",
];
export const zap = () => createBlock("zap");
export const ifBug = (children: Block[]) => createBlock("ifBug", children);
export const bridge = () => createBlock("bridge");
export const smash = () => createBlock("smash");
export const open = () => createBlock("open");
export const jump = () => createBlock("jump");
export const ifStream = (children: Block[]) =>
  createBlock("ifStream", children);
export const ifSpam = (children: Block[]) => createBlock("ifSpam", children);
export const ifGate = (children: Block[]) => createBlock("ifGate", children);
export const ifLava = (children: Block[]) => createBlock("ifLava", children);
