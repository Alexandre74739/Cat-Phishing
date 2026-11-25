import {
  ArrowRight,
  Blocks,
  BookOpen,
  Cat,
  CloudUpload,
  Download,
  Gamepad2,
  House,
  LogIn,
  LogOut,
  Pencil,
  RefreshCw,
  ShieldBan,
  SquareTerminal,
  Trash2,
  Users,
} from "lucide-react";
export const variants = {
  grape: "bg-grape text-paper",
  orange: "bg-orange text-ink",
  mint: "bg-mint text-ink",
  sky: "bg-sky text-ink",
  coral: "bg-coral text-ink",
  paper: "bg-paper text-ink",
};

export const sizes = {
  md: { className: "min-h-14 px-7 text-xl", icon: 22 },
  sm: { className: "min-h-12 px-5 text-lg", icon: 20 },
  compact: { className: "min-h-12 px-3 text-lg", icon: 20 },
};

export const icons = {
  play: Gamepad2,
  home: House,
  code: Blocks,
  cat: Cat,
  install: Download,
  next: ArrowRight,
  edit: Pencil,
  upload: CloudUpload,
  sync: RefreshCw,
  login: LogIn,
  logout: LogOut,
  remove: Trash2,
  rules: BookOpen,
  players: Users,
  nope: ShieldBan,
  terminal: SquareTerminal,
};

export type ButtonVariant = keyof typeof variants;
export type ButtonIcon = keyof typeof icons;
