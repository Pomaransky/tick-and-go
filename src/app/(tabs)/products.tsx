import { router } from "expo-router";
import { Pencil, Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";

import { Icon } from "@/components/icon";
import { formatQuantity } from "@/features/products/format";
import { useProducts } from "@/features/products/useProducts";

export default function Products() {
  const { t, i18n } = useTranslation();
  const products = useProducts();

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <FlatList
        data={products}
        contentContainerClassName="gap-2 p-4 pb-24"
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-3 rounded-lg border border-border py-3 pl-4 pr-2 dark:border-border-dark">
            <Text className="flex-1 text-base text-foreground dark:text-foreground-dark">
              {item.name}
            </Text>
            <Text className="text-sm text-muted dark:text-muted-dark">
              {formatQuantity(
                item.product.defaultQuantity,
                item.product.defaultUnit,
                i18n.language,
                t,
              )}
            </Text>
            <Pressable
              accessibilityLabel={t("common.edit")}
              accessibilityRole="button"
              className="p-2"
              hitSlop={8}
              onPress={() =>
                router.push({
                  pathname: "/products/[id]",
                  params: { id: item.product.id },
                })
              }
            >
              <Icon
                as={Pencil}
                className="size-5 text-muted dark:text-muted-dark"
              />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text className="p-4 text-center text-muted dark:text-muted-dark">
            {t("common.productsEmpty")}
          </Text>
        }
      />
      <Pressable
        accessibilityLabel={t("common.addProduct")}
        accessibilityRole="button"
        className="absolute bottom-4 right-4 size-16 items-center justify-center rounded-full bg-primary shadow-lg active:opacity-80"
        onPress={() => console.log("add product")}
      >
        <Icon as={Plus} className="size-18 text-primary-foreground" />
      </Pressable>
    </View>
  );
}
