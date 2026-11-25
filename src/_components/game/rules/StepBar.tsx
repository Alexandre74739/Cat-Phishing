import { fillText } from "@/lib/fillText";

type StepBarProps = {
  titles: string[];
  current: number;
  label: string;
  onPick: (index: number) => void;
};

export function StepBar({ titles, current, label, onPick }: StepBarProps) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <ol className="flex flex-1 gap-1.5">
        {titles.map((title, index) => (
          <li key={title} className="flex-1">
            <button
              type="button"
              onClick={() => onPick(index)}
              aria-current={index === current ? "step" : undefined}
              aria-label={`${fillText(label, { current: index + 1, total: titles.length })}: ${title}`}
              className="flex h-8 w-full items-center rounded-full"
            >
              <span
                className={`h-3 w-full rounded-full border-2 border-ink motion-safe:transition-colors ${index <= current ? "bg-orange" : "bg-paper"} ${index === current ? "h-4" : ""}`}
              />
            </button>
          </li>
        ))}
      </ol>
      <span className="shrink-0 rounded-full border-2 border-ink bg-paper px-3 font-ui font-bold">
        {current + 1}/{titles.length}
      </span>
    </div>
  );
}
