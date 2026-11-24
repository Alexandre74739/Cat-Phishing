import type { ReactNode } from "react";
import { isContainer, type Block } from "@/lib/blocks";
import { BlockChip, BlockLabel } from "../block/BlockChip";
import { blockLooks } from "../block/blockLooks";
import { RepeatControls } from "./RepeatControls";
import type { EditorTexts } from "./types";

type BlockViewProps = {
  block: Block;
  texts: EditorTexts;
  activeId?: string | null;
  onTimes?: (times: number) => void;
  renderChild?: (child: Block) => ReactNode;
};

export function BlockView({
  block,
  texts,
  activeId,
  onTimes,
  renderChild,
}: BlockViewProps) {
  const label = texts.blocks[block.type];
  const active = activeId === block.id;
  if (!isContainer(block.type))
    return <BlockChip kind={block.type} label={label} active={active} />;

  const { color, soft } = blockLooks[block.type];
  const children = block.children ?? [];

  return (
    <div
      className={`toon w-fit max-w-full rounded-2xl font-ui text-[17px] font-semibold text-ink select-none ${color} ${active ? "running-glow" : ""}`}
    >
      <div className="px-3 py-1.5">
        <BlockLabel kind={block.type} label={label}>
          {block.type === "repeat" && (
            <RepeatControls
              times={block.times ?? 2}
              label={texts.times}
              fewer={texts.fewer}
              more={texts.more}
              onChange={onTimes}
            />
          )}
        </BlockLabel>
      </div>
      <div className="px-2 pb-2.5">
        {renderChild ? (
          <div
            data-list={block.id}
            className={`flex min-h-12 min-w-40 flex-col gap-1.5 rounded-xl border-[3px] border-ink/70 p-1.5 ${soft}`}
          >
            {children.map(renderChild)}
            {children.length === 0 && (
              <span className="pointer-events-none px-2 py-1.5 text-sm font-bold text-ink">
                {texts.dropHere}
              </span>
            )}
          </div>
        ) : (
          <div
            className={`h-4 w-24 rounded-lg border-[3px] border-ink/50 ${soft}`}
          />
        )}
      </div>
    </div>
  );
}
