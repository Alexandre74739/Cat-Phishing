"use client";

import { motion } from "motion/react";
import { Avatar } from "@/_components/ui/Avatar";
import { Button } from "@/_components/ui/Button";
import { fillText } from "@/lib/fillText";
import { findPartyPlayer, type Party, type Victory } from "@/lib/party";
import { CardBack } from "./cards/CardBack";
import { PixelCard } from "./cards/PixelCard";
import type { PartyTexts } from "./types";

type VictoryViewProps = {
  texts: PartyTexts["over"];
  party: Party;
  victory: Victory;
  onAgain: () => void;
  onChangePlayers: () => void;
};

export function VictoryView({
  texts,
  party,
  victory,
  onAgain,
  onChangePlayers,
}: VictoryViewProps) {
  const winner = victory.winner && findPartyPlayer(party, victory.winner);

  return (
    <section
      aria-labelledby="victory-title"
      aria-live="polite"
      className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center gap-6 text-center"
    >
      <motion.div
        initial={{ y: -40, rotate: -14, opacity: 0 }}
        animate={{ y: 0, rotate: -5, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="aspect-[1316/2000] w-40 shrink-0 overflow-hidden rounded-xl border-[3px] border-ink shadow-pop sm:w-48"
      >
        {winner ? (
          <PixelCard>
            <span className="grid aspect-square w-4/5 place-items-center rounded-full bg-card-line">
              <Avatar id={winner.avatar} size={72} />
            </span>
            <span className="mt-3 max-w-full truncate font-display text-xl tracking-wide text-card-line">
              {winner.name}
            </span>
          </PixelCard>
        ) : (
          <CardBack />
        )}
      </motion.div>
      <div>
        <p className="font-ui text-lg font-bold text-grape">
          {texts[victory.kind]}
        </p>
        <h1
          id="victory-title"
          className="font-display text-4xl tracking-wide break-words sm:text-5xl"
        >
          {winner
            ? fillText(texts.winner, { name: winner.name })
            : texts.nobody}
        </h1>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Button variant="orange" icon="again" fullWidth onClick={onAgain}>
          {texts.again}
        </Button>
        <Button
          variant="paper"
          size="sm"
          icon="players"
          onClick={onChangePlayers}
        >
          {texts.changePlayers}
        </Button>
      </div>
    </section>
  );
}
