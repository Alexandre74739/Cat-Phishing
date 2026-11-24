import { defaultAvatarId } from "./avatars";
import { createLocalStore, writeRaw } from "./localStore";

export type CloudLink = { pseudo: string; token: string; syncedAt?: number };

export type Player = {
  id: string;
  name: string;
  avatar: string;
  cloud?: CloudLink;
};

const mainPlayerId = "main";
const maxNameLength = 16;

export const defaultPlayer: Player = {
  id: mainPlayerId,
  name: "Player 1",
  avatar: defaultAvatarId,
};

const playersStore = createLocalStore<Player[]>(
  () => "cat-phishing:players",
  [],
);
const activeStore = createLocalStore<string>(
  () => "cat-phishing:active-player",
  mainPlayerId,
);

const fallbackList = [defaultPlayer];

export function getPlayers(): Player[] {
  const list = playersStore.get();
  return list.length ? list : fallbackList;
}

export const getServerPlayers = () => fallbackList;

export function getActivePlayer(): Player {
  const list = getPlayers();
  return list.find((player) => player.id === activeStore.get()) ?? list[0];
}

export const getServerActivePlayer = () => defaultPlayer;

// The first player keeps the original keys, so progress saved before players existed is not lost.
export const playerKey = (base: string, id = getActivePlayer().id) =>
  id === mainPlayerId ? base : `${base}:${id}`;

const cleanName = (name: string) =>
  name.trim().replace(/\s+/g, " ").slice(0, maxNameLength) ||
  defaultPlayer.name;

export function updatePlayer(id: string, patch: Partial<Omit<Player, "id">>) {
  const next = { ...patch, ...(patch.name && { name: cleanName(patch.name) }) };
  playersStore.set(
    getPlayers().map((player) =>
      player.id === id ? { ...player, ...next } : player,
    ),
  );
}

export function addPlayer(name: string, avatar: string, cloud?: CloudLink) {
  const player: Player = {
    id: Math.random().toString(36).slice(2, 10),
    name: cleanName(name),
    avatar,
    cloud,
  };
  playersStore.set([...getPlayers(), player]);
  return player;
}

export const switchPlayer = (id: string) => activeStore.set(id);

export function forgetPlayer(id: string, keys: string[]) {
  const rest = getPlayers().filter((player) => player.id !== id);
  keys.forEach((base) => writeRaw(playerKey(base, id), undefined));
  playersStore.set(rest);
  if (activeStore.get() === id || !rest.length)
    switchPlayer(rest[0]?.id ?? mainPlayerId);
}
