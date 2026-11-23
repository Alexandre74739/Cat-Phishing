import { Check } from "lucide-react";

type CheckListProps = {
  items: string[];
  className?: string;
};

export function CheckList({ items, className = "" }: CheckListProps) {
  return (
    <ul className={`font-ui font-semibold text-ink-soft ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink bg-grape text-paper">
            <Check size={14} strokeWidth={3.5} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
