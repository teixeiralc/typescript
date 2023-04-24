/**
 * From a currency string, returns a number
 * @param {string} currency - BRL currency string
 * @returns {number | null} - Number or null
 * @example currencyToNumber('1.000,00') // 1000
 */

export default function currencyToNumber(currency: string): number | null {
  return +currency.replaceAll('.', '').replace(',', '.') || null;
}
