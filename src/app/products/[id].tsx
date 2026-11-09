import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { ProductForm } from "@/features/products/components/product-form";
import { updateProductDefaults } from "@/features/products/actions/updateProductDefaults";
import { productDefaultsSchema } from "@/features/products/productSchemas";
import { formatQuantityInput } from "@/features/products/utils/formatQuantityInput";
import { getProductName } from "@/features/products/utils/getProductName";
import { useAppStore } from "@/store/useAppStore";

export default function EditProduct() {
  const { t, i18n } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = useAppStore((state) => state.products[id]);

  if (!product) {
    return null;
  }

  return (
    <ProductForm
      title={getProductName(product, t)}
      schema={productDefaultsSchema}
      initialValues={{
        name: "",
        quantity: formatQuantityInput(product.defaultQuantity, i18n.language),
        unit: product.defaultUnit,
        place: product.defaultPlace ?? "",
        savePlace: false,
      }}
      onSubmit={(data) => updateProductDefaults(product.id, data)}
    />
  );
}
