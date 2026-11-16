import { ListItem } from "@/features/lists/types";
import { getListItemName } from "@/features/lists/utils/getListItemName";
import { Product } from "@/features/products/types";
import { formatQuantity } from "@/features/products/utils/formatQuantity";
import { CircleCheck, Pencil, Trash2 } from "lucide-react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SectionList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "./icon";

type ShoppingListProps = {
  items: ListItem[];
  products: Record<string, Product>;
  onDeleteItem: (itemId: string) => void;
  onEditItem: (itemId: string) => void;
  onToggleItem: (itemId: string, checked: boolean) => void;
};

export function ShoppingList({
  items,
  products,
  onDeleteItem,
  onEditItem,
  onToggleItem,
}: ShoppingListProps) {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();

  const sections = useMemo(() => {
    const grouped: Record<string, ListItem[]> = {};
    const withoutPlace: ListItem[] = [];

    items.forEach((item) => {
      const placeName = item.place?.trim();

      if (!placeName) {
        withoutPlace.push(item);
      } else {
        if (!grouped[placeName]) {
          grouped[placeName] = [];
        }
        grouped[placeName].push(item);
      }
    });

    const result = Object.keys(grouped).map((title) => ({
      title,
      data: grouped[title],
    }));

    if (withoutPlace.length > 0) {
      result.push({
        title: t("places.other"),
        data: withoutPlace,
      });
    }

    return result;
  }, [items, t]);

  return (
    <SectionList
      sections={sections}
      contentContainerClassName="gap-2 p-4"
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.id}
      extraData={items}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 72,
      }}
      stickySectionHeadersEnabled={true}
      renderSectionHeader={({ section: { title } }) => {
        if (sections.length <= 1) {
          return null;
        }
        return (
          <View>
            <Text className="text-center text-lg text-muted">{title}</Text>
          </View>
        )

      }}
      renderItem={({ item }) => (
        <View className="flex-row items-center gap-2 rounded-lg border border-border px-2 py-3 dark:border-border-dark">
          <Pressable
            accessibilityLabel={t("common.delete")}
            accessibilityRole="button"
            className="p-2"
            hitSlop={4}
            onPress={() => onDeleteItem(item.id)}
          >
            <Icon as={Trash2} className="size-5 text-danger" />
          </Pressable>

          <Text
            key={`name-${item.checked}`}
            className={
              item.checked
                ? "flex-1 text-base text-primary line-through"
                : "flex-1 text-base text-foreground dark:text-foreground-dark"
            }
          >
            {getListItemName(item, products, t)}
          </Text>

          <Text
            key={`qty-${item.checked}`}
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
              onPress={() => onEditItem(item.id)}
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
              onPress={() => onToggleItem(item.id, !item.checked)}
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
  );
}
