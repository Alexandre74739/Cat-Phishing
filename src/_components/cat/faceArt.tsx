import type { ReactElement } from "react";

const eyes = [15.5, 32.5];

// Drawn in CatFace's 48 × 48 space: the eyes are centered at y = 25.
export const faceArt: Record<string, ReactElement> = {
  mustache: (
    <path
      d="M24 33 Q18 28 11 33 Q18 37 24 34.5 Q30 37 37 33 Q30 28 24 33 Z"
      className="fill-ink"
      strokeWidth={1}
    />
  ),
  monocle: (
    <g fill="none" className="stroke-fur-gold">
      <circle cx={32.5} cy={25} r={6.5} strokeWidth={2.5} />
      <path d="M37 30 Q40 37 36 44" strokeWidth={1.5} />
    </g>
  ),
  pixel: (
    <g strokeWidth={0}>
      <rect x={6} y={20} width={36} height={3} className="fill-ink" />
      <rect x={9} y={23} width={13} height={6} className="fill-ink" />
      <rect x={26} y={23} width={13} height={6} className="fill-ink" />
      <rect x={11} y={24} width={2} height={2} className="fill-paper" />
      <rect x={28} y={24} width={2} height={2} className="fill-paper" />
    </g>
  ),
  glasses: (
    <g fill="none" strokeWidth={2}>
      {eyes.map((x) => (
        <circle key={x} cx={x} cy={25} r={6.5} />
      ))}
      <path d="M22 24 H26" />
    </g>
  ),
  shades: (
    <g strokeWidth={1.5}>
      {eyes.map((x) => (
        <rect
          key={x}
          x={x - 6}
          y={20}
          width={12}
          height={9}
          rx={3}
          className="fill-ink"
        />
      ))}
      <path d="M21.5 23 H26.5" strokeWidth={2} />
    </g>
  ),
  visor: (
    <rect
      x={6}
      y={19}
      width={36}
      height={12}
      rx={4}
      className="fill-gem opacity-80"
      strokeWidth={2}
    />
  ),
  mask: (
    <path
      d="M5 18 H43 V32 H5 Z M11 20 V30 H20 V20 Z M28 20 V30 H37 V20 Z"
      fillRule="evenodd"
      className="fill-grape"
      strokeWidth={2}
    />
  ),
};
