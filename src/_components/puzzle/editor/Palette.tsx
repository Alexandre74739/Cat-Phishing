"use client";

import { Trash2 } from "lucide-react";
import type { PointerEvent } from "react";
import { createBlock, type Block, type BlockType } from "@/lib/blocks";
import { BlockView } from "./BlockView";
import type { EditorTexts } from "./types";

type PaletteProps = {
  types: BlockType[];
  texts: EditorTexts;
  disabled: boolean;
  overTrash: boolean;
  onGrab: (event: PointerEvent, block: Block) => void;
  onAdd: (block: Block) => void;
};

export function Palette({
  types,
  texts,
  disabled,
  overTrash,
  onGrab,
  onAdd,
}: PaletteProps) {
  return (
    <section
      data-trash="true"
      aria-label={texts.paletteTitle}
      className={`toon relative flex max-h-70 w-full shrink-0 flex-col overflow-hidden rounded-3xl md:max-h-none md:w-62.5 ${overTrash ? "bg-coral/30" : "bg-paper"}`}
    >
      <h2 className="border-b-[3px] border-ink bg-sky px-4 py-2 font-ui text-lg font-bold">
        {texts.paletteTitle}
      </h2>
      <ul className="scroll-soft flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-3">
        {types.map((type) => (
          <li key={type}>
            <button
              type="button"
              disabled={disabled}
              onPointerDown={(event) => onGrab(event, createBlock(type))}
              onClick={(event) => {
                if (event.detail === 0) onAdd(createBlock(type));
              }}
              className="block max-w-full cursor-grab touch-pan-y rounded-2xl text-left motion-safe:transition-transform motion-safe:hover:-rotate-1 motion-safe:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <BlockView
                block={{ id: type, type, times: 3, children: [] }}
                texts={texts}
              />
            </button>
          </li>
        ))}
      </ul>
      {overTrash && (
        <p className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="toon flex flex-col items-center gap-1 rounded-2xl bg-coral px-4 py-3 text-center font-ui text-xl font-bold">
            <Trash2 size={30} strokeWidth={2.5} aria-hidden="true" />
            {texts.dropToDelete}
          </span>
        </p>
      )}
    </section>
  );
}
