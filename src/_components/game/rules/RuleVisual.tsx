import {
  Cat,
  Eye,
  KeyRound,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";
import { CardBack } from "../cards/CardBack";
import type { ActionCardIcon, RuleVisual as RuleVisualData } from "../types";

const familyColors = [
  "bg-orange",
  "bg-mint",
  "bg-sky",
  "bg-pink",
  "bg-lilac",
  "bg-slime",
];

const actionLooks: Record<ActionCardIcon, { Icon: typeof Cat; color: string }> =
  {
    defuse: { Icon: ShieldCheck, color: "bg-mint" },
    cancel: { Icon: KeyRound, color: "bg-sky" },
    steal: { Icon: MousePointerClick, color: "bg-orange" },
    peek: { Icon: Eye, color: "bg-pink" },
  };

export function RuleVisual({ visual }: { visual: RuleVisualData }) {
  if (visual.kind === "families")
    return (
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {visual.names.map((name, index) => (
          <li
            key={name}
            className={`toon flex flex-col items-center gap-1 rounded-xl p-1.5 ${index % 2 ? "rotate-2" : "-rotate-2"} ${familyColors[index % familyColors.length]}`}
          >
            <Cat className="mt-1 size-7" strokeWidth={2.5} aria-hidden="true" />
            <span className="grid min-h-9 w-full place-items-center rounded-md bg-paper px-0.5 text-center font-ui text-xs leading-tight font-bold">
              {name}
            </span>
          </li>
        ))}
      </ul>
    );

  if (visual.kind === "actions")
    return (
      <ul className="grid grid-cols-2 gap-3">
        {visual.cards.map(({ icon, name, effect }) => {
          const { Icon, color } = actionLooks[icon];
          return (
            <li
              key={name}
              className="toon flex flex-col gap-2 rounded-2xl bg-paper p-3"
            >
              <span
                className={`grid size-11 place-items-center rounded-xl border-[3px] border-ink ${color}`}
              >
                <Icon size={22} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-ui text-lg leading-tight font-bold">
                {name}
              </span>
              <span className="text-sm font-semibold text-ink-soft">
                {effect}
              </span>
            </li>
          );
        })}
      </ul>
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
      <figcaption className="font-ui font-bold text-ink-soft">
        {visual.caption}
      </figcaption>
    </figure>
  );
}
