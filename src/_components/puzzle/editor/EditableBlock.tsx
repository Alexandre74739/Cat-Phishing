"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { PointerEvent } from "react";
import type { Block } from "@/lib/blocks";
import { BlockView } from "./BlockView";
import type { EditorTexts } from "./types";
import type { ProgramEdit } from "./useProgramEdit";

export type EditableShared = {
  texts: EditorTexts;
  edit: ProgramEdit;
  activeId: string | null;
  hiddenId: string | null;
  disabled: boolean;
  dragging: boolean;
  onGrab: (event: PointerEvent, block: Block) => void;
};

const tool =
  "toon pressable grid size-9 place-items-center rounded-full bg-paper text-ink";

export function EditableBlock({
  block,
  ...shared
}: EditableShared & { block: Block }) {
  const { texts, edit, disabled } = shared;
  const selected = edit.selectedId === block.id;

  return (
    <div
      data-slot
      className={
        block.id === shared.hiddenId ? "hidden" : "flex items-start gap-2"
      }
    >
      <div
        data-block-id={block.id}
        tabIndex={disabled ? -1 : 0}
        role="group"
        aria-label={`${texts.blocks[block.type]}. ${texts.keyboardHelp}`}
        onFocus={(event) => {
          if (event.target === event.currentTarget)
            edit.setSelectedId(block.id);
        }}
        onKeyDown={(event) => edit.onKey(event, block.id)}
        onPointerDown={(event) => shared.onGrab(event, block)}
        className={`cursor-grab touch-pan-y rounded-2xl outline-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-grape ${selected ? "outline-4 outline-offset-4 outline-grape/50" : ""}`}
      >
        <BlockView
          block={block}
          texts={texts}
          activeId={shared.activeId}
          onTimes={
            disabled ? undefined : (times) => edit.changeTimes(block.id, times)
          }
          renderChild={(child) => (
            <EditableBlock key={child.id} {...shared} block={child} />
          )}
        />
      </div>
      {selected && !disabled && !shared.dragging && (
        <span className="flex gap-1.5">
          <button
            type="button"
            aria-label={texts.moveUp}
            onClick={() => edit.move(block.id, -1)}
            className={tool}
          >
            <ArrowUp size={18} strokeWidth={3} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={texts.moveDown}
            onClick={() => edit.move(block.id, 1)}
            className={tool}
          >
            <ArrowDown size={18} strokeWidth={3} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={texts.remove}
            onClick={() => edit.remove(block.id)}
            className={`${tool} bg-coral`}
          >
            <Trash2 size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </span>
      )}
    </div>
  );
}
