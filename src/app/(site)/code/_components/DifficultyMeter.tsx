export function DifficultyMeter({
  level,
  label,
}: {
  level: number;
  label: string;
}) {
  return (
    <p
      className="flex items-center gap-2"
      aria-label={`${label}, ${level} / 4`}
    >
      <span className="flex items-end gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`w-3 rounded-sm border-2 border-ink ${step <= level ? "bg-ink" : "bg-paper"}`}
            style={{ height: 8 + step * 3 }}
          />
        ))}
      </span>
      <span className="font-ui text-base font-bold">{label}</span>
    </p>
  );
}
