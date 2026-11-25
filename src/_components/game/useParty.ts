"use client";

import { useState } from "react";
import { usePlayers } from "@/hooks/usePlayers";
import {
  createPartyPlayer,
  explode,
  maxPartyPlayers,
  passCatware,
  passTargets,
  speedVictory,
  startParty,
  survivors,
  winRace,
  type Party,
  type PartyPlayer,
} from "@/lib/party";
import { playSound } from "@/lib/sound";

export type Phase =
  | { kind: "draw" | "turn" | "race" | "breach" | "speed" }
  | { kind: "pass"; asker: string; blocked: string[]; sentTo?: string };

type Screen = "rules" | "setup" | "play";

export type Notice = { out: string[]; saved?: string; holder: string } | null;

export const eligibleTargets = (party: Party, phase: Phase) =>
  phase.kind === "pass"
    ? passTargets(party, [party.active, phase.asker, ...phase.blocked])
    : [];

export function selectableIds(party: Party, phase: Phase) {
  if (phase.kind === "race")
    return survivors(party)
      .map(({ id }) => id)
      .filter((id) => id !== party.active);
  if (phase.kind === "speed") return survivors(party).map(({ id }) => id);
  if (phase.kind === "pass" && !phase.sentTo)
    return eligibleTargets(party, phase).map(({ id }) => id);
  return [];
}

export function useParty() {
  const { players: devicePlayers } = usePlayers();
  const [screen, setScreenState] = useState<Screen>("rules");
  const [edited, setEdited] = useState<PartyPlayer[] | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [phase, setPhaseState] = useState<Phase>({ kind: "draw" });
  const [notice, setNotice] = useState<Notice>(null);
  const [round, setRound] = useState(0);

  const roster = (
    edited ??
    devicePlayers.map(({ id, name, avatar }) => ({ id, name, avatar }))
  ).slice(0, maxPartyPlayers);
  const inGame = Boolean(party && !party.victory);

  const setScreen = (next: Screen) => {
    setScreenState(next);
    window.scrollTo({ top: 0 });
  };

  const begin = (players: PartyPlayer[]) => {
    setParty(startParty(players));
    setPhase({ kind: "draw" });
    setRound(round + 1);
    setScreen("play");
  };

  const setPhase = (next: Phase) => {
    setNotice(null);
    setPhaseState(next);
  };

  const pickPlayer = (id: string) => {
    if (!party) return;
    playSound("pick");
    if (phase.kind === "speed") {
      setParty(speedVictory(party, id));
      playSound("win");
    } else if (phase.kind === "race") {
      const next = winRace(party, id);
      setParty(next);
      const canPass =
        id === party.holder && passTargets(next, [id, party.active]).length;
      setPhase(
        canPass
          ? { kind: "pass", asker: party.active, blocked: [] }
          : { kind: "turn" },
      );
    } else if (phase.kind === "pass") {
      setParty(passCatware(party, id));
      setPhase({ ...phase, sentTo: id });
      playSound("zap");
    }
  };

  const block = () => {
    if (!party || phase.kind !== "pass" || !phase.sentTo) return;
    setParty(passCatware(party, party.active));
    setPhase({
      ...phase,
      blocked: [...phase.blocked, phase.sentTo],
      sentTo: undefined,
    });
    playSound("smash");
  };

  const resolveBreach = (defused: boolean) => {
    if (!party) return;
    const next = explode(party, defused);
    setParty(next);
    setPhase({ kind: "turn" });
    setNotice({
      out: next.out.filter((id) => !party.out.includes(id)),
      saved: defused ? party.holder : undefined,
      holder: next.holder,
    });
    playSound(next.victory ? "win" : defused ? "badge" : "burn");
  };

  return {
    screen,
    roster,
    party,
    phase,
    notice,
    round,
    inGame,
    showRules: () => setScreen("rules"),
    closeRules: () => setScreen(inGame ? "play" : "setup"),
    showSetup: () => setScreen("setup"),
    addPlayer: (name: string) =>
      setEdited([...roster, createPartyPlayer(name, roster)]),
    removePlayer: (id: string) =>
      setEdited(roster.filter((player) => player.id !== id)),
    start: () => begin(roster),
    again: () => party && begin(party.players),
    setPhase,
    pickPlayer,
    block,
    resolveBreach,
  };
}

export type PartyState = ReturnType<typeof useParty>;
