"use client";

import { useState } from "react";
import { usePlayers } from "@/hooks/usePlayers";
import {
  createPartyPlayer,
  maxPartyPlayers,
  passCatware,
  startParty,
  type Party,
  type PartyPlayer,
} from "@/lib/party";
import { playSound } from "@/lib/sound";

export type Phase = { kind: "draw" | "give" } | { kind: "sent"; from: string };

type Screen = "rules" | "setup" | "play";

export const selectableIds = (party: Party, phase: Phase) =>
  phase.kind === "give"
    ? party.players.map(({ id }) => id).filter((id) => id !== party.holder)
    : [];

export function useParty() {
  const { players: devicePlayers } = usePlayers();
  const [screen, setScreenState] = useState<Screen>("rules");
  const [edited, setEdited] = useState<PartyPlayer[] | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: "draw" });
  const [round, setRound] = useState(0);

  const roster = (
    edited ??
    devicePlayers.map(({ id, name, avatar }) => ({ id, name, avatar }))
  ).slice(0, maxPartyPlayers);
  const inGame = Boolean(party);

  const setScreen = (next: Screen) => {
    setScreenState(next);
    window.scrollTo({ top: 0 });
  };

  const pickPlayer = (id: string) => {
    if (!party || phase.kind !== "give") return;
    setParty(passCatware(party, id));
    setPhase({ kind: "sent", from: party.holder });
    playSound("zap");
  };

  const block = () => {
    if (!party || phase.kind !== "sent") return;
    setParty(passCatware(party, phase.from));
    setPhase({ kind: "give" });
    playSound("smash");
  };

  return {
    screen,
    roster,
    party,
    phase,
    round,
    inGame,
    showRules: () => setScreen("rules"),
    closeRules: () => setScreen(inGame ? "play" : "setup"),
    showSetup: () => setScreen("setup"),
    addPlayer: (name: string) =>
      setEdited([...roster, createPartyPlayer(name, roster)]),
    removePlayer: (id: string) =>
      setEdited(roster.filter((player) => player.id !== id)),
    start: () => {
      setParty(startParty(roster));
      setPhase({ kind: "draw" });
      setRound(round + 1);
      setScreen("play");
    },
    give: () => setPhase({ kind: "give" }),
    pickPlayer,
    block,
  };
}

export type PartyState = ReturnType<typeof useParty>;
