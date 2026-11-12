import { useAppStore } from "@/store/useAppStore";

export function removeListItem(listId: string, itemId: string) {
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
          items: list.items.filter((item) => item.id !== itemId),
          updatedAt: Date.now(),
        },
      },
    };
  });
}
