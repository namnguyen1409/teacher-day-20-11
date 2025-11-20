export const WORD_EFFECTS = [
    "words-slide-up",
    "words-rotate-in",
    "words-slide-from-right",
    "letters-slide-up",
    "letters-slide-down",
] as const;


export const TEXT_EFFECTS = [...WORD_EFFECTS] as const;

export type WordEffect = typeof WORD_EFFECTS[number];
export type TextEffect = typeof TEXT_EFFECTS[number];

