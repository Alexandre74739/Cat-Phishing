import { GameCard } from "@/_components/game/cards/GameCard";
import type { CardId } from "@/lib/cards";

export function CardSpread({ cards }: { cards: CardId[] }) {
  const middle = (cards.length - 1) / 2;

  return (
    <span className="flex w-4/5 items-center justify-center">
      {cards.map((card, index) => {
        const offset = index - middle;
        return (
          <span
            key={card}
            style={{
              rotate: `${offset * 12}deg`,
              translate: `0 ${Math.abs(offset) * 14}px`,
            }}
            className={`-ml-8 max-w-44 flex-1 shadow-pop first:ml-0 ${offset === 0 ? "z-10" : ""}`}
          >
            <GameCard card={card} sizes="176px" />
          </span>
        );
      })}
    </span>
  );
}
