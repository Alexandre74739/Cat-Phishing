import type { ReactElement } from "react";

const dome = (fill: string) => (
  <>
    <path d="M9 13 Q24 -3 39 13 Z" className={fill} strokeWidth={2.5} />
    <path d="M24 13 H45 Q44 9 38 9" className={fill} strokeWidth={2.5} />
  </>
);

// Everyday hats, drawn in CatFace's 48 × 48 space: the head starts at y = 11, the ears go up to y = 3.
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
  beanie: (
    <>
      <path
        d="M5 15 Q5 -5 24 -5 Q43 -5 43 15 Z"
        className="fill-sky"
        strokeWidth={2.5}
      />
      <rect
        x={4}
        y={10}
        width={40}
        height={7}
        rx={3}
        className="fill-sky"
        strokeWidth={2.5}
      />
      <circle cx={24} cy={-7} r={4} className="fill-paper" strokeWidth={2} />
    </>
  ),
  headphones: (
    <>
      <path d="M1 22 Q1 -8 24 -8 Q47 -8 47 22" fill="none" strokeWidth={3.5} />
      <rect
        x={-3}
        y={16}
        width={8}
        height={13}
        rx={3}
        className="fill-coral"
        strokeWidth={2.5}
      />
      <rect
        x={43}
        y={16}
        width={8}
        height={13}
        rx={3}
        className="fill-coral"
        strokeWidth={2.5}
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
};
