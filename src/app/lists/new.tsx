import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Field } from "@/components/field";
import { FormSheet } from "@/components/form-sheet";
import { Input } from "@/components/input";
import { createList } from "@/features/lists/actions/createList";
import {
  type ListFormErrorCode,
  listNameSchema,
} from "@/features/lists/listSchemas";

export default function NewList() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [error, setError] = useState<ListFormErrorCode>();

  const submit = () => {
    const result = listNameSchema.safeParse(name);
    if (!result.success) {
      setError(result.error.issues[0]?.message as ListFormErrorCode);
      return;
    }
    const id = createList(result.data);
    router.replace({ pathname: "/lists/[id]", params: { id } });
  };

  return (
    <FormSheet
      title={t("common.listForm.newTitle")}
      submitLabel={t("common.listForm.create")}
      onSubmit={submit}
    >
      <Field
        label={t("common.listForm.name")}
        error={error && t(`common.listForm.errors.${error}`)}
      >
        <Input
          autoFocus
          placeholder={t("common.listForm.namePlaceholder")}
          returnKeyType="done"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setError(undefined);
          }}
          onSubmitEditing={submit}
        />
      </Field>
    </FormSheet>
  );
}
