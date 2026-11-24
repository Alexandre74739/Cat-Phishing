export type PageItem = number | "start-gap" | "end-gap";

const maxSlots = 5;

export function pageItems(page: number, pages: number): PageItem[] {
  const last = pages - 1;
  if (pages <= maxSlots) return Array.from({ length: pages }, (_, i) => i);
  if (page < maxSlots - 2) return [0, 1, 2, "end-gap", last];
  if (page > last - (maxSlots - 2)) {
    return [0, "start-gap", last - 2, last - 1, last];
  }
  return [0, "start-gap", page, "end-gap", last];
}
