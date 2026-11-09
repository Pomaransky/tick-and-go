import { ScrollView } from "react-native";

import { Chip } from "@/components/chip";
import type { SuggestionItem } from "@/features/search/types";
import { normalizeText } from "@/utils/normalizeText";

interface SuggestionChipsProps<T extends SuggestionItem> {
  suggestions: readonly T[];
  query: string;
  onSelect: (item: T) => void;
}

export function SuggestionChips<T extends SuggestionItem>({
  suggestions,
  query,
  onSelect,
}: SuggestionChipsProps<T>) {
  if (suggestions.length === 0) {
    return null;
  }

  const normalizedQuery = normalizeText(query);

  return (
    <ScrollView
      horizontal
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
    >
      {suggestions.map((item) => (
        <Chip
          key={item.id}
          label={item.name}
          selected={normalizeText(item.name) === normalizedQuery}
          onPress={() => onSelect(item)}
        />
      ))}
    </ScrollView>
  );
}
