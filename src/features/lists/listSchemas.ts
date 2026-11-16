import { z } from "zod";

import { Unit, units } from "@/data/units";

export type ListFormErrorCode = "nameRequired";

export const listNameSchema = z
  .string()
  .trim()
  .min(1, { error: "nameRequired" satisfies ListFormErrorCode });

const sharedListItemSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1).optional(),
  name: z.string().min(1).max(200).optional(),
  quantity: z.number().positive(),
  unit: z.enum(Unit),
  checked: z.boolean().default(false),
  place: z.string().min(1).max(100).optional(),
});

export const sharedListSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  items: z.array(sharedListItemSchema).max(500),
});

// Compact tuple schema: [id, name, [[id, name, quantity, unit, checked(0|1), productId, place], ...]]
const compactItemTupleSchema = z.tuple([
  z.string().min(1), // 0: id
  z.string(),        // 1: name (empty string if undefined)
  z.number().positive(), // 2: quantity
  z.union([z.number().int().min(0).max(units.length - 1), z.enum(Unit)]),      // 3: unit
  z.union([z.literal(0), z.literal(1)]).optional(), // 4: checked
  z.string().optional(), // 5: productId
  z.string().optional(), // 6: place
]);

export const compactListTupleSchema = z.tuple([
  z.string().min(1), // 0: list id
  z.string().min(1).max(100), // 1: list name
  z.array(compactItemTupleSchema).max(500), // 2: items
]);
