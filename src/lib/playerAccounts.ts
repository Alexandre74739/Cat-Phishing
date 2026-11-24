import { cleanAvatar, sanitizeData } from "./cloud";
import { cloudCall, localData, applyData, syncNow } from "./cloudSync";
import { totalStars } from "./courseProgress";
import {
  addPlayer,
  forgetPlayer,
  getActivePlayer,
  getPlayers,
  switchPlayer,
  updatePlayer,
  type CloudLink,
} from "./players";
import { outfitKey } from "./outfitStore";
import { getStars, starsKey } from "./progress";
import { seenPiecesKey } from "./treasureMap";

type Session = { token: string; pseudo: string; avatar: string; data: unknown };

const link = (session: Session): CloudLink => ({
  pseudo: session.pseudo,
  token: session.token,
  syncedAt: Date.now(),
});

export async function createAccount(pseudo: string, code: string[]) {
  const player = getActivePlayer();
  const session = await cloudCall<Session>({
    action: "create",
    pseudo,
    code,
    avatar: cleanAvatar(player.avatar),
    data: localData(),
  });
  updatePlayer(player.id, { name: session.pseudo, cloud: link(session) });
}

// A brand-new player is linked to the account; otherwise the account gets its own player, so two kids never mix.
export async function loginAccount(pseudo: string, code: string[]) {
  const session = await cloudCall<Session>({ action: "login", pseudo, code });
  const current = getActivePlayer();
  const isFresh = !current.cloud && totalStars(getStars()) === 0;
  const existing = getPlayers().find(
    (player) =>
      player.cloud?.pseudo.toLowerCase() === session.pseudo.toLowerCase(),
  );
  if (isFresh && !existing)
    updatePlayer(current.id, {
      name: session.pseudo,
      avatar: cleanAvatar(session.avatar),
      cloud: link(session),
    });
  else if (existing) {
    updatePlayer(existing.id, { cloud: link(session) });
    switchPlayer(existing.id);
  } else
    switchPlayer(
      addPlayer(session.pseudo, cleanAvatar(session.avatar), link(session)).id,
    );
  applyData(sanitizeData(session.data));
  void syncNow();
}

export async function logoutAccount(id: string) {
  const player = getPlayers().find((candidate) => candidate.id === id);
  if (!player?.cloud) return;
  updatePlayer(id, { cloud: undefined });
  await cloudCall({
    action: "logout",
    pseudo: player.cloud.pseudo,
    token: player.cloud.token,
  }).catch(() => undefined);
}

// With everywhere, the online account is deleted first (right to erasure); if that fails, nothing is removed.
export async function removePlayer(id: string, everywhere: boolean) {
  const player = getPlayers().find((candidate) => candidate.id === id);
  if (player?.cloud && everywhere)
    await cloudCall({
      action: "delete",
      pseudo: player.cloud.pseudo,
      token: player.cloud.token,
    });
  else await logoutAccount(id);
  forgetPlayer(id, [starsKey, seenPiecesKey, outfitKey]);
}
