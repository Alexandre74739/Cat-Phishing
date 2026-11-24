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
  bow: (
    <>
      <path d="M24 8 L8 -2 L6 14 Z" className="fill-pink" strokeWidth={2.5} />
      <path d="M24 8 L40 -2 L42 14 Z" className="fill-pink" strokeWidth={2.5} />
    </>
  ),
  shield: (
    <>
      <circle cx={45} cy={30} r={12} className="fill-sky" strokeWidth={2.5} />
      <circle cx={47} cy={30} r={5} className="fill-mint" strokeWidth={2} />
    </>
  ),
};
