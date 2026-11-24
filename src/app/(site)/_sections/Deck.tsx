import { DeckTile } from "./deck/DeckTile";
import type { DeckTileContent } from "./deck/types";

type DeckProps = {
  id: string;
  title: string;
  intro: string;
  tiles: DeckTileContent[];
};

export function Deck({ id, title, intro, tiles }: DeckProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2
            id={`${id}-title`}
            className="font-display text-3xl leading-tight tracking-wide sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold text-ink">
            {intro}
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {tiles.map((tile, index) => (
            <DeckTile key={tile.title} tile={tile} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
