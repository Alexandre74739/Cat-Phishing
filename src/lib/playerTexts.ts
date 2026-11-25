import type { CloudErrorCode } from "./cloud";
import type { SyncStatus } from "./cloudSync";
import { routes } from "./navigation";

export type PlayerTexts = {
  open: string;
  close: string;
  back: string;
  players: { title: string; hint: string; newPlayer: string; login: string };
  player: {
    starsLine: string;
    playing: string;
    play: string;
    edit: string;
    remove: string;
  };
  form: {
    newTitle: string;
    editTitle: string;
    name: string;
    namePlaceholder: string;
    avatar: string;
    create: string;
    save: string;
  };
  cloud: {
    title: string;
    intro: string;
    start: string;
    account: string;
    status: Record<SyncStatus, string>;
    sync: string;
    logout: string;
    backstage: { label: string; href: string };
  };
  account: {
    createTitle: string;
    loginTitle: string;
    pseudo: string;
    pseudoPlaceholder: string;
    pseudoHint: string;
    code: string;
    codeHint: string;
    codeProgress: string;
    erase: string;
    clear: string;
    create: string;
    login: string;
    errors: Record<CloudErrorCode, string>;
    codeLeft: string;
  };
  remove: {
    title: string;
    text: string;
    device: string;
    everywhere: string;
    cancel: string;
  };
};

export const playerTexts: PlayerTexts = {
  open: "Players",
  close: "Close",
  back: "Back",
  players: {
    title: "Who's playing?",
    hint: "Tap a player to see their options.",
    newPlayer: "New player",
    login: "I already have an online save",
  },
  player: {
    starsLine: "{stars} stars",
    playing: "playing now",
    play: "Play as {name}",
    edit: "Change name or avatar",
    remove: "Remove from this device",
  },
  form: {
    newTitle: "New player",
    editTitle: "Edit player",
    name: "Name",
    namePlaceholder: "noob38",
    avatar: "Avatar",
    create: "Create player",
    save: "Save",
  },
  cloud: {
    title: "Online save",
    intro: "Keep your stars safe and find them on another phone.",
    start: "Save online",
    account: "Account: {pseudo}",
    status: {
      off: "Not synced yet.",
      syncing: "Syncing…",
      ok: "Synced!",
      offline: "Offline: we'll sync later.",
      error: "Sync failed, try again.",
    },
    sync: "Sync",
    logout: "Log out",
    backstage: { label: "Backstage", href: routes.backstage },
  },
  account: {
    createTitle: "Save online",
    loginTitle: "Find my save",
    pseudo: "Nickname",
    pseudoPlaceholder: "noob38",
    pseudoHint: "A nickname, never your real full name.",
    code: "Secret code",
    codeHint: "4 digits. Not your phone or bank PIN!",
    codeProgress: "Code: {count} of {total} digits",
    erase: "Erase last digit",
    clear: "Clear the code",
    create: "Create my save",
    login: "Log in",
    errors: {
      badPseudo: "3 to 16 letters, numbers, spaces, - or _.",
      badCode: "Wrong code.",
      taken: "This nickname is taken. Try another one!",
      unknown: "No save with this nickname.",
      locked: "Too many tries. Wait {minutes} min.",
      auth: "Please log in again.",
      tooMany: "Slow down! Try again in a moment.",
      offline: "No internet connection.",
      unavailable: "Online save is not available right now.",
      server: "Something went wrong. Try again.",
    },
    codeLeft: "Wrong code. {left} tries left.",
  },
  remove: {
    title: "Remove {name}?",
    text: "Their stars on this phone will be erased.",
    device: "Remove from this phone",
    everywhere: "Also delete the online save",
    cancel: "Cancel",
  },
};
