"use client";

import { useState } from "react";
import { Button } from "@/_components/ui/Button";
import type { PlayerTexts } from "@/lib/playerTexts";
import { AvatarPicker } from "./AvatarPicker";
import { ViewTitle } from "./ViewTitle";

type PlayerFormProps = {
  texts: PlayerTexts["form"];
  title: string;
  submit: string;
  initial: { name: string; avatar: string };
  onSubmit: (name: string, avatar: string) => void;
};

export function PlayerForm({
  texts,
  title,
  submit,
  initial,
  onSubmit,
}: PlayerFormProps) {
  const [name, setName] = useState(initial.name);
  const [avatar, setAvatar] = useState(initial.avatar);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(name, avatar);
      }}
    >
      <ViewTitle>{title}</ViewTitle>
      <label
        htmlFor="player-name"
        className="mt-4 block text-left font-ui text-lg font-bold"
      >
        {texts.name}
      </label>
      <input
        id="player-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        maxLength={16}
        placeholder={texts.namePlaceholder}
        autoComplete="off"
        spellCheck={false}
        className="toon mt-1 min-h-14 w-full rounded-2xl bg-paper px-4 font-ui text-xl font-semibold placeholder:text-ink-soft/60"
      />
      <AvatarPicker label={texts.avatar} value={avatar} onChange={setAvatar} />
      <Button type="submit" variant="mint" fullWidth className="mt-6">
        {submit}
      </Button>
    </form>
  );
}
