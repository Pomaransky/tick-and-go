import { useMemo } from "react";

import type { ShoppingList } from "@/features/lists/types";
import { useAppStore } from "@/store/useAppStore";

export function useLists(): ShoppingList[] {
  const lists = useAppStore((state) => state.lists);

  return useMemo(
    () => Object.values(lists).sort((a, b) => b.createdAt - a.createdAt),
    [lists],
  );
}
