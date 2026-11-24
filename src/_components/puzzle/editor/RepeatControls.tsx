import { Minus, Plus } from "lucide-react";
import { repeatRange } from "@/lib/blocks";

type RepeatControlsProps = {
  times: number;
  label: string;
  fewer: string;
  more: string;
  onChange?: (times: number) => void;
};

const step =
  "grid size-7 place-items-center rounded-full border-2 border-ink bg-paper disabled:opacity-40";

export function RepeatControls({
  times,
  label,
  fewer,
  more,
  onChange,
}: RepeatControlsProps) {
  return (
    <span className="flex items-center gap-1">
      {onChange && (
        <button
          type="button"
          aria-label={fewer}
          disabled={times <= repeatRange.min}
          onClick={() => onChange(times - 1)}
          className={step}
        >
          <Minus size={14} strokeWidth={3} aria-hidden="true" />
        </button>
      )}
      <span className="grid h-7 min-w-8 place-items-center rounded-full border-2 border-ink bg-paper px-2 font-bold">
        {times}
      </span>
      {onChange && (
        <button
          type="button"
          aria-label={more}
          disabled={times >= repeatRange.max}
          onClick={() => onChange(times + 1)}
          className={step}
        >
          <Plus size={14} strokeWidth={3} aria-hidden="true" />
        </button>
      )}
      <span>{label}</span>
    </span>
  );
}
