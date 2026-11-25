import { avatars } from "./avatars";

export type PartyPlayer = { id: string; name: string; avatar: string };

export type Party = {
  players: PartyPlayer[];
  holder: string;
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
  holder: pickOne(players, random).id,
});

export const findPartyPlayer = (party: Party, id: string) =>
  party.players.find((player) => player.id === id) ?? party.players[0];

export const passCatware = (party: Party, to: string): Party => ({
  ...party,
  holder: to,
});
