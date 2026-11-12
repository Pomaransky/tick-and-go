import { randomUUID } from "expo-crypto";

import { useAppStore } from "@/store/useAppStore";

export function createList(name: string): string {
  const id = randomUUID();
  const now = Date.now();
  useAppStore.setState((state) => ({
    lists: {
      ...state.lists,
      [id]: { id, name, items: [], createdAt: now, updatedAt: now },
    },
  }));
  return id;
}
