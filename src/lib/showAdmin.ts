import { cleanShowState, type ShowPhase, type ShowState } from "./hackShow";
import type { CloudLink } from "./players";

export type ShowStatus = "loading" | "ready" | "locked" | "error";

export async function postShow(
  cloud: CloudLink,
  phase?: ShowPhase,
): Promise<{ status: ShowStatus; state?: ShowState }> {
  try {
    const response = await fetch("/api/show", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pseudo: cloud.pseudo, token: cloud.token, phase }),
    });
    if (response.status === 403) return { status: "locked" };
    if (!response.ok) return { status: "error" };
    const body = (await response.json()) as { state?: unknown };
    return { status: "ready", state: cleanShowState(body.state) };
  } catch {
    return { status: "error" };
  }
}
