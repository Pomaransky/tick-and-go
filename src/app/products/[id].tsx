import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Chip } from "@/components/chip";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { PlaceInput } from "@/components/place-input";
import { Unit, units } from "@/data/units";
import { recordPlaceUsage } from "@/features/places/actions";
import { updateProductDefaults } from "@/features/products/actions";
import { getProductName } from "@/features/products/format";
import {
  productDefaultsSchema,
  type ProductDefaultsInput,
} from "@/features/products/productDefaultsSchema";
import { useAppStore } from "@/store/useAppStore";

export default function EditProduct() {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = useAppStore((state) => state.products[id]);

  const [form, setForm] = useState<ProductDefaultsInput>(() => ({
    quantity: product
      ? new Intl.NumberFormat(i18n.language, {
          useGrouping: false,
          maximumFractionDigits: 3,
        }).format(product.defaultQuantity)
      : "",
    unit: product?.defaultUnit ?? Unit.PCS,
    place: product?.defaultPlace ?? "",
    savePlace: false,
  }));
  const [quantityError, setQuantityError] = useState(false);

  if (!product) {
    return null;
  }

  const save = () => {
    const result = productDefaultsSchema.safeParse(form);
    if (!result.success) {
      setQuantityError(
        result.error.issues.some((issue) => issue.path[0] === "quantity"),
      );
      return;
    }
    updateProductDefaults(product.id, result.data);
    if (result.data.place) {
      recordPlaceUsage(result.data.place, result.data.savePlace);
    }
    router.back();
  };

  return (
    <View
      className="gap-5 bg-background p-6 dark:bg-background-dark"
      style={{ paddingBottom: insets.bottom + 24 }}
    >
      <View className="flex-row items-center justify-between gap-3">
        <Text className="flex-1 text-xl font-bold text-foreground dark:text-foreground-dark">
          {getProductName(product, t)}
        </Text>
        <Pressable
          accessibilityLabel={t("common.close")}
          accessibilityRole="button"
          className="-mr-2 p-2"
          hitSlop={8}
          onPress={() => router.back()}
        >
          <Icon
            as={X}
            className="size-6 text-foreground dark:text-foreground-dark"
          />
        </Pressable>
      </View>

      <View className="gap-2">
        <Text className="text-sm text-muted dark:text-muted-dark">
          {t("common.productForm.quantity")}
        </Text>
        <Input
          keyboardType="decimal-pad"
          value={form.quantity}
          onChangeText={(quantity) => {
            setForm((current) => ({ ...current, quantity }));
            setQuantityError(false);
          }}
        />
        {quantityError && (
          <Text className="text-sm text-danger">
            {t("common.productForm.quantityError")}
          </Text>
        )}
      </View>

      <View className="gap-2">
        <Text className="text-sm text-muted dark:text-muted-dark">
          {t("common.productForm.unit")}
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {units.map((unit) => (
            <Chip
              key={unit}
              label={t(`units.${unit}`)}
              selected={form.unit === unit}
              onPress={() => setForm((current) => ({ ...current, unit }))}
            />
          ))}
        </View>
      </View>

      <PlaceInput
        value={form.place}
        onChangeText={(place) => setForm((current) => ({ ...current, place }))}
        savePlace={form.savePlace}
        onSavePlaceChange={(savePlace) =>
          setForm((current) => ({ ...current, savePlace }))
        }
      />

      <Pressable
        accessibilityRole="button"
        className="items-center rounded-lg bg-primary py-3 active:opacity-80"
        onPress={save}
      >
        <Text className="text-base font-semibold text-primary-foreground">
          {t("common.save")}
        </Text>
      </Pressable>
    </View>
  );
}
