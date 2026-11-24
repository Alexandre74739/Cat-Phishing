import type { ReactElement } from "react";

// Party and costume hats, drawn in CatFace's 48 × 48 space.
export const fancyHatArt: Record<string, ReactElement> = {
  party: (
    <>
      <path
        d="M17 12 L24 -14 L31 12 Z"
        className="fill-pink"
        strokeWidth={2.5}
      />
      <circle cx={22} cy={4} r={1.6} className="fill-sky" strokeWidth={0} />
      <circle cx={26} cy={-3} r={1.6} className="fill-sky" strokeWidth={0} />
      <circle
        cx={24}
        cy={-15}
        r={3}
        className="fill-fur-gold"
        strokeWidth={2}
      />
    </>
  ),
  wizard: (
    <>
      <ellipse
        cx={24}
        cy={11}
        rx={20}
        ry={4}
        className="fill-grape"
        strokeWidth={2.5}
      />
      <path
        d="M13 10 L27 -16 L35 10 Z"
        className="fill-grape"
        strokeWidth={2.5}
      />
      <path
        d="M25 -1 l1.5 3 l3 0.5 l-2.3 2 l0.6 3 l-2.8 -1.5 l-2.8 1.5 l0.6 -3 l-2.3 -2 l3 -0.5 Z"
        className="fill-fur-gold"
        strokeWidth={1}
      />
    </>
  ),
  tophat: (
    <>
      <ellipse
        cx={24}
        cy={11}
        rx={18}
        ry={4}
        className="fill-fur-midnight"
        strokeWidth={2.5}
      />
      <rect
        x={14}
        y={-12}
        width={20}
        height={23}
        rx={2}
        className="fill-fur-midnight"
        strokeWidth={2.5}
      />
      <rect
        x={14}
        y={4}
        width={20}
        height={4}
        className="fill-coral"
        strokeWidth={2}
      />
    </>
  ),
};
