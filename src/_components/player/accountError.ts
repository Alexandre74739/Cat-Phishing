import { CloudError } from "@/lib/cloudSync";
import { fillText } from "@/lib/fillText";
import type { PlayerTexts } from "@/lib/playerTexts";

export function errorText(texts: PlayerTexts["account"], error: unknown) {
  if (!(error instanceof CloudError)) return texts.errors.server;
  const { left, retryIn } = error.info;
  if (error.code === "badCode" && left)
    return fillText(texts.codeLeft, { left });
  if (error.code === "locked")
    return fillText(texts.errors.locked, { minutes: retryIn ?? 15 });
  return texts.errors[error.code] ?? texts.errors.server;
}
