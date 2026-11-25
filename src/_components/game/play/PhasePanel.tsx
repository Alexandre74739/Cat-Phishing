import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party } from "@/lib/party";
import type { PartyTexts } from "../types";
import type { PartyState } from "../useParty";
import { CatwareReveal } from "./CatwareReveal";
import { Panel } from "./Panel";

type PhasePanelProps = {
  texts: PartyTexts;
  game: PartyState;
  party: Party;
  drawn: boolean;
};

export function PhasePanel({ texts, game, party, drawn }: PhasePanelProps) {
  const { phase } = game;
  const holder = findPartyPlayer(party, party.holder);

  if (phase.kind === "draw")
    return (
      <>
        <Panel title={texts.draw.title} />
        {drawn && (
          <CatwareReveal
            texts={texts.draw}
            close={texts.cards.close}
            holder={holder}
            onDone={game.give}
          />
        )}
      </>
    );

  if (phase.kind === "sent")
    return (
      <Panel
        color="mint"
        card="paws-word"
        title={fillText(texts.give.sent, {
          from: findPartyPlayer(party, phase.from).name,
          to: holder.name,
        })}
        text={texts.give.blockHint}
      >
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="grape"
            size="compact"
            icon="nope"
            fullWidth
            onClick={game.block}
          >
            {texts.give.block}
          </Button>
          <Button
            variant="orange"
            size="compact"
            icon="next"
            iconSide="end"
            fullWidth
            onClick={game.give}
          >
            {texts.give.done}
          </Button>
        </div>
      </Panel>
    );

  return (
    <Panel
      card="cat-ware"
      title={fillText(texts.give.title, { name: holder.name })}
      text={texts.give.text}
    />
  );
}
