import type { TFunction } from "i18next";

import type { Unit } from "@/data/units";

export function formatQuantity(
  quantity: number,
  unit: Unit,
  language: string,
  t: TFunction,
): string {
  const value = new Intl.NumberFormat(language, {
    maximumFractionDigits: 3,
  }).format(quantity);
  return `${value} ${t(`units.${unit}`)}`;
}
