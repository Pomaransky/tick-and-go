import type { TFunction } from "i18next";

import type { Product, Unit } from "@/types";

export function getProductName(product: Product, t: TFunction): string {
  if (product.key) {
    return t(`products.${product.key}`);
  }
  return product.name ?? "";
}

export function formatQuantity(
  quantity: number,
  unit: Unit,
  language: string,
  t: TFunction,
): string {
  const value = new Intl.NumberFormat(language, {
    maximumFractionDigits: 3,
  }).format(quantity);
  return `${value} ${t(`units.${unit}`)}`;
}
