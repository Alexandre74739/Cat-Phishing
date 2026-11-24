"use client";

import type { Block, BlockType } from "@/lib/blocks";
import { playSound } from "@/lib/sound";
import { DragGhost } from "./DragGhost";
import { Palette } from "./Palette";
import { ProgramArea } from "./ProgramArea";
import type { EditorTexts } from "./types";
import { useBlockDrag } from "./useBlockDrag";
import { useProgramEdit } from "./useProgramEdit";

type ProgramEditorProps = {
  program: Block[];
  palette: BlockType[];
  texts: EditorTexts;
  activeId: string | null;
  disabled: boolean;
  optimal?: number;
  onChange: (program: Block[]) => void;
};

export function ProgramEditor({
  program,
  palette,
  texts,
  activeId,
  disabled,
  optimal,
  onChange,
}: ProgramEditorProps) {
  const edit = useProgramEdit({ program, disabled, onChange });
  const drag = useBlockDrag({
    program,
    disabled,
    onChange,
    onTap: (block, fromPalette) => {
      if (fromPalette) return edit.add(block);
      edit.setSelectedId(block.id);
      playSound("click");
    },
  });

  return (
    <div className="flex min-h-160 flex-1 flex-col gap-3 md:min-h-130 md:flex-row lg:min-h-0">
      <Palette
        types={palette}
        texts={texts}
        disabled={disabled}
        overTrash={drag.overTrash}
        onGrab={(event, block) => drag.grab(event, block, true)}
        onAdd={edit.add}
      />
      <ProgramArea
        program={program}
        optimal={optimal}
        onClear={() => {
          onChange([]);
          edit.setSelectedId(null);
          playSound("trash");
        }}
        texts={texts}
        edit={edit}
        activeId={activeId}
        hiddenId={drag.hiddenId}
        disabled={disabled}
        dragging={drag.dragging !== null}
        onGrab={(event, block) => drag.grab(event, block, false)}
      />
      {drag.dragging && (
        <DragGhost
          dragging={drag.dragging}
          target={drag.target}
          overTrash={drag.overTrash}
          texts={texts}
        />
      )}
    </div>
  );
}
