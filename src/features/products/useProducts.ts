import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { seedProductId, seedProducts } from "@/data/seedProducts";
import { useAppStore } from "@/store/useAppStore";
import type { Product } from "@/types";

import { getProductName } from "./format";

export interface ProductWithName {
  product: Product;
  name: string;
}

export function useProducts(): ProductWithName[] {
  const { t } = useTranslation();
  const products = useAppStore((state) => state.products);

  return useMemo(() => {
    const custom = Object.values(products).filter((product) => !product.key);
    const predefined = seedProducts.map(
      (seed) => products[seedProductId(seed.key)],
    );
    return [...custom, ...predefined].map((product) => ({
      product,
      name: getProductName(product, t),
    }));
  }, [products, t]);
}
