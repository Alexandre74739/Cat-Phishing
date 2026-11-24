import type { ReactElement } from "react";

// Hats won with many stars or a badge, drawn in CatFace's 48 × 48 space.
export const trophyHatArt: Record<string, ReactElement> = {
  crown: (
    <>
      <path
        d="M12 13 L11 -2 L17.5 4 L24 -6 L30.5 4 L37 -2 L36 13 Q24 16 12 13 Z"
        className="fill-fur-gold"
        strokeWidth={2.5}
      />
      <circle cx={24} cy={7} r={2.5} className="fill-coral" strokeWidth={1.5} />
    </>
  ),
  helmet: (
    <>
      <path
        d="M2 19 Q2 1 24 1 Q46 1 46 19 Z"
        className="fill-rock"
        strokeWidth={2.5}
      />
      <path d="M2 19 H46" strokeWidth={2.5} />
      <path
        d="M21 1 Q18 -10 26 -15 Q25 -7 31 -6 Q31 0 27 1 Z"
        className="fill-coral"
        strokeWidth={2}
      />
    </>
  ),
  gradcap: (
    <>
      <rect
        x={14}
        y={2}
        width={20}
        height={10}
        rx={1}
        className="fill-fur-midnight"
        strokeWidth={2.5}
      />
      <path
        d="M1 1 L24 -8 L47 1 L24 10 Z"
        className="fill-fur-midnight"
        strokeWidth={2.5}
      />
      <path
        d="M24 1 L40 4 V14"
        fill="none"
        className="stroke-fur-gold"
        strokeWidth={2}
      />
    </>
  ),
};
