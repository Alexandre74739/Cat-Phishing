import type { DropTarget } from "./types";

export function findDropTarget(
  x: number,
  y: number,
): { overTrash: boolean; target: DropTarget | null } {
  const elements = document.elementsFromPoint(x, y) as HTMLElement[];
  const overTrash = elements.some((element) => element.dataset.trash);
  const list = overTrash
    ? undefined
    : elements.find((element) => element.dataset.list);
  if (!list?.dataset.list) return { overTrash, target: null };

  const bounds = list.getBoundingClientRect();
  const slots = Array.from(
    list.querySelectorAll<HTMLElement>(":scope > [data-slot]"),
  ).filter((slot) => slot.getClientRects().length > 0);
  let index = slots.findIndex((slot) => {
    const rect = slot.getBoundingClientRect();
    return y < rect.top + Math.min(rect.height / 2, 22);
  });
  if (index < 0) index = slots.length;

  const top =
    slots.length === 0
      ? bounds.top + 8
      : index < slots.length
        ? slots[index].getBoundingClientRect().top - 4
        : slots[slots.length - 1].getBoundingClientRect().bottom + 3;

  return {
    overTrash,
    target: {
      listId: list.dataset.list,
      index,
      top,
      left: bounds.left + 6,
      width: Math.min(bounds.width - 12, 240),
    },
  };
}
