import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { SuggestionItem } from "@/features/search/useSuggestions";
import { useAppStore } from "@/store/useAppStore";

import { getPlaceName } from "./format";

export function usePlaces(): SuggestionItem[] {
  const { t } = useTranslation();
  const places = useAppStore((state) => state.places);

  return useMemo(
    () =>
      Object.values(places).map((place) => ({
        id: place.id,
        name: getPlaceName(place, t),
        usageCount: place.usageCount,
      })),
    [places, t],
  );
}
