import type { IndexedItem, SuggestionItem } from "@/features/search/types";
import { normalizeText } from "@/utils/normalizeText";

export function indexSuggestionItems<T extends SuggestionItem>(
  items: readonly T[],
): IndexedItem<T>[] {
  return items.map((item) => ({
    item,
    normalizedName: normalizeText(item.name),
  }));
}
