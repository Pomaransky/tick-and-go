import type { ShoppingList } from "@/features/lists/types";
import { useAppStore } from "@/store/useAppStore";

export function importSharedList(payload: Omit<ShoppingList, "createdAt">): string {
  const now = Date.now();

  useAppStore.setState((state) => {
    const existingList = state.lists[payload.id];

    const listToSave: ShoppingList = {
      ...payload,
      createdAt: existingList ? existingList.createdAt : now,
    };

    return {
      lists: {
        ...state.lists,
        [payload.id]: listToSave,
      },
    };
  });

  return payload.id;
}