import { createLocalStore } from "./localStore";

// After the cat's talk, the player must win one level before leaving the code pages.
export type HackPass = { runId: string; isTrained: boolean };

const passStore = createLocalStore<HackPass | null>(
  () => "cat-phishing:hack-pass",
  null,
);

export const getHackPass = passStore.get;
export const getServerHackPass = passStore.getServer;

export const startHackTraining = (runId: string) =>
  passStore.set({ runId, isTrained: false });

export function markHackTrained() {
  const pass = passStore.get();
  if (pass && !pass.isTrained) passStore.set({ ...pass, isTrained: true });
}
