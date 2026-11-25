import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party } from "@/lib/party";
import type { PartyTexts } from "../types";
import { eligibleTargets, type PartyState } from "../useParty";
import { BreachPanel } from "./BreachPanel";
import { Panel } from "./Panel";
import { PassPanel } from "./PassPanel";
import { TurnPanel } from "./TurnPanel";

type PhasePanelProps = {
  texts: PartyTexts;
  game: PartyState;
  party: Party;
  drawn: boolean;
};

export function PhasePanel({ texts, game, party, drawn }: PhasePanelProps) {
  const { phase } = game;
  const name = (id: string) => findPartyPlayer(party, id).name;
  const turn = () => game.setPhase({ kind: "turn" });

  if (phase.kind === "draw")
    return drawn ? (
      <Panel
        title={fillText(texts.draw.holder, { name: name(party.holder) })}
        text={fillText(texts.draw.active, { name: name(party.active) })}
      >
        <Button variant="orange" icon="play" fullWidth onClick={turn}>
          {texts.draw.go}
        </Button>
      </Panel>
    ) : (
      <Panel title={texts.draw.title} />
    );

  if (phase.kind === "breach")
    return (
      <BreachPanel
        texts={texts.breach}
        party={party}
        onResolve={game.resolveBreach}
      />
    );

  if (phase.kind === "pass")
    return (
      <PassPanel
        texts={texts.pass}
        party={party}
        sentTo={phase.sentTo}
        targets={eligibleTargets(party, phase).length}
        onBlock={game.block}
        onDone={turn}
      />
    );

  if (phase.kind === "race" || phase.kind === "speed") {
    const pick = texts[phase.kind];
    return (
      <Panel color="lilac" title={pick.title} text={pick.text}>
        <Button variant="paper" size="sm" onClick={turn}>
          {pick.cancel}
        </Button>
      </Panel>
    );
  }

  return (
    <TurnPanel
      texts={texts.turn}
      party={party}
      notice={game.notice}
      onRace={() => game.setPhase({ kind: "race" })}
      onMissing={() => game.setPhase({ kind: "breach" })}
      onEmpty={() => game.setPhase({ kind: "speed" })}
    />
  );
}
