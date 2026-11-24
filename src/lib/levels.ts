export type Dir = 0 | 1 | 2 | 3;
export type Tile = "." | "#" | "~" | "=" | "L" | "R" | "D" | "O";
export type Point = { x: number; y: number };
export type Cat = Point & { dir: Dir };
export type Enemy = Point & { id: number; dir: Dir };

export type World = {
  width: number;
  height: number;
  tiles: Tile[][];
  goal: Point;
  cat: Cat;
  gems: string[];
  totalGems: number;
  keys: string[];
  keysHeld: number;
  bugs: Enemy[];
  viruses: Enemy[];
};

// Grid legend: "#" firewall, "." data lane, "S" cat, "C" treasure chest, "G" gem, "K" password key,
// "~" data stream, "L" lava, "R" spam rock, "D" locked gate,
// "X" / "Y" virus patrolling east-west / north-south, "B" / "b" bug patrolling east-west / north-south.
export type LevelMap = {
  grid: string[];
  startDir: Dir;
};

export const directions: Point[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

export const cellKey = ({ x, y }: Point) => `${x},${y}`;

const terrain: Partial<Record<string, Tile>> = {
  "#": "#",
  "~": "~",
  L: "L",
  R: "R",
  D: "D",
};

const patrols: Partial<Record<string, { list: "bugs" | "viruses"; dir: Dir }>> =
  {
    X: { list: "viruses", dir: 1 },
    Y: { list: "viruses", dir: 2 },
    B: { list: "bugs", dir: 1 },
    b: { list: "bugs", dir: 2 },
  };

export function buildWorld({ grid, startDir }: LevelMap): World {
  let cat: Cat = { x: 0, y: 0, dir: startDir };
  let goal: Point = { x: 0, y: 0 };
  const gems: string[] = [];
  const keys: string[] = [];
  const enemies: Record<"bugs" | "viruses", Enemy[]> = {
    bugs: [],
    viruses: [],
  };
  let nextId = 0;
  const tiles = grid.map((row, y) =>
    row.split("").map((cell, x): Tile => {
      if (cell === "S") cat = { x, y, dir: startDir };
      if (cell === "C") goal = { x, y };
      if (cell === "G") gems.push(cellKey({ x, y }));
      if (cell === "K") keys.push(cellKey({ x, y }));
      const patrol = patrols[cell];
      if (patrol)
        enemies[patrol.list].push({ id: nextId++, x, y, dir: patrol.dir });
      return terrain[cell] ?? ".";
    }),
  );

  return {
    width: grid[0].length,
    height: grid.length,
    tiles,
    goal,
    cat,
    gems,
    totalGems: gems.length,
    keys,
    keysHeld: 0,
    ...enemies,
  };
}

export const tileAt = (world: World, { x, y }: Point): Tile =>
  world.tiles[y]?.[x] ?? "#";

export const isWalkable = (tile: Tile) =>
  tile === "." || tile === "=" || tile === "O";

export const isSolid = (tile: Tile) =>
  tile === "#" || tile === "R" || tile === "D";

export const setTile = (world: World, at: Point, tile: Tile): World => ({
  ...world,
  tiles: world.tiles.map((row, y) =>
    y === at.y ? row.map((cell, x) => (x === at.x ? tile : cell)) : row,
  ),
});

export const ahead = (from: Point, dir: Dir): Point => ({
  x: from.x + directions[dir].x,
  y: from.y + directions[dir].y,
});

export const turn = (dir: Dir, quarter: number) =>
  ((dir + quarter + 4) % 4) as Dir;
