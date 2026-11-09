export interface SuggestionItem {
  id: string;
  name: string;
  usageCount: number;
}

export interface IndexedItem<T> {
  item: T;
  normalizedName: string;
}
