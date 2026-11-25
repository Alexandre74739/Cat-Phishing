import { CardBack } from "../cards/CardBack";
import { GameCard } from "../cards/GameCard";
import type { RuleVisual as RuleVisualData } from "../types";

function Caption({ text }: { text: string }) {
  return (
    <figcaption className="font-ui font-bold text-ink-soft">{text}</figcaption>
  );
}

export function RuleVisual({ visual }: { visual: RuleVisualData }) {
  if (visual.kind === "families")
    return (
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {visual.cards.map(({ card, name }, index) => (
          <li
            key={card}
            className={`flex flex-col items-center gap-1 ${index % 2 ? "rotate-2" : "-rotate-2"}`}
          >
            <GameCard card={card} sizes="96px" className="shadow-pop" />
            <span className="text-center font-ui text-xs leading-tight font-bold">
              {name}
            </span>
          </li>
        ))}
      </ul>
    );

  if (visual.kind === "actions")
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {visual.cards.map(({ card, name, effect }) => (
          <li
            key={card}
            className="toon flex items-center gap-3 rounded-2xl bg-paper p-2"
          >
            <GameCard card={card} sizes="64px" className="w-16 shrink-0" />
            <span className="flex flex-col gap-1">
              <span className="font-ui text-lg leading-tight font-bold">
                {name}
              </span>
              <span className="text-sm font-semibold text-ink-soft">
                {effect}
              </span>
            </span>
          </li>
        ))}
      </ul>
    );

  if (visual.kind === "card")
    return (
      <figure className="flex flex-col items-center gap-3">
        <GameCard
          card={visual.card}
          sizes="112px"
          className="w-28 -rotate-3 shadow-pop"
        />
        <Caption text={visual.caption} />
      </figure>
    );

  return (
    <figure className="flex flex-col items-center gap-3">
      <div aria-hidden="true" className="relative h-32 w-36">
        {[-12, 0, 12].map((rotate) => (
          <span
            key={rotate}
            style={{ rotate: `${rotate}deg` }}
            className="absolute left-1/2 h-32 w-[5.3rem] -translate-x-1/2 overflow-hidden rounded-xl border-[3px] border-ink shadow-pop"
          >
            <CardBack />
          </span>
        ))}
      </div>
      <Caption text={visual.caption} />
    </figure>
  );
}
