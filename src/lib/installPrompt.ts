type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Listening at module load: the browser can fire beforeinstallprompt before React hydrates.
let pendingPrompt: InstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    pendingPrompt = event as InstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    pendingPrompt = null;
    notify();
  });
}

export function subscribeToInstall(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function canPromptInstall() {
  return pendingPrompt !== null;
}

export function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export async function promptInstall() {
  if (!pendingPrompt) return;
  const event = pendingPrompt;
  pendingPrompt = null;
  await event.prompt();
  await event.userChoice.catch(() => null);
  notify();
}
