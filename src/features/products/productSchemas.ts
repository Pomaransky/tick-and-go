import { z } from "zod";

import { Unit } from "@/data/units";
import { normalizeText } from "@/utils/normalizeText";

export type ProductFormErrorCode =
  "quantityInvalid" | "nameRequired" | "nameDuplicate";

export const productDefaultsSchema = z.object({
  quantity: z
    .string()
    .trim()
    .transform((value) => Number(value.replace(",", ".")))
    .pipe(
      z
        .number({ error: "quantityInvalid" })
        .positive({ error: "quantityInvalid" }),
    ),
  unit: z.enum(Unit),
  place: z
    .string()
    .trim()
    .transform((value) => value || undefined),
  savePlace: z.boolean(),
});

export function createNewProductSchema(existingNames: ReadonlySet<string>) {
  return productDefaultsSchema.extend({
    name: z
      .string()
      .trim()
      .min(1, { error: "nameRequired" })
      .refine((name) => !existingNames.has(normalizeText(name)), {
        error: "nameDuplicate",
      }),
  });
}

export type ProductFormValues = z.input<
  ReturnType<typeof createNewProductSchema>
>;
export type ProductDefaults = z.output<typeof productDefaultsSchema>;
export type NewProduct = z.output<ReturnType<typeof createNewProductSchema>>;
