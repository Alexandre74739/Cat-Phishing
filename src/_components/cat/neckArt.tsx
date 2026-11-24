import type { ReactElement } from "react";

// Drawn in CatFace's 48 × 48 space: the head ends at y = 44.
export const neckArt: Record<string, ReactElement> = {
  bell: (
    <>
      <rect
        x={4}
        y={39}
        width={40}
        height={5}
        rx={2}
        className="fill-coral"
        strokeWidth={2}
      />
      <circle
        cx={24}
        cy={46}
        r={3.5}
        className="fill-fur-gold"
        strokeWidth={2}
      />
    </>
  ),
  bowtie: (
    <>
      <path
        d="M24 42 L15 37 V47 Z M24 42 L33 37 V47 Z"
        className="fill-sky"
        strokeWidth={2}
      />
      <circle cx={24} cy={42} r={2.5} className="fill-sky" strokeWidth={2} />
    </>
  ),
  scarf: (
    <>
      <rect
        x={29}
        y={41}
        width={7}
        height={11}
        rx={2}
        className="fill-mint"
        strokeWidth={2}
      />
      <rect
        x={3}
        y={38}
        width={42}
        height={7}
        rx={3}
        className="fill-mint"
        strokeWidth={2}
      />
    </>
  ),
  lanyard: (
    <>
      <path
        d="M13 37 L22 44 M35 37 L26 44"
        fill="none"
        className="stroke-sky"
        strokeWidth={2.5}
      />
      <rect
        x={18}
        y={42}
        width={12}
        height={10}
        rx={1.5}
        className="fill-paper"
        strokeWidth={2}
      />
      <rect
        x={18}
        y={42}
        width={12}
        height={3}
        className="fill-sky"
        strokeWidth={0}
      />
    </>
  ),
  chain: (
    <>
      <path
        d="M6 39 Q24 48 42 39"
        fill="none"
        className="stroke-fur-gold"
        strokeWidth={3}
      />
      <circle
        cx={24}
        cy={46}
        r={3.5}
        className="fill-fur-gold"
        strokeWidth={2}
      />
    </>
  ),
};
