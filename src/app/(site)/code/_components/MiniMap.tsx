import type { Level } from "@/lib/courses";
import { buildWorld, cellKey } from "@/lib/levels";

const items = {
  cat: "rounded-[22%] bg-fur ring-[length:clamp(1px,0.18em,3px)] ring-ink inset-[18%]",
  chest:
    "rounded-[18%] bg-wood inset-x-[16%] inset-y-[26%] ring-[length:clamp(1px,0.18em,3px)] ring-ink",
  gem: "rotate-45 rounded-[15%] bg-gem inset-[30%] ring-[length:clamp(1px,0.15em,2px)] ring-ink",
  bug: "rounded-[30%] bg-slime inset-[20%] ring-[length:clamp(1px,0.18em,3px)] ring-ink",
  virus:
    "rounded-[22%] bg-coral inset-[20%] ring-[length:clamp(1px,0.18em,3px)] ring-ink",
};

export function MiniMap({ level, label }: { level: Level; label: string }) {
  const world = buildWorld(level);
  const viruses = new Set(world.viruses.map(cellKey));
  const size = `min(${92 / world.width}cqw, ${80 / world.height}cqh)`;

  const itemAt = (x: number, y: number) => {
    const key = cellKey({ x, y });
    if (world.cat.x === x && world.cat.y === y) return items.cat;
    if (world.goal.x === x && world.goal.y === y) return items.chest;
    if (viruses.has(key)) return items.virus;
    if (world.bugs.includes(key)) return items.bug;
    if (world.gems.includes(key)) return items.gem;
    return null;
  };

  return (
    <div
      role="img"
      aria-label={label}
      className="grid size-full place-items-center p-3 pb-6"
      style={{ containerType: "size" }}
    >
      <div
        className="grid overflow-hidden rounded-lg border-[3px] border-ink bg-block-dark shadow-[0_6px_0_0_var(--color-island),0_6px_0_3px_var(--color-ink)]"
        style={{
          gridTemplateColumns: `repeat(${world.width}, ${size})`,
          fontSize: size,
        }}
      >
        {world.tiles.flatMap((row, y) =>
          row.map((tile, x) => {
            const item = itemAt(x, y);
            return (
              <span
                key={`${x},${y}`}
                className={`relative ${tile === "#" ? "bg-block-dark" : (x + y) % 2 ? "bg-lane-alt" : "bg-lane"}`}
                style={{ width: size, height: size }}
              >
                {tile === "#" && (
                  <span className="absolute inset-[12%] rounded-[22%] border-[length:clamp(1px,0.16em,3px)] border-ink bg-block-alt" />
                )}
                {item && <span className={`absolute ${item}`} />}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}
