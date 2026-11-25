import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party } from "@/lib/party";
import type { PartyTexts } from "../types";
import type { Notice } from "../useParty";
import { Panel } from "./Panel";

type TurnPanelProps = {
  texts: PartyTexts["turn"];
  party: Party;
  notice: Notice;
  onRace: () => void;
  onMissing: () => void;
  onEmpty: () => void;
};

export function TurnPanel({
  texts,
  party,
  notice,
  onRace,
  onMissing,
  onEmpty,
}: TurnPanelProps) {
  const name = (id: string) => findPartyPlayer(party, id).name;
  const news =
    notice &&
    [
      notice.out.length > 0 &&
        fillText(texts.out, { names: notice.out.map(name).join(" & ") }),
      notice.saved && fillText(texts.saved, { name: name(notice.saved) }),
      fillText(texts.moved, { name: name(notice.holder) }),
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <Panel
      title={fillText(texts.title, { name: name(party.active) })}
      text={news || texts.text}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="mint"
          size="compact"
          icon="match"
          fullWidth
          onClick={onRace}
        >
          {texts.race}
        </Button>
        <Button
          variant="coral"
          size="compact"
          icon="breach"
          fullWidth
          onClick={onMissing}
        >
          {texts.missing}
        </Button>
      </div>
      <Button
        variant="paper"
        size="compact"
        icon="trophy"
        fullWidth
        onClick={onEmpty}
      >
        {texts.empty}
      </Button>
    </Panel>
  );
}
