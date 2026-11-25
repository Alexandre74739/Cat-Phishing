import { fillText } from "@/lib/fillText";

type PlayersNeededProps = { have: number; need: number; text: string };

export function PlayersNeeded({ have, need, text }: PlayersNeededProps) {
  return (
    <p
      aria-live="polite"
      className="flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full border-[3px] border-dashed border-ink bg-paper px-4 font-ui text-lg font-semibold"
    >
      <span className="flex gap-1" aria-hidden="true">
        {Array.from({ length: need }, (_, index) => (
          <span
            key={index}
            className={`size-3 rounded-full border-2 border-ink ${index < have ? "bg-orange" : "bg-paper"}`}
          />
        ))}
      </span>
      {fillText(text, { count: need - have })}
    </p>
  );
}
