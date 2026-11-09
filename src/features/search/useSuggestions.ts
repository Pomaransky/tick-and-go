import { useMemo } from "react";

import { normalizeText } from "@/utils/normalizeText";

export interface SuggestionItem {
  id: string;
  name: string;
  usageCount: number;
}

interface IndexedItem<T> {
  item: T;
  normalizedName: string;
}

export const DEFAULT_SUGGESTION_LIMIT = 10;

export function indexSuggestionItems<T extends SuggestionItem>(
  items: readonly T[],
): IndexedItem<T>[] {
  return items.map((item) => ({
    item,
    normalizedName: normalizeText(item.name),
  }));
}

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

export function useSuggestions<T extends SuggestionItem>(
  items: readonly T[],
  query: string,
  limit = DEFAULT_SUGGESTION_LIMIT,
) {
  const indexed = useMemo(() => indexSuggestionItems(items), [items]);
  return useMemo(
    () => getSuggestions(indexed, query, limit),
    [indexed, query, limit],
  );
}
