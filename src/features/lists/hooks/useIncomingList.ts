import { useMemo } from "react";

import type { ShoppingList } from "@/features/lists/types";
import { decodeSharedList } from "@/features/lists/utils/decodeSharedLits";

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function useIncomingList(
  data: string | string[] | undefined,
): { list: Omit<ShoppingList, 'createdAt'>; error: null } | { list: null; error: "invalid" } {
  const encoded = firstParam(data);
  return useMemo(() => {
    if (!encoded) {
      return { list: null, error: "invalid" };
    }

    const list = decodeSharedList(encoded);
    if (!list) {
      return { list: null, error: "invalid" };
    }

    return { list, error: null };
  }, [data, encoded]);
}
