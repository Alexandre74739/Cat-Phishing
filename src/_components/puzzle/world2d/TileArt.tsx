import { Flame, Lock, LockOpen, MailWarning, Waves } from "lucide-react";
import type { Tile } from "@/lib/levels";

const icon = "size-3/5";
const inset = "absolute inset-[14%] grid place-items-center";
const raised = `${inset} rounded-[18%] border-[3px] border-ink shadow-[3px_4px_0_color-mix(in_srgb,var(--color-ink)_35%,transparent)]`;

export function TileArt({ tile, odd }: { tile: Tile; odd: boolean }) {
  if (tile === "#")
    return (
      <span className={`${raised} ${odd ? "bg-block" : "bg-block-alt"}`}>
        <span className="absolute inset-x-[18%] top-[26%] h-[12%] rounded-full bg-ink/80" />
        <span className="absolute inset-x-[18%] top-[50%] h-[12%] rounded-full bg-ink/80" />
      </span>
    );
  if (tile === "~")
    return <Waves className={`${icon} text-stream-soft`} strokeWidth={2.5} />;
  if (tile === "=")
    return (
      <span className="absolute inset-x-[4%] inset-y-[22%] rounded-md border-[3px] border-ink bg-wood" />
    );
  if (tile === "L")
    return (
      <Flame
        className={`${icon} fill-sun text-sun motion-safe:animate-pulse`}
        strokeWidth={2.5}
      />
    );
  if (tile === "R")
    return (
      <span className={`${raised} rotate-6 bg-rock text-ink`}>
        <MailWarning className={icon} strokeWidth={2.5} />
      </span>
    );
  if (tile === "D")
    return (
      <span className={`${raised} rounded-t-[40%] bg-coral text-ink`}>
        <Lock className={icon} strokeWidth={2.75} />
      </span>
    );
  if (tile === "O")
    return <LockOpen className={`${icon} text-ink/40`} strokeWidth={2.75} />;
  return null;
}
