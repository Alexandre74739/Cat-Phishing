// The course page is kept for the browser tab only, so coming back from a level lands on it.
const storageKey = "cat-phishing:hub-page";
const listeners = new Set<() => void>();

export function getHubPage() {
  try {
    return Number(window.sessionStorage.getItem(storageKey)) || 0;
  } catch {
    return 0;
  }
}

export const getServerHubPage = () => 0;

export function saveHubPage(page: number) {
  try {
    window.sessionStorage.setItem(storageKey, String(page));
  } catch {
    return;
  }
  listeners.forEach((listener) => listener());
}

export function subscribeHubPage(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
