export type Dir = 0 | 1 | 2 | 3;
export type Tile = "." | "#";
export type Point = { x: number; y: number };
export type Cat = Point & { dir: Dir };
export type Virus = Point & { id: number; dir: Dir };

export type World = {
  width: number;
  height: number;
  tiles: Tile[][];
  goal: Point;
  cat: Cat;
  gems: string[];
  totalGems: number;
  bugs: string[];
  viruses: Virus[];
};

// Grid legend: "#" firewall, "." data lane, "S" cat, "C" treasure chest, "G" gem,
// "X" virus patrolling east-west, "Y" virus patrolling north-south, "B" bug (static, can be zapped).
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

export function buildWorld({ grid, startDir }: LevelMap): World {
  let cat: Cat = { x: 0, y: 0, dir: startDir };
  let goal: Point = { x: 0, y: 0 };
  const gems: string[] = [];
  const bugs: string[] = [];
  const viruses: Virus[] = [];
  const tiles = grid.map((row, y) =>
    row.split("").map((cell, x): Tile => {
      if (cell === "S") cat = { x, y, dir: startDir };
      if (cell === "C") goal = { x, y };
      if (cell === "G") gems.push(cellKey({ x, y }));
      if (cell === "B") bugs.push(cellKey({ x, y }));
      if (cell === "X" || cell === "Y")
        viruses.push({ id: viruses.length, x, y, dir: cell === "X" ? 1 : 2 });
      return cell === "#" ? "#" : ".";
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
    bugs,
    viruses,
  };
}

export const tileAt = (world: World, { x, y }: Point): Tile =>
  world.tiles[y]?.[x] ?? "#";

export const isWalkable = (tile: Tile) => tile === ".";

export const ahead = (from: Point, dir: Dir): Point => ({
  x: from.x + directions[dir].x,
  y: from.y + directions[dir].y,
});

export const turn = (dir: Dir, quarter: number) =>
  ((dir + quarter + 4) % 4) as Dir;
