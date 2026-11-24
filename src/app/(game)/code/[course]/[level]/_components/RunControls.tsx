import { Play, Rabbit, RotateCcw, Square, Turtle } from "lucide-react";
import { playClickSound } from "@/lib/sound";
import type { LevelTexts } from "./types";
import type { LevelGameState } from "./useLevelGame";

type RunControlsProps = {
  texts: LevelTexts["controls"];
  game: LevelGameState;
};

const button =
  "toon pressable flex items-center justify-center gap-2 rounded-full py-3 font-ui font-semibold disabled:cursor-not-allowed disabled:opacity-60";

export function RunControls({ texts, game }: RunControlsProps) {
  const SpeedIcon = game.fast ? Rabbit : Turtle;
  const RunIcon = game.running ? Square : Play;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          if (!game.running) return game.run();
          playClickSound();
          game.stop();
        }}
        className={`${button} flex-1 text-2xl ${game.running ? "bg-coral" : "bg-mint"}`}
      >
        <RunIcon
          size={24}
          strokeWidth={2.75}
          fill="currentColor"
          aria-hidden="true"
        />
        {game.running ? texts.stop : texts.run}
      </button>
      <button
        type="button"
        aria-label={texts.reset}
        title={texts.reset}
        onClick={() => {
          playClickSound();
          game.reset();
        }}
        className={`${button} bg-paper px-5`}
      >
        <RotateCcw size={24} strokeWidth={3} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-pressed={game.fast}
        aria-label={game.fast ? texts.fast : texts.normal}
        title={game.fast ? texts.fast : texts.normal}
        onClick={() => {
          playClickSound();
          game.toggleFast();
        }}
        className={`${button} px-4 ${game.fast ? "bg-orange" : "bg-paper"}`}
      >
        <SpeedIcon size={24} strokeWidth={2.75} aria-hidden="true" />
      </button>
    </div>
  );
}
