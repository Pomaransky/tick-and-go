import { getPlaceName } from "@/features/places/utils/getPlaceName";
import i18n from "@/i18n";
import { useAppStore } from "@/store/useAppStore";
import { normalizeText } from "@/utils/normalizeText";

export function recordPlaceUsage(name: string, save: boolean) {
  const normalizedName = normalizeText(name);
  if (!normalizedName) {
    return;
  }

  useAppStore.setState((state) => {
    const existing = Object.values(state.places).find(
      (place) => normalizeText(getPlaceName(place, i18n.t)) === normalizedName,
    );

    if (existing) {
      return {
        places: {
          ...state.places,
          [existing.id]: { ...existing, usageCount: existing.usageCount + 1 },
        },
      };
    }

    if (!save) {
      return state;
    }

    const id = `place:${normalizedName}`;
    return {
      places: {
        ...state.places,
        [id]: { id, name: name.trim(), usageCount: 1 },
      },
    };
  });
}
