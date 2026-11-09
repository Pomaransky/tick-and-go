import type { resources } from "@/i18n/resources";

import type { Unit } from "./units";

export type ProductKey =
  keyof (typeof resources)["en"]["translation"]["products"];

export interface SeedProduct {
  key: ProductKey;
  defaultUnit: Unit;
  defaultQuantity: number;
}

export const seedProducts: readonly SeedProduct[] = [
  { key: "potato", defaultUnit: "kg", defaultQuantity: 2 },
  { key: "milk", defaultUnit: "l", defaultQuantity: 1 },
  { key: "blackTea", defaultUnit: "pack", defaultQuantity: 1 },
];

export function seedProductId(key: ProductKey): string {
  return `seed:${key}`;
}
