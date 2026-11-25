export const pick = <T>(list: T[]) =>
  list[Math.floor(Math.random() * list.length)];

export const spread = (amount: number) => (Math.random() - 0.5) * amount;

export const randomInt = (max: number) => 1 + Math.floor(Math.random() * max);

export const randomHex = () =>
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase()
    .padStart(6, "0");
