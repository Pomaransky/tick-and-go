import { z } from "zod";

import { Unit } from "@/data/units";

export const productDefaultsSchema = z.object({
  quantity: z
    .string()
    .trim()
    .transform((value) => Number(value.replace(",", ".")))
    .pipe(z.number().positive()),
  unit: z.enum(Unit),
  place: z
    .string()
    .trim()
    .transform((value) => value || undefined),
  savePlace: z.boolean(),
});

export type ProductDefaultsInput = z.input<typeof productDefaultsSchema>;
export type ProductDefaults = z.output<typeof productDefaultsSchema>;
