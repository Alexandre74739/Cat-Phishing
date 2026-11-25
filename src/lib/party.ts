import { avatars } from "./avatars";

export type PartyPlayer = { id: string; name: string; avatar: string };

export type Victory = { kind: "speed" | "survival" | "none"; winner?: string };

export type Party = {
  players: PartyPlayer[];
  out: string[];
  holder: string;
  active: string;
  victory?: Victory;
};

export const minPartyPlayers = 3;
export const maxPartyPlayers = 6;
export const maxPartyNameLength = 16;

const animalAvatars = avatars.filter(({ category }) => category === "animals");

const pickOne = <T>(list: T[], random: () => number) =>
  list[Math.min(list.length - 1, Math.floor(random() * list.length))];

export function createPartyPlayer(
  name: string,
  taken: PartyPlayer[],
  random = Math.random,
): PartyPlayer {
  const used = new Set(taken.map(({ avatar }) => avatar));
  const free = animalAvatars.filter(({ id }) => !used.has(id));
  return {
    id: random().toString(36).slice(2, 10),
    name: name.trim().replace(/\s+/g, " ").slice(0, maxPartyNameLength),
    avatar: pickOne(free.length ? free : animalAvatars, random).id,
  };
}

export const startParty = (
  players: PartyPlayer[],
  random = Math.random,
): Party => ({
  players,
  out: [],
  holder: pickOne(players, random).id,
  active: pickOne(players, random).id,
});

export const findPartyPlayer = (party: Party, id: string) =>
  party.players.find((player) => player.id === id) ?? party.players[0];

export const survivors = (party: Party) =>
  party.players.filter(({ id }) => !party.out.includes(id));

// Seats are stored clockwise, so the next seat is the player on the left.
export function nextSurvivor(party: Party, fromId: string) {
  const count = party.players.length;
  const start = party.players.findIndex(({ id }) => id === fromId);
  for (let step = 1; step <= count; step++) {
    const { id } = party.players[(start + step) % count];
    if (!party.out.includes(id)) return id;
  }
  return fromId;
}

export const passTargets = (party: Party, excluded: string[]) =>
  survivors(party).filter(({ id }) => !excluded.includes(id));

export const winRace = (party: Party, winner: string): Party => ({
  ...party,
  active: winner,
});

export const passCatware = (party: Party, to: string): Party => ({
  ...party,
  holder: to,
});

// The asker is out anyway, so a holder who is also the asker cannot be saved by a Furr-wall.
export function explode(
  party: Party,
  defused: boolean,
  random = Math.random,
): Party {
  const blasted =
    defused || party.holder === party.active ? [] : [party.holder];
  const next = { ...party, out: [...party.out, party.active, ...blasted] };
  const alive = survivors(next);
  if (alive.length === 1)
    return { ...next, victory: { kind: "survival", winner: alive[0].id } };
  if (!alive.length) return { ...next, victory: { kind: "none" } };
  return {
    ...next,
    holder: pickOne(alive, random).id,
    active: nextSurvivor(next, party.active),
  };
}

export const speedVictory = (party: Party, winner: string): Party => ({
  ...party,
  victory: { kind: "speed", winner },
});
