import type { ReactElement } from "react";

// Drawn behind the head, so only what sticks out on the sides shows.
export const backArt: Record<string, ReactElement> = {
  backpack: (
    <>
      <rect
        x={-4}
        y={20}
        width={12}
        height={20}
        rx={3}
        className="fill-sky"
        strokeWidth={2.5}
      />
      <rect
        x={40}
        y={20}
        width={12}
        height={20}
        rx={3}
        className="fill-sky"
        strokeWidth={2.5}
      />
    </>
  ),
  cape: (
    <path d="M6 16 H42 L54 50 H-6 Z" className="fill-coral" strokeWidth={2.5} />
  ),
  wings: (
    <>
      <path
        d="M8 24 Q-14 0 -10 28 Q-2 34 8 30 Z"
        className="fill-lilac"
        strokeWidth={2.5}
      />
      <path
        d="M40 24 Q62 0 58 28 Q50 34 40 30 Z"
        className="fill-lilac"
        strokeWidth={2.5}
      />
      <path
        d="M8 32 Q-8 36 -4 46 Q4 46 8 38 Z"
        className="fill-pink"
        strokeWidth={2.5}
      />
      <path
        d="M40 32 Q56 36 52 46 Q44 46 40 38 Z"
        className="fill-pink"
        strokeWidth={2.5}
      />
    </>
  ),
  jetpack: (
    <>
      {[-4, 42].map((x) => (
        <g key={x}>
          <path
            d={`M${x + 2} 40 L${x + 5} 49 L${x + 8} 40 Z`}
            className="fill-orange"
            strokeWidth={2}
          />
          <rect
            x={x}
            y={18}
            width={10}
            height={23}
            rx={4}
            className="fill-rock"
            strokeWidth={2.5}
          />
        </g>
      ))}
    </>
  ),
};
