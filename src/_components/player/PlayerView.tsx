"use client";

import { Star } from "lucide-react";
import { Avatar } from "@/_components/ui/Avatar";
import { Button } from "@/_components/ui/Button";
import { usePlayers } from "@/hooks/usePlayers";
import { useStars } from "@/hooks/useStars";
import { totalStars } from "@/lib/courseProgress";
import { fillText } from "@/lib/fillText";
import { switchPlayer, type Player } from "@/lib/players";
import type { PlayerTexts } from "@/lib/playerTexts";
import { getPlayerStars } from "@/lib/progress";
import { CloudSection } from "./CloudSection";
import { ViewTitle } from "./ViewTitle";

type PlayerViewProps = {
  texts: PlayerTexts;
  player: Player;
  onEdit: () => void;
  onRemove: () => void;
  onSaveOnline: () => void;
};

export function PlayerView({
  texts,
  player,
  onEdit,
  onRemove,
  onSaveOnline,
}: PlayerViewProps) {
  const { active } = usePlayers();
  const activeStars = useStars();
  const isActive = player.id === active.id;
  const stars = totalStars(isActive ? activeStars : getPlayerStars(player.id));

  return (
    <>
      <span className="toon mx-auto grid size-24 -rotate-3 place-items-center rounded-full bg-lilac sm:size-28">
        <Avatar id={player.avatar} size={64} />
      </span>
      <div className="mt-3">
        <ViewTitle>{player.name}</ViewTitle>
      </div>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-2 font-ui font-semibold">
        <span className="toon flex items-center gap-1 rounded-full bg-orange-soft px-3 py-0.5">
          <Star
            size={18}
            strokeWidth={2.5}
            aria-hidden="true"
            className="fill-orange"
          />
          {fillText(texts.player.starsLine, { stars })}
        </span>
        {isActive && (
          <span className="toon rounded-full bg-mint px-3 py-0.5">
            {texts.player.playing}
          </span>
        )}
      </p>
      <div className="mt-6 grid gap-3">
        {!isActive && (
          <Button
            variant="mint"
            size="sm"
            icon="play"
            fullWidth
            onClick={() => switchPlayer(player.id)}
          >
            {fillText(texts.player.play, { name: player.name })}
          </Button>
        )}
        <Button
          variant="paper"
          size="sm"
          icon="edit"
          fullWidth
          onClick={onEdit}
        >
          {texts.player.edit}
        </Button>
      </div>
      {isActive && (
        <CloudSection
          texts={texts.cloud}
          player={player}
          onStart={onSaveOnline}
        />
      )}
      <div className="mt-6 border-t-[3px] border-dashed border-ink/20 pt-5">
        <Button
          variant="coral"
          size="sm"
          icon="remove"
          fullWidth
          onClick={onRemove}
        >
          {texts.player.remove}
        </Button>
      </div>
    </>
  );
}
