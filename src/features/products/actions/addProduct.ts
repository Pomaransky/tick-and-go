import { randomUUID } from "expo-crypto";

import type { NewProduct } from "@/features/products/productSchemas";
import { useAppStore } from "@/store/useAppStore";

export function addProduct(product: NewProduct) {
  const id = randomUUID();
  useAppStore.setState((state) => ({
    products: {
      ...state.products,
      [id]: {
        id,
        name: product.name,
        defaultQuantity: product.quantity,
        defaultUnit: product.unit,
        defaultPlace: product.place,
        usageCount: 0,
      },
    },
  }));
}
