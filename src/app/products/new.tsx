import { useTranslation } from "react-i18next";

import { ProductForm } from "@/features/products/components/product-form";
import { Unit } from "@/data/units";
import { addProduct } from "@/features/products/actions/addProduct";
import { createNewProductSchema } from "@/features/products/productSchemas";
import { useProducts } from "@/features/products/hooks/useProducts";
import { formatQuantityInput } from "@/features/products/utils/formatQuantityInput";
import { normalizeText } from "@/utils/normalizeText";

export default function NewProduct() {
  const { t, i18n } = useTranslation();
  const products = useProducts();
  const existingNames = new Set(
    products.map(({ name }) => normalizeText(name)),
  );

  return (
    <ProductForm
      title={t("common.productForm.newTitle")}
      schema={createNewProductSchema(existingNames)}
      showName
      initialValues={{
        name: "",
        quantity: formatQuantityInput(1, i18n.language),
        unit: Unit.PCS,
        place: "",
        savePlace: false,
      }}
      onSubmit={addProduct}
    />
  );
}
