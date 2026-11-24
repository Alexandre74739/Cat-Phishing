import type { WinTexts } from "@/_components/puzzle/WinDialog";
import type { WorldViewTexts } from "@/_components/puzzle/WorldView";
import type { DemoState } from "./useDemo";

export type DemoTexts = {
  world: WorldViewTexts;
  program: {
    title: string;
    clear: string;
    start: string;
    forward: string;
    add: string;
    run: string;
  };
  messages: Record<DemoState | "empty", string>;
  win: WinTexts & { next: { label: string; href: string } };
};
