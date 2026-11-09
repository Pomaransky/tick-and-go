import type { ProductKey } from "@/data/seedProducts";
import type { Unit } from "@/data/units";
import type { Language } from "@/i18n/resources";

export type { Language, ProductKey, Unit };

export type LanguageSetting = Language | "system";

export interface Product {
  id: string;
  key?: ProductKey;
  name?: string;
  defaultUnit: Unit;
  defaultQuantity: number;
  defaultPlace?: string;
  usageCount: number;
}

export interface ListItem {
  id: string;
  productId: string;
  quantity: number;
  unit: Unit;
  checked: boolean;
  place?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ListItem[];
  createdAt: number;
  updatedAt: number;
}

export interface PersistedState {
  settings: {
    language: LanguageSetting;
  };
  products: Record<string, Product>;
  lists: Record<string, ShoppingList>;
}
