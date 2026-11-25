import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party } from "@/lib/party";
import type { PartyTexts } from "../types";
import { Panel } from "./Panel";

type PassPanelProps = {
  texts: PartyTexts["pass"];
  party: Party;
  sentTo?: string;
  targets: number;
  onBlock: () => void;
  onDone: () => void;
};

export function PassPanel({
  texts,
  party,
  sentTo,
  targets,
  onBlock,
  onDone,
}: PassPanelProps) {
  const sender = findPartyPlayer(party, party.active).name;
  const done = (
    <Button
      variant="mint"
      size="compact"
      icon="next"
      iconSide="end"
      fullWidth
      onClick={onDone}
    >
      {texts.done}
    </Button>
  );

  if (sentTo) {
    const receiver = findPartyPlayer(party, sentTo).name;
    return (
      <Panel
        color="sky"
        title={fillText(texts.sent, { from: sender, to: receiver })}
        text={texts.blockHint}
      >
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="grape"
            size="compact"
            icon="nope"
            fullWidth
            onClick={onBlock}
          >
            {texts.block}
          </Button>
          {done}
        </div>
      </Panel>
    );
  }

  if (!targets)
    return (
      <Panel color="sky" title={texts.none}>
        {done}
      </Panel>
    );

  return (
    <Panel
      color="sky"
      title={fillText(texts.title, { name: sender })}
      text={texts.text}
    >
      <Button variant="paper" size="compact" fullWidth onClick={onDone}>
        {texts.keep}
      </Button>
    </Panel>
  );
}
