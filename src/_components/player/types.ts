export type PlayerScreen =
  | { name: "players" }
  | { name: "player"; id: string }
  | { name: "new" }
  | { name: "edit"; id: string }
  | { name: "account"; mode: "create" | "login" }
  | { name: "remove"; id: string };

export const dialogTitleId = "player-dialog-title";
