import type { resources } from "@/i18n/resources";

import { Unit } from "./units";

export type ProductKey =
  keyof (typeof resources)["en"]["translation"]["products"];

export interface SeedProduct {
  key: ProductKey;
  defaultUnit: Unit;
  defaultQuantity: number;
}

export const seedProducts: readonly SeedProduct[] = [
  { key: "potato", defaultUnit: Unit.KG, defaultQuantity: 2 },
  { key: "milk", defaultUnit: Unit.L, defaultQuantity: 1 },
  { key: "blackTea", defaultUnit: Unit.PACK, defaultQuantity: 1 },
];

export function seedProductId(key: ProductKey): string {
  return `seed:${key}`;
}
