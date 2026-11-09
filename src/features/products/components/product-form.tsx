import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { z } from "zod";

import { Chip } from "@/components/chip";
import { Field } from "@/components/field";
import { Icon } from "@/components/icon";
import { Input } from "@/components/input";
import { PlaceInput } from "@/components/place-input";
import { units } from "@/data/units";
import { recordPlaceUsage } from "@/features/places/actions/recordPlaceUsage";
import type {
  ProductDefaults,
  ProductFormErrorCode,
  ProductFormValues,
} from "@/features/products/productSchemas";

type FieldErrors = Partial<
  Record<keyof ProductFormValues, ProductFormErrorCode>
>;

interface ProductFormProps<TOutput extends ProductDefaults> {
  title: string;
  initialValues: ProductFormValues;
  schema: z.ZodType<TOutput>;
  showName?: boolean;
  onSubmit: (data: TOutput) => void;
}

export function ProductForm<TOutput extends ProductDefaults>({
  title,
  initialValues,
  schema,
  showName = false,
  onSubmit,
}: ProductFormProps<TOutput>) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setField = <K extends keyof ProductFormValues>(
    field: K,
    value: ProductFormValues[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const errorText = (field: keyof ProductFormValues) => {
    const code = errors[field];
    return code ? t(`common.productForm.errors.${code}`) : undefined;
  };

  const save = () => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ProductFormValues;
        nextErrors[field] ??= issue.message as ProductFormErrorCode;
      }
      setErrors(nextErrors);
      return;
    }
    onSubmit(result.data);
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
          {title}
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

      {showName && (
        <Field label={t("common.productForm.name")} error={errorText("name")}>
          <Input
            autoFocus
            placeholder={t("common.productForm.namePlaceholder")}
            value={form.name}
            onChangeText={(name) => setField("name", name)}
          />
        </Field>
      )}

      <Field
        label={t("common.productForm.quantity")}
        error={errorText("quantity")}
      >
        <Input
          keyboardType="decimal-pad"
          value={form.quantity}
          onChangeText={(quantity) => setField("quantity", quantity)}
        />
      </Field>

      <Field label={t("common.productForm.unit")}>
        <View className="flex-row flex-wrap gap-2">
          {units.map((unit) => (
            <Chip
              key={unit}
              label={t(`units.${unit}`)}
              selected={form.unit === unit}
              onPress={() => setField("unit", unit)}
            />
          ))}
        </View>
      </Field>

      <PlaceInput
        value={form.place}
        onChangeText={(place) => setField("place", place)}
        savePlace={form.savePlace}
        onSavePlaceChange={(savePlace) => setField("savePlace", savePlace)}
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
