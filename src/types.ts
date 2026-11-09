import type { PlaceKey } from "@/data/seedPlaces";
import type { ProductKey } from "@/data/seedProducts";
import type { Unit } from "@/data/units";
import type { Language } from "@/i18n/resources";

export type { Language, PlaceKey, ProductKey, Unit };

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

export interface Place {
  id: string;
  key?: PlaceKey;
  name?: string;
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
  places: Record<string, Place>;
  lists: Record<string, ShoppingList>;
}
