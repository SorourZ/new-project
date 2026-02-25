/**
 * Format integer cents/pence to locale currency string
 * e.g. 4200, 'GBP' → '£42.00'
 */
export function formatPrice(
  amount: number,
  currency: string = 'GBP',
  locale: string = 'en-GB'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

export function calculateDiscount(price: number, compareAt: number): number {
  if (!compareAt || compareAt <= price) return 0
  return Math.round(((compareAt - price) / compareAt) * 100)
}
