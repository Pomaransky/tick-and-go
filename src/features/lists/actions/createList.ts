import { useAppStore } from "@/store/useAppStore";
import { generateShortId } from "@/utils/generateShortId";

export function createList(name: string): string {
  const id = generateShortId();
  const now = Date.now();
  useAppStore.setState((state) => ({
    lists: {
      ...state.lists,
      [id]: { id, name, items: [], createdAt: now },
    },
  }));
  return id;
}
