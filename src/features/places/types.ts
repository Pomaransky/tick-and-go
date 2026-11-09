import type { PlaceKey } from "@/data/seedPlaces";

export interface Place {
  id: string;
  key?: PlaceKey;
  name?: string;
  usageCount: number;
}
