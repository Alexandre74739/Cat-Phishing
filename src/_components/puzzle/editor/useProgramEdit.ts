"use client";

import { useState, type KeyboardEvent } from "react";
import {
  findBlock,
  insertBlock,
  moveBlock,
  removeBlock,
  rootList,
  setCondition,
  setTimes,
  type Block,
  type Condition,
} from "@/lib/blocks";
import { playSound } from "@/lib/sound";

type EditOptions = {
  program: Block[];
  disabled: boolean;
  onChange: (program: Block[]) => void;
};

const focusBlock = (id: string) =>
  requestAnimationFrame(() =>
    document.querySelector<HTMLElement>(`[data-block-id="${id}"]`)?.focus(),
  );

export function useProgramEdit({ program, disabled, onChange }: EditOptions) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const add = (block: Block) => {
    const into = selectedId ? findBlock(program, selectedId) : null;
    onChange(
      into?.children
        ? insertBlock(program, into.id, into.children.length, block)
        : insertBlock(program, rootList, program.length, block),
    );
    playSound("snap");
  };

  const move = (id: string, delta: -1 | 1) => {
    onChange(moveBlock(program, id, delta));
    playSound("snap");
    focusBlock(id);
  };

  const remove = (id: string) => {
    onChange(removeBlock(program, id));
    setSelectedId(null);
    playSound("trash");
  };

  const changeTimes = (id: string, times: number) => {
    onChange(setTimes(program, id, times));
    playSound("click");
  };

  const changeCondition = (id: string, condition: Condition) => {
    onChange(setCondition(program, id, condition));
    playSound("click");
  };

  const onKey = (event: KeyboardEvent, id: string) => {
    if (disabled || event.target !== event.currentTarget) return;
    const action =
      event.key === "Delete" || event.key === "Backspace"
        ? () => remove(id)
        : event.altKey && event.key === "ArrowUp"
          ? () => move(id, -1)
          : event.altKey && event.key === "ArrowDown"
            ? () => move(id, 1)
            : event.key === "Escape"
              ? () => setSelectedId(null)
              : null;
    if (!action) return;
    event.preventDefault();
    action();
  };

  return {
    selectedId,
    setSelectedId,
    add,
    move,
    remove,
    changeTimes,
    changeCondition,
    onKey,
  };
}

export type ProgramEdit = ReturnType<typeof useProgramEdit>;
