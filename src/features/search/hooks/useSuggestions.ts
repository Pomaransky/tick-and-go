import { useMemo } from "react";

import type { SuggestionItem } from "@/features/search/types";
import {
  DEFAULT_SUGGESTION_LIMIT,
  getSuggestions,
} from "@/features/search/utils/getSuggestions";
import { indexSuggestionItems } from "@/features/search/utils/indexSuggestionItems";

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
