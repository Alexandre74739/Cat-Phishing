// Shared by the browser and the API route: no Node or browser import here.
export const showPhases = ["off", "hack", "talk"] as const;

export type ShowPhase = (typeof showPhases)[number];

export type ShowState = {
  phase: ShowPhase;
  runId: string;
  hackAt: number;
  talkAt: number;
};

export type ShowSignal = ShowState & { offset: number };

export type HackStage =
  "idle" | "glitch" | "cut" | "matrix" | "terminal" | "talk";

export const showPollMs = 2000;

const hackTimeline: [HackStage, number][] = [
  ["glitch", 7000],
  ["cut", 500],
  ["matrix", 10000],
];
const introMs = hackTimeline.reduce(
  (total, [, duration]) => total + duration,
  0,
);
const terminalMinMs = 6000;

export const offState: ShowState = {
  phase: "off",
  runId: "",
  hackAt: 0,
  talkAt: 0,
};

export const isShowPhase = (value: unknown): value is ShowPhase =>
  showPhases.includes(value as ShowPhase);

export function cleanShowState(raw: unknown): ShowState {
  if (!raw || typeof raw !== "object") return offState;
  const { phase, runId, hackAt, talkAt } = raw as Record<string, unknown>;
  if (!isShowPhase(phase) || typeof runId !== "string") return offState;
  return {
    phase,
    runId,
    hackAt: typeof hackAt === "number" ? hackAt : 0,
    talkAt: typeof talkAt === "number" ? talkAt : 0,
  };
}

export function hackStageAt(
  signal: ShowSignal | null,
  now: number,
): { stage: HackStage; msLeft: number | null } {
  if (!signal || signal.phase === "off") return { stage: "idle", msLeft: null };
  const elapsed = now + signal.offset - signal.hackAt;
  let left = elapsed;
  for (const [stage, duration] of hackTimeline) {
    if (left < duration) return { stage, msLeft: duration - left };
    left -= duration;
  }
  if (signal.phase === "hack") return { stage: "terminal", msLeft: null };
  const talkFrom = Math.max(
    signal.talkAt - signal.hackAt,
    introMs + terminalMinMs,
  );
  return elapsed < talkFrom
    ? { stage: "terminal", msLeft: talkFrom - elapsed }
    : { stage: "talk", msLeft: null };
}

export async function fetchShow(): Promise<ShowSignal | null> {
  try {
    const response = await fetch("/api/show");
    if (!response.ok) return null;
    const body = (await response.json()) as { state?: unknown; now?: unknown };
    const offset = typeof body.now === "number" ? body.now - Date.now() : 0;
    return { ...cleanShowState(body.state), offset };
  } catch {
    return null;
  }
}

export const sameShow = (a: ShowState | null, b: ShowState) =>
  !!a && a.phase === b.phase && a.runId === b.runId && a.talkAt === b.talkAt;
