import { router, Stack, useLocalSearchParams } from "expo-router";
import { CircleCheck, Pencil, Plus, Trash2 } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";

import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { SuggestionChips } from "@/components/suggestion-chips";
import { removeListItem } from "@/features/lists/actions/removeListItem";
import { updateListItem } from "@/features/lists/actions/updateListItem";
import { getListItemName } from "@/features/lists/utils/getListItemName";
import { useProducts } from "@/features/products/hooks/useProducts";
import { formatQuantity } from "@/features/products/utils/formatQuantity";
import { useSuggestions } from "@/features/search/hooks/useSuggestions";
import { useAppStore } from "@/store/useAppStore";
import { normalizeText } from "@/utils/normalizeText";

export default function ListEditor() {
  const { t, i18n } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const list = useAppStore((state) => state.lists[id]);
  const products = useAppStore((state) => state.products);
  const productsWithNames = useProducts();
  const [query, setQuery] = useState("");

  const suggestionItems = useMemo(
    () =>
      productsWithNames.map(({ product, name }) => ({
        id: product.id,
        name,
        usageCount: product.usageCount,
      })),
    [productsWithNames],
  );
  const { suggestions } = useSuggestions(suggestionItems, query);

  const itemCount = list?.items.length ?? 0;
  const previousItemCount = useRef(itemCount);
  useEffect(() => {
    if (itemCount > previousItemCount.current) {
      setQuery("");
    }
    previousItemCount.current = itemCount;
  }, [itemCount]);

  if (!list) {
    return null;
  }

  const trimmedQuery = query.trim();

  const openAddItem = (params: { productId: string } | { name: string }) => {
    router.push({
      pathname: "/lists/[id]/add",
      params: { id: list.id, ...params },
    });
  };

  const submitQuery = () => {
    if (!trimmedQuery) {
      return;
    }
    const normalizedQuery = normalizeText(trimmedQuery);
    const match = suggestionItems.find(
      (item) => normalizeText(item.name) === normalizedQuery,
    );
    openAddItem(match ? { productId: match.id } : { name: trimmedQuery });
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <Stack.Title>{list.name}</Stack.Title>
      <View className="gap-3 border-b border-border p-4 dark:border-border-dark">
        <View className="flex-row items-center gap-2">
          <Input
            className="flex-1"
            placeholder={t("common.listEditor.searchPlaceholder")}
            returnKeyType="done"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={submitQuery}
          />
          <Pressable
            accessibilityLabel={t("common.listEditor.add")}
            accessibilityRole="button"
            accessibilityState={{ disabled: !trimmedQuery }}
            className={
              trimmedQuery
                ? "size-12 items-center justify-center rounded-lg bg-primary active:opacity-80"
                : "size-12 items-center justify-center rounded-lg bg-primary opacity-40"
            }
            disabled={!trimmedQuery}
            onPress={submitQuery}
          >
            <Icon as={Plus} className="size-6 text-primary-foreground" />
          </Pressable>
        </View>
        <SuggestionChips
          suggestions={suggestions}
          query={query}
          onSelect={(item) => openAddItem({ productId: item.id })}
        />
      </View>
      <FlatList
        data={list.items}
        contentContainerClassName="gap-2 p-4"
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-2 rounded-lg border border-border px-2 py-3 dark:border-border-dark">
            <Pressable
              accessibilityLabel={t("common.delete")}
              accessibilityRole="button"
              className="p-2"
              hitSlop={4}
              onPress={() => removeListItem(list.id, item.id)}
            >
              <Icon as={Trash2} className="size-5 text-danger" />
            </Pressable>
            <Text
              className={
                item.checked
                  ? "flex-1 text-base text-primary line-through"
                  : "flex-1 text-base text-foreground dark:text-foreground-dark"
              }
            >
              {getListItemName(item, products, t)}
            </Text>
            <Text
              className={
                item.checked
                  ? "text-sm text-primary line-through"
                  : "text-sm text-muted dark:text-muted-dark"
              }
            >
              {formatQuantity(item.quantity, item.unit, i18n.language, t)}
            </Text>
            <View className="flex-row items-center">
              <Pressable
                accessibilityLabel={t("common.edit")}
                accessibilityRole="button"
                className="p-2"
                hitSlop={4}
                onPress={() =>
                  router.push({
                    pathname: "/lists/[id]/edit",
                    params: { id: list.id, itemId: item.id },
                  })
                }
              >
                <Icon
                  as={Pencil}
                  className="size-5 text-muted dark:text-muted-dark"
                />
              </Pressable>
              <Pressable
                accessibilityLabel={t("common.listEditor.markBought")}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.checked }}
                className="p-2"
                hitSlop={4}
                onPress={() =>
                  updateListItem(list.id, item.id, { checked: !item.checked })
                }
              >
                <Icon
                  as={CircleCheck}
                  strokeWidth={item.checked ? 3 : 2}
                  className={
                    item.checked
                      ? "size-7 text-primary"
                      : "size-7 text-muted dark:text-muted-dark"
                  }
                />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="p-4 text-center text-muted dark:text-muted-dark">
            {t("common.listEditor.empty")}
          </Text>
        }
      />
    </View>
  );
}
