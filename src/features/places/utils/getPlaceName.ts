import type { TFunction } from "i18next";

import type { Place } from "@/features/places/types";

export function getPlaceName(place: Place, t: TFunction): string {
  if (place.key) {
    return t(`places.${place.key}`);
  }
  return place.name ?? "";
}
