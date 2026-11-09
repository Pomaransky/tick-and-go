import { useAppStore } from "@/store/useAppStore";

import type { ProductDefaults } from "./productDefaultsSchema";

export function updateProductDefaults(id: string, defaults: ProductDefaults) {
  useAppStore.setState((state) => {
    const product = state.products[id];
    if (!product) {
      return state;
    }
    return {
      products: {
        ...state.products,
        [id]: {
          ...product,
          defaultQuantity: defaults.quantity,
          defaultUnit: defaults.unit,
          defaultPlace: defaults.place,
        },
      },
    };
  });
}
