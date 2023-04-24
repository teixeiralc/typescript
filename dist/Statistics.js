import countBy from './utils/countBy.js';
function filterValue(transaction) {
    return transaction.valor !== null;
}
export default class Statistics {
    transactions;
    total;
    payment;
    status;
    constructor(transactions) {
        this.transactions = transactions;
        this.total = this.getTotal();
        this.payment = this.getPayment();
        this.status = this.getStatus();
    }
    getTotal() {
        return this.transactions.filter(filterValue).reduce((acc, cur) => acc + cur.valor, 0);
    }
    getPayment() {
        return countBy(this.transactions.map(({ formaDePagamento }) => formaDePagamento));
    }
    getStatus() {
        return countBy(this.transactions.map(({ status }) => status));
    }
}
//# sourceMappingURL=Statistics.js.map