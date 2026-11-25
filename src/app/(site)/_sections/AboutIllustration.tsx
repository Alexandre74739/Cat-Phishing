import type { CardId } from "@/lib/cards";
import { CardSpread } from "./about/CardSpread";
import { CodeBoard } from "./about/CodeBoard";

type Illustration = { back: string; middle: string; cards?: CardId[] };

const illustrations = {
  play: {
    back: "bg-orange",
    middle: "bg-grape",
    cards: ["meownymous", "cat-ware", "script-kitty"],
  },
  safe: {
    back: "bg-mint",
    middle: "bg-lilac",
    cards: ["paws-word", "furr-wall"],
  },
  code: { back: "bg-mint", middle: "bg-orange" },
} satisfies Record<string, Illustration>;

export type AboutIllustrationName = keyof typeof illustrations;

const corners = [
  "top-4 left-4",
  "top-4 right-4",
  "bottom-4 left-4",
  "bottom-4 right-4",
];

export function AboutIllustration({ name }: { name: AboutIllustrationName }) {
  const { back, middle, cards }: Illustration = illustrations[name];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-md p-6"
    >
      <div className={`toon absolute inset-6 rotate-6 rounded-3xl ${back}`} />
      <div
        className={`toon absolute inset-6 -rotate-3 rounded-3xl ${middle}`}
      />
      <div className="toon relative grid size-full place-items-center overflow-hidden rounded-3xl bg-card-back">
        <span className="absolute inset-3 rounded-2xl border-4 border-card-line/60" />
        {corners.map((spot) => (
          <span key={spot} className={`absolute size-3 bg-card-line ${spot}`} />
        ))}
        {cards ? <CardSpread cards={cards} /> : <CodeBoard />}
      </div>
    </div>
  );
}
