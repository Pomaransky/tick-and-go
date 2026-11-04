import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PersistedState } from "@/types";

import { mmkvStorage } from "./storage";

const initialState: PersistedState = {
  seedVersion: 0,
  settings: {
    language: "system",
  },
  products: {},
  lists: {},
};

export const useAppStore = create<PersistedState>()(
  persist(() => initialState, {
    name: "app-state",
    storage: createJSONStorage(() => mmkvStorage),
    version: 1,
  }),
);
