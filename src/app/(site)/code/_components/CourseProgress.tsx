import { Check, Star } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

type CourseProgressProps = {
  done: number;
  total: number;
  stars: number;
  maxStars: number;
  texts: { levels: string; stars: string };
};

export function CourseProgress({
  done,
  total,
  stars,
  maxStars,
  texts,
}: CourseProgressProps) {
  return (
    <div className="mt-auto">
      <div className="flex items-center justify-between font-ui text-sm font-bold">
        <span className="flex items-center gap-1">
          {done === total && (
            <Check size={16} strokeWidth={3.5} aria-hidden="true" />
          )}
          {done} / {total} {texts.levels}
        </span>
        <span className="flex items-center gap-1">
          <Star
            size={16}
            strokeWidth={2.5}
            className="fill-orange"
            aria-hidden="true"
          />
          {stars} / {maxStars}
        </span>
      </div>
      <ProgressBar
        value={stars}
        max={maxStars}
        label={`${stars} / ${maxStars} ${texts.stars}`}
      />
    </div>
  );
}
