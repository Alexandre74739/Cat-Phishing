import {
  ArrowUp,
  ChevronsUp,
  CircleHelp,
  Construction,
  CornerUpLeft,
  CornerUpRight,
  Gem,
  Hammer,
  Hourglass,
  KeyRound,
  Play,
  Repeat,
  Repeat1,
  Split,
  Undo2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { BlockType } from "@/lib/blocks";

export type BlockLookKind = BlockType | "start";

const movement = { color: "bg-sky", soft: "bg-sky-soft" };
const action = { color: "bg-action", soft: "bg-action-soft" };
const control = { color: "bg-orange", soft: "bg-orange-soft" };

export const blockLooks: Record<
  BlockLookKind,
  { Icon: LucideIcon; color: string; soft: string }
> = {
  start: { Icon: Play, color: "bg-orange", soft: "bg-orange-soft" },
  forward: { Icon: ArrowUp, ...movement },
  left: { Icon: CornerUpLeft, ...movement },
  right: { Icon: CornerUpRight, ...movement },
  turnAround: { Icon: Undo2, ...movement },
  jump: { Icon: ChevronsUp, ...movement },
  wait: { Icon: Hourglass, ...movement },
  grab: { Icon: Gem, ...action },
  smash: { Icon: Hammer, ...action },
  bridge: { Icon: Construction, ...action },
  open: { Icon: KeyRound, ...action },
  zap: { Icon: Zap, ...action },
  repeat: { Icon: Repeat, ...control },
  until: { Icon: Repeat1, ...control },
  if: { Icon: CircleHelp, ...control },
  ifElse: { Icon: Split, ...control },
};
