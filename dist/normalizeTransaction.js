import currencyToNumber from './utils/currencyToNumber.js';
import stringToDate from './utils/stringToDate.js';
export default function normalizeTransaction(transaction) {
    return {
        nome: transaction.Nome,
        id: transaction.ID,
        status: transaction.Status,
        data: stringToDate(transaction.Data),
        email: transaction.Email,
        moeda: transaction['Valor (R$)'],
        valor: currencyToNumber(transaction['Valor (R$)']),
        clienteNovo: Boolean(transaction['Cliente Novo']),
        formaDePagamento: transaction['Forma de Pagamento'],
    };
}
//# sourceMappingURL=normalizeTransaction.js.map