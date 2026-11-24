import { BlockView } from "./BlockView";
import type { DropTarget, Dragging, EditorTexts } from "./types";

type DragGhostProps = {
  dragging: Dragging;
  target: DropTarget | null;
  overTrash: boolean;
  texts: EditorTexts;
};

export function DragGhost({
  dragging,
  target,
  overTrash,
  texts,
}: DragGhostProps) {
  return (
    <>
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: dragging.x - dragging.offsetX,
          top: dragging.y - dragging.offsetY - dragging.lift,
        }}
      >
        <div
          className={`-rotate-3 scale-105 drop-shadow-[6px_8px_0_var(--color-ink)] ${overTrash ? "opacity-50" : ""}`}
        >
          <BlockView block={dragging.block} texts={texts} />
        </div>
      </div>
      {target && (
        <div
          className="pointer-events-none fixed z-40 h-2 rounded-full bg-grape ring-3 ring-paper"
          style={{
            top: target.top - 4,
            left: target.left,
            width: target.width,
          }}
        />
      )}
    </>
  );
}
