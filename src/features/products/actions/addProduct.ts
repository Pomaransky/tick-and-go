import type { NewProduct } from "@/features/products/productSchemas";
import { useAppStore } from "@/store/useAppStore";
import { generateShortId } from "@/utils/generateShortId";

export function addProduct(product: NewProduct): string {
  const id = generateShortId();

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
  return id;
}
