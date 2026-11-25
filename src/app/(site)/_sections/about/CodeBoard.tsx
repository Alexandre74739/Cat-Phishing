import { CatFace } from "@/_components/cat/CatFace";
import {
  blockLooks,
  type BlockLookKind,
} from "@/_components/puzzle/block/blockLooks";
import { ChestIcon } from "@/_components/puzzle/world2d/ChestIcon";

const program: BlockLookKind[] = [
  "start",
  "forward",
  "forward",
  "right",
  "forward",
  "forward",
];

const path = new Set(["0,2", "0,1", "0,0", "1,0", "2,0"]);

export function CodeBoard() {
  return (
    <span className="flex w-full items-center justify-center gap-4 p-6">
      <span className="flex w-1/4 flex-col gap-1.5">
        {program.map((kind, index) => {
          const { Icon, color } = blockLooks[kind];
          return (
            <span
              key={index}
              className={`grid h-9 place-items-center rounded-lg border-[3px] border-ink text-ink ${color} ${index ? "ml-3" : "rounded-t-2xl"}`}
            >
              <Icon size={18} strokeWidth={3} />
            </span>
          );
        })}
      </span>
      <span className="grid aspect-square w-3/5 grid-cols-3 grid-rows-3 overflow-hidden rounded-xl border-[3px] border-ink shadow-[0_6px_0_0_var(--color-island),0_6px_0_3px_var(--color-ink)]">
        {Array.from({ length: 9 }, (_, cell) => {
          const spot = `${cell % 3},${Math.floor(cell / 3)}`;
          return (
            <span
              key={spot}
              className={`grid place-items-center ${path.has(spot) ? (cell % 2 ? "bg-lane-alt" : "bg-lane") : "bg-block-dark"}`}
            >
              {spot === "0,2" && <CatFace className="size-4/5" />}
              {spot === "2,0" && <ChestIcon open={false} />}
            </span>
          );
        })}
      </span>
    </span>
  );
}
