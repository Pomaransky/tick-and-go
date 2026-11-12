import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { Unit } from "@/data/units";
import { addListItem } from "@/features/lists/actions/addListItem";
import { addProduct } from "@/features/products/actions/addProduct";
import { updateProductDefaults } from "@/features/products/actions/updateProductDefaults";
import { ProductForm } from "@/features/products/components/product-form";
import { useProducts } from "@/features/products/hooks/useProducts";
import {
  createNewProductSchema,
  productDefaultsSchema,
} from "@/features/products/productSchemas";
import { formatQuantityInput } from "@/features/products/utils/formatQuantityInput";
import { getProductName } from "@/features/products/utils/getProductName";
import { useAppStore } from "@/store/useAppStore";
import { normalizeText } from "@/utils/normalizeText";

export default function AddListItem() {
  const { t, i18n } = useTranslation();
  const { id, productId, name } = useLocalSearchParams<{
    id: string;
    productId?: string;
    name?: string;
  }>();
  const product = useAppStore((state) =>
    productId ? state.products[productId] : undefined,
  );
  const products = useProducts();

  const common = {
    quantityLabel: t("common.addItem.quantity"),
    submitLabel: t("common.addItem.submit"),
  };

  if (product) {
    return (
      <ProductForm
        {...common}
        title={getProductName(product, t)}
        schema={productDefaultsSchema}
        toggleLabel={t("common.addItem.setDefault")}
        initialValues={{
          name: "",
          quantity: formatQuantityInput(product.defaultQuantity, i18n.language),
          unit: product.defaultUnit,
          place: product.defaultPlace ?? "",
          savePlace: false,
        }}
        onSubmit={(data, setDefault) => {
          if (setDefault) {
            updateProductDefaults(product.id, data);
          }
          addListItem(id, {
            productId: product.id,
            quantity: data.quantity,
            unit: data.unit,
            place: data.place,
          });
        }}
      />
    );
  }

  const existingNames = new Set(
    products.map((item) => normalizeText(item.name)),
  );

  return (
    <ProductForm
      {...common}
      title={t("common.addItem.newTitle")}
      schema={createNewProductSchema(existingNames)}
      showName
      toggleLabel={t("common.addItem.saveProduct")}
      initialValues={{
        name: name ?? "",
        quantity: formatQuantityInput(1, i18n.language),
        unit: Unit.PCS,
        place: "",
        savePlace: false,
      }}
      onSubmit={(data, saveProduct) => {
        const item = {
          quantity: data.quantity,
          unit: data.unit,
          place: data.place,
        };
        if (saveProduct) {
          addListItem(id, { ...item, productId: addProduct(data) });
        } else {
          addListItem(id, { ...item, name: data.name });
        }
      }}
    />
  );
}
