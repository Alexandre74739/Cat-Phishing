type ProgressBarProps = {
  value: number;
  max: number;
  label: string;
};

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      className="mt-1.5 h-4 overflow-hidden rounded-full border-[3px] border-ink bg-cream"
    >
      <div
        className="h-full bg-orange motion-safe:transition-[width] motion-safe:duration-700"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}
