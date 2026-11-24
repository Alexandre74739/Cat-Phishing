import type { MapRewardTexts } from "@/_components/puzzle/map/MapReward";
import type { LockedCourseTexts } from "@/_components/puzzle/LockedCourse";
import type { WinTexts } from "@/_components/puzzle/WinDialog";
import type { WorldViewTexts } from "@/_components/puzzle/WorldView";
import type { EditorTexts } from "@/_components/puzzle/editor/types";
import type { FailReason } from "@/lib/runtime";

export type LevelTexts = {
  nav: {
    back: string;
    levels: string;
    level: string;
    locked: string;
    stars: string;
    badges: string;
  };
  story: { listen: string };
  locked: LockedCourseTexts;
  difficulty: string[];
  world: WorldViewTexts & { gems: string; keys: string };
  editor: EditorTexts;
  controls: {
    run: string;
    stop: string;
    reset: string;
    fast: string;
    normal: string;
  };
  messages: Record<FailReason | "running" | "win", string>;
  help: { retry: string; keepGoing: string; tip: string };
  win: WinTexts & {
    next: string;
    nextCourse: string;
    allDone: string;
    perfect: string;
    beatCatchat: string;
    improve: string;
    newBadge: string;
    map: MapRewardTexts;
  };
};
