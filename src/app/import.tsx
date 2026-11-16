import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { importSharedList } from "@/features/lists/actions/importSharedList";
import { useIncomingList } from "@/features/lists/hooks/useIncomingList";

export default function ImportList() {
  const { t } = useTranslation();
  const { data } = useLocalSearchParams<{ data?: string | string[] }>();
  const { list, error } = useIncomingList(data);
  const importedId = useRef<string | null>(null);

  useEffect(() => {
    if (!list || importedId.current) {
      return;
    }

    importedId.current = importSharedList(list);
    router.replace({
      pathname: "/lists/[id]",
      params: { id: importedId.current },
    });
  }, [list]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center gap-4 bg-background p-6 dark:bg-background-dark">
        <Stack.Title>{t("common.listImport.title")}</Stack.Title>
        <Text className="text-center text-base text-foreground dark:text-foreground-dark">
          {t("common.listImport.invalid")}
        </Text>
        <Pressable
          accessibilityRole="button"
          className="rounded-lg bg-primary px-4 py-3 active:opacity-80"
          onPress={() => router.replace("/")}
        >
          <Text className="text-base text-primary-foreground">
            {t("common.close")}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
      <Stack.Title>{t("common.listImport.title")}</Stack.Title>
      <ActivityIndicator />
    </View>
  );
}
