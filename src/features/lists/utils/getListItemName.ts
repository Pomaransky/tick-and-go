import type { TFunction } from "i18next";

import type { ListItem } from "@/features/lists/types";
import type { Product } from "@/features/products/types";
import { getProductName } from "@/features/products/utils/getProductName";

export function getListItemName(
  item: ListItem,
  products: Record<string, Product>,
  t: TFunction,
): string {
  const product = item.productId ? products[item.productId] : undefined;
  return product ? getProductName(product, t) : (item.name ?? "");
}
