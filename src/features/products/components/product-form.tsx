import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import type { z } from "zod";

import { Checkbox } from "@/components/checkbox";
import { Chip } from "@/components/chip";
import { Field } from "@/components/field";
import { FormSheet } from "@/components/form-sheet";
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
  quantityLabel?: string;
  submitLabel?: string;
  toggleLabel?: string;
  onSubmit: (data: TOutput, toggled: boolean) => void;
}

export function ProductForm<TOutput extends ProductDefaults>({
  title,
  initialValues,
  schema,
  showName = false,
  quantityLabel,
  submitLabel,
  toggleLabel,
  onSubmit,
}: ProductFormProps<TOutput>) {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [toggled, setToggled] = useState(false);

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
    onSubmit(result.data, toggled);
    if (result.data.place) {
      recordPlaceUsage(result.data.place, result.data.savePlace);
    }
    router.back();
  };

  return (
    <FormSheet
      title={title}
      submitLabel={submitLabel ?? t("common.save")}
      onSubmit={save}
    >
      {showName && (
        <Field label={t("common.productForm.name")} error={errorText("name")}>
          <Input
            autoFocus={!initialValues.name}
            placeholder={t("common.productForm.namePlaceholder")}
            value={form.name}
            onChangeText={(name) => setField("name", name)}
          />
        </Field>
      )}

      <Field
        label={quantityLabel ?? t("common.productForm.quantity")}
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

      {toggleLabel && (
        <Checkbox label={toggleLabel} checked={toggled} onChange={setToggled} />
      )}
    </FormSheet>
  );
}
