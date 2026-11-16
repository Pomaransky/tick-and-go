import { router, Stack, useLocalSearchParams } from "expo-router";
import { Plus, Share2 } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { ShoppingList } from "@/components/shopping-list";
import { SuggestionChips } from "@/components/suggestion-chips";
import { removeListItem } from "@/features/lists/actions/removeListItem";
import { updateListItem } from "@/features/lists/actions/updateListItem";
import { useShareList } from "@/features/lists/hooks/useShareList";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useSuggestions } from "@/features/search/hooks/useSuggestions";
import { useAppStore } from "@/store/useAppStore";
import { normalizeText } from "@/utils/normalizeText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ListEditor() {
  const { t, i18n } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const list = useAppStore((state) => state.lists[id]);
  const products = useAppStore((state) => state.products);
  const productsWithNames = useProducts();
  const { shareList } = useShareList();
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets();

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
      <ShoppingList
        items={list.items}
        products={products}
        onDeleteItem={(itemId) => removeListItem(list.id, itemId)}
        onEditItem={(itemId) =>
          router.push({
            pathname: "/lists/[id]/edit",
            params: { id: list.id, itemId },
          })
        }
        onToggleItem={(itemId, checked) =>
          updateListItem(list.id, itemId, { checked })
        }
      />
      <Pressable
        accessibilityLabel={t("common.listEditor.share")}
        accessibilityRole="button"
        className="absolute bottom-16 right-4 size-16 items-center justify-center rounded-full bg-primary shadow-lg active:opacity-80"
        onPress={() => {
          void shareList(list.id);
        }}
      >
        <Icon as={Share2} className="size-18 text-primary-foreground" />
      </Pressable>
    </View>
  );
}
