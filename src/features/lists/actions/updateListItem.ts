import type { ListItem } from "@/features/lists/types";
import { useAppStore } from "@/store/useAppStore";

export function updateListItem(
  listId: string,
  itemId: string,
  changes: Partial<Omit<ListItem, "id">>,
) {
  useAppStore.setState((state) => {
    const list = state.lists[listId];
    if (!list) {
      return state;
    }
    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          items: list.items.map((item) =>
            item.id === itemId ? { ...item, ...changes } : item,
          ),
          updatedAt: Date.now(),
        },
      },
    };
  });
}
