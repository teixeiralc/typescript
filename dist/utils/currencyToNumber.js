export default function currencyToNumber(currency) {
    return +currency.replaceAll('.', '').replace(',', '.') || null;
}
//# sourceMappingURL=currencyToNumber.js.map