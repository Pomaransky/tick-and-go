import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PersistedState } from "@/types";

import { applySeed } from "./seed";
import { mmkvStorage } from "./storage";

const initialState: PersistedState = applySeed({
  settings: {
    language: "system",
  },
  products: {},
  lists: {},
});

export const useAppStore = create<PersistedState>()(
  persist(() => initialState, {
    name: "app-state",
    storage: createJSONStorage(() => mmkvStorage),
    version: 1,
    merge: (persistedState, currentState) =>
      applySeed({
        ...currentState,
        ...(persistedState as Partial<PersistedState>),
      }),
  }),
);
