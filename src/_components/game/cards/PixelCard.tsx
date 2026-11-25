import type { ReactNode } from "react";

const frame =
  "M125 70H1200V148H1265V1855H1200V1930H113V1855H50V138H125Z M288 133V188H241V270H161V323H115V1665H167V1718H241V1800H288V1855H1027V1800H1073V1718H1147V1665H1200V323H1153V270H1073V188H1027V133Z";

const corners = [
  [133, 148],
  [1115, 148],
  [133, 1773],
  [1115, 1773],
];

type PixelCardProps = { children?: ReactNode; className?: string };

export function PixelCard({ children, className = "" }: PixelCardProps) {
  return (
    <div className={`relative h-full w-full bg-card-back ${className}`}>
      <svg
        viewBox="0 0 1316 2000"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
      >
        <path d={frame} fillRule="evenodd" className="fill-card-line" />
        {corners.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="67"
            height="67"
            className="fill-card-back"
          />
        ))}
      </svg>
      <div className="absolute inset-[12%] flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
