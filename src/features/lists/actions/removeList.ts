import { useAppStore } from "@/store/useAppStore";

export function removeList(id: string): void {
  useAppStore.setState((state) => {
    const { [id]: _, ...remainingLists } = state.lists;

    return {
      lists: remainingLists,
    };
  });
}