import { X } from "lucide-react";
import { Avatar } from "@/_components/ui/Avatar";
import { fillText } from "@/lib/fillText";
import type { PartyPlayer } from "@/lib/party";

type RosterListProps = {
  roster: PartyPlayer[];
  removeLabel: string;
  onRemove: (id: string) => void;
};

export function RosterList({ roster, removeLabel, onRemove }: RosterListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {roster.map((player, index) => (
        <li
          key={player.id}
          className="toon flex items-center gap-3 rounded-2xl bg-paper py-2 pr-2 pl-3"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-grape font-ui font-bold text-paper">
            {index + 1}
          </span>
          <Avatar id={player.avatar} size={40} />
          <span className="flex-1 font-ui text-xl font-bold break-words">
            {player.name}
          </span>
          <button
            type="button"
            onClick={() => onRemove(player.id)}
            aria-label={fillText(removeLabel, { name: player.name })}
            className="pressable grid size-12 place-items-center rounded-full border-2 border-ink bg-coral"
          >
            <X size={22} strokeWidth={3} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
