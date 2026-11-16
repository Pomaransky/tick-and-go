import type { ListItem } from "@/features/lists/types";
import { useAppStore } from "@/store/useAppStore";
import { generateShortId } from "@/utils/generateShortId";

export function addListItem(
  listId: string,
  item: Omit<ListItem, "id" | "checked">,
) {
  useAppStore.setState((state) => {
    const list = state.lists[listId];
    if (!list) {
      return state;
    }

    const product = item.productId ? state.products[item.productId] : undefined;

    return {
      lists: {
        ...state.lists,
        [listId]: {
          ...list,
          items: [...list.items, { ...item, id: generateShortId(), checked: false }],
        },
      },
      products: product
        ? {
          ...state.products,
          [product.id]: { ...product, usageCount: product.usageCount + 1 },
        }
        : state.products,
    };
  });
}
