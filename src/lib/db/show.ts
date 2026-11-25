import "server-only";
import { randomBytes } from "node:crypto";
import { cleanPseudo, pseudoKey } from "../cloud";
import { cleanShowState, type ShowPhase, type ShowState } from "../hackShow";
import { accounts, hashToken, hasValidToken } from "./accounts";
import { database } from "./mongo";

type ShowDocument = ShowState & { _id: "show" };

const showCollection = async () =>
  (await database()).collection<ShowDocument>("show");

export async function readShow(): Promise<ShowState> {
  const show = await (await showCollection()).findOne({ _id: "show" });
  return cleanShowState(show);
}

export async function writeShow(phase: ShowPhase): Promise<ShowState> {
  const current = await readShow();
  if (phase === "talk" && current.phase === "off") return current;
  const now = Date.now();
  const next: ShowState =
    phase === "hack"
      ? { phase, runId: randomBytes(8).toString("hex"), hackAt: now, talkAt: 0 }
      : phase === "talk"
        ? { ...current, phase, talkAt: now }
        : { ...current, phase };
  await (
    await showCollection()
  ).replaceOne({ _id: "show" }, next, { upsert: true });
  return next;
}

// Only the account named in ADMIN_PSEUDO, with a valid session token, drives the show.
export async function isShowAdmin(pseudo: unknown, token: unknown) {
  const admin = process.env.ADMIN_PSEUDO?.trim();
  const clean = cleanPseudo(pseudo);
  if (!admin || !clean || pseudoKey(clean) !== pseudoKey(admin)) return false;
  const account = await (await accounts()).findOne({ _id: pseudoKey(clean) });
  return !!account && hasValidToken(account, hashToken(token));
}
