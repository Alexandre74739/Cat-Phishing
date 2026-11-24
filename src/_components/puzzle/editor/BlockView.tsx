import type { ReactNode } from "react";
import {
  elseList,
  isContainer,
  type Block,
  type Condition,
} from "@/lib/blocks";
import { BlockChip, BlockLabel } from "../block/BlockChip";
import { blockLooks } from "../block/blockLooks";
import { ConditionPicker } from "./ConditionPicker";
import { RepeatControls } from "./RepeatControls";
import type { EditorTexts } from "./types";

type BlockViewProps = {
  block: Block;
  texts: EditorTexts;
  activeId?: string | null;
  onTimes?: (times: number) => void;
  onCondition?: (condition: Condition) => void;
  renderChild?: (child: Block) => ReactNode;
};

export function BlockView({
  block,
  texts,
  activeId,
  onTimes,
  onCondition,
  renderChild,
}: BlockViewProps) {
  const label = texts.blocks[block.type];
  const active = activeId === block.id;
  if (!isContainer(block.type))
    return <BlockChip kind={block.type} label={label} active={active} />;

  const { color, soft } = blockLooks[block.type];
  const list = (id: string, items: Block[]) =>
    renderChild ? (
      <div
        data-list={id}
        className={`flex min-h-12 min-w-40 flex-col gap-1.5 rounded-xl border-[3px] border-ink/70 p-1.5 ${soft}`}
      >
        {items.map(renderChild)}
        {items.length === 0 && (
          <span className="pointer-events-none px-2 py-1.5 text-sm font-bold text-ink">
            {texts.dropHere}
          </span>
        )}
      </div>
    ) : (
      <div
        className={`h-4 w-24 rounded-lg border-[3px] border-ink/50 ${soft}`}
      />
    );

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
          {block.condition && (
            <ConditionPicker
              value={block.condition}
              label={texts.condition}
              names={texts.conditions}
              onChange={onCondition}
            />
          )}
        </BlockLabel>
      </div>
      <div className="px-2 pb-2.5">{list(block.id, block.children ?? [])}</div>
      {block.alt && (
        <>
          <p className="px-3 pb-1">{texts.else}</p>
          <div className="px-2 pb-2.5">
            {list(elseList(block.id), block.alt)}
          </div>
        </>
      )}
    </div>
  );
}
