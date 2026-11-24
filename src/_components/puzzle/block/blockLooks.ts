import {
  ArrowUp,
  BrickWall,
  Bug,
  CornerUpLeft,
  CornerUpRight,
  Diamond,
  Gem,
  Hourglass,
  Play,
  Repeat,
  Repeat1,
  ShieldAlert,
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
  start: { Icon: Play, color: "bg-sun", soft: "bg-sun-soft" },
  forward: { Icon: ArrowUp, ...movement },
  left: { Icon: CornerUpLeft, ...movement },
  right: { Icon: CornerUpRight, ...movement },
  grab: { Icon: Gem, ...action },
  wait: { Icon: Hourglass, ...action },
  zap: { Icon: Zap, ...action },
  repeat: { Icon: Repeat, ...control },
  until: { Icon: Repeat1, ...control },
  ifWall: { Icon: BrickWall, ...control },
  ifGem: { Icon: Diamond, ...control },
  ifBug: { Icon: Bug, ...control },
  whileVirus: { Icon: ShieldAlert, ...control },
};
