export type CatMood = "happy" | "think" | "sad" | "wow";

const mouths: Record<CatMood, string> = {
  happy: "M19 35 q5 4 10 0",
  think: "M20 36 h8",
  sad: "M19 37 q5 -4 10 0",
  wow: "M22 35 a2 2.5 0 1 0 4 0 a2 2.5 0 1 0 -4 0",
};

const pupilShift: Record<CatMood, number> = {
  happy: 0,
  think: 2,
  sad: 0,
  wow: 0,
};

type CatFaceProps = { mood?: CatMood; size?: number; className?: string };

export function CatFace({
  mood = "happy",
  size = 40,
  className,
}: CatFaceProps) {
  const shift = pupilShift[mood];

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 stroke-ink ${className ?? ""}`}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path
        d="M5 18 L9 3 L21 12 Z M43 18 L39 3 L27 12 Z"
        className="fill-fur"
        strokeWidth={2.5}
      />
      <path
        d="M9 9 L10 6 L15 10 Z M39 9 L38 6 L33 10 Z"
        className="fill-pink"
        strokeWidth={0}
      />
      <rect
        x={4}
        y={11}
        width={40}
        height={33}
        rx={5}
        className="fill-fur"
        strokeWidth={3}
      />
      <path
        d="M20 13 v5 M24 13 v6 M28 13 v5"
        className="stroke-fur-dark"
        strokeWidth={2.5}
      />
      <rect
        x={11}
        y={20}
        width={9}
        height={10}
        rx={2}
        className="fill-paper"
        strokeWidth={2}
      />
      <rect
        x={28}
        y={20}
        width={9}
        height={10}
        rx={2}
        className="fill-paper"
        strokeWidth={2}
      />
      <rect
        x={14.5 + shift}
        y={21.5}
        width={2.5}
        height={7}
        rx={1}
        className="fill-ink"
        strokeWidth={0}
      />
      <rect
        x={31.5 + shift}
        y={21.5}
        width={2.5}
        height={7}
        rx={1}
        className="fill-ink"
        strokeWidth={0}
      />
      <path d="M22 32 h4 l-2 2.5 Z" className="fill-pink" strokeWidth={1.5} />
      <path d={mouths[mood]} fill="none" strokeWidth={2.5} />
      <path d="M1 33 h8 M1 38 l8 -2 M47 33 h-8 M47 38 l-8 -2" strokeWidth={2} />
    </svg>
  );
}
