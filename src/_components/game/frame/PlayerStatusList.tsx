import { Bug } from "lucide-react";
import { Avatar } from "@/_components/ui/Avatar";
import type { Party } from "@/lib/party";
import type { TableTexts } from "../types";

const chip =
  "grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink";
const holderChip = `${chip} bg-virus text-cream`;

type PlayerStatusListProps = {
  party: Party;
  texts: TableTexts;
  revealed: boolean;
};

export function PlayerStatusList({
  party,
  texts,
  revealed,
}: PlayerStatusListProps) {
  return (
    <div className="flex min-h-full flex-col gap-4">
      <ol className="flex flex-col gap-2">
        {party.players.map((player, index) => (
          <li
            key={player.id}
            className="flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-paper p-2"
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full font-ui text-sm font-bold ${index ? "bg-grape text-paper" : "bg-orange text-ink"}`}
            >
              {index + 1}
            </span>
            <Avatar id={player.avatar} size={32} />
            <span className="min-w-0 flex-1 truncate font-ui text-lg font-bold">
              {player.name}
            </span>
            {revealed && player.id === party.holder && (
              <span className={holderChip} title={texts.holder}>
                <Bug size={15} strokeWidth={3} aria-hidden="true" />
                <span className="sr-only">{texts.holder}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <dl
        aria-hidden="true"
        className="mt-auto flex flex-col gap-2 rounded-2xl bg-cream p-3 font-ui font-semibold"
      >
        <div className="flex items-center gap-2">
          <dt className={holderChip}>
            <Bug size={15} strokeWidth={3} />
          </dt>
          <dd>{texts.holder}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className={`${chip} bg-orange font-ui text-sm font-bold`}>1</dt>
          <dd>{texts.first}</dd>
        </div>
      </dl>
    </div>
  );
}
