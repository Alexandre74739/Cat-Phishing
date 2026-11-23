export type RevealWord = {
  word: string;
  range: [number, number];
  keywordIndex: number | null;
};

function normalize(word: string) {
  return word.replace(/[^\p{L}-]/gu, "").toLowerCase();
}

export function toRevealWords(
  text: string,
  keywords: string[],
  revealEnd: number,
): RevealWord[] {
  const keywordSet = new Set(keywords.map(normalize));
  const words = text.split(" ");
  let keywordCount = 0;

  return words.map((word, index) => ({
    word,
    range: [
      (index / words.length) * revealEnd,
      ((index + 1) / words.length) * revealEnd,
    ],
    keywordIndex: keywordSet.has(normalize(word)) ? keywordCount++ : null,
  }));
}
