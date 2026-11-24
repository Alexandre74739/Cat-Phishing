import type { Block, BlockType } from "@/lib/blocks";

export type EditorTexts = {
  paletteTitle: string;
  programTitle: string;
  start: string;
  emptyHint: string;
  dropHere: string;
  times: string;
  fewer: string;
  more: string;
  moveUp: string;
  moveDown: string;
  remove: string;
  clear: string;
  keyboardHelp: string;
  score: string;
  dropToDelete: string;
  blocks: Record<BlockType, string>;
};

export type DropTarget = {
  listId: string;
  index: number;
  top: number;
  left: number;
  width: number;
};

export type Gesture = {
  pointerId: number;
  block: Block;
  fromPalette: boolean;
  startX: number;
  startY: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  touch: boolean;
  armed: boolean;
  started: boolean;
  timer: number;
};

export type Dragging = Pick<
  Gesture,
  "block" | "x" | "y" | "offsetX" | "offsetY"
> & {
  lift: number;
};

export const touchLift = 34;
export const holdDelay = 160;
