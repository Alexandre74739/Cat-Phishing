"use client";

import { Avatar } from "@/_components/ui/Avatar";
import { avatars } from "@/lib/avatars";

type AvatarPickerProps = {
  label: string;
  value: string;
  onChange: (id: string) => void;
};

export function AvatarPicker({ label, value, onChange }: AvatarPickerProps) {
  return (
    <fieldset className="mt-4 text-left">
      <legend className="font-ui text-lg font-bold">{label}</legend>
      <div className="mt-1 grid max-h-56 grid-cols-5 gap-1 overflow-y-auto rounded-2xl bg-cream p-2 sm:grid-cols-6">
        {avatars.map((avatar) => (
          <label key={avatar.id} className="cursor-pointer">
            <input
              type="radio"
              name="avatar"
              value={avatar.id}
              checked={value === avatar.id}
              onChange={() => onChange(avatar.id)}
              aria-label={avatar.name}
              className="peer sr-only"
            />
            <span className="grid aspect-square place-items-center rounded-2xl border-[3px] border-transparent peer-checked:border-ink peer-checked:bg-mint peer-focus-visible:outline-4 peer-focus-visible:outline-grape">
              <Avatar id={avatar.id} size={40} />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
