import { units } from "@/data/units";
import { compressToEncodedURIComponent } from "lz-string";
import { ShoppingList } from "../types";

export function encodeSharedList(list: ShoppingList): string {
  const compactItems = list.items.map((item) => {
    const unitIndex = units.indexOf(item.unit);

    const row: (string | number)[] = [
      item.id,
      item.name ?? '',
      item.quantity,
      unitIndex !== -1 ? unitIndex : item.unit, // Save index (0..5) instead of string
      item.checked ? 1 : 0,
      item.productId ?? '',
      item.place ?? '',
    ];

    while (row.length > 4 && row[row.length - 1] === '') {
      row.pop();
    }

    return row;
  });
  const payload = [list.id, list.name, compactItems];
  const compressed = compressToEncodedURIComponent(JSON.stringify(payload));

  return compressed;
}