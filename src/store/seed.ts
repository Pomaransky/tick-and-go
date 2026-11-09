import { seedProductId, seedProducts } from "@/data/seedProducts";
import type { PersistedState, Product } from "@/types";

export function applySeed(state: PersistedState): PersistedState {
  const products: Record<string, Product> = { ...state.products };

  for (const seed of seedProducts) {
    const id = seedProductId(seed.key);
    products[id] ??= {
      id,
      key: seed.key,
      defaultUnit: seed.defaultUnit,
      defaultQuantity: seed.defaultQuantity,
      usageCount: 0,
    };
  }

  return { ...state, products };
}
