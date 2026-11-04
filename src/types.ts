import type { Unit } from "@/data/units";
import type { Language } from "@/i18n/resources";

export type { Language, Unit };

export type LanguageSetting = Language | "system";

export interface Product {
  id: string;
  key?: string;
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
  seedVersion: number;
  settings: {
    language: LanguageSetting;
  };
  products: Record<string, Product>;
  lists: Record<string, ShoppingList>;
}
