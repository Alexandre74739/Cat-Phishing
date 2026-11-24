export const fillText = (
  text: string,
  values: Record<string, number | string>,
) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
