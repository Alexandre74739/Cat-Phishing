import type { FailReason } from "@/lib/runtime";
import type { LevelTexts } from "./types";

export function helpLine(
  reason: FailReason,
  fails: number,
  tip: string,
  help: LevelTexts["help"],
) {
  if (reason === "empty" || fails <= 1) return help.retry;
  if (fails === 3) return help.keepGoing;
  return help.tip.replace("{tip}", tip);
}
