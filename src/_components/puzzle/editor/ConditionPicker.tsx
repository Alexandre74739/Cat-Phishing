import { ChevronDown } from "lucide-react";
import { conditions, type Condition } from "@/lib/blocks";

type ConditionPickerProps = {
  value: Condition;
  label: string;
  names: Record<Condition, string>;
  onChange?: (condition: Condition) => void;
};

const pill = "h-8 rounded-full border-2 border-ink bg-paper font-bold text-ink";

export function ConditionPicker({
  value,
  label,
  names,
  onChange,
}: ConditionPickerProps) {
  if (!onChange)
    return (
      <span className={`${pill} grid place-items-center px-3`}>
        {names[value]}
      </span>
    );

  return (
    <span className="relative inline-flex">
      <select
        aria-label={label}
        value={value}
        onPointerDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        onChange={(event) => onChange(event.target.value as Condition)}
        className={`${pill} cursor-pointer appearance-none pr-8 pl-3 outline-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-grape`}
      >
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {names[condition]}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={3}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
      />
    </span>
  );
}
