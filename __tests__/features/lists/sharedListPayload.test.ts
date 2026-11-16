import { Unit } from "@/data/units";
import type { ShoppingList } from "@/features/lists/types";
import { decodeSharedList } from "@/features/lists/utils/decodeSharedLits";
import { encodeSharedList } from "@/features/lists/utils/encodeSharedList";

const list: ShoppingList = {
  id: "list-1",
  name: "Weekend",
  createdAt: 1,
  items: [
    {
      id: "item-1",
      productId: "seed:milk",
      quantity: 2,
      unit: Unit.L,
      checked: false,
    },
  ],
};

describe("sharedListPayload", () => {
  it("round-trips a shopping list", () => {
    expect(decodeSharedList(encodeSharedList(list))).toEqual(list);
  });

  it("accepts a percent-encoded payload", () => {
    const encoded = encodeURIComponent(encodeSharedList(list));
    expect(decodeSharedList(encoded)).toEqual(list);
  });

  it("returns null for invalid data", () => {
    expect(decodeSharedList("not-a-list")).toBeNull();
  });
});
