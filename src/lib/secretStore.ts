import { createLocalStore } from "./localStore";
import { playerKey } from "./players";
import type { SecretBadgeId } from "./secretBadges";

// Secret badges come from actions, not from stars, so they are saved next to the stars.
export const secretsKey = "cat-phishing:secret-badges";

const secretsStore = createLocalStore<SecretBadgeId[]>(
  () => playerKey(secretsKey),
  [],
);

export const getSecrets = secretsStore.get;
export const getServerSecrets = secretsStore.getServer;
export const setSecrets = secretsStore.set;

export function unlockSecret(id: SecretBadgeId) {
  const current = getSecrets();
  if (current.includes(id)) return false;
  setSecrets([...current, id]);
  return true;
}
