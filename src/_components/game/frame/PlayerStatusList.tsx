import { Bug, Megaphone } from "lucide-react";
import { Avatar } from "@/_components/ui/Avatar";
import type { Party } from "@/lib/party";
import type { TableTexts } from "../types";

const chip =
  "grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink";

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
    <ol className="flex flex-col gap-2">
      {party.players.map((player, index) => {
        const out = party.out.includes(player.id);
        return (
          <li
            key={player.id}
            className={`flex items-center gap-2 rounded-2xl border-[3px] border-ink p-2 ${out ? "bg-lilac/60" : "bg-paper"}`}
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-grape font-ui text-sm font-bold text-paper">
              {index + 1}
            </span>
            <span className={out ? "opacity-40 grayscale" : ""}>
              <Avatar id={player.avatar} size={32} />
            </span>
            <span
              className={`min-w-0 flex-1 truncate font-ui text-lg font-bold ${out ? "line-through" : ""}`}
            >
              {player.name}
              {out && <span className="sr-only">, {texts.out}</span>}
            </span>
            {revealed && !out && player.id === party.active && (
              <span className={`${chip} bg-orange`} title={texts.active}>
                <Megaphone size={15} strokeWidth={3} aria-hidden="true" />
                <span className="sr-only">{texts.active}</span>
              </span>
            )}
            {revealed && !out && player.id === party.holder && (
              <span className={`${chip} bg-mint`} title={texts.holder}>
                <Bug size={15} strokeWidth={3} aria-hidden="true" />
                <span className="sr-only">{texts.holder}</span>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
