import {
  Bomb,
  Check,
  Layers,
  Megaphone,
  Siren,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { RuleSlide, SlideIcon } from "../types";
import { RuleVisual } from "./RuleVisual";

const looks: Record<SlideIcon, { Icon: typeof Bomb; color: string }> = {
  setup: { Icon: Layers, color: "bg-orange" },
  call: { Icon: Megaphone, color: "bg-sky" },
  catware: { Icon: Bomb, color: "bg-mint" },
  breach: { Icon: Siren, color: "bg-coral" },
  cards: { Icon: Sparkles, color: "bg-lilac" },
  win: { Icon: Trophy, color: "bg-orange" },
};

export function RuleSlideView({ slide }: { slide: RuleSlide }) {
  const { Icon, color } = looks[slide.icon];

  return (
    <article className="flex flex-col gap-5">
      <header className="flex items-center gap-4">
        <span
          className={`toon grid size-16 shrink-0 -rotate-6 place-items-center rounded-2xl ${color}`}
        >
          <Icon size={32} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span>
          <span className="block font-ui text-sm font-bold tracking-wider text-ink-soft uppercase">
            {slide.eyebrow}
          </span>
          <h2 className="font-display text-3xl leading-tight tracking-wide">
            {slide.title}
          </h2>
        </span>
      </header>
      {slide.visual && <RuleVisual visual={slide.visual} />}
      <ul className="flex flex-col gap-3">
        {slide.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 text-lg font-semibold"
          >
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-mint">
              <Check size={16} strokeWidth={3.5} aria-hidden="true" />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
