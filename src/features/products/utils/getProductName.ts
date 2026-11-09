import type { TFunction } from "i18next";

import type { Product } from "@/features/products/types";

export function getProductName(product: Product, t: TFunction): string {
  if (product.key) {
    return t(`products.${product.key}`);
  }
  return product.name ?? "";
}
