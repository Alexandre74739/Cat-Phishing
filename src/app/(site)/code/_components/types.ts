import type { LockedCourseTexts } from "@/_components/puzzle/LockedCourse";
import type { EditorTexts } from "@/_components/puzzle/editor/types";

export type HubTexts = {
  difficulty: string[];
  level: string;
  levels: string;
  stars: string;
  info: string;
  newBlocks: string;
  start: string;
  continue: string;
  replay: string;
  startHere: string;
  preview: string;
  locked: LockedCourseTexts;
  blocks: EditorTexts["blocks"];
};

export type TreasureTexts = {
  title: string;
  text: string;
  complete: string;
  open: string;
  map: string;
  pieces: string;
  stars: string;
  courses: string;
  done: string;
  newPiece: string;
  found: string;
  play: string;
};
