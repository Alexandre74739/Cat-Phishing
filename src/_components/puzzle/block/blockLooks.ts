import {
  ArrowUp,
  BrickWall,
  Bug,
  ChevronsUp,
  Construction,
  CornerUpLeft,
  CornerUpRight,
  Diamond,
  Flame,
  Gem,
  Hammer,
  Hourglass,
  KeyRound,
  LockKeyhole,
  MailWarning,
  Play,
  Repeat,
  Repeat1,
  ShieldAlert,
  Waves,
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
  jump: { Icon: ChevronsUp, ...movement },
  grab: { Icon: Gem, ...action },
  wait: { Icon: Hourglass, ...action },
  zap: { Icon: Zap, ...action },
  bridge: { Icon: Construction, ...action },
  smash: { Icon: Hammer, ...action },
  open: { Icon: KeyRound, ...action },
  repeat: { Icon: Repeat, ...control },
  until: { Icon: Repeat1, ...control },
  ifWall: { Icon: BrickWall, ...control },
  ifGem: { Icon: Diamond, ...control },
  ifBug: { Icon: Bug, ...control },
  whileVirus: { Icon: ShieldAlert, ...control },
  ifStream: { Icon: Waves, ...control },
  ifSpam: { Icon: MailWarning, ...control },
  ifGate: { Icon: LockKeyhole, ...control },
  ifLava: { Icon: Flame, ...control },
};
