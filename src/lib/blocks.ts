export type BlockType =
  | "forward"
  | "left"
  | "right"
  | "turnAround"
  | "jump"
  | "wait"
  | "grab"
  | "smash"
  | "bridge"
  | "open"
  | "zap"
  | "repeat"
  | "until"
  | "if"
  | "ifElse";

export type Condition =
  | "path"
  | "pathRight"
  | "pathLeft"
  | "stream"
  | "spam"
  | "lava"
  | "gate"
  | "enemy"
  | "bug";

export const conditions: Condition[] = [
  "path",
  "pathRight",
  "pathLeft",
  "stream",
  "spam",
  "lava",
  "gate",
  "enemy",
  "bug",
];

export type Block = {
  id: string;
  type: BlockType;
  times?: number;
  condition?: Condition;
  children?: Block[];
  alt?: Block[];
};

export const containerTypes: BlockType[] = ["repeat", "until", "if", "ifElse"];

export const isContainer = (type: BlockType) => containerTypes.includes(type);

export const rootList = "root";
export const elseList = (id: string) => `${id}:else`;
export const repeatRange = { min: 1, max: 20 };

const defaultConditions: Partial<Record<BlockType, Condition>> = {
  if: "stream",
  ifElse: "path",
};

export const defaultCondition = (type: BlockType) => defaultConditions[type];

let nextId = 0;

export function createBlock(
  type: BlockType,
  children?: Block[],
  options: { times?: number; condition?: Condition; alt?: Block[] } = {},
): Block {
  const id = `${type}-${nextId++}`;
  if (!isContainer(type)) return { id, type };
  const block: Block = { id, type, children: children ?? [] };
  if (type === "repeat") return { ...block, times: options.times ?? 3 };
  if (type === "until") return block;
  const condition = options.condition ?? defaultCondition(type);
  if (type === "if") return { ...block, condition };
  return { ...block, condition, alt: options.alt ?? [] };
}

export const countBlocks = (list: Block[]): number =>
  list.reduce(
    (total, block) =>
      total +
      1 +
      countBlocks(block.children ?? []) +
      countBlocks(block.alt ?? []),
    0,
  );

export function findBlock(list: Block[], id: string): Block | null {
  for (const block of list) {
    if (block.id === id) return block;
    const inner =
      findBlock(block.children ?? [], id) ?? findBlock(block.alt ?? [], id);
    if (inner) return inner;
  }
  return null;
}

const mapInner = (block: Block, edit: (list: Block[]) => Block[]): Block => ({
  ...block,
  ...(block.children ? { children: edit(block.children) } : {}),
  ...(block.alt ? { alt: edit(block.alt) } : {}),
});

const mapLists = (
  list: Block[],
  listId: string,
  edit: (items: Block[]) => Block[],
): Block[] => {
  if (listId === rootList) return edit(list);
  return list.map((block) => {
    if (block.id === listId && block.children)
      return { ...block, children: edit(block.children) };
    if (elseList(block.id) === listId && block.alt)
      return { ...block, alt: edit(block.alt) };
    return mapInner(block, (inner) => mapLists(inner, listId, edit));
  });
};

const mapBlock = (
  list: Block[],
  id: string,
  edit: (block: Block) => Block,
): Block[] =>
  list.map((block) =>
    block.id === id
      ? edit(block)
      : mapInner(block, (inner) => mapBlock(inner, id, edit)),
  );

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
    .map((block) => mapInner(block, (inner) => removeBlock(inner, id)));

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
    mapInner(block, (inner) => moveBlock(inner, id, delta)),
  );
}

export const setTimes = (list: Block[], id: string, times: number): Block[] =>
  mapBlock(list, id, (block) => ({
    ...block,
    times: Math.min(repeatRange.max, Math.max(repeatRange.min, times)),
  }));

export const setCondition = (
  list: Block[],
  id: string,
  condition: Condition,
): Block[] => mapBlock(list, id, (block) => ({ ...block, condition }));
