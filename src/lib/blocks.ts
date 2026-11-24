export type BlockType =
  | "forward"
  | "left"
  | "right"
  | "grab"
  | "zap"
  | "wait"
  | "repeat"
  | "until"
  | "ifWall"
  | "ifGem"
  | "ifBug"
  | "whileVirus"
  | "bridge"
  | "smash"
  | "open"
  | "jump"
  | "ifStream"
  | "ifSpam"
  | "ifGate"
  | "ifLava";

export type Block = {
  id: string;
  type: BlockType;
  times?: number;
  children?: Block[];
};

export const containerTypes: BlockType[] = [
  "repeat",
  "until",
  "ifWall",
  "ifGem",
  "ifBug",
  "whileVirus",
  "ifStream",
  "ifSpam",
  "ifGate",
  "ifLava",
];

export const isContainer = (type: BlockType) => containerTypes.includes(type);

export const rootList = "root";
export const repeatRange = { min: 2, max: 9 };

let nextId = 0;

export function createBlock(
  type: BlockType,
  children?: Block[],
  times = 3,
): Block {
  const id = `${type}-${nextId++}`;
  if (!isContainer(type)) return { id, type };
  const block: Block = { id, type, children: children ?? [] };
  return type === "repeat" ? { ...block, times } : block;
}

export const countBlocks = (list: Block[]): number =>
  list.reduce(
    (total, block) => total + 1 + countBlocks(block.children ?? []),
    0,
  );

export function findBlock(list: Block[], id: string): Block | null {
  for (const block of list) {
    if (block.id === id) return block;
    const inner = findBlock(block.children ?? [], id);
    if (inner) return inner;
  }
  return null;
}

const mapLists = (
  list: Block[],
  listId: string,
  edit: (items: Block[]) => Block[],
): Block[] => {
  if (listId === rootList) return edit(list);
  return list.map((block) => {
    if (!block.children) return block;
    if (block.id === listId)
      return { ...block, children: edit(block.children) };
    return { ...block, children: mapLists(block.children, listId, edit) };
  });
};

export const insertBlock = (
  list: Block[],
  listId: string,
  index: number,
  block: Block,
): Block[] =>
  mapLists(list, listId, (items) => [
    ...items.slice(0, index),
    block,
    ...items.slice(index),
  ]);

export const removeBlock = (list: Block[], id: string): Block[] =>
  list
    .filter((block) => block.id !== id)
    .map((block) =>
      block.children
        ? { ...block, children: removeBlock(block.children, id) }
        : block,
    );

export function moveBlock(list: Block[], id: string, delta: -1 | 1): Block[] {
  const index = list.findIndex((block) => block.id === id);
  if (index >= 0) {
    const target = index + delta;
    if (target < 0 || target >= list.length) return list;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  }
  return list.map((block) =>
    block.children
      ? { ...block, children: moveBlock(block.children, id, delta) }
      : block,
  );
}

export const setTimes = (list: Block[], id: string, times: number): Block[] =>
  list.map((block) => {
    if (block.id === id)
      return {
        ...block,
        times: Math.min(repeatRange.max, Math.max(repeatRange.min, times)),
      };
    return block.children
      ? { ...block, children: setTimes(block.children, id, times) }
      : block;
  });
