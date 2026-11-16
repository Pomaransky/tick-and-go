import {
  decompressFromEncodedURIComponent,
} from "lz-string";

import { Unit, units } from "@/data/units";
import { compactListTupleSchema, sharedListSchema } from "@/features/lists/listSchemas";
import type { ShoppingList } from "@/features/lists/types";

export function decodeSharedList(rawInput: string): Omit<ShoppingList, 'createdAt'> | null {
  if (!rawInput || typeof rawInput !== 'string') {
    return null;
  }

  let data = rawInput.trim();

  // Extract the `data` query parameter if a full URL was passed
  const match = data.match(/[?&]data=([^&]+)/);
  if (match && match[1]) {
    data = match[1];
  }

  const encodedVariants = new Set<string>([data]);

  try {
    encodedVariants.add(decodeURIComponent(data));
  } catch {
    // Ignore URIError if `data` is not percent-encoded
  }

  for (const variant of encodedVariants) {
    const normalizedVariants = new Set([variant, variant.replace(/ /g, '+')]);

    for (const candidate of normalizedVariants) {
      try {
        const json = decompressFromEncodedURIComponent(candidate);
        if (!json) continue;

        const parsedJson = JSON.parse(json);

        // 1. Try parsing the new compact tuple format
        if (Array.isArray(parsedJson)) {
          const tupleResult = compactListTupleSchema.safeParse(parsedJson);
          if (tupleResult.success) {
            const [id, name, rawItems] = tupleResult.data;

            return {
              id,
              name,
              items: rawItems.map(([itemId, itemName, quantity, rawUnit, checked, productId, place]) => {
                const resolvedUnit = typeof rawUnit === 'number' ? (units[rawUnit] ?? Unit.PCS) : rawUnit;
                return {
                  id: itemId,
                  name: itemName || undefined,
                  quantity,
                  unit: resolvedUnit,
                  checked: checked === 1,
                  productId: productId || undefined,
                  place: place || undefined,
                }
              }),
            };
          }
        }

        // 2. Fallback: support legacy object format
        const objectResult = sharedListSchema.safeParse(parsedJson);
        if (objectResult.success) {
          return objectResult.data;
        }
      } catch {
        continue;
      }
    }
  }

  return null;
}