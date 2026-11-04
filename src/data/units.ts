export const units = ["pcs", "kg", "g", "l", "ml", "pack"] as const;

export type Unit = (typeof units)[number];
