import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Share } from "react-native";

import { encodeSharedList } from "@/features/lists/utils/encodeSharedList";
import { useAppStore } from "@/store/useAppStore";

const GITHUB_PAGES_URL="https://pomaransky.github.io/tick-and-go";

export function useShareList() {
  const { t } = useTranslation();

  const shareList = useCallback(
    async (listId: string) => {
      const listData = useAppStore.getState().lists[listId];
      if (!listData) {
        return;
      }

      try {
        const url = `${GITHUB_PAGES_URL}?data=${encodeSharedList(listData)}`;

        await Share.share({
          message: t("common.listEditor.shareMessage", { url }),
        });
      } catch (error) {
        console.error("Error sharing list:", error);
      }
    },
    [t],
  );

  return { shareList };
}
