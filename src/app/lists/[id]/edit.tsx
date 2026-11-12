import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { updateListItem } from "@/features/lists/actions/updateListItem";
import { getListItemName } from "@/features/lists/utils/getListItemName";
import { updateProductDefaults } from "@/features/products/actions/updateProductDefaults";
import { ProductForm } from "@/features/products/components/product-form";
import {
  createNewProductSchema,
  productDefaultsSchema,
} from "@/features/products/productSchemas";
import { formatQuantityInput } from "@/features/products/utils/formatQuantityInput";
import { useAppStore } from "@/store/useAppStore";

const oneTimeItemSchema = createNewProductSchema(new Set());

export default function EditListItem() {
  const { t, i18n } = useTranslation();
  const { id, itemId } = useLocalSearchParams<{ id: string; itemId: string }>();
  const item = useAppStore((state) =>
    state.lists[id]?.items.find((listItem) => listItem.id === itemId),
  );
  const products = useAppStore((state) => state.products);

  if (!item) {
    return null;
  }

  const name = getListItemName(item, products, t);
  const initialValues = {
    name,
    quantity: formatQuantityInput(item.quantity, i18n.language),
    unit: item.unit,
    place: item.place ?? "",
    savePlace: false,
  };
  const common = {
    quantityLabel: t("common.addItem.quantity"),
    initialValues,
  };

  if (item.productId) {
    const productId = item.productId;
    return (
      <ProductForm
        {...common}
        title={name}
        schema={productDefaultsSchema}
        toggleLabel={t("common.addItem.setDefault")}
        onSubmit={(data, setDefault) => {
          if (setDefault) {
            updateProductDefaults(productId, data);
          }
          updateListItem(id, item.id, {
            quantity: data.quantity,
            unit: data.unit,
            place: data.place,
          });
        }}
      />
    );
  }

  return (
    <ProductForm
      {...common}
      title={name}
      schema={oneTimeItemSchema}
      showName
      onSubmit={(data) =>
        updateListItem(id, item.id, {
          name: data.name,
          quantity: data.quantity,
          unit: data.unit,
          place: data.place,
        })
      }
    />
  );
}
