import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party } from "@/lib/party";
import type { PartyTexts } from "../types";
import { Panel } from "./Panel";

type BreachPanelProps = {
  texts: PartyTexts["breach"];
  party: Party;
  onResolve: (defused: boolean) => void;
};

export function BreachPanel({ texts, party, onResolve }: BreachPanelProps) {
  const asker = findPartyPlayer(party, party.active).name;
  const holder = findPartyPlayer(party, party.holder).name;
  const same = party.holder === party.active;
  const text = `${fillText(texts.asker, { name: asker })} ${fillText(same ? texts.same : texts.holder, { name: holder })}`;

  return (
    <Panel
      color="virus"
      card={same ? "cat-ware" : "furr-wall"}
      shake
      title={texts.title}
      text={text}
    >
      {same ? (
        <Button
          variant="paper"
          size="compact"
          icon="next"
          iconSide="end"
          fullWidth
          onClick={() => onResolve(false)}
        >
          {texts.next}
        </Button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="mint"
            size="compact"
            icon="defuse"
            fullWidth
            onClick={() => onResolve(true)}
          >
            {texts.saved}
          </Button>
          <Button
            variant="paper"
            size="compact"
            fullWidth
            onClick={() => onResolve(false)}
          >
            {texts.hit}
          </Button>
        </div>
      )}
    </Panel>
  );
}
