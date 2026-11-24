// Everything stays on the device (localStorage). One shared listener list: any write refreshes every store.
const listeners = new Set<() => void>();

export function notifyStores() {
  listeners.forEach((listener) => listener());
}

export function subscribeStores(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: unknown) {
  try {
    if (value === undefined) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
  notifyStores();
}

export function createLocalStore<T>(key: () => string, fallback: T) {
  let cache: { key: string; raw: string | null; value: T } | null = null;

  const get = (): T => {
    const currentKey = key();
    const raw = readRaw(currentKey);
    if (cache?.key === currentKey && cache.raw === raw) return cache.value;
    let value = fallback;
    try {
      value = raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      value = fallback;
    }
    cache = { key: currentKey, raw, value };
    return value;
  };

  return {
    get,
    getServer: () => fallback,
    set: (value: T) => writeRaw(key(), value),
  };
}
