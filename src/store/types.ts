import type { ShoppingList } from "@/features/lists/types";
import type { Place } from "@/features/places/types";
import type { Product } from "@/features/products/types";
import type { LanguageSetting } from "@/features/settings/types";

export interface PersistedState {
  settings: {
    language: LanguageSetting;
  };
  products: Record<string, Product>;
  places: Record<string, Place>;
  lists: Record<string, ShoppingList>;
}
