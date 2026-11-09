export function formatQuantityInput(quantity: number, language: string) {
  return new Intl.NumberFormat(language, {
    useGrouping: false,
    maximumFractionDigits: 3,
  }).format(quantity);
}
