import type { IndexedItem, SuggestionItem } from "@/features/search/types";
import { normalizeText } from "@/utils/normalizeText";

export const DEFAULT_SUGGESTION_LIMIT = 10;

export function getSuggestions<T extends SuggestionItem>(
  indexed: readonly IndexedItem<T>[],
  query: string,
  limit = DEFAULT_SUGGESTION_LIMIT,
) {
  const normalizedQuery = normalizeText(query);

  const hasExactMatch =
    normalizedQuery !== "" &&
    indexed.some(({ normalizedName }) => normalizedName === normalizedQuery);

  const suggestions = indexed
    .filter(({ normalizedName }) => normalizedName.includes(normalizedQuery))
    .sort((a, b) => {
      const aPrefix = a.normalizedName.startsWith(normalizedQuery) ? 0 : 1;
      const bPrefix = b.normalizedName.startsWith(normalizedQuery) ? 0 : 1;
      return aPrefix - bPrefix || b.item.usageCount - a.item.usageCount;
    })
    .slice(0, limit)
    .map(({ item }) => item);

  return { suggestions, hasExactMatch };
}
