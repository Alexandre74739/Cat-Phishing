import { Cat, type LucideIcon } from "lucide-react";

// Temporary placeholder: the final card designs will replace this component.
export const cardColors = [
  "bg-coral",
  "bg-sun",
  "bg-mint",
  "bg-sky",
  "bg-pink",
  "bg-lilac",
];

type CardArtProps = {
  name: string;
  color: string;
  Icon?: LucideIcon;
  className?: string;
};

export function CardArt({
  name,
  color,
  Icon = Cat,
  className = "",
}: CardArtProps) {
  return (
    <div
      className={`toon flex aspect-5/7 flex-col rounded-2xl p-1.5 text-ink ${color} ${className}`}
    >
      <div className="flex flex-1 flex-col rounded-xl border-2 border-ink bg-paper p-1.5">
        <span className="font-display text-[0.6rem] leading-none tracking-wide sm:text-xs">
          {name.charAt(0)}
        </span>
        <span className="grid flex-1 place-items-center">
          <span
            className={`grid aspect-square w-1/2 place-items-center rounded-full border-2 border-ink ${color}`}
          >
            <Icon className="size-1/2" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </span>
      </div>
      <span className="mt-1 truncate text-center font-display text-[0.65rem] tracking-wide sm:text-sm">
        {name}
      </span>
    </div>
  );
}
