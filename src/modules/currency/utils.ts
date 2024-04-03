export function parseCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "ZAR",
  }).format(value);
}
