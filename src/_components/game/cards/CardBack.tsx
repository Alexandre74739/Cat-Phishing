import { PixelCard } from "./PixelCard";

const paw = [
  "M489 720H589V775H634V933H600V960H486V911H445V775H489Z",
  "M726 720H826V775H870V911H829V960H715V933H681V775H726Z",
  "M352 900H412V950H453V1087H416V1134H318V1094H277V950H352Z",
  "M903 900H963V950H1038V1094H997V1134H899V1087H862V950H903Z",
  "M570 995H745V1041H781V1086H821V1124H855V1168H892V1306H853V1358H715V1307H600V1358H462V1306H422V1168H460V1124H494V1086H533V1041H570Z",
];

export function CardBack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <PixelCard />
      <svg
        viewBox="0 0 1316 2000"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
      >
        {paw.map((d) => (
          <path key={d} d={d} className="fill-card-line" />
        ))}
      </svg>
    </div>
  );
}
