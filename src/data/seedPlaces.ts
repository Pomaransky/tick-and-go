import type { resources } from "@/i18n/resources";

export type PlaceKey = keyof (typeof resources)["en"]["translation"]["places"];

export const seedPlaces: readonly { key: PlaceKey }[] = [
  { key: "market" },
  { key: "bakery" },
  { key: "lidl" },
  { key: "biedronka" },
];

export function seedPlaceId(key: PlaceKey): string {
  return `seed:${key}`;
}
