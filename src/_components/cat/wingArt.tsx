import type { ReactElement } from "react";

// Flying gear, drawn behind the head like the other back items.
export const wingArt: Record<string, ReactElement> = {
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
  batwings: (
    <>
      <path
        d="M8 22 L-12 8 L-9 20 L-15 26 L-5 27 L-3 34 L8 30 Z"
        className="fill-fur-midnight"
        strokeWidth={2.5}
      />
      <path
        d="M40 22 L60 8 L57 20 L63 26 L53 27 L51 34 L40 30 Z"
        className="fill-fur-midnight"
        strokeWidth={2.5}
      />
    </>
  ),
};
