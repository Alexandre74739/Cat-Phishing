import { Check, Star } from "lucide-react";

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
            className="fill-sun"
            aria-hidden="true"
          />
          {stars} / {maxStars}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={maxStars}
        aria-valuenow={stars}
        aria-label={`${stars} / ${maxStars} ${texts.stars}`}
        className="mt-1.5 h-4 overflow-hidden rounded-full border-[3px] border-ink bg-cream"
      >
        <div
          className="h-full bg-sun motion-safe:transition-[width] motion-safe:duration-700"
          style={{ width: `${(stars / maxStars) * 100}%` }}
        />
      </div>
    </div>
  );
}
