import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";

import { Icon } from "@/components/icon";
import { useLists } from "@/features/lists/hooks/useLists";
import { formatDate } from "@/utils/formatDate";

export default function Lists() {
  const { t, i18n } = useTranslation();
  const lists = useLists();

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <FlatList
        data={lists}
        contentContainerClassName="gap-2 p-4 pb-24"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-lg border border-border px-4 py-3 active:opacity-70 dark:border-border-dark"
            onPress={() =>
              router.push({ pathname: "/lists/[id]", params: { id: item.id } })
            }
          >
            <Text className="flex-1 text-base text-foreground dark:text-foreground-dark">
              {item.name}
            </Text>
            <Text className="text-sm text-muted dark:text-muted-dark">
              {formatDate(item.createdAt, i18n.language)}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text className="p-4 text-center text-muted dark:text-muted-dark">
            {t("common.listsEmpty")}
          </Text>
        }
      />
      <Pressable
        accessibilityLabel={t("common.addList")}
        accessibilityRole="button"
        className="absolute bottom-4 right-4 size-16 items-center justify-center rounded-full bg-primary shadow-lg active:opacity-80"
        onPress={() => router.push("/lists/new")}
      >
        <Icon as={Plus} className="size-18 text-primary-foreground" />
      </Pressable>
    </View>
  );
}
