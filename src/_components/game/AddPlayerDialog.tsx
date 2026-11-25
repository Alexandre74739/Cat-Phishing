"use client";

import { useRef, useState } from "react";
import { Button } from "@/_components/ui/Button";
import { CloseButton } from "@/_components/ui/CloseButton";
import { useDismiss } from "@/hooks/useDismiss";
import { fillText } from "@/lib/fillText";
import { maxPartyNameLength } from "@/lib/party";
import type { PartyTexts } from "./types";

type AddPlayerDialogProps = {
  texts: PartyTexts["setup"];
  seat: number;
  onAdd: (name: string) => void;
  onClose: () => void;
};

export function AddPlayerDialog({
  texts,
  seat,
  onAdd,
  onClose,
}: AddPlayerDialogProps) {
  const [name, setName] = useState("");
  const box = useRef<HTMLFormElement>(null);
  useDismiss(true, onClose, { box });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4">
      <form
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-player-title"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim()) return;
          onAdd(name);
          onClose();
        }}
        className="toon flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-cream p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="add-player-title"
              className="font-display text-3xl tracking-wide"
            >
              {texts.addTitle}
            </h2>
            <p className="font-ui font-semibold text-ink-soft">
              {fillText(texts.seat, { count: seat })}
            </p>
          </div>
          <CloseButton label={texts.close} onClick={onClose} />
        </div>
        <label htmlFor="party-name" className="sr-only">
          {texts.name}
        </label>
        <input
          id="party-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={maxPartyNameLength}
          placeholder={texts.namePlaceholder}
          autoComplete="off"
          spellCheck={false}
          autoFocus
          className="toon min-h-14 w-full rounded-2xl bg-paper px-4 font-ui text-xl font-semibold placeholder:text-ink-soft/60"
        />
        <div className="grid grid-cols-2 gap-3">
          <Button variant="paper" size="sm" fullWidth onClick={onClose}>
            {texts.cancel}
          </Button>
          <Button
            type="submit"
            variant="orange"
            size="sm"
            fullWidth
            disabled={!name.trim()}
          >
            {texts.add}
          </Button>
        </div>
      </form>
    </div>
  );
}
