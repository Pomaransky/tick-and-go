import type { Unit } from "@/data/units";

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
