import type { ReactElement } from "react";

const dome = (fill: string) => (
  <>
    <path d="M9 13 Q24 -3 39 13 Z" className={fill} strokeWidth={2.5} />
    <path d="M24 13 H45 Q44 9 38 9" className={fill} strokeWidth={2.5} />
  </>
);

// Drawn in CatFace's 48 × 48 space: the head starts at y = 11, the ears go up to y = 3.
export const hatArt: Record<string, ReactElement> = {
  cap: dome("fill-mint"),
  propeller: (
    <>
      {dome("fill-coral")}
      <path d="M24 6 V-3" strokeWidth={2.5} />
      <ellipse
        cx={18}
        cy={-4}
        rx={6}
        ry={2}
        className="fill-sky"
        strokeWidth={2}
      />
      <ellipse
        cx={30}
        cy={-4}
        rx={6}
        ry={2}
        className="fill-orange"
        strokeWidth={2}
      />
    </>
  ),
  antenna: (
    <>
      <path d="M24 12 V-3" strokeWidth={3} />
      <circle cx={24} cy={-5} r={3.5} className="fill-gem" strokeWidth={2} />
      <path
        d="M17 -9 Q24 -15 31 -9 M13 -12 Q24 -21 35 -12"
        fill="none"
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
};
