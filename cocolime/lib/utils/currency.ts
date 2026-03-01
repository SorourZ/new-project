/**
 * Format a price (in halalah, i.e. 1/100 SAR) to a display string.
 * Returns "SAR XX.XX" — callers should render <SARSymbol> in place of "SAR"
 * in JSX contexts, or keep the plain text for aria-labels / meta.
 */
export function formatPrice(
  amount: number,
  _currency: string = 'SAR',  // kept for API compat — always SAR now
  locale: string = 'en-SA'
): string {
  const value = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100)

  return `SAR ${value}`
}

export function calculateDiscount(price: number, compareAt: number): number {
  if (!compareAt || compareAt <= price) return 0
  return Math.round(((compareAt - price) / compareAt) * 100)
}

/** Free-shipping threshold in halalah (200 SAR) */
export const FREE_SHIPPING_THRESHOLD = 20000
export const FREE_SHIPPING_LABEL = 'SAR 200'
