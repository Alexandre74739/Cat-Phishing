import { Star } from "lucide-react";
import { ProgressBar } from "@/_components/ui/ProgressBar";

type StarGoalProps = {
  label: string;
  have: number;
  need: number;
};

export function StarGoal({ label, have, need }: StarGoalProps) {
  return (
    <div className="mt-5">
      <p className="flex items-center justify-between gap-3 font-ui text-base font-bold">
        <span>{label}</span>
        <span className="flex items-center gap-1">
          <Star
            size={18}
            strokeWidth={2.5}
            className="fill-orange"
            aria-hidden="true"
          />
          {have} / {need}
        </span>
      </p>
      <ProgressBar
        value={have}
        max={need}
        label={`${label}: ${have} / ${need}`}
      />
    </div>
  );
}
