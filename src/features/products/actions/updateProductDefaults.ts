import type { ProductDefaults } from "@/features/products/productSchemas";
import { useAppStore } from "@/store/useAppStore";

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
