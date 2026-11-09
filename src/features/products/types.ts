import type { ProductKey } from "@/data/seedProducts";
import type { Unit } from "@/data/units";

export interface Product {
  id: string;
  key?: ProductKey;
  name?: string;
  defaultUnit: Unit;
  defaultQuantity: number;
  defaultPlace?: string;
  usageCount: number;
}
