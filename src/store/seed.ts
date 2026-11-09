import { seedPlaceId, seedPlaces } from "@/data/seedPlaces";
import { seedProductId, seedProducts } from "@/data/seedProducts";
import type { Place } from "@/features/places/types";
import type { Product } from "@/features/products/types";
import type { PersistedState } from "@/store/types";

export function applySeed(state: PersistedState): PersistedState {
  const products: Record<string, Product> = { ...state.products };
  const places: Record<string, Place> = { ...state.places };

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

  for (const seed of seedPlaces) {
    const id = seedPlaceId(seed.key);
    places[id] ??= { id, key: seed.key, usageCount: 0 };
  }

  return { ...state, products, places };
}
